#!/bin/bash

###############################################################################
# VIAMENTOR - SCRIPT MIGRATION COULEURS HARDCODÉES
# 
# Ce script remplace automatiquement les couleurs hardcodées par des variants
# sémantiques dans tout le projet Viamentor
#
# @usage ./migrate-hardcoded-colors.sh
# @date 2025-01-18
###############################################################################

set -e # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL_FILES=0
TOTAL_REPLACEMENTS=0

###############################################################################
# FUNCTIONS
###############################################################################

print_header() {
  echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║  VIAMENTOR - Migration Couleurs Hardcodées → Variants         ║${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

print_step() {
  echo -e "${YELLOW}▶ $1${NC}"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

print_info() {
  echo -e "${BLUE}ℹ $1${NC}"
}

# Backup function
create_backup() {
  print_step "Création du backup..."
  BACKUP_DIR="./backup-colors-$(date +%Y%m%d-%H%M%S)"
  mkdir -p "$BACKUP_DIR"
  
  # Backup all TSX/JSX files
  find ./viamentor -type f \( -name "*.tsx" -o -name "*.jsx" \) -exec cp --parents {} "$BACKUP_DIR" \;
  
  print_success "Backup créé: $BACKUP_DIR"
}

# Replace function with counter
replace_in_files() {
  local pattern=$1
  local replacement=$2
  local description=$3
  local count=0
  
  print_step "Migration: $description"
  
  # Find and replace in all TSX/JSX files
  while IFS= read -r file; do
    if grep -q "$pattern" "$file"; then
      sed -i "s/$pattern/$replacement/g" "$file"
      local file_count=$(grep -c "$replacement" "$file" || true)
      count=$((count + file_count))
      TOTAL_FILES=$((TOTAL_FILES + 1))
      print_info "  → $file ($file_count remplacements)"
    fi
  done < <(find ./viamentor -type f \( -name "*.tsx" -o -name "*.jsx" \))
  
  if [ $count -gt 0 ]; then
    print_success "$count remplacements effectués"
    TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + count))
  else
    print_info "Aucun remplacement nécessaire"
  fi
  echo ""
}

###############################################################################
# MAIN SCRIPT
###############################################################################

print_header

# Check if we're in the right directory
if [ ! -d "./viamentor" ]; then
  print_error "Erreur: Répertoire ./viamentor non trouvé"
  print_info "Exécutez ce script depuis la racine du projet"
  exit 1
fi

# Create backup
create_backup
echo ""

# ============================================================================
# SUCCESS VARIANTS (Vert)
# ============================================================================

print_step "═══ MIGRATION SUCCESS (Vert) ═══"
echo ""

# Backgrounds
replace_in_files \
  'className="\([^"]*\)bg-green-500\([^"]*\)"' \
  'className="\1bg-success\2"' \
  "bg-green-500 → bg-success"

replace_in_files \
  'className="\([^"]*\)bg-green-600\([^"]*\)"' \
  'className="\1bg-success\2"' \
  "bg-green-600 → bg-success"

replace_in_files \
  'className="\([^"]*\)bg-green-50\([^"]*\)"' \
  'className="\1bg-success/10\2"' \
  "bg-green-50 → bg-success/10"

replace_in_files \
  'className="\([^"]*\)bg-green-100\([^"]*\)"' \
  'className="\1bg-success/20\2"' \
  "bg-green-100 → bg-success/20"

# Text colors
replace_in_files \
  'className="\([^"]*\)text-green-500\([^"]*\)"' \
  'className="\1text-success\2"' \
  "text-green-500 → text-success"

replace_in_files \
  'className="\([^"]*\)text-green-600\([^"]*\)"' \
  'className="\1text-success\2"' \
  "text-green-600 → text-success"

replace_in_files \
  'className="\([^"]*\)text-green-700\([^"]*\)"' \
  'className="\1text-success\2"' \
  "text-green-700 → text-success"

# Borders
replace_in_files \
  'className="\([^"]*\)border-green-500\([^"]*\)"' \
  'className="\1border-success\2"' \
  "border-green-500 → border-success"

replace_in_files \
  'className="\([^"]*\)border-green-200\([^"]*\)"' \
  'className="\1border-success/30\2"' \
  "border-green-200 → border-success/30"

replace_in_files \
  'className="\([^"]*\)border-green-300\([^"]*\)"' \
  'className="\1border-success/40\2"' \
  "border-green-300 → border-success/40"

# Hover states
replace_in_files \
  'className="\([^"]*\)hover:bg-green-600\([^"]*\)"' \
  'className="\1hover:bg-success/90\2"' \
  "hover:bg-green-600 → hover:bg-success/90"

replace_in_files \
  'className="\([^"]*\)hover:text-green-600\([^"]*\)"' \
  'className="\1hover:text-success\2"' \
  "hover:text-green-600 → hover:text-success"

# Ring colors (focus states)
replace_in_files \
  'className="\([^"]*\)ring-green-500\([^"]*\)"' \
  'className="\1ring-success\2"' \
  "ring-green-500 → ring-success"

# ============================================================================
# WARNING VARIANTS (Orange/Yellow)
# ============================================================================

print_step "═══ MIGRATION WARNING (Orange/Yellow) ═══"
echo ""

# Backgrounds - Orange
replace_in_files \
  'className="\([^"]*\)bg-orange-500\([^"]*\)"' \
  'className="\1bg-warning\2"' \
  "bg-orange-500 → bg-warning"

replace_in_files \
  'className="\([^"]*\)bg-orange-600\([^"]*\)"' \
  'className="\1bg-warning\2"' \
  "bg-orange-600 → bg-warning"

replace_in_files \
  'className="\([^"]*\)bg-orange-50\([^"]*\)"' \
  'className="\1bg-warning/10\2"' \
  "bg-orange-50 → bg-warning/10"

replace_in_files \
  'className="\([^"]*\)bg-orange-100\([^"]*\)"' \
  'className="\1bg-warning/20\2"' \
  "bg-orange-100 → bg-warning/20"

# Backgrounds - Yellow
replace_in_files \
  'className="\([^"]*\)bg-yellow-500\([^"]*\)"' \
  'className="\1bg-warning\2"' \
  "bg-yellow-500 → bg-warning"

replace_in_files \
  'className="\([^"]*\)bg-yellow-50\([^"]*\)"' \
  'className="\1bg-warning/10\2"' \
  "bg-yellow-50 → bg-warning/10"

replace_in_files \
  'className="\([^"]*\)bg-yellow-100\([^"]*\)"' \
  'className="\1bg-warning/20\2"' \
  "bg-yellow-100 → bg-warning/20"

# Text colors - Orange
replace_in_files \
  'className="\([^"]*\)text-orange-500\([^"]*\)"' \
  'className="\1text-warning\2"' \
  "text-orange-500 → text-warning"

replace_in_files \
  'className="\([^"]*\)text-orange-600\([^"]*\)"' \
  'className="\1text-warning\2"' \
  "text-orange-600 → text-warning"

# Text colors - Yellow
replace_in_files \
  'className="\([^"]*\)text-yellow-500\([^"]*\)"' \
  'className="\1text-warning\2"' \
  "text-yellow-500 → text-warning"

replace_in_files \
  'className="\([^"]*\)text-yellow-600\([^"]*\)"' \
  'className="\1text-warning\2"' \
  "text-yellow-600 → text-warning"

# Borders
replace_in_files \
  'className="\([^"]*\)border-orange-500\([^"]*\)"' \
  'className="\1border-warning\2"' \
  "border-orange-500 → border-warning"

replace_in_files \
  'className="\([^"]*\)border-orange-200\([^"]*\)"' \
  'className="\1border-warning/30\2"' \
  "border-orange-200 → border-warning/30"

replace_in_files \
  'className="\([^"]*\)border-yellow-500\([^"]*\)"' \
  'className="\1border-warning\2"' \
  "border-yellow-500 → border-warning"

replace_in_files \
  'className="\([^"]*\)border-yellow-200\([^"]*\)"' \
  'className="\1border-warning/30\2"' \
  "border-yellow-200 → border-warning/30"

# Hover states
replace_in_files \
  'className="\([^"]*\)hover:bg-orange-600\([^"]*\)"' \
  'className="\1hover:bg-warning/90\2"' \
  "hover:bg-orange-600 → hover:bg-warning/90"

replace_in_files \
  'className="\([^"]*\)hover:bg-yellow-600\([^"]*\)"' \
  'className="\1hover:bg-warning/90\2"' \
  "hover:bg-yellow-600 → hover:bg-warning/90"

# Ring colors
replace_in_files \
  'className="\([^"]*\)ring-orange-500\([^"]*\)"' \
  'className="\1ring-warning\2"' \
  "ring-orange-500 → ring-warning"

replace_in_files \
  'className="\([^"]*\)ring-yellow-500\([^"]*\)"' \
  'className="\1ring-warning\2"' \
  "ring-yellow-500 → ring-warning"

# ============================================================================
# INFO VARIANTS (Bleu)
# ============================================================================

print_step "═══ MIGRATION INFO (Bleu) ═══"
echo ""

# Backgrounds
replace_in_files \
  'className="\([^"]*\)bg-blue-500\([^"]*\)"' \
  'className="\1bg-info\2"' \
  "bg-blue-500 → bg-info"

replace_in_files \
  'className="\([^"]*\)bg-blue-600\([^"]*\)"' \
  'className="\1bg-info\2"' \
  "bg-blue-600 → bg-info"

replace_in_files \
  'className="\([^"]*\)bg-blue-50\([^"]*\)"' \
  'className="\1bg-info/10\2"' \
  "bg-blue-50 → bg-info/10"

replace_in_files \
  'className="\([^"]*\)bg-blue-100\([^"]*\)"' \
  'className="\1bg-info/20\2"' \
  "bg-blue-100 → bg-info/20"

# Text colors
replace_in_files \
  'className="\([^"]*\)text-blue-500\([^"]*\)"' \
  'className="\1text-info\2"' \
  "text-blue-500 → text-info"

replace_in_files \
  'className="\([^"]*\)text-blue-600\([^"]*\)"' \
  'className="\1text-info\2"' \
  "text-blue-600 → text-info"

replace_in_files \
  'className="\([^"]*\)text-blue-700\([^"]*\)"' \
  'className="\1text-info\2"' \
  "text-blue-700 → text-info"

# Borders
replace_in_files \
  'className="\([^"]*\)border-blue-500\([^"]*\)"' \
  'className="\1border-info\2"' \
  "border-blue-500 → border-info"

replace_in_files \
  'className="\([^"]*\)border-blue-200\([^"]*\)"' \
  'className="\1border-info/30\2"' \
  "border-blue-200 → border-info/30"

replace_in_files \
  'className="\([^"]*\)border-blue-300\([^"]*\)"' \
  'className="\1border-info/40\2"' \
  "border-blue-300 → border-info/40"

# Hover states
replace_in_files \
  'className="\([^"]*\)hover:bg-blue-600\([^"]*\)"' \
  'className="\1hover:bg-info/90\2"' \
  "hover:bg-blue-600 → hover:bg-info/90"

replace_in_files \
  'className="\([^"]*\)hover:text-blue-600\([^"]*\)"' \
  'className="\1hover:text-info\2"' \
  "hover:text-blue-600 → hover:text-info"

# Ring colors
replace_in_files \
  'className="\([^"]*\)ring-blue-500\([^"]*\)"' \
  'className="\1ring-info\2"' \
  "ring-blue-500 → ring-info"

# ============================================================================
# DESTRUCTIVE VARIANTS (Rouge) - Déjà existant mais vérification
# ============================================================================

print_step "═══ VÉRIFICATION DESTRUCTIVE (Rouge) ═══"
echo ""

# Backgrounds
replace_in_files \
  'className="\([^"]*\)bg-red-500\([^"]*\)"' \
  'className="\1bg-destructive\2"' \
  "bg-red-500 → bg-destructive"

replace_in_files \
  'className="\([^"]*\)bg-red-600\([^"]*\)"' \
  'className="\1bg-destructive\2"' \
  "bg-red-600 → bg-destructive"

replace_in_files \
  'className="\([^"]*\)bg-red-50\([^"]*\)"' \
  'className="\1bg-destructive/10\2"' \
  "bg-red-50 → bg-destructive/10"

replace_in_files \
  'className="\([^"]*\)bg-red-100\([^"]*\)"' \
  'className="\1bg-destructive/20\2"' \
  "bg-red-100 → bg-destructive/20"

# Text colors
replace_in_files \
  'className="\([^"]*\)text-red-500\([^"]*\)"' \
  'className="\1text-destructive\2"' \
  "text-red-500 → text-destructive"

replace_in_files \
  'className="\([^"]*\)text-red-600\([^"]*\)"' \
  'className="\1text-destructive\2"' \
  "text-red-600 → text-destructive"

# Borders
replace_in_files \
  'className="\([^"]*\)border-red-500\([^"]*\)"' \
  'className="\1border-destructive\2"' \
  "border-red-500 → border-destructive"

replace_in_files \
  'className="\([^"]*\)border-red-200\([^"]*\)"' \
  'className="\1border-destructive/30\2"' \
  "border-red-200 → border-destructive/30"

# ============================================================================
# SUMMARY
# ============================================================================

echo ""
print_header
print_success "Migration terminée avec succès!"
echo ""
print_info "Statistiques:"
echo "  • Fichiers modifiés: $TOTAL_FILES"
echo "  • Remplacements totaux: $TOTAL_REPLACEMENTS"
echo "  • Backup: $BACKUP_DIR"
echo ""
print_step "Prochaines étapes:"
echo "  1. Vérifier les changements: git diff"
echo "  2. Tester l'application: npm run dev"
echo "  3. Valider visuellement tous les composants"
echo "  4. Si OK: git add . && git commit -m 'refactor: migrate hardcoded colors to semantic variants'"
echo "  5. Si KO: Restaurer backup: cp -r $BACKUP_DIR/* ."
echo ""

###############################################################################
# VALIDATION CHECKLIST
###############################################################################

print_step "Checklist de validation:"
echo ""
echo "  [ ] Tous les badges success sont verts"
echo "  [ ] Tous les badges warning sont orange"
echo "  [ ] Tous les badges info sont bleus"
echo "  [ ] Tous les badges destructive sont rouges"
echo "  [ ] Les boutons success/warning/info/destructive ont les bonnes couleurs"
echo "  [ ] Les bordures utilisent les variants corrects"
echo "  [ ] Le dark mode fonctionne correctement"
echo "  [ ] Les hover states fonctionnent (opacity 90%)"
echo "  [ ] Les backgrounds légers (/10, /20) sont corrects"
echo "  [ ] Les ring colors (focus) sont corrects"
echo ""
print_step "Vérification couleurs hardcodées restantes:"
echo ""
echo "  Exécutez ces commandes pour vérifier:"
echo "  • grep -r 'bg-green-500' ./viamentor"
echo "  • grep -r 'text-blue-500' ./viamentor"
echo "  • grep -r 'border-red-200' ./viamentor"
echo "  • grep -r 'bg-orange-50' ./viamentor"
echo "  • grep -r 'text-yellow-600' ./viamentor"
echo ""
echo "  Si aucun résultat: ✓ Migration complète!"
echo ""

print_success "Script terminé!"

export {}
