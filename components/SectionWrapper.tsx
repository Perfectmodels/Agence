
import React from 'react';

interface SectionWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, subtitle, children, className = '', id }) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-brand-gold max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
           <div className="mt-4 w-24 h-1 bg-brand-gold mx-auto rounded"></div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
