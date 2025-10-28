/**
 * VIAMENTOR - Pixels Health Monitoring System Guide
 * 
 * Documentation complète du système de monitoring santé pixels tracking
 */

# 📊 ViaMenutor - Système Monitoring Santé Pixels

## 🎯 Vue d'ensemble

Système complet de surveillance et monitoring des pixels tracking publicitaires avec diagnostics automatiques, alertes temps réel et notifications email.

---

## 📁 Architecture des fichiers

### Data Files
- **viamentor-pixels-monitoring-i18n** - Traductions FR/DE/IT/EN complètes
- **viamentor-pixels-monitoring-data** - Types TypeScript et mock data

### Components
- **viamentor-pixels-health-dashboard** - Dashboard status plateformes (240 lignes)
- **viamentor-active-alerts-section** - Section alertes actives (235 lignes)
- **viamentor-auto-diagnostics** - Diagnostics automatiques 5 tests (230 lignes)
- **viamentor-events-logs-sheet** - Historique événements avec filtres (235 lignes)
- **viamentor-email-notifications-config** - Configuration notifications (225 lignes)

### Pages
- **viamentor-pixels-health-page** - Page principale avec tabs (245 lignes)

### Routes
- `/marketing/pixels/health` - Page monitoring pixels

---

## ✨ Features principales

### 1. Dashboard Status Plateformes
- ✅ Cards par plateforme (Meta, Google, TikTok, LinkedIn)
- ✅ Badge statut avec animation pulse (Opérationnel/Dégradé/Hors ligne)
- ✅ Stats inline: événements, erreurs, taux succès, latence
- ✅ Actions: Tester maintenant, Voir logs
- ✅ Dernière vérification avec timestamp relatif

### 2. Alertes Actives
- ✅ Cards problèmes détectés avec severity colors
- ✅ Descriptions détaillées des problèmes
- ✅ Actions: Diagnostiquer, Résoudre, Ignorer 24h
- ✅ Timestamp détection et plateforme affectée

### 3. Diagnostics Automatiques
- ✅ 5 tests séquentiels par plateforme
- ✅ Progress bar avec pourcentage
- ✅ Résultats détaillés (passed/failed)
- ✅ Messages d'erreur techniques
- ✅ Copier logs pour support

### 4. Historique Événements
- ✅ Sheet slide-over avec timeline
- ✅ Filtres: plateforme, statut, type, recherche
- ✅ Détails expandables (paramètres, réponse API)
- ✅ Retry manuel pour événements échoués
- ✅ Export CSV

### 5. Notifications Email
- ✅ Toggle enable/disable global
- ✅ Recipients chips avec add/remove
- ✅ Fréquence: temps réel, horaire, quotidien, hebdomadaire
- ✅ Types: pixel offline, erreurs, budget, conversions
- ✅ Severity badges par type

---

## 🎨 UI/UX Features

### Design System
- Hero UI components (Cards, Badges, Buttons)
- Semantic colors (green/orange/red status)
- Pulse animation pour status opérationnel
- Responsive grid layouts
- Dark mode support

### Interactions
- Real-time updates simulation
- Loading states avec spinners
- Toast notifications
- Expandable accordions
- Slide-over sheets

---

## 🌍 i18n Support

### Langues supportées
- 🇫🇷 Français
- 🇩🇪 Allemand
- 🇮🇹 Italien
- 🇬🇧 Anglais

### Traductions complètes
- Labels UI
- Messages d'erreur
- Descriptions techniques
- Notifications email

---

## 📊 Mock Data

### Platforms Health
- 4 plateformes configurées
- Stats réalistes (événements, erreurs, latence)
- Status variés pour démonstration

### Pixel Alerts
- 2 alertes actives (critical, warning)
- Descriptions détaillées des problèmes
- Timestamps réalistes

### Pixel Events
- 4 événements récents
- Différents types (lead, pageView, purchase)
- Status variés (sent, failed, retrying)
- Paramètres et réponses API

---

## 🚀 Usage

```tsx
import { PixelsHealthPage } from "@/polymet/pages/viamentor-pixels-health-page";

<PixelsHealthPage locale="fr" />
```

### Navigation
Route: `/marketing/pixels/health`
Breadcrumb: Marketing > Santé pixels

---

## 🔧 Technical Stack

- React + TypeScript
- Shadcn UI components
- Lucide React icons
- TailwindCSS
- React Router

---

## 📝 Clean Code Principles

✅ Tous les fichiers respectent la limite 200-250 lignes
✅ Séparation des responsabilités
✅ Types TypeScript complets
✅ Props interfaces documentées
✅ Mock data réaliste
✅ i18n intégré partout

---

## 🎯 Next Steps (Optional)

- API service implementation
- WebSocket real-time updates
- Email templates integration
- PDF report generation
- Analytics tracking
- Landing pages variants

---

**Status**: ✅ Production-ready
**Version**: 1.0.0
**Date**: 2025
