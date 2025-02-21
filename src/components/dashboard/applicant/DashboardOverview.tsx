
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Clock, CheckCircle, ChevronDown, Sparkles } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { BusinessPlanSurveyModal } from '@/components/modals/BusinessPlanSurveyModal';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";

const DashboardOverview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBusinessPlanModalOpen, setIsBusinessPlanModalOpen] = React.useState(false);
  const [expandedCard, setExpandedCard] = React.useState<number | null>(null);
  const [aiProgress, setAiProgress] = React.useState(0);

  const validRoutes = [
    '/dashboard/messages/1',
    '/dashboard/messages/2'
  ];

  const stats = [
    { 
      icon: FileText, 
      label: '申請中の補助金', 
      value: '3件',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      details: [
        { text: '小規模事業者持続化補助金', path: '/dashboard/applicant/applications/1' },
        { text: 'IT導入補助金', path: '/dashboard/applicant/applications/2' },
        { text: '事業再構築補助金', path: '/dashboard/applicant/applications/3' }
      ]
    },
    { 
      icon: Users, 
      label: '相談中の専門家', 
      value: '2名',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      details: [
        { text: '山田太郎（中小企業診断士）', path: '/dashboard/messages/1' },
        { text: '佐藤花子（税理士）', path: '/dashboard/messages/2' }
      ]
    },
    { 
      icon: Clock, 
      label: '審査待ち', 
      value: '1件',
      color: 'bg-amber-50',
      iconColor: 'text-amber-600',
      details: [
        { text: 'ものづくり補助金（一次審査中）', path: '/dashboard/applicant/applications/4' }
      ]
    },
    { 
      icon: CheckCircle, 
      label: '承認済み', 
      value: '2件',
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      details: [
        { text: '小規模事業者持続化補助金（50万円）', path: '/dashboard/applicant/applications/5' },
        { text: 'IT導入補助金（70万円）', path: '/dashboard/applicant/applications/6' }
      ]
    },
  ];

  const handleAIBusinessPlanClick = () => {
    setIsBusinessPlanModalOpen(true);
  };

  const handleSurveySubmit = async (data: any) => {
    console.log('Survey data:', data);
    setIsBusinessPlanModalOpen(false);
    // AIの進捗状況をシミュレート
    setAiProgress(0);
    toast({
      title: "アンケート送信完了",
      description: "AI事業計画書の生成を開始します。完了までしばらくお待ちください。",
    });

    const interval = setInterval(() => {
      setAiProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "生成完了",
            description: "AI事業計画書の生成が完了しました。",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };

  const handleDetailClick = (path: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (validRoutes.includes(path)) {
      navigate(path);
    }
  };

  const isValidRoute = (path: string) => validRoutes.includes(path);

  return (
    <div className="space-y-6">
      <BusinessPlanSurveyModal
        isOpen={isBusinessPlanModalOpen}
        onClose={() => setIsBusinessPlanModalOpen(false)}
        onSubmit={handleSurveySubmit}
      />

      <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 transition-all duration-300">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              <h2 className="text-2xl font-bold">AI事業計画書を作成</h2>
            </div>
            <p className="text-gray-600">
              簡単なアンケートに答えるだけで、AIがあなたの事業計画書を作成します
            </p>
            {aiProgress > 0 && aiProgress < 100 ? (
              <div className="space-y-2">
                <Progress value={aiProgress} className="w-full" />
                <p className="text-sm text-gray-500">生成中... {aiProgress}%</p>
              </div>
            ) : (
              <Button 
                size="lg" 
                onClick={handleAIBusinessPlanClick}
                className="hover:scale-105 transition-transform duration-200"
              >
                作成を開始する
              </Button>
            )}
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
            <Card className={`transition-all duration-300 hover:shadow-md ${stat.color}`}>
              <CollapsibleTrigger className="w-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${stat.color}`}>
                        <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform duration-300 ease-in-out ${
                        expandedCard === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </CardContent>
              </CollapsibleTrigger>
              <CollapsibleContent className="animate-accordion-down">
                <div className="px-6 pb-6 pt-0 space-y-2">
                  {stat.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className={`p-3 rounded-lg text-sm transition-colors duration-200 ${
                        isValidRoute(detail.path)
                          ? 'bg-white/50 cursor-pointer hover:bg-white'
                          : 'bg-gray-100/50 text-gray-500'
                      }`}
                      onClick={(e) => isValidRoute(detail.path) && handleDetailClick(detail.path, e)}
                    >
                      {detail.text}
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
