/**
 * ============================================================================
 * VIAMENTOR - CHANGELOG.md
 * ============================================================================
 *
 * Historique des versions Viamentor
 *
 * @version 1.0.0
 * @date 2025-01-19
 */

export const CHANGELOG_MD = `
# 📝 Changelog Viamentor

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [Unreleased]

### Added
- Documentation complète (ARCHITECTURE.md, API.md, DEPLOYMENT.md, CONTRIBUTING.md, CONVENTIONS.md)

---

## [1.0.0] - 2025-01-19

### 🎉 Release initiale

#### Added

**Core Features:**
- ✅ Multi-tenant architecture avec isolation complète des données
- ✅ RBAC avec 15 rôles hiérarchiques et permissions granulaires
- ✅ i18n FR/DE/IT/EN avec namespaces et formats localisés
- ✅ Thème Light/Dark avec design tokens
- ✅ Responsive design mobile-first avec touch gestures
- ✅ Accessibilité WCAG 2.1 AA

**Modules:**
- ✅ Gestion élèves (CRUD, progression, documents, factures)
- ✅ Gestion moniteurs (CRUD, planning, performance, élèves)
- ✅ Gestion véhicules (CRUD, maintenance, GPS, analytics)
- ✅ Planning (leçons pratiques, cours théoriques, drag & drop)
- ✅ Facturation (invoices, QR-bill suisse, paiements, dunning)
- ✅ Analytics (revenus, performance, examens, véhicules)
- ✅ RGPD (consentements, data subject requests, audit logs)
- ✅ Système rattrapages (crédits, expiration, analytics)
- ✅ Avis Google (collection, vérification, analytics, IA)
- ✅ CRM Prospects (pipeline, kanban, communications)
- ✅ Campagnes marketing (création, tracking, ROI)

**Dashboards:**
- ✅ Super Admin (monitoring système, tenants, sécurité)
- ✅ Platform Admin (gestion tenants, incidents, audit)
- ✅ School Admin (KPIs école, activité, performance)
- ✅ Instructor Manager (équipe moniteurs, planning, analytics)
- ✅ Marketing Manager (campagnes, prospects, ROI)
- ✅ Finance Manager (revenus, trésorerie, analytics)
- ✅ Accountant (comptabilité, rapports, TVA)
- ✅ Secretary (inscriptions, planning, communications)
- ✅ Instructor (planning, élèves, évaluations)
- ✅ Student (progression, leçons, documents, paiements)

**Technical:**
- ✅ React 18.3.1 + TypeScript 5.x
- ✅ Tailwind CSS 3.x + Shadcn UI (Hero UI)
- ✅ React Router DOM 7.x
- ✅ TanStack Query 5.x (server state)
- ✅ Zustand 5.x (client state)
- ✅ React Hook Form + Zod (validation)
- ✅ Recharts 2.x (charts)
- ✅ Vite 6.x (build tool)

#### Changed
- N/A (première version)

#### Deprecated
- N/A (première version)

#### Removed
- N/A (première version)

#### Fixed
- N/A (première version)

#### Security
- ✅ JWT authentication avec Supabase
- ✅ Row Level Security (RLS) PostgreSQL
- ✅ RBAC middleware pour routes protégées
- ✅ Validation Zod côté client et serveur
- ✅ HTTPS obligatoire en production
- ✅ Headers de sécurité (CSP, HSTS, etc.)

---

## [0.9.0] - 2025-01-15 (Beta)

### Added
- Beta testing avec 5 auto-écoles pilotes
- Feedback utilisateurs intégré
- Optimisations performance

### Fixed
- Corrections bugs critiques identifiés en beta
- Améliorations UX basées sur feedback

---

## [0.8.0] - 2025-01-10 (Alpha)

### Added
- Alpha testing interne
- Tests end-to-end complets
- Documentation utilisateur

### Fixed
- Corrections bugs identifiés en alpha
- Optimisations bundle size

---

## [0.7.0] - 2025-01-05

### Added
- Module avis Google complet
- Module CRM prospects
- Module campagnes marketing
- Analytics avancées

### Changed
- Refactoring architecture state management
- Migration vers TanStack Query v5

---

## [0.6.0] - 2024-12-20

### Added
- Module système rattrapages
- Module RGPD complet
- Dashboards rôles spécialisés
- Navigation contextuelle

### Changed
- Amélioration responsive mobile
- Optimisation touch gestures

---

## [0.5.0] - 2024-12-10

### Added
- Module analytics complet
- Module facturation avancé
- QR-bill suisse
- Import Camt.054

### Changed
- Refactoring composants tables
- Amélioration filtres et recherche

---

## [0.4.0] - 2024-12-01

### Added
- Module planning complet
- Drag & drop leçons
- Cours théoriques
- Gestion disponibilités

### Changed
- Migration React Router v7
- Amélioration navigation

---

## [0.3.0] - 2024-11-20

### Added
- Module véhicules complet
- GPS tracking
- Gestion maintenance
- Analytics utilisation

### Changed
- Amélioration wizards création
- Validation OAC renforcée

---

## [0.2.0] - 2024-11-10

### Added
- Module moniteurs complet
- Module élèves complet
- Wizards création
- Pages détail

### Changed
- Migration Shadcn UI (Hero UI)
- Amélioration design system

---

## [0.1.0] - 2024-11-01

### Added
- Architecture multi-tenant
- RBAC système
- i18n FR/DE/IT/EN
- Authentification Supabase
- Layout principal
- Dashboards basiques

---

## Types de changements

- \`Added\` : Nouvelles fonctionnalités
- \`Changed\` : Modifications de fonctionnalités existantes
- \`Deprecated\` : Fonctionnalités obsolètes (à supprimer)
- \`Removed\` : Fonctionnalités supprimées
- \`Fixed\` : Corrections de bugs
- \`Security\` : Corrections de sécurité

---

## Versioning

Viamentor suit le [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0) : Changements incompatibles
- **MINOR** (0.X.0) : Nouvelles fonctionnalités compatibles
- **PATCH** (0.0.X) : Corrections de bugs

---

## Liens

- [Unreleased]: https://github.com/viamentor/viamentor/compare/v1.0.0...HEAD
- [1.0.0]: https://github.com/viamentor/viamentor/releases/tag/v1.0.0
- [0.9.0]: https://github.com/viamentor/viamentor/releases/tag/v0.9.0
- [0.8.0]: https://github.com/viamentor/viamentor/releases/tag/v0.8.0

---

**Dernière mise à jour:** 2025-01-19  
**Version:** 1.0.0  
**Auteur:** Viamentor Team
`;

export default CHANGELOG_MD;
