
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Clock, CheckCircle, ChevronDown } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { BusinessPlanSurveyModal } from '@/components/modals/BusinessPlanSurveyModal';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const DashboardOverview = () => {
  const { toast } = useToast();
  const [isBusinessPlanModalOpen, setIsBusinessPlanModalOpen] = React.useState(false);
  const [expandedCard, setExpandedCard] = React.useState<number | null>(null);

  const stats = [
    { 
      icon: FileText, 
      label: '申請中の補助金', 
      value: '3件',
      details: [
        '小規模事業者持続化補助金',
        'IT導入補助金',
        '事業再構築補助金'
      ]
    },
    { 
      icon: Users, 
      label: '相談中の専門家', 
      value: '2名',
      details: [
        '山田太郎（中小企業診断士）',
        '佐藤花子（税理士）'
      ]
    },
    { 
      icon: Clock, 
      label: '審査待ち', 
      value: '1件',
      details: [
        'ものづくり補助金（一次審査中）'
      ]
    },
    { 
      icon: CheckCircle, 
      label: '承認済み', 
      value: '2件',
      details: [
        '小規模事業者持続化補助金（50万円）',
        'IT導入補助金（70万円）'
      ]
    },
  ];

  const handleAIBusinessPlanClick = () => {
    setIsBusinessPlanModalOpen(true);
  };

  const handleSurveySubmit = async (data: any) => {
    console.log('Survey data:', data);
    toast({
      title: "アンケート送信完了",
      description: "AI事業計画書の生成を開始します。完了までしばらくお待ちください。",
    });
    setIsBusinessPlanModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <BusinessPlanSurveyModal
        isOpen={isBusinessPlanModalOpen}
        onClose={() => setIsBusinessPlanModalOpen(false)}
        onSubmit={handleSurveySubmit}
      />

      <Card className="border-2 border-primary">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">AI事業計画書を作成</h2>
            <p className="text-gray-600">
              簡単なアンケートに答えるだけで、AIがあなたの事業計画書を作成します
            </p>
            <Button size="lg" onClick={handleAIBusinessPlanClick}>
              作成を開始する
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Collapsible
            key={index}
            open={expandedCard === index}
            onOpenChange={() => setExpandedCard(expandedCard === index ? null : index)}
          >
            <Card className="transition-all duration-200 hover:shadow-md">
              <CollapsibleTrigger className="w-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                        expandedCard === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </CardContent>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 pb-6 pt-0 space-y-2">
                  {stat.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="p-3 bg-gray-50 rounded-lg text-sm"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
