# 🔐 AUDIT - SECURITY ENGINEER

**Rôle** : Security Engineer  
**Mission** : Réduire la surface d'attaque et respecter les réglementations  
**Score Global** : 🟡 **4/10**  
**Statut** : CONCEPTION BONNE, IMPLÉMENTATION MANQUANTE

---

## ✅ Tâches à contrôler

### 11.1 Threat model mis à jour chaque nouvelle feature sensible
**Statut** : 🟡 **PARTIEL**  
**Évaluation** : 5/10

**Constat** :
- ✅ Sécurité pensée (RBAC, RLS documentés)
- ✅ Threat model implicite dans architecture
- ❌ Pas de document threat model formel
- ❌ Pas de mise à jour systématique

**Menaces identifiées (analyse code)** :

| Menace | Probabilité | Impact | Mitigation actuelle |
|--------|-------------|--------|---------------------|
| **Injection SQL** | Faible | Critique | ✅ Supabase (parameterized queries) |
| **XSS** | Moyenne | Élevé | 🟡 React escape, à vérifier |
| **CSRF** | Moyenne | Élevé | ❌ Pas de token CSRF |
| **Broken Auth** | Élevée | Critique | 🟡 Supabase Auth, RLS à implémenter |
| **Sensitive Data Exposure** | Élevée | Critique | ❌ .env, mais pas chiffrement data |
| **Broken Access Control** | Élevée | Critique | 🟡 RBAC conçu, non testé |
| **Security Misconfiguration** | Moyenne | Élevé | ❌ Headers sécurité manquants |
| **Insecure Deserialization** | Faible | Élevé | ✅ JSON only |
| **Insufficient Logging** | Moyenne | Moyen | ❌ Logs audit absents |
| **DoS** | Moyenne | Élevé | ❌ Pas de rate limiting |

**Action requise** :

**Threat Model Document** : `/docs/security/threat-model.md`

```markdown
# Threat Model : Student Management

## Assets
- Student PII (nom, email, phone, adresse)
- Financial data (factures, paiements)
- Authentication tokens

## Threats (STRIDE)

### Spoofing
- ⚠️ Attacker pretends to be admin
- Mitigation : MFA (à implémenter)

### Tampering
- ⚠️ Attacker modifies student data
- Mitigation : RLS policies + audit logs

### Repudiation
- ⚠️ Admin denies action
- Mitigation : Audit trail (à implémenter)

### Information Disclosure
- ⚠️ Student data leaked
- Mitigation : Encryption at rest + in transit

### Denial of Service
- ⚠️ App unavailable
- Mitigation : Rate limiting (à implémenter)

### Elevation of Privilege
- ⚠️ Student becomes admin
- Mitigation : RBAC (à tester)

## Risk Score
High : 8 threats  
Medium : 4 threats  
Low : 2 threats  
Total : 14 threats identifiées
```

**Process** : Review threat model avant chaque release

---

### 11.2 Scan SAST/DAST passant (0 critical, 0 high) avant merge
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Aucun scan SAST (Static Analysis)
- Aucun scan DAST (Dynamic Analysis)
- Vulnérabilités inconnues

**Vulnérabilités npm détectées** :
```
15 vulnerabilities (4 low, 8 moderate, 3 high)
```

**Action requise URGENTE** :

**Fix vulnérabilités npm** :
```bash
npm audit
npm audit fix
npm audit fix --force  # Si nécessaire
```

**Setup Snyk** (recommandé) :
```bash
npm install -g snyk
snyk auth
snyk test
snyk monitor
```

**GitHub Actions Security** :

```yaml
# .github/workflows/security.yml
name: Security Scan

on: [push, pull_request]

jobs:
  sast:
    name: SAST (Semgrep)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: returntocorp/semgrep-action@v1
        with:
          config: auto
          
  dependencies:
    name: Dependency Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          command: test
          args: --severity-threshold=high
          
  secrets:
    name: Secret Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: main
```

**Règle** : **0 critical, 0 high** pour merge to main

---

### 11.3 Secrets gérés via vault, 0 credential dans repo
**Statut** : 🟢 **BON**  
**Évaluation** : 8/10

**Constat** :
- ✅ `.env` dans `.gitignore`
- ✅ Aucun secret hardcodé trouvé
- ✅ GitHub Secrets utilisable
- ❌ Pas de vault (Hashicorp Vault, AWS Secrets Manager)

**Vérification** :
```bash
# Scan secrets
git log --all --full-history -- .env
# Résultat : .env jamais commité ✅

# Recherche patterns secrets
grep -r "password.*=.*['\"]" src/
# Résultat : Aucun hardcodé ✅
```

**Secrets actuels** :
- `VITE_SUPABASE_ANON_KEY` : ✅ En .env
- `DATABASE_URL` : ✅ En .env
- Token GitHub : ❌ Était en remote (corrigé)

**Action requise** :

**GitHub Secrets** (pour CI/CD) :
```
Settings → Secrets and variables → Actions → New secret

Secrets à créer :
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (backend only)
- VERCEL_TOKEN (deployment)
```

**Pour production** :
- Considérer AWS Secrets Manager
- Ou Hashicorp Vault
- Rotation automatique secrets

---

### 11.4 RGPD : data-mapping + registre des traitements à jour
**Statut** : 🟢 **BON (conception)**  
**Évaluation** : 7/10

**Constat** :
- ✅ RGPD pensé dans architecture
- ✅ Conformité nDSG mentionnée
- ✅ Consent management prévu
- ❌ Registre des traitements non créé
- ❌ Data mapping non formalisé

**Fichiers RGPD trouvés** :
- `viamentor-gdpr-compliance-*` (pages/components)
- `viamentor-security-consents-i18n.ts`
- GDPR modules bien conçus

**Ce qui manque** :

**Data Mapping** : `/docs/security/data-mapping.md`

```markdown
# Data Mapping RGPD

## Données Personnelles (PII)

| Donnée | Catégorie | Finalité | Base légale | Durée conservation |
|--------|-----------|----------|-------------|-------------------|
| Nom, Prénom | Identité | Gestion formation | Contrat | 10 ans après fin |
| Email | Contact | Communication | Consentement | 3 ans inactivité |
| Téléphone | Contact | Rappels leçons | Consentement | 3 ans inactivité |
| Adresse | Identité | Facturation | Contrat | 10 ans fiscal |
| N° AVS | Identité | Contrôle OAC | Obligation légale | 10 ans |
| Photos | Biométrie | Permis élève | Consentement | Durée formation |
| Progression | Pédagogique | Évaluation | Intérêt légitime | 10 ans archivage |
| Factures | Financier | Comptabilité | Obligation légale | 10 ans fiscal |

## Données Sensibles

| Donnée | Risque | Protection |
|--------|--------|------------|
| Mot de passe | Très élevé | Hash bcrypt + salt |
| N° carte bancaire | Très élevé | Jamais stocké (tokenization) |
| Dossier médical | Élevé | Encryption AES-256 |

## Sous-traitants (Art. 28 RGPD)

| Sous-traitant | Service | Données partagées | DPA signé |
|---------------|---------|-------------------|-----------|
| Supabase | Hébergement DB | Toutes | ❌ À signer |
| Vercel | Hosting | Aucune (frontend) | N/A |
| SendGrid | Email | Email, nom | ❌ À signer |
```

**Registre des Traitements** : Obligation légale (Art. 30 RGPD)

---

### 11.5 Pentest annuel + correctifs ≤ 30 jours
**Statut** : ⚠️ **NON APPLICABLE**  
**Évaluation** : N/A (pas en prod)

**Constat** :
- Pas encore en production
- Mais : pentest nécessaire avant lancement

**Action requise (avant MEP)** :

**Pentest Scope** :
- Auth flow (login, signup, password reset)
- RBAC (elevation privilege)
- SQL injection attempts
- XSS vectors
- CSRF
- Session management
- Rate limiting

**Providers recommandés** :
- **Cobalt.io** (pentest as a service)
- **HackerOne** (bug bounty)
- **Freelance pentester** (LinkedIn)

**Budget** : 5'000 - 15'000 CHF

**Timeline** :
- Pentest : 1 semaine
- Report : 3 jours
- Fixes : ≤ 30 jours
- Retest : 1 semaine

---

## 📊 Indicateur Security

**Cible** : CVE > 7,8 en prod = 0

**État actuel** : ❌ **NON SCANNÉ**

**Scan npm** :
```bash
npm audit
```

**Résultat actuel** :
```
15 vulnerabilities (4 low, 8 moderate, 3 high)
```

**Action** : `npm audit fix` jusqu'à 0 high/critical

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| Threat model | 5/10 | 20% | 1.0 |
| SAST/DAST scan | 0/10 | 25% | 0 |
| Secrets management | 8/10 | 20% | 1.6 |
| RGPD data mapping | 7/10 | 20% | 1.4 |
| Pentest annuel | 0/10 | 15% | 0 |
| **TOTAL** | **4/10** | 100% | **4.0/10** |

---

## 📋 ACTIONS PRIORITAIRES

### P0 - Avant MVP (BLOQUEUR)
- [ ] Fix npm audit (0 high/critical)
- [ ] Setup SAST CI (Semgrep/Snyk)
- [ ] Threat model document
- [ ] Security headers (CSP, HSTS, etc.)

### P0 - Avant production
- [ ] Pentest externe
- [ ] RGPD : Data mapping formel
- [ ] DPA Supabase signée
- [ ] Audit logs implémentés

### P1 - Post-MVP
- [ ] Bug bounty program
- [ ] SOC 2 compliance (si B2B)
- [ ] Penetration tests trimestriels

---

## 🔒 CHECKLIST SÉCURITÉ PRÉ-PRODUCTION

### Authentication & Authorization
- [ ] Passwords hashed (bcrypt, scrypt)
- [ ] Session tokens secure (HttpOnly, Secure, SameSite)
- [ ] MFA available (Google Authenticator, SMS)
- [ ] Rate limiting login (5 attempts/15min)
- [ ] RBAC tested (cannot escalate privileges)
- [ ] RLS policies enabled + tested

### Data Protection
- [ ] HTTPS enforced (HSTS)
- [ ] Data encrypted at rest
- [ ] Data encrypted in transit (TLS 1.3)
- [ ] PII pseudonymized where possible
- [ ] Backup encrypted

### Input Validation
- [ ] All inputs validated server-side
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevented (React escaping + CSP)
- [ ] File upload validated (type, size, scan)

### Headers Sécurité
- [ ] Content-Security-Policy
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer-Policy: strict-origin
- [ ] Permissions-Policy

### Compliance
- [ ] CGU publiées
- [ ] Politique confidentialité publiée
- [ ] Bannière cookies conforme
- [ ] Registre traitements RGPD
- [ ] DPA sous-traitants signés

### Monitoring & Response
- [ ] Security alerts configured
- [ ] Audit logs enabled
- [ ] Incident response plan
- [ ] Security contact email

---

## 🚦 RECOMMANDATION

**Statut** : 🟡 **CONCEPTION BONNE, mais TESTS MANQUANTS**

L'architecture sécurité est **bien pensée** :
- RBAC solide
- RLS conçue
- Secrets protégés

**MAIS** :
- 🔴 Aucun scan sécurité
- 🔴 Aucun pentest
- 🔴 Headers sécurité manquants

**Bloqueur production** : OUI

**Effort** : 2-3 semaines

---

**Prochaines étapes** : Consulter `12-data-analytics.md`

