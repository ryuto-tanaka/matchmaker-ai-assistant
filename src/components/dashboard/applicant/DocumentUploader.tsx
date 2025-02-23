
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useAuthContext } from '@/contexts/AuthContext';

interface DocumentUploaderProps {
  onUploadComplete: () => void;
  uploading: boolean;
  setUploading: (value: boolean) => void;
}

const DocumentUploader = ({ onUploadComplete, uploading, setUploading }: DocumentUploaderProps) => {
  const { user } = useAuthContext();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      if (!user?.id) {
        toast.error("ユーザー情報が見つかりません");
        return;
      }

      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          title: file.name,
          file_path: fileName,
          status: '審査待ち',
          document_type: fileExt?.toUpperCase() || '不明',
          user_id: user.id
        });

      if (dbError) throw dbError;

      toast.success("書類がアップロードされました");
      onUploadComplete();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("アップロードに失敗しました");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileUpload}
        disabled={uploading}
      />
      <label htmlFor="file-upload">
        <Button 
          variant="outline" 
          className="gap-2 cursor-pointer"
          disabled={uploading}
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'アップロード中...' : '書類をアップロード'}
        </Button>
      </label>
    </div>
  );
};

export default DocumentUploader;
