
import React, { useState, useEffect } from 'react';
import type { Partner } from '../../types';

interface PartnerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (partner: Partner) => void;
  partner: Partner | null;
}

const PartnerFormModal: React.FC<PartnerFormModalProps> = ({ isOpen, onClose, onSave, partner }) => {
  const [formData, setFormData] = useState<Partner>({
    id: '',
    name: '',
    type: 'Styliste',
    logoUrl: '',
  });

  useEffect(() => {
    if (partner) {
      setFormData(partner);
    } else {
      // Reset form for new partner
      setFormData({
        id: `partner-${Date.now()}`,
        name: '',
        type: 'Styliste',
        logoUrl: 'https://via.placeholder.com/150/FFFFFF/111111?text=Logo',
      });
    }
  }, [partner, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-lg w-full">
        <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-serif text-white mb-6">{partner ? 'Modifier le partenaire' : 'Ajouter un partenaire'}</h3>
            
            <div className="space-y-4">
                <div><label htmlFor="name" className={labelStyle}>Nom</label><input type="text" name="name" value={formData.name} onChange={handleChange} className={inputStyle} required /></div>
                <div><label htmlFor="logoUrl" className={labelStyle}>URL du logo</label><input type="text" name="logoUrl" value={formData.logoUrl} onChange={handleChange} className={inputStyle} required /></div>
                <div><label htmlFor="type" className={labelStyle}>Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className={inputStyle}>
                        <option value="Styliste">Styliste</option>
                        <option value="Partenaire">Partenaire</option>
                    </select>
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

export default PartnerFormModal;
