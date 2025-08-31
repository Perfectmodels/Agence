
import React, { useState, useMemo } from 'react';
import { models } from '../data/modelsData';
import ModelCard from '../components/ModelCard';
import SectionWrapper from '../components/SectionWrapper';
import ModelDetailModal from '../components/ModelDetailModal';
import type { Model } from '../types';

type FilterType = 'Tous' | 'Femme' | 'Homme';

const ModelsPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('Tous');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const filteredModels = useMemo(() => {
    if (filter === 'Tous') {
      return models;
    }
    return models.filter(model => model.gender === filter);
  }, [filter]);

  const FilterButton: React.FC<{
    label: FilterType;
    currentFilter: FilterType;
    setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  }> = ({ label, currentFilter, setFilter }) => {
    const isActive = label === currentFilter;
    return (
      <button
        onClick={() => setFilter(label)}
        className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 text-sm md:text-base ${
          isActive
            ? 'bg-brand-gold text-brand-dark shadow-md'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
        aria-pressed={isActive}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      {selectedModel && (
        <ModelDetailModal 
          model={selectedModel} 
          onClose={() => setSelectedModel(null)} 
        />
      )}
      <SectionWrapper 
        title="Nos Mannequins" 
        subtitle="Les talents qui portent notre vision. Découvrez des profils uniques, prêts à sublimer vos projets."
      >
        <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
          <FilterButton label="Tous" currentFilter={filter} setFilter={setFilter} />
          <FilterButton label="Femme" currentFilter={filter} setFilter={setFilter} />
          <FilterButton label="Homme" currentFilter={filter} setFilter={setFilter} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredModels.map((model: Model) => (
            <ModelCard 
              key={model.id} 
              model={model} 
              onClick={() => setSelectedModel(model)} 
            />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
};

export default ModelsPage;
