import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Activity, Send, MapPin, Calendar } from 'lucide-react';
import { StatusChip } from '@/app/components/StatusChip';
import { Stepper } from '@/app/components/Stepper';
import { GuardianRequiredCard } from '@/app/components/GuardianRequiredCard';

interface Message {
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
}

interface TextIntakeChatProps {
  onComplete: () => void;
}

type FlowState = 'requesting-dob' | 'under-15-blocked' | 'continue-intake';

export function TextIntakeChat({ onComplete }: TextIntakeChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [flowState, setFlowState] = useState<FlowState>('requesting-dob');
  const [dob, setDob] = useState('');
  const [dobError, setDobError] = useState('');
  const [awaitingDOB, setAwaitingDOB] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const steps = ['Basics', 'Symptoms', 'Location', 'Confirm'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting from assistant
    setTimeout(() => {
      addAssistantMessage("Hi! I'm your Intake Assistant. I'm here to help you check in today. Can you please tell me your full name?");
    }, 500);
  }, []);

  const addAssistantMessage = (text: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'assistant', text, timestamp }]);
  };

  const addUserMessage = (text: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text, timestamp }]);
  };

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
    
    // Format DOB for display
    const formattedDOB = dobDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    addUserMessage(formattedDOB);

    if (age < 15) {
      setFlowState('under-15-blocked');
    } else {
      setFlowState('continue-intake');
      setUserAge(age);
      setAwaitingDOB(false);
      setIsTyping(true);
      setTimeout(() => {
        addAssistantMessage("Got it. What's the reason for your visit today?");
        setIsTyping(false);
        setCurrentStep(1);
      }, 1000);
    }
    setDobError('');
  };

  const handleStartOver = () => {
    setFlowState('requesting-dob');
    setDob('');
    setDobError('');
    setCurrentStep(0);
    setMessages([]);
    setUserName('');
    setUserAge(null);
    setAwaitingDOB(false);
    setTimeout(() => {
      addAssistantMessage("Hi! I'm your Intake Assistant. I'm here to help you check in today. Can you please tell me your full name?");
    }, 500);
  };

  const handleSend = () => {
    if (!inputValue.trim() || awaitingDOB) return;

    const userInput = inputValue.trim();
    addUserMessage(userInput);
    setInputValue('');
    setIsTyping(true);

    // Process the conversation flow
    setTimeout(() => {
      processUserInput(userInput);
      setIsTyping(false);
    }, 1000);
  };

  const processUserInput = (input: string) => {
    const messageCount = messages.filter((m) => m.sender === 'user').length;

    if (messageCount === 0) {
      // First response - got the name
      setUserName(input);
      addAssistantMessage(`Thanks, ${input}. What's your date of birth?`);
      setAwaitingDOB(true);
    } else if (flowState === 'continue-intake') {
      // Continue with normal intake flow after DOB verified
      if (messageCount === 2) {
        // They provided chief complaint
        setCurrentStep(2);
        addAssistantMessage("I understand. Are you currently taking any medications?");
      } else if (messageCount === 3) {
        // They provided medications
        setCurrentStep(3);
        addAssistantMessage("Thank you for that information. Let me confirm the details with you before we finish.");
      } else {
        // Finish
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
            <span className="text-sm text-[#6B7280]">Text-based intake</span>
            <StatusChip status={isBlocked ? 'error' : 'connected'} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress Stepper */}
          <Stepper steps={steps} currentStep={currentStep} />

          {/* Conditional Content Based on Flow State */}
          {flowState === 'under-15-blocked' ? (
            <GuardianRequiredCard onEndIntake={onComplete} onStartOver={handleStartOver} />
          ) : (
            <>
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
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-[#F9FAFB] text-[#111827] rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* DOB Input - Show when awaiting DOB */}
                {awaitingDOB && (
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
                      <Button
                        onClick={validateAndProcessDOB}
                        className="bg-[#0D9488] hover:bg-[#0F766E] text-white"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}

                {/* Regular Input Area */}
                {!awaitingDOB && (
                  <div className="border-t border-[#E5E7EB] p-4">
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1"
                        disabled={isTyping || isBlocked}
                      />
                      <Button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isTyping || isBlocked}
                        className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Helper Text */}
              <div className="flex items-start gap-2 text-sm text-[#6B7280] px-2">
                <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  Answer the questions to complete your intake. We're here to help!
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}