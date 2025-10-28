# Implémentation Complète Accountant

## User Request
Créer une page complète pour le rôle **Accountant** (Comptable niveau tenant/école) avec dashboard, droits d'accès, fonctions et navigation sidebar.

## Related Files
- @/polymet/data/viamentor-accountant-i18n (to create) - Traductions FR/DE/IT/EN
- @/polymet/data/viamentor-accountant-data (to create) - Mock data KPIs, transactions, analytics
- @/polymet/pages/viamentor-accountant-page (to create) - Page dashboard principale
- @/polymet/data/viamentor-navigation-config (to update) - Ajout ACCOUNTANT_NAV
- @/polymet/data/viamentor-navigation-i18n (to update) - Ajout traductions navigation
- @/polymet/prototypes/viamentor-system-prototype (to update) - Ajout route /accountant

## TODO List
- [x] Créer fichier i18n traductions Accountant (FR/DE/IT/EN)
- [x] Créer fichier mock data Accountant (KPIs, transactions, analytics)
- [x] Créer page dashboard Accountant avec Hero UI + Recharts
- [x] Mettre à jour navigation-config avec ACCOUNTANT_NAV
- [x] Mettre à jour navigation-i18n avec traductions
- [x] Ajouter route /accountant dans prototype

## Important Notes
**Rôle Accountant** :
- Niveau tenant (école) - pas plateforme
- Accès : Comptabilité, factures, paiements, rapports financiers
- Permissions : READ/EXPORT sur finances, pas de MANAGE
- Différent de FINANCE_ADMIN (niveau plateforme)

**Fonctionnalités Dashboard** :
- KPIs financiers (revenus, créances, trésorerie, taux encaissement)
- Transactions récentes avec statuts
- Analytics revenus (évolution, répartition, moyens paiement)
- Actions rapides (export, rapports, réconciliation)
- Alertes comptables (impayés, anomalies)

**Navigation Sidebar** :
- Dashboard principal
- Factures (liste, détails, export)
- Paiements (réconciliation, import Camt)
- Rapports (comptables, TVA, analytiques)
- Paramètres (tarification lecture seule)

  
## Plan Information
*This plan is created when the project is at iteration 195, and date 2025-10-17T14:04:00.783Z*
