export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      business_plans: {
        Row: {
          business_description: string
          company_name: string
          competitive_advantage: string
          created_at: string
          employee_count: string
          funding_needs: string
          generated_content: string | null
          id: string
          industry: string
          status: string
          target_market: string
          updated_at: string
          use_of_funds: string
          user_id: string
        }
        Insert: {
          business_description: string
          company_name: string
          competitive_advantage: string
          created_at?: string
          employee_count: string
          funding_needs: string
          generated_content?: string | null
          id?: string
          industry: string
          status?: string
          target_market: string
          updated_at?: string
          use_of_funds: string
          user_id: string
        }
        Update: {
          business_description?: string
          company_name?: string
          competitive_advantage?: string
          created_at?: string
          employee_count?: string
          funding_needs?: string
          generated_content?: string | null
          id?: string
          industry?: string
          status?: string
          target_market?: string
          updated_at?: string
          use_of_funds?: string
          user_id?: string
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          created_at: string
          description: string | null
          event_date: string
          event_type: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date: string
          event_type: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date?: string
          event_type?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      cases: {
        Row: {
          amount: number | null
          client_id: string | null
          created_at: string
          deadline: string | null
          description: string | null
          id: string
          industry: string | null
          reminder: string | null
          status: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          client_id?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          reminder?: string | null
          status?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number | null
          client_id?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          reminder?: string | null
          status?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cases_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          active_projects: number | null
          contact_person: string | null
          created_at: string
          id: string
          industry: string | null
          memo: string | null
          name: string
          phone: string | null
          priority: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          active_projects?: number | null
          contact_person?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          memo?: string | null
          name: string
          phone?: string | null
          priority?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          active_projects?: number | null
          contact_person?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          memo?: string | null
          name?: string
          phone?: string | null
          priority?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          description: string | null
          document_type: string
          file_path: string | null
          id: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          document_type: string
          file_path?: string | null
          id?: string
          status: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          document_type?: string
          file_path?: string | null
          id?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      grant_applications: {
        Row: {
          created_at: string
          grant_id: string
          id: string
          status: string
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          grant_id: string
          id?: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          grant_id?: string
          id?: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "grant_applications_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: ["id"]
          },
        ]
      }
      grants: {
        Row: {
          application_end_date: string | null
          application_start_date: string | null
          created_at: string
          description: string
          id: string
          max_amount: number
          name: string
          official_link: string | null
          status: string
          subsidy_rate: number
          target_industries: string[] | null
          target_regions: string[] | null
          updated_at: string
        }
        Insert: {
          application_end_date?: string | null
          application_start_date?: string | null
          created_at?: string
          description: string
          id?: string
          max_amount: number
          name: string
          official_link?: string | null
          status?: string
          subsidy_rate: number
          target_industries?: string[] | null
          target_regions?: string[] | null
          updated_at?: string
        }
        Update: {
          application_end_date?: string | null
          application_start_date?: string | null
          created_at?: string
          description?: string
          id?: string
          max_amount?: number
          name?: string
          official_link?: string | null
          status?: string
          subsidy_rate?: number
          target_industries?: string[] | null
          target_regions?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          company_name: string | null
          contact_name: string | null
          created_at: string
          id: string
          phone: string | null
          primary_type: Database["public"]["Enums"]["user_type"]
          updated_at: string
        }
        Insert: {
          address?: string | null
          company_name?: string | null
          contact_name?: string | null
          created_at?: string
          id: string
          phone?: string | null
          primary_type: Database["public"]["Enums"]["user_type"]
          updated_at?: string
        }
        Update: {
          address?: string | null
          company_name?: string | null
          contact_name?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          primary_type?: Database["public"]["Enums"]["user_type"]
          updated_at?: string
        }
        Relationships: []
      }
      user_secondary_types: {
        Row: {
          created_at: string
          id: string
          type: Database["public"]["Enums"]["user_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          type: Database["public"]["Enums"]["user_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          type?: Database["public"]["Enums"]["user_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_secondary_types_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
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
      user_type: "applicant" | "provider" | "expert"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
