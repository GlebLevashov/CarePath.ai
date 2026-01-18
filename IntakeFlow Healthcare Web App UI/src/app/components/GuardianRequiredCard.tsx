import React from 'react';
import { Button } from '@/app/components/ui/button';
import { AlertCircle, Phone } from 'lucide-react';

interface GuardianRequiredCardProps {
  onEndIntake: () => void;
  onStartOver: () => void;
}

export function GuardianRequiredCard({ onEndIntake, onStartOver }: GuardianRequiredCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#F97316] flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="space-y-3 max-w-md">
          <h2 className="text-[#111827] font-semibold" style={{ fontSize: '24px' }}>
            A parent or legal guardian is required
          </h2>
          <p className="text-[#6B7280]" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Because you're under 15, we legally can't continue this intake without a parent or legal guardian present. Please go to your local clinic or hospital with a guardian.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Button
            onClick={onEndIntake}
            className="flex-1 h-12 bg-[#0D9488] hover:bg-[#0F766E] text-white"
          >
            End intake
          </Button>
          <Button
            onClick={onStartOver}
            variant="outline"
            className="flex-1 h-12"
          >
            Start over
          </Button>
        </div>

        {/* Emergency Notice */}
        <div className="flex items-start gap-3 p-4 bg-[#FEF3C7] rounded-xl border border-[#FDE68A] w-full max-w-md">
          <Phone className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#92400E] leading-relaxed">
            <strong>If this is an emergency, call 911.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
