import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client for development when credentials are missing
const createMockClient = () => {
  return {
    auth: {
      signInWithPassword: () => Promise.resolve({ data: null, error: null }),
      signUp: () => Promise.resolve({ data: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    },
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: [], error: null }),
      update: () => ({ data: [], error: null }),
      delete: () => ({ data: [], error: null }),
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        download: () => Promise.resolve({ data: null, error: null }),
      }),
    },
  };
};

// Only throw an error in production
let supabase;
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project.supabase.co') {
  if (import.meta.env.MODE === 'production') {
    throw new Error('Missing Supabase environment variables');
  } else {
    console.warn('Using mock Supabase client in development. Please set up your Supabase credentials in .env for full functionality.');
    supabase = createMockClient();
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          plan: 'free' | 'premium';
          projects_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          plan?: 'free' | 'premium';
          projects_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          plan?: 'free' | 'premium';
          projects_count?: number;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string;
          plot_data: any;
          requirements_data: any;
          blueprint_data: any;
          elevation_style: string;
          materials: any;
          cost_estimate: number;
          area_calculation: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string;
          plot_data: any;
          requirements_data: any;
          blueprint_data?: any;
          elevation_style?: string;
          materials?: any;
          cost_estimate?: number;
          area_calculation?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string;
          plot_data?: any;
          requirements_data?: any;
          blueprint_data?: any;
          elevation_style?: string;
          materials?: any;
          cost_estimate?: number;
          area_calculation?: any;
          updated_at?: string;
        };
      };
    };
  };
}