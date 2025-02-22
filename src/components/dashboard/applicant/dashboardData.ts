
import { FileText, Users, Clock, CheckCircle, Archive } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface StatDetail {
  text: string;
  path: string;
  progress?: number;
  dueDate?: string;
  status?: string;
  urgent?: boolean;
}

export interface DashboardStat {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  iconColor: string;
  progress?: number;
  details: StatDetail[];
}

// 期限切れかどうかを判断する関数を追加
const isExpired = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  const today = new Date();
  const due = new Date(dueDate);
  return due < today;
};

// 申請データを期限切れかどうかで分類
const applications = [
  { 
    text: 'IT導入補助金', 
    path: '/dashboard/applicant/applications/2',
    progress: 60,
    dueDate: '2024-04-15',
    status: '申請書作成中',
    urgent: true
  },
  { 
    text: '事業再構築補助金', 
    path: '/dashboard/applicant/applications/3',
    progress: 30,
    dueDate: '2024-05-30',
    status: '準備中'
  },
  { 
    text: '小規模事業者持続化補助金', 
    path: '/dashboard/applicant/applications/1',
    progress: 80,
    dueDate: '2024-03-31',
    status: '期限切れ'
  }
];

// 現在進行中の申請と期限切れの申請を分類
const activeApplications = applications.filter(app => !isExpired(app.dueDate));
const expiredApplications = applications.filter(app => isExpired(app.dueDate));

export const dashboardStats: DashboardStat[] = [
  { 
    icon: FileText, 
    label: '申請中の補助金', 
    value: `${activeApplications.length}件`,
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    progress: 75,
    details: activeApplications
  },
  { 
    icon: Archive, 
    label: '過去の申請補助金', 
    value: `${expiredApplications.length}件`,
    color: 'bg-gray-50',
    iconColor: 'text-gray-600',
    details: expiredApplications
  },
  { 
    icon: Users, 
    label: '相談中の専門家', 
    value: '2名',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
    details: [
      { text: '山田太郎（中小企業診断士）', path: '/dashboard/messages/1' },
      { text: '佐藤花子（税理士）', path: '/dashboard/messages/2' }
    ]
  },
  { 
    icon: Clock, 
    label: '審査待ち', 
    value: '1件',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    details: [
      { text: 'ものづくり補助金（一次審査中）', path: '/dashboard/applicant/applications/4' }
    ]
  },
  { 
    icon: CheckCircle, 
    label: '承認済み', 
    value: '2件',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
    details: [
      { text: '小規模事業者持続化補助金（50万円）', path: '/dashboard/applicant/applications/5' },
      { text: 'IT導入補助金（70万円）', path: '/dashboard/applicant/applications/6' }
    ]
  },
];

export const validRoutes = [
  '/dashboard/messages/1',
  '/dashboard/messages/2'
];

export const getDaysUntil = (dateString: string): number => {
  const today = new Date();
  const dueDate = new Date(dateString);
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
