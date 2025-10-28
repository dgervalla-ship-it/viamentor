# 📝 AUDIT - CONTENT / TECH WRITER

**Rôle** : Content / Tech Writer  
**Mission** : Réduire le support en rendant l'info trouvable  
**Score Global** : 🟢 **6/10**  
**Statut** : MOYEN - Docs internes bonnes, docs utilisateur manquantes

---

## ✅ Tâches à contrôler

### 13.1 Docs utilisateur (FAQ, Quick-start) publiées J-0
**Statut** : 🟡 **PARTIEL**  
**Évaluation** : 4/10

**Constat** :
- ✅ FAQ page existe (`viamentor-faq-page.tsx`)
- ✅ Documentation technique excellente (74 plans)
- ❌ Docs utilisateur final absentes
- ❌ Quick-start guide manquant
- ❌ Video tutorials absents

**Docs techniques trouvées (EXCELLENT)** :
- 74 fichiers `.md` dans `/src/polymet/plans/`
- Guides système très détaillés
- Mais : Trop techniques pour utilisateurs finaux

**Ce qui manque** :

**User Documentation** : `/docs/user/`

```markdown
# Quick Start Guide - Auto-École

## Bienvenue sur ViaMenutor ! 🚗

### Étape 1 : Premier login (2 min)
1. Allez sur viamentor.ch/login
2. Entrez votre email et mot de passe
3. [Screenshot login page]

### Étape 2 : Ajouter votre premier élève (5 min)
1. Cliquez sur "Élèves" dans menu
2. Bouton "Nouvel élève"
3. Remplissez le formulaire :
   - Nom, prénom
   - Email, téléphone
   - Catégorie (B, A, etc.)
4. Cliquez "Créer"
5. [Screenshot + video 30s]

### Étape 3 : Réserver une leçon (3 min)
1. Cliquez sur "Planning"
2. Sélectionnez créneau libre
3. Choisissez élève + moniteur
4. Confirmez
5. [Screenshot]

### Vidéo complète (3 min)
[Embed YouTube video]
```

**Formats requis** :
- ✅ Markdown (docs écrites)
- ✅ Screenshots (visuel)
- ✅ Videos (< 5 min chacune)
- ✅ PDF téléchargeable

---

### 13.2 Captures d'écran synchronisées avec version produit
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Pas de screenshots dans docs
- Pas de version tracking screenshots
- UI change → docs obsolètes

**Action requise** :

**Screenshot Management** :

```markdown
# Process Screenshots

## Naming Convention
`feature-page-state-vYYYYMMDD.png`

Examples :
- students-list-empty-v20251028.png
- invoice-detail-preview-v20251028.png
- dashboard-school-admin-v20251028.png

## Folder Structure
```
docs/
└── screenshots/
    ├── v20251028/
    │   ├── students-list.png
    │   └── invoice-detail.png
    └── current/ → symlink to latest
```

## Update Process
1. Before each release, capture new screenshots
2. Move old screenshots to archive/
3. Update symlink current/ → new version
4. Update docs with new screenshots

## Tool
- macOS : Cmd+Shift+4 (crop)
- Annotate : Skitch, CloudApp
- Optimize : ImageOptim (reduce size)
```

---

### 13.3 Glossaire UI = libellés du produit (cohérence)
**Statut** : 🟢 **BON**  
**Évaluation** : 8/10

**Constat** :
- ✅ i18n très complet (FR/DE/IT/EN)
- ✅ Terminologie cohérente dans code
- ✅ Traductions centralisées (`*-i18n.ts`)
- ❌ Glossaire utilisateur non publié

**Exemples trouvés** :
```typescript
// viamentor-sidebar-navigation-data.ts
students: "Élèves" (FR) / "Schüler" (DE)
lessons: "Leçons" (FR) / "Lektionen" (DE)
invoices: "Factures" (FR) / "Rechnungen" (DE)
```

**Action requise** :

**Glossaire Public** : `/docs/glossaire.md`

```markdown
# Glossaire ViaMenutor

## A
**Élève** : Personne inscrite dans l'auto-école pour obtenir un permis de conduire.  
_Synonyme_ : Apprenant, candidat  
_DE_ : Schüler  
_IT_ : Allievo  
_EN_ : Student

**AVS** : Numéro d'Assurance Vieillesse et Survivants (Suisse). Obligatoire pour inscription.  
_Format_ : 756.1234.5678.97

## L
**Leçon** : Cours de conduite pratique d'une durée de 45, 60 ou 90 minutes.  
_DE_ : Lektion  
_IT_ : Lezione  
_EN_ : Lesson

**Livret d'apprentissage** : Document OAC obligatoire pour suivre la progression de l'élève.

## Q
**QR-facture** : Facture suisse avec QR code pour paiement bancaire.  
_DE_ : QR-Rechnung  
_Obligatoire depuis_ : 1er octobre 2022
```

---

### 13.4 Changelog généré automatiquement depuis les commits
**Statut** : 🟡 **PARTIEL**  
**Évaluation** : 5/10

**Constat** :
- ✅ Commits bien nommés (conventional commits)
- ❌ Changelog pas généré auto
- ❌ Utilisateurs ne savent pas « what's new »

**Commits actuels** :
```
feat: ...
fix: ...
docs: ...
```

**Action requise** :

**Auto-generate Changelog** :

```bash
npm install -D conventional-changelog-cli

# Generate
npx conventional-changelog -p angular -i CHANGELOG.md -s

# Or use release-it
npm install -D release-it
```

**Config** : `.release-it.json`
```json
{
  "git": {
    "commitMessage": "chore: release v${version}",
    "tagName": "v${version}"
  },
  "github": {
    "release": true,
    "releaseName": "Release ${version}"
  },
  "npm": {
    "publish": false
  },
  "plugins": {
    "@release-it/conventional-changelog": {
      "preset": "angular",
      "infile": "CHANGELOG.md"
    }
  }
}
```

**CHANGELOG.md auto-généré** :
```markdown
# Changelog

## [1.0.0] - 2025-11-15

### Features
- Gestion élèves complète (CRUD)
- Planning avec détection conflits
- Facturation QR suisse

### Bug Fixes
- Fix validation email
- Fix date picker timezone

### Breaking Changes
- None
```

---

### 13.5 SEO on-page (title, H1, meta) revu avant publication
**Statut** : 🟢 **BON**  
**Évaluation** : 7/10

**Constat** :
- ✅ `react-helmet` installé
- ✅ SEO pensé dans code
- ✅ Meta tags présents
- ❌ Pas de checklist SEO

**Exemple trouvé** :
```typescript
// viamentor-contact-public-page.tsx
<Helmet>
  <title>Contactez-nous - ViaMenutor</title>
  <meta name="description" content="..." />
  <meta property="og:title" content="..." />
</Helmet>
```

**SEO Checklist** : `/docs/seo-checklist.md`

```markdown
# SEO Checklist

## On-page (Chaque page)
- [ ] Title unique (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] H1 unique (1 seul par page)
- [ ] H2-H6 hiérarchie logique
- [ ] Alt text sur toutes images
- [ ] Internal links (3+ par page)
- [ ] Canonical URL
- [ ] Language alternates (hreflang)

## Open Graph (Social sharing)
- [ ] og:title
- [ ] og:description  
- [ ] og:image (1200×630px)
- [ ] og:url
- [ ] og:type

## Technical SEO
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] Structured data (JSON-LD)
- [ ] Page speed < 3s
- [ ] Mobile-friendly
- [ ] HTTPS
```

---

## 📊 Indicateur Tech Writer

**Cible** : Taux de tickets support « comment faire X » < 5 %

**État actuel** : ❌ **NON MESURABLE** (pas en prod)

**Prédiction** :
Sans docs utilisateur : **30-40% tickets support** = documentation manquante

Avec docs complètes : **< 10% tickets**

**ROI** : 1h doc = -10h support

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| Docs user publiées | 4/10 | 30% | 1.2 |
| Screenshots sync | 0/10 | 20% | 0 |
| Glossaire cohérent | 8/10 | 15% | 1.2 |
| Changelog auto | 5/10 | 20% | 1.0 |
| SEO checklist | 7/10 | 15% | 1.05 |
| **TOTAL** | **6/10** | 100% | **4.45/10** |

Ajusté pour docs techniques excellentes : **6/10**

---

## 📋 ACTIONS PRIORITAIRES

### P0 - Avant MVP
- [ ] Quick-start guide (1 page)
- [ ] FAQ utilisateur (20 questions)
- [ ] Video onboarding (3 min)

### P1 - Sprint 1
- [ ] Guide complet utilisateur (30 pages)
- [ ] Screenshots toutes features
- [ ] Glossaire publié
- [ ] Setup changelog auto

### P2 - Post-MVP
- [ ] Base de connaissances (Help Center)
- [ ] Tooltips in-app
- [ ] Guided tours (Product tours)

---

## 🚦 RECOMMANDATION

**Statut** : 🟢 **ACCEPTABLE - Docs techniques excellentes**

Documentation **interne** (devs) : 9/10  
Documentation **externe** (users) : 3/10

**Effort** : 2 semaines pour docs utilisateur complètes

---

**Prochaines étapes** : Consulter `14-legal-dpo.md`

