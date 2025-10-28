# 🔐 Guide de Configuration Supabase

## ✅ Ce qui est déjà fait

1. ✅ Client Supabase installé (`@supabase/supabase-js`)
2. ✅ Fichiers `.env` et `.env.local` créés
3. ✅ Client Supabase configuré dans `src/lib/supabase.ts`
4. ✅ Mot de passe enregistré

---

## 📝 Étapes restantes

### 1. Récupérer votre clé API Anon

1. Allez sur : **https://supabase.com/dashboard**
2. Sélectionnez votre projet
3. Allez dans **Settings** (⚙️ en bas à gauche)
4. Cliquez sur **API** dans le menu
5. Copiez la clé **anon** / **public**
6. Remplacez `VOTRE_CLE_ANON_ICI` dans `.env` et `.env.local`

Exemple de clé anon (commence toujours par `eyJ...`) :
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```

### 2. Mettre à jour .env

Ouvrez `.env` et remplacez la ligne :
```bash
VITE_SUPABASE_ANON_KEY=VOTRE_CLE_ANON_ICI
```

Par (avec votre vraie clé) :
```bash
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

### 3. Mettre à jour .env.local

Même chose dans `.env.local`

### 4. Créer les tables dans Supabase

#### Option A : Via SQL Editor (Recommandé)

1. Allez dans **SQL Editor** dans votre dashboard Supabase
2. Copiez le contenu de `src/viamentor/data/viamentor-schema-migrations-001.ts`
3. Collez dans le SQL Editor
4. Cliquez sur **Run**

#### Option B : Via CLI

```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Lier votre projet
supabase link --project-ref jdyuulqscwxlkswmceqp

# Appliquer les migrations
supabase db push
```

### 5. Configurer Row Level Security (RLS)

Les politiques RLS sont déjà incluses dans les migrations. Elles assurent que :
- Chaque tenant ne voit que ses données
- Les utilisateurs ont accès selon leur rôle
- Les données sensibles sont protégées

### 6. Tester la connexion

Redémarrez votre serveur de développement :

```bash
npm run dev
```

Ouvrez la console du navigateur (F12) et testez :

```javascript
import { testSupabaseConnection } from '/src/lib/supabase';
await testSupabaseConnection();
```

Vous devriez voir : `✅ Connexion Supabase OK`

---

## 🔄 Remplacer le Mock par Supabase

### Étape 1 : Importer le vrai client

**Avant (mock) :**
```typescript
import { useSupabaseMock } from "@/viamentor/data/viamentor-supabase-mock";
const supabase = useSupabaseMock();
```

**Après (production) :**
```typescript
import { supabase } from "@/lib/supabase";
// Utiliser directement supabase
```

### Étape 2 : Auth avec Supabase réel

```typescript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// Get user
const { data: { user } } = await supabase.auth.getUser();

// Logout
await supabase.auth.signOut();
```

### Étape 3 : Requêtes database

```typescript
// Select
const { data: tenants } = await supabase
  .from('tenants')
  .select('*')
  .eq('status', 'active');

// Insert
const { data, error } = await supabase
  .from('students')
  .insert({
    first_name: 'Sophie',
    last_name: 'Martin',
    email: 'sophie@example.com'
  });

// Update
await supabase
  .from('students')
  .update({ status: 'active' })
  .eq('id', studentId);

// Delete
await supabase
  .from('students')
  .delete()
  .eq('id', studentId);
```

---

## 🔒 Sécurité

### ⚠️ IMPORTANT : Fichiers à NE JAMAIS commit

Ajoutez à `.gitignore` (normalement déjà fait) :

```
.env
.env.local
.env.*.local
```

### ✅ Fichiers safe à commit

```
.env.example (sans les vraies clés)
src/lib/supabase.ts (n'a pas de secrets)
```

### 🔑 Clés à garder secrètes

- ❌ **DATABASE_URL** (mot de passe PostgreSQL)
- ❌ **service_role key** (accès total, bypass RLS)

### ✅ Clés safe pour le client

- ✅ **SUPABASE_URL** (publique)
- ✅ **SUPABASE_ANON_KEY** (protégée par RLS)

---

## 🚀 Prochaines étapes

### 1. Créer votre premier utilisateur

```sql
-- Dans SQL Editor de Supabase
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at
) VALUES (
  'admin@viamentor.ch',
  crypt('votre-mot-de-passe', gen_salt('bf')),
  NOW()
);
```

### 2. Créer votre premier tenant

```sql
INSERT INTO tenants (
  name,
  slug,
  canton,
  plan,
  status
) VALUES (
  'Auto-École Genève',
  'auto-ecole-geneve',
  'GE',
  'professional',
  'active'
);
```

### 3. Tester l'auth

Allez sur `/login` et connectez-vous avec les credentials créés.

---

## 📚 Ressources

- **Dashboard Supabase** : https://supabase.com/dashboard
- **Documentation** : https://supabase.com/docs
- **API Reference** : https://supabase.com/docs/reference/javascript
- **RLS Guide** : https://supabase.com/docs/guides/auth/row-level-security

---

## 🐛 Dépannage

### Erreur : "Invalid API key"

➡️ Vérifiez que `VITE_SUPABASE_ANON_KEY` est correcte dans `.env`

### Erreur : "relation does not exist"

➡️ Les tables n'existent pas encore. Exécutez les migrations SQL.

### Erreur : "row level security policy"

➡️ RLS bloque votre accès. Vérifiez les politiques ou désactivez RLS temporairement pour tester.

### Le fichier .env n'est pas chargé

➡️ Redémarrez le serveur Vite (`npm run dev`)

---

## ✅ Checklist complète

- [ ] Clé ANON récupérée depuis Supabase Dashboard
- [ ] `.env` et `.env.local` mis à jour avec la clé ANON
- [ ] Migrations SQL exécutées (tables créées)
- [ ] Serveur dev redémarré
- [ ] Connexion testée (console browser)
- [ ] Premier utilisateur créé
- [ ] Premier tenant créé
- [ ] Login réussi sur `/login`

---

**🎉 Une fois tout validé, votre projet sera connecté à une vraie base de données PostgreSQL !**

