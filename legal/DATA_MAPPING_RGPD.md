# 📊 VIAMENTOR - Data Mapping RGPD/nLPD

**Date** : 28 octobre 2025  
**Version** : 1.0  
**Conforme** : RGPD (UE) + nLPD (Suisse)

---

## 1. VUE D'ENSEMBLE

### 1.1 Responsable du Traitement

**Viamentor SA**  
Adresse : [À compléter]  
DPO : dpo@viamentor.ch

### 1.2 Sous-Traitants

| Sous-traitant | Fonction | Localisation | DPA |
|---------------|----------|--------------|-----|
| **Supabase** | Base de données | 🇪🇺 UE | ✅ Requis |
| **Vercel** | Hébergement | 🌍 Global | ✅ Requis |
| **Sentry** | Monitoring | 🇪🇺 UE | ✅ Requis |
| **Google** | Analytics (anonymisé) | 🇺🇸 USA | ⚠️ CCT |

---

## 2. CARTOGRAPHIE DES DONNÉES

### 2.1 TENANTS (Auto-écoles)

| Champ | Type | Sensible | Base Légale | Durée |
|-------|------|----------|-------------|-------|
| `id` | UUID | Non | Contrat | Abonnement |
| `name` | String | Non | Contrat | Abonnement |
| `email` | Email | **Oui** | Contrat | Abonnement + 10 ans (factures) |
| `phone` | String | **Oui** | Contrat | Abonnement |
| `address` | String | Non | Contrat | Abonnement |
| `iban` | String | **Oui** | Contrat | 10 ans (fiscal) |
| `license_number` | String | Non | Contrat | Abonnement |

**Finalités** :
- Fourniture du service
- Facturation
- Support

**Partage** :  
Hébergement uniquement (Supabase)

**Droits** :  
Accès, rectification, suppression (après 30j post-résiliation)

---

### 2.2 USERS (Utilisateurs)

| Champ | Type | Sensible | Base Légale | Durée |
|-------|------|----------|-------------|-------|
| `id` | UUID | Non | Contrat | Abonnement |
| `email` | Email | **Oui** | Contrat | Abonnement |
| `encrypted_password` | Hash | **Très sensible** | Contrat | Abonnement |
| `first_name` | String | **Oui** | Contrat | Abonnement |
| `last_name` | String | **Oui** | Contrat | Abonnement |
| `role` | Enum | Non | Contrat | Abonnement |
| `last_sign_in_at` | Timestamp | **Oui** | Intérêt légitime | 12 mois |

**Finalités** :
- Authentification
- Contrôle d'accès
- Sécurité (logs)

**Partage** :  
Supabase Auth (hébergement)

**Droits** :  
Accès, rectification, portabilité, suppression

---

### 2.3 STUDENTS (Élèves) - DONNÉES PERSONNELLES

| Champ | Type | Sensible | Base Légale | Durée |
|-------|------|----------|-------------|-------|
| `first_name` | String | **Oui** | Contrat | Abonnement + 30j |
| `last_name` | String | **Oui** | Contrat | Abonnement + 30j |
| `email` | Email | **Oui** | Contrat | Abonnement + 30j |
| `phone` | String | **Oui** | Contrat | Abonnement + 30j |
| `date_of_birth` | Date | **Très sensible** | Contrat + Légal | Abonnement + 30j |
| `faber_number` | String | **Oui** | Contrat + Légal | Formation + 5 ans |
| `address` | String | **Oui** | Contrat | Abonnement + 30j |
| `avs_number` | String | **Très sensible** | Légal | Formation + 10 ans |
| `permit_type` | String | Non | Contrat | Formation + 5 ans |

**Catégorie nLPD** : Données personnelles  
**Catégorie RGPD** : Données personnelles + Données de mineurs (si < 18 ans)

**Finalités** :
- Gestion formation conduite
- Obligations légales (autorités)
- Facturation

**Partage** :
- Auto-école (responsable formation)
- Moniteurs assignés (formation)
- Supabase (hébergement)

**Droits** :
- Accès complet
- Rectification
- Suppression (sauf archives légales)
- Portabilité (export JSON/CSV)

---

### 2.4 INSTRUCTORS (Moniteurs)

| Champ | Type | Sensible | Base Légale | Durée |
|-------|------|----------|-------------|-------|
| `first_name` | String | **Oui** | Contrat | Contrat + 3 ans |
| `last_name` | String | **Oui** | Contrat | Contrat + 3 ans |
| `email` | Email | **Oui** | Contrat | Contrat + 3 ans |
| `phone` | String | **Oui** | Contrat | Contrat + 3 ans |
| `license_number` | String | **Oui** | Contrat + Légal | Contrat + 10 ans |
| `categories` | Array | Non | Contrat | Contrat + 3 ans |
| `rating` | Number | Non | Intérêt légitime | Contrat + 1 an |

**Finalités** :
- Gestion planning
- Affectation élèves
- Qualité service

**Partage** :
- Auto-école
- Élèves assignés (nom uniquement)

---

### 2.5 LESSONS (Leçons) - DONNÉES D'ACTIVITÉ

| Champ | Type | Sensible | Base Légale | Durée |
|-------|------|----------|-------------|-------|
| `student_id` | UUID | **Oui** | Contrat | Formation + 5 ans |
| `instructor_id` | UUID | **Oui** | Contrat | Formation + 5 ans |
| `date` | Date | **Oui** | Contrat | Formation + 5 ans |
| `location` | String | **Oui** | Contrat | Formation + 1 an |
| `student_rating` | Number | Non | Intérêt légitime | Formation + 1 an |
| `instructor_notes` | Text | **Très sensible** | Contrat | Formation + 5 ans |
| `skills_practiced` | Array | Non | Contrat | Formation + 5 ans |

**Catégorie nLPD** : Données personnelles  
**Catégorie RGPD** : Données personnelles

**Finalités** :
- Suivi formation
- Progression élève
- Obligations légales (traçabilité)

**Partage** :
- Élève (ses leçons)
- Moniteur (ses leçons)
- Auto-école (gestion)

---

### 2.6 INVOICES (Factures) - DONNÉES FINANCIÈRES

| Champ | Type | Sensible | Base Légale | Durée |
|-------|------|----------|-------------|-------|
| `student_id` | UUID | **Oui** | Contrat | **10 ans** (fiscal) |
| `invoice_number` | String | Non | Contrat + Légal | **10 ans** (fiscal) |
| `total_amount` | Number | **Oui** | Contrat + Légal | **10 ans** (fiscal) |
| `issue_date` | Date | Non | Contrat + Légal | **10 ans** (fiscal) |
| `payment_method` | String | **Oui** | Contrat + Légal | **10 ans** (fiscal) |

**⚠️ IMPORTANT** : Conservation 10 ans obligatoire (Loi fiscale suisse)

**Catégorie nLPD** : Données personnelles sensibles (finances)  
**Catégorie RGPD** : Données financières

**Finalités** :
- Facturation
- Comptabilité
- Obligations fiscales

**Partage** :
- Élève (ses factures)
- Comptable externe (si mandaté)

---

### 2.7 EXAMS (Examens) - DONNÉES SENSIBLES

| Champ | Type | Sensible | Base Légale | Durée |
|-------|------|----------|-------------|-------|
| `student_id` | UUID | **Oui** | Contrat + Légal | Formation + 5 ans |
| `result` | Enum | **Très sensible** | Contrat + Légal | Formation + 5 ans |
| `score` | Number | **Très sensible** | Contrat + Légal | Formation + 5 ans |
| `attempts_count` | Number | **Oui** | Contrat + Légal | Formation + 5 ans |
| `certificate_date` | Date | Non | Contrat + Légal | **20 ans** |

**⚠️ CRITIQUE** : Résultats d'examens = données très sensibles

**Catégorie nLPD** : Données personnelles sensibles  
**Catégorie RGPD** : Données relatives à la formation

**Finalités** :
- Suivi formation
- Émission certificats
- Obligations légales (autorités)

**Partage** :
- Élève uniquement
- Autorités (sur demande légale)

---

### 2.8 COOKIES & TRACKING

| Cookie | Fonction | Sensible | Base Légale | Durée |
|--------|----------|----------|-------------|-------|
| `sb-access-token` | Auth | Non | Contrat (essentiel) | Session |
| `sb-refresh-token` | Auth | Non | Contrat (essentiel) | 7 jours |
| `_ga` | Analytics | **Oui** | Consentement | 2 ans |
| `_gid` | Analytics | **Oui** | Consentement | 24h |

**Consentement** :  
Requis pour analytics, pas pour essentiels.

---

## 3. REGISTRE DES TRAITEMENTS

### Traitement #1 : Gestion des Élèves

**Responsable** : Viamentor SA  
**Finalités** : Gestion formation à la conduite  
**Base légale** : Contrat + Obligation légale  
**Catégories de données** :
- Identité (nom, prénom, email, tél, adresse)
- Formation (FABER, permis, progression)
- Financières (factures)

**Destinataires** :
- Auto-école inscrite
- Moniteurs assignés
- Supabase (hébergement UE)

**Transferts hors UE** : Aucun  
**Durée conservation** : Abonnement + 30 jours (sauf factures 10 ans)  
**Mesures sécurité** : Chiffrement, RLS, HTTPS

---

### Traitement #2 : Facturation QR Factures

**Responsable** : Viamentor SA  
**Finalités** : Facturation services formation  
**Base légale** : Contrat + Obligation fiscale  
**Catégories de données** :
- Identité (nom, prénom, adresse)
- Financières (montants, IBAN, paiements)

**Destinataires** :
- Élève (ses factures)
- Auto-école (créatrice facture)
- Supabase (hébergement)

**Transferts hors UE** : Aucun  
**Durée conservation** : **10 ans** (obligation fiscale)  
**Mesures sécurité** : Chiffrement AES-256, RLS, accès limité

---

### Traitement #3 : Analytics & Amélioration

**Responsable** : Viamentor SA  
**Finalités** : Amélioration du service  
**Base légale** : Consentement  
**Catégories de données** :
- Technique (IP anonymisée, navigateur, OS)
- Comportement (pages vues, clics)

**Destinataires** :
- Google Analytics (USA - CCT)
- Vercel Analytics (UE)

**Transferts hors UE** : Google (USA) - Clauses contractuelles types  
**Durée conservation** : 14 mois (GA4 réglages)  
**Mesures sécurité** : Anonymisation IP, pas de PII

---

### Traitement #4 : Monitoring Erreurs

**Responsable** : Viamentor SA  
**Finalités** : Détection et correction bugs  
**Base légale** : Intérêt légitime  
**Catégories de données** :
- Erreurs techniques (stack traces)
- Session ID (anonyme)

**Destinataires** :
- Sentry (UE)

**Transferts hors UE** : Aucun  
**Durée conservation** : 90 jours  
**Mesures sécurité** : Filtrage PII, chiffrement

---

## 4. DONNÉES PAR CATÉGORIE

### Données d'Identification

| Donnée | Tables | Finalité | Conservation |
|--------|--------|----------|--------------|
| Nom/Prénom | users, students, instructors | Identité | Abonnement + 30j |
| Email | users, students, instructors, tenants | Contact | Abonnement + 30j |
| Téléphone | students, instructors, tenants | Contact | Abonnement + 30j |
| Adresse | students, tenants | Facturation | Abonnement + 30j |
| Date naissance | students | Vérification âge | Abonnement + 30j |

### Données Sensibles (Art. 5 nLPD)

| Donnée | Table | Justification | Mesures spéciales |
|--------|-------|---------------|-------------------|
| N° AVS | students | Identification légale | Chiffrement + accès limité |
| Résultats examens | exams | Formation | Accès limité |
| Notes instructeurs | lessons | Suivi pédagogique | Chiffrement |
| IBAN | tenants, invoices | Paiements | Chiffrement + RLS strict |

### Données Financières

| Donnée | Table | Finalité | Conservation |
|--------|-------|----------|--------------|
| Montants | invoices | Facturation | **10 ans** (fiscal) |
| IBAN | tenants | Paiements | **10 ans** (fiscal) |
| Paiements | invoices | Comptabilité | **10 ans** (fiscal) |

---

## 5. FLUX DE DONNÉES

### 5.1 Création Compte Élève

```
Élève → Formulaire → Viamentor → Supabase (UE)
                                      ↓
                              Auto-école (notification)
```

**Données** : Nom, email, tél, adresse, date naissance  
**Consentement** : Acceptation CGU + Privacy  
**Traçabilité** : Log création avec timestamp + IP

### 5.2 Génération QR Facture

```
Auto-école → Création facture → Viamentor
                                    ↓
                            Génération QR Bill (local)
                                    ↓
                            PDF → Email élève
                                    ↓
                            Stockage Supabase (UE)
```

**Données** : Nom, adresse, montant, IBAN  
**Conservation** : 10 ans (PDF + DB)  
**Sécurité** : PDF chiffré, accès RLS

---

## 6. DROITS DES PERSONNES

### 6.1 Droit d'Accès

**Implémentation** :  
`GET /api/users/{id}/data-export`

**Contenu** :
- Profil utilisateur
- Toutes données liées (JSON/CSV)
- Logs d'accès (12 derniers mois)

**Délai** : 30 jours max (RGPD)

### 6.2 Droit de Rectification

**Implémentation** :  
UI : Paramètres → Profil → Modifier

**Validation** : Email confirmation si changement email

### 6.3 Droit à l'Effacement

**Implémentation** :  
`DELETE /api/users/{id}`

**Exceptions** :
- Factures : 10 ans (obligation fiscale)
- Certificats : 20 ans (obligation légale)

**Process** :
1. Anonymisation données personnelles
2. Conservation données légales requises
3. Suppression totale après délais légaux

### 6.4 Droit de Portabilité

**Implémentation** :  
`GET /api/users/{id}/data-export?format=json`

**Format** : JSON structuré conforme schema.org

### 6.5 Droit d'Opposition

**Implémentation** :  
UI : Paramètres → Confidentialité → Opt-out marketing

---

## 7. MESURES DE SÉCURITÉ

### 7.1 Techniques

| Mesure | Implémentation | Status |
|--------|----------------|--------|
| **Chiffrement transit** | TLS 1.3 | ✅ Actif |
| **Chiffrement repos** | AES-256 (Supabase) | ✅ Actif |
| **RLS Policies** | PostgreSQL RLS | ✅ Configuré |
| **Auth forte** | Supabase Auth + MFA (opt) | ✅ Actif |
| **Logs d'accès** | Supabase Logs | ✅ 12 mois |
| **Backups chiffrés** | Supabase auto (daily) | ✅ Actif |
| **Monitoring** | Sentry | ✅ Actif |

### 7.2 Organisationnelles

| Mesure | Status |
|--------|--------|
| **Formations RGPD** | ⏳ À planifier |
| **Politique mots de passe** | ✅ Min 8 char |
| **Accès need-to-know** | ✅ RLS policies |
| **DPA signés** | ⏳ Supabase (requis) |
| **Audit annuel** | ⏳ À planifier |

---

## 8. VIOLATIONS DE DONNÉES

### 8.1 Procédure

1. **Détection** : Sentry alerts + Supabase logs
2. **Évaluation** : < 24h (risque pour droits ?)
3. **Notification PFPDT** : < 72h si risque élevé
4. **Notification personnes** : < 72h si risque élevé
5. **Documentation** : Registre violations

### 8.2 Template Notification

Voir `legal/DATA_BREACH_TEMPLATE.md` (à créer)

---

## 9. TRANSFERTS INTERNATIONAUX

### 9.1 Transferts Actuels

| Destination | Service | Garanties |
|-------------|---------|-----------|
| 🇪🇺 UE (Francfort) | Supabase | Adéquation RGPD |
| 🇺🇸 USA | Google Analytics | CCT + Anonymisation IP |
| 🇺🇸 USA | Sentry (optionnel) | CCT |

### 9.2 Clauses Contractuelles Types (CCT)

- ✅ Google Analytics : CCT 2021
- ⏳ Sentry : DPA à signer

---

## 10. CONSENTEMENT

### 10.1 Cookies (ePrivacy)

**Banner** : À implémenter (voir composant ci-dessous)

**Catégories** :
- ✅ Essentiels (pas de consentement requis)
- ☐ Analytiques (consentement requis)
- ☐ Marketing (consentement requis)

**Granularité** : Par catégorie (CNIL/RGPD)

### 10.2 Newsletter

**Opt-in** : Case à cocher (pas pré-cochée)  
**Opt-out** : Lien dans chaque email  
**Preuve** : Timestamp + IP (logs)

---

## 11. CHECKLIST CONFORMITÉ

### Transparence

- [x] ✅ Privacy Policy publiée
- [x] ✅ Cookie Policy publiée
- [ ] ⏳ Consent banner implémenté
- [ ] ⏳ Informations claires dans app

### Droits

- [ ] ⏳ Export données (API prête, UI à créer)
- [ ] ⏳ Suppression compte (API prête, UI à créer)
- [x] ✅ Rectification (UI existante)

### Sécurité

- [x] ✅ Chiffrement TLS
- [x] ✅ RLS policies
- [x] ✅ Auth sécurisée
- [ ] ⏳ DPA Supabase signé
- [ ] ⏳ Audit sécurité

### Documentation

- [x] ✅ Registre traitements (ce document)
- [x] ✅ Data mapping complet
- [ ] ⏳ Procédure violation données
- [ ] ⏳ AIPD (si risque élevé)

---

## 12. ANALYSE D'IMPACT (AIPD)

### Traitements à Risque Élevé

1. **Élèves mineurs** (< 18 ans)
   - Risque : Données de mineurs
   - Mesures : Consentement parental requis

2. **Résultats d'examens**
   - Risque : Données sensibles formation
   - Mesures : Accès limité, chiffrement

3. **N° AVS suisses**
   - Risque : Identifiant national
   - Mesures : Chiffrement, accès très limité

**AIPD complète** : Voir `legal/AIPD_COMPLETE.md` (à créer si nécessaire)

---

## 13. CONTACT DPO

**Email** : dpo@viamentor.ch  
**Délai réponse** : 30 jours max (RGPD)

---

**Document mis à jour** : 28 octobre 2025  
**Prochaine révision** : 28 avril 2026 (6 mois)

_Conforme nLPD (Suisse) + RGPD (UE) Art. 30_

