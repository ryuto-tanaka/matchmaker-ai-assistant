
export interface Client {
  id: string;
  name: string;
  industry: string;
  activeProjects: number;
  contactPerson: string;
  phone: string;
  status: string;
  lastUpdated: string;
  priority?: 'high' | 'medium' | 'low';
  reminder?: string;
}

export interface SortableClientCardProps {
  client: Client;
}

export interface Case {
  id: number;
  client: string;
  type: string;
  status: string;
  amount: string;
  deadline: string;
  description?: string;
  industry?: string;
  reminder?: string;
  timeline?: TimelineEvent[];
}

export interface TimelineEvent {
  id: number;
  date: string;
  type: 'meeting' | 'document' | 'status_change' | 'note';
  description: string;
}

export interface CaseFiltersProps {
  statusFilter: string;
  industryFilter: string;
  deadlineFilter: string;
  onStatusFilterChange: (value: string) => void;
  onIndustryFilterChange: (value: string) => void;
  onDeadlineFilterChange: (value: string) => void;
}
