# ⚖️ AUDIT - LEGAL / DPO

**Rôle** : Legal / DPO (Data Protection Officer)  
**Mission** : Empêcher l'amende ou le blocage de l'app  
**Score Global** : 🟡 **5/10**  
**Statut** : CONCEPTION BONNE, EXÉCUTION MANQUANTE

---

## ✅ Tâches à contrôler

### 14.1 CGU + CGV + Politique confidentialité en ligne + PDF
**Statut** : 🟡 **PARTIEL**  
**Évaluation** : 5/10

**Constat** :
- ✅ Pages légales existent (code)
  - `viamentor-legal-terms-page.tsx`
  - `viamentor-privacy-policy-page.tsx`
  - `viamentor-cookies-policy-page.tsx`
- ✅ Routes accessibles :
  - `/mentions-legales`
  - `/confidentialite`
  - `/cookies`
- ❌ Contenu = placeholder / lorem ipsum
- ❌ Pas de PDF téléchargeable
- 🔴 **NON CONFORME** pour production

**Routes trouvées** :
```typescript
// App.tsx
<Route path="/mentions-legales" element={<LegalTermsPage />} />
<Route path="/confidentialite" element={<PrivacyPolicyPage />} />
<Route path="/cookies" element={<CookiesPolicyPage />} />
```

**Action requise URGENTE** :

**CGU (Conditions Générales d'Utilisation)** :

```markdown
# Conditions Générales d'Utilisation - Viamentor

## 1. Objet
Les présentes CGU régissent l'utilisation de la plateforme Viamentor...

## 2. Définitions
- "Plateforme" : Viamentor.ch
- "Utilisateur" : Auto-école cliente
- "Données" : Informations élèves, moniteurs, planning

## 3. Inscription
L'inscription nécessite :
- Raison sociale de l'auto-école
- Email professionnel
- Acceptation CGU + CGV

## 4. Services fournis
- Gestion élèves
- Planning leçons
- Facturation QR suisse
- Analytics

## 5. Obligations client
- Données exactes
- Respect loi (OAC)
- Paiement dans délais

## 6. Responsabilités
Viamentor n'est pas responsable de...

## 7. Données personnelles
Voir Politique de confidentialité

## 8. Résiliation
...

## 9. Loi applicable
Droit suisse, tribunaux de Genève

Date : 1er novembre 2025
```

**Politique de Confidentialité (nDSG - Nouvelle Loi Données Suisse)** :

```markdown
# Politique de Confidentialité

## 1. Responsable du traitement
Viamentor SA
Rue de ... Genève
Email : dpo@viamentor.ch

## 2. Données collectées
### Élèves
- Identité : nom, prénom, date naissance
- Contact : email, téléphone, adresse
- Formation : catégorie, progression, notes
- Financier : factures, paiements

### Moniteurs
- Identité : nom, prénom, N° OMCo
- Qualifications : catégories enseignées
- Performance : notes élèves, statistiques

## 3. Finalités
- Gestion formation (base légale : contrat)
- Facturation (base légale : obligation légale)
- Marketing (base légale : consentement)

## 4. Destinataires
- Auto-école cliente (accès complet)
- Supabase (hébergement Suisse/EU)
- SendGrid (envoi emails)

## 5. Transferts hors Suisse
Données hébergées en Suisse (Zurich region Supabase)
Si transfert UE : clauses contractuelles types

## 6. Durée conservation
- Données actives : Durée formation + 10 ans
- Données financières : 10 ans (obligation fiscale)
- Données marketing : 3 ans inactivité

## 7. Droits nDSG
- Droit d'accès (export data)
- Droit de rectification
- Droit à l'effacement
- Droit à la portabilité
- Droit d'opposition (marketing)

Contact DPO : dpo@viamentor.ch

## 8. Sécurité
- Chiffrement HTTPS (TLS 1.3)
- Chiffrement DB at rest
- Backups quotidiens chiffrés
- Accès limité (RBAC)

## 9. Cookies
Voir Politique Cookies

Dernière mise à jour : 1er novembre 2025
```

**Exporter en PDF** :
```bash
npm install -D jspdf
# Generate PDF from markdown
```

---

### 14.2 Bannière cookies conforme (ePrivacy, CNIL)
**Statut** : 🟢 **BON**  
**Évaluation** : 7/10

**Constat** :
- ✅ Cookie banner component exists
  - `viamentor-cookie-banner.tsx`
- ✅ Configuration pensée
- ❌ Consent management non implémenté
- ❌ Pas de CMP (Consent Management Platform)

**Code trouvé** :
```typescript
// viamentor-cookie-banner.tsx
// Banner UI existe
// Mais : consent storage à implémenter
```

**Action requise** :

**Cookie Consent Management** :

```typescript
// lib/cookie-consent.ts
export type CookieConsent = {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export function saveConsent(consent: CookieConsent) {
  localStorage.setItem('cookie-consent', JSON.stringify({
    ...consent,
    timestamp: new Date().toISOString(),
    version: '1.0',
  }));
  
  // Apply consent
  if (consent.analytics) {
    initGoogleAnalytics();
  }
  if (consent.marketing) {
    initMetaPixel();
  }
}

export function getConsent(): CookieConsent | null {
  const stored = localStorage.getItem('cookie-consent');
  if (!stored) return null;
  return JSON.parse(stored);
}
```

**Bannière conforme** :
- ✅ Visible au 1er visit
- ✅ Options granulaires (pas juste Accepter/Refuser)
- ✅ Révocable (lien footer)
- ✅ Documentation claire

**Alternative** : Utiliser CMP comme **Cookiebot** ou **Axeptio**

---

### 14.3 Classification des données (PII, sensitive) faite
**Statut** : 🟢 **BON**  
**Évaluation** : 7/10

**Constat** :
- ✅ Classification implicite dans architecture
- ✅ Séparation données sensibles pensée
- ❌ Classification formelle non documentée

**Classification inférée du code** :

| Catégorie | Exemples | Protection | Retention |
|-----------|----------|------------|-----------|
| **PII Standard** | Nom, email, phone | RLS, RBAC | 10 ans |
| **PII Sensible** | N° AVS, date naissance | Encryption | 10 ans |
| **Financier** | Factures, paiements | RLS, audit logs | 10 ans |
| **Pédagogique** | Notes, progression | RLS | 10 ans |
| **Santé** | Certificat médical | Encryption AES-256 | 10 ans |
| **Authentification** | Passwords | Hash bcrypt | N/A |
| **Logs** | Audit trail | Append-only | 7 ans |

**Action requise** :

Formaliser dans `/docs/security/data-classification.md`

---

### 14.4 Procédure « data-breach » testée (tabletop)
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Aucune procédure data breach
- Pas de tabletop exercise
- Obligation légale non remplie (nDSG Art. 24)

**Impact** :
- 🔴 Amende jusqu'à 250'000 CHF si breach + pas de notification
- 🔴 Perte confiance clients
- 🔴 Médias négatifs

**Action requise** :

**Data Breach Response Plan** : `/docs/security/data-breach-plan.md`

```markdown
# Plan de Réponse Violation de Données

## Détection (< 24h)
- Monitoring alerts
- User report
- Security audit

## Phase 1 : Containment (< 2h)
1. Isoler système compromis
2. Bloquer accès attaquant
3. Préserver preuves (logs)
4. Notifier DPO + Direction

## Phase 2 : Assessment (< 24h)
1. Identifier données affectées
2. Nombre de personnes concernées
3. Gravité du risque (high/medium/low)
4. Cause root (vulnérabilité)

## Phase 3 : Notification (< 72h)
### Si risque élevé pour droits/libertés :

**PFPDT (Préposé Fédéral)** :
- Email : info@edoeb.admin.ch
- Dans les 72h de découverte
- Formulaire : https://www.edoeb.admin.ch

**Personnes concernées** :
- Email individuel
- Mesures de protection recommandées
- Hotline support

**Public** :
- Communiqué de presse (si > 1000 personnes)

## Phase 4 : Remediation
1. Patcher vulnérabilité
2. Restore données si corruption
3. Renforcer sécurité
4. Audit externe

## Phase 5 : Postmortem (< 7 jours)
1. Rapport détaillé
2. Lessons learned
3. Actions préventives
4. Update procedures

## Contacts
- DPO : dpo@viamentor.ch / +41 XX XXX XX XX
- PFPDT : +41 58 462 43 95
- Avocat : [Cabinet]
- Assurance cyber : [Police]
```

**Tabletop Exercise** (1× par an) :

```markdown
# Scenario Tabletop

**Scénario** : Laptop moniteur volé avec accès 50 élèves

**Participants** :
- DPO
- CTO
- CEO
- Legal counsel

**Déroulement** (90 min) :
1. Présentation scénario
2. Chacun : « Que faites-vous dans les 10 premières minutes ? »
3. Discussion phase containment
4. Discussion notification (PFPDT, clients)
5. Débriefing : gaps identifiés
```

---

### 14.5 Contrats sous-traitants (DPA) signés avant prod
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Aucun DPA signé
- Sous-traitants identifiés :
  - Supabase (hébergement)
  - Vercel (frontend hosting)
  - (Future : SendGrid, Twilio, etc.)

**Obligation légale** : Art. 28 RGPD / Art. 9 nDSG

**Action requise URGENTE** :

**DPA à signer** :

| Sous-traitant | Service | Données | DPA signé | Deadline |
|---------------|---------|---------|-----------|----------|
| Supabase | DB + Auth + Storage | Toutes PII | ❌ | Avant prod |
| Vercel | Frontend hosting | Aucune* | ✅ N/A | N/A |
| SendGrid | Email transactional | Email, nom | ❌ | Avant prod |
| Twilio | SMS | Phone, nom | ❌ | Avant prod |

*Vercel = statique, pas de PII

**Template DPA** :
```markdown
# Data Processing Agreement (DPA)

Entre :
- Viamentor SA (Responsable traitement)
- Supabase Inc. (Sous-traitant)

Article 1 : Objet
Supabase héberge la base de données contenant :
- Données élèves (PII)
- Données financières
- Logs application

Article 2 : Obligations sous-traitant
- Traiter données uniquement sur instruction
- Garantir confidentialité
- Assister notification breach
- Supprimer données après fin contrat

Article 3 : Sécurité
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Access control (RBAC)
- Backups chiffrés

Article 4 : Sous-sous-traitants
- AWS (infrastructure)
- Autorisation préalable requise

Article 5 : Audit
Viamentor peut auditer Supabase (sur demande)

Article 6 : Durée
Pendant toute la durée du contrat commercial

Signatures :
Viamentor : ___________
Supabase : ___________
```

**Où signer** :
- Supabase : Via dashboard (enterprise plan)
- Autres : Demander au provider

---

## 📊 Indicateur Legal

**Cible** : 0 plainte CNIL / 0 injunction

**État actuel** : ✅ **0** (pas encore en prod)

**Risque post-lancement** : 🔴 **ÉLEVÉ** sans CGU/CGV

**Sanctions possibles (nDSG)** :
- Amende : jusqu'à 250'000 CHF
- Injonction : blocage activité
- Médiatisation négative

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| CGU + CGV + Privacy | 5/10 | 30% | 1.5 |
| Bannière cookies | 7/10 | 20% | 1.4 |
| Data classification | 7/10 | 20% | 1.4 |
| Data breach plan | 0/10 | 20% | 0 |
| DPA signés | 0/10 | 10% | 0 |
| **TOTAL** | **5/10** | 100% | **4.3/10** |

---

## 📋 ACTIONS PRIORITAIRES

### P0 - AVANT PRODUCTION (BLOQUEUR)
- [ ] Rédiger CGU (avocat recommandé)
- [ ] Rédiger CGV (tarifs, paiement, résiliation)
- [ ] Rédiger Politique Confidentialité (nDSG conforme)
- [ ] Signer DPA Supabase
- [ ] Data breach plan

### P1 - Sprint 1
- [ ] Bannière cookies fonctionnelle
- [ ] Consent management complet
- [ ] Cookie policy détaillée
- [ ] RGPD : Registre traitements

### P2 - Post-MVP
- [ ] Certification (ISO 27001, SOC 2)
- [ ] Audit RGPD externe
- [ ] Formation équipe (RGPD awareness)

---

## 🔒 CHECKLIST COMPLIANCE nDSG

### Transparence
- [ ] Politique confidentialité accessible (1 clic)
- [ ] Infos collectées listées
- [ ] Finalités explicitées
- [ ] Durées conservation indiquées
- [ ] Sous-traitants listés

### Consentement
- [ ] Opt-in explicite (cookies non-nécessaires)
- [ ] Révocable facilement
- [ ] Granulaire (analytics vs marketing)
- [ ] Horodaté + versioned

### Droits Utilisateurs
- [ ] Accès : export données (JSON/CSV)
- [ ] Rectification : formulaire édition
- [ ] Effacement : bouton « supprimer compte »
- [ ] Portabilité : export standardisé
- [ ] Opposition : opt-out marketing

### Sécurité
- [ ] Encryption at rest + in transit
- [ ] Access control (RBAC)
- [ ] Audit logs
- [ ] Backups chiffrés
- [ ] Incident response plan

### Documentation
- [ ] Registre traitements tenu à jour
- [ ] DPIA (Data Protection Impact Assessment) si haut risque
- [ ] DPA tous sous-traitants
- [ ] Formation équipe

---

## ⚖️ RGPD vs nDSG (Suisse)

| Aspect | RGPD (UE) | nDSG (Suisse) | Viamentor |
|--------|-----------|---------------|------------|
| **Scope** | UE residents | Suisse residents | ✅ Suisse focus |
| **Consentement** | Opt-in strict | Opt-in préférable | 🟡 À implémenter |
| **DPO obligatoire** | Oui (si > 250 pers) | Non | 🟡 Recommandé |
| **Notification breach** | 72h CNIL | 72h PFPDT | 🔴 Plan manquant |
| **Amendes max** | 20M€ ou 4% CA | 250'000 CHF | - |
| **Droits personnes** | 8 droits | 6 droits | 🟡 Partiels |

**Stratégie** : Conformité **nDSG** (Suisse) + **RGPD** (si clients UE futurs)

---

## 🚦 RECOMMANDATION

**Statut** : 🔴 **BLOQUEUR ABSOLU pour production**

**Sans CGU/CGV/Privacy Policy** :
- Illégal de collecter données
- Risque amende
- Impossible d'opérer légalement

**Effort** :
- Rédaction avocat : 5'000 - 15'000 CHF
- Ou templates adaptés : 1 semaine
- DPA : 2-4 semaines négociation

**Timeline** : **4-6 semaines** pour être compliant

---

**Prochaines étapes** : Consulter `15-customer-success.md`

