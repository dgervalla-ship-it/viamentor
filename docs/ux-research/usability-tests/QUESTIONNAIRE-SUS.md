# 📊 SYSTEM USABILITY SCALE (SUS) - VIAMENTOR

**Version française** | Score : 0-100

---

## 📋 QUESTIONNAIRE SUS

**Instructions participant** :
> "Pour chaque affirmation ci-dessous, indiquez votre degré d'accord sur une échelle de 1 à 5 :"
> 
> **1** = Pas du tout d'accord  
> **2** = Plutôt pas d'accord  
> **3** = Neutre  
> **4** = Plutôt d'accord  
> **5** = Tout à fait d'accord

---

### Question 1
**Je pense que j'aimerais utiliser Viamentor fréquemment.**

```
1 ☐  2 ☐  3 ☐  4 ☐  5 ☐
```

---

### Question 2
**J'ai trouvé Viamentor inutilement complexe.**

```
1 ☐  2 ☐  3 ☐  4 ☐  5 ☐
```

---

### Question 3
**J'ai pensé que Viamentor était facile à utiliser.**

```
1 ☐  2 ☐  3 ☐  4 ☐  5 ☐
```

---

### Question 4
**Je pense que j'aurais besoin de l'aide d'une personne technique pour utiliser Viamentor.**

```
1 ☐  2 ☐  3 ☐  4 ☐  5 ☐
```

---

### Question 5
**J'ai trouvé que les différentes fonctionnalités de Viamentor étaient bien intégrées.**

```
1 ☐  2 ☐  3 ☐  4 ☐  5 ☐
```

---

### Question 6
**J'ai trouvé qu'il y avait trop d'incohérences dans Viamentor.**

```
1 ☐  2 ☐  3 ☐  4 ☐  5 ☐
```

---

### Question 7
**J'imagine que la plupart des gens apprendraient à utiliser Viamentor très rapidement.**

```
1 ☐  2 ☐  3 ☐  4 ☐  5 ☐
```

---

### Question 8
**J'ai trouvé Viamentor très lourd à utiliser.**

```
1 ☐  2 ☐  3 ☐  4 ☐  5 ☐
```

---

### Question 9
**Je me suis senti·e très confiant·e en utilisant Viamentor.**

```
1 ☐  2 ☐  3 ☐  4 ☐  5 ☐
```

---

### Question 10
**J'ai eu besoin d'apprendre beaucoup de choses avant de pouvoir utiliser Viamentor.**

```
1 ☐  2 ☐  3 ☐  4 ☐  5 ☐
```

---

## 🧮 CALCUL DU SCORE SUS

### Formule
1. Questions **impaires** (1, 3, 5, 7, 9) : Score - 1
2. Questions **paires** (2, 4, 6, 8, 10) : 5 - Score
3. Additionner les 10 résultats
4. Multiplier par **2.5**

**Score final** : 0-100

### Exemple Calcul
```
Réponses participant :
Q1: 5  Q2: 2  Q3: 4  Q4: 2  Q5: 5
Q6: 1  Q7: 5  Q8: 1  Q9: 4  Q10: 2

Calcul :
Q1: 5-1 = 4
Q2: 5-2 = 3
Q3: 4-1 = 3
Q4: 5-2 = 3
Q5: 5-1 = 4
Q6: 5-1 = 4
Q7: 5-1 = 4
Q8: 5-1 = 4
Q9: 4-1 = 3
Q10: 5-2 = 3

Somme : 35
Score SUS : 35 × 2.5 = 87.5/100 ✅ Excellent
```

---

## 📊 INTERPRÉTATION DU SCORE

| Score | Grade | Adjective | Interprétation |
|-------|-------|-----------|----------------|
| **90-100** | A+ | Exceptionnel | 🏆 World-class UX |
| **80-89** | A | Excellent | ✅ Très bonne usabilité |
| **70-79** | B | Bon | ✅ Acceptable pour prod |
| **60-69** | C | OK | ⚠️ Améliorations nécessaires |
| **50-59** | D | Passable | 🔴 Beaucoup de problèmes |
| **0-49** | F | Inacceptable | 🔴 Refonte complète requise |

### Benchmarks Industrie
- **Moyenne générale** : 68
- **Top 10% produits** : 85+
- **SaaS B2B** : 70-75

### Cibles Viamentor
- **MVP** : ≥ 70 (minimum viable)
- **Production** : ≥ 80 (excellent)
- **World-class** : ≥ 90 (objectif long terme)

---

## 📈 TEMPLATE ANALYSE SUS

### Résultats Individuels
```markdown
| Participant | Persona | Score SUS | Grade | Commentaire |
|-------------|---------|-----------|-------|-------------|
| P01 | Secrétaire | 85 | A | Très satisfaite |
| P02 | Directrice | 78 | B | Bonne expérience |
| P03 | Moniteur | 92 | A+ | Adoré l'app mobile |
| P04 | Élève | 88 | A | Interface moderne |
| ... | ... | ... | ... | ... |
```

### Score Moyen par Persona
```markdown
| Persona | Score Moyen | n | Min | Max | Écart-type |
|---------|-------------|---|-----|-----|------------|
| Secrétaire | 82 | 3 | 75 | 88 | 6.5 |
| Directrice | 80 | 3 | 75 | 85 | 5.0 |
| Moniteur | 88 | 3 | 82 | 92 | 5.3 |
| Élève | 85 | 3 | 80 | 88 | 4.2 |
| **GLOBAL** | **84** | **12** | **75** | **92** | **5.5** |
```

### Analyse Questions

**Questions les mieux notées** (succès) :
- Q3 "Facile à utiliser" : 4.5/5 moyenne ✅
- Q7 "Apprentissage rapide" : 4.8/5 ✅
- Q9 "Confiance" : 4.2/5 ✅

**Questions les moins bien notées** (pain points) :
- Q4 "Besoin d'aide technique" : 3.1/5 ⚠️
- Q8 "Lourd à utiliser" : 2.8/5 (inversé = bien) ✅
- Q6 "Incohérences" : 2.5/5 (inversé = bien) ✅

---

## 🚀 ACTIONS SELON SCORE

### Si Score < 70 🔴
**Actions immédiates** :
1. Identifier top 5 pain points
2. Prioriser P0 (bloqueurs)
3. Refaire tests après fixes
4. Repousser prod si nécessaire

### Si Score 70-79 🟡
**Actions recommandées** :
1. Lancer MVP avec prudence
2. Implémenter quick wins
3. Monitorer satisfaction premiers users
4. Itérer rapidement

### Si Score 80+ ✅
**Félicitations !** :
1. Prod ready
2. Continuer optimisations
3. Benchmarker vs concurrents
4. Viser 90+ long terme

---

## 📋 TEMPLATE RAPPORT SUS

```markdown
# 📊 RÉSULTATS SUS - VIAMENTOR

**Date tests** : [Date]  
**Participants** : 12 (3×4 personas)  
**Score SUS moyen** : 84/100 (Grade A) ✅

---

## SCORE GLOBAL

```
┌─────────────────────────────────────────┐
│                                         │
│    SCORE SUS : 84/100                   │
│    Grade : A (Excellent)                │
│    Percentile : Top 15%                 │
│                                         │
│    ████████████████░░░░░ 84%            │
│                                         │
└─────────────────────────────────────────┘
```

**Interprétation** : Très bonne usabilité. Prod ready ✅

---

## DISTRIBUTION SCORES

```
Score
100 │
 90 │     ●
 80 │  ●  ●  ●●  
 70 │     ●●
 60 │
 50 │
  0 └─────────────────────
     P1 P2 P3 P4 P5 ...
     
Moyenne : 84
Médiane : 85
Min : 75
Max : 92
```

---

## PAR PERSONA

| Persona | Score | Interprétation |
|---------|-------|----------------|
| 🎨 Secrétaire | 82 | Excellent ✅ |
| 👩‍💼 Directrice | 80 | Excellent ✅ |
| 🚗 Moniteur | 88 | Exceptionnel 🏆 |
| 🎓 Élève | 85 | Excellent ✅ |

---

## QUESTIONS CLÉS

### ✅ Forces (Questions bien notées)

**Q7 : "Apprentissage rapide"** (4.8/5) 🏆
- "J'ai compris en 2 minutes"
- "Très intuitif"
- Interface claire

**Q3 : "Facile à utiliser"** (4.5/5) ✅
- "Pas besoin de formation"
- "Logique"

**Q9 : "Confiance"** (4.2/5) ✅
- "Je sais où je vais"
- "Zéro stress"

---

### ⚠️ Points d'amélioration

**Q4 : "Besoin d'aide technique"** (3.1/5) ⚠️
- 4/12 participants ont dit "peut-être besoin aide"
- Raison : Terminologie métier pas claire
- Fix : Tooltips + onboarding wizard

**Q10 : "Besoin d'apprendre"** (3.5/5) ⚠️
- Courbe apprentissage acceptable mais améliorable
- Fix : Vidéos tutoriels + in-app help

---

## RECOMMANDATIONS

### Quick Wins (< 1 semaine)
1. Ajouter tooltips termes techniques
2. Créer vidéo onboarding 3 min
3. In-app help contextuel

### Long Term (> 1 mois)
1. Onboarding interactif guidé
2. Assistant AI chatbot
3. Personnalisation per persona
```

---

## ✅ CHECKLIST ADMINISTRATION SUS

- [ ] Imprimer questionnaires (ou Google Forms)
- [ ] Administrer **APRÈS** toutes les tâches
- [ ] Laisser participant seul (pas de pression)
- [ ] Temps limite : 5 min max
- [ ] Calculer score immédiatement
- [ ] Noter commentaires verbaux supplémentaires

---

_Questionnaire SUS créé le 28 octobre 2025 - Prêt à utiliser_

