
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ServicesList from '@/components/services/ServicesList';
import ServiceSearchBar from '@/components/services/ServiceSearchBar';
import ServiceCategoryFilter from '@/components/services/ServiceCategoryFilter';
import { Card } from '@/components/ui/card';

const ServicesPage = () => {
  return (
    <DashboardLayout userType="applicant">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">サービスを探す</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          <div className="space-y-4">
            <ServiceCategoryFilter />
          </div>
          
          <div className="space-y-4">
            <Card className="p-4">
              <ServiceSearchBar />
            </Card>
            <ServicesList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;
