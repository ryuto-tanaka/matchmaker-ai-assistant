
export interface EventDetails {
  id: string;
  date: Date;
  title: string;
  type: 'deadline' | 'consultation' | 'reminder';
  description?: string;
  user_id: string;
}

export interface CalendarEventDB {
  id: string;
  event_date: string;
  title: string;
  event_type: 'deadline' | 'consultation' | 'reminder';
  description: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}
