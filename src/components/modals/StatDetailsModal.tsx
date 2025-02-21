
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, DollarSign, Building, Users, TrendingUp, ArrowRight } from 'lucide-react';

interface StatDetailsModalProps {
  statType: '進行中の案件' | '契約クライアント' | '今月の成約率' | '今月の売上';
  value: string;
}

const getDetailsContent = (statType: string) => {
  switch (statType) {
    case '進行中の案件':
      return {
        icon: FileText,
        description: '現在進行中の補助金申請案件の総数です。',
        details: [
          { label: '申請準備中', value: '5件' },
          { label: '審査中', value: '4件' },
          { label: '追加書類待ち', value: '3件' },
        ]
      };
    case '契約クライアント':
      return {
        icon: Users,
        description: '現在契約中の取引先企業の総数です。',
        details: [
          { label: '新規（3ヶ月以内）', value: '8社' },
          { label: '継続（1年以上）', value: '12社' },
          { label: '休眠（6ヶ月以上取引なし）', value: '5社' },
        ]
      };
    case '今月の成約率':
      return {
        icon: TrendingUp,
        description: '今月の商談における成約の割合です。',
        details: [
          { label: '商談総数', value: '20件' },
          { label: '成約', value: '15件' },
          { label: '前月比', value: '+5%' },
        ]
      };
    case '今月の売上':
      return {
        icon: DollarSign,
        description: '今月の確定売上の合計額です。',
        details: [
          { label: '補助金申請支援', value: '¥800,000' },
          { label: 'コンサルティング', value: '¥300,000' },
          { label: 'その他サービス', value: '¥100,000' },
        ]
      };
  };
};

export function StatDetailsModal({ statType, value }: StatDetailsModalProps) {
  const content = getDetailsContent(statType);
  const Icon = content?.icon || FileText;

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <span>{statType}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between border-b pb-4">
            <p className="text-sm text-muted-foreground">{content?.description}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>

          <div className="space-y-4">
            {content?.details.map((detail, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">{detail.label}</span>
                <span className="font-medium">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
