
import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { teamMembers } from '../data/siteData';
import { models } from '../data/modelsData';

import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { ScaleIcon } from '../components/icons/ScaleIcon';
import { StarIcon } from '../components/icons/StarIcon';
import { GlobeAltIcon } from '../components/icons/GlobeAltIcon';

const values = [
    { title: "Professionnalisme", description: "Une approche rigoureuse et structurée à chaque étape de notre travail.", icon: <ShieldCheckIcon /> },
    { title: "Discipline", description: "L'engagement et la constance, clés de la réussite dans l'industrie.", icon: <ScaleIcon /> },
    { title: "Excellence", description: "Viser la plus haute qualité dans toutes nos productions et collaborations.", icon: <StarIcon className="w-8 h-8" /> },
    { title: "Culture Gabonaise", description: "Promouvoir et célébrer la richesse de notre héritage culturel.", icon: <GlobeAltIcon /> },
];

const distinctions = [
    { name: "Ruth Jussy", titles: "Meilleur Mannequin Espoir, Miss Tourisme", imageUrl: "https://picsum.photos/400/500?random=ruth" },
    { name: "Kendra Mebiame", titles: "Meilleur Mannequin Espoir (2022)", imageUrl: models.find(m => m.id === 'kendra-mebiame')?.imageUrl },
    { name: "Noémie Kim", titles: "Mannequin Phare de l’Agence", imageUrl: models.find(m => m.id === 'noemie-kim')?.imageUrl },
    { name: "Nynelle Mbazoghe", titles: "1ère Dauphine Miss Casino Croisette", imageUrl: "https://picsum.photos/400/500?random=nynelle" },
];

const timeline = [
    { year: "2021", event: "Fondation de l'agence par Louis Parfait Asseko avec la vision de professionnaliser le mannequinat au Gabon." },
    { year: "2022", event: "Lancement des premiers ateliers de formation intensive et placement de nos premiers mannequins dans des campagnes locales." },
    { year: "2024", event: "Nos mannequins commencent à recevoir des distinctions nationales, validant notre approche axée sur l'excellence." },
    { year: "2025", event: "Organisation de la première édition réussie du 'Perfect Fashion Day', un événement majeur pour la mode locale." },
];

const AboutPage: React.FC = () => {
  return (
    <>
      <SectionWrapper
        title="Notre Histoire"
        subtitle="De la vision à la réalité : l'ascension de Perfect Models Management."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 md:order-1 relative pl-8">
            {/* Timeline */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand-gold/20 rounded"></div>
            {timeline.map((item, index) => (
                <div key={index} className="mb-12 relative">
                    <div className="absolute -left-11 top-0 w-8 h-8 bg-brand-dark border-2 border-brand-gold rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-brand-gold rounded-full"></div>
                    </div>
                    <h3 className="text-2xl font-serif text-brand-gold mb-2">{item.year}</h3>
                    <p className="text-gray-300">{item.event}</p>
                </div>
            ))}
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://i.ibb.co/mRKn421/ceo.jpg"
              alt="Louis Parfait Asseko, fondateur de PMM"
              className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[4/5]"
            />
          </div>
        </div>
      </SectionWrapper>
      
      <SectionWrapper
        title="Nos Valeurs"
        subtitle="Les piliers qui guident chacune de nos actions."
        className="bg-gray-900/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {values.map(value => (
            <div key={value.title} className="bg-brand-dark p-6 rounded-lg border border-brand-gold/20 text-center">
              <div className="text-brand-gold mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-brand-gold/10">{value.icon}</div>
              <h3 className="text-2xl font-serif text-white mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper
        title="Hall of Fame"
        subtitle="La reconnaissance du talent, du travail et de la discipline."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {distinctions.map(distinction => (
                <div key={distinction.name} className="group relative overflow-hidden rounded-lg shadow-lg">
                    <img src={distinction.imageUrl} alt={distinction.name} className="w-full h-full object-cover aspect-[4/5]"/>
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-serif text-white">{distinction.name}</h3>
                        <p className="text-brand-gold text-sm">{distinction.titles}</p>
                    </div>
                </div>
            ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Notre Équipe"
        subtitle="Les experts qui orchestrent le succès de nos talents."
        className="bg-gray-900/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map(member => (
                <div key={member.name} className="text-center">
                    <img src={member.imageUrl} alt={member.name} className="w-48 h-48 rounded-full mx-auto mb-4 object-cover border-4 border-brand-gold/50"/>
                    <h3 className="text-2xl font-serif text-white">{member.name}</h3>
                    <p className="text-brand-gold mb-2">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
            ))}
        </div>
      </SectionWrapper>
    </>
  );
};

export default AboutPage;
