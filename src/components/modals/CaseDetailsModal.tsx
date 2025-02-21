
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, DollarSign, Building, Users } from 'lucide-react';

interface CaseDetailsModalProps {
  caseData: {
    id: number;
    client: string;
    type: string;
    status: string;
    amount: string;
    deadline: string;
    description?: string;
  };
}

export function CaseDetailsModal({ caseData }: CaseDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">詳細</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>案件詳細</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{caseData.client}</h3>
              <p className="text-sm text-gray-500">{caseData.type}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">申請金額</p>
                <p className="font-semibold">{caseData.amount}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">申請期限</p>
                <p className="font-semibold">{caseData.deadline}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">申請状況</h4>
            <div className="p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-700">{caseData.status}</span>
            </div>
          </div>

          {caseData.description && (
            <div>
              <h4 className="font-semibold mb-2">案件詳細</h4>
              <p className="text-gray-600">{caseData.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
