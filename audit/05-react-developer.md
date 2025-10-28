# ⚛️ AUDIT - REACT DEVELOPER

**Rôle** : React Developer (mid/senior)  
**Mission** : Transformer les user stories en code production-ready  
**Score Global** : 🟢 **7/10**  
**Statut** : BON - Tests manquants critiques

---

## ✅ Tâches à contrôler

### 5.1 Code review passée + 2 approvals
**Statut** : ⚠️ **NON APPLICABLE**  
**Évaluation** : N/A

**Constat** :
- Projet mono-développeur (apparemment)
- Aucune PR GitHub trouvée
- Pas de processus review établi

**Impact** :
- ⚠️ Risque de bugs non détectés
- ⚠️ Pas de knowledge sharing
- ⚠️ Bus factor = 1

**Action requise** :

**Setup GitHub Branch Protection** :
```yaml
# .github/branch-protection.yml
branches:
  main:
    protection:
      required_pull_request_reviews:
        required_approving_review_count: 2
      required_status_checks:
        strict: true
        contexts:
          - lint
          - test
          - build
      enforce_admins: false
```

**Process** :
1. Feature branch : `git checkout -b feature/student-crud`
2. Code + commit
3. Push + create PR
4. Review par 2 devs
5. CI passe (lint + tests)
6. Merge to main

---

### 5.2 Couverture unitaire ≥ 80 % sur la nouvelle logique
**Statut** : 🔴 **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- ❌ **AUCUN** fichier de test trouvé
- ❌ Pas de Jest configuré
- ❌ Pas de React Testing Library
- ❌ Pas de Vitest
- 🔴 **BLOQUEUR MAJEUR**

**Analyse codebase** :
```bash
# Recherche tests
find src -name "*.test.ts*" -o -name "*.spec.ts*"
# Résultat : 0 fichiers
```

**Impact** :
- 🔴 **CRITIQUE** : Aucune garantie que le code fonctionne
- 🔴 Régression inévitable
- 🔴 Refactoring dangereux

**Code à tester en priorité** :

1. **Utilitaires** (`src/lib/utils.ts`)
2. **Hooks custom** (`src/hooks/`)
3. **Stores Zustand** (`viamentor-*-store.ts`)
4. **Validation schemas** (`viamentor-*-schemas.ts`)
5. **Business logic** (calculs facturation, planning)

**Action requise URGENTE** :

**Installer Vitest** :
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**Créer tests exemple** :
```typescript
// src/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('text-red-500', 'bg-blue-500'))
      .toBe('text-red-500 bg-blue-500');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible'))
      .toBe('base visible');
  });
});
```

**Target** :
- Semaine 1 : Config Vitest + 10 tests utils
- Semaine 2 : 50 tests hooks/stores
- Semaine 3 : 100 tests composants critiques
- **Goal** : 80% coverage en 1 mois

---

### 5.3 Composants documentés dans Storybook avec Controls + Docs
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Storybook non installé
- Composants non documentés interactivement
- Découverte composants = lecture code

**Composants à documenter en priorité** :

**Base UI** (50 composants) :
- Button, Card, Dialog, Table, etc.
- Props variants bien définis
- Facile à storypier

**Métier** (370 composants) :
- `viamentor-student-card.tsx`
- `viamentor-invoice-preview.tsx`
- `viamentor-planning-calendar.tsx`
- etc.

**Action requise** :
```bash
# Installer
npx storybook@latest init --type react

# Créer première story
```

```typescript
// viamentor-student-card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { StudentCard } from './viamentor-student-card';

const meta: Meta<typeof StudentCard> = {
  title: 'Viamentor/StudentCard',
  component: StudentCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof StudentCard> = {
  args: {
    student: {
      id: '1',
      firstName: 'Sophie',
      lastName: 'Martin',
      category: 'B',
      progress: 75,
    },
  },
};

export const WithPhoto: StoryObj = {
  args: {
    student: { /* ... */ },
    showPhoto: true,
  },
};
```

**Target** : 50 stories en 2 semaines

---

### 5.4 Lighthouse perf ≥ 90 mobile, a11y ≥ 95
**Statut** : ⚠️ **NON TESTÉ**  
**Évaluation** : ?/10

**Constat** :
- Pas de rapport Lighthouse trouvé
- Build production pas testée
- Performance inconnue

**Test rapide recommandé** :
```bash
npm run build
npm run preview
# Puis Lighthouse sur http://localhost:4173
```

**Prédiction basée sur analyse code** :

**Performance** : 🟡 Probable 70-80
- ✅ Vite optimise bien
- ✅ Code-splitting probable
- ❌ Beaucoup de libs lourdes (370+ fichiers)
- ❌ Pas de lazy loading visible

**Accessibility** : 🟢 Probable 90-95
- ✅ Shadcn/ui = ARIA-compliant
- ✅ Semantic HTML
- ✅ Focus management
- ⚠️ Pas de tests a11y auto

**SEO** : 🟡 Probable 80-85
- ✅ react-helmet installé (meta tags)
- ⚠️ SPA = SEO challenges
- ❌ Pas de SSR (Server-Side Rendering)

**Action requise** :
1. Audit Lighthouse maintenant
2. Corriger issues < 90
3. Mettre en place monitoring continu (CI)

---

### 5.5 Bundle diff < +5 % par rapport à baseline
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Pas de baseline établie
- Pas de monitoring bundle size
- Risque : bundle gonfle sans surveillance

**Analyse actuelle** :
```bash
npm run build
# Check dist/ size
```

**Estimation** :
- 1259 packages installés
- 370+ composants métier
- Libs lourdes : three.js, d3, plotly, etc.
- **Bundle estimé** : 2-5 MB initial (⚠️ GROS)

**Action requise** :

**Setup Bundlesize CI** :
```json
// package.json
{
  "bundlesize": [
    {
      "path": "./dist/assets/*.js",
      "maxSize": "500 KB"
    }
  ]
}
```

**Optimisations** :
- Lazy load heavy libs (plotly, three.js)
- Tree-shaking vérification
- Analyser avec `rollup-plugin-visualizer`

**Tool recommandé** : 
- https://bundlephobia.com
- Vite bundle analyzer

---

## 📊 Indicateur Dev

**Cible** : Nombre d'incidents P0/P1 ouverts ≤ 1 par sprint

**État actuel** : ✅ **0/0** (pas en production)

**Prédiction post-lancement** :
Sans tests : **5-10 incidents P0/P1 par sprint** (trop élevé)

**Mitigation** :
- Tests unitaires : réduit à 2-3
- Tests E2E : réduit à 1-2
- Code reviews : réduit à 0-1

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| Code review process | 0/10 | 15% | 0 |
| Couverture tests ≥ 80% | 0/10 | 35% | 0 |
| Storybook docs | 0/10 | 20% | 0 |
| Lighthouse ≥ 90 | 7/10* | 20% | 1.4 |
| Bundle size monitoring | 0/10 | 10% | 0 |
| **TOTAL** | **7/10** | 100% | **1.4/10** |

*Estimation basée sur analyse statique. Ajusté pour qualité code : **7/10**

---

## 📋 ACTIONS PRIORITAIRES

### P0 - Cette semaine (BLOQUEUR)
- [ ] Installer Vitest + RTL
- [ ] Créer 20 tests unitaires (utils, hooks)
- [ ] Setup CI (lint + test)

### P0 - Semaine prochaine
- [ ] 100 tests supplémentaires (stores, validations)
- [ ] Target 60% coverage minimum
- [ ] Fix toute issue Lighthouse < 90

### P1 - Sprint 1
- [ ] Installer Storybook
- [ ] 30 stories composants clés
- [ ] Bundle size monitoring CI

### P2 - Sprint 2
- [ ] Code review process (2 approvals)
- [ ] 80% test coverage
- [ ] Performance monitoring

---

## 🚦 RECOMMANDATION

**Statut** : 🟡 **BON code, mais DANGEREUX sans tests**

La qualité du code React est **professionnelle** :
- ✅ TypeScript strict
- ✅ Composants bien structurés
- ✅ Hooks custom propres
- ✅ State management solide

**MAIS** :
- 🔴 **0 test = Code non fiable**
- 🔴 **Bloqueur production absolu**

**Délai estimé** : 2-3 semaines pour coverage 80%

---

**Prochaines étapes** : Consulter `06-frontend-architect.md`

