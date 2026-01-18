import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Activity, MicOff, Phone, HelpCircle, AlertTriangle, Edit } from 'lucide-react';
import { StatusChip } from '@/app/components/StatusChip';
import { AudioWaveform } from '@/app/components/AudioWaveform';
import { MicrophoneButton } from '@/app/components/MicrophoneButton';
import { Stepper } from '@/app/components/Stepper';
import { TranscriptBubble } from '@/app/components/TranscriptBubble';

interface LiveIntakeCallContinueProps {
  onComplete: () => void;
}

export function LiveIntakeCallContinue({ onComplete }: LiveIntakeCallContinueProps) {
  const [micState, setMicState] = useState<'idle' | 'listening' | 'processing'>('listening');

  const steps = ['Basics', 'Symptoms', 'Medications', 'Confirm'];

  const transcript = [
    { speaker: 'assistant' as const, text: "Hi! I'm your Intake Assistant. I'm here to help you check in today. Can you please tell me your full name?", timestamp: '2:10 PM' },
    { speaker: 'patient' as const, text: "Sarah Johnson", timestamp: '2:10 PM' },
    { speaker: 'assistant' as const, text: "Thanks, Sarah. What's your date of birth?", timestamp: '2:10 PM' },
    { speaker: 'patient' as const, text: "March 15, 1985", timestamp: '2:11 PM' },
    { speaker: 'assistant' as const, text: "Got it. What's the reason for your visit today?", timestamp: '2:11 PM' },
    { speaker: 'patient' as const, text: "I've been having persistent headaches for the past week, mainly in the morning.", timestamp: '2:11 PM' },
  ];

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
            <StatusChip status="connected" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Progress Stepper */}
          <Stepper steps={steps} currentStep={1} />

          {/* Audio Waveform Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0D9488] to-[#14B8A6] flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                  <Activity className="w-8 h-8 text-[#0D9488]" />
                </div>
              </div>
            </div>

            <AudioWaveform isActive={micState === 'listening'} />

            <div className="flex justify-center mt-8">
              <MicrophoneButton
                state={micState}
                onClick={() => {
                  if (micState === 'idle') setMicState('listening');
                  else if (micState === 'listening') setMicState('processing');
                  else setMicState('listening');
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" className="gap-2">
              <MicOff className="w-4 h-4" />
              Mute
            </Button>
            <Button variant="outline" className="gap-2" onClick={onComplete}>
              <Phone className="w-4 h-4" />
              End call
            </Button>
            <Button variant="outline" className="gap-2">
              <HelpCircle className="w-4 h-4" />
              Help
            </Button>
          </div>

          {/* Transcript Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]" style={{ fontSize: '18px' }}>Conversation</h3>
              <button className="text-sm text-[#0D9488] hover:text-[#0F766E] font-medium flex items-center gap-1">
                <Edit className="w-4 h-4" />
                Edit transcript
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto space-y-2">
              {transcript.map((item, index) => (
                <TranscriptBubble
                  key={index}
                  speaker={item.speaker}
                  text={item.text}
                  timestamp={item.timestamp}
                />
              ))}
            </div>
          </div>

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
