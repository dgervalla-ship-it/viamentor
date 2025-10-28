# 🤖 AUDIT - QA AUTOMATION ENGINEER

**Rôle** : Automation Engineer (QA auto)  
**Mission** : Réduire le coût de régression à long terme  
**Score Global** : 🔴 **0/10**  
**Statut** : INEXISTANT - Créer de zéro

---

## ✅ Tâches à contrôler

### 9.1 Scénarios E2E priorisés (smoke, critical path) codés
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- ❌ Aucun test E2E
- ❌ Playwright/Cypress non installé
- ❌ Aucun scénario défini
- 🔴 **BLOQUEUR MAJEUR**

**Impact** :
- 🔴 Impossible de valider parcours utilisateur
- 🔴 Régression non détectée
- 🔴 Déploiement = roulette russe

**Parcours critiques à tester** :

**Smoke Tests (5 min)** :
1. ✅ App démarre
2. ✅ Login fonctionne
3. ✅ Dashboard charge
4. ✅ Pas d'erreur JS console

**Critical Paths (30 min)** :
1. **Inscription élève** : /students/new → wizard → success
2. **Réservation leçon** : /planning → select slot → confirm
3. **Génération facture** : /students/:id → invoices → generate QR
4. **Consultation planning** : /planning → week view → filter

**Action requise URGENTE** :

**Installer Playwright** :
```bash
npm install -D @playwright/test
npx playwright install
```

**Premier test E2E** : `tests/e2e/critical-path-student.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Student Management Critical Path', () => {
  test('should create student successfully', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'school@viamentor.ch');
    await page.fill('[name="password"]', 'viamentor2025');
    await page.click('button[type="submit"]');
    
    // Navigate to new student
    await page.goto('/students/new');
    
    // Step 1: Identity
    await page.fill('[name="firstName"]', 'Sophie');
    await page.fill('[name="lastName"]', 'Martin');
    await page.fill('[name="email"]', 'sophie@example.com');
    await page.click('button:has-text("Suivant")');
    
    // Step 2: Training
    await page.selectOption('[name="category"]', 'B');
    await page.click('button:has-text("Suivant")');
    
    // Step 3: Legal
    await page.check('[name="gdprConsent"]');
    await page.click('button:has-text("Créer")');
    
    // Verify success
    await expect(page).toHaveURL(/\/students\/[a-z0-9-]+/);
    await expect(page.locator('h1')).toContainText('Sophie Martin');
  });
  
  test('should show validation errors for invalid data', async ({ page }) => {
    await page.goto('/students/new');
    
    // Try submit without data
    await page.click('button:has-text("Suivant")');
    
    // Expect validation errors
    await expect(page.locator('.error')).toBeVisible();
    await expect(page.locator('.error')).toContainText('Prénom requis');
  });
});
```

**Priority** :
1. Auth flow (login, logout)
2. Student CRUD
3. Planning booking
4. Invoice generation
5. Dashboard load

---

### 9.2 Tests lancés sur chaque PR (< 10 min)
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Pas de CI/CD
- Pas de tests auto
- PR merge sans validation

**Action requise** :

**GitHub Actions** : `.github/workflows/e2e.yml`

```yaml
name: E2E Tests

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    timeout-minutes: 10
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      
      - run: npm ci
      
      - run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npx playwright test
        
      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

**Target** : < 10 min execution time

**Optimization** :
- Paralléliser tests (sharding)
- Headless browser
- Cache dependencies

---

### 9.3 Rapport de couverture E2E ≥ 70 % des chemins critiques
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Pas de mesure coverage E2E
- Chemins critiques non identifiés

**Chemins critiques à couvrir** (20 identifiés) :

1. ✅ Login → Dashboard
2. ✅ Create student → View student
3. ✅ Book lesson → View planning
4. ✅ Generate invoice → Send invoice
5. ✅ Student search → Student detail
6. ✅ Instructor planning → Today view
7. ✅ Payments → Record payment
8. ✅ Settings → Update school info
9. ✅ Reports → Export PDF
10. ✅ User roles → Assign permission
... etc.

**Coverage E2E** :
```
Critical paths : 20
Tests écrits : 0
Coverage : 0/20 = 0%
Target : 14/20 = 70%
```

**Action** : Créer 14 tests E2E en 2 semaines

---

### 9.4 Tests parallèles + retry flaky ≤ 2
**Statut** : ⚠️ **NON APPLICABLE**  
**Évaluation** : N/A

**Constat** :
- Pas de tests = pas de flaky tests
- Mais : config recommandée

**Config Playwright (anticipation)** :

```typescript
// playwright.config.ts
export default {
  testDir: './tests/e2e',
  fullyParallel: true, // ✅ Parallélisation
  workers: 4, // 4 workers simultanés
  retries: 2, // ✅ Max 2 retries si flaky
  timeout: 30000, // 30s max par test
  
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure', // ✅ Debug flaky
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  // Fail fast si trop de flaky
  maxFailures: 5,
};
```

**Flaky test prevention** :
- Attendre états stables (waitForLoadState)
- Pas de timeouts arbitraires (waitFor)
- Isoler tests (pas de dépendances)

---

### 9.5 Vidéo replay automatique en cas d'échec
**Statut** : ⚠️ **NON APPLICABLE**  
**Évaluation** : N/A

**Config Playwright (ready)** :
```typescript
use: {
  video: 'retain-on-failure', // ✅ Video auto si échec
}
```

**Playwright Trace Viewer** :
```bash
npx playwright show-trace trace.zip
```

---

## 📊 Indicateur QA Auto

**Cible** : Flaky rate < 3 % sur develop

**État actuel** : ❌ **0 test = N/A**

**Target post-implémentation** :
- 100 tests E2E
- < 3 tests flaky
- Flaky rate < 3%

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| E2E scenarios codés | 0/10 | 40% | 0 |
| Tests sur chaque PR | 0/10 | 25% | 0 |
| Coverage ≥ 70% | 0/10 | 20% | 0 |
| Retry flaky ≤ 2 | 0/10 | 10% | 0 |
| Video replay | 0/10 | 5% | 0 |
| **TOTAL** | **0/10** | 100% | **0/10** |

---

## 📋 ACTIONS PRIORITAIRES

### P0 - Cette semaine (URGENT)
- [ ] Installer Playwright
- [ ] Config playwright.config.ts
- [ ] 5 tests smoke (login, dashboard, etc.)

### P0 - Semaine prochaine
- [ ] 10 tests critical paths
- [ ] Setup E2E CI (GitHub Actions)
- [ ] Fix flaky tests

### P1 - Sprint 1
- [ ] 50 tests E2E total
- [ ] 70% critical paths coverage
- [ ] Parallel execution optimisée

### P2 - Sprint 2
- [ ] 100+ tests E2E
- [ ] Visual regression tests (Chromatic)
- [ ] Performance tests (k6)

---

## 🚦 RECOMMANDATION

**Statut** : 🔴 **CRITIQUE - Automatisation ZÉRO**

**Sans tests automatisés** :
- Régression non détectée
- Déploiement = peur
- Vélocité équipe ralentie (peur de casser)

**Effort estimé** : 3-4 semaines pour setup complet

**ROI** : Tests auto = **10× plus rapide** que tests manuels

**Priorité** : **P0 ABSOLUE**

---

**Prochaines étapes** : Consulter `10-devops-sre.md`

