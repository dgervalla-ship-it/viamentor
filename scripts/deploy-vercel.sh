#!/bin/bash

# ╔════════════════════════════════════════════════════════════════════╗
# ║  VIAMENTOR - Déploiement Automatique Vercel                        ║
# ╚════════════════════════════════════════════════════════════════════╝

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║     🚀 VIAMENTOR - Déploiement Automatique Vercel                 ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

# Variables
SUPABASE_URL="https://jdyuulqscwxlkswmceqp.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeXV1bHFzY3d4bGtzd21jZXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDM5ODMsImV4cCI6MjA3NzE3OTk4M30.zPTATMFZsLyJQEuZ1DKnBKUcR5VAIXYYfV9W0Q3MhiU"
GA_ID="G-XXXXXXXXXX"

echo "📋 Variables à configurer :"
echo "   VITE_SUPABASE_URL : $SUPABASE_URL"
echo "   VITE_SUPABASE_ANON_KEY : eyJhbGci...${SUPABASE_ANON_KEY: -20}"
echo "   VITE_GA_MEASUREMENT_ID : $GA_ID"
echo ""

# Vérifier si connecté à Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Connexion à Vercel requise..."
    echo "   Une page web va s'ouvrir pour vous connecter."
    echo ""
    vercel login
fi

echo ""
echo "✅ Authentification Vercel OK"
echo ""

# Lier le projet
echo "🔗 Liaison avec le projet Vercel..."
echo ""

if [ ! -f ".vercel/project.json" ]; then
    echo "   Liaison automatique du projet..."
    echo ""
    vercel link --yes
else
    echo "   ✅ Projet déjà lié"
fi

echo ""
echo "⚙️  Configuration des variables d'environnement..."
echo ""

# Ajouter les variables d'env
echo "   1/3 : VITE_SUPABASE_URL..."
echo "$SUPABASE_URL" | vercel env add VITE_SUPABASE_URL production preview development --yes 2>&1 || echo "      (peut-être déjà configurée)"

echo "   2/3 : VITE_SUPABASE_ANON_KEY..."
echo "$SUPABASE_ANON_KEY" | vercel env add VITE_SUPABASE_ANON_KEY production preview development --yes 2>&1 || echo "      (peut-être déjà configurée)"

echo "   3/3 : VITE_GA_MEASUREMENT_ID..."
echo "$GA_ID" | vercel env add VITE_GA_MEASUREMENT_ID production preview development --yes 2>&1 || echo "      (peut-être déjà configurée)"

echo ""
echo "✅ Variables d'environnement configurées"
echo ""

# Déployer
echo "🚀 Déploiement en production..."
echo ""
vercel --prod --yes

echo ""
echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║   🎉 DÉPLOIEMENT TERMINÉ ! 🎉                                     ║"
echo "║                                                                    ║"
echo "║   ✅ Variables d'environnement configurées                        ║"
echo "║   ✅ Application déployée en production                           ║"
echo "║                                                                    ║"
echo "║   Votre app est maintenant en ligne ! 🚀                          ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

