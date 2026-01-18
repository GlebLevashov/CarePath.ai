import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Activity, Shield } from 'lucide-react';

interface PatientLandingProps {
  onStart: () => void;
  onStartText: () => void;
}

export function PatientLanding({ onStart, onStartText }: PatientLandingProps) {
  const [consent, setConsent] = useState(false);
  const [language, setLanguage] = useState('english');

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
            {/* Title */}
            <div className="text-center space-y-2">
              <h2 className="text-[#111827]" style={{ fontSize: '32px', fontWeight: '600' }}>
                Let's get you checked in
              </h2>
              <p className="text-[#6B7280]" style={{ fontSize: '16px' }}>
                Answer a few questions by voice. Takes ~2 minutes.
              </p>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#111827]">Preferred Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="french">Français (French)</SelectItem>
                  <SelectItem value="spanish">Español (Spanish)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] rounded-xl">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
                className="mt-0.5"
              />
              <label
                htmlFor="consent"
                className="text-sm text-[#374151] leading-relaxed cursor-pointer"
              >
                I consent to share this information with my clinic for the purpose of my medical care.
              </label>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onStart}
                disabled={!consent}
                className="w-full h-12 bg-[#0D9488] hover:bg-[#0F766E] text-white"
              >
                Start voice intake
              </Button>
              <button 
                onClick={onStartText}
                disabled={!consent}
                className="w-full text-sm text-[#0D9488] hover:text-[#0F766E] font-medium disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
              >
                I prefer typing instead
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 flex items-start gap-3 p-4 bg-white rounded-xl border border-[#E5E7EB]">
            <Shield className="w-5 h-5 text-[#0D9488] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Your data is encrypted and secured. We only share information necessary for your care with your healthcare provider.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}