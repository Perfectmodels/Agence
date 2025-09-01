
import React from 'react';
// FIX: Use namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import Header from './Header';
import Footer from './components/icons/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ModelsPage from './pages/ModelsPage';
import ServicesPage from './pages/ServicesPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import BecomeModelPage from './pages/BecomeModelPage';
import FocusModePage from './pages/FocusModePage';
import ArticleDetailPage from './pages/ArticleDetailPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';

const PublicLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-brand-dark">
    <Header />
    <main className="flex-grow">
      {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
      <ReactRouterDOM.Outlet />
    </main>
    <Footer />
  </div>
);


const App: React.FC = () => {
  return (
    // FIX: Use namespace import for react-router-dom to resolve module export errors.
    <ReactRouterDOM.HashRouter>
      {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
      <ReactRouterDOM.Routes>
        {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
        <ReactRouterDOM.Route path="/admin/*" element={<AdminLayout />} />
        {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
        <ReactRouterDOM.Route path="/" element={<PublicLayout />}>
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Route index element={<HomePage />} />
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Route path="a-propos" element={<AboutPage />} />
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Route path="mannequins" element={<ModelsPage />} />
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Route path="services" element={<ServicesPage />} />
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Route path="evenements" element={<EventsPage />} />
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Route path="focus-mode-241" element={<FocusModePage />} />
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Route path="focus-mode-241/:articleId" element={<ArticleDetailPage />} />
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Route path="contact" element={<ContactPage />} />
          {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
          <ReactRouterDOM.Route path="devenir-mannequin" element={<BecomeModelPage />} />
        </ReactRouterDOM.Route>
      </ReactRouterDOM.Routes>
    </ReactRouterDOM.HashRouter>
  );
};

export default App;