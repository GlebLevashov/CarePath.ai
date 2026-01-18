import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Activity, Search, Filter, User, LayoutDashboard, Users, Settings, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatusChip } from '@/app/components/StatusChip';

interface StaffDashboardProps {
  onSelectIntake: () => void;
}

export function StaffDashboard({ onSelectIntake }: StaffDashboardProps) {
  const [filter, setFilter] = useState('all');

  const intakes = [
    {
      id: 'INT-4832',
      patient: 'Sarah Johnson',
      created: '2:14 PM',
      status: 'needs-review' as const,
      reason: 'Persistent headaches',
      provider: 'Dr. Martinez',
    },
    {
      id: 'INT-4831',
      patient: 'Michael Chen',
      created: '1:45 PM',
      status: 'approved' as const,
      reason: 'Annual physical',
      provider: 'Dr. Smith',
    },
    {
      id: 'INT-4830',
      patient: 'Emily Rodriguez',
      created: '1:20 PM',
      status: 'missing-info' as const,
      reason: 'Follow-up appointment',
      provider: 'Dr. Martinez',
    },
    {
      id: 'INT-4829',
      patient: 'James Wilson',
      created: '12:55 PM',
      status: 'in-progress' as const,
      reason: 'Knee pain',
      provider: 'Dr. Thompson',
    },
    {
      id: 'INT-4828',
      patient: 'Lisa Anderson',
      created: '12:30 PM',
      status: 'approved' as const,
      reason: 'Medication refill',
      provider: 'Dr. Smith',
    },
  ];

  const stats = [
    { label: 'Total Intakes', value: '24', icon: Activity, color: 'text-[#0D9488]' },
    { label: 'Needs Review', value: '8', icon: AlertCircle, color: 'text-[#F59E0B]' },
    { label: 'Avg. Completion', value: '2.3 min', icon: Clock, color: 'text-[#0EA5E9]' },
    { label: 'Approved Today', value: '16', icon: CheckCircle2, color: 'text-[#10B981]' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col">
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0D9488] flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-[#111827]" style={{ fontSize: '18px' }}>IntakeFlow</h1>
              <p className="text-xs text-[#6B7280]">Staff Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#F0FDFA] text-[#0D9488] font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#6B7280] hover:bg-[#F9FAFB]">
            <Activity className="w-5 h-5" />
            Intakes
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#6B7280] hover:bg-[#F9FAFB]">
            <Users className="w-5 h-5" />
            Patients
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#6B7280] hover:bg-[#F9FAFB]">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center">
              <User className="w-4 h-4 text-[#6B7280]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#111827]">Dr. Martinez</p>
              <p className="text-xs text-[#6B7280]">Staff Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-[#111827] mb-2" style={{ fontSize: '32px', fontWeight: '600' }}>
              Dashboard
            </h2>
            <p className="text-[#6B7280]">Overview of today's patient intakes</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-3xl font-semibold text-[#111827] mb-1">{stat.value}</p>
                <p className="text-sm text-[#6B7280]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <Input
                  placeholder="Search by patient name or ID..."
                  className="pl-10 bg-[#F9FAFB]"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-48 bg-[#F9FAFB]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="needs-review">Needs Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="missing-info">Missing Info</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Intakes Table */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason for Visit</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {intakes.map((intake) => (
                  <TableRow key={intake.id} className="cursor-pointer hover:bg-[#F9FAFB]">
                    <TableCell className="font-medium text-[#0D9488]">{intake.id}</TableCell>
                    <TableCell className="font-medium">{intake.patient}</TableCell>
                    <TableCell className="text-[#6B7280]">{intake.created}</TableCell>
                    <TableCell>
                      <StatusChip status={intake.status} />
                    </TableCell>
                    <TableCell>{intake.reason}</TableCell>
                    <TableCell className="text-[#6B7280]">{intake.provider}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onSelectIntake}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
