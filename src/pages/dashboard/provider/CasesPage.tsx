import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Calendar, DollarSign, MessageSquare } from 'lucide-react';
import { Case } from '@/types/client';
import { CaseFilters } from '@/components/provider/cases/CaseFilters';
import { CaseStats } from '@/components/provider/cases/CaseStats';
import { CaseBoard } from '@/components/provider/cases/CaseBoard';
import { CaseCalendar } from '@/components/provider/cases/CaseCalendar';

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

  const filteredCases = cases.filter(case_ => {
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || case_.industry === industryFilter;
    const matchesDeadline = !deadlineFilter || case_.deadline === deadlineFilter;
    return matchesStatus && matchesIndustry && matchesDeadline;
  });

  const handleStatusChange = (caseId: number, newStatus: string) => {
    const updatedCases = [...cases];
    const caseIndex = updatedCases.findIndex(c => c.id === caseId);
    if (caseIndex !== -1) {
      updatedCases[caseIndex].status = newStatus;
      setCases(updatedCases);
    }
  };

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

        <CaseStats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CaseBoard 
              filteredCases={filteredCases}
              onStatusChange={handleStatusChange}
            />
          </div>
          <div>
            <CaseCalendar cases={cases} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CasesPage;
