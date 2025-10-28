/**
 * Supabase Client Configuration
 * Client singleton pour toute l'application
 */

import { createClient } from '@supabase/supabase-js';

// Récupérer les variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation des variables d'environnement
if (!supabaseUrl) {
  throw new Error(
    '❌ VITE_SUPABASE_URL manquante dans .env\n' +
    'Ajoutez: VITE_SUPABASE_URL=https://jdyuulqscwxlkswmceqp.supabase.co'
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    '❌ VITE_SUPABASE_ANON_KEY manquante dans .env\n' +
    'Récupérez votre clé dans: Supabase Dashboard > Settings > API'
  );
}

/**
 * Client Supabase singleton
 * Utilisez ce client partout dans l'application
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

/**
 * Helper pour vérifier la connexion
 */
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('tenants')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Erreur connexion Supabase:', error.message);
      return false;
    }
    
    console.log('✅ Connexion Supabase OK');
    return true;
  } catch (err) {
    console.error('❌ Erreur Supabase:', err);
    return false;
  }
}

