# 🎨 TOKEN MIGRATION GUIDE - VIAMENTOR

**Version** : 1.0  
**Date** : 28 octobre 2025  
**Objectif** : Gérer changements design tokens sans casser l'UI

---

## 📋 PROCESSUS MIGRATION

### Phase 1 : Ajout Token (Semaine 1)
```css
/* tailwind.config.js */
:root {
  --primary-old: 221.2 83.2% 53.3%; /* Bleu actuel */
  --primary-new: 142 71% 45%; /* Nouveau vert */
}
```

### Phase 2 : Migration Progressive (Semaine 2-3)
- Remplacer `bg-primary` par `bg-primary-new` progressivement
- Tester chaque page/composant
- Deploy staging

### Phase 3 : Renommage (Semaine 4)
```css
:root {
  --primary-legacy: 221.2 83.2% 53.3%; /* Deprecated */
  --primary: 142 71% 45%; /* Nouveau */
}
```

### Phase 4 : Cleanup (Semaine 5)
- Supprimer `--primary-legacy`
- Supprimer `--primary-old` references

---

## 🚀 EXEMPLE MIGRATION COMPLET

### Scénario : Changer Primary Color

**Avant** :
```css
--primary: 221.2 83.2% 53.3%; /* Bleu */
```

**Après** :
```css
--primary: 142 71% 45%; /* Vert */
```

**Impact Analysis** :
```bash
# Chercher usages
grep -r "bg-primary" src/
grep -r "text-primary" src/
grep -r "border-primary" src/

# Résultats
# 450 usages bg-primary
# 200 usages text-primary
# 50 usages border-primary
```

**Migration Steps** :
1. Ajouter `--primary-green: 142 71% 45%`
2. Créer branche `feat/primary-color-migration`
3. Remplacer progressivement (5 composants/jour)
4. Tests visuels après chaque changement
5. Merge après validation complète

---

## ✅ CHECKLIST MIGRATION

- [ ] Impact analysis (grep usage)
- [ ] Créer token temporaire (`-new` suffix)
- [ ] Tester staging 1 semaine
- [ ] Screenshots avant/après
- [ ] Validation équipe design
- [ ] Migration 100% code
- [ ] Renommer token définitif
- [ ] Supprimer ancien token
- [ ] Update Storybook
- [ ] Update documentation

---

_Guide créé le 28 octobre 2025_

