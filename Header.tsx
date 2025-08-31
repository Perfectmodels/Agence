import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';

const navLinks = [
  { path: '/', label: 'Accueil' },
  { path: '/a-propos', label: 'À Propos' },
  { path: '/mannequins', label: 'Mannequins' },
  { path: '/services', label: 'Services' },
  { path: '/evenements', label: 'Événements' },
  { path: '/devenir-mannequin', label: 'Devenir Mannequin' },
  { path: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClasses = "text-white hover:text-brand-gold transition-colors duration-300 uppercase tracking-widest text-sm";
  const activeLinkClasses = "text-brand-gold";

  return (
    <header className="bg-black bg-opacity-80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-brand-gold/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-serif font-bold text-white hover:text-brand-gold transition-colors">
          Perfect Models
        </NavLink>
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => {
                  // Special styling for the new button
                  if (link.path === '/devenir-mannequin') {
                    return "px-4 py-2 bg-transparent border border-brand-gold text-brand-gold font-bold rounded-full text-xs hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300";
                  }
                  return `${linkClasses} ${isActive ? activeLinkClasses : ''}`;
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-black">
          <nav className="flex flex-col items-center space-y-6 py-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;