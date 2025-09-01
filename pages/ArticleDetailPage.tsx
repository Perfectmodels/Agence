
import React from 'react';
// FIX: Use namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { articles } from '../data/articlesData';
import SectionWrapper from '../components/SectionWrapper';

const ArticleDetailPage: React.FC = () => {
  // FIX: Use namespace import for react-router-dom to resolve module export errors.
  const { articleId } = ReactRouterDOM.useParams<{ articleId: string }>();
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return (
      <SectionWrapper title="Article non trouvé">
        <div className="text-center">
          <p className="text-gray-300 text-lg mb-8">Désolé, l'article que vous cherchez n'existe pas ou a été déplacé.</p>
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Link to="/focus-mode-241" className="px-8 py-3 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-yellow-300 transition-colors">
            Retourner au magazine
          </ReactRouterDOM.Link>
        </div>
      </SectionWrapper>
    );
  }
  
  const formattedDate = new Date(article.publishedDate).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div>
        {/* Header Image */}
        <div className="h-[50vh] max-h-[500px] w-full overflow-hidden relative flex items-center justify-center">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto px-6 -mt-32 relative z-10 pb-16">
            <div className="max-w-4xl mx-auto">
                <div className="bg-brand-dark p-8 md:p-12 rounded-lg shadow-2xl border border-brand-gold/10">
                    <p className="text-brand-gold font-semibold uppercase tracking-widest mb-4">{article.category}</p>
                    <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4">{article.title}</h1>
                    <p className="text-gray-400">
                        Par <span className="font-semibold text-white">{article.author}</span> le {formattedDate}
                    </p>
                    
                    <div className="w-24 h-1 bg-brand-gold my-8 rounded"></div>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-6">
                        {article.body.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                         {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
                         <ReactRouterDOM.Link to="/focus-mode-241" className="text-brand-gold font-bold hover:underline">
                            &larr; Retour à tous les articles
                        </ReactRouterDOM.Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ArticleDetailPage;