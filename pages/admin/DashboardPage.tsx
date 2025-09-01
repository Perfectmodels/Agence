
import React from 'react';
// FIX: Use namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { models } from '../../data/modelsData';
import { partners } from '../../data/partnersData';
import { articles } from '../../data/articlesData';
import { events } from '../../data/eventsData';

const DashboardPage: React.FC = () => {
  const totalModels = models.length;
  const totalPartners = partners.length;
  const totalArticles = articles.length;
  const upcomingEvents = events.filter(e => e.status === 'À venir').length;


  return (
    <div>
      <h1 className="text-4xl font-serif text-white mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-brand-gold mb-2">Total Mannequins</h2>
          <p className="text-4xl font-bold">{totalModels}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-brand-gold mb-2">Stylistes & Partenaires</h2>
          <p className="text-4xl font-bold">{totalPartners}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-brand-gold mb-2">Articles Publiés</h2>
          <p className="text-4xl font-bold">{totalArticles}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-brand-gold mb-2">Événements à venir</h2>
          <p className="text-4xl font-bold">{upcomingEvents}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-serif text-white mb-4">Accès Rapide</h2>
        <div className="flex flex-wrap gap-4">
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Link to="/admin/models" className="px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">
            Gérer les Mannequins
          </ReactRouterDOM.Link>
           {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
           <ReactRouterDOM.Link to="/admin/articles" className="px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">
            Gérer les Articles
          </ReactRouterDOM.Link>
           {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
           <ReactRouterDOM.Link to="/admin/events" className="px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">
            Gérer les Événements
          </ReactRouterDOM.Link>
           {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
           <ReactRouterDOM.Link to="/admin/stylists" className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors">
            Gérer les Stylistes
          </ReactRouterDOM.Link>
           {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
           <ReactRouterDOM.Link to="/admin/settings" className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors">
            Paramètres du Site
          </ReactRouterDOM.Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;