
import React, { useState } from 'react';
import { models as initialModels } from '../../data/modelsData';

const ManageModelsPage: React.FC = () => {
  const [models, setModels] = useState(initialModels);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-serif text-white">Gérer les Mannequins</h1>
        <button className="px-5 py-2 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">
          Ajouter un mannequin
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 uppercase text-sm font-semibold tracking-wider">Photo</th>
              <th className="p-4 uppercase text-sm font-semibold tracking-wider">Nom</th>
              <th className="p-4 uppercase text-sm font-semibold tracking-wider">Genre</th>
              <th className="p-4 uppercase text-sm font-semibold tracking-wider">Taille</th>
              <th className="p-4 uppercase text-sm font-semibold tracking-wider">Âge</th>
              <th className="p-4 uppercase text-sm font-semibold tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.map(model => (
              <tr key={model.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="p-4">
                  <img src={model.imageUrl} alt={model.name} className="w-12 h-16 object-cover rounded-md" />
                </td>
                <td className="p-4 font-medium">{model.name}</td>
                <td className="p-4 text-gray-300">{model.gender}</td>
                <td className="p-4 text-gray-300">{model.height}</td>
                <td className="p-4 text-gray-300">{model.age} ans</td>
                <td className="p-4">
                  <button className="text-blue-400 hover:text-blue-300 mr-4">Modifier</button>
                  <button className="text-red-500 hover:text-red-400">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageModelsPage;
