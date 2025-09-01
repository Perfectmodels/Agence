
import React, { useState } from 'react';
import { useChanges } from '../../contexts/ChangesContext';

const PromptGenerator: React.FC = () => {
  const { changes, clearChanges } = useChanges();
  const [copyButtonText, setCopyButtonText] = useState('Copier le Prompt');

  if (changes.length === 0) {
    return null;
  }
  
  const generatePrompt = () => {
    const header = "Bonjour, j'ai effectué les modifications suivantes dans le panneau d'administration. Peux-tu les appliquer au site, s'il te plaît ?\n\n";
    const changesList = changes.map(change => `- ${change}`).join('\n');
    return header + changesList;
  };

  const handleCopy = () => {
    const promptText = generatePrompt();
    navigator.clipboard.writeText(promptText).then(() => {
      setCopyButtonText('Copié !');
      setTimeout(() => setCopyButtonText('Copier le Prompt'), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Erreur');
    });
  };

  const handleClear = () => {
    if(window.confirm("Êtes-vous sûr de vouloir effacer la liste des modifications en attente ?")) {
        clearChanges();
    }
  }

  return (
    <div className="bg-gray-800 border-l-4 border-brand-gold p-6 rounded-md mb-8 shadow-lg" role="region" aria-labelledby="prompt-heading">
      <h2 id="prompt-heading" className="text-2xl font-serif text-white mb-4">Modifications en attente</h2>
      <p className="text-gray-400 text-sm mb-4">
        Voici la liste des changements que vous avez effectués. Copiez ce prompt et envoyez-le pour que les modifications soient appliquées de manière permanente au site.
      </p>
      
      <div className="bg-gray-900/50 p-4 rounded-md max-h-48 overflow-y-auto mb-4 border border-gray-700">
        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
            {changes.map((change, index) => (
                <li key={index}>{change}</li>
            ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleCopy}
          className="px-5 py-2 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors"
        >
          {copyButtonText}
        </button>
        <button
          onClick={handleClear}
          className="px-5 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors"
        >
          Effacer les changements
        </button>
      </div>
    </div>
  );
};

export default PromptGenerator;
