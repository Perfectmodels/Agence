
import React, { useState, useEffect } from 'react';
import type { Event } from '../../types';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  event: Event | null;
}

const EventFormModal: React.FC<EventFormModalProps> = ({ isOpen, onClose, onSave, event }) => {
  const [formData, setFormData] = useState<Event>({
    id: '',
    title: '',
    theme: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    description: '',
    status: 'À venir',
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else {
      // Reset form for new event
      setFormData({
        id: `event-${Date.now()}`,
        title: '',
        theme: '',
        date: new Date().toISOString().split('T')[0],
        location: 'Libreville',
        description: '',
        status: 'À venir',
      });
    }
  }, [event, isOpen]);

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

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-serif text-white mb-6">{event ? 'Modifier l\'événement' : 'Ajouter un événement'}</h3>
            
            <div className="space-y-4">
                <div><label htmlFor="title" className={labelStyle}>Titre</label><input type="text" name="title" value={formData.title} onChange={handleChange} className={inputStyle} required /></div>
                <div><label htmlFor="theme" className={labelStyle}>Thème</label><input type="text" name="theme" value={formData.theme} onChange={handleChange} className={inputStyle} required /></div>
                <div><label htmlFor="date" className={labelStyle}>Date</label><input type="date" name="date" value={formData.date} onChange={handleChange} className={inputStyle} required /></div>
                <div><label htmlFor="location" className={labelStyle}>Lieu</label><input type="text" name="location" value={formData.location} onChange={handleChange} className={inputStyle} required /></div>
                <div><label htmlFor="status" className={labelStyle}>Statut</label>
                    <select name="status" value={formData.status} onChange={handleChange} className={inputStyle}>
                        <option value="À venir">À venir</option>
                        <option value="Passé">Passé</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className={labelStyle}>Description</label>
                    <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className={inputStyle}></textarea>
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

export default EventFormModal;
