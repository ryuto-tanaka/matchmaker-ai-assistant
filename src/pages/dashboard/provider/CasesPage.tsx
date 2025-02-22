import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, DollarSign, MessageSquare, Bell } from 'lucide-react';
import { CaseDetailsModal } from '@/components/modals/CaseDetailsModal';
import { Case } from '@/types/client';
import { CaseFilters } from '@/components/provider/cases/CaseFilters';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import type { CalendarEvent } from '@/components/ui/calendar';

const CasesPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [deadlineFilter, setDeadlineFilter] = useState<string>('');
  
  const [cases, setCases] = useState<Case[]>([
    {
      id: 1,
      client: '株式会社ABC',
      type: 'システム開発',
      status: '見積依頼中',
      amount: '450万円',
      deadline: '2024/03/31',
      description: 'クラウドシステムの開発案件',
      industry: 'IT・通信',
      reminder: '2024/03/20',
      timeline: [
        {
          id: 1,
          date: '2024/03/15',
          type: 'meeting',
          description: '初回ヒアリング実施'
        },
        {
          id: 2,
          date: '2024/03/16',
          type: 'document',
          description: '見積書送付'
        }
      ]
    },
    {
      id: 2,
      client: '株式会社XYZ',
      type: 'コンサルティング',
      status: '商談中',
      amount: '120万円',
      deadline: '2024/04/15',
      description: 'デジタル戦略策定支援',
      industry: '製造業',
      reminder: '2024/04/10',
      timeline: [
        {
          id: 3,
          date: '2024/04/01',
          type: 'meeting',
          description: '2回目の打ち合わせ'
        },
        {
          id: 4,
          date: '2024/04/05',
          type: 'document',
          description: '提案書提出'
        }
      ]
    },
    {
      id: 3,
      client: '有限会社DEF',
      type: 'システム保守',
      status: '受注確定',
      amount: '80万円',
      deadline: '2024/05/01',
      description: '基幹システムの保守運用サービス',
      industry: 'サービス業',
      reminder: '2024/04/25',
      timeline: [
        {
          id: 5,
          date: '2024/04/20',
          type: 'meeting',
          description: '契約内容の最終確認'
        },
        {
          id: 6,
          date: '2024/04/28',
          type: 'document',
          description: '契約書締結'
        }
      ]
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredCases = cases.filter(case_ => {
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || case_.industry === industryFilter;
    const matchesDeadline = !deadlineFilter || case_.deadline === deadlineFilter;
    return matchesStatus && matchesIndustry && matchesDeadline;
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const updatedCases = [...cases];
      const caseIndex = updatedCases.findIndex(c => c.id === active.id);
      if (caseIndex !== -1) {
        updatedCases[caseIndex].status = over?.id as string;
        setCases(updatedCases);
      }
    }
  };

  const calendarEvents: CalendarEvent[] = cases.flatMap(case_ => [
    {
      date: new Date(case_.deadline),
      title: `期限: ${case_.client}`,
      type: 'deadline',
      description: case_.description
    },
    ...(case_.reminder ? [{
      date: new Date(case_.reminder),
      title: `リマインダー: ${case_.client}`,
      type: 'reminder',
      description: case_.description
    }] : [])
  ]);

  const stats = [
    { icon: FileText, label: '進行中の案件', value: '4件' },
    { icon: MessageSquare, label: 'トークルーム', value: '2件' },
    { icon: Calendar, label: '商談中', value: '1件' },
    { icon: DollarSign, label: '今月の受注額', value: '350,000円' },
  ];

  return (
    <DashboardLayout userType="provider" userName="提供者">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">案件一覧</h1>
          <div className="text-sm text-gray-500">
            最終更新: {new Date().toLocaleDateString('ja-JP')}
          </div>
        </div>

        <CaseFilters
          statusFilter={statusFilter}
          industryFilter={industryFilter}
          deadlineFilter={deadlineFilter}
          onStatusFilterChange={setStatusFilter}
          onIndustryFilterChange={setIndustryFilter}
          onDeadlineFilterChange={setDeadlineFilter}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <h3 className="text-xl font-bold">{stat.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">案件管理</CardTitle>
              </CardHeader>
              <CardContent>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <div className="grid grid-cols-3 gap-4">
                    {['見積依頼中', '商談中', '受注確定'].map(status => (
                      <div key={status} className="space-y-4">
                        <h3 className="font-semibold text-center p-2 bg-gray-100 rounded-lg">
                          {status}
                        </h3>
                        <SortableContext
                          items={filteredCases.filter(c => c.status === status).map(c => c.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          {filteredCases
                            .filter(case_ => case_.status === status)
                            .map((case_) => (
                              <div
                                key={case_.id}
                                className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold">{case_.client}</h4>
                                    <p className="text-sm text-gray-500">{case_.type}</p>
                                    {case_.reminder && (
                                      <div className="flex items-center mt-2 text-yellow-600">
                                        <Bell className="h-4 w-4 mr-1" />
                                        <span className="text-sm">
                                          リマインダー: {case_.reminder}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <CaseDetailsModal caseData={case_} />
                                </div>
                              </div>
                            ))}
                        </SortableContext>
                      </div>
                    ))}
                  </div>
                </DndContext>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">スケジュール</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  className="rounded-md border"
                  events={calendarEvents}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CasesPage;
