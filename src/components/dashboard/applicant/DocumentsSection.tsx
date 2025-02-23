
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DocumentUploader from './DocumentUploader';
import DocumentList from './DocumentList';
import PendingApplicationsCard from './PendingApplicationsCard';
import { useDocuments } from './hooks/useDocuments';
import { usePendingApplications } from './hooks/usePendingApplications';
import { toast } from "sonner";
import ErrorCard from '@/components/ui/error-card';
import LoadingCard from '@/components/ui/loading-card';

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
    return <ErrorCard title="書類管理" error={error} />;
  }

  if (loading) {
    return <LoadingCard title="書類管理" />;
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
          <DocumentList documents={documents} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsSection;

