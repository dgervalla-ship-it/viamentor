#!/bin/bash

# ╔════════════════════════════════════════════════════════════════════╗
# ║  VIAMENTOR - Analyse Automatique des 189 Pages                     ║
# ╚════════════════════════════════════════════════════════════════════╝

set -e

PAGES_DIR="src/viamentor/pages"
OUTPUT_FILE="ANALYSE_PAGES_DETAILLEE.md"

echo "🔍 Analyse de toutes les pages en cours..."
echo ""

# Créer le fichier de sortie
cat > "$OUTPUT_FILE" << 'EOF'
# 📊 VIAMENTOR - Analyse Détaillée des Pages

**Date**: $(date +"%d %B %Y")  
**Total pages**: 189

---

## 🎯 CATÉGORIES D'ANALYSE

### ✅ Complet (Prêt Production)
Pages avec tous les éléments requis.

### ⚠️ Incomplet (Éléments Manquants)
Pages nécessitant des ajouts.

### 🔄 À Connecter API
Pages utilisant encore mock data.

### ⚡ À Optimiser
Pages sans React.memo/lazy loading.

---

## 📋 ANALYSE PAR PAGE

EOF

# Compteurs
TOTAL=0
WITH_MOCK=0
WITH_USESTATE=0
WITHOUT_LOADING=0
WITHOUT_ERROR=0

# Analyser chaque page
for page in $(find "$PAGES_DIR" -name "*.tsx" -type f | sort); do
  TOTAL=$((TOTAL + 1))
  BASENAME=$(basename "$page")
  
  # Vérifier mock data
  if grep -q "MOCK_" "$page" 2>/dev/null; then
    WITH_MOCK=$((WITH_MOCK + 1))
    echo "🔄 **$BASENAME** - Mock data détecté" >> "$OUTPUT_FILE"
  fi
  
  # Vérifier useState
  if grep -q "useState.*\[" "$page" 2>/dev/null; then
    WITH_USESTATE=$((WITH_USESTATE + 1))
  fi
  
  # Vérifier loading state
  if ! grep -q "isLoading\|loading" "$page" 2>/dev/null; then
    WITHOUT_LOADING=$((WITHOUT_LOADING + 1))
  fi
  
  # Vérifier error handling
  if ! grep -q "error\|Error" "$page" 2>/dev/null; then
    WITHOUT_ERROR=$((WITHOUT_ERROR + 1))
  fi
done

# Résumé
cat >> "$OUTPUT_FILE" << EOF

---

## 📊 STATISTIQUES GLOBALES

| Métrique | Valeur | % |
|----------|--------|---|
| **Total pages** | $TOTAL | 100% |
| **Avec MOCK data** | $WITH_MOCK | $((WITH_MOCK * 100 / TOTAL))% |
| **Avec useState** | $WITH_USESTATE | $((WITH_USESTATE * 100 / TOTAL))% |
| **Sans loading state** | $WITHOUT_LOADING | $((WITHOUT_LOADING * 100 / TOTAL))% |
| **Sans error handling** | $WITHOUT_ERROR | $((WITHOUT_ERROR * 100 / TOTAL))% |

---

## 🎯 PRIORITÉS

### P0 - CRITIQUE ($WITH_MOCK pages)
Pages avec mock data à connecter aux APIs.

### P1 - IMPORTANT ($WITHOUT_LOADING pages)
Pages sans loading states à ajouter.

### P2 - NICE-TO-HAVE ($WITHOUT_ERROR pages)
Pages sans error handling à améliorer.

---

_Analyse générée automatiquement_
EOF

echo "✅ Analyse terminée !"
echo ""
echo "📊 RÉSULTATS:"
echo "   Total pages:          $TOTAL"
echo "   Avec MOCK data:       $WITH_MOCK"
echo "   Avec useState:        $WITH_USESTATE"
echo "   Sans loading state:   $WITHOUT_LOADING"
echo "   Sans error handling:  $WITHOUT_ERROR"
echo ""
echo "📄 Rapport: $OUTPUT_FILE"

