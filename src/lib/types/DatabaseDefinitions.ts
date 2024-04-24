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
      availability_types: {
        Row: {
          id: string
          name: string | null
          sort: number | null
        }
        Insert: {
          id?: string
          name?: string | null
          sort?: number | null
        }
        Update: {
          id?: string
          name?: string | null
          sort?: number | null
        }
        Relationships: []
      }
      endorsements: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          endorsed_by: string | null
          endorsement_to: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          endorsed_by?: string | null
          endorsement_to?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          endorsed_by?: string | null
          endorsement_to?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "endorsements_endorsed_by_fkey"
            columns: ["endorsed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "endorsements_endorsement_to_fkey"
            columns: ["endorsement_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_availability_types: {
        Row: {
          availability_type_id: string | null
          id: string
          profile_id: string | null
        }
        Insert: {
          availability_type_id?: string | null
          id?: string
          profile_id?: string | null
        }
        Update: {
          availability_type_id?: string | null
          id?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_availability_types_availability_type_id_fkey"
            columns: ["availability_type_id"]
            isOneToOne: false
            referencedRelation: "availability_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_availability_types_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          availibility: string | null
          bio: string | null
          created_at: string | null
          deleted_at: string | null
          display_name: string | null
          github_username: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          pfp_url: string | null
          skills: string | null
          timezone: string | null
          twitter_username: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          availibility?: string | null
          bio?: string | null
          created_at?: string | null
          deleted_at?: string | null
          display_name?: string | null
          github_username?: string | null
          id: string
          linkedin_url?: string | null
          location?: string | null
          pfp_url?: string | null
          skills?: string | null
          timezone?: string | null
          twitter_username?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          availibility?: string | null
          bio?: string | null
          created_at?: string | null
          deleted_at?: string | null
          display_name?: string | null
          github_username?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          pfp_url?: string | null
          skills?: string | null
          timezone?: string | null
          twitter_username?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      profiles_roles: {
        Row: {
          id: string
          profile_id: string | null
          role_id: string | null
        }
        Insert: {
          id?: string
          profile_id?: string | null
          role_id?: string | null
        }
        Update: {
          id?: string
          profile_id?: string | null
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_roles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          profile_id: string | null
          project_name: string | null
          project_url: string | null
          repository_url: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          project_name?: string | null
          project_url?: string | null
          repository_url?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          project_name?: string | null
          project_url?: string | null
          repository_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      projects_stacks: {
        Row: {
          id: string
          project_id: string | null
          stack_id: string | null
        }
        Insert: {
          id?: string
          project_id?: string | null
          stack_id?: string | null
        }
        Update: {
          id?: string
          project_id?: string | null
          stack_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_stacks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_stacks_stack_id_fkey"
            columns: ["stack_id"]
            isOneToOne: false
            referencedRelation: "stacks"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: string
          name: string | null
          sort: number | null
        }
        Insert: {
          id?: string
          name?: string | null
          sort?: number | null
        }
        Update: {
          id?: string
          name?: string | null
          sort?: number | null
        }
        Relationships: []
      }
      stacks: {
        Row: {
          id: string
          name: string | null
          slug: string | null
          url: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          slug?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          slug?: string | null
          url?: string | null
        }
        Relationships: []
      }
      supabase_products: {
        Row: {
          id: string
          name: string | null
          sort: number | null
        }
        Insert: {
          id?: string
          name?: string | null
          sort?: number | null
        }
        Update: {
          id?: string
          name?: string | null
          sort?: number | null
        }
        Relationships: []
      }
      supabase_products_projects: {
        Row: {
          id: string
          project_id: string | null
          supabase_product_id: string | null
        }
        Insert: {
          id?: string
          project_id?: string | null
          supabase_product_id?: string | null
        }
        Update: {
          id?: string
          project_id?: string | null
          supabase_product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supabase_products_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supabase_products_projects_supabase_product_id_fkey"
            columns: ["supabase_product_id"]
            isOneToOne: false
            referencedRelation: "supabase_products"
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
      [_ in never]: never
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

