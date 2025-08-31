
import React from 'react';
import { Link } from 'react-router-dom';
import { models } from '../../data/modelsData';

const DashboardPage: React.FC = () => {
  const totalModels = models.length;
  const maleModels = models.filter(m => m.gender === 'Homme').length;
  const femaleModels = models.filter(m => m.gender === 'Femme').length;

  return (
    <div>
      <h1 className="text-4xl font-serif text-white mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-brand-gold mb-2">Total Mannequins</h2>
          <p className="text-4xl font-bold">{totalModels}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-brand-gold mb-2">Femmes</h2>
          <p className="text-4xl font-bold">{femaleModels}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-brand-gold mb-2">Hommes</h2>
          <p className="text-4xl font-bold">{maleModels}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-serif text-white mb-4">Accès Rapide</h2>
        <div className="flex space-x-4">
          <Link to="/admin/models" className="px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">
            Gérer les Mannequins
          </Link>
          <Link to="/admin/pages" className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors">
            Modifier les Pages
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
