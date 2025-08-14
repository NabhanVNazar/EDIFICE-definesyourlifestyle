import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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