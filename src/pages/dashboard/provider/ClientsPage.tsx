
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { NewClientModal } from '@/components/modals/NewClientModal';
import { ClientFilters } from '@/components/provider/clients/ClientFilters';
import { SortableClientCard } from '@/components/provider/clients/SortableClientCard';
import { Client } from '@/types/client';
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
} from '@dnd-kit/sortable';

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

        <ClientFilters
          statusFilter={statusFilter}
          dateFilter={dateFilter}
          sortBy={sortBy}
          showHighPriorityOnly={showHighPriorityOnly}
          setStatusFilter={setStatusFilter}
          setDateFilter={setDateFilter}
          setSortBy={setSortBy}
          setShowHighPriorityOnly={setShowHighPriorityOnly}
        />

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
