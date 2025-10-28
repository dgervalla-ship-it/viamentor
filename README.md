# 🚗 Viamentor

**Plateforme SaaS multi-tenant pour la gestion complète d'auto-écoles suisses**

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-green.svg)](https://supabase.com/)

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Stack Technique](#stack-technique)
- [Installation](#installation)
- [Configuration](#configuration)
- [Développement](#développement)
- [Architecture](#architecture)
- [Documentation](#documentation)

---

## 🎯 Aperçu

Viamentor est une solution complète de gestion pour auto-écoles suisses, conforme aux réglementations OAC (Ordonnance sur l'admission à la circulation).

### Caractéristiques principales

- 🏢 **Multi-tenant** : Isolation complète des données par école
- 🔐 **RBAC** : 15 rôles hiérarchiques (Super Admin → Guest)
- 🌍 **i18n** : Support FR/DE/IT/EN complet
- 📱 **Responsive** : Desktop, tablette, mobile
- ♿ **Accessible** : WCAG 2.1 AA compliance
- 🎨 **Themable** : Light/Dark mode

---

## ✨ Fonctionnalités

### Pour les Auto-Écoles

- 📊 **Dashboard** : KPIs temps réel, analytics avancées
- 👨‍🎓 **Gestion Élèves** : Dossiers complets, progression, historique
- 👨‍🏫 **Gestion Moniteurs** : Planning, performance, évaluations
- 🚗 **Gestion Véhicules** : Maintenance, inspections, utilisation
- 📅 **Planning** : Calendrier intelligent avec détection conflits
- 💰 **Facturation** : QR-factures suisses, rappels automatiques
- 📈 **Analytics** : Revenus, conversion, prévisions IA
- 🔒 **RGPD** : Conformité complète nDSG

### Pour les Moniteurs

- 📅 **Mon Planning** : Leçons du jour, semaine, mois
- 👥 **Mes Élèves** : Liste, progression, historique
- ⚡ **Actions Rapides** : Réserver leçon, noter absence
- 📊 **Performance** : Stats personnelles, objectifs

### Pour les Élèves

- 📖 **Mon Parcours** : Progression, étapes franchies
- 📅 **Mes Leçons** : Réserver, annuler, historique
- 💳 **Facturation** : Solde, paiements, factures
- 📄 **Documents** : Permis d'élève, certificats

---

## 🛠 Stack Technique

### Frontend

- **React 19** : Library UI
- **TypeScript** : Type safety
- **Vite** : Build tool ultra-rapide
- **React Router** : Routing SPA
- **TanStack Query** : Server state management
- **Zustand** : Client state management
- **Tailwind CSS** : Styling utility-first
- **Shadcn/ui** : Composants UI accessibles
- **Framer Motion** : Animations fluides

### Backend (À venir)

- **Supabase** : BaaS (Auth + PostgreSQL + Storage)
- **PostgreSQL** : Base de données relationnelle
- **Row Level Security** : Sécurité au niveau des lignes

### DevOps

- **Git** : Versioning
- **GitHub** : Repository & CI/CD
- **Vite** : HMR pour dev rapide

---

## 🚀 Installation

### Prérequis

- **Node.js** : v18+ recommandé
- **npm** ou **yarn** ou **pnpm**
- **Git** : Pour cloner le projet

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/VOTRE_USERNAME/viamentor.git
cd viamentor

# 2. Installer les dépendances
npm install

# 3. Copier le fichier d'environnement
cp .env.example .env.local

# 4. Configurer Supabase (voir Configuration ci-dessous)

# 5. Démarrer le serveur de développement
npm run dev
```

Le serveur sera accessible sur : **http://localhost:5173**

---

## ⚙️ Configuration

### 1. Configuration Supabase

Créez un fichier `.env.local` avec vos credentials :

```bash
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

**📖 Voir le guide complet : [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

### 2. Créer les tables

Exécutez les migrations SQL dans **Supabase Dashboard > SQL Editor** :

```sql
-- Voir src/viamentor/data/viamentor-schema-migrations-001.ts
-- pour le schéma complet
```

### 3. Créer votre premier tenant

```sql
INSERT INTO tenants (name, slug, canton, plan, status)
VALUES ('Auto-École Genève', 'auto-ecole-geneve', 'GE', 'professional', 'active');
```

---

## 💻 Développement

### Scripts disponibles

```bash
# Développement avec HMR
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint
```

### Mode Développement (Mock)

Par défaut, le projet utilise des **données simulées** (localStorage) :

- Aucune connexion réseau requise
- 4 utilisateurs de test préconfigurés
- Parfait pour développement rapide

**Page de démo** : http://localhost:5173/supabase-demo

### Utilisateurs de test (Mock)

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| admin@viamentor.ch | viamentor2025 | Platform Admin |
| school@viamentor.ch | viamentor2025 | School Admin |
| instructor@viamentor.ch | viamentor2025 | Instructor |
| student@viamentor.ch | viamentor2025 | Student |

---

## 🏗 Architecture

```
viamentor/
├── src/
│   ├── components/        # Composants UI Shadcn/ui
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilitaires (Supabase, utils)
│   ├── viamentor/          # Code métier Viamentor
│   │   ├── components/   # 370+ composants métier
│   │   ├── data/         # 370+ fichiers data/i18n/schemas
│   │   ├── layouts/      # Layouts (MainLayout)
│   │   ├── pages/        # 189 pages/routes
│   │   └── plans/        # 74 docs architecture
│   ├── App.tsx           # Router principal
│   └── main.tsx          # Entry point
├── public/               # Assets statiques
├── .env.local           # Config locale (NON COMMITÉ)
├── package.json         # Dépendances
└── vite.config.ts       # Config Vite
```

### Patterns clés

- **Isolation multi-tenant** : Toutes les requêtes DB filtrées par `tenant_id`
- **RBAC granulaire** : Vérification permissions à chaque action
- **i18n namespaces** : Traductions organisées par domaine
- **Mock/Real toggle** : Basculer facilement mock ↔ Supabase

---

## 📚 Documentation

### Guides disponibles

- 📖 **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** : Configuration Supabase
- 🏗️ **[src/viamentor/data/viamentor-docs-architecture.ts](./src/viamentor/data/viamentor-docs-architecture.ts)** : Architecture complète
- 🔐 **[src/viamentor/data/viamentor-security-readme.ts](./src/viamentor/data/viamentor-security-readme.ts)** : Sécurité & RBAC
- 🌍 **[src/viamentor/data/viamentor-i18n-complete-guide.ts](./src/viamentor/data/viamentor-i18n-complete-guide.ts)** : Internationalisation

### Pages de démo

- `/supabase-demo` : Configuration auth & DB
- `/layout-demo` : Démo layout & navigation
- `/quick-actions-demo` : Barre actions rapides
- `/navigation-demo` : Navigation complète

---

## 🔒 Sécurité

### ⚠️ IMPORTANT : Ne JAMAIS commit

```
.env
.env.local
.env.*.local
```

Ces fichiers contiennent vos secrets (mots de passe, clés API).

Le `.gitignore` est configuré pour les protéger automatiquement.

### Clés sécurisées

- ✅ `VITE_SUPABASE_URL` : Publique (OK)
- ✅ `VITE_SUPABASE_ANON_KEY` : Publique (protégée par RLS)
- ❌ `DATABASE_URL` : PRIVÉE (mot de passe PostgreSQL)
- ❌ `SUPABASE_SERVICE_ROLE_KEY` : PRIVÉE (bypass RLS)

---

## 🤝 Contribution

### Workflow Git

```bash
# 1. Créer une branche
git checkout -b feature/ma-feature

# 2. Faire vos modifications

# 3. Commit
git add .
git commit -m "feat: description de la feature"

# 4. Push
git push origin feature/ma-feature

# 5. Créer une Pull Request sur GitHub
```

### Convention de commits

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, style
- `refactor:` Refactoring code
- `test:` Ajout tests
- `chore:` Tâches maintenance

---

## 📝 License

Propriétaire - Tous droits réservés

---

## 📧 Contact

Pour toute question : **admin@viamentor.ch**

---

**Développé avec ❤️ pour les auto-écoles suisses**
