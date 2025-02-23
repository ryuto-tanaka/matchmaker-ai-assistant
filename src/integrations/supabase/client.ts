
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import * as Sentry from "@sentry/react";

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

