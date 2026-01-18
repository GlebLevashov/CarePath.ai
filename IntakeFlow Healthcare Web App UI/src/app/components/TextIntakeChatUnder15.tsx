import React from 'react';
import { Activity } from 'lucide-react';
import { StatusChip } from '@/app/components/StatusChip';
import { Stepper } from '@/app/components/Stepper';
import { GuardianRequiredCard } from '@/app/components/GuardianRequiredCard';

interface TextIntakeChatUnder15Props {
  onComplete: () => void;
}

export function TextIntakeChatUnder15({ onComplete }: TextIntakeChatUnder15Props) {
  const steps = ['Basics', 'Symptoms', 'Location', 'Confirm'];

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
            <span className="text-sm text-[#6B7280]">Text-based intake</span>
            <StatusChip status="error" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress Stepper */}
          <Stepper steps={steps} currentStep={0} />

          {/* Guardian Required Card */}
          <GuardianRequiredCard onEndIntake={onComplete} onStartOver={() => {}} />
        </div>
      </main>
    </div>
  );
}
