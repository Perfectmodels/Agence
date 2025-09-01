
import React from 'react';

const AdminNotification: React.FC = () => {
  return (
    <div className="bg-yellow-900/50 border-l-4 border-yellow-500 text-yellow-100 p-4 rounded-md mb-8" role="alert">
      <p className="font-bold">Mode Démonstration</p>
      <p className="text-sm">
        Ce tableau de bord est une interface pour visualiser et organiser vos modifications. Les changements ne sont pas sauvegardés automatiquement.
      </p>
      <p className="text-sm mt-2">
        <strong>Pour appliquer vos modifications :</strong> veuillez décrire les changements souhaités dans la prochaine requête (prompt) afin que le code source du site soit mis à jour.
      </p>
    </div>
  );
};

export default AdminNotification;
