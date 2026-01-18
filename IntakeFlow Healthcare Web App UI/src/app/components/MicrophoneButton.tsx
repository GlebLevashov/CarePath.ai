import React from 'react';
import { Mic, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface MicrophoneButtonProps {
  state: 'idle' | 'listening' | 'processing';
  onClick?: () => void;
  disabled?: boolean;
}

export function MicrophoneButton({ state, onClick, disabled = false }: MicrophoneButtonProps) {
  return (
    <div className="relative flex flex-col items-center gap-3">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`relative w-20 h-20 rounded-full text-white shadow-lg transition-colors flex items-center justify-center ${
          disabled 
            ? 'bg-[#9CA3AF] cursor-not-allowed' 
            : 'bg-[#0D9488] hover:bg-[#0F766E]'
        }`}
      >
        {state === 'listening' && !disabled && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-[#0D9488]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
        {state === 'processing' ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </button>
      <p className="text-sm text-[#6B7280]">
        {disabled && 'Disabled'}
        {!disabled && state === 'idle' && 'Tap to speak'}
        {!disabled && state === 'listening' && 'Listening...'}
        {!disabled && state === 'processing' && 'Thinking...'}
      </p>
    </div>
  );
}