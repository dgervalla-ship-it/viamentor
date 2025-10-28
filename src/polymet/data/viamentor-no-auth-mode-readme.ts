/**
 * VIAMENTOR - Mode Sans Authentification
 * Documentation complète du système d'accès direct sans login
 *
 * @module data/viamentor-no-auth-mode-readme
 * @version 1.0.0
 */

export const NO_AUTH_MODE_README = `
# 🔓 Mode Sans Authentification - ViaMenutor

## Vue d'ensemble

Le système ViaMenutor fonctionne maintenant en **mode développement sans authentification**.
Toutes les pages sont accessibles directement sans avoir besoin de se connecter.

---

## ✅ Changements Effectués

### 1. **Suppression de l'authentification Supabase**
- ❌ Supprimé : Vérification \`useAuth()\` avec Supabase Mock
- ❌ Supprimé : Écrans de login obligatoire
- ❌ Supprimé : Redirections vers \`/login\`
- ✅ Ajouté : Hook \`useMockUser()\` avec utilisateur par défaut

### 2. **Suppression de la validation tenant**
- ❌ Supprimé : Vérification \`useTenantValidation()\` avec Supabase
- ❌ Supprimé : Écrans d'erreur tenant
- ✅ Ajouté : Hook \`useMockTenant()\` avec tenant par défaut

### 3. **Utilisateur Mock par Défaut**
\`\`\`typescript
{
  id: "mock-user-school-admin",
  email: "school@viamentor.ch",
  name: "Admin École",
  role: "school_admin"
}
\`\`\`

### 4. **Tenant Mock par Défaut**
\`\`\`typescript
{
  id: "tenant-mock-1",
  slug: "auto-ecole-geneve",
  name: "Auto-École Genève",
  logo: "https://github.com/polymet-ai.png"
}
\`\`\`

---

## 🚀 Utilisation

### Accès Direct aux Pages

Vous pouvez maintenant accéder directement à n'importe quelle page :

| Route | Description |
|-------|-------------|
| \`/dashboard\` | Dashboard École |
| \`/instructor-dashboard\` | Dashboard Moniteur |
| \`/student-dashboard\` | Dashboard Élève |
| \`/students\` | Gestion Élèves |
| \`/students/:id\` | Détail Élève |
| \`/instructors\` | Gestion Moniteurs |
| \`/instructors/:id\` | Détail Moniteur |
| \`/tenants\` | Gestion Tenants |
| \`/finance\` | Finance Admin |
| \`/compliance/gdpr\` | RGPD |

### Pas de Login Requis

- ✅ **Avant** : Redirection vers \`/login\` → Connexion obligatoire
- ✅ **Maintenant** : Accès direct → Utilisateur mock automatique

---

## 📝 Fichiers Modifiés

### \`layouts/viamentor-main-layout\`

#### Avant
\`\`\`typescript
const { isAuthenticated, isLoading, user } = useAuth();

if (!isAuthenticated) {
  return <LoginRequiredScreen />;
}
\`\`\`

#### Après
\`\`\`typescript
const user = useMockUser(); // Utilisateur mock automatique
const { tenant } = useMockTenant(); // Tenant mock automatique

// Pas de vérification d'authentification
// Accès direct au contenu
\`\`\`

---

## 🔧 Configuration

### Changer l'Utilisateur Mock par Défaut

Éditez le hook \`useMockUser()\` dans \`layouts/viamentor-main-layout\` :

\`\`\`typescript
const useMockUser = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    const defaultUser = {
      id: "mock-user-instructor",
      email: "instructor@viamentor.ch",
      name: "Jean Moniteur",
      role: "instructor", // Changez le rôle ici
    };

    setUser(defaultUser);
  }, [setUser]);

  return {
    id: "mock-user-instructor",
    email: "instructor@viamentor.ch",
    name: "Jean Moniteur",
    role: "instructor",
    user_metadata: {
      name: "Jean Moniteur",
      role: "instructor",
    },
  };
};
\`\`\`

### Rôles Disponibles

| Rôle | Description |
|------|-------------|
| \`platform_admin\` | Admin Plateforme |
| \`school_admin\` | Admin École |
| \`instructor\` | Moniteur |
| \`student\` | Élève |
| \`finance_admin\` | Admin Finance |
| \`security_officer\` | Responsable Sécurité |

---

## 🎯 Avantages du Mode Sans Auth

### Pour le Développement
- ✅ **Accès rapide** : Pas besoin de se connecter à chaque fois
- ✅ **Tests simplifiés** : Tester directement les pages
- ✅ **Pas de dépendances** : Pas besoin de Supabase
- ✅ **Démo facile** : Montrer le système sans setup

### Pour la Démo
- ✅ **Navigation libre** : Parcourir toutes les pages
- ✅ **Pas de friction** : Pas de formulaire de login
- ✅ **Expérience fluide** : Focus sur les fonctionnalités

---

## ⚠️ Important

### Mode Développement Uniquement

Ce mode est conçu pour le **développement et la démonstration**.

**En production**, vous devrez :
1. Réactiver l'authentification Supabase
2. Ajouter les vérifications de sécurité
3. Implémenter les permissions RBAC
4. Sécuriser les routes sensibles

### Fichiers à Modifier pour Production

\`\`\`typescript
// layouts/viamentor-main-layout.tsx
// Remplacer useMockUser() par useAuth()
// Remplacer useMockTenant() par useTenantValidation()
\`\`\`

---

## 🔄 Retour à l'Authentification

Si vous souhaitez réactiver l'authentification :

1. **Restaurer le hook \`useAuth()\`**
\`\`\`typescript
const useAuth = () => {
  // ... code d'authentification Supabase
};
\`\`\`

2. **Restaurer la vérification**
\`\`\`typescript
const { isAuthenticated, isLoading, user } = useAuth();

if (!isAuthenticated) {
  return <LoginRequiredScreen />;
}
\`\`\`

3. **Restaurer la validation tenant**
\`\`\`typescript
const { tenant, isLoading, error } = useTenantValidation(tenantSlug);
\`\`\`

---

## 📚 Ressources

- **Layout Principal** : \`layouts/viamentor-main-layout\`
- **User Store** : \`data/viamentor-user-store\`
- **Supabase Mock** : \`data/viamentor-supabase-mock\` (non utilisé)
- **Prototype** : \`prototypes/viamentor-system-prototype\`

---

## 🎉 Résumé

**Avant** : Login obligatoire → Vérification auth → Accès pages
**Maintenant** : Accès direct → Utilisateur mock → Toutes les pages disponibles

Profitez de votre navigation sans friction ! 🚀
`;

export default NO_AUTH_MODE_README;
