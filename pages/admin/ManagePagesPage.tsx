
import React, { useState } from 'react';

const ManagePagesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <div className="text-gray-300">Section pour modifier la page "À Propos". Vous pourrez ici changer les textes sur l'histoire, les valeurs, et les distinctions des mannequins.</div>;
      case 'services':
        return <div className="text-gray-300">Section pour modifier la page "Services". Vous pourrez ajouter, modifier ou supprimer des catégories de services et leurs descriptions.</div>;
      case 'events':
        return <div className="text-gray-300">Section pour modifier la page "Événements". Vous pourrez mettre à jour les informations sur les éditions passées et futures du "Perfect Fashion Day".</div>;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tabId: string; label: string }> = ({ tabId, label }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
        activeTab === tabId ? 'bg-gray-700 text-brand-gold' : 'bg-gray-800 text-gray-300 hover:bg-gray-700/50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <h1 className="text-4xl font-serif text-white mb-6">Modifier le Contenu des Pages</h1>
      
      <div className="flex border-b border-gray-700">
        <TabButton tabId="about" label="À Propos" />
        <TabButton tabId="services" label="Services" />
        <TabButton tabId="events" label="Événements" />
      </div>

      <div className="bg-gray-800 p-8 rounded-b-lg shadow-inner">
        {renderContent()}
         <div className="mt-8 text-right">
             <button className="px-6 py-2 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">
                Sauvegarder les changements
            </button>
         </div>
      </div>
    </div>
  );
};

export default ManagePagesPage;
