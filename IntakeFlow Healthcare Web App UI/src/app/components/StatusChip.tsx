import React from 'react';
import { Badge } from '@/app/components/ui/badge';

interface StatusChipProps {
  status: 'needs-review' | 'approved' | 'missing-info' | 'in-progress' | 'connected' | 'reconnecting';
}

export function StatusChip({ status }: StatusChipProps) {
  const configs = {
    'needs-review': {
      label: 'Needs Review',
      className: 'bg-[#FEF3C7] text-[#92400E] hover:bg-[#FEF3C7] border-[#FDE68A]',
    },
    'approved': {
      label: 'Approved',
      className: 'bg-[#D1FAE5] text-[#065F46] hover:bg-[#D1FAE5] border-[#A7F3D0]',
    },
    'missing-info': {
      label: 'Missing Info',
      className: 'bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FEE2E2] border-[#FECACA]',
    },
    'in-progress': {
      label: 'In Progress',
      className: 'bg-[#DBEAFE] text-[#1E40AF] hover:bg-[#DBEAFE] border-[#BFDBFE]',
    },
    'connected': {
      label: 'Connected',
      className: 'bg-[#D1FAE5] text-[#065F46] hover:bg-[#D1FAE5] border-[#A7F3D0]',
    },
    'reconnecting': {
      label: 'Reconnecting',
      className: 'bg-[#FEF3C7] text-[#92400E] hover:bg-[#FEF3C7] border-[#FDE68A]',
    },
  };

  const config = configs[status];

  return (
    <Badge variant="outline" className={`${config.className} border font-medium`}>
      {config.label}
    </Badge>
  );
}
