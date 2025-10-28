/**
 * VIAMENTOR - DOCUMENTATION 01: INTRODUCTION
 */

export const introductionDoc = `
# 📘 Viamentor - Introduction

## 🎯 Vue d'ensemble

**Viamentor** est un système de gestion complet pour auto-écoles suisses, conçu comme une solution SaaS multi-tenant. Le système couvre l'intégralité du cycle de vie d'une auto-école, de l'inscription des élèves jusqu'à la gestion administrative et financière.

---

## 🌟 Vision du projet

Digitaliser et moderniser la gestion des auto-écoles suisses en offrant une plateforme intuitive, conforme aux réglementations locales (OAC, OMCo, RGPD) et accessible en 4 langues nationales.

---

## 🎯 Objectifs principaux

### 1. **Gestion complète**
- Élèves (inscriptions, progression, examens)
- Moniteurs (planning, performance, habilitations)
- Véhicules (maintenance, conformité, utilisation)
- Planning (leçons pratiques, cours théoriques)
- Facturation (invoices, paiements, QR-bills suisses)

### 2. **Multi-tenant B2B**
- Chaque auto-école = 1 tenant isolé
- Gestion centralisée par Platform Admin
- Données séparées et sécurisées

### 3. **Conformité légale**
- **OAC** (Ordonnance sur l'admission à la circulation)
- **OMCo** (Ordonnance sur les moniteurs de conduite)
- **RGPD** (Règlement général sur la protection des données)
- **Normes suisses** (QR-bill, TVA, cantons)

### 4. **Localisation complète**
- **FR** : Français (Suisse romande)
- **DE** : Allemand (Suisse alémanique)
- **IT** : Italien (Tessin)
- **EN** : Anglais (international)

---

## 👥 Utilisateurs cibles

### **Platform Admin** (Viamentor)
- Gestion des tenants (auto-écoles)
- Monitoring global
- Support technique
- Facturation SaaS

### **School Admin** (Propriétaire auto-école)
- Gestion complète de son école
- Élèves, moniteurs, véhicules
- Facturation, analytics
- Configuration système

### **Secretary** (Secrétariat)
- Inscriptions rapides
- Planning quotidien
- Communications
- Tâches administratives

### **Instructor** (Moniteur)
- Planning personnel
- Évaluation élèves
- Gestion documents
- Performance tracking

### **Student** (Élève)
- Réservation leçons
- Suivi progression
- Documents personnels
- Paiements en ligne

---

## 🏗️ Architecture globale

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     VIAMENTOR PLATFORM                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Tenant 1   │  │   Tenant 2   │  │   Tenant N   │     │
│  │ Auto-École A │  │ Auto-École B │  │ Auto-École Z │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                     SHARED SERVICES                         │
│  • Authentication (Supabase Auth)                           │
│  • Database (PostgreSQL)                                    │
│  • Storage (Supabase Storage)                               │
│  • Analytics (Custom)                                       │
│  • Notifications (Email/SMS)                                │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 📊 Modules principaux

### 1. **Gestion Élèves**
- Wizard inscription (4 steps)
- Fiche détail complète
- Progression pédagogique
- Documents (permis, certificats)
- Historique leçons

### 2. **Gestion Moniteurs**
- Wizard création (3 steps)
- Habilitations OMCo
- Planning disponibilités
- Performance analytics
- Évaluation élèves

### 3. **Gestion Véhicules**
- Wizard création (4 steps)
- Conformité OAC Art. 65-68
- Maintenance tracking
- GPS tracking
- Coûts & ROI

### 4. **Planning**
- Calendar view (Month/Week/Day)
- Drag & drop
- Leçons pratiques
- Cours théoriques
- Gestion conflits

### 5. **Facturation**
- Invoices management
- QR-bill suisse
- Payment tracking
- Dunning management
- Camt.054 import

### 6. **Analytics**
- Performance moniteurs
- Utilisation véhicules
- Analytics financières
- Taux réussite examens
- Forecasting ML

### 7. **RGPD**
- Consent management
- Data subject requests
- Audit logs
- Anonymization
- Export données

---

## 🔐 Sécurité & Conformité

### **Authentification**
- Supabase Auth
- JWT tokens
- MFA (Multi-Factor Authentication)
- Session management

### **Autorisation**
- RBAC (15 rôles)
- Row Level Security (RLS)
- Tenant isolation
- Permission matrix

### **Données**
- Encryption at rest
- Encryption in transit (TLS)
- Backups automatiques
- GDPR compliance

---

## 🌍 Localisation

### **i18n complet**
- 4 langues (FR/DE/IT/EN)
- Formats localisés (dates, nombres, devises)
- Règles grammaticales par langue
- Adaptation culturelle

### **Cantons suisses**
- 26 cantons supportés
- Langue par défaut par canton
- Réglementations cantonales
- Jours fériés locaux

---

## 📈 Statistiques projet

\`\`\`
Total Iterations:     146
Total Pages:          50+
Total Components:     100+
Total Data Files:     80+
Lines of Code:        50,000+
Languages:            4 (FR/DE/IT/EN)
Roles:                15
Test Coverage:        0% (à implémenter)
Documentation:        100%
\`\`\`

---

## 🚀 Roadmap

### **Phase 1 - MVP** (Complété à 70%)
- ✅ Architecture front-end
- ✅ Design system
- ✅ RBAC & i18n
- ✅ Mock data
- ⏳ Backend API
- ⏳ Database
- ⏳ Authentication

### **Phase 2 - Qualité** (À venir)
- ⏳ Tests automatisés
- ⏳ CI/CD pipeline
- ⏳ Monitoring
- ⏳ Performance optimization

### **Phase 3 - Production** (À venir)
- ⏳ Staging deployment
- ⏳ User acceptance testing
- ⏳ Production launch
- ⏳ Marketing

---

## 📞 Support & Contact

- **Documentation**: [docs.viamentor.ch](https://docs.viamentor.ch)
- **Support**: support@viamentor.ch
- **Sales**: sales@viamentor.ch
- **GitHub**: [github.com/viamentor](https://github.com/viamentor)

---

## 📄 Licence

**Proprietary** - © 2025 Viamentor. Tous droits réservés.

---

**Prochaine section**: [02 - Architecture Générale](./02-architecture-generale.md)
`;

export default introductionDoc;
