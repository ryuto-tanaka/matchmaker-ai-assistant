
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AIBusinessPlanCard } from './AIBusinessPlanCard';
import { StatCard } from './StatCard';
import { dashboardStats, validRoutes, getDaysUntil } from './dashboardData';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = React.useState<number | null>(null);

  const handleDetailClick = (path: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (validRoutes.includes(path)) {
      navigate(path);
    }
  };

  const isValidRoute = (path: string) => validRoutes.includes(path);

  return (
    <div className="space-y-6">
      <AIBusinessPlanCard />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
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
