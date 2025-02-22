
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Calendar, Clock, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ConsultationsPage = () => {
  const { toast } = useToast();
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [memo, setMemo] = useState<string>('');

  const consultations = [
    {
      id: "1", // Changed to string to match Supabase types
      client: '株式会社ABC',
      topic: 'IT導入補助金について',
      date: '2024/03/15',
      time: '14:00-15:00',
      status: '予約済み',
      details: 'IT導入補助金の申請支援について相談。具体的な補助対象となるITツールの選定と、申請書類の作成方法についてアドバイスが必要。',
      requirements: '・補助金の対象となるITツールの選定支援\n・申請書類の作成アドバイス\n・スケジュール管理の方法について',
      memo: '',
    },
    {
      id: "2",
      client: '株式会社XYZ',
      topic: '事業再構築補助金の要件確認',
      date: '2024/03/16',
      time: '10:00-11:00',
      status: '完了',
      details: '事業再構築補助金の申請要件について確認。新規事業展開に伴う補助金活用の可能性を検討したい。',
      requirements: '・補助金の適格性確認\n・必要書類の確認\n・事業計画書の作成支援',
      memo: '',
    },
    {
      id: "3",
      client: '有限会社DEF',
      topic: 'ものづくり補助金の申請方法',
      date: '2024/03/17',
      time: '15:00-16:00',
      status: '予約済み',
      details: 'ものづくり補助金を活用した設備投資について相談。製造ラインの自動化に関する補助金申請を検討中。',
      requirements: '・設備投資の補助対象確認\n・見積書の要件確認\n・導入計画の策定支援',
      memo: '',
    },
  ];

  const handleMemoChange = async (value: string) => {
    setMemo(value);
    if (!selectedConsultation) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          contact_name: selectedConsultation.client,
          company_name: selectedConsultation.topic,
          // Using address field to store consultation memo temporarily
          address: value
        })
        .eq('id', selectedConsultation.id);

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

  const handleConsultationSelect = (consultation: any) => {
    setSelectedConsultation(consultation);
    // Load memo from Supabase when selecting a consultation
    supabase
      .from('profiles')
      .select('address')
      .eq('id', consultation.id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          setMemo(data.address || '');
        }
      });
  };

  return (
    <DashboardLayout userType="expert" userName="専門家">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">相談案件</h1>

        <div className="grid gap-6">
          {consultations.map((consultation) => (
            <Card key={consultation.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <h3 className="font-semibold">{consultation.client}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{consultation.topic}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">{consultation.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">{consultation.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      consultation.status === '完了' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {consultation.status}
                    </span>
                    <Button 
                      variant="outline" 
                      onClick={() => handleConsultationSelect(consultation)}
                    >
                      詳細
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedConsultation} onOpenChange={() => setSelectedConsultation(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>相談案件の詳細</DialogTitle>
            </DialogHeader>
            {selectedConsultation && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <h3 className="font-semibold">{selectedConsultation.client}</h3>
                  </div>
                  <div className={`inline-flex px-3 py-1 text-sm rounded-full ${
                    selectedConsultation.status === '完了'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedConsultation.status}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">相談内容</h4>
                    <p className="mt-1">{selectedConsultation.topic}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">詳細説明</h4>
                    <p className="mt-1">{selectedConsultation.details}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">要望事項</h4>
                    <div className="mt-1 whitespace-pre-line">
                      {selectedConsultation.requirements}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">メモ</h4>
                    <Textarea
                      value={memo}
                      onChange={(e) => handleMemoChange(e.target.value)}
                      placeholder="相談案件に関するメモを入力"
                      className="mt-1 min-h-[100px]"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex space-x-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">日付</h4>
                        <p className="mt-1">{selectedConsultation.date}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">時間</h4>
                        <p className="mt-1">{selectedConsultation.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ConsultationsPage;

