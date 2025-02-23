
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import type { Document } from '../types/document';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      throw error;
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel('document-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents'
        },
        async (payload) => {
          console.log('Document change received:', payload);
          if (payload.eventType === 'INSERT') {
            setDocuments(prev => [payload.new as Document, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setDocuments(prev =>
              prev.map(doc =>
                doc.id === payload.new.id ? (payload.new as Document) : doc
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setDocuments(prev =>
              prev.filter(doc => doc.id !== payload.old.id)
            );
          }
          toast.info(
            payload.eventType === 'INSERT' ? "新しい書類が追加されました" :
            payload.eventType === 'UPDATE' ? "書類が更新されました" :
            "書類が削除されました"
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    documents,
    loading,
    setLoading,
    error,
    setError,
    fetchDocuments
  };
};
