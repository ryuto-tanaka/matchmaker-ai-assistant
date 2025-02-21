
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Building, FileText, Users, Phone } from 'lucide-react';
import { NewClientModal } from '@/components/modals/NewClientModal';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const ClientsPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');

  const allClients = [
    {
      id: 1,
      name: '株式会社ABC',
      industry: 'IT・通信',
      activeProjects: 2,
      contactPerson: '山田太郎',
      phone: '03-1234-5678',
      status: 'アクティブ',
      lastUpdated: '2024-03-10',
    },
    {
      id: 2,
      name: '株式会社XYZ',
      industry: '製造業',
      activeProjects: 1,
      contactPerson: '鈴木花子',
      phone: '03-8765-4321',
      status: 'アクティブ',
      lastUpdated: '2024-03-05',
    },
    {
      id: 3,
      name: '有限会社DEF',
      industry: 'サービス業',
      activeProjects: 3,
      contactPerson: '佐藤一郎',
      phone: '03-2468-1357',
      status: '完了',
      lastUpdated: '2024-02-28',
    },
  ];

  const filteredClients = allClients.filter(client => {
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesDate = !dateFilter || client.lastUpdated === dateFilter;
    return matchesStatus && matchesDate;
  });

  return (
    <DashboardLayout userType="provider" userName="提供者">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">クライアント管理</h1>
          <NewClientModal />
        </div>

        <div className="flex gap-4 mb-6">
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
        </div>

        <div className="grid gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building className="h-6 w-6 text-primary" />
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
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">詳細</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientsPage;
