
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import DocumentUploader from './DocumentUploader';
import DocumentList from './DocumentList';
import PendingApplicationsCard from './PendingApplicationsCard';
import { useDocuments } from './hooks/useDocuments';
import { usePendingApplications } from './hooks/usePendingApplications';
import { toast } from "sonner";

const DocumentsSection = () => {
  const { documents, loading, error, setError, setLoading, fetchDocuments } = useDocuments();
  const { pendingApplications, fetchPendingApplications } = usePendingApplications();
  const [uploading, setUploading] = React.useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchDocuments(),
          fetchPendingApplications()
        ]);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setError('データの取得に失敗しました');
        toast.error("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>書類管理</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PendingApplicationsCard applications={pendingApplications} />

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
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">読み込み中...</p>
            </div>
          ) : (
            <DocumentList documents={documents} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsSection;
