import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const TestConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState('Connexion en cours...');
  const [models, setModels] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Tester la connexion en récupérant les modèles
        const { data, error } = await supabase
          .from('models')
          .select('*')
          .limit(5);

        if (error) {
          throw error;
        }

        if (data) {
          setConnectionStatus('✅ Connecté à Supabase avec succès !');
          setModels(data);
        }
      } catch (error) {
        console.error('Erreur de connexion à Supabase:', error);
        setConnectionStatus('❌ Erreur de connexion à Supabase');
        setError(error instanceof Error ? error.message : 'Une erreur inconnue est survenue');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Test de connexion à Supabase</h2>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <p className="font-semibold">Statut : {connectionStatus}</p>
        {error && (
          <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
            <p className="font-semibold">Détails de l'erreur :</p>
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-2">Vérifiez les variables d'environnement dans le fichier .env</p>
          </div>
        )}
      </div>

      {models.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Modèles trouvés ({models.length}) :</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Nom</th>
                  <th className="py-2 px-4 border">Âge</th>
                  <th className="py-2 px-4 border">Taille</th>
                  <th className="py-2 px-4 border">Genre</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{model.name || 'Non spécifié'}</td>
                    <td className="py-2 px-4 border">{model.age || 'Non spécifié'}</td>
                    <td className="py-2 px-4 border">{model.height || 'Non spécifié'}</td>
                    <td className="py-2 px-4 border">{model.gender || 'Non spécifié'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">Configuration actuelle :</h3>
        <div className="text-sm overflow-x-auto">
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify({
              supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
              table: 'models',
              timestamp: new Date().toISOString(),
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TestConnection;
