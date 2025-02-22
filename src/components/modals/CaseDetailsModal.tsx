
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, DollarSign, Building, Bell } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Case } from "@/types/client";

interface CaseDetailsModalProps {
  caseData: Case;
}

export function CaseDetailsModal({ caseData }: CaseDetailsModalProps) {
  const [reminder, setReminder] = useState(caseData.reminder || '');

  const handleReminderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReminder(event.target.value);
    // Here you would typically update the case data in your backend
  };

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
              {caseData.industry && (
                <p className="text-sm text-gray-500">業種: {caseData.industry}</p>
              )}
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
            <h4 className="font-semibold mb-2">リマインダー設定</h4>
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={reminder}
                onChange={handleReminderChange}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">申請状況</h4>
            <div className="p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-700">{caseData.status}</span>
            </div>
          </div>

          {caseData.timeline && (
            <div>
              <h4 className="font-semibold mb-2">タイムライン</h4>
              <div className="space-y-4">
                {caseData.timeline.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className={`p-2 rounded-full ${
                      event.type === 'meeting' ? 'bg-blue-100' :
                      event.type === 'document' ? 'bg-green-100' :
                      event.type === 'status_change' ? 'bg-yellow-100' :
                      'bg-gray-100'
                    }`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{event.date}</p>
                      <p className="font-medium">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
