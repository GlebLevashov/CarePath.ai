import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Activity, CheckCircle2, FileText, QrCode } from 'lucide-react';

interface IntakeCompleteProps {
  onReview: () => void;
  onNewIntake: () => void;
}

export function IntakeComplete({ onReview, onNewIntake }: IntakeCompleteProps) {
  const [submitted, setSubmitted] = useState(false);

  const summaryItems = [
    'Name and Date of Birth',
    'Reason for visit',
    'Current Medications',
    'Known Allergies',
    'Medical History',
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0D9488] flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-[#111827]" style={{ fontSize: '18px' }}>IntakeFlow</h1>
              <p className="text-sm text-[#6B7280]">Downtown Family Clinic</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8 space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[#D1FAE5] flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-[#10B981]" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h2 className="text-[#111827]" style={{ fontSize: '32px', fontWeight: '600' }}>
                You're all set!
              </h2>
              <p className="text-[#6B7280]" style={{ fontSize: '16px' }}>
                Thank you for completing your intake.
              </p>
            </div>

            {/* Summary */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#111827]" style={{ fontSize: '18px' }}>
                We captured:
              </h3>
              <ul className="space-y-2">
                {summaryItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reference Code */}
            {submitted && (
              <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#111827]">Reference Code</p>
                    <p className="text-2xl font-semibold text-[#0D9488] mt-1">INT-4832</p>
                    <p className="text-xs text-[#6B7280] mt-1">Submitted at 2:14 PM</p>
                  </div>
                  <QrCode className="w-16 h-16 text-[#9CA3AF]" />
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            {!submitted ? (
              <div className="space-y-3">
                <Button
                  onClick={() => setSubmitted(true)}
                  className="w-full h-12 bg-[#0D9488] hover:bg-[#0F766E] text-white"
                >
                  Submit to clinic
                </Button>
                <Button
                  onClick={onReview}
                  variant="outline"
                  className="w-full h-12 gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Review details
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-[#D1FAE5] rounded-xl border border-[#A7F3D0] text-center">
                  <p className="text-sm font-medium text-[#065F46]">
                    ✓ Successfully submitted to clinic
                  </p>
                </div>
                <Button
                  onClick={onNewIntake}
                  variant="outline"
                  className="w-full h-12"
                >
                  Start another intake
                </Button>
              </div>
            )}
          </div>

          {/* Next Steps */}
          {submitted && (
            <div className="mt-6 p-4 bg-white rounded-xl border border-[#E5E7EB]">
              <h4 className="font-medium text-[#111827] mb-2">What's next?</h4>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Please have a seat in the waiting area. A staff member will call you when they're ready for your appointment.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
