
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GrantApplication {
  id: string;
  grant: {
    name: string;
    max_amount: number;
  };
  status: string;
  created_at: string;
}

export const usePendingApplications = () => {
  const [pendingApplications, setPendingApplications] = useState<GrantApplication[]>([]);

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

      const formattedApplications: GrantApplication[] = (data || []).map(app => ({
        id: app.id,
        status: app.status,
        created_at: app.created_at,
        grant: {
          name: app.grants.name,
          max_amount: app.grants.max_amount
        }
      }));

      setPendingApplications(formattedApplications);
    } catch (error) {
      console.error('Error fetching pending applications:', error);
      throw error;
    }
  };

  return {
    pendingApplications,
    fetchPendingApplications
  };
};
