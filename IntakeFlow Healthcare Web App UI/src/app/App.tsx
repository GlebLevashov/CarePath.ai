import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { PatientLanding } from '@/app/components/PatientLanding';
import { LiveIntakeCall } from '@/app/components/LiveIntakeCall';
import { LiveIntakeCallDOBRequested } from '@/app/components/LiveIntakeCallDOBRequested';
import { LiveIntakeCallUnder15 } from '@/app/components/LiveIntakeCallUnder15';
import { LiveIntakeCallContinue } from '@/app/components/LiveIntakeCallContinue';
import { TextIntakeChat } from '@/app/components/TextIntakeChat';
import { TextIntakeChatDOBRequested } from '@/app/components/TextIntakeChatDOBRequested';
import { TextIntakeChatUnder15 } from '@/app/components/TextIntakeChatUnder15';
import { TextIntakeChatContinue } from '@/app/components/TextIntakeChatContinue';
import { IntakeComplete } from '@/app/components/IntakeComplete';
import { StaffDashboard } from '@/app/components/StaffDashboard';
import { StaffIntakeReview } from '@/app/components/StaffIntakeReview';
import { DesignSystem } from '@/app/components/DesignSystem';
import { Activity, Monitor, Smartphone } from 'lucide-react';
import { Toaster } from '@/app/components/ui/sonner';

type Screen = 
  | 'landing' 
  | 'call' 
  | 'call-dob' 
  | 'call-under15' 
  | 'call-continue'
  | 'text-chat' 
  | 'text-dob' 
  | 'text-under15' 
  | 'text-continue'
  | 'complete' 
  | 'dashboard' 
  | 'review' 
  | 'design-system';
type ViewMode = 'desktop' | 'mobile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <PatientLanding onStart={() => setCurrentScreen('call')} onStartText={() => setCurrentScreen('text-chat')} />;
      case 'call':
        return <LiveIntakeCall onComplete={() => setCurrentScreen('complete')} />;
      case 'call-dob':
        return <LiveIntakeCallDOBRequested onComplete={() => setCurrentScreen('complete')} />;
      case 'call-under15':
        return <LiveIntakeCallUnder15 onComplete={() => setCurrentScreen('complete')} />;
      case 'call-continue':
        return <LiveIntakeCallContinue onComplete={() => setCurrentScreen('complete')} />;
      case 'text-chat':
        return <TextIntakeChat onComplete={() => setCurrentScreen('complete')} />;
      case 'text-dob':
        return <TextIntakeChatDOBRequested onComplete={() => setCurrentScreen('complete')} />;
      case 'text-under15':
        return <TextIntakeChatUnder15 onComplete={() => setCurrentScreen('complete')} />;
      case 'text-continue':
        return <TextIntakeChatContinue onComplete={() => setCurrentScreen('complete')} />;
      case 'complete':
        return (
          <IntakeComplete
            onReview={() => setCurrentScreen('landing')}
            onNewIntake={() => setCurrentScreen('landing')}
          />
        );
      case 'dashboard':
        return <StaffDashboard onSelectIntake={() => setCurrentScreen('review')} />;
      case 'review':
        return <StaffIntakeReview onBack={() => setCurrentScreen('dashboard')} />;
      case 'design-system':
        return <DesignSystem />;
      default:
        return <PatientLanding onStart={() => setCurrentScreen('call')} onStartText={() => setCurrentScreen('text-chat')} />;
    }
  };

  const isPatientScreen = [
    'landing', 
    'call', 
    'call-dob', 
    'call-under15', 
    'call-continue',
    'text-chat', 
    'text-dob', 
    'text-under15', 
    'text-continue',
    'complete'
  ].includes(currentScreen);
  const maxWidth = viewMode === 'mobile' && isPatientScreen ? '390px' : '100%';

  return (
    <>
      {/* Navigation Bar */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0D9488] flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-[#111827]" style={{ fontSize: '18px' }}>
                  IntakeFlow Demo
                </h1>
                <p className="text-xs text-[#6B7280]">Voice-based Patient Intake Automation</p>
              </div>
            </div>

            {isPatientScreen && (
              <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg p-1">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    viewMode === 'desktop'
                      ? 'bg-white text-[#0D9488] shadow-sm'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm font-medium">Desktop</span>
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    viewMode === 'mobile'
                      ? 'bg-white text-[#0D9488] shadow-sm'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="text-sm font-medium">Mobile</span>
                </button>
              </div>
            )}
          </div>

          {/* Screen Tabs */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto">
            <div className="flex gap-1 bg-[#F9FAFB] rounded-lg p-1">
              <button
                onClick={() => setCurrentScreen('design-system')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'design-system'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Design System
              </button>
            </div>
            
            <div className="w-px h-6 bg-[#E5E7EB]" />
            
            <p className="text-xs text-[#6B7280] px-2">Patient Screens:</p>
            <div className="flex gap-1 bg-[#F9FAFB] rounded-lg p-1">
              <button
                onClick={() => setCurrentScreen('landing')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'landing'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                1. Landing
              </button>
              <button
                onClick={() => setCurrentScreen('call')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'call'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                2. Live Call
              </button>
              <button
                onClick={() => setCurrentScreen('call-dob')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'call-dob'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                2. Live Call (DOB Requested)
              </button>
              <button
                onClick={() => setCurrentScreen('call-under15')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'call-under15'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                2. Live Call (Under 15 Blocked)
              </button>
              <button
                onClick={() => setCurrentScreen('call-continue')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'call-continue'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                2. Live Call (15+ Continue)
              </button>
              <button
                onClick={() => setCurrentScreen('text-chat')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'text-chat'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                2. Text Chat
              </button>
              <button
                onClick={() => setCurrentScreen('text-dob')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'text-dob'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                2. Text Chat (DOB Requested)
              </button>
              <button
                onClick={() => setCurrentScreen('text-under15')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'text-under15'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                2. Text Chat (Under 15 Blocked)
              </button>
              <button
                onClick={() => setCurrentScreen('text-continue')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'text-continue'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                2. Text Chat (15+ Continue)
              </button>
              <button
                onClick={() => setCurrentScreen('complete')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'complete'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                3. Complete
              </button>
            </div>

            <div className="w-px h-6 bg-[#E5E7EB]" />
            
            <p className="text-xs text-[#6B7280] px-2">Staff Screens:</p>
            <div className="flex gap-1 bg-[#F9FAFB] rounded-lg p-1">
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'dashboard'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                4. Dashboard
              </button>
              <button
                onClick={() => setCurrentScreen('review')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentScreen === 'review'
                    ? 'bg-white text-[#0D9488] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                5. Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="flex justify-center bg-[#E5E7EB] min-h-[calc(100vh-140px)]">
        <div
          className="transition-all duration-300"
          style={{
            width: maxWidth,
            maxWidth: maxWidth,
          }}
        >
          <div
            className={`${
              viewMode === 'mobile' && isPatientScreen ? 'shadow-2xl' : ''
            } bg-white overflow-hidden`}
            style={{
              height: viewMode === 'mobile' && isPatientScreen ? '844px' : 'auto',
            }}
          >
            {renderScreen()}
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
}