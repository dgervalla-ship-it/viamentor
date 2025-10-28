# 🚀 VIAMENTOR - Déploiement Vercel Ultra-Simple

**Temps estimé : 3 minutes chrono** ⏱️

---

## 🎯 ÉTAPE 1 : Ouvrir Vercel Dashboard (10 secondes)

🔗 **https://vercel.com/dashboard**

Connectez-vous si nécessaire.

---

## 🎯 ÉTAPE 2 : Configurer les Variables (2 minutes)

1. Cliquez sur votre projet **"viamentor"**

2. Allez dans **Settings** (onglet en haut)

3. Cliquez sur **Environment Variables** (menu latéral)

4. Ajoutez **3 variables** (cliquez "+ Add Another" à chaque fois) :

### Variable 1

```
Name:  VITE_SUPABASE_URL
Value: https://jdyuulqscwxlkswmceqp.supabase.co
Environment: ✅ Production ✅ Preview ✅ Development
```

### Variable 2

```
Name:  VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeXV1bHFzY3d4bGtzd21jZXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDM5ODMsImV4cCI6MjA3NzE3OTk4M30.zPTATMFZsLyJQEuZ1DKnBKUcR5VAIXYYfV9W0Q3MhiU
Environment: ✅ Production ✅ Preview ✅ Development
```

### Variable 3 (Optionnel)

```
Name:  VITE_GA_MEASUREMENT_ID  
Value: G-XXXXXXXXXX (votre ID Google Analytics)
Environment: ✅ Production ✅ Preview ✅ Development
```

5. Cliquez **"Save"** pour chaque variable

---

## 🎯 ÉTAPE 3 : Redéployer (1 minute)

1. Allez dans **Deployments** (onglet en haut)

2. Trouvez le dernier déploiement

3. Cliquez sur les **3 points "..."** à droite

4. Cliquez **"Redeploy"**

5. Cochez **"Use existing Build Cache"** (optionnel, plus rapide)

6. Cliquez **"Redeploy"**

7. ⏳ Attendez 2-3 minutes...

8. ✅ **Déploiement réussi !**

---

## ✅ VÉRIFICATION

Une fois le déploiement terminé :

1. Cliquez sur **"Visit"** pour ouvrir votre app

2. Ouvrez la console navigateur (F12)

3. Testez la connexion Supabase :

```javascript
// Dans la console
const { data } = await supabase.from('students').select('*');
console.log(data); // Devrait afficher 3 étudiants
```

Si vous voyez les 3 étudiants → ✅ **TOUT FONCTIONNE !**

---

## 🐛 DÉPANNAGE

### ❌ Build échoue

➡️ **Solution** : Vérifiez que les 2 variables sont bien configurées  
Retournez dans Settings → Environment Variables

### ❌ "Supabase URL not found"

➡️ **Solution** : La variable `VITE_SUPABASE_URL` est mal orthographiée  
Doit être exactement : `VITE_SUPABASE_URL` (avec underscore)

### ❌ App déployée mais erreur console

➡️ **Solution** : Vérifiez que `VITE_SUPABASE_ANON_KEY` est complète  
La clé fait ~200 caractères, copiez-la entièrement

---

## 🎉 SUCCÈS !

Votre app Viamentor sera accessible sur :

```
https://viamentor.vercel.app
```

Ou un domaine personnalisé que Vercel vous attribue.

---

## 💡 BONUS : Configurer un Domaine Personnalisé

1. Dans votre projet Vercel → **Settings** → **Domains**

2. Ajoutez votre domaine : `viamentor.ch` ou `app.viamentor.ch`

3. Configurez les DNS chez votre registrar

4. ✅ Votre app sera sur votre domaine !

---

**Temps total : 3 minutes chrono** ⏱️  
**Difficulté : Très facile** ✅

**Bonne chance ! 🚀**

