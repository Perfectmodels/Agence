
import type { Event } from '../types';

export const events: Event[] = [
  {
    id: 'pfd-edition-2',
    title: 'Perfect Fashion Day - Édition 2',
    theme: 'L’Art de Se Révéler',
    date: '2026-01-31',
    location: 'Lieu à annoncer, Libreville',
    description: "Une nouvelle édition sous le signe de l’identité, de la culture et de l'affirmation de soi. Après une première édition marquante, PMM est fier d’annoncer le retour de la Perfect Fashion Day. Le lieu, la programmation complète, les stylistes sélectionnés et les artistes invités seront bientôt annoncés. Restez connectés !",
    status: 'À venir',
  },
  {
    id: 'pfd-edition-1',
    title: 'Perfect Fashion Day - Édition 1',
    theme: 'Racines & Modernité',
    date: '2025-01-25',
    location: 'La Gare du Nord, Libreville',
    description: "Slam d'ouverture par Lady Riaba et parade spéciale de la délégation des Miss du Gabon.",
    status: 'Passé',
    stylists: [
        "AG Style", "Farel MD", "Ventex Custom", "Belgrace Fashion", 
        "Miguel Fashion Style", "Faran (Parade des Miss du Gabon)", 
        "NFA Design", "Madame Luc / Abiale", "Brand’O", "Tito Style", "Edele A (Groupe mixte)"
    ],
    gallery: [
        "https://i.ibb.co/L51D9zG/DSC-0101.jpg",
        "https://i.ibb.co/wYdYx6k/AJC-4581.jpg",
        "https://i.ibb.co/7FcrvPf/AJC-4643.jpg",
        "https://i.ibb.co/N1kYm5v/AJC-4638.jpg",
        "https://i.ibb.co/mH0k5qM/AJC-4550.jpg",
        "https://i.ibb.co/Jq0R2W2/AJC-4562.jpg",
    ],
  }
];
