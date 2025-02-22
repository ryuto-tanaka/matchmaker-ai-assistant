
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";

interface PurposeSelectionProps {
  purposes: string[];
  onReset: () => void;
}

const PurposeSelection = ({ purposes, onReset }: PurposeSelectionProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">利用目的を選択</label>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-gray-500"
          onClick={onReset}
        >
          <X className="h-4 w-4 mr-1" />
          リセットする
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {purposes.map((purpose) => (
          <div key={purpose} className="flex items-center space-x-2">
            <Checkbox id={purpose} />
            <label
              htmlFor={purpose}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {purpose}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurposeSelection;
