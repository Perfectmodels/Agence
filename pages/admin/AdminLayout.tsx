
import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNotification from '../../components/admin/AdminNotification';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <AdminNotification />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
