# 📝 AUDIT - PRODUCT OWNER

**Rôle** : Product Owner  
**Mission** : Traduire la vision en backlog prêt à coder  
**Score Global** : 🟡 **5/10**  
**Statut** : MOYEN - Amélioration nécessaire

---

## ✅ Tâches à contrôler

### 2.1 User stories format INVEST + critères d'acceptation mesurables
**Statut** : 🟡 **PARTIEL**  
**Évaluation** : 5/10

**Constat** :
- ✅ Guides détaillés existent (ex: `viamentor-*-guide.ts`)
- ✅ Spécifications techniques claires
- ❌ Format INVEST non respecté
- ❌ Critères d'acceptation non mesurables
- ❌ Stories pas dans un outil de gestion (Jira, Linear, etc.)

**Exemples trouvés** :

**❌ Mauvais (actuel)** :
```
Guide: viamentor-student-detail-page
- Afficher infos élève
- Tabs pour progression, factures, documents
- ...
```

**✅ Bon (attendu)** :
```
US-001 : Consulter le dossier d'un élève

En tant que secrétaire d'auto-école,
Je veux voir toutes les informations d'un élève sur une page,
Afin de répondre rapidement aux questions sans chercher dans plusieurs endroits.

Critères d'acceptation (mesurables) :
- [ ] Le chargement de la page prend < 2 secondes
- [ ] Les 6 onglets (Info, Planning, Progression, Factures, Documents, Historique) sont visibles
- [ ] Cliquer sur un onglet charge son contenu en < 500 ms
- [ ] Les infos affichées sont à jour (max 1 min de cache)
- [ ] Le bouton "Modifier" ouvre le formulaire d'édition
- [ ] 95% des utilisateurs trouvent l'info cherchée sans aide

INVEST Check :
✅ Independent : Pas de dépendance blocking
✅ Negotiable : Nombre d'onglets ajustable
✅ Valuable : Gain temps 5 min/recherche × 10/jour = 50 min/jour
✅ Estimable : 5 points (2-3 jours)
✅ Small : Livrable en 1 sprint
✅ Testable : Critères mesurables ci-dessus
```

**Action requise** :
1. Convertir les 189 guides en user stories INVEST
2. Ajouter critères d'acceptation mesurables
3. Importer dans outil de gestion (GitHub Projects, Linear, Jira)

**Fichiers à créer** : `/backlog/stories/`

---

### 2.2 Maquettes ou wireframes attachées à chaque US > 5 pts
**Statut** : 🟢 **BON**  
**Évaluation** : 7/10

**Constat** :
- ✅ Code contient les composants UI complets
- ✅ Design system Shadcn/ui utilisé
- ✅ Composants = wireframes « vivants »
- ❌ Pas de maquettes Figma formelles
- ❌ Lien maquette ↔ story absent

**Points positifs** :
- Code UI très détaillé (ex: `viamentor-student-detail-page.tsx` = 500+ lignes)
- Tous les états (loading, error, empty) gérés
- Responsive design implémenté

**Action requise** :
1. Créer librairie Figma (rétrospective)
2. Lier chaque US > 5 pts à une maquette/composant
3. Template story avec champ "Design Link"

---

### 2.3 Définition of Done (DoD) signée par dev & QA
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Aucun document DoD trouvé
- Pas de checklist standard
- Risque : chaque dev a sa propre définition de « fini »

**Impact** :
- ⚠️ Qualité variable entre features
- ⚠️ Bugs en prod (aucun test requis)
- ⚠️ Dette technique accumulée

**Action requise** :

Créer `/docs/definition-of-done.md` :

```markdown
# Definition of Done (DoD)

Une user story est DONE si et seulement si :

## Code
- [ ] Code review approuvée (≥ 2 reviewers)
- [ ] Tests unitaires écrits (couverture ≥ 80%)
- [ ] Tests d'intégration passent (si applicable)
- [ ] Aucun warning ESLint/TypeScript
- [ ] Code documenté (JSDoc sur fonctions publiques)

## Qualité
- [ ] Tests E2E sur parcours critique passent
- [ ] Lighthouse score ≥ 90 (perf, a11y, SEO, best practices)
- [ ] Testé sur 3 navigateurs (Chrome, Safari, Firefox)
- [ ] Testé sur mobile (iOS + Android)
- [ ] Aucun bug P0/P1 ouvert

## UX/UI
- [ ] Conforme maquette Figma (≤ 2px diff)
- [ ] États loading/error/empty gérés
- [ ] Animations fluides (60 fps)
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Responsive (mobile, tablet, desktop)

## Documentation
- [ ] README mis à jour (si nouvelle feature)
- [ ] CHANGELOG.md complété
- [ ] Storybook story créée (si composant UI)
- [ ] Docs utilisateur rédigées (si feature user-facing)

## Sécurité & Compliance
- [ ] Audit sécurité passé (SAST scan)
- [ ] Données sensibles chiffrées
- [ ] RGPD : consentement géré (si collecte données)
- [ ] Logs audit créés (actions admin)

## Production
- [ ] Feature flag activé (si risque)
- [ ] Monitoring/alertes configurés
- [ ] Rollback plan documenté
- [ ] Déployé sur staging + validé
- [ ] PO a accepté la démo

Signée par :
- Dev Lead : ___________
- QA Lead : ___________
- PO : ___________
```

---

### 2.4 Refinement backlog ≤ 2 sprints d'avance
**Statut** : ⚠️ **NON APPLICABLE**  
**Évaluation** : N/A

**Constat** :
- Pas de sprints définis
- Pas de backlog structuré
- Développement semble fait en « waterfall »

**Action requise** :
1. Adopter méthodologie Scrum (sprints 2 semaines)
2. Grooming session hebdo (2h)
3. Maintenir pipeline : Icebox → Backlog → Ready → In Progress → Done

---

### 2.5 Mapping des dépendances externes (API, juridique, paiement)
**Statut** : 🟢 **BON**  
**Évaluation** : 8/10

**Constat** :
- ✅ Dépendances techniques bien documentées
- ✅ Supabase comme BaaS identifié
- ✅ QR-factures suisses spécifiées
- ✅ Conformité OAC/nDSG mentionnée
- ❌ Pas de backup plan si Supabase down

**Dépendances identifiées** :

| Type | Service | Criticité | Backup |
|------|---------|-----------|--------|
| Auth | Supabase Auth | P0 | ❌ Aucun |
| DB | Supabase PostgreSQL | P0 | ❌ Aucun |
| Storage | Supabase Storage | P1 | AWS S3 possible |
| Email | À définir | P1 | SendGrid, Postmark |
| SMS | À définir | P2 | Twilio, Vonage |
| Paiement | QR-factures | P0 | Manuel fallback |
| Maps | À définir | P2 | Google Maps, Mapbox |

**Action requise** :
1. Documenter plan de contingence si Supabase indisponible
2. Choisir providers Email/SMS
3. Tester génération QR-factures suisses réelles

**Fichier à créer** : `/docs/external-dependencies.md`

---

## 📊 Indicateur PO

**Cible** : Ratio « story remise en refinement » < 10 %

**État actuel** : ❌ **NON MESURABLE** (pas de sprint tracking)

**Hypothèse** :
Si on lance des sprints maintenant, avec le niveau de détail actuel des guides :
- Estimation : 20-30% remises en refinement
- Raison : Manque critères acceptation mesurables

**Action** : Mettre en place tracking avec GitHub Projects ou Linear

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| User stories INVEST | 5/10 | 30% | 1.5 |
| Maquettes attachées | 7/10 | 20% | 1.4 |
| DoD signée | 0/10 | 20% | 0 |
| Refinement backlog | 0/10 | 15% | 0 |
| Mapping dépendances | 8/10 | 15% | 1.2 |
| **TOTAL** | **5/10** | 100% | **4.1/10** |

---

## 📋 ACTIONS PRIORITAIRES

### P0 - Cette semaine
- [ ] Créer Definition of Done
- [ ] Définir MVP (max 40 stories)
- [ ] Convertir top 10 features en user stories INVEST

### P1 - Semaine prochaine  
- [ ] Setup GitHub Projects ou Linear
- [ ] Planifier Sprint 1 (2 semaines)
- [ ] Grooming session 1 (affiner 20 stories)

### P2 - Dans 2 semaines
- [ ] Backlog prêt pour 2 sprints
- [ ] Mapping dépendances complet
- [ ] Critères acceptation sur toutes stories > 5 pts

---

## 🚦 RECOMMANDATION

**Statut** : 🟡 **ACCEPTABLE pour prototype, INSUFFISANT pour production**

Le travail de conception est excellent, mais **manque de formalisme Agile**.

**Actions bloquantes** :
1. Créer DoD (1 heure)
2. Définir MVP (4 heures)
3. Convertir top 10 en vraies user stories (2 jours)

**Sans ces actions** : Risque de développement anarchique, bugs, délais non tenus.

---

**Prochaines étapes** : Consulter `03-ux-designer.md`

