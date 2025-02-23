
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AIBusinessPlanCard } from './AIBusinessPlanCard';
import { StatCard } from './StatCard';
import { fetchDashboardStats, validRoutes, getDaysUntil } from './dashboardData';
import { useQuery } from '@tanstack/react-query';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = React.useState<number | null>(null);

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats
  });

  const handleDetailClick = (path: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (validRoutes.includes(path)) {
      navigate(path);
    }
  };

  const isValidRoute = (path: string) => validRoutes.includes(path);

  // データがロード中または存在しない場合でもカードを表示する
  const displayStats = stats || [
    {
      icon: null,
      label: '申請中の補助金',
      value: '0件',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      details: []
    },
    {
      icon: null,
      label: '過去の申請補助金',
      value: '0件',
      color: 'bg-gray-50',
      iconColor: 'text-gray-600',
      details: []
    },
    {
      icon: null,
      label: '相談中の専門家',
      value: '0名',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      details: []
    },
    {
      icon: null,
      label: '承認済み',
      value: '0件',
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      details: []
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <AIBusinessPlanCard />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="h-32 bg-white shadow-sm border border-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AIBusinessPlanCard />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayStats.map((stat, index) => (
          <StatCard
            key={index}
            stat={stat}
            isExpanded={expandedCard === index}
            onExpandChange={() => setExpandedCard(expandedCard === index ? null : index)}
            isValidRoute={isValidRoute}
            onDetailClick={handleDetailClick}
            getDaysUntil={getDaysUntil}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
