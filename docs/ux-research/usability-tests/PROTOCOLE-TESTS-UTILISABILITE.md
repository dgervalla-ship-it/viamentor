# 🧪 PROTOCOLE TESTS UTILISABILITÉ VIAMENTOR

**Version** : 1.0  
**Date** : 28 octobre 2025  
**Owner** : UX Designer Viamentor  
**Objectif** : Tester 5 parcours critiques avec utilisateurs réels

---

## 📋 VUE D'ENSEMBLE

### Objectifs Tests
1. **Mesurer** taux de complétion des tâches critiques
2. **Identifier** pain points et blocages UX
3. **Quantifier** satisfaction (SUS score)
4. **Valider** hypothèses design
5. **Prioriser** améliorations

### Méthode
- **Type** : Tests modérés (facilitateur présent)
- **Format** : Think-aloud protocol
- **Durée** : 45-60 min/participant
- **Lieu** : Distanciel (Zoom) + présentiel (optionnel)
- **Recording** : Vidéo + écran + audio

---

## 👥 RECRUTEMENT PARTICIPANTS

### Profils Recherchés

| Persona | Nombre | Critères | Compensation |
|---------|--------|----------|--------------|
| Directrice école | 3 | Propriétaire/Gérant auto-école | CHF 150 |
| Moniteur indép. | 3 | Freelance 3+ ans expérience | CHF 100 |
| Secrétaire | 3 | Rôle admin auto-école | CHF 100 |
| Élève Gen Z | 3 | 18-25 ans, en formation | CHF 50 |
| **TOTAL** | **12** | Mix cantons (GE/VD/VS/FR) | **CHF 1'250** |

### Critères Exclusion
- ❌ Moins de 6 mois expérience auto-école
- ❌ UX designers / tech-savvy (biais)
- ❌ Famille/amis équipe Viamentor

### Recrutement Channels
1. **LinkedIn** : Posts ciblés groupes auto-écoles suisses
2. **ASTAG** : Association transports routiers (partenariat)
3. **Facebook** : Groupes élèves conducteurs Genève/Lausanne
4. **Referral** : Auto-écoles clientes beta

---

## 📅 PLANNING TESTS

### Timeline
```
📆 Semaine 1 : Recrutement (15 participants cible, 12 nécessaires)
📆 Semaine 2-3 : Tests individuels (12×1h = 12h tests)
📆 Semaine 4 : Analyse + Rapport
📆 Semaine 5 : Présentation résultats + Roadmap fixes
```

### Calendrier Tests
- **Slot 1** : Lundi-Vendredi, 9h-11h (matinée)
- **Slot 2** : Lundi-Vendredi, 14h-16h (après-midi)
- **Slot 3** : Samedi, 10h-14h (élèves)
- 2 participants/jour max (éviter fatigue facilitateur)

---

## 🎯 TÂCHES À TESTER

### Test #1 : Inscription Élève (Secrétaire)
**Durée** : 10 min  
**Persona** : Sophie (Secrétaire)  
**Criticité** : 🔴 Critique

**Scénario** :
> "Un prospect, Kevin Weber (19 ans), t'appelle pour s'inscrire au permis B standard. Il te donne ses informations. Inscris-le dans le système."

**Informations fournies (carte)** :
- Nom : WEBER
- Prénom : Kevin
- Date naissance : 15/03/2005
- N° AVS : 756.1234.5678.90
- Tél : +41 79 123 45 67
- Email : kevin.weber@gmail.com
- Adresse : Rue du Lac 12, 1200 Genève
- Catégorie : B (voiture)
- Type cours : Standard

**Critères succès** :
- [ ] Élève créé avec toutes infos correctes
- [ ] Email/SMS confirmation envoyés
- [ ] Temps < 12 min

**Métriques** :
- Taux complétion (%)
- Temps (min:sec)
- Nombre erreurs
- Nombre retours arrière
- Nombre demandes aide

---

### Test #2 : Réserver Leçon (Secrétaire)
**Durée** : 3 min  
**Persona** : Sophie  
**Criticité** : 🔴 Critique

**Scénario** :
> "L'élève Julie Dupont t'appelle pour réserver une leçon le mercredi 30 octobre à 14h00 avec son moniteur habituel Pierre Maillard. Réserve sa leçon."

**Critères succès** :
- [ ] Leçon réservée mercredi 30 oct, 14h
- [ ] Moniteur Pierre assigné
- [ ] Confirmation SMS/Email envoyée
- [ ] Temps < 3 min

**Métriques** :
- Taux complétion
- Temps
- Gestion conflit (si créneau occupé)
- Satisfaction (subjective)

---

### Test #3 : Gérer Crise Moniteur Absent (Directrice)
**Durée** : 8 min  
**Persona** : Marie  
**Criticité** : 🔴 Critique

**Scénario** :
> "Le moniteur Pierre Maillard t'appelle à 7h30 : il est malade et ne peut pas venir. Il a 8 leçons aujourd'hui. Réassigne ses leçons à d'autres moniteurs disponibles."

**Critères succès** :
- [ ] Les 8 leçons réassignées
- [ ] SMS envoyés aux élèves concernés
- [ ] Temps < 10 min
- [ ] 0 conflit créé

**Métriques** :
- Taux complétion
- Temps
- Niveau stress (échelle 1-10)
- Confiance solution (échelle 1-10)

---

### Test #4 : Consulter Planning Mobile (Moniteur)
**Durée** : 2 min  
**Persona** : Pierre  
**Criticité** : 🔴 Critique

**Scénario** :
> "Tu es dans ta voiture le matin à 7h. Tu veux voir ton planning du jour et consulter la fiche de ton premier élève. Utilise l'app mobile."

**Critères succès** :
- [ ] Planning jour affiché < 5s
- [ ] Fiche élève consultée
- [ ] Navigation vers adresse lancée
- [ ] Temps total < 2 min

**Métriques** :
- Temps chargement
- Temps complétion
- Facilité usage 1 main (échelle 1-10)
- Lisibilité en plein soleil (si test présentiel)

---

### Test #5 : Générer Factures QR (Secrétaire)
**Durée** : 8 min  
**Persona** : Sophie  
**Criticité** : 🟠 Important

**Scénario** :
> "C'est la fin du mois. Tu dois générer et envoyer les factures QR pour toutes les leçons d'octobre non encore facturées. Fais la facturation complète."

**Critères succès** :
- [ ] Toutes leçons sélectionnées
- [ ] Factures générées (PDF QR)
- [ ] Emails envoyés aux élèves
- [ ] Temps < 15 min

**Métriques** :
- Taux complétion
- Temps
- Nombre erreurs
- Confiance (QR-factures correctes)

---

## 🎤 SCRIPT FACILITATEUR

### Introduction (5 min)

```
Bonjour [Prénom], merci d'être là ! Je suis [Ton nom], UX Designer chez Viamentor.

Aujourd'hui, on va tester notre nouvelle plateforme pour auto-écoles. L'objectif est d'identifier ce qui marche bien et ce qui peut être amélioré.

⚠️ Important :
1. On teste l'INTERFACE, pas TOI. Il n'y a pas de bonnes/mauvaises réponses.
2. Si tu bloques, c'est NOTRE faute, pas la tienne.
3. Pense à VOIX HAUTE : dis ce que tu vois, ce que tu penses, tes doutes.
4. Pose des questions si besoin, mais j'essaierai de te laisser explorer d'abord.
5. Je vais enregistrer écran + audio pour analyse, OK ?

Tu as des questions avant qu'on commence ?
```

### Pendant le Test (30 min)

**Attitude facilitateur** :
- 😊 Bienveillant, encourageant
- 🤐 Silencieux (laisser participant explorer)
- 👂 Écoute active
- 📝 Notes discrètes

**Si participant bloqué** :
```
Niveau 1 (30s silence) : "Qu'est-ce que tu penses faire maintenant ?"
Niveau 2 (1 min blocage) : "Où irais-tu chercher cette fonction ?"
Niveau 3 (2 min blocage) : "Tu peux cliquer sur [zone] pour voir"
```

**Questions relance** :
- "Qu'est-ce que tu penses de cet écran ?"
- "Tu t'attendais à quoi en cliquant là ?"
- "C'était facile/difficile ? Pourquoi ?"
- "Tu ferais différemment ?"

### Après Tâches (10 min)

**Questions ouvertes** :
1. "Quelle tâche était la plus facile ? La plus difficile ?"
2. "Qu'est-ce qui t'a surpris (positivement/négativement) ?"
3. "Qu'est-ce qui manque selon toi ?"
4. "Tu recommanderais Viamentor à un collègue ? Pourquoi ?"
5. "Si tu pouvais changer 1 seule chose, ce serait quoi ?"

**Questionnaire SUS** (voir fichier séparé)

**Conclusion** :
```
Merci beaucoup [Prénom] ! Tes retours sont super précieux.

On va analyser tous les tests et améliorer l'interface selon vos feedbacks.

Tu recevras CHF [montant] par virement dans 5 jours ouvrés.

Tu veux être recontacté quand la nouvelle version sera prête ?
```

---

## 📊 GRILLE D'OBSERVATION

### Métriques Quantitatives

| Tâche | Participant | Temps | Complétion | Erreurs | Retours | Aide | SUS |
|-------|-------------|-------|------------|---------|---------|------|-----|
| 1. Inscription | P01 | 08:45 | ✅ Oui | 2 | 3 | 1 | 85 |
| 1. Inscription | P02 | 10:30 | ✅ Oui | 1 | 1 | 0 | 90 |
| ... | ... | ... | ... | ... | ... | ... | ... |

### Métriques Qualitatives

**Template notes participant** :
```markdown
# Participant P01 - Sophie (Secrétaire, 32 ans)

## Tâche 1 : Inscription Élève

### Comportements observés
- ✅ Trouve bouton "Nouvel élève" immédiatement (top bar)
- ⚠️ Hésite sur format N° AVS (essaie avec/sans points)
- 😟 Frustration visible étape 3 (legal checkboxes)
- 😊 Soulagée quand SMS confirmation arrive

### Citations verbatim
> "Ah, je dois mettre les points ou pas dans l'AVS ?"
> "C'est quoi FABER ?" (confusion legal)
> "Waouh, le SMS est déjà arrivé, rapide !"

### Pain points
1. 🔴 Format AVS pas clair (tooltip manquant)
2. 🟡 Legal jargon (FABER, RGPD) incompréhensible
3. 🟢 Auto-save apprécié

### Suggestions
- "Mettre un exemple de N° AVS à côté du champ"
- "Simplifier les checkboxes légales"
```

---

## 📈 ANALYSE & RAPPORT

### Template Rapport Final

```markdown
# 🧪 RAPPORT TESTS UTILISABILITÉ VIAMENTOR

**Date** : [Date]  
**Participants** : 12 (3 directrices, 3 moniteurs, 3 secrétaires, 3 élèves)  
**Tâches testées** : 5 parcours critiques  
**Méthode** : Think-aloud, tests modérés

---

## 📊 RÉSULTATS GLOBAUX

### Taux de Complétion
- Inscription élève : 95% (11/12) ✅
- Réservation leçon : 90% (10/11) ✅
- Gestion crise : 85% (9/12) ⚠️
- Planning mobile : 100% (12/12) 🎉
- Facturation : 80% (8/10) ⚠️

### Temps Moyen
| Tâche | Temps Moyen | Temps Cible | Écart |
|-------|-------------|-------------|-------|
| Inscription | 9m 30s | < 10 min | ✅ OK |
| Réservation | 2m 45s | < 3 min | ✅ OK |
| Crise | 8m 15s | < 10 min | ✅ OK |
| Planning | 25s | < 2 min | ✅ Excellent |
| Facturation | 38m | < 30 min | ⚠️ Trop long |

### SUS Score Moyen
- **Global** : 82/100 (Bon ✅)
- Par tâche :
  - Inscription : 85/100 ✅
  - Réservation : 88/100 ✅
  - Crise : 75/100 ⚠️ (stressant)
  - Planning mobile : 92/100 🎉
  - Facturation : 78/100 ⚠️

---

## 🔴 TOP 10 PAIN POINTS

| Rang | Pain Point | Fréquence | Gravité | Effort Fix |
|------|------------|-----------|---------|------------|
| 1 | **Format N° AVS confusion** | 10/12 | 🔴 High | 1h |
| 2 | **Génération factures lente** | 8/10 | 🔴 High | 1 sem |
| 3 | **Legal jargon incompréhensible** | 7/12 | 🟡 Medium | 2h |
| 4 | **Détection conflits pas assez visible** | 6/11 | 🟡 Medium | 3 jours |
| 5 | **Pas de suggestions réassignation** | 9/12 | 🟡 Medium | 2 sem |
| ... | ... | ... | ... | ... |

---

## ✅ CE QUI MARCHE BIEN

1. ✅ **Auto-save** : 100% participants ont apprécié
2. ✅ **Planning mobile rapide** : Chargement < 2s
3. ✅ **SMS confirmation instant** : Wow effect
4. ✅ **Interface claire** : Navigation intuitive
5. ✅ **Raccourcis clavier** : Secrétaires adorent Cmd+K

---

## 🚀 RECOMMANDATIONS

### P0 - URGENT (Avant MVP)
1. Ajouter tooltip exemple N° AVS
2. Optimiser génération factures (-50% temps)
3. Simplifier legal checkboxes
4. Améliorer détection conflits visuels

### P1 - Important (Sprint 1)
1. Suggestions réassignation intelligentes
2. Templates email facturation custom
3. Feedback visuels améliorés
4. Dark mode moniteurs (mobile)

### P2 - Nice-to-have (Sprint 2+)
1. Scan OCR pièce identité
2. Voice input mobile
3. Gamification élèves
4. Analytics dashboards avancés
```

---

## ✅ CHECKLIST AVANT TEST

### Matériel
- [ ] Laptop chargé (+ chargeur)
- [ ] Internet stable (backup 4G)
- [ ] Zoom/Meet configuré + recording activé
- [ ] Compte Viamentor test avec données réalistes
- [ ] Cartes scénarios imprimées
- [ ] Formulaire consentement signé
- [ ] Questionnaire SUS prêt
- [ ] Timer visible

### Environnement Test
- [ ] Prototype staging accessible
- [ ] Données mock réalistes (élèves, moniteurs, planning)
- [ ] Bug connus contournés (workarounds prêts)
- [ ] Backup plan si crash (staging2)

### Équipe
- [ ] Facilitateur briefé
- [ ] Observer silencieux (optionnel)
- [ ] Note-taker assigné

---

## 📚 RESSOURCES

- **Template rapport** : `/docs/ux-research/usability-tests/TEMPLATE-RAPPORT.md`
- **Questionnaire SUS** : `/docs/ux-research/usability-tests/QUESTIONNAIRE-SUS.md`
- **Formulaire consentement** : `/docs/ux-research/usability-tests/CONSENTEMENT.md`
- **Cartes scénarios** : `/docs/ux-research/usability-tests/CARTES-SCENARIOS.pdf`

---

_Protocole validé le 28 octobre 2025 - Prêt pour recrutement participants_

