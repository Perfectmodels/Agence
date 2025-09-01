
import React, { useState } from 'react';
// FIX: Use namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { MenuIcon } from './components/icons/MenuIcon';
import { CloseIcon } from './components/icons/CloseIcon';
import { put } from "@vercel/blob";

const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });
const navLinks = [
  { path: '/', label: 'Accueil' },
  { path: '/a-propos', label: 'À Propos' },
  { path: '/mannequins', label: 'Mannequins' },
  { path: '/services', label: 'Services' },
  { path: '/evenements', label: 'Événements' },
  { path: '/focus-mode-241', label: 'Focus Mode 241' },
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
        {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
        <ReactRouterDOM.NavLink to="/" className="flex items-center h-12">
          <img 
            src="/logo-pmm.png" 
            alt="Perfect Models Management" 
            className="h-full w-auto object-contain"
            title="Perfect Models Management"
          />
        </ReactRouterDOM.NavLink>
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => {
            if (link.path === '/devenir-mannequin') {
              return (
                // FIX: Use namespace import for react-router-dom to resolve module export errors.
                <ReactRouterDOM.NavLink
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 bg-transparent border border-brand-gold text-brand-gold font-bold rounded-full text-xs hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300"
                >
                  {link.label}
                </ReactRouterDOM.NavLink>
              );
            }
            return (
              // FIX: Use namespace import for react-router-dom to resolve module export errors.
              <ReactRouterDOM.NavLink 
                key={link.path} 
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
              >
                {link.label}
              </ReactRouterDOM.NavLink>
            );
          })}
        </nav>
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-white focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-black">
          <nav className="flex flex-col items-center space-y-6 py-8">
            {navLinks.map((link) => (
              // FIX: Use namespace import for react-router-dom to resolve module export errors.
              <ReactRouterDOM.NavLink 
                key={link.path} 
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </ReactRouterDOM.NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;