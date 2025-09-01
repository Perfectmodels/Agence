import React from 'react';

interface MediaCardProps {
  src: string;
  alt: string;
  context: string;
  onReplace: () => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ src, alt, context, onReplace }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col">
      <div className="aspect-square w-full bg-gray-900 rounded-t-lg overflow-hidden">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex-grow flex flex-col justify-between">
        <p className="text-xs text-gray-400 mb-2 leading-tight flex-grow">{context}</p>
        <button
          onClick={onReplace}
          className="w-full text-center px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors text-sm"
        >
          Remplacer
        </button>
      </div>
    </div>
  );
};

export default MediaCard;
