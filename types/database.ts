export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          category: string | null
          created_at: string | null
          entered_at: string | null
          entered_num: number | null
          id: string
          invitation_date: string | null
          is_entered: boolean | null
          is_invited: boolean | null
          is_vip: string | null
          last_name: string | null
          name: string
          organization: string | null
          qr_code: string
          title: string | null
          vocative: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          entered_at?: string | null
          entered_num?: number | null
          id?: string
          invitation_date?: string | null
          is_entered?: boolean | null
          is_invited?: boolean | null
          is_vip?: string | null
          last_name?: string | null
          name: string
          organization?: string | null
          qr_code?: string | null
          title?: string | null
          vocative?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          entered_at?: string | null
          entered_num?: number | null
          id?: string
          invitation_date?: string | null
          is_entered?: boolean | null
          is_invited?: boolean | null
          is_vip?: string | null
          last_name?: string | null
          name?: string
          organization?: string | null
          qr_code?: string | null
          title?: string | null
          vocative?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          created_at: string
          id: string
          is_complete: boolean | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_complete?: boolean | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_complete?: boolean | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "todos_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
