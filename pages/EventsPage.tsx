
import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

const edition1Stylists = [
  "AG Style", "Farel MD", "Ventex Custom", "Belgrace Fashion", 
  "Miguel Fashion Style", "Faran (Parade des Miss du Gabon)", 
  "NFA Design", "Madame Luc / Abiale", "Brand’O", "Tito Style", "Edele A (Groupe mixte)"
];

const galleryImages = [
    "https://i.ibb.co/L51D9zG/DSC-0101.jpg",
    "https://i.ibb.co/wYdYx6k/AJC-4581.jpg",
    "https://i.ibb.co/7FcrvPf/AJC-4643.jpg",
    "https://i.ibb.co/N1kYm5v/AJC-4638.jpg",
    "https://i.ibb.co/mH0k5qM/AJC-4550.jpg",
    "https://i.ibb.co/Jq0R2W2/AJC-4562.jpg",
];

const EventsPage: React.FC = () => {
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
      
      {/* Edition 2 */}
      <SectionWrapper
        title="Deuxième Édition à Venir"
        className="bg-gray-900/50"
      >
        <div className="max-w-4xl mx-auto text-center p-8 rounded-lg border-2 border-brand-gold/50 bg-brand-dark shadow-2xl shadow-brand-gold/10">
          <h3 className="text-4xl font-serif text-brand-gold">L’Art de Se Révéler</h3>
          <p className="my-4 text-xl text-white">
            Une nouvelle édition sous le signe de l’identité, de la culture et de l'affirmation de soi.
          </p>
          <div className="text-2xl font-bold text-white bg-brand-gold/20 inline-block px-6 py-2 rounded-full my-6">
            📅 Samedi 31 janvier 2026
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Après une première édition marquante, PMM est fier d’annoncer le retour de la Perfect Fashion Day. Le lieu, la programmation complète, les stylistes sélectionnés et les artistes invités seront bientôt annoncés. Restez connectés !
          </p>
        </div>
      </SectionWrapper>

      {/* Edition 1 */}
      <SectionWrapper 
        title="Retour sur la Première Édition"
        subtitle="Un succès qui a marqué les esprits et lancé des carrières."
      >
        <div className="max-w-7xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="space-y-8 bg-gray-900 p-8 rounded-lg border border-brand-gold/10">
                <div>
                  <h4 className="text-xl font-bold text-brand-gold mb-2">Date & Lieu</h4>
                  <p>Samedi 25 janvier 2025 à La Gare du Nord, Libreville</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-gold mb-2">Thème</h4>
                  <p>Racines & Modernité</p>
                </div>
                 <div>
                  <h4 className="text-xl font-bold text-brand-gold mb-2">Moments Forts</h4>
                  <p>Slam d'ouverture par Lady Riaba et parade spéciale de la délégation des Miss du Gabon.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-serif text-white border-b-2 border-brand-gold pb-2">Stylistes Participants</h3>
                <ul className="columns-2 gap-x-8 list-disc list-inside text-gray-300">
                  {edition1Stylists.map(stylist => <li key={stylist}>{stylist}</li>)}
                </ul>
              </div>
            </div>

            <div>
                 <h3 className="text-3xl font-serif text-white text-center mb-8">Galerie de l'Événement</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((src, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                            <img src={src} alt={`Perfect Fashion Day Edition 1 - ${index+1}`} className="w-full h-full object-cover aspect-square hover:scale-110 transition-transform duration-300"/>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default EventsPage;
