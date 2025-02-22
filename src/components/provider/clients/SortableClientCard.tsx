
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from "@/components/ui/card";
import { Building, FileText, Users, Phone, Bell } from 'lucide-react';
import { ProviderClientDetailsModal } from '@/components/modals/ProviderClientDetailsModal';
import { SortableClientCardProps } from '@/types/client';

export const SortableClientCard = ({ client }: SortableClientCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: client.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="mb-4 cursor-move">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${
                client.priority === 'high' ? 'bg-red-100' :
                client.priority === 'medium' ? 'bg-yellow-100' :
                'bg-primary/10'
              }`}>
                <Building className={`h-6 w-6 ${
                  client.priority === 'high' ? 'text-red-500' :
                  client.priority === 'medium' ? 'text-yellow-500' :
                  'text-primary'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold">{client.name}</h3>
                <p className="text-sm text-gray-500">{client.industry}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm">進行中: {client.activeProjects}件</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm">担当: {client.contactPerson}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm">{client.phone}</span>
                  </div>
                  {client.reminder && (
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-yellow-600">期限: {client.reminder}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm rounded-full ${
                client.status === 'アクティブ'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {client.status}
              </span>
              <ProviderClientDetailsModal client={client} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
