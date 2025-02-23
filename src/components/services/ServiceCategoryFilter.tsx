
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import { targetIndustries } from '@/data/industries';
import { cn } from '@/lib/utils';

const ServiceCategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">業種</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-1 pr-4">
          {targetIndustries.map((largeCategory) => (
            <Collapsible
              key={largeCategory.name}
              open={openCategories.includes(largeCategory.name)}
              className="space-y-1"
            >
              <CollapsibleTrigger
                className="flex w-full items-center justify-between py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={() => toggleCategory(largeCategory.name)}
              >
                <span>{largeCategory.name}</span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200",
                    openCategories.includes(largeCategory.name) && "rotate-90"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 space-y-1">
                {largeCategory.subcategories?.map((mediumCategory) => (
                  <Collapsible
                    key={mediumCategory.name}
                    open={openCategories.includes(mediumCategory.name)}
                    className="space-y-1"
                  >
                    <CollapsibleTrigger
                      className="flex w-full items-center justify-between py-1 text-sm hover:bg-accent hover:text-accent-foreground"
                      onClick={() => toggleCategory(mediumCategory.name)}
                    >
                      <span>{mediumCategory.name}</span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform duration-200",
                          openCategories.includes(mediumCategory.name) && "rotate-90"
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1">
                      {mediumCategory.subcategories?.map((smallCategory) => (
                        <Button
                          key={smallCategory.name}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start text-sm font-normal",
                            selectedCategory === smallCategory.name && "bg-accent text-accent-foreground"
                          )}
                          onClick={() => handleCategorySelect(smallCategory.name)}
                        >
                          {smallCategory.name}
                        </Button>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ServiceCategoryFilter;

