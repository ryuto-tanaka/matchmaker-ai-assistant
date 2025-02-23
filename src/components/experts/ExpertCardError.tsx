
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ExpertCardErrorProps {
  error: string;
}

export const ExpertCardError = ({ error }: ExpertCardErrorProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
