import asyncio
import logging
import os
from typing import Any

import httpx
from dotenv import load_dotenv
from livekit import rtc
from livekit.agents import (
    Agent,
    AgentServer,
    AgentSession,
    JobContext,
    JobProcess,
    cli,
    inference,
    llm,
    room_io,
)
from livekit.plugins import noise_cancellation, silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")

load_dotenv(".env.local")


class BackendClient:
    def __init__(self, base_url: str) -> None:
        self._base_url = base_url.rstrip("/")
        self._client = httpx.AsyncClient(timeout=5.0)

    @property
    def enabled(self) -> bool:
        return bool(self._base_url)

    async def aclose(self) -> None:
        await self._client.aclose()

    async def append_transcript(
        self, session_id: str, speaker: str, text: str, ts: int
    ) -> None:
        if not self.enabled:
            return
        await self._client.post(
            f"{self._base_url}/api/intake/sessions/{session_id}/transcript",
            json={"speaker": speaker, "text": text, "ts": ts},
        )

    async def extract_patch(self, session_id: str, new_chunk: str) -> dict[str, Any]:
        if not self.enabled:
            return {}
        resp = await self._client.post(
            f"{self._base_url}/api/intake/sessions/{session_id}/extract",
            json={"new_transcript_chunk": new_chunk},
        )
        return resp.json()

    async def patch_intake(self, session_id: str, patch: dict[str, Any]) -> None:
        if not self.enabled or not patch:
            return
        await self._client.patch(
            f"{self._base_url}/api/intake/sessions/{session_id}",
            json=patch,
        )

    async def finalize(self, session_id: str) -> dict[str, Any]:
        if not self.enabled:
            return {}
        resp = await self._client.post(
            f"{self._base_url}/api/intake/sessions/{session_id}/finalize"
        )
        return resp.json()


class Assistant(Agent):
    def __init__(self, session_id: str, backend: BackendClient | None = None) -> None:
        self._session_id = session_id
        self._backend = backend
        super().__init__(
            instructions="""
            You are a patient intake interviewer for a demo. The user is speaking via voice.
            Start with a short greeting and clearly say: "Demo only. Do not enter real PHI."
            Your role is to collect information only. Never provide medical advice.
            If asked for medical advice, say you cannot provide it and suggest contacting a clinician or urgent services.
            Ask one question at a time, confirm spelling for names and key identifiers.
            Keep acknowledgements concise. Handle corrections like "Actually..." by updating the info.
            Before finishing, recap the collected details and ask for confirmation.
            """,
        )

    async def on_user_turn_completed(
        self, turn_ctx: llm.ChatContext, new_message: llm.ChatMessage
    ) -> None:
        if not self._backend or not self._backend.enabled:
            return

        transcript = (new_message.text_content or "").strip()
        if not transcript:
            return

        try:
            await self._backend.append_transcript(
                self._session_id,
                "patient",
                transcript,
                int(new_message.created_at * 1000),
            )

            if transcript.lower() in {"finalize", "that's all", "that is all", "done"}:
                await self._backend.finalize(self._session_id)
                turn_ctx.add_message(
                    role="system",
                    content=(
                        "The intake has been finalized. Thank the user and say a clinician will "
                        "review the summary."
                    ),
                )
                return

            extract = await self._backend.extract_patch(self._session_id, transcript)
            patch = extract.get("patch") or {}
            await self._backend.patch_intake(self._session_id, patch)

            suggested = extract.get("suggested_next_question")
            if suggested:
                turn_ctx.add_message(
                    role="system",
                    content=(
                        "Ask the next intake question exactly once, without adding extra questions: "
                        f"{suggested}"
                    ),
                )
        except Exception:
            logger.exception("Failed to sync intake data with backend")

    async def on_exit(self) -> None:
        if self._backend:
            await self._backend.aclose()

    # To add tools, use the @function_tool decorator.
    # Here's an example that adds a simple weather tool.
    # You also have to add `from livekit.agents import function_tool, RunContext` to the top of this file
    # @function_tool
    # async def lookup_weather(self, context: RunContext, location: str):
    #     """Use this tool to look up current weather information in the given location.
    #
    #     If the location is not supported by the weather service, the tool will indicate this. You must tell the user the location's weather is unavailable.
    #
    #     Args:
    #         location: The location to look up weather information for (e.g. city name)
    #     """
    #
    #     logger.info(f"Looking up weather for {location}")
    #
    #     return "sunny with a temperature of 70 degrees."


server = AgentServer()


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


server.setup_fnc = prewarm


@server.rtc_session()
async def my_agent(ctx: JobContext):
    # Logging setup
    # Add any other context you want in all log entries here
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    backend_url = os.getenv("MCP_BACKEND_URL", "")
    backend = BackendClient(backend_url)

    # Set up a voice AI pipeline using OpenAI, Cartesia, AssemblyAI, and the LiveKit turn detector
    session = AgentSession(
        # Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
        # See all available models at https://docs.livekit.io/agents/models/stt/
        stt=inference.STT(model="assemblyai/universal-streaming", language="en"),
        # A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
        # See all available models at https://docs.livekit.io/agents/models/llm/
        llm=inference.LLM(model="openai/gpt-4.1-mini"),
        # Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
        # See all available models as well as voice selections at https://docs.livekit.io/agents/models/tts/
        tts=inference.TTS(
            model="cartesia/sonic-3", voice="9626c31c-bec5-4cca-baa8-f8ba9e84c8bc"
        ),
        # VAD and turn detection are used to determine when the user is speaking and when the agent should respond
        # See more at https://docs.livekit.io/agents/build/turns
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        # allow the LLM to generate a response while waiting for the end of turn
        # See more at https://docs.livekit.io/agents/build/audio/#preemptive-generation
        preemptive_generation=True,
    )

    # To use a realtime model instead of a voice pipeline, use the following session setup instead.
    # (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/))
    # 1. Install livekit-agents[openai]
    # 2. Set OPENAI_API_KEY in .env.local
    # 3. Add `from livekit.plugins import openai` to the top of this file
    # 4. Use the following session setup instead of the version above
    # session = AgentSession(
    #     llm=openai.realtime.RealtimeModel(voice="marin")
    # )

    # # Add a virtual avatar to the session, if desired
    # # For other providers, see https://docs.livekit.io/agents/models/avatar/
    # avatar = hedra.AvatarSession(
    #   avatar_id="...",  # See https://docs.livekit.io/agents/models/avatar/plugins/hedra
    # )
    # # Start the avatar and wait for it to join
    # await avatar.start(session, room=ctx.room)

    # Start the session, which initializes the voice pipeline and warms up the models
    await session.start(
        agent=Assistant(session_id=ctx.room.name, backend=backend),
        room=ctx.room,
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=lambda params: noise_cancellation.BVCTelephony()
                if params.participant.kind == rtc.ParticipantKind.PARTICIPANT_KIND_SIP
                else noise_cancellation.BVC(),
            ),
        ),
    )

    @session.on("conversation_item_added")
    def on_conversation_item_added(ev: Any) -> None:
        item = ev.item
        if getattr(item, "role", None) != "assistant":
            return
        text = item.text_content or ""
        if not text:
            return
        async def _send() -> None:
            try:
                await backend.append_transcript(
                    ctx.room.name, "agent", text, int(item.created_at * 1000)
                )
            except Exception:
                logger.exception("Failed to append agent transcript")

        asyncio.create_task(_send())

    # Join the room and connect to the user
    await ctx.connect()


if __name__ == "__main__":
    cli.run_app(server)
