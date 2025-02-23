
import React from 'react';
import { Button } from '@/components/ui/button';

interface ExpertCategoryFilterProps {
  categories: readonly string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

export const ExpertCategoryFilter = ({
  categories,
  selectedCategories,
  onToggleCategory,
}: ExpertCategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategories.includes(category) ? "default" : "outline"}
          size="sm"
          onClick={() => onToggleCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
