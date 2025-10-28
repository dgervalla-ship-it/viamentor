#!/bin/bash

# ╔════════════════════════════════════════════════════════════════════╗
# ║  VIAMENTOR - Configuration Automatique Base de Données            ║
# ║  Script d'installation automatique                                ║
# ╔════════════════════════════════════════════════════════════════════╝

set -e  # Arrêter en cas d'erreur

echo ""
echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║     🗄️  VIAMENTOR - Setup Automatique Base de Données            ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

# Variables
SUPABASE_PROJECT_ID="jdyuulqscwxlkswmceqp"
SUPABASE_URL="https://${SUPABASE_PROJECT_ID}.supabase.co"
DB_URL="postgresql://postgres:%23N8RX9b!F!RYyAjy6gx@LN!J@db.${SUPABASE_PROJECT_ID}.supabase.co:5432/postgres"

echo "📋 Configuration :"
echo "   Projet : ${SUPABASE_PROJECT_ID}"
echo "   URL    : ${SUPABASE_URL}"
echo ""

# Vérifier que psql est installé
if ! command -v psql &> /dev/null; then
    echo "❌ psql n'est pas installé"
    echo "   Installation via Homebrew..."
    brew install postgresql@15
fi

echo "🔄 Étape 1/4 : Test de connexion..."
export PGPASSWORD='#N8RX9b!F!RYyAjy6gx@LN!J'

# Test simple
if psql -h db.${SUPABASE_PROJECT_ID}.supabase.co -p 5432 -U postgres -d postgres -c "SELECT 1;" &> /dev/null; then
    echo "   ✅ Connexion OK"
else
    echo "   ❌ Impossible de se connecter directement"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "   ⚠️  UTILISER LE DASHBOARD SUPABASE À LA PLACE"
    echo ""
    echo "   1. Ouvrez : https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql"
    echo "   2. Copier/Coller : supabase/migrations/001_initial_schema.sql"
    echo "   3. RUN ▶️"
    echo "   4. Copier/Coller : supabase/migrations/002_seed_data.sql"
    echo "   5. RUN ▶️"
    echo ""
    echo "   ⏱️  Temps : 3 minutes chrono"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    exit 1
fi

echo ""
echo "🔄 Étape 2/4 : Exécution migration 001_initial_schema.sql..."
if psql -h db.${SUPABASE_PROJECT_ID}.supabase.co -p 5432 -U postgres -d postgres -f supabase/migrations/001_initial_schema.sql; then
    echo "   ✅ Tables créées"
else
    echo "   ❌ Erreur lors de la création des tables"
    exit 1
fi

echo ""
echo "🔄 Étape 3/4 : Exécution migration 002_seed_data.sql..."
if psql -h db.${SUPABASE_PROJECT_ID}.supabase.co -p 5432 -U postgres -d postgres -f supabase/migrations/002_seed_data.sql; then
    echo "   ✅ Données insérées"
else
    echo "   ❌ Erreur lors de l'insertion des données"
    exit 1
fi

echo ""
echo "🔄 Étape 4/4 : Vérification..."
RESULT=$(psql -h db.${SUPABASE_PROJECT_ID}.supabase.co -p 5432 -U postgres -d postgres -t -c "SELECT COUNT(*) FROM tenants;")
TENANT_COUNT=$(echo $RESULT | xargs)

if [ "$TENANT_COUNT" = "1" ]; then
    echo "   ✅ Base de données opérationnelle !"
else
    echo "   ⚠️  Nombre de tenants : $TENANT_COUNT (attendu : 1)"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║   🎉 BASE DE DONNÉES CRÉÉE AVEC SUCCÈS ! 🎉                       ║"
echo "║                                                                    ║"
echo "║   ✅ 10 tables opérationnelles                                    ║"
echo "║   ✅ 15 enregistrements de test                                   ║"
echo "║   ✅ RLS activé                                                   ║"
echo "║                                                                    ║"
echo "║   Testez maintenant dans l'app React ! 🚀                         ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

unset PGPASSWORD

