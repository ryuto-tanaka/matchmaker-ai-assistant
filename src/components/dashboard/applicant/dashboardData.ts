
import { FileText, Users, Clock, CheckCircle, Archive } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const validRoutes = [
  '/dashboard/messages/1',
  '/dashboard/messages/2'
];

export const getDaysUntil = (dateString: string): number => {
  const today = new Date();
  const dueDate = new Date(dateString);
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const fetchDashboardStats = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [
    { data: activeApplications },
    { data: expiredApplications },
    { data: consultationExperts },
    { data: inReviewApplications },
    { data: approvedApplications }
  ] = await Promise.all([
    supabase
      .from('grant_applications')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active'),
    supabase
      .from('grant_applications')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'expired'),
    supabase
      .from('messages')
      .select('*')
      .or(`receiver_id.eq.${user.id},sender_id.eq.${user.id}`),
    supabase
      .from('grant_applications')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'in_review'),
    supabase
      .from('grant_applications')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'approved')
  ]);

  // Get unique expert IDs by filtering out duplicates
  const uniqueExpertIds = new Set<string>();
  if (consultationExperts) {
    consultationExperts.forEach((msg) => {
      if (msg.sender_id === user.id) {
        uniqueExpertIds.add(msg.receiver_id);
      } else {
        uniqueExpertIds.add(msg.sender_id);
      }
    });
  }

  return [
    {
      icon: FileText,
      label: '申請中の補助金',
      value: `${activeApplications?.length || 0}件`,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      progress: 75,
      details: activeApplications?.map(app => ({
        text: app.grant_id,
        path: `/dashboard/applicant/applications/${app.id}`,
        progress: 60,
        status: '申請書作成中'
      })) || []
    },
    {
      icon: Archive,
      label: '過去の申請補助金',
      value: `${expiredApplications?.length || 0}件`,
      color: 'bg-gray-50',
      iconColor: 'text-gray-600',
      details: expiredApplications?.map(app => ({
        text: app.grant_id,
        path: `/dashboard/applicant/applications/${app.id}`,
      })) || []
    },
    {
      icon: Users,
      label: '相談中の専門家',
      value: `${uniqueExpertIds.size}名`,
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      details: Array.from(uniqueExpertIds).map((expertId, index) => ({
        text: `専門家 ${index + 1}`,
        path: `/dashboard/messages/${expertId}`
      })) || []
    },
    {
      icon: Clock,
      label: '審査待ち',
      value: `${inReviewApplications?.length || 0}件`,
      color: 'bg-amber-50',
      iconColor: 'text-amber-600',
      details: inReviewApplications?.map(app => ({
        text: `${app.grant_id}（審査中）`,
        path: `/dashboard/applicant/applications/${app.id}`
      })) || []
    },
    {
      icon: CheckCircle,
      label: '承認済み',
      value: `${approvedApplications?.length || 0}件`,
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      details: approvedApplications?.map(app => ({
        text: `${app.grant_id}`,
        path: `/dashboard/applicant/applications/${app.id}`
      })) || []
    }
  ];
};
