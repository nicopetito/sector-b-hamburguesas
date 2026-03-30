export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          display_order: number;
          active: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["categories"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["categories"]["Row"]>;
      };
      menu_items: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          description: string | null;
          includes_fries: boolean;
          featured: boolean;
          active: boolean;
          image_url: string | null;
          display_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["menu_items"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["menu_items"]["Row"]>;
      };
      menu_item_variants: {
        Row: {
          id: string;
          item_id: string;
          label: string;
          price: number;
          display_order: number;
        };
        Insert: Omit<
          Database["public"]["Tables"]["menu_item_variants"]["Row"],
          "id"
        >;
        Update: Partial<
          Database["public"]["Tables"]["menu_item_variants"]["Row"]
        >;
      };
      promos: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          price: number | null;
          badge_text: string | null;
          active: boolean;
          expires_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["promos"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["promos"]["Row"]>;
      };
      happy_hour_config: {
        Row: {
          id: string;
          start_time: string;
          end_time: string;
          days_of_week: number[];
          description: string | null;
          active: boolean;
        };
        Insert: Omit<
          Database["public"]["Tables"]["happy_hour_config"]["Row"],
          "id"
        >;
        Update: Partial<
          Database["public"]["Tables"]["happy_hour_config"]["Row"]
        >;
      };
      extras: {
        Row: {
          id: string;
          name: string;
          price: number;
          active: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["extras"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["extras"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

// Tipos de conveniencia
export type Category =
  Database["public"]["Tables"]["categories"]["Row"];
export type MenuItem =
  Database["public"]["Tables"]["menu_items"]["Row"];
export type MenuItemVariant =
  Database["public"]["Tables"]["menu_item_variants"]["Row"];
export type Promo = Database["public"]["Tables"]["promos"]["Row"];
export type HappyHourConfig =
  Database["public"]["Tables"]["happy_hour_config"]["Row"];
export type Extra = Database["public"]["Tables"]["extras"]["Row"];

// MenuItem con variantes cargadas
export type MenuItemWithVariants = MenuItem & {
  menu_item_variants: MenuItemVariant[];
  categories?: Category;
};
