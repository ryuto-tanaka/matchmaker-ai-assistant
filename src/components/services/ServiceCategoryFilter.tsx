
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { targetIndustries } from '@/data/industries';

const ServiceCategoryFilter = () => {
  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">業種</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-2 pr-4">
          {targetIndustries.map((industry, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start font-normal"
            >
              {industry}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ServiceCategoryFilter;
