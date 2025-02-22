
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const { toast } = useToast();
  const [memo, setMemo] = useState<string>('');

  useEffect(() => {
    // Load memo from Supabase when the modal opens
    const loadMemo = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('address')  // Temporarily using address field to store memo
        .eq('id', client.id.toString())
        .single();

      if (!error && data) {
        setMemo(data.address || '');
      }
    };

    loadMemo();
  }, [client.id]);

  const handleMemoChange = async (value: string) => {
    setMemo(value);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          contact_name: client.name,
          company_name: client.industry,
          address: value  // Temporarily using address field to store memo
        })
        .eq('id', client.id.toString());

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

          <div>
            <h4 className="text-sm font-semibold text-gray-500">メモ</h4>
            <Textarea
              value={memo}
              onChange={(e) => handleMemoChange(e.target.value)}
              placeholder="クライアントに関するメモを入力"
              className="mt-1 min-h-[100px]"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
