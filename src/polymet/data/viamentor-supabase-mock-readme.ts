/**
 * VIAMENTOR - Supabase Mock README
 * Documentation complète de la simulation Supabase
 *
 * @module data/viamentor-supabase-mock-readme
 * @version 1.0.0
 */

export const SUPABASE_MOCK_README = `
# 🔐 Supabase Mock - Documentation

## Vue d'ensemble

La simulation Supabase Mock permet de développer et tester ViaMenutor **sans connexion réelle à Supabase**. 
Toutes les fonctionnalités d'authentification et de base de données sont simulées localement.

---

## ✨ Fonctionnalités

### 🔑 Authentification Mock
- ✅ Sign in avec email/password
- ✅ Sign up (création compte)
- ✅ Sign out (déconnexion)
- ✅ Get user (récupération utilisateur)
- ✅ Update user (mise à jour profil)
- ✅ Session persistence (localStorage)
- ✅ Auto-login configurable

### 🗄️ Database Mock
- ✅ Requêtes tenants
- ✅ Simulation délais réseau réalistes
- ✅ Gestion erreurs

### 👥 Utilisateurs de Test
4 utilisateurs préconfigurés avec différents rôles:

**Mot de passe pour tous les utilisateurs: \`viamentor2025\`** (8 caractères minimum)

1. **Platform Admin**
   - Email: \`admin@viamentor.ch\`
   - Password: \`viamentor2025\`
   - Role: \`platform_admin\`

2. **School Admin**
   - Email: \`school@viamentor.ch\`
   - Password: \`viamentor2025\`
   - Role: \`school_admin\`

3. **Instructor**
   - Email: \`instructor@viamentor.ch\`
   - Password: \`viamentor2025\`
   - Role: \`instructor\`

4. **Student**
   - Email: \`student@viamentor.ch\`
   - Password: \`viamentor2025\`
   - Role: \`student\`

---

## 🚀 Utilisation

### Import du client mock

\`\`\`typescript
import { useSupabaseMock } from "@/polymet/data/viamentor-supabase-mock";

function MyComponent() {
  const supabase = useSupabaseMock();
  
  // Utiliser comme un vrai client Supabase
}
\`\`\`

### Connexion

\`\`\`typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: "school@viamentor.ch",
  password: "viamentor2025"
});

if (error) {
  console.error("Erreur:", error.message);
} else {
  console.log("Connecté:", data.user);
}
\`\`\`

### Vérifier l'utilisateur

\`\`\`typescript
const { data: { user }, error } = await supabase.auth.getUser();

if (user) {
  console.log("Utilisateur:", user.email);
  console.log("Rôle:", user.user_metadata.role);
}
\`\`\`

### Déconnexion

\`\`\`typescript
await supabase.auth.signOut();
\`\`\`

### Requête Database

\`\`\`typescript
const { data, error } = await supabase
  .from("tenants")
  .select("*")
  .eq("slug", "auto-ecole-geneve")
  .single();

if (data) {
  console.log("Tenant:", data.name);
}
\`\`\`

---

## ⚙️ Configuration Auto-Login

### Activer l'auto-login

\`\`\`typescript
import { setAutoLogin } from "@/polymet/data/viamentor-supabase-mock";

// Activer
setAutoLogin(true);

// Désactiver
setAutoLogin(false);
\`\`\`

### Vérifier le statut

\`\`\`typescript
import { getAutoLogin } from "@/polymet/data/viamentor-supabase-mock";

const isEnabled = getAutoLogin();
console.log("Auto-login:", isEnabled);
\`\`\`

Avec l'auto-login activé, l'utilisateur \`school_admin\` sera automatiquement connecté au chargement de l'application.

---

## 🔄 Workflow de développement

### 1. Page de Login
- Allez sur \`/login\`
- Cliquez sur "Configuration Supabase Mock" en haut à droite
- Ou connectez-vous directement avec un utilisateur de test

### 2. Configuration
- Sur \`/supabase-demo\`, activez l'auto-login si souhaité
- Testez les différents utilisateurs
- Consultez la documentation

### 3. Développement
- Utilisez \`useSupabaseMock()\` dans vos composants
- Les sessions sont persistées automatiquement
- Pas besoin de vraie connexion Supabase

---

## 📦 Structure des données

### MockUser

\`\`\`typescript
interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    name: string;
    role: string;
    avatar?: string;
  };
  created_at: string;
  updated_at: string;
}
\`\`\`

### MockSession

\`\`\`typescript
interface MockSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: MockUser;
}
\`\`\`

### MockTenant

\`\`\`typescript
interface MockTenant {
  id: string;
  slug: string;
  name: string;
  logo: string;
  status: "active" | "suspended" | "trial";
  plan: "starter" | "pro" | "enterprise";
  created_at: string;
}
\`\`\`

---

## 🎯 Cas d'usage

### Layout avec auth check

\`\`\`typescript
import { useSupabaseMock } from "@/polymet/data/viamentor-supabase-mock";

function MainLayout({ children }) {
  const supabase = useSupabaseMock();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkAuth();
  }, []);

  if (!user) {
    return <LoginPage />;
  }

  return <div>{children}</div>;
}
\`\`\`

### Formulaire de connexion

\`\`\`typescript
import { useSupabaseMock } from "@/polymet/data/viamentor-supabase-mock";

function LoginForm() {
  const supabase = useSupabaseMock();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      // Redirection
      window.location.href = "/dashboard";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Connexion</button>
    </form>
  );
}
\`\`\`

---

## 🔒 Sécurité

⚠️ **Important**: Cette simulation est **uniquement pour le développement**.

- ❌ Ne jamais utiliser en production
- ❌ Pas de vraie sécurité
- ❌ Données stockées en localStorage (non chiffrées)
- ✅ Parfait pour développement et démo
- ✅ Pas de dépendance externe
- ✅ Fonctionne offline

---

## 🔄 Migration vers Supabase réel

Quand vous êtes prêt pour la production:

### 1. Installer Supabase

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

### 2. Remplacer les imports

\`\`\`typescript
// Avant (mock)
import { useSupabaseMock } from "@/polymet/data/viamentor-supabase-mock";
const supabase = useSupabaseMock();

// Après (production)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
const supabase = createClientComponentClient();
\`\`\`

### 3. Configuration environnement

\`\`\`.env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

L'API reste identique ! 🎉

---

## 📚 Ressources

- **Page de démo**: \`/supabase-demo\`
- **Page de login**: \`/login\`
- **Code source**: \`@/polymet/data/viamentor-supabase-mock\`

---

## 🐛 Dépannage

### Problème: "Non authentifié"
- ✅ Vérifiez que vous êtes connecté sur \`/login\`
- ✅ Activez l'auto-login sur \`/supabase-demo\`
- ✅ Vérifiez localStorage (clé: \`viamentor_mock_session\`)

### Problème: Session expirée
- ✅ Reconnectez-vous
- ✅ Les sessions expirent après 1 heure

### Problème: Tenant non trouvé
- ✅ Utilisez un slug valide: \`auto-ecole-geneve\` ou \`ecole-conduite-lausanne\`
- ✅ Consultez \`MOCK_TENANTS\` dans le code source

---

## 💡 Conseils

1. **Développement rapide**: Activez l'auto-login
2. **Test multi-rôles**: Utilisez les 4 utilisateurs de test
3. **Démo client**: Désactivez l'auto-login pour montrer le login
4. **Debug**: Consultez localStorage pour voir les sessions

---

## 📝 Changelog

### v1.1.0 (2025)
- ✅ Mot de passe simplifié: \`viamentor2025\` (8 caractères)
- ✅ Validation password minimum 8 caractères (sans contraintes complexes)

### v1.0.0 (2024)
- ✅ Auth mock complet
- ✅ Database mock pour tenants
- ✅ 4 utilisateurs de test
- ✅ Auto-login configurable
- ✅ Session persistence
- ✅ Page de démo interactive

---

**Développé avec ❤️ pour ViaMenutor**
`;

export default SUPABASE_MOCK_README;
