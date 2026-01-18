import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface AudioWaveformProps {
  isActive?: boolean;
}

export function AudioWaveform({ isActive = false }: AudioWaveformProps) {
  const bars = Array.from({ length: 40 });

  return (
    <div className="flex items-center justify-center gap-1 h-32">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-[#0D9488] rounded-full"
          animate={{
            height: isActive
              ? [20, Math.random() * 80 + 20, 20]
              : 20,
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
