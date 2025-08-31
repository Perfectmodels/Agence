
import type { TeamMember, Testimonial } from '../types';

export const teamMembers: TeamMember[] = [
  {
    name: 'Louis Parfait Asseko',
    role: 'Fondateur & CEO',
    imageUrl: 'https://i.ibb.co/mRKn421/ceo.jpg',
    bio: 'Visionnaire et passionné, Louis a fondé PMM pour révolutionner le mannequinat au Gabon en misant sur le professionnalisme et la formation.',
  },
  {
    name: 'Jeanne Evoung',
    role: 'Responsable des Bookings',
    imageUrl: 'https://picsum.photos/400/400?random=booking',
    bio: "Avec son carnet d'adresses et son sens de la négociation, Jeanne connecte nos talents avec les plus grandes marques et créateurs.",
  },
  {
    name: 'Eric Nguema',
    role: 'Coach & Formateur Principal',
    imageUrl: 'https://picsum.photos/400/400?random=coach',
    bio: 'Ancien mannequin international, Eric transmet son savoir-faire et sa rigueur aux nouvelles générations pour les préparer aux exigences du métier.',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: 'Collaborer avec Perfect Models Management est un gage de professionnalisme. Leurs mannequins sont non seulement talentueux mais aussi incroyablement disciplinés.',
    author: 'AG Style',
    relation: 'Styliste Partenaire',
  },
  {
    quote: "L'agence m'a offert une formation complète qui a transformé ma carrière. Je me sens plus confiant et préparé pour les podiums internationaux.",
    author: 'Akoma Ayo Rosnel',
    relation: 'Mannequin PMM',
  },
  {
    quote: 'Le Perfect Fashion Day est devenu un événement incontournable. PMM a su créer une plateforme exceptionnelle pour la mode gabonaise.',
    author: 'Farel MD',
    relation: 'Créateur de mode',
  },
];
