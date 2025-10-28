# 🧪 AUDIT - QA MANUAL TESTER

**Rôle** : QA Manual Tester  
**Mission** : Détecter les défauts avant les utilisateurs  
**Score Global** : 🔴 **1/10**  
**Statut** : CRITIQUE - Aucun process QA

---

## ✅ Tâches à contrôler

### 8.1 Plan de test écrit 24 h après fin de refinement
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Aucun plan de test trouvé
- Aucune user story avec test cases
- Testing ad-hoc probable
- Pas de traçabilité

**Impact** :
- 🔴 Coverage test inconnue
- 🔴 Zones non testées = bugs prod
- 🔴 Régression non détectée

**Action requise** :

**Template Plan de Test** : `/tests/manual/test-plan-template.md`

```markdown
# Test Plan : US-001 Consulter dossier élève

## User Story
En tant que secrétaire, je veux voir le dossier complet d'un élève...

## Scope
- Page Student Detail (/students/:id)
- Tabs : Info, Planning, Progression, Factures, Documents, Historique

## Test Cases

### TC-001 : Charger page student detail
**Preconditions** : 
- User logged in as secretary
- Student ID exists

**Steps** :
1. Navigate to /students/123
2. Verify page loads

**Expected** :
- Page loads in < 2s
- Student name displayed in header
- 6 tabs visible

**Actual** : ___________
**Status** : ☐ Pass ☐ Fail

### TC-002 : Switcher entre tabs
**Steps** :
1. Click "Planning" tab
2. Verify content loads
3. Click "Factures" tab
4. Verify content loads

**Expected** :
- Tab content loads < 500ms
- Previous tab content cleared
- Active tab highlighted

---

## Test Matrix

| Feature | Chrome | Safari | Firefox | Mobile |
|---------|--------|--------|---------|--------|
| Load page | ☐ | ☐ | ☐ | ☐ |
| Switch tabs | ☐ | ☐ | ☐ | ☐ |
| Edit student | ☐ | ☐ | ☐ | ☐ |

## Defects Found
- [ ] BUG-001 : ...

## Sign-off
QA : ___________ Date : ___________
PO : ___________ Date : ___________
```

**Fichiers à créer** :
- `/tests/manual/` folder
- 1 plan de test par user story > 5 pts

---

### 8.2 Cas d'edge documentés (empty state, 404, 5××)
**Statut** : 🟢 **BON**  
**Évaluation** : 8/10

**Constat** :
- ✅ Empty states gérés dans le code
- ✅ Error states gérés
- ✅ Loading states présents
- ❌ Non documentés dans test plan

**Exemples trouvés dans le code** :

```typescript
// Empty state
{students.length === 0 ? (
  <EmptyState 
    title="Aucun élève"
    description="Commencez par ajouter votre premier élève"
    action={<Button>Ajouter élève</Button>}
  />
) : (
  <StudentsTable data={students} />
)}

// Error state
{error && (
  <Alert variant="destructive">
    <AlertTitle>Erreur</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert>
)}

// Loading state
{isLoading && <Skeleton />}
```

**Edge cases identifiés (non documentés)** :
1. **Empty state** : 0 students, 0 lessons, 0 invoices
2. **Error 404** : Student not found, Page not found
3. **Error 403** : Permission denied
4. **Error 500** : Server error
5. **Network offline** : No connection
6. **Session expired** : Re-login required

**Action requise** :

**Checklist Edge Cases** :
```markdown
# Edge Cases Checklist (per feature)

## Data States
- [ ] Empty state (0 items)
- [ ] Single item
- [ ] Many items (>100)
- [ ] Partial data (some fields null)

## Error States
- [ ] 400 Bad Request
- [ ] 401 Unauthorized
- [ ] 403 Forbidden
- [ ] 404 Not Found
- [ ] 500 Server Error
- [ ] Network timeout
- [ ] Network offline

## Loading States
- [ ] Initial load
- [ ] Refetch
- [ ] Infinite scroll
- [ ] Skeleton UI shown

## Input Validation
- [ ] Empty input
- [ ] Invalid format
- [ ] Duplicate value
- [ ] Max length exceeded
```

**Fichier** : `/tests/edge-cases-checklist.md`

---

### 8.3 Session d'exploratory test ≥ 30 min / US complexe
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Aucune session exploratory documentée
- Pas de charter défini
- Risque : bugs UX non découverts

**Action requise** :

**Exploratory Testing Charter** :

```markdown
# Exploratory Test Session

**Date** : 2025-11-01  
**Tester** : Marie Dupont  
**Duration** : 60 min  
**Target** : Student Detail Page  

## Mission
Découvrir comment la page se comporte dans des situations non-scriptatées.

## Areas to Explore
1. Tab switching rapide (stress test)
2. Refresh page au milieu d'edit
3. Browser back/forward buttons
4. Multiple tabs open (same student)
5. Offline mode
6. Copy/paste dans formulaires

## Bugs Found
1. **BUG-045** : Tab content flickers si switch rapide
   Severity : P3 (cosmetic)
   Repro : Click tabs < 100ms apart
   
2. **BUG-046** : Data lost si refresh pendant edit
   Severity : P1 (data loss)
   Repro : Edit student → F5 → changes lost

## Notes
- Performance bonne sur desktop
- Mobile tabs peu utilisables (trop petits)
- Keyboard navigation OK

## Recommendations
- Add auto-save
- Fix mobile tab size
- Debounce tab switching
```

**Fréquence** : 
- US simple (< 3 pts) : 15 min exploratory
- US complexe (≥ 5 pts) : 30-60 min exploratory

---

### 8.4 Bug logué avec repro steps + screenshot + device/os
**Statut** : ⚠️ **PROCESS ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Pas d'outil bug tracking configuré (GitHub Issues pas utilisé)
- Pas de template bug report
- Qualité bugs inconnue

**Action requise** :

**GitHub Issue Template** : `.github/ISSUE_TEMPLATE/bug_report.yml`

```yaml
name: 🐛 Bug Report
description: Signaler un bug
labels: ["bug", "needs-triage"]
body:
  - type: textarea
    id: description
    attributes:
      label: Description
      description: Décrivez le bug
    validations:
      required: true
      
  - type: textarea
    id: repro
    attributes:
      label: Steps to Reproduce
      description: Comment reproduire le bug
      value: |
        1. Go to '...'
        2. Click on '...'
        3. See error
    validations:
      required: true
      
  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: Comportement attendu
      
  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: Comportement réel
      
  - type: dropdown
    id: severity
    attributes:
      label: Severity
      options:
        - P0 - Critical (production down)
        - P1 - High (core feature broken)
        - P2 - Medium (workaround exists)
        - P3 - Low (cosmetic)
        
  - type: input
    id: device
    attributes:
      label: Device
      placeholder: "MacBook Pro 2023, iPhone 15"
      
  - type: input
    id: os
    attributes:
      label: OS
      placeholder: "macOS 14.6, iOS 18"
      
  - type: input
    id: browser
    attributes:
      label: Browser
      placeholder: "Chrome 120, Safari 17.5"
```

---

### 8.5 Matrice de couverture navigateur (Chrome, Safari, Edge, Firefox mobile)
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Tests multi-navigateurs non documentés
- Probablement testé que sur Chrome (dev browser)
- Risque : bugs Safari, Firefox

**Action requise** :

**Test Matrix** : `/tests/browser-compatibility-matrix.md`

```markdown
# Browser Compatibility Matrix

## Desktop
| Feature | Chrome 120+ | Safari 17+ | Firefox 120+ | Edge 120+ |
|---------|-------------|------------|--------------|-----------|
| Login | ☐ | ☐ | ☐ | ☐ |
| Dashboard | ☐ | ☐ | ☐ | ☐ |
| Student CRUD | ☐ | ☐ | ☐ | ☐ |
| Planning | ☐ | ☐ | ☐ | ☐ |
| Invoicing | ☐ | ☐ | ☐ | ☐ |

## Mobile
| Feature | iOS Safari | Android Chrome | Android Firefox |
|---------|------------|----------------|-----------------|
| Login | ☐ | ☐ | ☐ |
| Dashboard | ☐ | ☐ | ☐ |
| Student view | ☐ | ☐ | ☐ |

## Known Issues
- Safari : ...
- Firefox : ...
```

**Tool recommandé** : BrowserStack ou LambdaTest

---

## 📊 Indicateur QA

**Cible** : Fuite de bug ≥ P3 en prod < 1 par sprint

**État actuel** : ❌ **NON MESURABLE**

**Prédiction** : Sans QA systématique, **5-10 bugs/sprint** en prod

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| Plan de test | 0/10 | 30% | 0 |
| Edge cases docs | 8/10 | 25% | 2.0 |
| Exploratory tests | 0/10 | 20% | 0 |
| Bug logging process | 0/10 | 15% | 0 |
| Browser matrix | 0/10 | 10% | 0 |
| **TOTAL** | **1/10** | 100% | **2.0/10** |

Ajusté pour edge cases dans code : **1/10**

---

## 📋 ACTIONS PRIORITAIRES

### P0 - Cette semaine (CRITIQUE)
- [ ] Créer GitHub Issue templates (bug + feature)
- [ ] Plan de test pour top 5 features
- [ ] Exploratory session 2h (découverte bugs)

### P0 - Semaine prochaine
- [ ] Test chaque US avant merge
- [ ] Browser compatibility matrix
- [ ] Bug bash session (toute l'équipe)

### P1 - Continu
- [ ] Test plan pour chaque nouvelle US
- [ ] Exploratory 30min/US complexe
- [ ] Régression suite maintenue

---

## 🚦 RECOMMANDATION

**Statut** : 🔴 **CRITIQUE - QA inexistant**

Sans QA manuelle, **bugs massifs garantis** en production.

**Effort estimé** : 1 QA temps plein pendant 4 semaines

**Alternative** : Chaque dev fait sa propre QA (moins efficace)

---

**Prochaines étapes** : Consulter `09-qa-automation.md`

