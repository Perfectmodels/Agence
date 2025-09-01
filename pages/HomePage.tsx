
import React, { useState } from 'react';
// FIX: Use namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { models } from '../data/modelsData';
import { testimonials } from '../data/siteData';
import SectionWrapper from '../components/SectionWrapper';
import ModelCard from '../components/ModelCard';
import ModelDetailModal from '../components/ModelDetailModal';
import { BriefcaseIcon } from '../components/icons/BriefcaseIcon';
import { AcademicCapIcon } from '../components/icons/AcademicCapIcon';
import { StarIcon } from '../components/icons/StarIcon';
import type { Model } from '../types';
import AnimatedSection from '../components/AnimatedSection';

const HomePage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const featuredModels = models.slice(0, 4);

  return (
    <div className="text-white">
      {selectedModel && <ModelDetailModal model={selectedModel} onClose={() => setSelectedModel(null)} />}

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="background (1).jpg" 
            alt="Fashion background" 
            className="w-full h-full object-cover object-center opacity-30 scale-110 animate-slow-zoom"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50"></div>
        </div>
        <div className="relative z-10 p-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold animate-fade-in-down">
            Perfect Models <span className="text-brand-gold">Management</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300 animate-fade-in-up">
            L'excellence et la discipline au service de la mode gabonaise. Nous façonnons les icônes de demain.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up">
            {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
            <ReactRouterDOM.Link to="/mannequins" className="px-8 py-3 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-gold/20">
              Découvrir nos mannequins
            </ReactRouterDOM.Link>
            {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
            <ReactRouterDOM.Link to="/contact" className="px-8 py-3 bg-transparent border-2 border-brand-gold text-brand-gold font-bold rounded-full hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300 transform hover:scale-105">
              Nous Contacter
            </ReactRouterDOM.Link>
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <SectionWrapper 
        title="Notre Agence"
        subtitle="Fondée en 2021, une nouvelle vision pour le mannequinat."
      >
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative rounded-lg overflow-hidden shadow-xl" style={{'aspectRatio': '4/5'}}>
                  <img src="https://i.ibb.co/mRKn421/ceo.jpg" alt="Louis Parfait Asseko, Fondateur" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-serif text-white">Louis Parfait Asseko</h3>
                      <p className="text-brand-gold">Fondateur & CEO</p>
                  </div>
              </div>
              <div className="text-gray-300 text-lg leading-relaxed">
                <p className="mb-6">
                  Perfect Models Management est une agence de mannequins gabonaise qui œuvre dans le domaine du mannequinat, de la mode et de l'accompagnement artistique. 
                </p>
                 <p className="mb-6">
                  L'agence se distingue par son engagement dans la formation des jeunes talents, la valorisation de la beauté africaine et l'organisation d'événements culturels qui redéfinissent les standards de la mode au Gabon.
                </p>
                {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
                <ReactRouterDOM.Link to="/a-propos" className="mt-4 inline-block px-6 py-3 border-2 border-brand-gold text-brand-gold font-bold rounded-full hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300">
                  En savoir plus &rarr;
                </ReactRouterDOM.Link>
              </div>
          </div>
        </AnimatedSection>
      </SectionWrapper>
      
      {/* Featured Models */}
      <SectionWrapper 
        title="Nos Talents"
        subtitle="Découvrez les visages qui définissent la mode de demain."
        className="bg-gray-900/50"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredModels.map((model, index) => (
            <AnimatedSection key={model.id} delay={index * 100}>
              <ModelCard model={model} onClick={() => setSelectedModel(model)} />
            </AnimatedSection>
          ))}
        </div>
        <div className="text-center mt-12">
            {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
            <ReactRouterDOM.Link to="/mannequins" className="px-8 py-3 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-yellow-300 transition-colors duration-300 transform hover:scale-105 shadow-lg shadow-brand-gold/20">
              Voir tous les mannequins
            </ReactRouterDOM.Link>
        </div>
      </SectionWrapper>

       {/* Services Preview */}
      <SectionWrapper 
        title="Nos Services"
        subtitle="Une offre complète pour les talents et les marques."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
            <AnimatedSection delay={0} className="p-8 border border-brand-gold/20 rounded-lg bg-black/30 transform hover:-translate-y-2 transition-transform duration-300">
                <BriefcaseIcon className="h-12 w-12 mx-auto text-brand-gold mb-4"/>
                <h3 className="text-2xl font-serif text-white mb-4">Développement de Carrière</h3>
                <p className="text-gray-400">Recrutement, encadrement et élaboration de plans de carrière personnalisés pour chaque talent.</p>
            </AnimatedSection>
            <AnimatedSection delay={100} className="p-8 border border-brand-gold/20 rounded-lg bg-black/30 transform hover:-translate-y-2 transition-transform duration-300">
                <AcademicCapIcon className="h-12 w-12 mx-auto text-brand-gold mb-4"/>
                <h3 className="text-2xl font-serif text-white mb-4">Formations & Coaching</h3>
                <p className="text-gray-400">Ateliers de formation sur le défilé, la posture, la confiance en soi et la pose photo.</p>
            </AnimatedSection>
            <AnimatedSection delay={200} className="p-8 border border-brand-gold/20 rounded-lg bg-black/30 transform hover:-translate-y-2 transition-transform duration-300">
                <StarIcon className="h-12 w-12 mx-auto text-brand-gold mb-4"/>
                <h3 className="text-2xl font-serif text-white mb-4">Événementiel & Défilés</h3>
                <p className="text-gray-400">Organisation de castings, défilés de mode, et mise à disposition de mannequins professionnels.</p>
            </AnimatedSection>
        </div>
        <div className="text-center mt-12">
            {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
            <ReactRouterDOM.Link to="/services" className="text-brand-gold font-bold hover:underline">
                Explorer tous nos services &rarr;
            </ReactRouterDOM.Link>
        </div>
      </SectionWrapper>
      
      {/* Testimonials */}
      <SectionWrapper
        title="Ce qu'ils disent de nous"
        subtitle="La confiance de nos partenaires est notre plus grande fierté."
        className="bg-gray-900/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="bg-brand-dark p-8 rounded-lg border border-gray-800/50 h-full">
                <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                <div className="text-right">
                  <p className="font-bold text-white font-serif">{testimonial.author}</p>
                  <p className="text-sm text-brand-gold">{testimonial.relation}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </SectionWrapper>

      {/* Join Us CTA */}
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-6 text-center">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto bg-gradient-to-r from-yellow-900/50 to-brand-gold/30 p-10 rounded-lg border border-brand-gold/30">
                  <h2 className="text-4xl font-serif font-bold text-white mb-4">Prêt à briller ?</h2>
                  <p className="text-gray-300 text-lg mb-8">
                      Que vous soyez un mannequin aspirant ou une marque cherchant des visages uniques, nous sommes prêts à collaborer avec vous.
                  </p>
                   {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
                   <ReactRouterDOM.Link to="/devenir-mannequin" className="px-10 py-4 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-gold/20">
                      Rejoignez l'aventure
                  </ReactRouterDOM.Link>
              </div>
            </AnimatedSection>
        </div>
      </section>

    </div>
  );
};

export default HomePage;