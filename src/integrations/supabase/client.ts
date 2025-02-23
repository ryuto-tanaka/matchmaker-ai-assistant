
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// プロジェクトURLとアノンキーは環境に応じて適切に設定する必要があります
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://vdsepoeswhkkpyayrqhc.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkc2Vwb2Vzd2hra3B5YXlycWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNjg0OTQsImV4cCI6MjA1NDk0NDQ5NH0.ufnxszavYxVol9_X7gM5DZcJygN69MPLsSrEpjuep-A";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Required environment variables are missing');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// エラーモニタリングの強化
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  } else if (event === 'SIGNED_IN') {
    console.log('User signed in');
  } else if (event === 'USER_UPDATED') {
    console.log('User updated');
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed');
  } else if (event === 'INITIAL_SESSION') {
    console.log('Initial session loaded');
  }
});

// パフォーマンスモニタリングの追加
const originalFrom = supabase.from;
supabase.from = function(table: keyof Database['public']['Tables']) {
  const start = performance.now();
  const result = originalFrom(table);
  const end = performance.now();
  console.log(`Query execution time for ${table}: ${end - start}ms`);
  return result;
} as typeof supabase.from;
