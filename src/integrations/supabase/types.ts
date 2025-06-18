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
      engagement_logs: {
        Row: {
          id: string
          metadata: Json | null
          timestamp: string
          type: string
          user_id: string
        }
        Insert: {
          id?: string
          metadata?: Json | null
          timestamp?: string
          type: string
          user_id: string
        }
        Update: {
          id?: string
          metadata?: Json | null
          timestamp?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          ai_score: number | null
          created_at: string | null
          expires_at: string | null
          first_message_sent_at: string | null
          id: string
          status: string | null
          user_1_id: string
          user_2_id: string
        }
        Insert: {
          ai_score?: number | null
          created_at?: string | null
          expires_at?: string | null
          first_message_sent_at?: string | null
          id?: string
          status?: string | null
          user_1_id: string
          user_2_id: string
        }
        Update: {
          ai_score?: number | null
          created_at?: string | null
          expires_at?: string | null
          first_message_sent_at?: string | null
          id?: string
          status?: string | null
          user_1_id?: string
          user_2_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          file_url: string | null
          id: string
          message: string
          pinned_until: string | null
          receiver_id: string
          scheduled_for: string | null
          seen: boolean | null
          sender_id: string
          timestamp: string | null
          type: string | null
        }
        Insert: {
          file_url?: string | null
          id?: string
          message: string
          pinned_until?: string | null
          receiver_id: string
          scheduled_for?: string | null
          seen?: boolean | null
          sender_id: string
          timestamp?: string | null
          type?: string | null
        }
        Update: {
          file_url?: string | null
          id?: string
          message?: string
          pinned_until?: string | null
          receiver_id?: string
          scheduled_for?: string | null
          seen?: boolean | null
          sender_id?: string
          timestamp?: string | null
          type?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          tags: string[] | null
          type: string
          visibility: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          tags?: string[] | null
          type: string
          visibility?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          tags?: string[] | null
          type?: string
          visibility?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          availability: string | null
          badges: string[] | null
          bio: string | null
          created_at: string | null
          email: string | null
          embedding_vector: string | null
          engagement_score: number | null
          experience: string | null
          fast_message_count: number | null
          id: string
          industry: string | null
          language: string | null
          location: string | null
          match_quota: number | null
          name: string | null
          profile_picture_url: string | null
          role: string | null
          secondary_role: string | null
          skills: string[] | null
          tags: string[] | null
          updated_at: string | null
          vision: string | null
          year_of_birth: number | null
        }
        Insert: {
          availability?: string | null
          badges?: string[] | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          embedding_vector?: string | null
          engagement_score?: number | null
          experience?: string | null
          fast_message_count?: number | null
          id: string
          industry?: string | null
          language?: string | null
          location?: string | null
          match_quota?: number | null
          name?: string | null
          profile_picture_url?: string | null
          role?: string | null
          secondary_role?: string | null
          skills?: string[] | null
          tags?: string[] | null
          updated_at?: string | null
          vision?: string | null
          year_of_birth?: number | null
        }
        Update: {
          availability?: string | null
          badges?: string[] | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          embedding_vector?: string | null
          engagement_score?: number | null
          experience?: string | null
          fast_message_count?: number | null
          id?: string
          industry?: string | null
          language?: string | null
          location?: string | null
          match_quota?: number | null
          name?: string | null
          profile_picture_url?: string | null
          role?: string | null
          secondary_role?: string | null
          skills?: string[] | null
          tags?: string[] | null
          updated_at?: string | null
          vision?: string | null
          year_of_birth?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_fast_responder_badge: {
        Args: { user_uuid: string; match_uuid: string }
        Returns: undefined
      }
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      calculate_engagement_score: {
        Args: { user_uuid: string }
        Returns: number
      }
      expire_old_matches: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      update_engagement_scores: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
