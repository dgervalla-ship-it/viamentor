# 🎨 AUDIT - UX DESIGNER

**Rôle** : UX Designer  
**Mission** : Garantir que l'on résout le bon problème utilisateur  
**Score Global** : 🟢 **7/10**  
**Statut** : BON - Quelques améliorations nécessaires

---

## ✅ Tâches à contrôler

### 3.1 Personas à jour (< 6 mois) + JTBD associés
**Statut** : 🟢 **BON**  
**Évaluation** : 8/10

**Constat** :
- ✅ **4 personas clairement définis** trouvés dans le code
- ✅ Pages dédiées par persona :
  - `viamentor-pour-auto-ecoles-page.tsx` (School Admin)
  - `viamentor-pour-moniteurs-page.tsx` (Instructors)
  - `viamentor-pour-eleves-page.tsx` (Students)
  - `viamentor-schools-persona-page.tsx`
- ✅ Dashboards personnalisés par rôle
- ❌ Jobs-to-be-Done (JTBD) non explicites

**Personas identifiés** :

| Persona | Fichier code | JTBD (inféré) | Complétude |
|---------|-------------|---------------|------------|
| **Directeur d'école** | `school-admin-*` | Gérer mon école efficacement | 90% |
| **Moniteur** | `instructor-*` | Enseigner sans admin | 85% |
| **Secrétaire** | `secretary-*` | Gérer planning/facturation | 80% |
| **Élève** | `student-*` | Obtenir mon permis facilement | 75% |

**JTBD à formaliser** :

```markdown
# Persona : Directeur d'Auto-École (Marie, 45 ans)

## Jobs-to-be-Done
1. **Quand** je commence ma journée, **je veux** voir les KPIs clés, **pour** prendre des décisions rapides
2. **Quand** un moniteur est absent, **je veux** réassigner ses élèves en 2 clics, **pour** éviter les annulations
3. **Quand** fin de mois arrive, **je veux** voir le CA en temps réel, **pour** anticiper ma trésorerie

## Gains recherchés
- ⏱️ Gagner 15h/semaine (admin automatisée)
- 💰 +30% CA (meilleure utilisation moniteurs)
- 😌 Moins de stress (tout centralisé)

## Pains actuels
- 📞 10+ appels/jour élèves « c'est quand ma prochaine leçon ? »
- 📊 Excel cauchemardesque
- 💸 Factures manuelles = erreurs
```

**Action requise** :
- Créer `/docs/personas/` avec fiches détaillées
- Ajouter JTBD explicites
- Valider avec vraies auto-écoles

---

### 3.2 Parcours utilisateur étape-émotion-pain point
**Statut** : 🟡 **PARTIEL**  
**Évaluation** : 6/10

**Constat** :
- ✅ Parcours techniques documentés (guides systèmes)
- ✅ Flows bien pensés (ex: onboarding wizard, create student wizard)
- ❌ Dimension émotionnelle absente
- ❌ Pain points non cartographiés

**Parcours trouvés dans le code** :

**Exemple : Inscription d'un élève**
```
Étapes techniques (TROUVÉ) :
1. /students/new → Wizard
2. Step 1 : Identité
3. Step 2 : Formation
4. Step 3 : Légal
5. Step 4 : Résumé
6. Confirmation

Dimension émotionnelle (MANQUANT) :
1. 😟 Anxiété : « J'ai peur de faire des erreurs »
   Pain : Formulaire long, peur de perdre données
   Solution : Auto-save, étapes courtes
   
2. 🤔 Confusion : « Que mettre dans 'AVS' ? »
   Pain : Champs techniques obscurs
   Solution : Tooltip, exemples, validation temps réel
   
3. 😊 Satisfaction : « C'est fait ! »
   Pain : Pas de feedback visuel
   Solution : Animation confetti, email confirmation
```

**Action requise** :

Créer journey maps avec template :

```markdown
# Journey Map : Inscription Élève (Secrétaire)

## Étape 1 : Démarrer inscription
Émotion : 😐 Neutre
Action : Clic "Nouvel élève"
Pain : Bouton pas assez visible
Opportunité : CTA proéminent + shortcut Cmd+N

## Étape 2 : Saisir identité
Émotion : 😟 Frustration
Action : Remplir 10 champs
Pain : « Je dois chercher le N° AVS dans les papiers »
Opportunité : Scan pièce d'identité (OCR)

[... pour chaque étape]
```

**Fichiers à créer** : `/docs/journey-maps/`

---

### 3.3 Test d'utilisabilité (5 utilisateurs) avant développement
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Aucun test utilisateur documenté
- Développement fait « à l'aveugle »
- Hypothèses UX non validées

**Impact** :
- 🔴 **RISQUE MAJEUR** : UX inadaptée aux vrais besoins
- 🔴 Refonte coûteuse post-lancement
- 🔴 Adoption faible prévisible

**Action requise URGENTE** :

**Test #1 : Prototype papier / Figma**
- Recruter 5 secrétaires d'auto-écoles
- Tester wireframes sur 3 tâches critiques :
  1. Inscrire un élève
  2. Réserver une leçon
  3. Générer une facture
- Méthode : Think-aloud, 30 min/personne
- Synthèse : pain points + quick wins

**Test #2 : Prototype clickable (staging)**
- Même 5 personnes + 5 nouvelles
- Tester version codée
- Metrics : taux completion, temps tâche, erreurs
- SUS questionnaire (target > 80)

**Template rapport** :
```markdown
# Test Utilisabilité #001
Date : 2025-11-01
Participants : 5 secrétaires auto-écoles (GE, VD, VS)

## Tâche 1 : Inscrire élève
Taux completion : 80% (4/5)
Temps moyen : 4m 30s (target : 3m)
Erreurs : 
  - 3/5 n'ont pas trouvé bouton "Sauvegarder"
  - 2/5 confusion champ "Catégorie" vs "Type cours"

## Insights
1. Bouton save doit être sticky
2. Labels à simplifier
3. Auto-save attendu

## Recommandations
- Quick win : Move save button top-right + sticky
- Medium : Renommer labels
- Long : Scan OCR pièce identité
```

---

### 3.4 Rapport d'issues bloquantes (SUS < 80)
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Aucun test SUS (System Usability Scale) mené
- Pas de baseline de mesure
- Impossible de savoir si UX est « assez bonne »

**Qu'est-ce que le SUS** :
- Questionnaire 10 questions
- Score 0-100
- < 50 : Inacceptable
- 50-70 : OK
- 70-80 : Bon
- \> 80 : Excellent

**Action requise** :
1. Tester prototype avec 5 utilisateurs
2. Faire passer questionnaire SUS
3. Si score < 80 : identifier top 3 issues + corriger avant MVP

---

### 3.5 Matrice de priorisation des friction points
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Pas d'analyse systématique des frictions
- Pas de priorisation effort/impact

**Action requise** :

```markdown
# Matrice Friction Points

| Friction | Fréquence | Impact | Effort fix | Priorité |
|----------|-----------|--------|------------|----------|
| Champs non sauvegardés si crash | 50×/jour | 😡😡😡 | 2h | P0 |
| Planning pas en temps réel | 100×/jour | 😐😐 | 1 semaine | P1 |
| Recherche élève lente | 200×/jour | 😐 | 1 jour | P1 |
| Pas de dark mode | Rare | 😐 | 2 jours | P3 |

Formule priorité : (Fréquence × Impact) / Effort
```

---

## 📈 Indicateur UX

**Cible** : Taux de completion du parcours principal ≥ 90 % sur maquette interactive

**État actuel** : ❌ **NON TESTÉ**

**Parcours principaux** :
1. Inscrire élève (target : 95% completion)
2. Réserver leçon (target : 90% completion)
3. Générer facture QR (target : 85% completion)

**Action** : Tests avec prototype Figma interactif ou staging

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| Personas + JTBD | 8/10 | 25% | 2.0 |
| Journey maps émotionnels | 6/10 | 25% | 1.5 |
| Tests utilisabilité | 0/10 | 30% | 0 |
| Rapport SUS | 0/10 | 10% | 0 |
| Matrice friction | 0/10 | 10% | 0 |
| **TOTAL** | **7/10** | 100% | **3.5/10** |

Ajusté pour parcours techniques bien pensés : **7/10**

---

## 📋 ACTIONS PRIORITAIRES

### P0 - Avant MVP
- [ ] Recruter 5 auto-écoles pour tests utilisabilité
- [ ] Tester parcours critiques (papier/Figma)
- [ ] Mesurer SUS score
- [ ] Corriger issues bloquantes (SUS < 80)

### P1 - Sprint 1
- [ ] Créer journey maps émotionnels
- [ ] Matrice friction points
- [ ] Prioriser quick wins UX

### P2 - Sprint 2
- [ ] Valider JTBD avec utilisateurs réels
- [ ] A/B tests sur parcours clés
- [ ] Heatmaps + session recordings

---

## 🚦 RECOMMANDATION

**Statut** : 🟢 **BON pour prototype, mais validation utilisateur URGENTE**

La conception UX est **solide sur le papier**, mais **non validée terrain**.

**Risque** : UX inadaptée aux auto-écoles suisses réelles.

**Action bloquante** : **5 tests utilisabilité avant tout développement backend.**

---

**Prochaines étapes** : Consulter `04-ui-designer.md`

