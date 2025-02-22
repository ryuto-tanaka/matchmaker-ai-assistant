
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
