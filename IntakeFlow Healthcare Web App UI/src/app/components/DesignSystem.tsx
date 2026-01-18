import React from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Mic, Phone, Check, AlertTriangle, Download, Edit, Clipboard, User, Calendar, Activity } from 'lucide-react';
import { StatusChip } from '@/app/components/StatusChip';
import { ConfidenceBadge } from '@/app/components/ConfidenceBadge';
import { MicrophoneButton } from '@/app/components/MicrophoneButton';
import { Stepper } from '@/app/components/Stepper';

export function DesignSystem() {
  return (
    <div className="min-h-screen bg-[#F6F8FB] p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#0D9488] flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-[#111827]" style={{ fontSize: '32px', fontWeight: '600' }}>
                IntakeFlow Design System
              </h1>
              <p className="text-[#6B7280]">Healthcare-focused UI components and patterns</p>
            </div>
          </div>
        </div>

        {/* Typography */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          <h2 className="text-[#111827] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>Typography</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[#6B7280] mb-2">H1 - 32px / Semibold</p>
              <h1 className="text-[#111827]" style={{ fontSize: '32px', fontWeight: '600' }}>
                The quick brown fox jumps over the lazy dog
              </h1>
            </div>
            <div>
              <p className="text-sm text-[#6B7280] mb-2">H2 - 24px / Semibold</p>
              <h2 className="text-[#111827]" style={{ fontSize: '24px', fontWeight: '600' }}>
                The quick brown fox jumps over the lazy dog
              </h2>
            </div>
            <div>
              <p className="text-sm text-[#6B7280] mb-2">H3 - 18px / Semibold</p>
              <h3 className="text-[#111827]" style={{ fontSize: '18px', fontWeight: '600' }}>
                The quick brown fox jumps over the lazy dog
              </h3>
            </div>
            <div>
              <p className="text-sm text-[#6B7280] mb-2">Body - 16px / Regular</p>
              <p className="text-[#111827]" style={{ fontSize: '16px' }}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div>
              <p className="text-sm text-[#6B7280] mb-2">Body Small - 14px / Regular</p>
              <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          <h2 className="text-[#111827] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>Color Palette</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-[#111827] mb-3">Primary Colors</p>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="h-20 rounded-xl bg-[#0D9488] border border-[#E5E7EB]" />
                  <p className="text-sm font-medium text-[#111827] mt-2">Primary Teal</p>
                  <p className="text-xs text-[#6B7280]">#0D9488</p>
                </div>
                <div>
                  <div className="h-20 rounded-xl bg-[#0EA5E9] border border-[#E5E7EB]" />
                  <p className="text-sm font-medium text-[#111827] mt-2">Blue</p>
                  <p className="text-xs text-[#6B7280]">#0EA5E9</p>
                </div>
                <div>
                  <div className="h-20 rounded-xl bg-[#10B981] border border-[#E5E7EB]" />
                  <p className="text-sm font-medium text-[#111827] mt-2">Success Green</p>
                  <p className="text-xs text-[#6B7280]">#10B981</p>
                </div>
                <div>
                  <div className="h-20 rounded-xl bg-[#F59E0B] border border-[#E5E7EB]" />
                  <p className="text-sm font-medium text-[#111827] mt-2">Warning Amber</p>
                  <p className="text-xs text-[#6B7280]">#F59E0B</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-[#111827] mb-3">Neutrals</p>
              <div className="grid grid-cols-6 gap-4">
                {[
                  { color: '#F9FAFB', name: 'Gray 50' },
                  { color: '#E5E7EB', name: 'Gray 200' },
                  { color: '#9CA3AF', name: 'Gray 400' },
                  { color: '#6B7280', name: 'Gray 500' },
                  { color: '#374151', name: 'Gray 700' },
                  { color: '#111827', name: 'Gray 900' },
                ].map((item) => (
                  <div key={item.color}>
                    <div className="h-16 rounded-xl border border-[#E5E7EB]" style={{ backgroundColor: item.color }} />
                    <p className="text-xs font-medium text-[#111827] mt-2">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          <h2 className="text-[#111827] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>Buttons</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button className="bg-[#0D9488] hover:bg-[#0F766E]">Primary Button</Button>
              <Button variant="outline">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button disabled>Disabled Button</Button>
            </div>
            <div className="flex items-center gap-4">
              <Button className="bg-[#0D9488] hover:bg-[#0F766E] gap-2">
                <Check className="w-4 h-4" />
                With Icon
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </section>

        {/* Status Chips & Badges */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          <h2 className="text-[#111827] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>Status Chips & Badges</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-[#111827] mb-3">Status Chips</p>
              <div className="flex items-center gap-3 flex-wrap">
                <StatusChip status="needs-review" />
                <StatusChip status="approved" />
                <StatusChip status="missing-info" />
                <StatusChip status="in-progress" />
                <StatusChip status="connected" />
                <StatusChip status="reconnecting" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#111827] mb-3">Confidence Badges</p>
              <div className="flex items-center gap-3">
                <ConfidenceBadge level="high" />
                <ConfidenceBadge level="medium" />
                <ConfidenceBadge level="low" />
              </div>
            </div>
          </div>
        </section>

        {/* Icons */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          <h2 className="text-[#111827] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>Icons</h2>
          <div className="grid grid-cols-8 gap-6">
            {[
              { Icon: Mic, name: 'Microphone' },
              { Icon: Phone, name: 'Phone' },
              { Icon: Check, name: 'Check' },
              { Icon: AlertTriangle, name: 'Alert' },
              { Icon: Download, name: 'Download' },
              { Icon: Edit, name: 'Edit' },
              { Icon: Clipboard, name: 'Clipboard' },
              { Icon: User, name: 'User' },
              { Icon: Calendar, name: 'Calendar' },
              { Icon: Activity, name: 'Activity' },
            ].map(({ Icon, name }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#F9FAFB] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#6B7280]" />
                </div>
                <p className="text-xs text-[#6B7280] text-center">{name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form Elements */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          <h2 className="text-[#111827] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>Form Elements</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm font-medium text-[#111827] mb-2 block">Input Field</label>
              <Input placeholder="Enter text..." />
            </div>
            <div>
              <label className="text-sm font-medium text-[#111827] mb-2 block">Input with Icon</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <Input placeholder="Full name" className="pl-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Progress & Stepper */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          <h2 className="text-[#111827] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>Progress Indicators</h2>
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-[#111827] mb-3">Progress Bar</p>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#111827] mb-4">Stepper</p>
              <Stepper steps={['Basics', 'Symptoms', 'Medications', 'Confirm']} currentStep={1} />
            </div>
          </div>
        </section>

        {/* Microphone Button States */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          <h2 className="text-[#111827] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>Microphone Button States</h2>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <MicrophoneButton state="idle" />
              <p className="text-sm text-[#6B7280] mt-4">Idle</p>
            </div>
            <div className="text-center">
              <MicrophoneButton state="listening" />
              <p className="text-sm text-[#6B7280] mt-4">Listening</p>
            </div>
            <div className="text-center">
              <MicrophoneButton state="processing" />
              <p className="text-sm text-[#6B7280] mt-4">Processing</p>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          <h2 className="text-[#111827] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>Cards</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="font-semibold text-[#111827] mb-2" style={{ fontSize: '18px' }}>Basic Card</h3>
              <p className="text-sm text-[#6B7280]">Clean card with rounded corners and subtle shadow.</p>
            </div>
            <div className="bg-[#F0FDFA] rounded-xl border border-[#99F6E4] p-6">
              <h3 className="font-semibold text-[#0D9488] mb-2" style={{ fontSize: '18px' }}>Success Card</h3>
              <p className="text-sm text-[#0F766E]">Teal background for success states.</p>
            </div>
            <div className="bg-[#FEF3C7] rounded-xl border border-[#FDE68A] p-6">
              <h3 className="font-semibold text-[#92400E] mb-2" style={{ fontSize: '18px' }}>Warning Card</h3>
              <p className="text-sm text-[#92400E]">Amber background for warnings.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
