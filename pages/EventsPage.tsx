
import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { events } from '../data/eventsData';

const EventsPage: React.FC = () => {
  const upcomingEvent = events.find(e => e.status === 'À venir');
  const pastEvent = events.find(e => e.id === 'pfd-edition-1');

  return (
    <>
      <SectionWrapper
        title="Perfect Fashion Day"
        subtitle="Notre événement phare, une célébration de la mode et des talents gabonais."
      >
        <div className="max-w-4xl mx-auto text-center text-gray-300 leading-relaxed text-lg">
          <p>
            Le Perfect Fashion Day est un défilé de mode initié par l’agence pour promouvoir les stylistes locaux et les mannequins formés par PMM. C'est un espace d’expression, un carrefour de talents, une célébration de la beauté plurielle.
          </p>
        </div>
      </SectionWrapper>
      
      {upcomingEvent && (
        <SectionWrapper
          title="Prochaine Édition"
          className="bg-gray-900/50"
        >
          <div className="max-w-4xl mx-auto text-center p-8 rounded-lg border-2 border-brand-gold/50 bg-brand-dark shadow-2xl shadow-brand-gold/10">
            <h3 className="text-4xl font-serif text-brand-gold">{upcomingEvent.theme}</h3>
            <p className="my-4 text-xl text-white">
              {upcomingEvent.title}
            </p>
            <div className="text-2xl font-bold text-white bg-brand-gold/20 inline-block px-6 py-2 rounded-full my-6">
              📅 {new Date(upcomingEvent.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {upcomingEvent.description}
            </p>
          </div>
        </SectionWrapper>
      )}

      {pastEvent && (
        <SectionWrapper 
          title="Retour sur la Première Édition"
          subtitle="Un succès qui a marqué les esprits et lancé des carrières."
        >
          <div className="max-w-7xl mx-auto space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-8 bg-gray-900 p-8 rounded-lg border border-brand-gold/10">
                  <div>
                    <h4 className="text-xl font-bold text-brand-gold mb-2">Date & Lieu</h4>
                    <p>{new Date(pastEvent.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })} à {pastEvent.location}</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-gold mb-2">Thème</h4>
                    <p>{pastEvent.theme}</p>
                  </div>
                   <div>
                    <h4 className="text-xl font-bold text-brand-gold mb-2">Moments Forts</h4>
                    <p>{pastEvent.description}</p>
                  </div>
                </div>

                {pastEvent.stylists && (
                    <div className="space-y-4">
                        <h3 className="text-3xl font-serif text-white border-b-2 border-brand-gold pb-2">Stylistes Participants</h3>
                        <ul className="columns-2 gap-x-8 list-disc list-inside text-gray-300">
                        {pastEvent.stylists.map(stylist => <li key={stylist}>{stylist}</li>)}
                        </ul>
                    </div>
                )}
              </div>

              {pastEvent.gallery && (
                <div>
                     <h3 className="text-3xl font-serif text-white text-center mb-8">Galerie de l'Événement</h3>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {pastEvent.gallery.map((src, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                <img src={src} alt={`Perfect Fashion Day Edition 1 - ${index+1}`} className="w-full h-full object-cover aspect-square hover:scale-110 transition-transform duration-300"/>
                            </div>
                        ))}
                     </div>
                </div>
              )}
          </div>
        </SectionWrapper>
      )}
    </>
  );
};

export default EventsPage;
