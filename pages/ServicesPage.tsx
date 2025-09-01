
import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import FAQSection from '../components/FAQSection';

const services = [
  {
    category: "Développement de carrière",
    items: [
      "Recrutement, encadrement et accompagnement de mannequins",
      "Élaboration de plans de carrière personnalisés",
      "Création de books professionnels (photos & vidéos)",
      "Coaching individuel (posture, expression, élégance)",
      "Conseil en image et relooking",
    ],
  },
  {
    category: "Formations & Coaching",
    items: [
      "Ateliers de formation en ligne et en présentiel",
      "Modules sur le défilé, la démarche, la confiance en soi",
      "Cours de gestuelle, pose photo et expression faciale",
      "Masterclasses avec des professionnels de la mode",
      "Sessions de mentorat personnalisées",
    ],
  },
  {
    category: "Production photo & vidéo",
    items: [
      "Organisation de shootings photos en studio et en extérieur",
      "Réalisation de portraits professionnels et éditoriaux",
      "Création de contenu pour les réseaux sociaux",
      "Vidéos de défilé, interviews, documentaires",
      "Captation d’événements, making-of et teasers",
    ],
  },
  {
    category: "Événementiel & défilés",
    items: [
      "Organisation de castings, défilés de mode et concours",
      "Coordination de prestations artistiques",
      "Scénographie et chorégraphie de shows",
      "Gestion des mannequins pour vos événements",
      "Mise à disposition de mannequins pour lancements de produits",
    ],
  },
];

const AccordionItem: React.FC<{
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}> = ({ title, children, isOpen, onClick, index }) => {
  const panelId = `service-panel-${index}`;
  const headerId = `service-header-${index}`;
  
  return (
    <div className="border-b border-brand-gold/20">
      <button
        id={headerId}
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-6 px-4 hover:bg-gray-800/50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <h3 className="text-2xl font-serif text-brand-gold">{title}</h3>
        <ChevronDownIcon className={`w-6 h-6 text-brand-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
            <div className="p-6 pt-0">
                 <ul className="space-y-3 text-gray-300 list-disc list-inside">
                    {children}
                 </ul>
            </div>
        </div>
      </div>
    </div>
  );
};


const ServicesPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SectionWrapper
        title="Nos Services"
        subtitle="Une expertise complète au service de la mode, de la beauté et de l'image."
      >
        <div className="max-w-4xl mx-auto bg-brand-dark rounded-lg border border-brand-gold/20">
          {services.map((service, index) => (
            <AccordionItem
              key={service.category}
              title={service.category}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            >
              {service.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
            </AccordionItem>
          ))}
        </div>
      </SectionWrapper>
      <FAQSection />
    </>
  );
};

export default ServicesPage;