# 🚀 VIAMENTOR - Démarrage Rapide Base de Données

## ⚡ EN 5 MINUTES CHRONO !

### 📋 Prérequis
- ✅ Compte Supabase actif : https://supabase.com
- ✅ Projet créé : `jdyuulqscwxlkswmceqp`
- ✅ Credentials dans `.env.local`

---

## 🎯 ÉTAPE 1 : Ouvrir Supabase Dashboard (30 sec)

```
👉 https://supabase.com/dashboard
```

1. Cliquez sur votre projet
2. Allez dans **SQL Editor** (barre latérale gauche)

---

## 🎯 ÉTAPE 2 : Créer les tables (2 min)

### A. Exécuter la migration initiale

1. Ouvrez le fichier : `supabase/migrations/001_initial_schema.sql`
2. **Copiez TOUT le contenu** (Cmd+A, Cmd+C)
3. **Collez dans SQL Editor** de Supabase
4. Cliquez sur **RUN** ▶️ (coin inférieur droit)
5. Attendez le message : ✅ **Success. No rows returned**

### B. Insérer les données de test

1. Ouvrez le fichier : `supabase/migrations/002_seed_data.sql`
2. **Copiez TOUT le contenu**
3. **Collez dans SQL Editor**
4. Cliquez sur **RUN** ▶️
5. Attendez : ✅ **Success**

---

## 🎯 ÉTAPE 3 : Vérifier que ça marche (1 min)

Dans le SQL Editor, collez et exécutez :

```sql
-- 1. Vérifier les tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. Compter les données de test
SELECT 
  (SELECT COUNT(*) FROM tenants) as tenants,
  (SELECT COUNT(*) FROM instructors) as instructors,
  (SELECT COUNT(*) FROM students) as students,
  (SELECT COUNT(*) FROM vehicles) as vehicles,
  (SELECT COUNT(*) FROM courses) as courses,
  (SELECT COUNT(*) FROM lessons) as lessons;
```

**Résultat attendu :**
```
✅ tenants: 1
✅ instructors: 3
✅ students: 3
✅ vehicles: 3
✅ courses: 2
✅ lessons: 3
```

---

## 🎯 ÉTAPE 4 : Tester dans l'app React (1 min)

```bash
# Redémarrer le serveur
npm run dev
```

Ouvrez la console navigateur (F12) et tapez :

```javascript
// Test connexion
const { data, error } = await window.supabase.from('students').select('*');
console.log('Étudiants:', data);
```

**Résultat attendu :** 3 étudiants affichés ! 🎉

---

## ✅ C'EST FAIT !

Votre base de données est maintenant **100% opérationnelle** avec :

✅ **10 tables** créées  
✅ **Row Level Security** activé  
✅ **Données de test** insérées  
✅ **Services TypeScript** prêts  

---

## 🎯 PROCHAINES ÉTAPES

### 1. Créer votre compte admin

```sql
-- Dans SQL Editor
INSERT INTO auth.users (
  instance_id, id, aud, role, email, 
  encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'votre-email@example.com',
  crypt('VotreMotDePasse123!', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW()
) RETURNING id;

-- Noter l'ID, puis :
INSERT INTO users (
  id, tenant_id, first_name, last_name, 
  email, role, status
) VALUES (
  '[ID_CI-DESSUS]',
  '00000000-0000-0000-0000-000000000001',
  'Votre Prénom',
  'Votre Nom',
  'votre-email@example.com',
  'school_admin',
  'active'
);
```

### 2. Se connecter dans l'app

```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'votre-email@example.com',
  password: 'VotreMotDePasse123!'
});

if (data) {
  console.log('✅ Connecté !', data.user);
}
```

### 3. Utiliser les services

```typescript
import { getAllStudents } from '@/lib/services/students.service';

const students = await getAllStudents();
console.log('Liste des étudiants:', students);
```

---

## 🐛 PROBLÈMES COURANTS

### ❌ "relation does not exist"

```
➡️ Les tables n'ont pas été créées
✅ Solution : Exécutez 001_initial_schema.sql
```

### ❌ "row level security policy"

```
➡️ RLS bloque l'accès
✅ Solution : Connectez-vous d'abord (voir Étape 2.1)
```

### ❌ "Invalid API key"

```
➡️ .env mal configuré
✅ Solution : Vérifiez VITE_SUPABASE_ANON_KEY dans .env.local
```

---

## 📚 DOCUMENTATION

- **Guide complet** : `DATABASE_SETUP.md`
- **Schema SQL** : `supabase/migrations/001_initial_schema.sql`
- **Seed data** : `supabase/migrations/002_seed_data.sql`
- **Services** : `src/lib/services/*.service.ts`

---

## 🎉 FÉLICITATIONS !

Votre **base de données Viamentor est opérationnelle** ! 🚀

**Temps écoulé :** ~5 minutes  
**Tables créées :** 10  
**Données de test :** ✅  
**Prêt pour coder :** ✅  

**Bon développement ! 💪**

