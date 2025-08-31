
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ModelsPage from './pages/ModelsPage';
import ServicesPage from './pages/ServicesPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import BecomeModelPage from './pages/BecomeModelPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import ManageModelsPage from './pages/admin/ManageModelsPage';
import ManagePagesPage from './pages/admin/ManagePagesPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route index element={<DashboardPage />} />
              <Route path="models" element={<ManageModelsPage />} />
              <Route path="pages" element={<ManagePagesPage />} />
            </Routes>
          </AdminLayout>
        } />

        {/* Public Site Routes */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen bg-brand-dark">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/a-propos" element={<AboutPage />} />
                <Route path="/mannequins" element={<ModelsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/evenements" element={<EventsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/devenir-mannequin" element={<BecomeModelPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;