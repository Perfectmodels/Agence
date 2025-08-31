
import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/admin', label: 'Dashboard', exact: true },
  { path: '/admin/models', label: 'Mannequins' },
  { path: '/admin/pages', label: 'Pages' },
  { path: '/', label: 'Retour au site' },
];

const AdminSidebar: React.FC = () => {
  const linkClasses = "flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200";
  const activeLinkClasses = "bg-gray-700 text-white border-r-4 border-brand-gold";

  return (
    <div className="w-64 bg-gray-800 flex-shrink-0">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-serif font-bold text-brand-gold">PMM Admin</h1>
      </div>
      <nav className="mt-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.exact}
            className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
