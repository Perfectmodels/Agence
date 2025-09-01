
import React, { useState, useEffect } from 'react';
import type { Article } from '../../types';

interface ArticleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Article) => void;
  article: Article | null;
}

const ArticleFormModal: React.FC<ArticleFormModalProps> = ({ isOpen, onClose, onSave, article }) => {
  const [formData, setFormData] = useState<Article>({
    id: '',
    title: '',
    author: '',
    publishedDate: new Date().toISOString().split('T')[0],
    imageUrl: '',
    category: 'Conseils',
    body: '',
  });

  useEffect(() => {
    if (article) {
      setFormData(article);
    } else {
      // Reset form for new article
      setFormData({
        id: `article-${Date.now()}`,
        title: '',
        author: 'L\'équipe PMM',
        publishedDate: new Date().toISOString().split('T')[0],
        imageUrl: 'https://picsum.photos/1200/800?random=new',
        category: 'Conseils',
        body: '',
      });
    }
  }, [article, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  if (!isOpen) return null;

  const inputStyle = "w-full bg-gray-900 border border-gray-600 rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold transition text-sm";
  const labelStyle = "block text-xs font-medium text-gray-400 mb-1";
  
  const categories: Article['category'][] = ['Conseils', 'Événement', 'Interview', 'Mannequin à la une', 'Mode Gabonaise'];

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-serif text-white mb-6">{article ? 'Modifier l\'article' : 'Ajouter un article'}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2"><label htmlFor="title" className={labelStyle}>Titre</label><input type="text" name="title" value={formData.title} onChange={handleChange} className={inputStyle} required /></div>
                <div><label htmlFor="author" className={labelStyle}>Auteur</label><input type="text" name="author" value={formData.author} onChange={handleChange} className={inputStyle} required /></div>
                <div><label htmlFor="publishedDate" className={labelStyle}>Date de publication</label><input type="date" name="publishedDate" value={formData.publishedDate} onChange={handleChange} className={inputStyle} required /></div>
                <div className="md:col-span-2"><label htmlFor="imageUrl" className={labelStyle}>URL de l'image</label><input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className={inputStyle} required /></div>
                <div className="md:col-span-2"><label htmlFor="category" className={labelStyle}>Catégorie</label>
                    <select name="category" value={formData.category} onChange={handleChange} className={inputStyle}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="body" className={labelStyle}>Contenu (utiliser deux sauts de ligne pour un nouveau paragraphe)</label>
                    <textarea name="body" rows={10} value={formData.body} onChange={handleChange} className={inputStyle}></textarea>
                </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors">Annuler</button>
            <button type="submit" className="px-6 py-2 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">Sauvegarder</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleFormModal;
