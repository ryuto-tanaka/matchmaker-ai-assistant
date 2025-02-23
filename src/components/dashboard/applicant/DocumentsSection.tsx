
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import DocumentUploader from './DocumentUploader';
import DocumentList from './DocumentList';
import type { Document } from './types/document';

const DocumentsSection = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>書類管理</CardTitle>
        <DocumentUploader
          onUploadComplete={fetchDocuments}
          uploading={uploading}
          setUploading={setUploading}
        />
      </CardHeader>
      <CardContent>
        <DocumentList documents={documents} />
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
