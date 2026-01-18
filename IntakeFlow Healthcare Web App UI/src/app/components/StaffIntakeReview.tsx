import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { Activity, ArrowLeft, CheckCircle2, Download, FileText, Play, Pause, SkipBack, Clock, AlertCircle, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { StatusChip } from '@/app/components/StatusChip';
import { ConfidenceBadge } from '@/app/components/ConfidenceBadge';
import { TranscriptBubble } from '@/app/components/TranscriptBubble';

interface StaffIntakeReviewProps {
  onBack: () => void;
}

export function StaffIntakeReview({ onBack }: StaffIntakeReviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['demographics', 'chief-complaint']);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const transcript = [
    { speaker: 'assistant' as const, text: "Hi! I'm here to help with your check-in. Can you tell me your full name?", timestamp: '2:10 PM' },
    { speaker: 'patient' as const, text: "Sarah Johnson", timestamp: '2:10 PM' },
    { speaker: 'assistant' as const, text: "Thank you, Sarah. And what's your date of birth?", timestamp: '2:10 PM' },
    { speaker: 'patient' as const, text: "March 15th, 1985", timestamp: '2:11 PM' },
    { speaker: 'assistant' as const, text: "Got it. What brings you in today?", timestamp: '2:11 PM' },
    { speaker: 'patient' as const, text: "I've been having persistent headaches for the past week, mainly in the morning.", timestamp: '2:11 PM' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="w-px h-6 bg-[#E5E7EB]" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0D9488] flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-[#111827]" style={{ fontSize: '18px' }}>Intake Review</h1>
                <p className="text-sm text-[#6B7280]">INT-4832</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <Badge variant="outline" className="bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]">
                Changes pending
              </Badge>
            )}
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="bg-[#0D9488] hover:bg-[#0F766E] gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Approve & Export
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - 3 Column Layout */}
      <main className="flex">
        {/* Left Column - Patient Card */}
        <aside className="w-80 bg-white border-r border-[#E5E7EB] p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-[#111827] mb-4" style={{ fontSize: '18px' }}>
              Patient Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#6B7280]">Name</p>
                  <p className="font-medium text-[#111827]">Sarah Johnson</p>
                </div>
                <ConfidenceBadge level="high" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#6B7280]">Date of Birth</p>
                  <p className="font-medium text-[#111827]">March 15, 1985</p>
                </div>
                <ConfidenceBadge level="high" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#6B7280]">Phone</p>
                  <p className="font-medium text-[#111827]">(555) 123-4567</p>
                </div>
                <ConfidenceBadge level="medium" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Preferred Language</p>
                <p className="font-medium text-[#111827]">English</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E5E7EB]">
            <h4 className="font-medium text-[#111827] mb-3">Session Info</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Timestamp</span>
                <span className="text-[#111827]">2:14 PM</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Duration</span>
                <span className="text-[#111827]">2m 34s</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Status</span>
                <StatusChip status="needs-review" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              <h4 className="font-medium text-[#111827]">Schema Valid</h4>
            </div>
            <p className="text-sm text-[#6B7280]">All required fields captured</p>
          </div>

          <Button variant="outline" className="w-full gap-2">
            <Mail className="w-4 h-4" />
            Request Clarification
          </Button>
        </aside>

        {/* Middle Column - Structured Form */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl space-y-4">
            {/* Demographics Section */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
              <button
                onClick={() => toggleSection('demographics')}
                className="w-full flex items-center justify-between p-4 hover:bg-[#F9FAFB] transition-colors"
              >
                <h3 className="font-semibold text-[#111827]" style={{ fontSize: '18px' }}>Demographics</h3>
                {expandedSections.includes('demographics') ? (
                  <ChevronUp className="w-5 h-5 text-[#6B7280]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                )}
              </button>
              {expandedSections.includes('demographics') && (
                <div className="p-4 pt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <div className="flex gap-2">
                        <Input defaultValue="Sarah" onChange={() => setHasChanges(true)} />
                        <ConfidenceBadge level="high" />
                      </div>
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <div className="flex gap-2">
                        <Input defaultValue="Johnson" onChange={() => setHasChanges(true)} />
                        <ConfidenceBadge level="high" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Date of Birth</Label>
                      <div className="flex gap-2">
                        <Input defaultValue="03/15/1985" onChange={() => setHasChanges(true)} />
                        <ConfidenceBadge level="high" />
                      </div>
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <div className="flex gap-2">
                        <Input defaultValue="(555) 123-4567" onChange={() => setHasChanges(true)} />
                        <ConfidenceBadge level="medium" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chief Complaint Section */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
              <button
                onClick={() => toggleSection('chief-complaint')}
                className="w-full flex items-center justify-between p-4 hover:bg-[#F9FAFB] transition-colors"
              >
                <h3 className="font-semibold text-[#111827]" style={{ fontSize: '18px' }}>Chief Complaint</h3>
                {expandedSections.includes('chief-complaint') ? (
                  <ChevronUp className="w-5 h-5 text-[#6B7280]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                )}
              </button>
              {expandedSections.includes('chief-complaint') && (
                <div className="p-4 pt-0 space-y-4">
                  <div>
                    <Label>Reason for Visit</Label>
                    <div className="flex gap-2">
                      <Textarea
                        defaultValue="Persistent headaches for the past week, mainly in the morning"
                        className="min-h-24"
                        onChange={() => setHasChanges(true)}
                      />
                      <ConfidenceBadge level="high" />
                    </div>
                  </div>
                  <div>
                    <Label>Symptom Duration</Label>
                    <div className="flex gap-2">
                      <Input defaultValue="1 week" onChange={() => setHasChanges(true)} />
                      <ConfidenceBadge level="high" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Medications Section */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
              <button
                onClick={() => toggleSection('medications')}
                className="w-full flex items-center justify-between p-4 hover:bg-[#F9FAFB] transition-colors"
              >
                <h3 className="font-semibold text-[#111827]" style={{ fontSize: '18px' }}>Medications</h3>
                {expandedSections.includes('medications') ? (
                  <ChevronUp className="w-5 h-5 text-[#6B7280]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                )}
              </button>
              {expandedSections.includes('medications') && (
                <div className="p-4 pt-0 space-y-4">
                  <div>
                    <Label>Current Medications</Label>
                    <div className="flex gap-2">
                      <Textarea
                        defaultValue="Lisinopril 10mg daily&#10;Metformin 500mg twice daily"
                        className="min-h-24"
                        onChange={() => setHasChanges(true)}
                      />
                      <ConfidenceBadge level="medium" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Allergies Section */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
              <button
                onClick={() => toggleSection('allergies')}
                className="w-full flex items-center justify-between p-4 hover:bg-[#F9FAFB] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[#111827]" style={{ fontSize: '18px' }}>Allergies</h3>
                  <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
                </div>
                {expandedSections.includes('allergies') ? (
                  <ChevronUp className="w-5 h-5 text-[#6B7280]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                )}
              </button>
              {expandedSections.includes('allergies') && (
                <div className="p-4 pt-0 space-y-4">
                  <div>
                    <Label>Known Allergies</Label>
                    <div className="flex gap-2">
                      <Textarea
                        defaultValue="Penicillin - rash&#10;Shellfish - anaphylaxis"
                        className="min-h-24"
                        onChange={() => setHasChanges(true)}
                      />
                      <ConfidenceBadge level="low" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Transcript & Audio */}
        <aside className="w-96 bg-white border-l border-[#E5E7EB] flex flex-col">
          <Tabs defaultValue="transcript" className="flex-1 flex flex-col">
            <TabsList className="w-full rounded-none border-b border-[#E5E7EB] bg-transparent p-0">
              <TabsTrigger value="transcript" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0D9488]">
                Transcript
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0D9488]">
                Audio
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transcript" className="flex-1 p-4 overflow-auto">
              <div className="space-y-2">
                {transcript.map((item, index) => (
                  <div key={index}>
                    <TranscriptBubble
                      speaker={item.speaker}
                      text={item.text}
                      timestamp={item.timestamp}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audio" className="flex-1 p-4">
              <div className="space-y-4">
                <div className="bg-[#F9FAFB] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#111827]">Recording</span>
                    <span className="text-sm text-[#6B7280]">2:34</span>
                  </div>
                  <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden mb-4">
                    <div className="h-full w-1/3 bg-[#0D9488]" />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="ghost" size="sm">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="w-12 h-12 rounded-full bg-[#0D9488] hover:bg-[#0F766E]"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm">
                      1.0x
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-[#111827] text-sm">Jump to</h4>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-[#F9FAFB] transition-colors">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-sm text-[#111827]">Demographics</span>
                      <span className="text-xs text-[#6B7280] ml-auto">0:12</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-[#F9FAFB] transition-colors">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-sm text-[#111827]">Chief Complaint</span>
                      <span className="text-xs text-[#6B7280] ml-auto">0:45</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-[#F9FAFB] transition-colors">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-sm text-[#111827]">Medications</span>
                      <span className="text-xs text-[#6B7280] ml-auto">1:30</span>
                    </div>
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </aside>
      </main>
    </div>
  );
}
