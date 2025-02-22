
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { BusinessPlanSurveyModal } from '@/components/modals/BusinessPlanSurveyModal';
import { useToast } from "@/components/ui/use-toast";

export const AIBusinessPlanCard = () => {
  const { toast } = useToast();
  const [isBusinessPlanModalOpen, setIsBusinessPlanModalOpen] = React.useState(false);
  const [aiProgress, setAiProgress] = React.useState(0);

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

  return (
    <>
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
    </>
  );
};
