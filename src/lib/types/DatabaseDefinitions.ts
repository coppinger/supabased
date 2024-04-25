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
      availabilities: {
        Row: {
          id: number
          name: string | null
          sort: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          sort?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          sort?: number | null
        }
        Relationships: []
      }
      endorsements: {
        Row: {
          created_at: string | null
          endorsed_by: string | null
          endorsement_to: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          endorsed_by?: string | null
          endorsement_to?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
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
      languages: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          id: number
          name: string | null
          sort: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          sort?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          sort?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          availabilities: string[] | null
          bio: string | null
          created_at: string | null
          deleted_at: string | null
          display_name: string | null
          email: string | null
          github_username: string | null
          id: string
          languages: string[] | null
          linkedin_url: string | null
          location: string | null
          pfp_url: string | null
          products: string[] | null
          skills: string | null
          stacks: string[] | null
          timezone: string | null
          twitter_username: string | null
          updated_at: string | null
          username: string | null
          website_url: string | null
        }
        Insert: {
          availabilities?: string[] | null
          bio?: string | null
          created_at?: string | null
          deleted_at?: string | null
          display_name?: string | null
          email?: string | null
          github_username?: string | null
          id: string
          languages?: string[] | null
          linkedin_url?: string | null
          location?: string | null
          pfp_url?: string | null
          products?: string[] | null
          skills?: string | null
          stacks?: string[] | null
          timezone?: string | null
          twitter_username?: string | null
          updated_at?: string | null
          username?: string | null
          website_url?: string | null
        }
        Update: {
          availabilities?: string[] | null
          bio?: string | null
          created_at?: string | null
          deleted_at?: string | null
          display_name?: string | null
          email?: string | null
          github_username?: string | null
          id?: string
          languages?: string[] | null
          linkedin_url?: string | null
          location?: string | null
          pfp_url?: string | null
          products?: string[] | null
          skills?: string | null
          stacks?: string[] | null
          timezone?: string | null
          twitter_username?: string | null
          updated_at?: string | null
          username?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      profiles_availabilities: {
        Row: {
          availability_id: number | null
          id: string
          profile_id: string | null
        }
        Insert: {
          availability_id?: number | null
          id?: string
          profile_id?: string | null
        }
        Update: {
          availability_id?: number | null
          id?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_availabilities_availability_id_fkey"
            columns: ["availability_id"]
            isOneToOne: false
            referencedRelation: "availabilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_availabilities_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_roles: {
        Row: {
          id: string
          profile_id: string | null
          role_id: number | null
        }
        Insert: {
          id?: string
          profile_id?: string | null
          role_id?: number | null
        }
        Update: {
          id?: string
          profile_id?: string | null
          role_id?: number | null
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
      projects_languages: {
        Row: {
          id: string
          language_id: number
          project_id: string
        }
        Insert: {
          id?: string
          language_id: number
          project_id: string
        }
        Update: {
          id?: string
          language_id?: number
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_languages_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_languages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects_products: {
        Row: {
          id: string
          product_id: number | null
          project_id: string | null
        }
        Insert: {
          id?: string
          product_id?: number | null
          project_id?: string | null
        }
        Update: {
          id?: string
          product_id?: number | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_products_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
          id: number
          name: string | null
          sort: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          sort?: number | null
        }
        Update: {
          id?: number
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
    }
    Views: {
      stacks_count: {
        Row: {
          count: number | null
          name: string | null
        }
        Relationships: []
      }
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

