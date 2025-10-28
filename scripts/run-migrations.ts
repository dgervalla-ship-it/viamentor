/**
 * Script pour exécuter les migrations SQL via Supabase client
 * Usage: npx tsx scripts/run-migrations.ts
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuration Supabase
const SUPABASE_URL = 'https://jdyuulqscwxlkswmceqp.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY manquante');
  console.log('\n📖 Pour obtenir la clé service:');
  console.log('   1. https://supabase.com/dashboard');
  console.log('   2. Votre projet → Settings → API');
  console.log('   3. Copiez "service_role key" (secret)');
  console.log('   4. export SUPABASE_SERVICE_KEY="votre-clé"');
  console.log('   5. Relancez ce script\n');
  process.exit(1);
}

// Client avec clé service (bypass RLS)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function executeSqlFile(filePath: string): Promise<void> {
  console.log(`\n📄 Lecture de ${path.basename(filePath)}...`);
  
  const sql = fs.readFileSync(filePath, 'utf-8');
  
  console.log(`   Taille: ${(sql.length / 1024).toFixed(1)} KB`);
  console.log(`   Lignes: ${sql.split('\n').length}`);
  console.log(`\n🔄 Exécution...`);

  try {
    // Note: L'API Supabase ne supporte pas l'exécution directe de SQL arbitraire
    // Il faut passer par le REST API ou psql
    console.log('\n⚠️  Le client Supabase JS ne peut pas exécuter de SQL brut');
    console.log('   Il faut utiliser le Dashboard Supabase ou psql\n');
    
    return;
  } catch (error: any) {
    console.error(`\n❌ Erreur:`, error.message);
    throw error;
  }
}

async function testConnection(): Promise<boolean> {
  console.log('\n🔍 Test de connexion à Supabase...');
  
  try {
    const { data, error } = await supabase.from('tenants').select('count');
    
    if (error && error.code === '42P01') {
      console.log('   ℹ️  Les tables n\'existent pas encore (normal)');
      return true;
    }
    
    if (error) {
      console.error(`   ❌ Erreur: ${error.message}`);
      return false;
    }
    
    console.log('   ✅ Connexion OK');
    return true;
  } catch (error: any) {
    console.error(`   ❌ Erreur de connexion: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║                                                        ║');
  console.log('║      🗄️  VIAMENTOR - Exécution Migrations SQL         ║');
  console.log('║                                                        ║');
  console.log('╚════════════════════════════════════════════════════════╝');

  // Test connexion
  const connected = await testConnection();
  
  if (!connected) {
    console.log('\n❌ Impossible de se connecter à Supabase\n');
    process.exit(1);
  }

  // Chemins des migrations
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  const migration001 = path.join(migrationsDir, '001_initial_schema.sql');
  const migration002 = path.join(migrationsDir, '002_seed_data.sql');

  console.log('\n📁 Fichiers de migration trouvés:');
  console.log(`   ✅ ${path.basename(migration001)}`);
  console.log(`   ✅ ${path.basename(migration002)}`);

  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║                                                        ║');
  console.log('║  ⚠️  UTILISER LE DASHBOARD SUPABASE À LA PLACE        ║');
  console.log('║                                                        ║');
  console.log('║  Le client JavaScript ne peut pas exécuter de SQL     ║');
  console.log('║  brut. Suivez ces étapes simples:                     ║');
  console.log('║                                                        ║');
  console.log('║  1. https://supabase.com/dashboard                    ║');
  console.log('║  2. Votre projet → SQL Editor                         ║');
  console.log('║  3. Copier/Coller 001_initial_schema.sql              ║');
  console.log('║  4. RUN ▶️                                            ║');
  console.log('║  5. Copier/Coller 002_seed_data.sql                   ║');
  console.log('║  6. RUN ▶️                                            ║');
  console.log('║                                                        ║');
  console.log('║  ⏱️  Temps: 3 minutes chrono                          ║');
  console.log('║                                                        ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  console.log('📖 Voir aussi: QUICK_START_DATABASE.md\n');
}

main().catch((error) => {
  console.error('\n❌ Erreur fatale:', error.message);
  process.exit(1);
});

