
import React from 'react';
// FIX: Use namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import AdminSidebar from '../../components/icons/AdminSidebar';
import AdminNotification from '../../components/icons/AdminNotification';
import DashboardPage from './DashboardPage';
import ManageModelsPage from './ManageModelsPage';
import ManagePagesPage from './ManagePagesPage';
import ManageStylistsPage from './ManageStylistsPage';
import SettingsPage from './SettingsPage';
import ManageEventsPage from './ManageEventsPage';
import ManageArticlesPage from './ManageArticlesPage';
import ManageMediaPage from './ManageMediaPage';
import { ChangesProvider } from '../../contexts/ChangesContext';
import PromptGenerator from '../../components/admin/PromptGenerator';

const AdminLayout: React.FC = () => {
  return (
    <ChangesProvider>
      <div className="flex h-screen bg-gray-900 text-white">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              <AdminNotification />
              <PromptGenerator />
              {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
              <ReactRouterDOM.Routes>
                {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
                <ReactRouterDOM.Route index element={<DashboardPage />} />
                {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
                <ReactRouterDOM.Route path="models" element={<ManageModelsPage />} />
                {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
                <ReactRouterDOM.Route path="media" element={<ManageMediaPage />} />
                {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
                <ReactRouterDOM.Route path="stylists" element={<ManageStylistsPage />} />
                {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
                <ReactRouterDOM.Route path="events" element={<ManageEventsPage />} />
                {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
                <ReactRouterDOM.Route path="articles" element={<ManageArticlesPage />} />
                {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
                <ReactRouterDOM.Route path="settings" element={<SettingsPage />} />
                {/* FIX: Use namespace import for react-router-dom to resolve module export errors. */}
                <ReactRouterDOM.Route path="pages" element={<ManagePagesPage />} />
              </ReactRouterDOM.Routes>
            </div>
          </main>
        </div>
      </div>
    </ChangesProvider>
  );
};

export default AdminLayout;
