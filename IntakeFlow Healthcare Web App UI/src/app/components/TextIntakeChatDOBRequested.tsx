import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Activity, Send, Calendar } from 'lucide-react';
import { StatusChip } from '@/app/components/StatusChip';
import { Stepper } from '@/app/components/Stepper';

interface TextIntakeChatDOBRequestedProps {
  onComplete: () => void;
}

export function TextIntakeChatDOBRequested({ onComplete }: TextIntakeChatDOBRequestedProps) {
  const [dob, setDob] = useState('');
  const [dobError, setDobError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const steps = ['Basics', 'Symptoms', 'Location', 'Confirm'];

  const messages = [
    { sender: 'assistant' as const, text: "Hi! I'm your Intake Assistant. I'm here to help you check in today. Can you please tell me your full name?", timestamp: '2:10 PM' },
    { sender: 'user' as const, text: "Sarah Johnson", timestamp: '2:10 PM' },
    { sender: 'assistant' as const, text: "Thanks, Sarah. What's your date of birth?", timestamp: '2:10 PM' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
            <StatusChip status="connected" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress Stepper */}
          <Stepper steps={steps} currentStep={0} />

          {/* Chat Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] flex flex-col" style={{ height: '500px' }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-[#0D9488] text-white'
                        : 'bg-[#F9FAFB] text-[#111827]'
                    } rounded-2xl px-4 py-3`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-[#D1FAE5]' : 'text-[#9CA3AF]'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* DOB Input */}
            <div className="border-t border-[#E5E7EB] p-4 bg-[#F0FDFA]">
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
                <Button className="bg-[#0D9488] hover:bg-[#0F766E] text-white">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Helper Text */}
          <div className="flex items-start gap-2 text-sm text-[#6B7280] px-2">
            <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              Answer the questions to complete your intake. We're here to help!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
