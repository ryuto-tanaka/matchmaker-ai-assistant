
import { LucideIcon } from 'lucide-react';

export type StatLabel = '進行中の案件' | '契約クライアント' | '今月の成約率' | '今月の売上';

export interface DashboardStat {
  icon: LucideIcon;
  label: StatLabel;
  value: string;
}

export interface DashboardStatsProps {
  openDialogs: { [key: number]: boolean };
  onOpenChange: (index: number, open: boolean) => void;
}

export interface DashboardFiltersProps {
  statusFilter: string;
  dateFilter: string;
  onStatusFilterChange: (value: string) => void;
  onDateFilterChange: (value: string) => void;
}

export interface RecentProjectsListProps {
  statusFilter: string;
  dateFilter: string;
}

