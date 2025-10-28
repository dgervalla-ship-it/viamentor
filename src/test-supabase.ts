/**
 * Script de test de connexion Supabase
 * Exécutez dans la console du navigateur (F12)
 */

import { supabase, testSupabaseConnection } from './lib/supabase';

// Test 1 : Vérifier les variables d'environnement
console.log('🔍 Test 1 : Variables d\'environnement');
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('ANON Key présente:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

// Test 2 : Tester la connexion
console.log('\n🔍 Test 2 : Connexion Supabase');
await testSupabaseConnection();

// Test 3 : Vérifier l'auth
console.log('\n🔍 Test 3 : Authentification');
const { data: { session } } = await supabase.auth.getSession();
if (session) {
  console.log('✅ Session active:', session.user.email);
} else {
  console.log('ℹ️  Aucune session (normal, pas encore connecté)');
}

// Test 4 : Lister les tables disponibles
console.log('\n🔍 Test 4 : Tables disponibles');
try {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .limit(1);
  
  if (error) {
    if (error.message.includes('relation') || error.message.includes('does not exist')) {
      console.log('⚠️  Table "tenants" n\'existe pas encore');
      console.log('👉 Exécutez les migrations SQL dans Supabase Dashboard > SQL Editor');
    } else {
      console.log('❌ Erreur:', error.message);
    }
  } else {
    console.log('✅ Table "tenants" accessible');
    console.log('Données:', data);
  }
} catch (err) {
  console.error('❌ Erreur test:', err);
}

console.log('\n✅ Tests terminés !');

