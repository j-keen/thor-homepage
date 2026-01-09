export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          name: string;
          brand: string;
          category: string;
          image: string | null;
          original_price: number;
          final_price: number;
          discount_rate: number;
          carrier: string[];
          subscription_type: string[];
          discount_type: string | null;
          colors: Json;
          storage: string[];
          monthly_payment: number;
          additional_discount: number;
          common_discount: number;
          is_hot: boolean;
          is_best: boolean;
          stock: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          brand: string;
          category: string;
          image?: string | null;
          original_price: number;
          final_price?: number;
          discount_rate?: number;
          carrier?: string[];
          subscription_type?: string[];
          discount_type?: string | null;
          colors?: Json;
          storage?: string[];
          monthly_payment?: number;
          additional_discount?: number;
          common_discount?: number;
          is_hot?: boolean;
          is_best?: boolean;
          stock?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          brand?: string;
          category?: string;
          image?: string | null;
          original_price?: number;
          final_price?: number;
          discount_rate?: number;
          carrier?: string[];
          subscription_type?: string[];
          discount_type?: string | null;
          colors?: Json;
          storage?: string[];
          monthly_payment?: number;
          additional_discount?: number;
          common_discount?: number;
          is_hot?: boolean;
          is_best?: boolean;
          stock?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string | null;
          role: string;
          status: string;
          created_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          phone?: string | null;
          role?: string;
          status?: string;
          created_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string | null;
          role?: string;
          status?: string;
          created_at?: string;
          last_login?: string | null;
        };
      };
      orders: {
        Row: {
          id: number;
          order_number: string;
          user_id: string | null;
          user_name: string | null;
          user_phone: string | null;
          user_email: string | null;
          product_id: number | null;
          product_name: string | null;
          carrier: string | null;
          subscription_type: string | null;
          selected_color: string | null;
          selected_storage: string | null;
          monthly_payment: number | null;
          status: string;
          memo: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          order_number: string;
          user_id?: string | null;
          user_name?: string | null;
          user_phone?: string | null;
          user_email?: string | null;
          product_id?: number | null;
          product_name?: string | null;
          carrier?: string | null;
          subscription_type?: string | null;
          selected_color?: string | null;
          selected_storage?: string | null;
          monthly_payment?: number | null;
          status?: string;
          memo?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          order_number?: string;
          user_id?: string | null;
          user_name?: string | null;
          user_phone?: string | null;
          user_email?: string | null;
          product_id?: number | null;
          product_name?: string | null;
          carrier?: string | null;
          subscription_type?: string | null;
          selected_color?: string | null;
          selected_storage?: string | null;
          monthly_payment?: number | null;
          status?: string;
          memo?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      board_posts: {
        Row: {
          id: number;
          board_type: string;
          title: string;
          content: string | null;
          author: string | null;
          user_id: string | null;
          view_count: number;
          is_pinned: boolean;
          rating: number | null;
          product_id: number | null;
          product_name: string | null;
          answer: string | null;
          answered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          board_type: string;
          title: string;
          content?: string | null;
          author?: string | null;
          user_id?: string | null;
          view_count?: number;
          is_pinned?: boolean;
          rating?: number | null;
          product_id?: number | null;
          product_name?: string | null;
          answer?: string | null;
          answered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          board_type?: string;
          title?: string;
          content?: string | null;
          author?: string | null;
          user_id?: string | null;
          view_count?: number;
          is_pinned?: boolean;
          rating?: number | null;
          product_id?: number | null;
          product_name?: string | null;
          answer?: string | null;
          answered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      banners: {
        Row: {
          id: number;
          title: string;
          subtitle: string | null;
          image: string | null;
          link: string | null;
          order: number;
          is_active: boolean;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          subtitle?: string | null;
          image?: string | null;
          link?: string | null;
          order?: number;
          is_active?: boolean;
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          subtitle?: string | null;
          image?: string | null;
          link?: string | null;
          order?: number;
          is_active?: boolean;
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
