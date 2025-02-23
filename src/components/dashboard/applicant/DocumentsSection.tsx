
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import DocumentUploader from './DocumentUploader';
import DocumentList from './DocumentList';
import type { Document } from './types/document';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface GrantApplication {
  id: string;
  grant: {
    name: string;
    max_amount: number;
  };
  status: string;
  created_at: string;
}

const DocumentsSection = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [pendingApplications, setPendingApplications] = useState<GrantApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    Promise.all([
      fetchDocuments(),
      fetchPendingApplications()
    ]).finally(() => setLoading(false));
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
    }
  };

  const fetchPendingApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('grant_applications')
        .select(`
          id,
          status,
          created_at,
          grants (
            name,
            max_amount
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPendingApplications(data || []);
    } catch (error) {
      console.error('Error fetching pending applications:', error);
      toast.error("申請情報の取得に失敗しました");
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
    <div className="space-y-6">
      {pendingApplications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-600">未処理の補助金申請</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApplications.map((application) => (
                <Alert key={application.id}>
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{application.grant.name}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        申請額: {application.grant.max_amount.toLocaleString()}円
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/dashboard/applicant/applications/${application.id}`)}
                    >
                      詳細を確認
                    </Button>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
    </div>
  );
};

export default DocumentsSection;
