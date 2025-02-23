
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, File } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface Document {
  id: string;
  title: string;
  updated_at: string;
  file_path: string | null;
  status: string;
  document_type: string;
}

const DocumentsSection = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error("書類の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      if (!doc.file_path) {
        throw new Error('ファイルパスが見つかりません');
      }

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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>書類管理</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>書類管理</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              書類がありません
            </div>
          ) : (
            documents.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <File className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="font-medium">{document.title}</p>
                    <p className="text-sm text-gray-500">
                      更新日: {new Date(document.updated_at).toLocaleDateString('ja-JP')}
                    </p>
                    <p className="text-sm text-gray-500">
                      種類: {document.document_type} | 状態: {document.status}
                    </p>
                  </div>
                </div>
                {document.file_path && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(document)}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    ダウンロード
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
