export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      amenities: {
        Row: {
          category: string | null
          icon_key: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          icon_key?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          icon_key?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          base_fare: number
          check_in: string
          check_out: string
          created_at: string
          discount: number
          guests: number
          hotel_id: string
          id: string
          nights: number | null
          payment_mode: string
          payment_status: string
          promo_code: string | null
          room_id: string
          service_fee: number
          status: string
          taxes: number
          total: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          base_fare: number
          check_in: string
          check_out: string
          created_at?: string
          discount?: number
          guests?: number
          hotel_id: string
          id?: string
          nights?: number | null
          payment_mode?: string
          payment_status?: string
          promo_code?: string | null
          room_id: string
          service_fee?: number
          status?: string
          taxes?: number
          total?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          base_fare?: number
          check_in?: string
          check_out?: string
          created_at?: string
          discount?: number
          guests?: number
          hotel_id?: string
          id?: string
          nights?: number | null
          payment_mode?: string
          payment_status?: string
          promo_code?: string | null
          room_id?: string
          service_fee?: number
          status?: string
          taxes?: number
          total?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          category: string | null
          city: string
          country: string
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean
          starting_price: number | null
          tagline: string | null
        }
        Insert: {
          category?: string | null
          city: string
          country: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          starting_price?: number | null
          tagline?: string | null
        }
        Update: {
          category?: string | null
          city?: string
          country?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          starting_price?: number | null
          tagline?: string | null
        }
        Relationships: []
      }
      favourites: {
        Row: {
          id: string
          item_id: string
          item_type: string
          saved_at: string
          user_id: string
        }
        Insert: {
          id?: string
          item_id: string
          item_type: string
          saved_at?: string
          user_id: string
        }
        Update: {
          id?: string
          item_id?: string
          item_type?: string
          saved_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favourites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      flights: {
        Row: {
          airline: string
          arrives_at: string
          created_at: string
          departs_at: string
          destination_city: string
          destination_code: string | null
          destination_country: string
          duration_minutes: number | null
          flight_number: string | null
          id: string
          is_active: boolean
          origin_city: string
          origin_code: string | null
          origin_country: string
          price: number
          status: string
          stops: number
        }
        Insert: {
          airline: string
          arrives_at: string
          created_at?: string
          departs_at: string
          destination_city: string
          destination_code?: string | null
          destination_country: string
          duration_minutes?: number | null
          flight_number?: string | null
          id?: string
          is_active?: boolean
          origin_city: string
          origin_code?: string | null
          origin_country: string
          price: number
          status?: string
          stops?: number
        }
        Update: {
          airline?: string
          arrives_at?: string
          created_at?: string
          departs_at?: string
          destination_city?: string
          destination_code?: string | null
          destination_country?: string
          duration_minutes?: number | null
          flight_number?: string | null
          id?: string
          is_active?: boolean
          origin_city?: string
          origin_code?: string | null
          origin_country?: string
          price?: number
          status?: string
          stops?: number
        }
        Relationships: []
      }
      hotel_amenity_map: {
        Row: {
          amenity_id: string
          hotel_id: string
        }
        Insert: {
          amenity_id: string
          hotel_id: string
        }
        Update: {
          amenity_id?: string
          hotel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_amenity_map_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hotel_amenity_map_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotel_images: {
        Row: {
          alt_text: string | null
          created_at: string
          display_order: number
          hotel_id: string
          id: string
          is_cover: boolean
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          display_order?: number
          hotel_id: string
          id?: string
          is_cover?: boolean
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          display_order?: number
          hotel_id?: string
          id?: string
          is_cover?: boolean
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_images_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotel_tags: {
        Row: {
          hotel_id: string
          icon_key: string | null
          id: string
          tag: string
        }
        Insert: {
          hotel_id: string
          icon_key?: string | null
          id?: string
          tag: string
        }
        Update: {
          hotel_id?: string
          icon_key?: string | null
          id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_tags_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          address: string | null
          amenity_count: number
          avg_rating: number | null
          city: string
          country: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          latitude: number | null
          longitude: number | null
          name: string
          review_count: number
          slug: string
          star_rating: number | null
          type: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          amenity_count?: number
          avg_rating?: number | null
          city: string
          country: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
          name: string
          review_count?: number
          slug: string
          star_rating?: number | null
          type?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          amenity_count?: number
          avg_rating?: number | null
          city?: string
          country?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
          name?: string
          review_count?: number
          slug?: string
          star_rating?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      recent_searches: {
        Row: {
          city: string | null
          country: string | null
          destination: string
          id: string
          image_url: string | null
          place_count: number | null
          searched_at: string
          user_id: string
        }
        Insert: {
          city?: string | null
          country?: string | null
          destination: string
          id?: string
          image_url?: string | null
          place_count?: number | null
          searched_at?: string
          user_id: string
        }
        Update: {
          city?: string | null
          country?: string | null
          destination?: string
          id?: string
          image_url?: string | null
          place_count?: number | null
          searched_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recent_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          body: string | null
          booking_id: string | null
          created_at: string
          hotel_id: string
          id: string
          is_verified: boolean
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          body?: string | null
          booking_id?: string | null
          created_at?: string
          hotel_id: string
          id?: string
          is_verified?: boolean
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string | null
          booking_id?: string | null
          created_at?: string
          hotel_id?: string
          id?: string
          is_verified?: boolean
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          bed_type: string | null
          created_at: string
          description: string | null
          hotel_id: string
          id: string
          image_url: string | null
          is_available: boolean
          max_guests: number
          name: string
          price_per_night: number
          updated_at: string
          view_type: string | null
        }
        Insert: {
          bed_type?: string | null
          created_at?: string
          description?: string | null
          hotel_id: string
          id?: string
          image_url?: string | null
          is_available?: boolean
          max_guests?: number
          name: string
          price_per_night: number
          updated_at?: string
          view_type?: string | null
        }
        Update: {
          bed_type?: string | null
          created_at?: string
          description?: string | null
          hotel_id?: string
          id?: string
          image_url?: string | null
          is_available?: boolean
          max_guests?: number
          name?: string
          price_per_night?: number
          updated_at?: string
          view_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_provider: string
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          is_active: boolean
          phone: string | null
          updated_at: string
        }
        Insert: {
          auth_provider?: string
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          is_active?: boolean
          phone?: string | null
          updated_at?: string
        }
        Update: {
          auth_provider?: string
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          is_active?: boolean
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_hotels: {
        Args: {
          p_check_in?: string
          p_check_out?: string
          p_destination: string
          p_guests?: number
          p_max_price?: number
          p_min_price?: number
          p_min_rating?: number
          p_min_stars?: number
        }
        Returns: {
          avg_rating: number
          city: string
          country: string
          cover_image: string
          hotel_id: string
          hotel_name: string
          min_room_price: number
          review_count: number
          star_rating: number
        }[]
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      toggle_favourite: {
        Args: { p_item_id: string; p_item_type: string; p_user_id: string }
        Returns: boolean
      }
      unaccent: { Args: { "": string }; Returns: string }
      upsert_recent_search: {
        Args: {
          p_city: string
          p_country: string
          p_destination: string
          p_image_url: string
          p_place_count: number
          p_user_id: string
        }
        Returns: undefined
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
