import React, { useState, useEffect, useRef } from 'react';
import type { Model } from '../../types';

interface ModelFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (model: Model) => void;
  model: Model | null;
}

const ModelFormModal: React.FC<ModelFormModalProps> = ({ isOpen, onClose, onSave, model }) => {
  const [formData, setFormData] = useState<Omit<Model, 'gallery'>>({
    id: '',
    name: '',
    email: '',
    phone: '',
    age: 0,
    height: '',
    gender: 'Femme',
    location: '',
    imageUrl: '',
    bio: '',
    category: [],
  });
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (model) {
      setFormData({ ...model });
      setCategories(new Set(model.category));
    } else {
      // Reset form for new model
      setFormData({
        id: `new-model-${Date.now()}`,
        name: '',
        email: '',
        phone: '',
        age: 18,
        height: '',
        gender: 'Femme',
        location: '',
        imageUrl: 'https://i.ibb.co/vzB1W9B/placeholder.png',
        bio: '',
        category: [],
      });
      setCategories(new Set());
    }
  }, [model, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newCategories = new Set(categories);
    if (checked) {
      newCategories.add(value);
    } else {
      newCategories.delete(value);
    }
    setCategories(newCategories);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImageUrl = event.target?.result as string;
        setFormData(prev => ({ ...prev, imageUrl: newImageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalModel: Model = {
      ...formData,
      category: Array.from(categories) as ('Podium' | 'Photo' | 'Publicité')[],
      age: Number(formData.age),
      // If imageUrl is a new upload (base64), the gallery will be reset with placeholders.
      // If it's an existing URL, we can try to preserve the gallery if we have access to it, but here we don't.
      // So resetting is the safest option for the simulation.
      gallery: [formData.imageUrl, 'https://picsum.photos/800/1200?random=1', 'https://picsum.photos/800/1200?random=2'] 
    };
    onSave(finalModel);
  };
  
  if (!isOpen) return null;

  const inputStyle = "w-full bg-gray-900 border border-gray-600 rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold transition text-sm";
  const labelStyle = "block text-xs font-medium text-gray-400 mb-1";

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-serif text-white mb-6">{model ? 'Modifier le mannequin' : 'Ajouter un mannequin'}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Image Upload */}
                <div className="md:col-span-2">
                    <label className={labelStyle}>Photo principale</label>
                    <div className="mt-2 flex items-center gap-4">
                        <img src={formData.imageUrl} alt="Aperçu" className="w-24 h-32 object-cover rounded-md bg-gray-700" />
                        <div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept="image/png, image/jpeg, image/webp" 
                            />
                            <button 
                                type="button" 
                                onClick={handleImageUploadClick} 
                                className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors text-sm"
                            >
                                Changer la photo
                            </button>
                            <p className="text-xs text-gray-500 mt-2">Téléversez un fichier depuis votre ordinateur.</p>
                        </div>
                    </div>
                </div>

                <div><label htmlFor="name" className={labelStyle}>Nom</label><input type="text" name="name" value={formData.name} onChange={handleChange} className={inputStyle} required /></div>
                <div><label htmlFor="age" className={labelStyle}>Âge</label><input type="number" name="age" value={formData.age} onChange={handleChange} className={inputStyle} required /></div>
                <div><label htmlFor="height" className={labelStyle}>Taille (ex: 1m85)</label><input type="text" name="height" value={formData.height} onChange={handleChange} className={inputStyle} required /></div>
                <div><label htmlFor="gender" className={labelStyle}>Genre</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className={inputStyle}>
                        <option value="Femme">Femme</option>
                        <option value="Homme">Homme</option>
                    </select>
                </div>
                <div><label htmlFor="location" className={labelStyle}>Lieu</label><input type="text" name="location" value={formData.location} onChange={handleChange} className={inputStyle} /></div>
                <div><label htmlFor="email" className={labelStyle}>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className={inputStyle} /></div>
                <div><label htmlFor="phone" className={labelStyle}>Téléphone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputStyle} /></div>
                
                <div className="md:col-span-2">
                    <label className={labelStyle}>Catégories</label>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                       {['Podium', 'Photo', 'Publicité'].map(cat => (
                         <label key={cat} className="flex items-center text-sm text-gray-300">
                           <input type="checkbox" value={cat} checked={categories.has(cat)} onChange={handleCategoryChange} className="h-4 w-4 text-brand-gold bg-gray-700 border-gray-600 focus:ring-brand-gold mr-2" />
                           {cat}
                         </label>
                       ))}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="bio" className={labelStyle}>Biographie</label>
                    <textarea name="bio" rows={4} value={formData.bio} onChange={handleChange} className={inputStyle}></textarea>
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

export default ModelFormModal;
