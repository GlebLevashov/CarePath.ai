# CarePathAI Patient Intake Automation (Demo)

This repo includes a LiveKit voice agent plus a LeanMCP backend and Next.js UI to demo a patient intake automation pipeline.

## Demo disclaimer

**Demo only. Do not enter real PHI.**  
This project is not HIPAA compliant and does not provide medical advice.

## Monorepo layout

- `services/agent`: LiveKit Agents Python app (`src/agent.py`)
- `services/mcp`: LeanMCP backend (TypeScript) + REST + WebSocket + SQLite
- `services/web`: Next.js UI

## Environment configuration

Create a `.env` at the repo root with:

```
LIVEKIT_URL=...
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...

LLM_PROVIDER=openai
OPENAI_API_KEY=...

MCP_PORT=4000
DATABASE_PATH=./data/intake.db

MCP_BACKEND_URL=http://localhost:4000
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

Note: Creating `.env.example` is blocked in this workspace due to ignore rules. Use the snippet above as a template.

## Local dev (manual)

### 1) LeanMCP backend

```
cd services/mcp
npm install
npm run dev
```

### 2) Web UI

```
cd services/web
npm install
npm run dev
```

Open `http://localhost:3000`.

### 3) LiveKit agent

```
cd services/agent
uv sync
MCP_BACKEND_URL=http://localhost:4000 uv run src/agent.py start
```

## Docker Compose

```
docker compose up --build
```

The web UI runs at `http://localhost:3000` and the backend at `http://localhost:4000`.

## End-to-end smoke test

1) Open the web UI and click “Start patient intake”.  
2) Allow microphone access, speak naturally.  
3) Confirm transcript is updating and structured fields fill in.  
4) Click “Finalize intake” to generate summary and export.  
5) Open `/staff/[session_id]` to view the clinician summary and export link.
