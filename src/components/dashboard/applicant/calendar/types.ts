
export interface EventDetails {
  date: Date;
  title: string;
  type: 'deadline' | 'consultation' | 'reminder';
  description?: string;
}
