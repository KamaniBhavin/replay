export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users_to_web_page_embeddings: {
        Row: {
          created_at: string;
          id: number;
          user_id: string;
          web_page_embedding_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          user_id: string;
          web_page_embedding_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          user_id?: string;
          web_page_embedding_id?: number;
        };
      };
      web_page_embeddings: {
        Row: {
          content: string;
          domain: string;
          embedding: number[];
          id: number;
          title: string;
          url: string;
        };
        Insert: {
          content: string;
          domain: string;
          embedding: number[];
          id?: number;
          title: string;
          url: string;
        };
        Update: {
          content?: string;
          domain?: string;
          embedding?: number[];
          id?: number;
          title?: string;
          url?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      find_similar_web_pages: {
        Args: {
          current_user_id: string;
          search_query_embedding: number[];
          similarity_threshold: number;
          match_count: number;
        };
        Returns: {
          domain: string;
          url: string;
          title: string;
          similarity: number;
        }[];
      };
      is_already_scraped: {
        Args: {
          new_url: string;
        };
        Returns: boolean;
      };
      ivfflathandler: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      link_user_to_web_page_embedding: {
        Args: {
          user_id: string;
          page_url: string;
        };
        Returns: undefined;
      };
      vector_avg: {
        Args: {
          '': number[];
        };
        Returns: string;
      };
      vector_dims: {
        Args: {
          '': string;
        };
        Returns: number;
      };
      vector_norm: {
        Args: {
          '': string;
        };
        Returns: number;
      };
      vector_out: {
        Args: {
          '': string;
        };
        Returns: unknown;
      };
      vector_send: {
        Args: {
          '': string;
        };
        Returns: string;
      };
      vector_typmod_in: {
        Args: {
          '': unknown[];
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
