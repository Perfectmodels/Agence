
import React from 'react';
import type { Model } from '../types';

interface ModelCardProps {
  model: Model;
  onClick: () => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  return (
    <button 
      className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-900 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold"
      onClick={onClick}
      aria-label={`Voir le profil de ${model.name}`}
    >
      <img 
        src={model.imageUrl} 
        alt={`Portrait de ${model.name}`} 
        className="w-full h-96 object-cover object-top transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity duration-300 group-hover:from-black/80"></div>
      <div className="absolute bottom-0 left-0 p-6 text-white w-full">
        <div className="transform transition-transform duration-500 translate-y-10 group-hover:translate-y-0">
          <h3 className="text-2xl font-serif font-bold">{model.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <span>{model.height}</span>
            <span>&bull;</span>
            <span>{model.age} ans</span>
            <span>&bull;</span>
            <span>{model.gender}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 bg-brand-gold text-brand-dark px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
        Voir profil
      </div>
    </button>
  );
};

export default ModelCard;
