import React from 'react';
import { designers } from '../data/designersData';
import DesignerCarousel from '../components/DesignerCarousel';
import SectionWrapper from '../components/SectionWrapper';

const DesignersPage: React.FC = () => {
  return (
    <SectionWrapper
      title="Les Stylistes du Perfect Fashion Day"
      subtitle="Découvrez les créations uniques des talents de la mode africaine"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {designers.map((designer) => (
            <DesignerCarousel 
              key={designer.id}
              designerName={designer.name}
              images={designer.images}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-serif text-brand-gold mb-6">Rejoignez-nous pour un défilé exceptionnel</h3>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Le Perfect Fashion Day réunit les plus grands talents de la mode africaine pour une célébration unique de la créativité et de l'élégance.
            Ne manquez pas cet événement incontournable de la mode africaine contemporaine.
          </p>
          <button className="px-8 py-3 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-yellow-300 transition-colors duration-300 transform hover:scale-105">
            Réserver ma place
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default DesignersPage;
