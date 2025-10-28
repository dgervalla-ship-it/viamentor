/**
 * VIAMENTOR - Layout System README
 * Guide complet d'utilisation du système de layout
 */

export const LAYOUT_README = `
# Layout Principal Viamentor

## 📋 Vue d'ensemble

Le Layout Principal Viamentor est un système complet de mise en page pour applications multi-tenant avec:
- **Sidebar** navigation RBAC (280px, collapsible)
- **Header** global avec breadcrumb, search, notifications
- **Main** content area scrollable avec ErrorBoundary et Suspense
- **Routing** multi-tenant: \`/[locale]/[tenant]/...\`
- **Auth** Supabase avec validation tenant
- **i18n** support FR/DE/IT/EN
- **Theme** clair/sombre/système

---

## 🚀 Quick Start

### 1. Importer le Layout

\`\`\`tsx
import { ViamentorMainLayout } from "@/polymet/layouts/viamentor-main-layout";

export default function MyPage() {
  return (
    <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
      <div>
        <h1>Mon contenu de page</h1>
      </div>
    </ViamentorMainLayout>
  );
}
\`\`\`

### 2. Utiliser dans le Prototype

\`\`\`tsx
import { ViamentorMainLayout } from "@/polymet/layouts/viamentor-main-layout";
import { MyPage } from "@/polymet/pages/my-page";

<Route
  path="/my-page"
  element={
    <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
      <MyPage />
    </ViamentorMainLayout>
  }
/>
\`\`\`

---

## 📁 Structure des Fichiers

### Layout Principal
\`\`\`
@/polymet/layouts/viamentor-main-layout
├── Props: locale, tenant, children
├── Features: Auth check, Tenant validation, RBAC
└── Components: Sidebar, Header, ErrorBoundary, Suspense
\`\`\`

### Composants Utilisés
\`\`\`
@/polymet/components/
├── viamentor-sidebar              # Navigation RBAC
├── viamentor-header               # Header global
├── viamentor-error-boundary       # Error handling
└── viamentor-loading-page         # Loading states
\`\`\`

### Pages Dashboard
\`\`\`
@/polymet/pages/
├── viamentor-dashboard-school-page      # School Admin
├── viamentor-dashboard-instructor-page  # Instructor
└── viamentor-dashboard-student-page     # Student
\`\`\`

---

## 🎯 Props du Layout

\`\`\`typescript
interface MainLayoutProps {
  children: ReactNode;          // Contenu de la page
  locale?: "fr" | "de" | "it" | "en";  // Langue (défaut: "fr")
  tenant?: string;              // Slug du tenant
  className?: string;           // Classes CSS additionnelles
}
\`\`\`

---

## 🔐 Authentification

### Flow d'authentification

1. **User accède à une route protégée**
2. **Layout vérifie l'auth** via \`useAuth()\` hook
3. **Si non authentifié** → Redirect vers \`/login\`
4. **Si authentifié** → Charger user data et permissions

### Implémentation Production

\`\`\`typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()
const { data: { user } } = await supabase.auth.getUser()

if (!user) {
  router.push('/login')
}
\`\`\`

### Version Mock (Développement)

\`\`\`typescript
const useAuth = () => {
  const { user } = useUserStore()
  return { 
    isAuthenticated: !!user, 
    isLoading: false,
    user 
  }
}
\`\`\`

---

## 🏢 Validation Tenant

### Flow de validation

1. **Extraire le slug** depuis l'URL
2. **Query Supabase** pour vérifier l'existence
3. **Si tenant n'existe pas** → 404 Not Found
4. **Si tenant existe** → Charger les données

### Implémentation Production

\`\`\`typescript
const { data: tenant, error } = await supabase
  .from('tenants')
  .select('*')
  .eq('slug', tenantSlug)
  .single()

if (error || !tenant) {
  return <NotFoundPage />
}
\`\`\`

---

## 👥 RBAC (Role-Based Access Control)

### Rôles Disponibles

| Rôle | Dashboard | Accès |
|------|-----------|-------|
| **Platform Admin** | \`/dashboard\` | Tous les tenants, Config système |
| **Finance Admin** | \`/dashboard\` | Finances, Factures, Analytics |
| **Security Officer** | \`/dashboard\` | RGPD, Audit logs, Consentements |
| **School Admin** | \`/dashboard\` | Élèves, Moniteurs, Planning |
| **Instructor** | \`/instructor-dashboard\` | Mes élèves, Mon planning |
| **Student** | \`/student-dashboard\` | Ma progression, Mes leçons |

### Navigation RBAC

La navigation dans la Sidebar est automatiquement filtrée selon le rôle:

\`\`\`typescript
const navigationConfig = NAVIGATION_BY_ROLE[user.role]
\`\`\`

---

## 🌍 Internationalisation (i18n)

### Langues Supportées

- 🇫🇷 **Français** (FR)
- 🇩🇪 **Allemand** (DE)
- 🇮🇹 **Italien** (IT)
- 🇬🇧 **Anglais** (EN)

### Utilisation

\`\`\`tsx
<ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
  {/* Contenu en français */}
</ViamentorMainLayout>
\`\`\`

### Traductions

Tous les composants utilisent les traductions depuis:
- \`@/polymet/data/viamentor-header-i18n\`
- \`@/polymet/data/viamentor-sidebar-navigation-data\`

---

## 🎨 Thème

### Modes Disponibles

- **Light** - Thème clair
- **Dark** - Thème sombre
- **System** - Suit les préférences système

### Gestion du Thème

Le thème est géré via le User Menu dans le Header:
- Sélection du mode
- Persistence dans localStorage
- Application automatique

---

## 📱 Responsive Design

### Breakpoints

- **Mobile** (<1024px): Sidebar en Sheet overlay
- **Desktop** (≥1024px): Sidebar fixe collapsible

### Sidebar Mobile

- Hamburger button en haut à gauche
- Sheet overlay avec backdrop
- Navigation complète
- Fermeture automatique après navigation

---

## ⚡ Features Realtime

### Notifications

- Badge count dans le Header
- WebSocket simulation (mock)
- Tabs: Toutes / Non lues / Mentions
- Mark as read / Mark all as read

### Messages

- Badge count unread
- Preview des conversations
- Timestamps relatifs

### User Status

- Dot de status coloré (Available/Busy/Away)
- Changement depuis User Menu
- Visible dans Sidebar Header

---

## 🛠️ Composants Utilitaires

### ErrorBoundary

Capture les erreurs de rendu React:

\`\`\`tsx
<ErrorBoundary fallback={<CustomError />}>
  {children}
</ErrorBoundary>
\`\`\`

Features:
- Message d'erreur élégant
- Détails techniques en dev
- Bouton "Réessayer"
- Bouton "Retour à l'accueil"

### LoadingPage

États de chargement avec Suspense:

\`\`\`tsx
<Suspense fallback={<LoadingPage message="Chargement..." />}>
  {children}
</Suspense>
\`\`\`

Features:
- Spinner animé
- Message personnalisable
- Dots animation
- Full screen ou inline

---

## 📊 Dashboards

### Dashboard École (\`/dashboard\`)

**Rôles**: Platform Admin, Finance Admin, Security Officer, School Admin

**Features**:
- KPIs: Élèves actifs, Leçons du jour, Moniteurs, Examens
- Activité récente en temps réel
- Examens à venir avec détails
- Alertes importantes
- Actions rapides (Nouvel élève, Planifier leçon, etc.)

### Dashboard Moniteur (\`/instructor-dashboard\`)

**Rôles**: Instructor

**Features**:
- Stats: Leçons aujourd'hui/semaine, Élèves actifs, Note moyenne
- Planning du jour avec détails complets
- Liste élèves assignés avec progression
- Avis récents des élèves

### Dashboard Élève (\`/student-dashboard\`)

**Rôles**: Student

**Features**:
- Progression globale avec barre de progression
- Status examens théorique/pratique
- Prochaines leçons planifiées
- Progression par thème L-drive
- Documents et attestations
- Solde et paiements

---

## 🚀 Déploiement

### Variables d'Environnement

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=https://app.viamentor.ch
\`\`\`

### Environnements

- **Development**: \`http://localhost:3000\`
- **Staging**: \`https://staging.viamentor.ch\`
- **Production**: \`https://app.viamentor.ch\`

---

## 📝 Exemples d'Utilisation

### Exemple 1: Page Simple

\`\`\`tsx
import { ViamentorMainLayout } from "@/polymet/layouts/viamentor-main-layout";

export function MySimplePage() {
  return (
    <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Ma Page</h1>
        <p>Contenu de ma page...</p>
      </div>
    </ViamentorMainLayout>
  );
}
\`\`\`

### Exemple 2: Page avec Données

\`\`\`tsx
import { ViamentorMainLayout } from "@/polymet/layouts/viamentor-main-layout";
import { useEffect, useState } from "react";

export function MyDataPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data
    fetchData().then(setData);
  }, []);

  return (
    <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
      {data ? (
        <div>Data loaded: {data}</div>
      ) : (
        <LoadingPage message="Chargement des données..." />
      )}
    </ViamentorMainLayout>
  );
}
\`\`\`

### Exemple 3: Page avec ErrorBoundary Custom

\`\`\`tsx
import { ViamentorMainLayout } from "@/polymet/layouts/viamentor-main-layout";
import { ErrorBoundary } from "@/polymet/components/viamentor-error-boundary";

export function MyProtectedPage() {
  return (
    <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
      <ErrorBoundary fallback={<CustomErrorPage />}>
        <MyRiskyComponent />
      </ErrorBoundary>
    </ViamentorMainLayout>
  );
}
\`\`\`

---

## 🔧 Personnalisation

### Modifier la Sidebar

Éditer \`@/polymet/data/viamentor-sidebar-navigation-data\`:

\`\`\`typescript
export const NAVIGATION_BY_ROLE = {
  "school-admin": {
    sections: [
      {
        id: "main",
        items: [
          { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
          // Ajouter vos items...
        ]
      }
    ]
  }
}
\`\`\`

### Modifier le Header

Éditer \`@/polymet/components/viamentor-header\` pour:
- Ajouter des actions dans Quick Add
- Modifier les menus
- Personnaliser les notifications

### Ajouter un Dashboard

1. Créer la page: \`@/polymet/pages/my-dashboard-page\`
2. Ajouter la route dans le prototype
3. Wrapper avec \`ViamentorMainLayout\`

---

## 📚 Documentation Complète

Pour plus de détails, voir:
- **Layout Architecture Doc**: \`@/polymet/data/viamentor-layout-architecture-doc\`
- **Demo Page**: \`/layout-demo\` dans le prototype

---

## 🐛 Troubleshooting

### Sidebar ne s'affiche pas

- Vérifier que le user est authentifié
- Vérifier que le rôle est valide
- Vérifier la config navigation pour ce rôle

### Header notifications ne fonctionnent pas

- Vérifier le hook \`useNotifications\`
- Vérifier les données mock
- En production: vérifier la connexion WebSocket

### Layout ne charge pas

- Vérifier l'authentification
- Vérifier la validation tenant
- Vérifier les imports des composants

---

## 📞 Support

Pour toute question ou problème:
- **Documentation**: \`/layout-demo\`
- **Architecture**: \`viamentor-layout-architecture-doc\`
- **Support**: support@viamentor.ch

---

**Version**: 1.0.0  
**Dernière mise à jour**: 2024-01-14  
**Auteur**: Viamentor Team
`;

export default LAYOUT_README;
