
import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import SectionWrapper from './SectionWrapper';

const faqData = [
  {
    question: "Quels sont les critères pour devenir mannequin chez PMM ?",
    answer: "Nous recherchons des profils variés. Bien qu'il n'y ait pas de critères stricts, nous valorisons une forte présence, une personnalité unique et un engagement professionnel. Les tailles standards pour les défilés sont généralement de 1m72+ pour les femmes et 1m82+ pour les hommes, mais nous sommes ouverts à tous les types de profils pour la publicité et la photographie."
  },
  {
    question: "Dois-je avoir de l'expérience pour postuler ?",
    answer: "Non, l'expérience n'est pas obligatoire. Perfect Models Management est aussi une agence de formation. Nous cherchons avant tout des talents bruts et motivés que nous pourrons former et accompagner dans leur développement de carrière."
  },
  {
    question: "La formation est-elle payante ?",
    answer: "Nous proposons plusieurs parcours. Certaines formations de base sont intégrées au parcours de développement des mannequins que nous signons. Des ateliers et masterclasses plus spécifiques peuvent être payants. Chaque cas est étudié individuellement."
  },
  {
    question: "Comment se déroule le processus de casting ?",
    answer: "Après avoir soumis votre candidature en ligne, notre équipe l'examine. Si votre profil correspond à nos recherches actuelles, nous vous inviterons à un casting en personne à Libreville. Ce casting inclut généralement une prise de polas (photos naturelles), un test de marche et un court entretien."
  },
  {
    question: "Travaillez-vous avec des mannequins internationaux ?",
    answer: "Notre mission principale est de promouvoir les talents gabonais. Cependant, nous sommes ouverts à des collaborations et représentons des mannequins de diverses nationalités basés au Gabon. Nous développons également des partenariats pour placer nos mannequins à l'international."
  }
];

const FaqItem: React.FC<{
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
  index: number;
}> = ({ item, isOpen, onClick, index }) => {
  const panelId = `faq-panel-${index}`;
  const headerId = `faq-header-${index}`;

  return (
    <div className="border-b border-brand-gold/20">
      <button
        id={headerId}
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-6 px-4 hover:bg-gray-800/50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <h3 className="text-xl font-semibold text-white">{item.question}</h3>
        <ChevronDownIcon className={`w-6 h-6 text-brand-gold transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
            <div className="p-6 pt-0 text-gray-300 leading-relaxed">
                 {item.answer}
            </div>
        </div>
      </div>
    </div>
  );
};


const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <SectionWrapper
            title="Questions Fréquemment Posées"
            subtitle="Trouvez les réponses à vos questions sur notre agence, nos services et le processus de candidature."
            className="bg-gray-900/50"
        >
            <div className="max-w-4xl mx-auto bg-brand-dark rounded-lg border border-brand-gold/20">
                {faqData.map((item, index) => (
                    <FaqItem
                        key={index}
                        item={item}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        index={index}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
};

export default FAQSection;