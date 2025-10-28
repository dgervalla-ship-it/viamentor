# 🚗 Viamentor - Contexte Projet pour Cursor AI

## 📋 Vue d'Ensemble

**Viamentor** est une plateforme SaaS complète de gestion d'auto-écoles en Suisse, permettant de gérer les élèves, moniteurs, cours théoriques, leçons pratiques, examens, paiements et bien plus.

### Objectif Principal
Digitaliser complètement la gestion d'une auto-école avec:
- Gestion élèves/moniteurs/véhicules
- Planification cours théoriques (CTC/Premier Secours/Sensibilisation)
- Réservation leçons pratiques
- Attribution intelligente élèves-moniteurs
- Facturation & paiements
- Tableau de bord analytics
- Multi-école (franchises)

### Public Cible
- Auto-écoles suisses (FR/DE/IT/EN)
- Moniteurs indépendants
- Élèves conducteurs
- Administrateurs d'écoles
- Franchises multi-sites

---

## 🛠️ Stack Technique

### Frontend
```json
{
  "framework": "React 19 + Vite 6.2 (SPA)",
  "language": "TypeScript 5.7+",
  "styling": "Tailwind CSS 3.4+",
  "ui": "shadcn/ui + Radix UI",
  "state": "TanStack Query (React Query) + Zustand",
  "forms": "React Hook Form + Zod",
  "i18n": "Custom i18n (FR/DE/IT/EN)",
  "charts": "Recharts + ECharts + Plotly",
  "calendar": "FullCalendar + react-big-calendar",
  "icons": "Lucide React + Heroicons",
  "animations": "Framer Motion",
  "routing": "React Router DOM"
}
```

### Backend (En cours de connexion)
```json
{
  "database": "Supabase (PostgreSQL)",
  "auth": "Supabase Auth",
  "storage": "Supabase Storage",
  "api": "Supabase RLS + Edge Functions (future)",
  "email": "À définir (Resend/SendGrid)",
  "sms": "À définir (Twilio)",
  "payments": "QR-factures suisses",
  "pdf": "jsPDF + jspdf-autotable"
}
```

### DevOps
```json
{
  "hosting": "À définir (Vercel recommandé)",
  "ci_cd": "À créer (GitHub Actions)",
  "monitoring": "À définir (Sentry)",
  "analytics": "À définir (GA4)"
}
```

---

## 📁 Structure du Projet

```
viamentor/
├── src/
│   ├── components/
│   │   └── ui/                      # shadcn/ui base components (50+)
│   ├── hooks/                       # Custom React hooks
│   ├── lib/                         # Utilitaires
│   │   ├── supabase.ts             # Client Supabase
│   │   └── utils.ts                # Utilitaires
│   ├── viamentor/                    # Code métier Viamentor
│   │   ├── components/             # 370+ composants métier
│   │   ├── data/                   # 370+ fichiers data/i18n/schemas
│   │   ├── layouts/                # Layouts (MainLayout)
│   │   ├── pages/                  # 189 pages/routes
│   │   └── plans/                  # 74 docs architecture
│   ├── App.tsx                     # Router principal
│   └── main.tsx                    # Entry point
│
├── public/                          # Assets statiques
├── audit/                          # Audit professionnel complet
│   ├── 00-SOMMAIRE-AUDIT.md
│   ├── 01 à 15 audits rôles
│   ├── 99-ACTION-PLAN.md
│   └── CONTEXTE.md                # Ce fichier
│
├── .env.local                      # Config locale (NON COMMITÉ)
├── package.json                    # Dépendances
├── vite.config.ts                  # Config Vite
├── tailwind.config.js              # Config Tailwind
└── tsconfig.json                   # Config TypeScript
```

---

## 🎯 Fonctionnalités Principales

### ✅ Complétées (Phase 1 - Frontend Mock)

#### 1. **Gestion Élèves**
- CRUD élèves complet
- Profils détaillés (identité, formation, documents)
- Historique leçons/examens/paiements
- Progression formation
- Notes internes
- Import/Export CSV

#### 2. **Gestion Moniteurs**
- CRUD moniteurs
- Disponibilités calendrier
- Catégories autorisées (A/B/C/D/Moto)
- Langues parlées
- Évaluations/avis
- Performance tracking

#### 3. **Attribution Élèves-Moniteurs**
- Algorithme workload balancing intelligent
- Recommandations automatiques
- Propositions moniteurs → validation école
- Accès temporaires
- Historique complet
- Analytics attribution

#### 4. **Cours Théoriques**
- Catégories (CTC/Premier Secours/Sensibilisation/Moto)
- Types de cours (semaine/weekend/intensif)
- Structure séances multiples
- Calendrier drag & drop
- Gestion participants
- Validation présences
- Génération attestations PDF
- Email certificats

#### 5. **Planning & Leçons**
- Calendrier leçons pratiques
- Réservation/Annulation
- Détection conflits
- Export ICS
- Vue journée/semaine/mois

#### 6. **Facturation**
- Génération factures
- QR-factures suisses
- Suivi paiements
- Relances automatiques
- Analytics revenus

#### 7. **Tableau de Bord**
- Dashboard école (stats, KPIs, charts)
- Dashboard moniteur (planning, élèves)
- Dashboard élève (progression, leçons)
- Dashboard secrétaire (tâches quotidiennes)
- 15 rôles RBAC différenciés

#### 8. **Système**
- Multi-tenant architecture
- i18n FR/DE/IT/EN complet
- Notifications center
- Search global
- Quick actions bar
- Responsive mobile
- Light/Dark mode
- Onboarding wizard

### ⏳ En Cours

- Connexion backend Supabase
- Tests unitaires
- Tests E2E
- CI/CD pipeline
- Documentation utilisateur

### 🔜 À Venir (Phase 2 - Backend)

- Supabase intégration complète
- Authentication réelle
- API sécurisées
- RLS Policies
- Email/SMS intégrations
- Stripe paiements
- Tests automatisés
- Production deployment

---

## 📐 Architecture & Patterns

### Design Patterns Utilisés

1. **Component Pattern**: Composants réutilisables UI
2. **Container/Presenter**: Séparation logique/affichage
3. **Custom Hooks**: Logique métier encapsulée
4. **Service Layer**: Services métier isolés
5. **Mock/Real Toggle**: Switch mock data ↔ Supabase
6. **Strategy Pattern**: Algorithmes configurables

### Principes SOLID

- **S**ingle Responsibility: 1 composant = 1 responsabilité
- **O**pen/Closed: Extensions sans modifications
- **L**iskov Substitution: Types interchangeables
- **I**nterface Segregation: Interfaces spécifiques
- **D**ependency Inversion: Dépendre abstractions

### Clean Code Rules
```typescript
// ✅ BON: Composant 200-250 lignes max
// ✅ BON: Noms descriptifs explicites
// ✅ BON: Early returns validation
// ✅ BON: Commentaires seulement si nécessaire
// ✅ BON: Fonctions pures quand possible
// ✅ BON: TypeScript strict mode
// ✅ BON: Pas de `any` types
```

---

## 🎨 Conventions de Code

### Naming Conventions
```typescript
// Composants: PascalCase
StudentProfileCard.tsx
InstructorAssignmentWizard.tsx

// Fonctions: camelCase
calculateWorkloadScore()
generateCertificatePDF()

// Types/Interfaces: PascalCase
StudentFormData
InstructorProfile
CourseCategory

// Constants: SCREAMING_SNAKE_CASE
MAX_STUDENTS_PER_INSTRUCTOR = 12
DEFAULT_LESSON_DURATION = 50

// Fichiers services: kebab-case
assignment-algorithm.service.ts
certificates-pdf.service.ts

// Fichiers data: viamentor-*-data.ts
viamentor-students-data.ts
viamentor-courses-data.ts

// Fichiers i18n: viamentor-*-i18n.ts
viamentor-students-i18n.ts
viamentor-courses-i18n.ts
```

### File Organization
```typescript
// Structure composant type:
// 1. Imports externes
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Imports internes
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 3. Types locaux
interface StudentCardProps {
  student: Student;
  onEdit: (id: string) => void;
}

// 4. Composant principal
export function StudentCard({ student, onEdit }: StudentCardProps) {
  // Hooks
  const { data, isLoading } = useQuery(/*...*/);
  
  // Early returns
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
  
  // Event handlers
  const handleEdit = () => onEdit(student.id);
  
  // Render
  return (
    <Card>
      {/* JSX */}
    </Card>
  );
}

// 5. Exports nommés secondaires
export { type StudentCardProps };
```

### TypeScript Strict Rules
```typescript
// ❌ INTERDIT
const user: any = getUserData(); // Pas de `any`
function doSomething(data) { } // Types requis

// ✅ OBLIGATOIRE
const user: User = getUserData();
function doSomething(data: FormData): Promise<void> { }

// Type guards
if (typeof value === 'string') { }
if (Array.isArray(items)) { }
if ('email' in user) { }
```

### React Best Practices
```typescript
// ✅ Memoization composants lourds
export const StudentCard = React.memo(function StudentCard(props) {
  // ...
});

// ✅ useMemo calculs coûteux
const sortedStudents = useMemo(
  () => students.sort((a, b) => a.name.localeCompare(b.name)),
  [students]
);

// ✅ useCallback event handlers
const handleSubmit = useCallback((data: FormData) => {
  submitStudent(data);
}, [submitStudent]);

// ✅ Custom hooks logique réutilisable
function useStudentForm(initialData?: Student) {
  const [data, setData] = useState(initialData);
  // ...
  return { data, handleChange, handleSubmit };
}
```

---

## 🔧 Configuration Environnement

### Variables Environnement (`.env.local`)
```bash
# Supabase (Configuré)
VITE_SUPABASE_URL=https://jdyuulqscwxlkswmceqp.supabase.co
VITE_SUPABASE_ANON_KEY=[CONFIGURÉ]
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.jdyuulqscwxlkswmceqp.supabase.co:5432/postgres

# Future (Phase 2)
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_RESEND_API_KEY=
VITE_TWILIO_ACCOUNT_SID=
```

---

## 🚀 Commandes Utiles
```bash
# Installation
npm install

# Développement
npm run dev          # Port 5173 (Vite)

# Build production
npm run build
npm run preview

# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Tests (À créer)
npm run test
npm run test:e2e
```

---

## 📊 État Actuel du Projet

### Phase Actuelle: **PROTOTYPE AVANCÉ - Frontend Mock Data**

#### ✅ Terminé (Audit Score 4.5/10)
- [x] Architecture React + Vite
- [x] Configuration Tailwind + shadcn/ui
- [x] i18n 4 langues (FR/DE/IT/EN)
- [x] Layout Dashboard responsive
- [x] 370+ composants métier créés
- [x] 189 pages/routes définies
- [x] Mock data complet
- [x] Supabase connecté (client ready)
- [x] Git + GitHub configuré
- [x] Audit professionnel 15 rôles
- [x] Documentation technique (74 plans)

#### 🏗️ En cours (Selon audit)
- [ ] Backend API (Score 2/10) 🔴 CRITIQUE
- [ ] Tests (Score 0/10) 🔴 CRITIQUE
- [ ] CI/CD (Score 3/10) 🔴
- [ ] Compliance légale (Score 5/10) 🟡
- [ ] Analytics (Score 1/10) 🔴
- [ ] Documentation utilisateur (Score 6/10) 🟡

#### ⏰ Reste selon Plan 12 semaines
- Backend complet (4 semaines)
- Tests 80% coverage (3 semaines)
- CGU/RGPD (3 semaines)
- Validation marché (2 semaines)
- Customer Success (2 semaines)

### Prochaine Phase: **PHASE 2 - Production Ready (12 semaines)**

---

## 🎯 Objectifs Immédiats

### Pour Cursor AI, je veux que tu m'aides à:

1. **Terminer Migration Supabase**
   - Remplacer mock data par vraies queries
   - Implémenter auth flow
   - Créer migrations SQL
   - Tester connexion DB

2. **Créer Tests**
   - Installer Vitest + Playwright
   - Tests unitaires utils/hooks
   - Tests E2E parcours critiques
   - Coverage 80%+

3. **Setup CI/CD**
   - GitHub Actions workflow
   - Lint + TypeCheck + Tests
   - Deploy automatique Vercel
   - Monitoring Sentry

4. **Maintenir Qualité Code**
   - Respecter conventions naming
   - Garder composants <250 lignes
   - TypeScript strict
   - Documentation code complexe

---

## 📚 Ressources & Références

### Documentation Officielle
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- Radix UI: https://www.radix-ui.com
- TanStack Query: https://tanstack.com/query
- Supabase: https://supabase.com/docs
- React Router: https://reactrouter.com

### Inspirations Design
- SARI CTC/IPB (système suisse auto-écoles)
- Google Calendar (planning drag & drop)
- Stripe Dashboard (clean UI/UX)
- Linear (workflow fluide)

---

## ⚠️ Règles Importantes pour Cursor

### À TOUJOURS RESPECTER

1. **TypeScript Strict**: Pas de `any`, types explicites partout
2. **Composants <250 lignes**: Si plus long, découper en sous-composants
3. **Naming Conventions**: Respecter PascalCase/camelCase/kebab-case
4. **i18n**: Tout texte UI doit être dans fichiers i18n
5. **Responsive**: Mobile-first, tester 3 breakpoints
6. **Accessibility**: ARIA labels, keyboard navigation
7. **Performance**: React.memo si >100 lignes
8. **Clean Code**: Early returns, pas de nested if >3 niveaux
9. **Mock Data Phase 1**: Utiliser `data/viamentor-*-data.ts`
10. **Comments**: Seulement pour logique complexe

### À NE JAMAIS FAIRE

❌ Utiliser `any` types TypeScript  
❌ Texte hardcodé (toujours passer par i18n)  
❌ Composants >300 lignes sans découpage  
❌ Console.log en production  
❌ Inline styles (toujours Tailwind)  
❌ Nested if >3 niveaux (early returns)  
❌ Magic numbers (utiliser constantes)  
❌ Code dupliqué (extraire hooks/utils)  
❌ Imports chemins absolus sans alias @/  
❌ Modifier node_modules  

---

## 🤝 Comment M'Aider (Cursor)

### Quand je te demande du code:

1. **Comprendre le contexte**: Quelle page/feature? Quelle phase?
2. **Respecter l'architecture**: Structure dossiers existante
3. **TypeScript strict**: Types explicites, pas d'any
4. **Clean Code**: Commentaires minimum, noms descriptifs
5. **i18n ready**: Prévoir traductions 4 langues
6. **Responsive**: Mobile-first approach
7. **Performance**: Optimisations nécessaires
8. **Tester**: Vérifier TypeScript compile

### Format Réponses Idéal:
```typescript
// 1. Expliquer brièvement ce que fait le code
// 2. Fournir code complet prêt à copier-coller
// 3. Indiquer où placer le fichier
// 4. Mentionner dépendances si nécessaires
// 5. Donner exemple d'utilisation
```

---

## 📊 Résultats Audit (Score 4.5/10)

### 🟢 Points Forts
- Frontend Architect: **8/10** ⭐
- UI Designer: **8/10** ⭐
- React Developer: **7/10**
- UX Designer: **7/10**
- Architecture excellente
- Design system cohérent

### 🔴 Points Critiques
- Backend Developer: **2/10** (inexistant)
- QA Automation: **0/10** (aucun test)
- QA Manual: **1/10** (pas de plan)
- Data/Analytics: **1/10** (pas de tracking)
- DevOps: **3/10** (pas de CI/CD)

### Bloqueurs Production (Top 5)
1. Backend inexistant (4 sem, 25K CHF)
2. Aucun test (3 sem, 15K CHF)
3. CGU/Privacy manquantes (3 sem, 12K CHF)
4. Validation marché 0 (2 sem, 5K CHF)
5. Monitoring absent (1 sem, 3K CHF)

---

## 🎓 Pour Bien Démarrer

### Comprends d'abord:
1. Lis `audit/00-SOMMAIRE-AUDIT.md`
2. Explore structure `/src/viamentor/`
3. Regarde composants `/src/components/ui/`
4. Check mock data `/src/viamentor/data/`
5. Vois layouts `/src/viamentor/layouts/`

### Ensuite:
1. Identifie feature à travailler
2. Vérifie conventions naming
3. Respecte architecture existante
4. Code propre TypeScript strict
5. Test responsive + i18n

---

## 📞 Informations Complémentaires

**Projet**: Viamentor - Plateforme SaaS Auto-Écoles Suisse  
**Phase Actuelle**: Prototype Frontend (Mock Data)  
**Score Audit**: 4.5/10 (Bon prototype, incomplet production)  
**Timeline Production**: 12 semaines estimées  
**Budget Estimé**: 140'000 CHF  

**Database**: Supabase PostgreSQL (connecté, tables à créer)  
**Auth**: Supabase Auth (mock actuellement)  
**Hosting**: Local dev (Vercel future)  

---

## 🎯 Priorités Actuelles (selon audit)

### P0 - URGENT (Bloqueurs production)
1. Créer backend API (Supabase Edge Functions ou Next.js API)
2. Créer tables Supabase (migrations SQL)
3. Implémenter tests (Vitest + Playwright)
4. Rédiger CGU/Privacy Policy
5. Setup CI/CD GitHub Actions

### P1 - Important
1. Validation marché (5 interviews auto-écoles)
2. Analytics GA4
3. Monitoring Sentry
4. Documentation utilisateur
5. Customer Success onboarding

### P2 - Nice to have
1. Storybook composants
2. Performance optimization
3. A11y improvements
4. Dark mode polish
5. Mobile app (future)

---

## 🚀 Utilisation avec Cursor

### Référencer ce contexte:
```
@audit/CONTEXTE.md

[Votre question ici]
```

### Exemples questions:

**Créer composant:**
```
@audit/CONTEXTE.md

Je veux créer StudentProgressChart avec Recharts.
Où le placer et comment structurer selon conventions?
```

**Débugger:**
```
@audit/CONTEXTE.md

Erreur TypeScript StudentForm.tsx ligne 45.
Comment corriger selon typage strict?
```

**Optimiser:**
```
@audit/CONTEXTE.md

Page /students lente avec 500+ élèves.
Optimiser selon best practices?
```

**Nouvelle feature:**
```
@audit/CONTEXTE.md

Ajouter système chat moniteur-élève.
Architecture recommandée Phase 1 mock?
```

---

## 📋 Checklist Avant Production

Voir `audit/99-ACTION-PLAN.md` pour détails complets.

**Minimum viable (90/100 points requis):**
- [ ] Backend API complet (10 pts)
- [ ] Tests ≥ 80% (8 pts)
- [ ] CI/CD < 15min (5 pts)
- [ ] Monitoring 24/7 (4 pts)
- [ ] Lighthouse > 90 (3 pts)
- [ ] Pentest passé (10 pts)
- [ ] 0 vulns critical (8 pts)
- [ ] Security headers (3 pts)
- [ ] CGU publiées (8 pts)
- [ ] Privacy policy (8 pts)
- [ ] Cookie consent (5 pts)
- [ ] DPA signés (4 pts)
- [ ] 1 pilote NPS>50 (8 pts)
- [ ] Docs user (5 pts)
- [ ] Analytics (4 pts)
- [ ] Support ready (3 pts)

---

**Cursor, tu es maintenant prêt à m'aider sur Viamentor! 🚀**

**Questions? Demande-moi des précisions sur n'importe quel point.**

---

_Document créé le 28 octobre 2025_  
_Projet: Viamentor - SaaS Auto-Écoles Suisse_  
_Phase: Prototype Frontend → Production (12 semaines)_  
_Score Audit: 4.5/10 → Cible: 9/10_

