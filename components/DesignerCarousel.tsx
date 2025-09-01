import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface DesignerCarouselProps {
  designerName: string;
  images: string[];
}

const DesignerCarousel: React.FC<DesignerCarouselProps> = ({ designerName, images }) => {
  return (
    <div className="mb-12 bg-gray-900/50 p-6 rounded-lg border border-gray-700">
      <h3 className="text-2xl font-serif text-brand-gold mb-6 text-center">{designerName}</h3>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="h-80 overflow-hidden rounded-lg">
            <img 
              src={image} 
              alt={`${designerName} - Look ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DesignerCarousel;
