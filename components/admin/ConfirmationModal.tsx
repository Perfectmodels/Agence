import React from 'react';

// Confirmation Modal Component
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType: string;
}> = ({ isOpen, onClose, onConfirm, itemName, itemType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
        <h3 className="text-2xl font-serif text-white mb-4">Confirmer la suppression</h3>
        <p className="text-gray-300 mb-6">
          Êtes-vous sûr de vouloir supprimer {itemType}{' '}
          <span className="font-bold text-brand-gold">{itemName}</span> ? Cette action est irréversible.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-colors"
          >
            Confirmer la suppression
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;