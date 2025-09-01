
import React, { useState, useEffect, useRef } from 'react';
import type { Model } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface ModelDetailModalProps {
  model: Model;
  onClose: () => void;
}

const ModelDetailModal: React.FC<ModelDetailModalProps> = ({ model, onClose }) => {
  const [activeImage, setActiveImage] = useState(model.imageUrl);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImage(model.imageUrl);
  }, [model]);
  
  // Handle Escape key press & Focus Trapping
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    const modalNode = modalRef.current;
    if (!modalNode) return;

    const focusableElements = modalNode.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) {
        firstElement.focus();
    }

    const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
            if (event.shiftKey) { // Shift+Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    modalNode.addEventListener('keydown', handleTabKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      modalNode.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="model-name"
    >
      <div 
        ref={modalRef}
        className="bg-brand-dark rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        {/* Image Gallery */}
        <div className="w-full md:w-1/2 bg-black flex flex-col">
          <div className="flex-grow flex items-center justify-center overflow-hidden">
             <img src={activeImage} alt={`Portrait de ${model.name}`} className="w-full h-full object-cover max-h-[70vh] md:max-h-none"/>
          </div>
          <div className="p-2 bg-black/50">
            <div className="flex space-x-2 justify-center">
              {model.gallery.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-20 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-gold ${activeImage === img ? 'ring-2 ring-brand-gold' : ''}`}
                  aria-label={`Voir l'image ${index + 1}`}
                >
                  <img src={img} alt={`Galerie ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="relative w-full md:w-1/2 p-8 overflow-y-auto">
           <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-brand-gold transition-colors z-10" aria-label="Fermer">
            <CloseIcon />
          </button>
          <h2 id="model-name" className="text-4xl font-serif text-white mb-2">{model.name}</h2>
          <p className="text-brand-gold text-lg mb-6">{model.location}</p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="bg-gray-800/50 p-3 rounded">
              <span className="block text-gray-400 uppercase tracking-wider text-xs">Genre</span>
              <span className="font-semibold">{model.gender}</span>
            </div>
            <div className="bg-gray-800/50 p-3 rounded">
              <span className="block text-gray-400 uppercase tracking-wider text-xs">Âge</span>
              <span className="font-semibold">{model.age} ans</span>
            </div>
            <div className="bg-gray-800/50 p-3 rounded">
              <span className="block text-gray-400 uppercase tracking-wider text-xs">Taille</span>
              <span className="font-semibold">{model.height}</span>
            </div>
             <div className="bg-gray-800/50 p-3 rounded">
              <span className="block text-gray-400 uppercase tracking-wider text-xs">Contact</span>
              <a href={`tel:${model.phone}`} className="font-semibold hover:text-brand-gold">{model.phone}</a>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mb-3 border-b-2 border-brand-gold/20 pb-2">Biographie</h3>
          <p className="text-gray-300 leading-relaxed">
            {model.bio}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ModelDetailModal;