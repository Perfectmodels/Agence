import React, { createContext, useContext, useEffect, useState } from 'react';
import { Database } from '../types/database.types';
import { getModels, supabase } from '../lib/supabase';

type Model = Database['public']['Tables']['models']['Row'];

interface ModelsContextType {
  models: Model[];
  loading: boolean;
  error: string | null;
  refreshModels: () => Promise<void>;
}

const ModelsContext = createContext<ModelsContextType | undefined>(undefined);

export const ModelsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModels = async () => {
    try {
      setLoading(true);
      const data = await getModels();
      setModels(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching models:', err);
      setError('Failed to load models. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();

    // Set up real-time subscription
    const subscription = supabase
      .channel('models')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'models' }, 
        (payload) => {
          fetchModels(); // Refresh models on any change
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ModelsContext.Provider value={{ models, loading, error, refreshModels: fetchModels }}>
      {children}
    </ModelsContext.Provider>
  );
};

export const useModels = (): ModelsContextType => {
  const context = useContext(ModelsContext);
  if (context === undefined) {
    throw new Error('useModels must be used within a ModelsProvider');
  }
  return context;
};
