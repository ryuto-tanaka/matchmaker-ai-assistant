
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Calendar, DollarSign, MessageSquare } from 'lucide-react';

interface CaseStatsProps {
  stats: Array<{
    icon: typeof FileText;
    label: string;
    value: string;
  }>;
}

export const CaseStats = ({ stats }: CaseStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h3 className="text-xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
