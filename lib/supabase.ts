import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Fonction pour récupérer les modèles
export async function getModels() {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Erreur lors de la récupération des modèles:', error);
    return [];
  }
  return data;
}

// Fonction pour ajouter un modèle
export async function addModel(modelData: any) {
  const { data, error } = await supabase
    .from('models')
    .insert([modelData])
    .select();

  if (error) {
    console.error('Erreur lors de l\'ajout du modèle:', error);
    throw error;
  }
  return data?.[0];
}

// Fonction pour mettre à jour un modèle
export async function updateModel(id: string, updates: any) {
  const { data, error } = await supabase
    .from('models')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Erreur lors de la mise à jour du modèle:', error);
    throw error;
  }
  return data?.[0];
}

// Fonction pour supprimer un modèle
export async function deleteModel(id: string) {
  const { error } = await supabase
    .from('models')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erreur lors de la suppression du modèle:', error);
    throw error;
  }
  return true;
}
