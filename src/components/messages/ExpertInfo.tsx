
import React from 'react';
import { User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ExpertInfoProps {
  expertData: {
    id: string | undefined;
    name: string;
    title: string;
    specialties: string[];
    experience: string;
    profile: string;
  };
}

const ExpertInfo = ({ expertData }: ExpertInfoProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">{expertData.name}</h3>
          <p className="text-sm text-muted-foreground">{expertData.title}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>専門分野</Label>
          <div className="mt-1 text-sm space-y-1">
            {expertData.specialties.map((specialty, index) => (
              <div key={index} className="bg-muted rounded px-2 py-1">
                {specialty}
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label>経験年数</Label>
          <p className="mt-1 text-sm">{expertData.experience}</p>
        </div>
        <div>
          <Label>プロフィール</Label>
          <p className="mt-1 text-sm">{expertData.profile}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertInfo;
