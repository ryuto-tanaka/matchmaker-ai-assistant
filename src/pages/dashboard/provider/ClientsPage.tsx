
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Building, FileText, Users, Phone, Bell } from 'lucide-react';
import { NewClientModal } from '@/components/modals/NewClientModal';
import { Button } from '@/components/ui/button';
import { ProviderClientDetailsModal } from '@/components/modals/ProviderClientDetailsModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Client {
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

interface SortableClientCardProps {
  client: Client;
}

const SortableClientCard = ({ client }: SortableClientCardProps) => {
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

const ClientsPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('lastUpdated');
  const [showHighPriorityOnly, setShowHighPriorityOnly] = useState(false);

  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: '株式会社ABC',
      industry: 'IT・通信',
      activeProjects: 2,
      contactPerson: '山田太郎',
      phone: '03-1234-5678',
      status: 'アクティブ',
      lastUpdated: '2024-03-10',
      priority: 'high',
      reminder: '2024-03-20',
    },
    {
      id: "2",
      name: '株式会社XYZ',
      industry: '製造業',
      activeProjects: 1,
      contactPerson: '鈴木花子',
      phone: '03-8765-4321',
      status: 'アクティブ',
      lastUpdated: '2024-03-05',
      priority: 'medium',
    },
    {
      id: "3",
      name: '有限会社DEF',
      industry: 'サービス業',
      activeProjects: 3,
      contactPerson: '佐藤一郎',
      phone: '03-2468-1357',
      status: '完了',
      lastUpdated: '2024-02-28',
      priority: 'low',
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredAndSortedClients = clients
    .filter(client => {
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesDate = !dateFilter || client.lastUpdated === dateFilter;
      const matchesPriority = !showHighPriorityOnly || client.priority === 'high';
      return matchesStatus && matchesDate && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority || 'low'] || 0) - (priorityOrder[a.priority || 'low'] || 0);
        case 'activeProjects':
          return b.activeProjects - a.activeProjects;
        case 'lastUpdated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = clients.findIndex((client) => client.id === active.id);
      const newIndex = clients.findIndex((client) => client.id === over.id);
      const newClients = [...clients];
      const [movedClient] = newClients.splice(oldIndex, 1);
      newClients.splice(newIndex, 0, movedClient);
      setClients(newClients);
    }
  };

  return (
    <DashboardLayout userType="provider" userName="提供者">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">クライアント管理</h1>
          <NewClientModal />
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="w-48">
            <Select onValueChange={setStatusFilter} defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="アクティブ">アクティブ</SelectItem>
                <SelectItem value="完了">完了</SelectItem>
                <SelectItem value="保留中">保留中</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-48">
            <Select onValueChange={setSortBy} defaultValue="lastUpdated">
              <SelectTrigger>
                <SelectValue placeholder="並び替え" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastUpdated">最終更新日</SelectItem>
                <SelectItem value="priority">重要度</SelectItem>
                <SelectItem value="activeProjects">進行中案件数</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="priority-filter"
              checked={showHighPriorityOnly}
              onCheckedChange={setShowHighPriorityOnly}
            />
            <Label htmlFor="priority-filter">重要案件のみ表示</Label>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={filteredAndSortedClients.map(client => client.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {filteredAndSortedClients.map((client) => (
                <SortableClientCard key={client.id} client={client} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </DashboardLayout>
  );
};

export default ClientsPage;
