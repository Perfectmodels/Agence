
export interface Model {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  age?: number;
  height?: string;
  gender: 'Homme' | 'Femme';
  location?: string;
  imageUrl: string;
  gallery: string[];
  bio: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  relation: string;
}
