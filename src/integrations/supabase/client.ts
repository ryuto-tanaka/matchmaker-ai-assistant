
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import * as Sentry from "@sentry/react";

// プロジェクトURLとアノンキーは環境に応じて適切に設定する必要があります
const SUPABASE_URL = "https://vdsepoeswhkkpyayrqhc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkc2Vwb2Vzd2hra3B5YXlycWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNjg0OTQsImV4cCI6MjA1NDk0NDQ5NH0.ufnxszavYxVol9_X7gM5DZcJygN69MPLsSrEpjuep-A";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// エラーモニタリングの強化
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    console.log('User signed out');
    Sentry.setUser(null);
  } else if (event === 'SIGNED_IN' && session?.user) {
    console.log('User signed in');
    Sentry.setUser({
      id: session.user.id,
      email: session.user.email
    });
  } else if (event === 'USER_UPDATED' && session?.user) {
    console.log('User updated');
    Sentry.setUser({
      id: session.user.id,
      email: session.user.email
    });
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed');
  } else if (event === 'INITIAL_SESSION' && session?.user) {
    console.log('Initial session loaded');
    Sentry.setUser({
      id: session.user.id,
      email: session.user.email
    });
  }
});

// パフォーマンスモニタリングの追加
const originalFrom = supabase.from;
supabase.from = function(table: keyof Database['public']['Tables']) {
  const start = performance.now();
  const result = originalFrom(table);
  const end = performance.now();
  
  // クエリの実行時間が500ms以上の場合は警告をログに記録
  const executionTime = end - start;
  if (executionTime > 500) {
    console.warn(`Slow query detected for table ${table}: ${executionTime}ms`);
    Sentry.captureMessage(`Slow query detected for table ${table}`, {
      level: 'warning',
      extra: {
        executionTime,
        table
      }
    });
  }
  
  return result;
} as typeof supabase.from;

// エラーハンドリングの設定
supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    console.error('Authentication state changed:', event);
    Sentry.captureMessage('User signed out', {
      level: 'info',
      extra: { event }
    });
  }
});
