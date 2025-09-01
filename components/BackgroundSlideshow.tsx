import React, { useState, useEffect } from 'react';
import './BackgroundSlideshow.css';

interface Slide {
  image: string;
  text: string;
}

const BackgroundSlideshow: React.FC = () => {
  const slides: Slide[] = [
    { 
      image: '/background (1).jpg',
      text: 'Découvrez l\'excellence du mannequinat'
    },
    { 
      image: '/background (2).jpg',
      text: 'Votre carrière commence ici'
    },
    { 
      image: '/background (3).jpg',
      text: 'L\'élégance à son apogée'
    },
    { 
      image: '/background (4).jpg',
      text: 'Des talents exceptionnels'
    },
    { 
      image: '/background (5).jpg',
      text: 'L\'avenir de la mode'
    },
    { 
      image: '/background (6).jpg',
      text: 'Une agence, une famille'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`background-slide absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ '--bg-image': `url(${slide.image})` } as React.CSSProperties}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className={`slide-text text-5xl md:text-7xl text-white font-bold text-center px-4 ${index === currentSlide ? 'visible' : 'hidden'}`}>
                {slide.text}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSlideshow;
