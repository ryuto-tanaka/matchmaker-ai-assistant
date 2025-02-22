import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  ChevronDown, 
  Sparkles,
  AlertCircle,
  Archive
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { BusinessPlanSurveyModal } from '@/components/modals/BusinessPlanSurveyModal';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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

  const handleAIBusinessPlanClick = () => {
    setIsBusinessPlanModalOpen(true);
  };

  const handleSurveySubmit = async (data: any) => {
    console.log('Survey data:', data);
    setIsBusinessPlanModalOpen(false);
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

  // 締切日までの残り日数を計算
  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const stats = [
    { 
      icon: FileText, 
      label: '申請中の補助金', 
      value: '2件',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      progress: 75,
      details: [
        { 
          text: 'IT導入補助金', 
          path: '/dashboard/applicant/applications/2',
          progress: 60,
          dueDate: '2024-04-15',
          status: '申請書作成中',
          urgent: true
        },
        { 
          text: '事業再構築補助金', 
          path: '/dashboard/applicant/applications/3',
          progress: 30,
          dueDate: '2024-05-30',
          status: '準備中'
        }
      ]
    },
    { 
      icon: Archive, 
      label: '過去の申請補助金', 
      value: '1件',
      color: 'bg-gray-50',
      iconColor: 'text-gray-600',
      details: [
        { 
          text: '小規模事業者持続化補助金', 
          path: '/dashboard/applicant/applications/1',
          progress: 80,
          dueDate: '2024-03-31',
          status: '期限切れ'
        }
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
                  {stat.progress !== undefined && (
                    <div className="mt-4">
                      <Progress value={stat.progress} className="h-2" />
                      <p className="text-xs text-right mt-1 text-gray-500">
                        全体の進捗: {stat.progress}%
                      </p>
                    </div>
                  )}
                </CardContent>
              </CollapsibleTrigger>
              <CollapsibleContent className="animate-accordion-down">
                <div className="px-6 pb-6 pt-0 space-y-2">
                  {stat.details.map((detail, detailIndex) => {
                    const daysLeft = detail.dueDate ? getDaysUntil(detail.dueDate) : null;
                    const isUrgent = daysLeft !== null && daysLeft <= 7 && daysLeft > 0;
                    const isExpired = daysLeft !== null && daysLeft <= 0;

                    return (
                      <div
                        key={detailIndex}
                        className={cn(
                          "p-4 rounded-lg text-sm transition-colors duration-200",
                          isValidRoute(detail.path)
                            ? 'bg-white/50 cursor-pointer hover:bg-white'
                            : 'bg-gray-100/50',
                          detail.urgent && 'border-2 border-red-500',
                          isExpired && 'opacity-75'
                        )}
                        onClick={(e) => isValidRoute(detail.path) && handleDetailClick(detail.path, e)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{detail.text}</span>
                          {isUrgent && !isExpired && (
                            <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />
                          )}
                        </div>
                        {detail.progress !== undefined && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{detail.status}</span>
                              <span>{detail.progress}%</span>
                            </div>
                            <Progress value={detail.progress} className="h-1.5" />
                          </div>
                        )}
                        {daysLeft !== null && (
                          <p className={cn(
                            "text-xs mt-2",
                            isExpired ? "text-gray-500" :
                            isUrgent ? "text-red-500 font-medium" : "text-gray-500"
                          )}>
                            {isExpired ? "期限切れ" : `締切まで: ${daysLeft}日`}
                          </p>
                        )}
                      </div>
                    );
                  })}
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
