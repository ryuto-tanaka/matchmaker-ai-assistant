
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { StatDetailsModal } from "@/components/modals/StatDetailsModal";
import { DashboardStat, DashboardStatsProps } from '@/types/providerDashboard';

export const DashboardStats = ({ openDialogs, onOpenChange }: DashboardStatsProps) => {
  const stats: DashboardStat[] = [
    { icon: FileText, label: '進行中の案件', value: '12件' },
    { icon: Users, label: '契約クライアント', value: '25社' },
    { icon: TrendingUp, label: '今月の成約率', value: '75%' },
    { icon: DollarSign, label: '今月の売上', value: '¥1.2M' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <Dialog 
              open={openDialogs[index]} 
              onOpenChange={(open) => onOpenChange(index, open)}
            >
              <DialogTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <StatDetailsModal statType={stat.label} value={stat.value} />
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

