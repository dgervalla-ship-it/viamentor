# 🚀 VIAMENTOR - Déploiement Vercel

## ⚠️ VARIABLES D'ENVIRONNEMENT REQUISES

Votre déploiement Vercel nécessite ces variables d'environnement pour fonctionner :

### 1. VITE_SUPABASE_URL
```
https://jdyuulqscwxlkswmceqp.supabase.co
```

### 2. VITE_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeXV1bHFzY3d4bGtzd21jZXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDM5ODMsImV4cCI6MjA3NzE3OTk4M30.zPTATMFZsLyJQEuZ1DKnBKUcR5VAIXYYfV9W0Q3MhiU
```

---

## 📋 CONFIGURATION DANS VERCEL

### Méthode 1 : Via le Dashboard (Recommandé)

1. Allez sur : https://vercel.com/dashboard
2. Sélectionnez votre projet **viamentor**
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez les 2 variables :

   **Variable 1 :**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://jdyuulqscwxlkswmceqp.supabase.co`
   - Environment: ✅ Production ✅ Preview ✅ Development

   **Variable 2 :**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (la clé complète)
   - Environment: ✅ Production ✅ Preview ✅ Development

5. Cliquez **Save**
6. **Redéployez** : Deployments → Latest → **Redeploy**

### Méthode 2 : Via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Lier le projet
vercel link

# Ajouter les variables
vercel env add VITE_SUPABASE_URL production
# Collez : https://jdyuulqscwxlkswmceqp.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Collez : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Redéployer
vercel --prod
```

---

## 🐛 PROBLÈMES COURANTS

### ❌ Build échoue avec "VITE_SUPABASE_URL manquante"

**Solution :** Ajoutez les variables d'environnement dans Vercel Settings

### ❌ App déployée mais erreur "Invalid API key"

**Solution :** Vérifiez que `VITE_SUPABASE_ANON_KEY` est correcte

### ❌ Warnings npm "peer dependency"

**Solution :** Ignorez, ce sont juste des warnings (react-helmet vs React 19)

---

## ✅ CHECKLIST DÉPLOIEMENT

- [ ] Variables d'environnement ajoutées dans Vercel
- [ ] `VITE_SUPABASE_URL` configurée
- [ ] `VITE_SUPABASE_ANON_KEY` configurée
- [ ] Redéployé après ajout variables
- [ ] App accessible en production
- [ ] Connexion Supabase OK
- [ ] Données visibles dans l'app

---

## 🎯 APRÈS LE DÉPLOIEMENT

### Tester la connexion

1. Ouvrez votre app déployée
2. Console navigateur (F12)
3. Testez :
   ```javascript
   const { data } = await supabase.from('students').select('*');
   console.log(data); // 3 étudiants si tout est OK
   ```

### Configurer le domaine

Vercel vous donne un domaine automatique :
```
https://viamentor-xxx.vercel.app
```

Pour un domaine custom :
1. Settings → Domains
2. Ajoutez votre domaine
3. Configurez les DNS

---

## 📚 RESSOURCES

- **Vercel Dashboard** : https://vercel.com/dashboard
- **Vercel Docs** : https://vercel.com/docs
- **Environment Variables** : https://vercel.com/docs/environment-variables

---

## 🎉 FÉLICITATIONS !

Une fois les variables configurées, votre app **Viamentor** sera accessible en production !

**Bon déploiement ! 🚀**

