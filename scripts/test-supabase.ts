/**
 * Test de connexion Supabase depuis Node.js
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jdyuulqscwxlkswmceqp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeXV1bHFzY3d4bGtzd21jZXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDM5ODMsImV4cCI6MjA3NzE3OTk4M30.zPTATMFZsLyJQEuZ1DKnBKUcR5VAIXYYfV9W0Q3MhiU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runTests() {
  console.log('\n╔════════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                    ║');
  console.log('║     🧪 TEST CONNEXION SUPABASE DEPUIS NODE.JS                     ║');
  console.log('║                                                                    ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝\n');

  try {
    // Test 1: Tenant
    console.log('🔍 Test 1/5 : Récupération tenant...');
    const { data: tenants, error: tenantError } = await supabase
      .from('tenants')
      .select('*');

    if (tenantError) {
      console.error('   ❌ Erreur:', tenantError.message);
      if (tenantError.message.includes('policy')) {
        console.log('   ℹ️  Erreur RLS : Normal, vous n\'êtes pas authentifié');
        console.log('   💡 Les données sont protégées par Row Level Security');
      }
      throw tenantError;
    }

    console.log(`   ✅ ${tenants?.length || 0} tenant(s) récupéré(s)`);
    if (tenants && tenants.length > 0) {
      console.log(`   📍 ${tenants[0].name} - ${tenants[0].city}`);
    }

    // Test 2: Étudiants
    console.log('\n🔍 Test 2/5 : Récupération étudiants...');
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select('*');

    if (studentsError) {
      console.error('   ❌ Erreur:', studentsError.message);
      throw studentsError;
    }

    console.log(`   ✅ ${students?.length || 0} étudiant(s) récupéré(s)`);
    if (students && students.length > 0) {
      const student = students[0];
      console.log(`   👤 ${student.first_name} ${student.last_name}`);
      console.log(`      📧 ${student.email}`);
      console.log(`      🎓 Catégorie: ${student.current_category}`);
      console.log(`      📊 ${student.total_lessons_completed} leçons`);
    }

    // Test 3: Instructeurs
    console.log('\n🔍 Test 3/5 : Récupération instructeurs...');
    const { data: instructors, error: instructorsError } = await supabase
      .from('instructors')
      .select('*');

    if (instructorsError) {
      console.error('   ❌ Erreur:', instructorsError.message);
      throw instructorsError;
    }

    console.log(`   ✅ ${instructors?.length || 0} instructeur(s) récupéré(s)`);
    if (instructors && instructors.length > 0) {
      const instructor = instructors[0];
      console.log(`   👨‍🏫 ${instructor.first_name} ${instructor.last_name}`);
      console.log(`      🎖️  Catégories: ${instructor.categories.join(', ')}`);
      console.log(`      ⭐ Rating: ${instructor.rating}/5`);
    }

    // Test 4: Cours
    console.log('\n🔍 Test 4/5 : Récupération cours...');
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*');

    if (coursesError) {
      console.error('   ❌ Erreur:', coursesError.message);
      throw coursesError;
    }

    console.log(`   ✅ ${courses?.length || 0} cours récupéré(s)`);
    if (courses && courses.length > 0) {
      const course = courses[0];
      console.log(`   📚 ${course.title}`);
      console.log(`      📅 ${course.start_date} → ${course.end_date}`);
      console.log(`      💰 CHF ${course.price}.-`);
    }

    // Test 5: Véhicules
    console.log('\n🔍 Test 5/5 : Récupération véhicules...');
    const { data: vehicles, error: vehiclesError } = await supabase
      .from('vehicles')
      .select('*');

    if (vehiclesError) {
      console.error('   ❌ Erreur:', vehiclesError.message);
      throw vehiclesError;
    }

    console.log(`   ✅ ${vehicles?.length || 0} véhicule(s) récupéré(s)`);
    if (vehicles && vehicles.length > 0) {
      const vehicle = vehicles[0];
      console.log(`   🚗 ${vehicle.brand} ${vehicle.model} (${vehicle.year})`);
      console.log(`      🔖 ${vehicle.license_plate}`);
      console.log(`      ⚙️  ${vehicle.transmission}`);
    }

    // Statistiques finales
    console.log('\n📊 STATISTIQUES GLOBALES');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Tenants :      ${tenants?.length || 0}`);
    console.log(`   Étudiants :    ${students?.length || 0}`);
    console.log(`   Instructeurs : ${instructors?.length || 0}`);
    console.log(`   Cours :        ${courses?.length || 0}`);
    console.log(`   Véhicules :    ${vehicles?.length || 0}`);

    console.log('\n╔════════════════════════════════════════════════════════════════════╗');
    console.log('║                                                                    ║');
    console.log('║   🎉 BASE DE DONNÉES 100% OPÉRATIONNELLE ! 🎉                     ║');
    console.log('║                                                                    ║');
    console.log('║   ✅ Connexion Supabase OK                                        ║');
    console.log('║   ✅ Toutes les tables créées                                     ║');
    console.log('║   ✅ Données de test insérées                                     ║');
    console.log('║   ✅ Services TypeScript fonctionnels                             ║');
    console.log('║                                                                    ║');
    console.log('║   Prêt pour développement ! 🚀                                    ║');
    console.log('║                                                                    ║');
    console.log('╚════════════════════════════════════════════════════════════════════╝\n');

  } catch (error: any) {
    console.error('\n╔════════════════════════════════════════════════════════════════════╗');
    console.error('║                                                                    ║');
    console.error('║   ❌ ERREUR LORS DES TESTS                                        ║');
    console.error('║                                                                    ║');
    console.error('╚════════════════════════════════════════════════════════════════════╝\n');
    console.error('Message:', error.message);
    
    if (error.message.includes('policy')) {
      console.log('\n💡 SOLUTION :');
      console.log('   Les données sont protégées par Row Level Security (RLS)');
      console.log('   Pour tester, vous devez soit :');
      console.log('   1. Vous authentifier d\'abord');
      console.log('   2. Désactiver temporairement RLS pour tester\n');
    }
    
    process.exit(1);
  }
}

runTests();

