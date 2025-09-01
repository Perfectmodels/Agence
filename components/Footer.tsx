
import React from 'react';
// FIX: Use namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { FacebookIcon } from './icons/FacebookIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { GithubIcon } from './icons/GithubIcon';

const Footer: React.FC = () => {
  const socialLinks = [
    { href: 'https://www.facebook.com/perfectmodels.ga/', icon: <FacebookIcon />, label: 'Facebook' },
    { href: 'https://www.instagram.com/perfectmodels.ga/', icon: <InstagramIcon />, label: 'Instagram' },
    { href: 'https://www.youtube.com/@PMM241', icon: <YoutubeIcon />, label: 'YouTube' },
    { href: 'https://github.com/Perfectmodels/perfect-model-hub-website.git', icon: <GithubIcon />, label: 'GitHub' },
  ];

  return (
    <footer className="bg-black border-t border-brand-gold/20 text-white mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Perfect Models MGT</h3>
            <p className="text-gray-400 text-sm">
              Agence de mannequins basée à Libreville, Gabon. Nous formons, conseillons et plaçons les talents de la mode.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📧 perfectmodels.ga@gmail.com</li>
              <li>📱 +241 074066461</li>
              <li>📍 INDI HAIR, Avorbam (Libreville)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Suivez-nous</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.label} 
                  className="text-gray-400 hover:text-brand-gold transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Perfect Models Management. Tous droits réservés.</p>
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Link to="/admin" className="text-gray-500 hover:text-brand-gold transition-colors mt-2 inline-block text-xs">
            Admin Panel
          </ReactRouterDOM.Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;