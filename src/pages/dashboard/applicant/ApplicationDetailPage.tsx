
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileDown, Upload, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ApplicationDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [showReportDialog, setShowReportDialog] = React.useState(false);

  // 仮の補助金データ
  const applicationData = {
    id,
    name: "IT導入補助金",
    status: "交付決定済み",
    amount: "2,000,000円",
    approvedDate: "2024-01-15",
    deadline: "2024-12-31",
    project: {
      title: "基幹システムのクラウド化",
      description: "社内の基幹システムをクラウドサービスに移行し、業務効率化を図る",
      schedule: [
        { phase: "計画策定", date: "2024-02-01", status: "完了" },
        { phase: "システム選定", date: "2024-03-01", status: "進行中" },
        { phase: "導入作業", date: "2024-04-01", status: "未着手" },
        { phase: "運用開始", date: "2024-05-01", status: "未着手" },
      ],
    },
    documents: [
      { name: "交付決定通知書.pdf", type: "official" },
      { name: "事業計画書.pdf", type: "plan" },
      { name: "経費内訳.xlsx", type: "financial" },
    ],
  };

  const handleReportSubmit = () => {
    toast({
      title: "事後報告書を提出しました",
      description: "報告書の審査までしばらくお待ちください。",
    });
    setShowReportDialog(false);
  };

  const handleDocumentDownload = (documentName: string) => {
    toast({
      title: "ダウンロードを開始しました",
      description: `${documentName} のダウンロードを開始しました。`,
    });
  };

  return (
    <DashboardLayout userType="applicant" userName="申請者">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{applicationData.name}</h1>
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-500 h-5 w-5" />
            <span className="text-green-500 font-medium">{applicationData.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 基本情報 */}
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>交付決定額</Label>
                <p className="text-2xl font-bold text-primary">{applicationData.amount}</p>
              </div>
              <div>
                <Label>交付決定日</Label>
                <p>{applicationData.approvedDate}</p>
              </div>
              <div>
                <Label>事業完了期限</Label>
                <p className="text-red-500">{applicationData.deadline}</p>
              </div>
            </CardContent>
          </Card>

          {/* 事業概要 */}
          <Card>
            <CardHeader>
              <CardTitle>事業概要</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>事業名</Label>
                <p className="font-medium">{applicationData.project.title}</p>
              </div>
              <div>
                <Label>事業内容</Label>
                <p className="text-sm">{applicationData.project.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* 事業スケジュール */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>事業スケジュール</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-6">
                  {applicationData.project.schedule.map((phase, index) => (
                    <div key={index} className="relative pl-8">
                      <div className={`absolute left-0 w-4 h-4 rounded-full border-2 ${
                        phase.status === "完了"
                          ? "bg-green-500 border-green-500"
                          : phase.status === "進行中"
                          ? "bg-yellow-500 border-yellow-500"
                          : "bg-white border-gray-300"
                      }`} />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{phase.phase}</h4>
                          <p className="text-sm text-muted-foreground">{phase.date}</p>
                        </div>
                        <span className={`text-sm ${
                          phase.status === "完了"
                            ? "text-green-500"
                            : phase.status === "進行中"
                            ? "text-yellow-500"
                            : "text-gray-500"
                        }`}>
                          {phase.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 関連書類 */}
          <Card>
            <CardHeader>
              <CardTitle>関連書類</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applicationData.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <span className="text-sm">{doc.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDocumentDownload(doc.name)}
                  >
                    <FileDown className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 事後報告 */}
          <Card>
            <CardHeader>
              <CardTitle>事後報告</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                事業完了後、実績報告書の提出が必要です。
              </p>
              <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    実績報告書を提出
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>実績報告書の提出</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>報告書ファイル</Label>
                      <Input type="file" />
                    </div>
                    <div className="space-y-2">
                      <Label>補足コメント</Label>
                      <Textarea placeholder="補足事項がある場合はこちらに記入してください" />
                    </div>
                    <Button onClick={handleReportSubmit} className="w-full">
                      報告書を提出する
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationDetailPage;
