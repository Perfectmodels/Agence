
import React, { useState } from 'react';
import { events as initialEvents } from '../../data/eventsData';
import type { Event } from '../../types';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import EventFormModal from '../../components/admin/EventFormModal';
import { useChanges } from '../../contexts/ChangesContext';

const ManageEventsPage: React.FC = () => {
  const [events, setEvents] = useState(initialEvents);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { addChange } = useChanges();

  const handleDeleteRequest = (event: Event) => {
    setEventToDelete(event);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      addChange(`Suppression de l'événement : "${eventToDelete.title}"`);
      setEvents(prev => prev.filter(e => e.id !== eventToDelete.id));
      setEventToDelete(null);
    }
  };

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (event: Event) => {
    setEditingEvent(event);
    setIsFormModalOpen(true);
  };

  const handleSaveEvent = (eventData: Event) => {
    if (editingEvent) {
       addChange(`Modification de l'événement : "${eventData.title}"`);
      setEvents(events.map(e => e.id === eventData.id ? eventData : e));
    } else {
      addChange(`Ajout du nouvel événement : "${eventData.title}"`);
      setEvents([eventData, ...events]);
    }
    setIsFormModalOpen(false);
  };
  
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });

  return (
    <>
      <ConfirmationModal
        isOpen={!!eventToDelete}
        onClose={() => setEventToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={eventToDelete?.title || ''}
        itemType="l'événement"
      />
      <EventFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveEvent}
        event={editingEvent}
      />
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-serif text-white">Gérer les Événements</h1>
          <button 
            onClick={handleOpenAddModal}
            className="px-5 py-2 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Ajouter un événement
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Titre</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Thème</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Date</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Statut</th>
                <th className="p-4 uppercase text-sm font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4 font-medium">{event.title}</td>
                  <td className="p-4 text-gray-300">{event.theme}</td>
                  <td className="p-4 text-gray-300">{formatDate(event.date)}</td>
                  <td className="p-4">
                     <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      event.status === 'À venir' ? 'bg-green-900/70 text-green-200' : 'bg-gray-600 text-gray-100'
                    }`}>
                        {event.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => handleOpenEditModal(event)} className="text-blue-400 hover:text-blue-300 mr-4">Modifier</button>
                    <button 
                      onClick={() => handleDeleteRequest(event)}
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

export default ManageEventsPage;
