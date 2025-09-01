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
  category: ('Podium' | 'Photo' | 'Publicité')[];
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

export interface Partner {
  id: string;
  name: string;
  type: 'Styliste' | 'Partenaire';
  logoUrl: string;
}

export interface SiteConfig {
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    github: string;
  };
}

export interface Event {
  id: string;
  title: string;
  theme: string;
  date: string;
  location: string;
  description: string;
  status: 'À venir' | 'Passé';
  stylists?: string[];
  gallery?: string[];
}

export interface Article {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  imageUrl: string;
  category: 'Interview' | 'Mode Gabonaise' | 'Conseils' | 'Événement' | 'Mannequin à la une';
  body: string;
}