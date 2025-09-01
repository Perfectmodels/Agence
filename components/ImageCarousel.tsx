import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ImageCarouselProps {
  images: string[];
  name: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-gray-900/50">
      <div className="aspect-w-16 aspect-h-9 w-full h-64 md:h-80 relative">
        <img
          src={images[currentIndex]}
          alt={`${name} ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Previous image"
        >
          <FiChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Next image"
        >
          <FiChevronRight size={24} />
        </button>
        
        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Stylist Name */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white font-bold text-lg">{name}</h3>
      </div>
    </div>
  );
};

export default ImageCarousel;
