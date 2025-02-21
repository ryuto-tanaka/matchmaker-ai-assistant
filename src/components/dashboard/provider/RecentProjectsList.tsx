
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentProjectsListProps {
  statusFilter: string;
  dateFilter: string;
}

export const RecentProjectsList = ({ statusFilter, dateFilter }: RecentProjectsListProps) => {
  const filterProjects = (projects: any[]) => {
    return projects.filter(project => {
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesDate = !dateFilter || project.date === dateFilter;
      return matchesStatus && matchesDate;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近の案件</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">IT導入支援</p>
                <p className="text-sm text-gray-500">クライアント: 株式会社ABC</p>
              </div>
              <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">
                進行中
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
