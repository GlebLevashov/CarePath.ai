import React from 'react';
import { Activity, AlertTriangle } from 'lucide-react';
import { StatusChip } from '@/app/components/StatusChip';
import { Stepper } from '@/app/components/Stepper';
import { GuardianRequiredCard } from '@/app/components/GuardianRequiredCard';

interface LiveIntakeCallUnder15Props {
  onComplete: () => void;
}

export function LiveIntakeCallUnder15({ onComplete }: LiveIntakeCallUnder15Props) {
  const steps = ['Basics', 'Symptoms', 'Medications', 'Confirm'];

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0D9488] flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-[#111827]" style={{ fontSize: '18px' }}>IntakeFlow</h1>
              <p className="text-sm text-[#6B7280]">Downtown Family Clinic</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#6B7280]">Connected to Intake Assistant</span>
            <StatusChip status="error" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Progress Stepper */}
          <Stepper steps={steps} currentStep={0} />

          {/* Guardian Required Card */}
          <GuardianRequiredCard onEndIntake={onComplete} onStartOver={() => {}} />

          {/* Safety Note */}
          <div className="flex items-start gap-3 p-4 bg-[#FEE2E2] rounded-xl border border-[#FCA5A5]">
            <AlertTriangle className="w-5 h-5 text-[#991B1B] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#991B1B] leading-relaxed">
              <strong>Emergency?</strong> If this is a medical emergency, hang up and call 911 immediately.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
