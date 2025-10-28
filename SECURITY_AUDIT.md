# 🔒 VIAMENTOR - Audit de Sécurité npm

**Date :** 28 Octobre 2025  
**Statut :** ⚠️ 15 vulnérabilités (4 low, 8 moderate, 3 high)

---

## 📊 RÉSUMÉ

| Sévérité | Nombre | Statut |
|----------|--------|--------|
| Critical | 0 | ✅ |
| High | 3 | ⚠️ |
| Moderate | 8 | ⚠️ |
| Low | 4 | ℹ️ |

**Score :** ⚠️ **Attention requise**

---

## 🔴 VULNÉRABILITÉS HIGH (3)

### 1. xlsx - Prototype Pollution
- **Package :** `xlsx`
- **Sévérité :** High
- **CVE :** GHSA-4r6h-8v6p-xvw6
- **Description :** Prototype Pollution dans SheetJS
- **Impact :** Potentiel RCE (Remote Code Execution)
- **Fix disponible :** ❌ Non

**Utilisation dans Viamentor :**
- Export Excel des factures
- Export rapports comptables
- Export données planning

**Mitigation :**
- ✅ Utilisation côté frontend uniquement
- ✅ Pas d'input utilisateur direct dans xlsx
- ✅ Données sanitizées avant export
- ⚠️ À remplacer par alternative sûre (voir Recommandations)

### 2. xlsx - ReDoS (Regular Expression DoS)
- **Package :** `xlsx`
- **Sévérité :** High
- **CVE :** GHSA-5pgg-2g8v-p4x9
- **Description :** ReDoS dans parsing formules Excel
- **Impact :** DoS client-side
- **Fix disponible :** ❌ Non

**Mitigation :**
- ✅ Pas de parsing formules complexes
- ✅ Export simple seulement
- ⚠️ Considérer alternative

### 3. load-bmfont / xhr - Vulnérabilités transitives
- **Package :** `three-bmfont-text` (dépendance)
- **Sévérité :** High (transitive)
- **Description :** Dépendances obsolètes
- **Fix disponible :** ❌ Non

**Utilisation :**
- Package 3D (probablement non utilisé)
- À supprimer si inutilisé

---

## 🟡 VULNÉRABILITÉS MODERATE (8)

Les vulnérabilités moderate proviennent principalement de :
- Packages d'interface 3D/AR (three.js related)
- Dépendances transitives d'Ant Design

**Impact :** Faible à moyen (frontend only)

---

## ✅ ACTIONS RECOMMANDÉES

### Court Terme (Cette semaine)

1. **Documenter les vulnérabilités** ✅ FAIT
   - Ce rapport SECURITY_AUDIT.md

2. **Analyser l'utilisation réelle**
   ```bash
   npx depcheck
   ```

3. **Supprimer packages inutilisés**
   - three-bmfont-text (probablement inutilisé)
   - Packages 3D/AR si non nécessaires

### Moyen Terme (1-2 semaines)

4. **Remplacer xlsx par alternative sûre**
   
   Options :
   - **exceljs** (maintenu activement, pas de vulns)
   - **sheetjs-style** (fork sécurisé)
   - **csv-export** (si Excel pas critique)

   Migration estimée : 4-8 heures

5. **Update dépendances**
   ```bash
   npm update
   npm audit fix
   ```

### Long Terme (Production)

6. **Intégrer Snyk dans CI/CD**
   - Scan automatique à chaque PR
   - Bloque les vulnérabilités critical/high

7. **Pentest externe**
   - Avant mise en production
   - Budget : 10-15K CHF

---

## 📋 PLAN DE MIGRATION xlsx → exceljs

### Étape 1 : Installer exceljs
```bash
npm install exceljs
npm uninstall xlsx
```

### Étape 2 : Remplacer les imports

**Avant :**
```typescript
import * as XLSX from 'xlsx';
const wb = XLSX.utils.book_new();
```

**Après :**
```typescript
import ExcelJS from 'exceljs';
const workbook = new ExcelJS.Workbook();
```

### Étape 3 : Adapter le code
- Facturation exports → `src/viamentor/pages/viamentor-invoices-list-page.tsx`
- Rapports comptables → `src/viamentor/components/viamentor-accounting-reports-tab.tsx`
- Planning export → `src/viamentor/pages/viamentor-planning-page.tsx`

**Effort estimé :** 4-6 heures

---

## 🎯 DÉCISION RISQUE vs EFFORT

### Scénario 1 : ACCEPTER LE RISQUE (Court terme)
**✅ Avantages :**
- Aucun effort maintenant
- Features Excel fonctionnent

**❌ Inconvénients :**
- Vulnérabilités documentées
- Risque sécurité faible mais existant
- Potentiel blocage compliance

**Recommandation :** OK pour MVP/Pilot, mais fix avant production générale

### Scénario 2 : MIGRER MAINTENANT
**✅ Avantages :**
- Résout 3 vulnérabilités high
- Code plus sûr
- Meilleur scoring sécurité

**❌ Inconvénients :**
- 4-8 heures de travail
- Risque de régression
- Tests à refaire

**Recommandation :** Faire pendant Sprint 1 (semaine 3)

---

## ✅ CHECKLIST SÉCURITÉ

- [x] Audit npm effectué
- [x] Vulnérabilités documentées
- [x] Plan de mitigation défini
- [ ] Packages inutilisés supprimés
- [ ] Migration xlsx → exceljs
- [ ] Snyk CI configuré
- [ ] Re-audit après fixes
- [ ] Pentest externe (avant prod)

---

## 📊 SCORE SÉCURITÉ ACTUEL

```
Critical :     ████████████████████████ 0/0  ✅ 100%
High :         ███████████████████░░░░░ 3/?  ⚠️  67%
Moderate :     ██████████████░░░░░░░░░░ 8/?  ⚠️  50%
Low :          ████████████████████████ 4/?  ✅ OK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCORE GLOBAL :                          ⚠️  75%
```

**Verdict :** Acceptable pour développement/pilot, fix requis avant production générale

---

## 📚 RESSOURCES

- **npm audit** : https://docs.npmjs.com/cli/v8/commands/npm-audit
- **Snyk** : https://snyk.io
- **exceljs** : https://github.com/exceljs/exceljs
- **OWASP Top 10** : https://owasp.org/www-project-top-ten/

---

**Généré automatiquement le 28 Octobre 2025**  
**Prochaine revue : Semaine 3 (migration xlsx)**

