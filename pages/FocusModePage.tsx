import React from 'react';
// FIX: Use namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { articles } from '../data/articlesData';
import SectionWrapper from '../components/SectionWrapper';
import BackgroundSlideshow from '../components/BackgroundSlideshow';

const ArticleCard: React.FC<{ article: typeof articles[0] }> = ({ article }) => {
    const formattedDate = new Date(article.publishedDate).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        // FIX: Use namespace import for react-router-dom to resolve module export errors.
        <ReactRouterDOM.Link to={`/focus-mode-241/${article.id}`} className="group bg-gray-900/50 rounded-lg overflow-hidden shadow-lg hover:shadow-brand-gold/20 transition-all duration-300 flex flex-col">
            <div className="overflow-hidden h-64">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-brand-gold mb-2 font-semibold uppercase tracking-wider">{article.category}</p>
                <h3 className="text-2xl font-serif text-white font-bold mb-3 flex-grow group-hover:text-brand-gold transition-colors">{article.title}</h3>
                <p className="text-xs text-gray-400">Par {article.author} &bull; {formattedDate}</p>
            </div>
        </ReactRouterDOM.Link>
    );
};

const FocusModePage: React.FC = () => {
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <>
      <BackgroundSlideshow />
      <SectionWrapper
        title="Focus Mode 241"
        subtitle="Le magazine de Perfect Models Management. Plongez dans les coulisses de la mode, découvrez nos talents et explorez les tendances qui façonnent l'industrie."
        className="relative z-10"
      >
        {/* Featured Article */}
        <div className="mb-16">
            {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
            <ReactRouterDOM.Link to={`/focus-mode-241/${featuredArticle.id}`} className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                 <div className="overflow-hidden rounded-lg">
                    <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 </div>
                 <div>
                    <p className="text-brand-gold font-bold uppercase tracking-widest mb-2">À la une</p>
                    <h2 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4 group-hover:text-brand-gold transition-colors">{featuredArticle.title}</h2>
                    <p className="text-gray-300 text-lg mb-4">{featuredArticle.body.substring(0, 150)}...</p>
                    <span className="text-white font-bold border-b-2 border-brand-gold pb-1 group-hover:text-brand-gold transition-colors">
                        Lire la suite &rarr;
                    </span>
                 </div>
            </ReactRouterDOM.Link>
        </div>
        
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
      </SectionWrapper>
    </>
  );
};

export default FocusModePage;