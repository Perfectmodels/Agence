
import React, { useState } from 'react';
import { partners as initialPartners } from '../../data/partnersData';
import type { Partner } from '../../types';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import PartnerFormModal from '../../components/admin/PartnerFormModal';
import { useChanges } from '../../contexts/ChangesContext';


const ManageStylistsPage: React.FC = () => {
  const [partners, setPartners] = useState(initialPartners);
  const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const { addChange } = useChanges();

  const handleDeleteRequest = (partner: Partner) => {
    setPartnerToDelete(partner);
  };

  const handleConfirmDelete = () => {
    if (partnerToDelete) {
      addChange(`Suppression du partenaire : ${partnerToDelete.name}`);
      setPartners(prevPartners => prevPartners.filter(p => p.id !== partnerToDelete.id));
      setPartnerToDelete(null);
    }
  };

  const handleOpenAddModal = () => {
    setEditingPartner(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (partner: Partner) => {
    setEditingPartner(partner);
    setIsFormModalOpen(true);
  };
  
  const handleSavePartner = (partnerData: Partner) => {
    if (editingPartner) {
      addChange(`Modification du partenaire : ${partnerData.name}`);
      setPartners(partners.map(p => p.id === partnerData.id ? partnerData : p));
    } else {
      addChange(`Ajout du nouveau partenaire : ${partnerData.name}`);
      setPartners([partnerData, ...partners]);
    }
    setIsFormModalOpen(false);
  };


  return (
    <>
      <ConfirmationModal
        isOpen={!!partnerToDelete}
        onClose={() => setPartnerToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={partnerToDelete?.name || ''}
        itemType="le partenaire"
      />
       <PartnerFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSavePartner}
        partner={editingPartner}
      />
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-serif text-white">Gérer les Stylistes & Partenaires</h1>
          <button 
            onClick={handleOpenAddModal}
            className="px-5 py-2 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">
            Ajouter un partenaire
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Logo</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Nom</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Type</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map(partner => (
                <tr key={partner.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4">
                    <img src={partner.logoUrl} alt={`Logo de ${partner.name}`} className="w-12 h-12 object-contain rounded-md bg-white p-1" />
                  </td>
                  <td className="p-4 font-medium">{partner.name}</td>
                  <td className="p-4 text-gray-300">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      partner.type === 'Styliste' ? 'bg-blue-900 text-blue-200' : 'bg-purple-900 text-purple-200'
                    }`}>
                      {partner.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => handleOpenEditModal(partner)} className="text-blue-400 hover:text-blue-300 mr-4">Modifier</button>
                    <button 
                      onClick={() => handleDeleteRequest(partner)}
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

export default ManageStylistsPage;
