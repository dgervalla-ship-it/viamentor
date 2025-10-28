# 🛡️ VIAMENTOR - Threat Model Complet

**Modèle de Menaces & Mitigations - STRIDE**

**Date** : 28 octobre 2025  
**Version** : 1.0  
**Responsable** : Security Team Viamentor

---

## 1. CONTEXTE & PÉRIMÈTRE

### 1.1 Asset Critical (Actifs Critiques)

| Asset | Criticité | Impact |
|-------|-----------|--------|
| **Données élèves** (PII) | 🔴 Critique | RGPD, perte confiance |
| **Données financières** (IBAN, factures) | 🔴 Critique | Fraude, vol |
| **N° AVS suisses** | 🔴 Critique | Usurpation identité |
| **Résultats examens** | 🟠 Élevé | Manipulation, fraude |
| **Comptes utilisateurs** | 🟠 Élevé | Accès non autorisé |
| **Base de données** | 🔴 Critique | Perte totale service |
| **Code source** | 🟡 Moyen | Vol IP, vulns |

### 1.2 Acteurs (Threat Actors)

| Acteur | Motivation | Niveau Compétence | Probabilité |
|--------|------------|-------------------|-------------|
| **Hacker externe** | Financier, vol données | Moyen à Élevé | Moyen |
| **Élève mécontent** | Vengeance, sabotage | Faible | Faible |
| **Concurrent** | Espionnage industriel | Moyen | Très faible |
| **Insider malveillant** | Financier, personnel | Moyen | Très faible |
| **Script Kiddie** | Reconnaissance, fun | Faible | Élevé |
| **Ransomware gang** | Rançon | Élevé | Moyen |

---

## 2. MODÈLE STRIDE

### 🔓 S - SPOOFING (Usurpation d'Identité)

#### Menace S.1 : Phishing Credentials

**Scénario** :  
Attaquant envoie email phishing se faisant passer pour Viamentor, vole identifiants administrateur.

**Impact** : 🔴 Critique  
**Probabilité** : Moyen  
**Risque** : 🔴 Élevé

**Mitigations** :
- ✅ MFA obligatoire pour admins (future)
- ✅ Email DMARC/SPF/DKIM configurés
- ✅ Formation équipe anti-phishing
- ✅ Bannière "Vérifiez expéditeur"

---

#### Menace S.2 : Session Hijacking

**Scénario** :  
Attaquant intercepte token session (XSS, man-in-the-middle).

**Impact** : 🔴 Critique  
**Probabilité** : Faible  
**Risque** : 🟠 Moyen

**Mitigations** :
- ✅ HTTPS obligatoire (TLS 1.3)
- ✅ HttpOnly cookies
- ✅ Secure flag cookies
- ✅ SameSite=Strict
- ✅ Expiration session 24h
- ⏳ Rotation token refresh

---

### 🔨 T - TAMPERING (Altération de Données)

#### Menace T.1 : Modification Résultats Examens

**Scénario** :  
Élève modifie ses résultats d'examen via API manipulation.

**Impact** : 🔴 Critique  
**Probabilité** : Faible  
**Risque** : 🟠 Moyen

**Mitigations** :
- ✅ RLS PostgreSQL (accès limité)
- ✅ Audit trail complet (logs immuables)
- ✅ Validation côté serveur stricte
- ✅ Signature numérique certificats
- ⏳ Alertes sur modifications suspectes

---

#### Menace T.2 : SQL Injection

**Scénario** :  
Attaquant injecte SQL via formulaire → Accède/modifie DB.

**Impact** : 🔴 Critique  
**Probabilité** : Faible  
**Risque** : 🟠 Moyen

**Mitigations** :
- ✅ Supabase (ORM, prepared statements)
- ✅ Input validation stricte (Zod schemas)
- ✅ Pas de raw SQL utilisateur
- ✅ RLS en dernier rempart
- ✅ WAF Vercel (futur)

---

### 🙅 R - REPUDIATION (Répudiation)

#### Menace R.1 : Déni d'Action

**Scénario** :  
Moniteur nie avoir annulé leçon, élève perd crédit.

**Impact** : 🟡 Moyen  
**Probabilité** : Moyen  
**Risque** : 🟡 Moyen

**Mitigations** :
- ✅ Audit logs détaillés (qui, quoi, quand)
- ✅ Timestamps cryptographiques
- ✅ Notifications email confirmations
- ✅ Stockage logs 12 mois
- ⏳ Signature numérique actions critiques

---

### 🔍 I - INFORMATION DISCLOSURE (Divulgation d'Information)

#### Menace I.1 : Accès Non Autorisé Données Élèves

**Scénario** :  
Moniteur A accède aux données élèves de Moniteur B (autre auto-école).

**Impact** : 🔴 Critique (RGPD)  
**Probabilité** : Faible  
**Risque** : 🟠 Moyen

**Mitigations** :
- ✅ RLS multi-tenant PostgreSQL
- ✅ Filtrage `tenant_id` automatique
- ✅ Tests E2E isolation
- ✅ Revue code systématique
- ✅ Pentests réguliers

---

#### Menace I.2 : Leak Base de Données

**Scénario** :  
Backup DB exposé publiquement (misconfiguration S3).

**Impact** : 🔴 Critique  
**Probabilité** : Très faible  
**Risque** : 🟠 Moyen

**Mitigations** :
- ✅ Backups chiffrés AES-256
- ✅ Supabase gestion backups (privé)
- ✅ Pas de credentials dans code
- ✅ Secrets management (Vercel Env Vars)
- ✅ Scan repos publics (GitHub Advanced Security)

---

#### Menace I.3 : XSS (Cross-Site Scripting)

**Scénario** :  
Attaquant injecte JS malveillant dans champ "notes" → Vol session autres users.

**Impact** : 🔴 Critique  
**Probabilité** : Faible  
**Risque** : 🟠 Moyen

**Mitigations** :
- ✅ React (escape automatique)
- ✅ CSP headers (Content Security Policy)
- ✅ Sanitization inputs (DOMPurify si HTML)
- ✅ HttpOnly cookies
- ⏳ SAST scans réguliers

---

### ❌ D - DENIAL OF SERVICE (Déni de Service)

#### Menace D.1 : DDoS Application

**Scénario** :  
Attaquant inonde serveur de requêtes → App indisponible.

**Impact** : 🟠 Élevé (business)  
**Probabilité** : Moyen  
**Risque** : 🟠 Moyen

**Mitigations** :
- ✅ Vercel Edge Network (anti-DDoS intégré)
- ✅ Rate limiting (API)
- ✅ CDN caching
- ✅ Monitoring Sentry + BetterUptime
- ⏳ WAF (Web Application Firewall)

---

#### Menace D.2 : Resource Exhaustion DB

**Scénario** :  
Requête SQL lente/malveillante → DB saturée → App freeze.

**Impact** : 🟠 Élevé  
**Probabilité** : Faible  
**Risque** : 🟡 Moyen

**Mitigations** :
- ✅ Supabase connection pooling
- ✅ Query timeout (30s)
- ✅ Indexes optimisés
- ✅ Monitoring slow queries
- ⏳ Query complexity limits

---

### 🚀 E - ELEVATION OF PRIVILEGE (Élévation de Privilèges)

#### Menace E.1 : Escalade Élève → Admin

**Scénario** :  
Élève exploite faille IDOR → Modifie son rôle en `admin`.

**Impact** : 🔴 Critique  
**Probabilité** : Très faible  
**Risque** : 🟡 Moyen

**Mitigations** :
- ✅ RLS PostgreSQL (pas de self-update role)
- ✅ Validation rôles côté serveur
- ✅ Pas de trust client-side
- ✅ Audit logs modifications rôles
- ✅ Tests E2E autorisations

---

#### Menace E.2 : IDOR (Insecure Direct Object Reference)

**Scénario** :  
User modifie ID dans URL `/students/123` → Accède élève autre école.

**Impact** : 🔴 Critique  
**Probabilité** : Faible  
**Risque** : 🟠 Moyen

**Mitigations** :
- ✅ RLS PostgreSQL (filtrage auto tenant_id)
- ✅ Validation ownership côté serveur
- ✅ UUIDs (pas d'IDs séquentiels)
- ✅ Tests E2E autorisations
- ✅ Code review systématique

---

## 3. SURFACES D'ATTAQUE

### 3.1 Frontend (React)

| Surface | Menaces | Mitigations |
|---------|---------|-------------|
| **Formulaires** | XSS, injection | React escape, Zod validation |
| **Local Storage** | Token leak | Rien de sensible stocké |
| **Cookies** | Session hijacking | HttpOnly, Secure, SameSite |
| **API Calls** | MITM | HTTPS obligatoire |

---

### 3.2 Backend (Supabase)

| Surface | Menaces | Mitigations |
|---------|---------|-------------|
| **Auth** | Brute force, phishing | Rate limit, MFA (futur) |
| **Database** | SQL injection, IDOR | RLS, prepared statements |
| **RLS Policies** | Bypass, faille logique | Tests exhaustifs, revue |
| **API** | Abuse, DDoS | Rate limiting, monitoring |

---

### 3.3 Infrastructure

| Surface | Menaces | Mitigations |
|---------|---------|-------------|
| **Vercel** | DDoS, config error | Edge Network, reviews |
| **Supabase** | Leak backups, config | Backups chiffrés, audits |
| **DNS** | Hijacking | DNSSEC, Cloudflare |
| **Secrets** | Leak, phishing devs | Vercel Env Vars, 2FA GitHub |

---

## 4. SCÉNARIOS D'ATTAQUE

### Scénario A : Compromission Compte Admin

**Étapes** :
1. Phishing email → Admin clique lien
2. Fake login page → Credentials volés
3. Attaquant se connecte
4. Export données élèves
5. Ransom ou revente darkweb

**Impact** : 🔴 Critique (RGPD breach)

**Défenses en Profondeur** :
- ❶ Formation anti-phishing (Prévention)
- ❷ MFA obligatoire (Blocage)
- ❸ Détection connexion IP suspecte (Alerte)
- ❹ Rate limit export (Limitation)
- ❺ Audit logs (Investigation)

**Probabilité post-mitigations** : Très faible

---

### Scénario B : Ransomware Auto-École

**Étapes** :
1. Attaquant accède réseau école (WiFi faible)
2. Installe ransomware poste secrétaire
3. Chiffre fichiers locaux + tente Viamentor
4. Demande rançon 5'000 CHF

**Impact** : 🟠 Moyen (fichiers locaux perdus, Viamentor OK)

**Défenses** :
- ✅ Viamentor cloud → Pas impacté
- ✅ Backups Supabase automatiques
- ✅ Aucune donnée critique locale
- ⏳ Formation écoles : séparation données

**Impact Viamentor** : ✅ Nul (données sauvegardées cloud)

---

### Scénario C : Insider Malveillant (Secrétaire)

**Étapes** :
1. Secrétaire mécontente a accès DB
2. Export données élèves avant départ
3. Revend à concurrent

**Impact** : 🔴 Critique (RGPD, concurrence)

**Défenses** :
- ✅ Audit logs (détection export massif)
- ✅ Alertes export > 50 élèves
- ✅ Watermarking exports (traçabilité)
- ✅ Accès minimal (need-to-know)
- ⏳ DLP (Data Loss Prevention)

**Détection** : < 24h via logs

---

## 5. MATRICE RISQUES

| Menace | Impact | Probabilité | Risque | Mitigation | Status |
|--------|--------|-------------|--------|------------|--------|
| Phishing admin | Critique | Moyen | 🔴 Élevé | MFA + formation | ⏳ Partiel |
| SQL Injection | Critique | Faible | 🟠 Moyen | ORM + RLS | ✅ OK |
| XSS | Critique | Faible | 🟠 Moyen | React + CSP | ✅ OK |
| IDOR | Critique | Faible | 🟠 Moyen | RLS + tests | ✅ OK |
| DDoS | Élevé | Moyen | 🟠 Moyen | Vercel Edge | ✅ OK |
| Ransomware | Moyen | Moyen | 🟡 Moyen | Cloud + backups | ✅ OK |
| Insider | Critique | Très faible | 🟡 Moyen | Logs + alertes | ⏳ Partiel |
| Session hijack | Critique | Faible | 🟠 Moyen | HTTPS + cookies | ✅ OK |

**Risque Résiduel Global** : 🟡 **Moyen**

---

## 6. PLAN D'ACTION

### Priorité P0 (Critique) - À faire immédiatement

- [ ] **MFA obligatoire** pour admins
- [ ] **SAST scans** intégrés CI/CD (Snyk)
- [ ] **Pentest externe** annuel
- [ ] **Formation RGPD** équipe

### Priorité P1 (Élevé) - 3 mois

- [ ] **WAF** (Web Application Firewall)
- [ ] **DLP** (Data Loss Prevention) alertes
- [ ] **Bug Bounty** program (HackerOne)
- [ ] **Security Champions** program

### Priorité P2 (Moyen) - 6 mois

- [ ] **Backup restore** drill mensuel
- [ ] **Incident Response** tabletop
- [ ] **Vendor risk assessment** (Supabase/Vercel)
- [ ] **Compliance audit** (ISO 27001)

---

## 7. INCIDENT RESPONSE

### Playbook : Data Breach

**Si découverte leak données** :

**H+0** (Immédiat)
1. ⚠️ Alerter Security Team
2. 🔒 Isoler système compromis
3. 🔍 Évaluer périmètre (combien de users ?)

**H+4** (< 4h)
4. 📝 Documenter (qui, quoi, quand, comment)
5. 🛠️ Mitigation (changer credentials, patcher)
6. 📢 Notification DPO interne

**H+24** (< 24h)
7. 📊 Rapport détaillé
8. 📧 Notification PFPDT (si > 72h ou risque élevé)

**H+72** (< 72h)
9. 📧 Notification utilisateurs impactés (si risque élevé)
10. 📰 Communication publique (si nécessaire)

**Post-Incident**
11. 🔬 Root Cause Analysis
12. 📋 Actions correctives
13. 📘 Update Threat Model

---

## 8. MONITORING & DÉTECTION

### Alertes Critiques (Sentry + BetterUptime)

| Alerte | Seuil | Action |
|--------|-------|--------|
| **5xx errors** | > 10/min | Alerte On-Call |
| **Failed logins** | > 5/user/10min | Blocage temporaire |
| **Export massif** | > 50 élèves | Alerte Security Team |
| **Modification rôle** | Toute | Alerte immédiate |
| **DB queries slow** | > 5s | Investigation |
| **Uptime < 99.5%** | Mensuel | Post-mortem |

---

## 9. CONFORMITÉ SÉCURITÉ

### Standards Appliqués

- ✅ **OWASP Top 10** (2021)
- ✅ **NIST Cybersecurity Framework**
- ⏳ **ISO 27001** (audit prévu)
- ⏳ **SOC 2 Type II** (Supabase/Vercel)

### Checklist OWASP Top 10 (2021)

| Risque | Status | Mitigation |
|--------|--------|------------|
| A01: Broken Access Control | ✅ OK | RLS PostgreSQL |
| A02: Cryptographic Failures | ✅ OK | HTTPS, AES-256 |
| A03: Injection | ✅ OK | ORM, validation |
| A04: Insecure Design | 🟡 Partiel | Threat Model OK, tests à augmenter |
| A05: Security Misconfiguration | ✅ OK | Reviews, audits |
| A06: Vulnerable Components | ✅ OK | Snyk CI, npm audit |
| A07: Auth Failures | 🟡 Partiel | Auth OK, MFA à ajouter |
| A08: Data Integrity Failures | ✅ OK | Signatures, logs |
| A09: Logging Failures | ✅ OK | Sentry, audit logs |
| A10: SSRF | ✅ OK | Pas d'user-controlled URLs |

**Score** : 9/10 ✅

---

## 10. CONCLUSION

### Niveau de Maturité Sécurité

**Current** : 🟢 **Niveau 3/5 (Défensif)**

- ✅ Contrôles de base solides
- ✅ Monitoring actif
- ⏳ Manque : Pentest, MFA, WAF

**Target** : 🟢 **Niveau 4/5 (Proactif)**

- Pentest annuel
- Bug Bounty
- Security Champions

### Prochaines Revues

- **Mensuel** : Review nouveaux risques
- **Trimestriel** : Update Threat Model
- **Annuel** : Pentest externe

---

**Document vivant - Dernière update** : 28 octobre 2025  
**Prochaine revue** : 28 janvier 2026

_Conforme OWASP + NIST CSF_

