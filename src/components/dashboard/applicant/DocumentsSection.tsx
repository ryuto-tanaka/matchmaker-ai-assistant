
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, File } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface Document {
  title: string;
  updatedAt: string;
  file_path: string;
}

const DocumentsSection = () => {
  const handleDownload = async (doc: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(doc.file_path);

      if (error) {
        throw error;
      }

      // Create a blob URL directly
      const blob = new Blob([data]);
      const url = URL.createObjectURL(blob);
      
      // Create and click a hidden download link
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = doc.title;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      toast.success("ダウンロードを開始しました");
    } catch (error) {
      console.error('Download error:', error);
      toast.error("ダウンロードに失敗しました");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>書類管理</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => {
            const document = {
              title: `事業計画書_v${index + 1}`,
              updatedAt: '2024/02/01',
              file_path: `business-plans/plan_v${index + 1}.pdf`
            };

            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <File className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="font-medium">{document.title}</p>
                    <p className="text-sm text-gray-500">更新日: {document.updatedAt}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownload(document)}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  ダウンロード
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
