/**
 * Supabase Client Configuration
 * Client singleton pour toute l'application
 * Optimisé pour performance React 2025
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Récupérer les variables d'environnement (const pour optimisation V8)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jdyuulqscwxlkswmceqp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validation des variables d'environnement (warning au lieu d'erreur pour permettre le build)
if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn(
    '⚠️  VITE_SUPABASE_URL manquante dans .env\n' +
    'Ajoutez: VITE_SUPABASE_URL=https://jdyuulqscwxlkswmceqp.supabase.co'
  );
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    '⚠️  VITE_SUPABASE_ANON_KEY manquante dans .env\n' +
    'Récupérez votre clé dans: Supabase Dashboard > Settings > API\n' +
    'Configurez dans Vercel: Settings > Environment Variables'
  );
}

/**
 * Client Supabase singleton
 * Utilisez ce client partout dans l'application
 * Configuration optimisée pour performance
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
  global: {
    headers: {
      'X-Client-Info': 'viamentor-web',
    },
  },
  db: {
    schema: 'public',
  },
});

// Cache pour la vérification de connexion (éviter appels multiples)
let connectionCheckCache: { result: boolean; timestamp: number } | null = null;
const CACHE_DURATION = 60000; // 1 minute

/**
 * Helper pour vérifier la connexion (avec cache)
 * @returns Promise<boolean> true si connecté
 */
export async function testSupabaseConnection(): Promise<boolean> {
  // Vérifier le cache
  if (connectionCheckCache && Date.now() - connectionCheckCache.timestamp < CACHE_DURATION) {
    return connectionCheckCache.result;
  }

  try {
    const { data, error } = await supabase
      .from('tenants')
      .select('count')
      .limit(1);
    
    const result = !error;
    
    // Mettre à jour le cache
    connectionCheckCache = {
      result,
      timestamp: Date.now(),
    };
    
    if (error) {
      console.error('❌ Erreur connexion Supabase:', error.message);
      return false;
    }
    
    console.log('✅ Connexion Supabase OK');
    return true;
  } catch (err) {
    console.error('❌ Erreur Supabase:', err);
    
    // Cache le résultat négatif aussi
    connectionCheckCache = {
      result: false,
      timestamp: Date.now(),
    };
    
    return false;
  }
}

