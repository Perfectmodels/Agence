
import React, { useState, useMemo } from 'react';
import { models as initialModels } from '../../data/modelsData';
import type { Model } from '../../types';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import ModelFormModal from '../../components/admin/ModelFormModal';
import { useChanges } from '../../contexts/ChangesContext';

// Define filter types
type CategoryFilter = 'Tous' | 'Podium' | 'Photo' | 'Publicité';
const categories: CategoryFilter[] = ['Tous', 'Podium', 'Photo', 'Publicité'];


const ManageModelsPage: React.FC = () => {
  const [models, setModels] = useState(initialModels);
  const [modelToDelete, setModelToDelete] = useState<Model | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [filter, setFilter] = useState<CategoryFilter>('Tous');
  const { addChange } = useChanges();

  const handleDeleteRequest = (model: Model) => {
    setModelToDelete(model);
  };

  const handleConfirmDelete = () => {
    if (modelToDelete) {
      addChange(`Suppression du mannequin : ${modelToDelete.name}`);
      setModels(prevModels => prevModels.filter(m => m.id !== modelToDelete.id));
      setModelToDelete(null);
    }
  };

  const handleOpenAddModal = () => {
    setEditingModel(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (model: Model) => {
    setEditingModel(model);
    setIsFormModalOpen(true);
  };

  const handleSaveModel = (modelData: Model) => {
    if (editingModel) {
      // Edit existing model
      addChange(`Modification du mannequin : ${modelData.name}`);
      setModels(models.map(m => m.id === modelData.id ? modelData : m));
    } else {
      // Add new model
      addChange(`Ajout du nouveau mannequin : ${modelData.name}`);
      setModels([modelData, ...models]);
    }
    setIsFormModalOpen(false);
  };


  // Filter models based on the selected category
  const filteredModels = useMemo(() => {
    if (filter === 'Tous') {
      return models;
    }
    return models.filter(model => model.category.includes(filter));
  }, [filter, models]);

  // Filter button component for clean UI
  const FilterButton: React.FC<{
    label: CategoryFilter;
  }> = ({ label }) => {
    const isActive = label === filter;
    return (
      <button
        onClick={() => setFilter(label)}
        className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 text-sm ${
          isActive
            ? 'bg-brand-gold text-brand-dark shadow'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
        aria-pressed={isActive}
      >
        {label}
      </button>
    );
  };

  // Badge component for categories
  const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
    const colors: { [key: string]: string } = {
      'Podium': 'bg-blue-900/70 text-blue-200',
      'Photo': 'bg-purple-900/70 text-purple-200',
      'Publicité': 'bg-green-900/70 text-green-200',
    };
    return (
      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mr-1 mb-1 ${colors[category] || 'bg-gray-600 text-gray-100'}`}>
        {category}
      </span>
    );
  }

  return (
    <>
      <ConfirmationModal
        isOpen={!!modelToDelete}
        onClose={() => setModelToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={modelToDelete?.name || ''}
        itemType="le mannequin"
      />
      <ModelFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveModel}
        model={editingModel}
      />
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-serif text-white">Gérer les Mannequins</h1>
          <button 
            onClick={handleOpenAddModal}
            className="px-5 py-2 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Ajouter un mannequin
          </button>
        </div>

        {/* Filter buttons */}
        <div className="mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-gray-400 font-semibold mr-2">Filtrer par:</span>
            {categories.map(cat => <FilterButton key={cat} label={cat} />)}
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Photo</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Nom</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Catégories</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Genre</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Taille</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Âge</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map(model => (
                <tr key={model.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4">
                    <img src={model.imageUrl} alt={model.name} className="w-12 h-16 object-cover rounded-md" />
                  </td>
                  <td className="p-4 font-medium">{model.name}</td>
                  <td className="p-4">
                    {model.category.map(cat => <CategoryBadge key={cat} category={cat} />)}
                  </td>
                  <td className="p-4 text-gray-300">{model.gender}</td>
                  <td className="p-4 text-gray-300">{model.height}</td>
                  <td className="p-4 text-gray-300">{model.age} ans</td>
                  <td className="p-4">
                    <button onClick={() => handleOpenEditModal(model)} className="text-blue-400 hover:text-blue-300 mr-4">Modifier</button>
                    <button 
                      onClick={() => handleDeleteRequest(model)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageModelsPage;
