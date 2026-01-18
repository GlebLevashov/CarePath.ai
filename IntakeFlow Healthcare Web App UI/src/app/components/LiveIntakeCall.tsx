import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Activity, MicOff, Phone, HelpCircle, AlertTriangle, Edit, Calendar } from 'lucide-react';
import { StatusChip } from '@/app/components/StatusChip';
import { AudioWaveform } from '@/app/components/AudioWaveform';
import { MicrophoneButton } from '@/app/components/MicrophoneButton';
import { Stepper } from '@/app/components/Stepper';
import { TranscriptBubble } from '@/app/components/TranscriptBubble';
import { GuardianRequiredCard } from '@/app/components/GuardianRequiredCard';

interface LiveIntakeCallProps {
  onComplete: () => void;
}

type FlowState = 'requesting-dob' | 'under-15-blocked' | 'continue-intake';

export function LiveIntakeCall({ onComplete }: LiveIntakeCallProps) {
  const [micState, setMicState] = useState<'idle' | 'listening' | 'processing'>('listening');
  const [currentStep, setCurrentStep] = useState(0);
  const [flowState, setFlowState] = useState<FlowState>('requesting-dob');
  const [dob, setDob] = useState('');
  const [dobError, setDobError] = useState('');
  const [userName, setUserName] = useState('Sarah');

  const steps = ['Basics', 'Symptoms', 'Medications', 'Confirm'];

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateAndProcessDOB = () => {
    if (!dob) {
      setDobError('Please enter your date of birth');
      return;
    }

    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      setDobError('Please enter DOB in MM/DD/YYYY');
      return;
    }

    const age = calculateAge(dob);
    if (age < 15) {
      setFlowState('under-15-blocked');
    } else {
      setFlowState('continue-intake');
      setCurrentStep(1);
    }
    setDobError('');
  };

  const handleStartOver = () => {
    setFlowState('requesting-dob');
    setDob('');
    setDobError('');
    setCurrentStep(0);
  };

  const transcriptRequestingDOB = [
    { speaker: 'assistant' as const, text: "Hi! I'm your Intake Assistant. I'm here to help you check in today. Can you please tell me your full name?", timestamp: '2:10 PM' },
    { speaker: 'patient' as const, text: "Sarah Johnson", timestamp: '2:10 PM' },
    { speaker: 'assistant' as const, text: "Thanks, Sarah. What's your date of birth?", timestamp: '2:10 PM' },
  ];

  const transcriptContinue = [
    { speaker: 'assistant' as const, text: "Hi! I'm your Intake Assistant. I'm here to help you check in today. Can you please tell me your full name?", timestamp: '2:10 PM' },
    { speaker: 'patient' as const, text: "Sarah Johnson", timestamp: '2:10 PM' },
    { speaker: 'assistant' as const, text: "Thanks, Sarah. What's your date of birth?", timestamp: '2:10 PM' },
    { speaker: 'patient' as const, text: "March 15, 1985", timestamp: '2:11 PM' },
    { speaker: 'assistant' as const, text: "Got it. What's the reason for your visit today?", timestamp: '2:11 PM' },
    { speaker: 'patient' as const, text: "I've been having persistent headaches for the past week, mainly in the morning.", timestamp: '2:11 PM' },
  ];

  const transcript = flowState === 'continue-intake' ? transcriptContinue : transcriptRequestingDOB;
  const isBlocked = flowState === 'under-15-blocked';

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
            <StatusChip status={isBlocked ? 'error' : 'connected'} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Progress Stepper */}
          <Stepper steps={steps} currentStep={currentStep} />

          {/* Conditional Content Based on Flow State */}
          {flowState === 'under-15-blocked' ? (
            <GuardianRequiredCard onEndIntake={onComplete} onStartOver={handleStartOver} />
          ) : (
            <>
              {/* Audio Waveform Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0D9488] to-[#14B8A6] flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                      <Activity className="w-8 h-8 text-[#0D9488]" />
                    </div>
                  </div>
                </div>

                <AudioWaveform isActive={micState === 'listening' && !isBlocked} />

                <div className="flex justify-center mt-8">
                  <MicrophoneButton
                    state={micState}
                    onClick={() => {
                      if (isBlocked) return;
                      if (micState === 'idle') setMicState('listening');
                      else if (micState === 'listening') setMicState('processing');
                      else setMicState('listening');
                    }}
                    disabled={isBlocked}
                  />
                </div>

                {/* DOB Input - Only show when requesting DOB */}
                {flowState === 'requesting-dob' && (
                  <div className="mt-8 space-y-4">
                    <div className="p-4 bg-[#F0FDFA] rounded-xl border border-[#99F6E4]">
                      <p className="text-sm text-[#0F766E] mb-3 font-medium">
                        Please enter your date of birth:
                      </p>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            type="date"
                            value={dob}
                            onChange={(e) => {
                              setDob(e.target.value);
                              setDobError('');
                            }}
                            className={`w-full ${dobError ? 'border-red-500' : ''}`}
                            max={new Date().toISOString().split('T')[0]}
                          />
                          {dobError && (
                            <p className="text-sm text-red-600 mt-1">{dobError}</p>
                          )}
                        </div>
                        <Button
                          onClick={validateAndProcessDOB}
                          className="bg-[#0D9488] hover:bg-[#0F766E] text-white"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" className="gap-2" disabled={isBlocked}>
                  <MicOff className="w-4 h-4" />
                  Mute
                </Button>
                <Button variant="outline" className="gap-2" onClick={onComplete}>
                  <Phone className="w-4 h-4" />
                  End call
                </Button>
                <Button variant="outline" className="gap-2" disabled={isBlocked}>
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
            </>
          )}

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