
import React, { useState } from 'react';
import { articles as initialArticles } from '../../data/articlesData';
import type { Article } from '../../types';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import ArticleFormModal from '../../components/admin/ArticleFormModal';
import { useChanges } from '../../contexts/ChangesContext';

const ManageArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const { addChange } = useChanges();

  const handleDeleteRequest = (article: Article) => {
    setArticleToDelete(article);
  };

  const handleConfirmDelete = () => {
    if (articleToDelete) {
      addChange(`Suppression de l'article : "${articleToDelete.title}"`);
      setArticles(prev => prev.filter(a => a.id !== articleToDelete.id));
      setArticleToDelete(null);
    }
  };

  const handleOpenAddModal = () => {
    setEditingArticle(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (article: Article) => {
    setEditingArticle(article);
    setIsFormModalOpen(true);
  };

  const handleSaveArticle = (articleData: Article) => {
    if (editingArticle) {
      addChange(`Modification de l'article : "${articleData.title}"`);
      setArticles(articles.map(a => a.id === articleData.id ? articleData : a));
    } else {
      addChange(`Ajout du nouvel article : "${articleData.title}"`);
      setArticles([articleData, ...articles]);
    }
    setIsFormModalOpen(false);
  };
  
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <>
      <ConfirmationModal
        isOpen={!!articleToDelete}
        onClose={() => setArticleToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={articleToDelete?.title || ''}
        itemType="l'article"
      />
      <ArticleFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveArticle}
        article={editingArticle}
      />
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-serif text-white">Gérer les Articles (Focus)</h1>
          <button 
            onClick={handleOpenAddModal}
            className="px-5 py-2 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Ajouter un article
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Image</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Titre</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Catégorie</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Date</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4">
                    <img src={article.imageUrl} alt={article.title} className="w-24 h-16 object-cover rounded-md" />
                  </td>
                  <td className="p-4 font-medium">{article.title}</td>
                  <td className="p-4 text-gray-300">{article.category}</td>
                  <td className="p-4 text-gray-300">{formatDate(article.publishedDate)}</td>
                  <td className="p-4">
                    <button onClick={() => handleOpenEditModal(article)} className="text-blue-400 hover:text-blue-300 mr-4">Modifier</button>
                    <button 
                      onClick={() => handleDeleteRequest(article)}
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

export default ManageArticlesPage;
