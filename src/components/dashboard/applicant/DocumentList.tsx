
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, File } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { Document } from './types/document';

interface DocumentListProps {
  documents: Document[];
}

const DocumentList = ({ documents }: DocumentListProps) => {
  const handleDownload = async (doc: Document) => {
    try {
      if (!doc.file_path) {
        throw new Error('ファイルパスが見つかりません');
      }

      const { data, error: downloadError } = await supabase.storage
        .from('documents')
        .download(doc.file_path);

      if (downloadError) throw downloadError;

      const blob = new Blob([data]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("ダウンロードを開始しました");
    } catch (error) {
      console.error('Download error:', error);
      toast.error("ダウンロードに失敗しました");
    }
  };

  if (!documents || documents.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-500">書類がありません</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
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
      ))}
    </div>
  );
};

export default DocumentList;

