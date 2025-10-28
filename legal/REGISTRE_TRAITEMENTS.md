# 📋 REGISTRE DES ACTIVITÉS DE TRAITEMENT

**Viamentor SA - Conformité Art. 30 RGPD + nLPD**

**Date de création** : 28 octobre 2025  
**Responsable** : DPO Viamentor  
**Contact** : dpo@viamentor.ch

---

## FICHE #1 : GESTION DES COMPTES UTILISATEURS

| Élément | Description |
|---------|-------------|
| **Nom du traitement** | Gestion des comptes utilisateurs |
| **Responsable** | Viamentor SA, [Adresse], CHE-XXX.XXX.XXX |
| **DPO** | dpo@viamentor.ch |
| **Finalités** | - Création et gestion comptes<br>- Authentification<br>- Contrôle d'accès |
| **Base légale** | Art. 6.1.b RGPD (exécution contrat) |
| **Catégories de personnes** | - Administrateurs auto-écoles<br>- Moniteurs<br>- Secrétaires<br>- Élèves (>16 ans) |
| **Catégories de données** | - Identité : nom, prénom<br>- Contact : email, téléphone<br>- Connexion : mot de passe hashé<br>- Logs : IP, date/heure connexion |
| **Destinataires** | - Supabase Inc. (hébergement UE) |
| **Transferts hors UE/CH** | Aucun |
| **Délais suppression** | 30 jours après résiliation |
| **Mesures sécurité** | - Hachage bcrypt<br>- TLS 1.3<br>- RLS PostgreSQL<br>- MFA disponible |

---

## FICHE #2 : GESTION DES ÉLÈVES

| Élément | Description |
|---------|-------------|
| **Nom du traitement** | Gestion des dossiers élèves |
| **Finalités** | - Gestion formation conduite<br>- Suivi progression<br>- Obligations légales (autorités) |
| **Base légale** | Art. 6.1.b (contrat) + 6.1.c (obligation légale) RGPD |
| **Catégories de personnes** | Élèves conducteurs (≥16 ans en Suisse) |
| **Catégories de données** | - Identité : nom, prénom, date naissance<br>- Contact : email, téléphone, adresse<br>- Formation : N° FABER, permis, progression<br>- **Sensible** : N° AVS (si fourni) |
| **Destinataires** | - Auto-école responsable<br>- Moniteurs assignés<br>- Supabase (hébergement)<br>- Autorités (sur réquisition) |
| **Transferts hors UE/CH** | Aucun |
| **Délais suppression** | Abonnement + 30j (sauf N° FABER : 5 ans légal) |
| **Mesures sécurité** | - Chiffrement AES-256<br>- RLS multi-tenant<br>- Logs d'accès<br>- Backups chiffrés |

---

## FICHE #3 : FACTURATION & PAIEMENTS

| Élément | Description |
|---------|-------------|
| **Nom du traitement** | Facturation des services de formation |
| **Finalités** | - Émission factures<br>- Comptabilité<br>- Obligations fiscales |
| **Base légale** | Art. 6.1.b (contrat) + 6.1.c (obligation fiscale) RGPD |
| **Catégories de personnes** | - Élèves<br>- Auto-écoles |
| **Catégories de données** | - Identité : nom, prénom, adresse<br>- **Financières** : montants, IBAN, historique paiements<br>- Fiscales : N° facture, TVA |
| **Destinataires** | - Élève (ses factures)<br>- Auto-école (ses ventes)<br>- Comptable externe (si mandaté)<br>- Administration fiscale (sur demande) |
| **Transferts hors UE/CH** | Aucun |
| **Délais suppression** | **10 ans** (obligation fiscale suisse) |
| **Mesures sécurité** | - Chiffrement E2E<br>- RLS strict<br>- Accès limité comptables<br>- Audit trail complet |

---

## FICHE #4 : LEÇONS DE CONDUITE

| Élément | Description |
|---------|-------------|
| **Nom du traitement** | Gestion et suivi des leçons pratiques |
| **Finalités** | - Planning leçons<br>- Suivi formation<br>- Traçabilité légale |
| **Base légale** | Art. 6.1.b (contrat) + 6.1.c (obligation légale) RGPD |
| **Catégories de personnes** | - Élèves<br>- Moniteurs |
| **Catégories de données** | - Planification : date, heure, lieu<br>- Pédagogique : compétences pratiquées, notes instructeur<br>- Évaluation : notation élève |
| **Destinataires** | - Élève (ses leçons)<br>- Moniteur (ses leçons)<br>- Auto-école (gestion) |
| **Transferts hors UE/CH** | Aucun |
| **Délais suppression** | Formation + 5 ans (traçabilité) |
| **Mesures sécurité** | - RLS par tenant<br>- Accès limité élève/moniteur concernés |

---

## FICHE #5 : RÉSULTATS D'EXAMENS

| Élément | Description |
|---------|-------------|
| **Nom du traitement** | Gestion résultats examens (théorie + pratique) |
| **Finalités** | - Suivi réussite<br>- Émission certificats<br>- Obligations légales |
| **Base légale** | Art. 6.1.b (contrat) + 6.1.c (obligation légale) RGPD |
| **Catégories de personnes** | Élèves |
| **Catégories de données** | - **Sensible** : Résultats (réussi/échoué)<br>- **Sensible** : Scores détaillés<br>- Tentatives multiples<br>- Dates examens |
| **Destinataires** | - Élève uniquement<br>- Auto-école (statistiques agrégées)<br>- Autorités (sur réquisition) |
| **Transferts hors UE/CH** | Aucun |
| **Délais suppression** | Formation + 5 ans (certificats : 20 ans) |
| **Mesures sécurité** | - Accès ultra-limité<br>- Chiffrement<br>- Audit trail complet<br>- Anonymisation stats |

---

## FICHE #6 : ANALYTICS & STATISTIQUES

| Élément | Description |
|---------|-------------|
| **Nom du traitement** | Mesure d'audience et amélioration service |
| **Finalités** | - Analyse usage<br>- Amélioration UX<br>- Détection bugs |
| **Base légale** | Art. 6.1.a (consentement) + 6.1.f (intérêt légitime) RGPD |
| **Catégories de personnes** | Tous visiteurs site web |
| **Catégories de données** | - **Anonymisé** : IP anonymisée, User-Agent<br>- Comportement : pages vues, clics<br>- Performance : temps chargement |
| **Destinataires** | - Google Analytics (USA - CCT)<br>- Vercel Analytics (Edge Network)<br>- Sentry (UE) |
| **Transferts hors UE/CH** | USA (Google) - Clauses Contractuelles Types |
| **Délais suppression** | 14 mois (GA4), 90 jours (Sentry) |
| **Mesures sécurité** | - Anonymisation IP<br>- Pas de PII<br>- Opt-out disponible |

---

## FICHE #7 : COMMUNICATIONS

| Élément | Description |
|---------|-------------|
| **Nom du traitement** | Communications marketing et support |
| **Finalités** | - Newsletter<br>- Support client<br>- Notifications service |
| **Base légale** | Art. 6.1.a (consentement - marketing) + 6.1.b (contrat - support) RGPD |
| **Catégories de personnes** | Utilisateurs ayant consenti |
| **Catégories de données** | - Email<br>- Prénom<br>- Préférences communication |
| **Destinataires** | - Viamentor<br>- Service email (futur : Resend) |
| **Transferts hors UE/CH** | À définir (selon provider email) |
| **Délais suppression** | Jusqu'à révocation consentement |
| **Mesures sécurité** | - Unsubscribe facile<br>- Liste opt-in séparée |

---

## ANNEXE A : SOUS-TRAITANTS (Art. 28 RGPD)

### Supabase Inc.

**Fonction** : Hébergement base de données  
**Localisation** : UE (Francfort)  
**DPA** : ⏳ À signer  
**Certifications** : SOC 2 Type II, ISO 27001  
**Durée contrat** : Durée abonnement

### Vercel Inc.

**Fonction** : Hébergement application web  
**Localisation** : Edge Network global  
**DPA** : ⏳ À signer  
**Certifications** : SOC 2  
**Durée contrat** : Durée abonnement

### Functional Software Inc. (Sentry)

**Fonction** : Monitoring erreurs  
**Localisation** : UE (optionnel)  
**DPA** : ⏳ À signer  
**Certifications** : SOC 2 Type II  
**Durée contrat** : Durée abonnement

---

## ANNEXE B : MODÈLE DEMANDE ACCÈS

Voir `legal/DEMANDE_ACCES_TEMPLATE.md`

---

**Signatures** :

**Responsable du traitement**  
Viamentor SA  
Date : _______________

**DPO**  
Nom : _______________  
Date : _______________

---

_Document vivant - Mis à jour le 28 octobre 2025_  
_Prochaine révision : 28 avril 2026_

