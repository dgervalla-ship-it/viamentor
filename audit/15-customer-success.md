# 🤝 AUDIT - CUSTOMER SUCCESS MANAGER

**Rôle** : Customer Success Manager  
**Mission** : Faire en sorte que le client paie et reste  
**Score Global** : 🔴 **2/10**  
**Statut** : CRITIQUE - Aucune stratégie CS

---

## ✅ Tâches à contrôler

### 15.1 Onboarding program (email + in-app) map 1er jour → 30e jour
**Statut** : 🟡 **PARTIEL**  
**Évaluation** : 4/10

**Constat** :
- ✅ Onboarding wizard existe (code)
  - `viamentor-onboarding-page.tsx`
  - `viamentor-onboarding-wizard.tsx`
  - 5 étapes : Info école, Users/Roles, Catégories, Paiement, Finalisation
- ✅ Bien pensé (in-app)
- ❌ Pas de séquence email
- ❌ Pas de suivi post-onboarding

**Onboarding existant (in-app)** :

```
Étape 1 : Infos école (nom, logo, canton)
Étape 2 : Utilisateurs & rôles (invitations)
Étape 3 : Catégories & véhicules
Étape 4 : Configuration paiement (IBAN, QR)
Étape 5 : Finalisation (CGU, go live)
```

**Ce qui manque : Email Onboarding Journey**

```markdown
# Email Onboarding Sequence

## J0 : Signup (immédiat)
**Subject** : Bienvenue sur Viamentor ! 🎉  
**CTA** : Compléter onboarding (30 min)

## J1 : Onboarding incomplet (si pas fini)
**Subject** : Finalisez votre configuration Viamentor  
**CTA** : Reprendre où vous étiez

## J2 : Onboarding complété
**Subject** : Bravo ! Voici vos prochaines étapes  
**CTA** : Ajouter premier élève

## J7 : Check-in
**Subject** : Comment ça se passe ? On peut vous aider ?  
**CTA** : Réserver démo personnalisée

## J14 : Tips & Tricks
**Subject** : 5 astuces pour gagner du temps  
**CTA** : Voir video tips

## J30 : Success check
**Subject** : Votre avis nous intéresse  
**CTA** : NPS survey (1 min)
```

**Tool recommandé** : 
- Customer.io
- Intercom
- Loops.so

---

### 15.2 Health score par client (usage, NPS, support) dashboard
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Aucun health score défini
- Aucun dashboard CS
- Impossible de prédire churn

**Action requise** :

**Customer Health Score** :

```markdown
# Health Score Formula

## Metrics (0-100 points)

### Usage (40 pts)
- Daily Active Users : 20 pts
- Features adopted : 10 pts
- Login frequency : 10 pts

### Engagement (30 pts)
- Support tickets opened : -10 pts (si > 5/mois)
- Feature requests : +5 pts (engagement)
- Training completed : +10 pts
- Community participation : +5 pts

### Financial (20 pts)
- Invoices paid on time : +10 pts
- Upsell potential : +10 pts

### Satisfaction (10 pts)
- NPS score : 10 pts (0-10 scale)

## Status
- 80-100 : 🟢 Healthy (promote, upsell)
- 60-79 : 🟡 At risk (check-in call)
- 40-59 : 🟠 Churning (intervention urgente)
- 0-39 : 🔴 Lost (save or let go)

## Dashboard Metrics

| Tenant | Health | Usage | NPS | MRR | Action |
|--------|--------|-------|-----|-----|--------|
| École Genève | 85 🟢 | 90% | 9 | 500 CHF | Upsell Pro |
| École Lausanne | 45 🟠 | 30% | 4 | 200 CHF | Call ASAP |
```

**Tool** : 
- Vitally
- ChurnZero
- Custom dashboard (Metabase)

---

### 15.3 QBR (Quarterly Business Review) calendrier automatique
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Aucun QBR planifié
- Relation client réactive (pas proactive)

**Action requise** :

**QBR Process** :

```markdown
# Quarterly Business Review (QBR)

## Fréquence
- Tous les 3 mois
- Calendrier auto (ajouté à l'onboarding)

## Participants
- Client : Directeur école
- Viamentor : CSM + Account Manager

## Agenda (60 min)

### 1. Review Q passé (20 min)
- Usage stats (DAU, features adopted)
- Wins (succès, gains temps/argent)
- Challenges rencontrés
- Support tickets recap

### 2. Business Impact (15 min)
- Metrics business client :
  - Élèves inscrits (trend)
  - CA généré (trend)
  - Taux réussite examen
  - Satisfaction élèves
- ROI Viamentor calculé

### 3. Roadmap Preview (15 min)
- Nouvelles features Q prochain
- Features demandées par client (statut)
- Bêta tests opportunités

### 4. Next Steps (10 min)
- Actions client (formation, adoption features)
- Actions Viamentor (support, custom config)
- Next QBR date

## Deliverables
- **Rapport QBR PDF** (envoyé J+2)
- **Action plan** (suivi mensuel)
- **Success metrics** (dashboard partagé)
```

**Automation** :
- Auto-invite calendar 90 jours après onboarding
- Auto-generate QBR report (usage data)

---

### 15.4 Base de connaissances consultable sans login
**Statut** : 🟡 **PARTIEL**  
**Évaluation** : 3/10

**Constat** :
- ✅ Pages publiques existent :
  - `/faq`
  - `/ressources`
  - `/a-propos`
- ❌ Contenu = placeholder
- ❌ Pas de Help Center structuré
- ❌ Recherche absence

**Action requise** :

**Help Center Structure** :

```
/help/
├── getting-started/
│   ├── signup.md
│   ├── first-student.md
│   └── first-lesson.md
├── students/
│   ├── create-student.md
│   ├── import-students.md
│   └── student-progression.md
├── planning/
│   ├── book-lesson.md
│   ├── conflicts.md
│   └── availability.md
├── invoicing/
│   ├── generate-qr-invoice.md
│   ├── send-invoice.md
│   └── record-payment.md
├── troubleshooting/
│   ├── cant-login.md
│   ├── email-not-received.md
│   └── payment-failed.md
└── faq.md
```

**Tool recommandé** :
- **Gitbook** (docs as code)
- **Notion** (simple)
- **Intercom Help Center**
- **Crisp Help**

**Features requises** :
- Recherche full-text
- Categorization
- Related articles
- Feedback (helpful yes/no)

---

### 15.5 Escalation process < 24 h pour comptes Enterprise
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Pas de tiers support définis
- Pas de SLA
- Pas de process escalation

**Action requise** :

**Support Tiers** : `/docs/support-tiers.md`

```markdown
# Support Tiers & SLA

## Tier 1 : Self-service
- Help Center
- FAQ
- Video tutorials
- Community forum

**SLA** : 24/7 disponible

## Tier 2 : Email Support
- Email : support@viamentor.ch
- Ticketing : Intercom, Zendesk, Crisp

**SLA** :
- Starter plan : 48h response
- Pro plan : 24h response
- Enterprise : 4h response

## Tier 3 : Priority Support
- Phone : +41 XX XXX XX XX
- Video call : Calendly link

**SLA** :
- Enterprise only
- < 4h response
- < 24h resolution (P1)

## Tier 4 : Escalation (P0 Critical)
- On-call dev : [Phone]
- CEO : [Email, Phone]

**SLA** :
- Enterprise : < 1h response
- P0 (production down) : < 30 min

## Escalation Matrix

| Severity | Response | Resolution | Escalate if |
|----------|----------|------------|-------------|
| P0 | 30 min | 4h | Not resolved 4h |
| P1 | 4h | 24h | Not resolved 24h |
| P2 | 24h | 72h | Not resolved 72h |
| P3 | 48h | 1 week | Not resolved 1 week |
```

---

## 📊 Indicateur Customer Success

**Cible** : Churn < 2 % / mois OU NPS > 45

**État actuel** : ❌ **NON MESURABLE**

**Prédiction** :
Sans CS proactif : Churn **10-20%/mois** (inacceptable)

**Benchmark SaaS B2B** :
- Excellent : < 2% churn mensuel
- Bon : 2-5%
- Moyen : 5-10%
- Mauvais : > 10%

**NPS Target** :
- Promoters (9-10) : > 50%
- Passives (7-8) : < 30%
- Detractors (0-6) : < 20%
- **NPS** : % Promoters - % Detractors > 45

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| Onboarding email sequence | 4/10 | 30% | 1.2 |
| Health score dashboard | 0/10 | 25% | 0 |
| QBR automatique | 0/10 | 20% | 0 |
| Help Center public | 3/10 | 15% | 0.45 |
| Escalation process | 0/10 | 10% | 0 |
| **TOTAL** | **2/10** | 100% | **1.65/10** |

---

## 📋 ACTIONS PRIORITAIRES

### P0 - Avant lancement client #1
- [ ] Email onboarding sequence (7 emails)
- [ ] Help Center basique (20 articles)
- [ ] Support email configuré
- [ ] SLA définis

### P1 - Premiers 3 clients
- [ ] Health score tracking
- [ ] NPS survey (J30, J90)
- [ ] QBR template
- [ ] Success playbook

### P2 - Scale (10+ clients)
- [ ] CS platform (Vitally, ChurnZero)
- [ ] Automated check-ins
- [ ] Community forum
- [ ] Customer advisory board

---

## 🚀 ONBOARDING EXCELLENCE CHECKLIST

### Pre-signup
- [ ] Demo video accessible (3 min)
- [ ] Case studies (2-3 écoles)
- [ ] Pricing transparent

### Signup (Jour 0)
- [ ] Confirmation email immédiate
- [ ] Welcome email (next steps)
- [ ] In-app tour guidé

### Week 1
- [ ] Daily tips emails
- [ ] Check-in call (20 min)
- [ ] Quick wins encouragés

### Month 1
- [ ] All core features adopted
- [ ] First success milestone (ex: 10 élèves ajoutés)
- [ ] NPS survey
- [ ] QBR scheduled

### Ongoing
- [ ] Monthly newsletter (features, tips)
- [ ] Quarterly QBR
- [ ] Yearly renewal discussion

---

## 🚦 RECOMMANDATION

**Statut** : 🔴 **CRITIQUE - CS inexistant**

**Sans Customer Success** :
- Churn élevé (> 10%/mois)
- LTV faible
- Croissance impossible

**Effort** : 1 CSM temps plein dès 10 clients

**Quick wins** :
1. Email sequence (1 semaine)
2. Help Center (2 semaines)
3. NPS survey (1 jour)

**Priorité** : P1 (après backend + tests)

---

**Prochaines étapes** : Consulter `99-ACTION-PLAN.md`

