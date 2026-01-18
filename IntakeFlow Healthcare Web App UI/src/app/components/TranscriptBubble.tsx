import React from 'react';

interface TranscriptBubbleProps {
  speaker: 'patient' | 'assistant';
  text: string;
  timestamp?: string;
}

export function TranscriptBubble({ speaker, text, timestamp }: TranscriptBubbleProps) {
  const isPatient = speaker === 'patient';

  return (
    <div className={`flex ${isPatient ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isPatient
            ? 'bg-[#0D9488] text-white'
            : 'bg-white border border-[#E5E7EB] text-[#111827]'
        }`}
      >
        <p className="text-sm leading-relaxed">{text}</p>
        {timestamp && (
          <p
            className={`text-xs mt-1 ${
              isPatient ? 'text-[#A7F3D0]' : 'text-[#9CA3AF]'
            }`}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
