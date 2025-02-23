
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

  if (isLoading || !stats) {
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
        {stats.map((stat, index) => (
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
