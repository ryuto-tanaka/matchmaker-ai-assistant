
import { Clock, MapPin, FileText } from 'lucide-react';
import type { EventDetails } from './types';

export const getEventTypeIcon = (type: EventDetails['type']) => {
  switch (type) {
    case 'deadline':
      return <Clock className="h-5 w-5 text-red-500" />;
    case 'consultation':
      return <MapPin className="h-5 w-5 text-blue-500" />;
    case 'reminder':
      return <FileText className="h-5 w-5 text-yellow-500" />;
  }
};

export const getEventTypeStyle = (type: EventDetails['type']) => {
  switch (type) {
    case 'deadline':
      return 'border-l-4 border-red-500 bg-red-50 hover:bg-red-100';
    case 'consultation':
      return 'border-l-4 border-blue-500 bg-blue-50 hover:bg-blue-100';
    case 'reminder':
      return 'border-l-4 border-yellow-500 bg-yellow-50 hover:bg-yellow-100';
  }
};
