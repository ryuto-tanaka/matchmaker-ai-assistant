
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building, FileText, Users, Phone } from 'lucide-react';

interface ProviderClientDetailsModalProps {
  client: {
    id: number;
    name: string;
    industry: string;
    activeProjects: number;
    contactPerson: string;
    phone: string;
    status: string;
    lastUpdated: string;
  };
}

export function ProviderClientDetailsModal({ client }: ProviderClientDetailsModalProps) {
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
              <FileText className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">進行中のプロジェクト</p>
                <p className="font-semibold">{client.activeProjects}件</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">担当者</p>
                <p className="font-semibold">{client.contactPerson}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">連絡先</p>
                <p className="font-semibold">{client.phone}</p>
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

          <div>
            <h4 className="font-semibold mb-2">最終更新日</h4>
            <p className="text-sm text-gray-600">{client.lastUpdated}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
