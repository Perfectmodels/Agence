export type Database = {
  public: {
    Tables: {
      models: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          age: number;
          height: string;
          gender: string;
          location: string;
          image_url: string;
          gallery: string[];
          bio: string;
          category: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          age: number;
          height: string;
          gender: string;
          location: string;
          image_url: string;
          gallery: string[];
          bio: string;
          category: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string;
          age?: number;
          height?: string;
          gender?: string;
          location?: string;
          image_url?: string;
          gallery?: string[];
          bio?: string;
          category?: string[];
        };
      };
    };
  };
};
