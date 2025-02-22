
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building, FileText, Users, Phone } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ProviderClientDetailsModalProps {
  client: {
    id: string;
    name: string;
    industry: string;
    activeProjects: number;
    contactPerson: string;
    phone: string;
    status: string;
    lastUpdated: string;
    memo?: string;
  };
}

export function ProviderClientDetailsModal({ client }: ProviderClientDetailsModalProps) {
  const [open, setOpen] = useState(false);
  const [memo, setMemo] = useState(client.memo || '');
  const { toast } = useToast();

  const handleMemoChange = async (value: string) => {
    setMemo(value);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          contact_name: client.contactPerson,
          phone: client.phone,
          company_name: client.name,
          address: value
        })
        .eq('id', client.id);

      if (error) throw error;

      toast({
        title: "メモを保存しました",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "メモの保存に失敗しました",
        variant: "destructive",
        duration: 3000,
      });
      console.error('Error saving memo:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">詳細</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>クライアント詳細</DialogTitle>
          <DialogDescription>
            クライアントの詳細情報を確認・編集できます。
          </DialogDescription>
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

          <div>
            <h4 className="font-semibold mb-2">メモ</h4>
            <Textarea
              value={memo}
              onChange={(e) => handleMemoChange(e.target.value)}
              placeholder="クライアントに関するメモを入力"
              className="min-h-[100px]"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
