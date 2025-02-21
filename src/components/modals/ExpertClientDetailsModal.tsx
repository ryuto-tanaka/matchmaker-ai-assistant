
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building, MessageSquare, Clock, CheckCircle } from 'lucide-react';

interface ExpertClientDetailsModalProps {
  client: {
    id: number;
    name: string;
    industry: string;
    consultations: number;
    lastConsultation: string;
    status: string;
  };
}

export function ExpertClientDetailsModal({ client }: ExpertClientDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">詳細</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>クライアント詳細</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{client.name}</h3>
              <p className="text-sm text-gray-500">{client.industry}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">相談件数</p>
                <p className="font-semibold">{client.consultations}件</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">最終相談日</p>
                <p className="font-semibold">{client.lastConsultation}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">ステータス</h4>
            <div className={`p-3 rounded-lg ${
              client.status === 'アクティブ'
                ? 'bg-green-50 text-green-700'
                : 'bg-gray-50 text-gray-700'
            }`}>
              <span>{client.status}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
