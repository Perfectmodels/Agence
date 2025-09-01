
import React, { useState } from 'react';
import { siteConfig as initialConfig } from '../../data/configData';
import type { SiteConfig } from '../../types';
import { useChanges } from '../../contexts/ChangesContext';

const SettingsPage: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [status, setStatus] = useState('');
  const { addChange } = useChanges();

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      contact: { ...prev.contact, [name]: value },
    }));
  };
  
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Compare and log changes
    if(config.contact.email !== initialConfig.contact.email) {
        addChange(`Mise à jour de l'email de contact à : "${config.contact.email}"`);
    }
    if(config.contact.phone !== initialConfig.contact.phone) {
        addChange(`Mise à jour du téléphone de contact à : "${config.contact.phone}"`);
    }
    if(config.contact.address !== initialConfig.contact.address) {
        addChange(`Mise à jour de l'adresse de contact à : "${config.contact.address}"`);
    }
    if(config.socials.facebook !== initialConfig.socials.facebook) {
        addChange(`Mise à jour de l'URL Facebook à : "${config.socials.facebook}"`);
    }
    if(config.socials.instagram !== initialConfig.socials.instagram) {
        addChange(`Mise à jour de l'URL Instagram à : "${config.socials.instagram}"`);
    }
    if(config.socials.youtube !== initialConfig.socials.youtube) {
        addChange(`Mise à jour de l'URL YouTube à : "${config.socials.youtube}"`);
    }
    if(config.socials.github !== initialConfig.socials.github) {
        addChange(`Mise à jour de l'URL GitHub à : "${config.socials.github}"`);
    }

    setStatus('Paramètres sauvegardés avec succès ! Les modifications ont été ajoutées au prompt en attente.');
    setTimeout(() => setStatus(''), 5000);
  };

  const inputStyle = "w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-brand-gold focus:border-brand-gold transition text-white";
  const labelStyle = "block text-sm font-medium text-gray-300 mb-2";
  const fieldsetStyle = "bg-gray-800 p-6 rounded-lg shadow-lg";

  return (
    <div>
      <h1 className="text-4xl font-serif text-white mb-6">Paramètres du Site</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <fieldset className={fieldsetStyle}>
          <legend className="text-2xl font-serif text-brand-gold mb-4">Informations de Contact</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className={labelStyle}>Email de contact</label>
              <input type="email" name="email" id="email" value={config.contact.email} onChange={handleContactChange} className={inputStyle} />
            </div>
            <div>
              <label htmlFor="phone" className={labelStyle}>Téléphone</label>
              <input type="tel" name="phone" id="phone" value={config.contact.phone} onChange={handleContactChange} className={inputStyle} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className={labelStyle}>Adresse</label>
              <input type="text" name="address" id="address" value={config.contact.address} onChange={handleContactChange} className={inputStyle} />
            </div>
          </div>
        </fieldset>

        <fieldset className={fieldsetStyle}>
          <legend className="text-2xl font-serif text-brand-gold mb-4">Réseaux Sociaux</legend>
           <div className="space-y-4">
            <div>
              <label htmlFor="facebook" className={labelStyle}>URL Facebook</label>
              <input type="url" name="facebook" id="facebook" value={config.socials.facebook} onChange={handleSocialChange} className={inputStyle} />
            </div>
             <div>
              <label htmlFor="instagram" className={labelStyle}>URL Instagram</label>
              <input type="url" name="instagram" id="instagram" value={config.socials.instagram} onChange={handleSocialChange} className={inputStyle} />
            </div>
             <div>
              <label htmlFor="youtube" className={labelStyle}>URL YouTube</label>
              <input type="url" name="youtube" id="youtube" value={config.socials.youtube} onChange={handleSocialChange} className={inputStyle} />
            </div>
             <div>
              <label htmlFor="github" className={labelStyle}>URL GitHub</label>
              <input type="url" name="github" id="github" value={config.socials.github} onChange={handleSocialChange} className={inputStyle} />
            </div>
           </div>
        </fieldset>
        
        <div className="flex justify-end items-center gap-4">
          {status && <p className="text-green-400 text-sm">{status}</p>}
          <button type="submit" className="px-8 py-3 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">
            Sauvegarder les Paramètres
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
