
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface GrantApplication {
  id: string;
  grant: {
    name: string;
    max_amount: number;
  };
  status: string;
  created_at: string;
}

interface PendingApplicationsCardProps {
  applications: GrantApplication[];
}

const PendingApplicationsCard = ({ applications }: PendingApplicationsCardProps) => {
  const navigate = useNavigate();

  if (applications.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-amber-600">未処理の補助金申請</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((application) => (
            <Alert key={application.id}>
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{application.grant.name}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    申請額: {application.grant.max_amount.toLocaleString()}円
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/dashboard/applicant/applications/${application.id}`)}
                >
                  詳細を確認
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingApplicationsCard;
