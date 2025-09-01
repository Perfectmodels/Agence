import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import ImageCarousel from '../components/ImageCarousel';

const PerfectFashionDay: React.FC = () => {
  const stylists = [
    {
      name: 'Ventex',
      images: [
        'https://i.ibb.co/LDm73BY2/ventex-44.jpg',
        'https://i.ibb.co/LXj51t0G/ventex-43.jpg',
        'https://i.ibb.co/hRnhS3gP/ventex-31.jpg',
        'https://i.ibb.co/fdM74zWJ/ventex-36.jpg',
        'https://i.ibb.co/HTb9F9rc/ventex-21.jpg',
        'https://i.ibb.co/bjWPHcc3/ventex-28.jpg',
        'https://i.ibb.co/JW2VY4JY/ventex-18.jpg',
        'https://i.ibb.co/6JwgLJk2/ventex-4.jpg',
        'https://i.ibb.co/vvYkS6nQ/ventex-14.jpg',
        'https://i.ibb.co/ch7Fxy8J/ventex-7.jpg'
      ]
    },
    {
      name: 'AG Style',
      images: [
        'https://i.ibb.co/Gfxgf00z/agstyle-42.jpg',
        'https://i.ibb.co/4g4x6Dkp/agstyle-41.jpg',
        'https://i.ibb.co/0y7Pqv9y/agstyle-36.jpg',
        'https://i.ibb.co/yc5kxJKT/agstyle-33.jpg',
        'https://i.ibb.co/8DTp4Qqy/agstyle-28.jpg',
        'https://i.ibb.co/DfF1Z4T9/agstyle-23.jpg',
        'https://i.ibb.co/h1mPDBy4/agstyle-21.jpg',
        'https://i.ibb.co/d4D6QLnf/agstyle-17.jpg',
        'https://i.ibb.co/60RSnzxY/agstyle-13.jpg',
        'https://i.ibb.co/hR9Sfy5Q/agstyle-15.jpg',
        'https://i.ibb.co/KpRpVrg3/agstyle-7.jpg',
        'https://i.ibb.co/vCNg8h6j/AG-Style.jpg'
      ]
    },
    {
      name: "Brand'O",
      images: [
        'https://i.ibb.co/jkztFFQV/brando-50.jpg',
        'https://i.ibb.co/Mxvqp922/brando-45.jpg',
        'https://i.ibb.co/b5NYjLqm/brando-39.jpg',
        'https://i.ibb.co/mFGznJJd/brando-34.jpg',
        'https://i.ibb.co/pjQ61C7X/brando-28.jpg',
        'https://i.ibb.co/mrj3sfP7/brando-26.jpg',
        'https://i.ibb.co/GQfNYbHh/brando-25.jpg',
        'https://i.ibb.co/bgJd82zf/brando-24.jpg',
        'https://i.ibb.co/GQzzgTZw/brando-22.jpg',
        'https://i.ibb.co/4gNj73vP/brando-17.jpg',
        'https://i.ibb.co/spywFpR6/brando-13.jpg',
        'https://i.ibb.co/GfYXkKVK/brando-11.jpg',
        'https://i.ibb.co/ymw3cwt9/brando-10.jpg'
      ]
    },
    {
      name: 'Edele A',
      images: [
        'https://i.ibb.co/N26jYJCm/edelea-40.jpg',
        'https://i.ibb.co/zhtZj7wG/edelea-38.jpg',
        'https://i.ibb.co/BKwMNJBw/edelea-31.jpg',
        'https://i.ibb.co/mVJhr45j/edelea-24.jpg',
        'https://i.ibb.co/35dDJXpV/edelea-22.jpg',
        'https://i.ibb.co/Xx03RWJx/edelea-16.jpg',
        'https://i.ibb.co/Tq77XgYg/edelea-3.jpg'
      ]
    },
    {
      name: 'Faran',
      images: [
        'https://i.ibb.co/xqxq0t42/faran-72.jpg',
        'https://i.ibb.co/5WRGVpN2/faran-63.jpg',
        'https://i.ibb.co/C3rMvpRH/faran-62.jpg',
        'https://i.ibb.co/ccTm9fqZ/faran-45.jpg',
        'https://i.ibb.co/W4JbLKPY/faran-31.jpg',
        'https://i.ibb.co/kVvx62Cd/faran-7.jpg',
        'https://i.ibb.co/1fpzHFCR/faran-18.jpg'
      ]
    },
    {
      name: 'Farel MD',
      images: [
        'https://i.ibb.co/mC32jrDj/farelmd-31.jpg',
        'https://i.ibb.co/Rk1fG3ph/farelmd-37.jpg',
        'https://i.ibb.co/Z6LnsF9F/farelmd-33.jpg',
        'https://i.ibb.co/0yVgwzxH/farelmd-28.jpg',
        'https://i.ibb.co/bZWLkcw/farelmd-30.jpg',
        'https://i.ibb.co/LDjkT30K/farelmd-21.jpg',
        'https://i.ibb.co/rKm9BH3j/farelmd-26.jpg',
        'https://i.ibb.co/KpY1tHHg/farelmd-10.jpg',
        'https://i.ibb.co/tp51KKMX/farelmd-16.jpg',
        'https://i.ibb.co/fTrvQht/farelmd-5.jpg'
      ]
    },
    {
      name: 'Lady Riaba',
      images: [
        'https://i.ibb.co/WCYYHQ1/ladyriaba-28.jpg',
        'https://i.ibb.co/rfLBb0t3/ladyriaba-26.jpg',
        'https://i.ibb.co/hRFn9tyT/ladyriaba-22.jpg',
        'https://i.ibb.co/Cs3pHkbD/ladyriaba-20.jpg',
        'https://i.ibb.co/Cp50mQwn/ladyriaba-14.jpg',
        'https://i.ibb.co/Fq4NQ0gN/ladyriaba-10.jpg',
        'https://i.ibb.co/zhj0xKNN/ladyriaba-8.jpg',
        'https://i.ibb.co/x8mGQcCG/ladyriaba-6.jpg',
        'https://i.ibb.co/Kx1WMT87/ladyriaba-5.jpg',
        'https://i.ibb.co/JRs6P128/ladyriaba-1.jpg'
      ]
    },
    {
      name: 'Madame Luc',
      images: [
        'https://i.ibb.co/TM8ZvfwY/madameluc-35.jpg',
        'https://i.ibb.co/N2n3N649/madameluc-27.jpg',
        'https://i.ibb.co/HfGP2hfY/madameluc-23.jpg',
        'https://i.ibb.co/v4bptydm/madameluc-14.jpg',
        'https://i.ibb.co/Nk9JnK8/madameluc-10.jpg',
        'https://i.ibb.co/wN3028xM/madameluc-1.jpg',
        'https://i.ibb.co/Z64LbfNr/madameluc-4.jpg'
      ]
    },
    {
      name: 'Miguel Fashion Style',
      images: [
        'https://i.ibb.co/R4j44vxH/miguel-25.jpg',
        'https://i.ibb.co/DF36zP1/miguel-24.jpg',
        'https://i.ibb.co/5hHnGSgR/miguel-23.jpg',
        'https://i.ibb.co/KccH1yVW/miguel-21.jpg',
        'https://i.ibb.co/tTwH0qkd/miguel-19.jpg',
        'https://i.ibb.co/PztGS4cG/miguel-13.jpg',
        'https://i.ibb.co/HfHQDqs9/miguel-12.jpg',
        'https://i.ibb.co/DPbZq0X5/miguel-6.jpg',
        'https://i.ibb.co/fYzb35qV/miguel-10.jpg'
      ]
    },
    {
      name: 'Tito Style',
      images: [
        'https://i.ibb.co/C5rcPJHz/titostyle-53.jpg',
        'https://i.ibb.co/gMf55YY9/titostyle-51.jpg',
        'https://i.ibb.co/8Ty8sGT/titostyle-50.jpg',
        'https://i.ibb.co/d0tXVs0v/titostyle-45.jpg',
        'https://i.ibb.co/21VQys2y/titostyle-43.jpg',
        'https://i.ibb.co/wNPRTQrS/titostyle-41.jpg',
        'https://i.ibb.co/vvc0k6TQ/titostyle-36.jpg',
        'https://i.ibb.co/PGP9HTrw/titostyle-33.jpg',
        'https://i.ibb.co/QvjHXZFY/titostyle-19.jpg',
        'https://i.ibb.co/21cjYs2K/titostyle-25.jpg',
        'https://i.ibb.co/ynCg04LR/titostyle-17.jpg',
        'https://i.ibb.co/cXkw3btJ/titostyle-4.jpg',
        'https://i.ibb.co/qY64DbG0/titostyle-12.jpg'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <SectionWrapper
        title="Perfect Fashion Day"
        subtitle="Découvrez les créations exceptionnelles de nos stylistes participants"
        className="bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
          {stylists.map((stylist, index) => (
            <div key={index} className="h-full">
              <ImageCarousel images={stylist.images} name={stylist.name} />
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default PerfectFashionDay;
