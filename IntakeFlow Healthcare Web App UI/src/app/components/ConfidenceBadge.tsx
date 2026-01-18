import React from 'react';
import { Badge } from '@/app/components/ui/badge';

interface ConfidenceBadgeProps {
  level: 'high' | 'medium' | 'low';
}

export function ConfidenceBadge({ level }: ConfidenceBadgeProps) {
  const configs = {
    high: {
      label: 'High',
      className: 'bg-[#D1FAE5] text-[#065F46] hover:bg-[#D1FAE5]',
    },
    medium: {
      label: 'Med',
      className: 'bg-[#FEF3C7] text-[#92400E] hover:bg-[#FEF3C7]',
    },
    low: {
      label: 'Low',
      className: 'bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FEE2E2]',
    },
  };

  const config = configs[level];

  return (
    <Badge variant="secondary" className={`${config.className} text-xs`}>
      {config.label}
    </Badge>
  );
}
