
import React, { useState, useMemo, useRef } from 'react';
import { models } from '../../data/modelsData';
import { teamMembers } from '../../data/siteData';
import { partners } from '../../data/partnersData';
import { articles } from '../../data/articlesData';
import { events } from '../../data/eventsData';
import MediaCard from '../../components/admin/MediaCard';
import { useChanges } from '../../contexts/ChangesContext';


interface ManagedImage {
  id: string;
  src: string;
  alt: string;
  context: string;
}

const ManageMediaPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const { addChange } = useChanges();

  const initialMedia = useMemo(() => {
    let allMedia: ManagedImage[] = [];

    // Static Images from various pages
    allMedia.push({ id: 'homepage-hero', src: 'https://i.ibb.co/b5LgVZg/DSC-0090.jpg', alt: 'Fashion background', context: `Page d'accueil: Hero` });
    allMedia.push({ id: 'homepage-founder', src: 'https://i.ibb.co/mRKn421/ceo.jpg', alt: 'Louis Parfait Asseko, Fondateur', context: `Page d'accueil: Fondateur` });
    allMedia.push({ id: 'contact-map', src: 'https://i.ibb.co/hZpY5Pz/map-placeholder.png', alt: 'Carte de localisation', context: `Page Contact: Carte` });

    // From Models
    models.forEach(model => {
      allMedia.push({ id: `${model.id}-main`, src: model.imageUrl, alt: model.name, context: `Mannequin (principal): ${model.name}` });
      model.gallery.forEach((img, index) => {
         if (!img.includes('picsum.photos')) { // Exclude placeholder images
            allMedia.push({ id: `${model.id}-gallery-${index}`, src: img, alt: `${model.name} - gallery ${index+1}`, context: `Galerie Mannequin: ${model.name}` });
         }
      });
    });

    // From Team
    teamMembers.forEach(member => {
      if (!member.imageUrl.includes('picsum.photos')) {
        allMedia.push({ id: `team-${member.name}`, src: member.imageUrl, alt: member.name, context: `Équipe: ${member.role}` });
      }
    });
    
    // From Partners
    partners.forEach(partner => {
        allMedia.push({ id: `partner-${partner.id}`, src: partner.logoUrl, alt: partner.name, context: `Logo Partenaire: ${partner.name}` });
    });

    // From Articles
    articles.forEach(article => {
      if (!article.imageUrl.includes('picsum.photos')) {
        allMedia.push({ id: `article-${article.id}`, src: article.imageUrl, alt: article.title, context: `Article: ${article.title.substring(0,30)}...` });
      }
    });

    // From Events
    events.forEach(event => {
        event.gallery?.forEach((img, index) => {
            allMedia.push({ id: `event-${event.id}-gallery-${index}`, src: img, alt: `${event.title} - gallery ${index+1}`, context: `Galerie Événement: ${event.title}` });
        });
    });
    
    // Remove duplicates based on src
    const uniqueMedia = Array.from(new Map(allMedia.map(item => [item.src, item])).values());

    return uniqueMedia;
  }, []);
  
  const [mediaItems, setMediaItems] = useState<ManagedImage[]>(initialMedia);
  
  const handleReplaceClick = (id: string) => {
    setActiveImageId(id);
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && activeImageId) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const newSrc = event.target?.result as string;
        const itemToUpdate = mediaItems.find(item => item.id === activeImageId);

        if(itemToUpdate) {
            addChange(`Remplacement de l'image pour "${itemToUpdate.context}" par le nouveau fichier "${file.name}".`);
        }

        setMediaItems(prevItems => prevItems.map(item => 
          item.id === activeImageId ? { ...item, src: newSrc } : item
        ));
        setActiveImageId(null);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  return (
    <div>
      <h1 className="text-4xl font-serif text-white mb-6">Gérer la Médiathèque</h1>
      <p className="text-gray-400 mb-8">Cliquez sur "Remplacer" pour choisir une nouvelle image. Les changements sont visibles ici mais doivent être décrits dans un prompt pour être appliqués au site.</p>
      
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp, image/gif"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {mediaItems.map((item) => (
          <MediaCard 
            key={item.id}
            src={item.src}
            alt={item.alt}
            context={item.context}
            onReplace={() => handleReplaceClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageMediaPage;
