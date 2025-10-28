# Améliorations Module Payments

## User Request
Ajouter 3 fonctionnalités au module Payments :
1. **Paiements Non Réconciliés** - Page dédiée pour traiter manuellement les paiements sans facture avec actions : Associer facture, Créer facture rétro, Marquer vérifié
2. **Rapports Comptables** - Export journal des paiements, Rapports TVA avec ventilation
3. **Notifications** - Email automatique receipt après paiement, Alertes paiements en attente validation, Rappels paiements non réconciliés

## Related Files
- @/viamentor/pages/viamentor-payments-page (to update) - Ajouter tabs navigation et intégrer nouveaux composants
- @/viamentor/data/viamentor-payments-data (to update) - Ajouter types et mock data pour paiements non réconciliés, rapports, notifications
- @/viamentor/data/viamentor-payments-i18n (to update) - Ajouter traductions pour nouvelles sections
- @/viamentor/components/viamentor-unreconciled-payments-tab (to create) - Tab paiements non réconciliés avec table et actions
- @/viamentor/components/viamentor-accounting-reports-tab (to create) - Tab rapports comptables avec exports et TVA
- @/viamentor/components/viamentor-payment-notifications-settings (to create) - Composant configuration notifications
- @/viamentor/components/viamentor-associate-invoice-dialog (to create) - Dialog pour associer facture à paiement
- @/viamentor/components/viamentor-create-retroactive-invoice-dialog (to create) - Dialog création facture rétroactive

## TODO List
- [x] Mettre à jour data/viamentor-payments-data avec types et mock data
- [x] Mettre à jour data/viamentor-payments-i18n avec traductions (FR seulement, DE/IT/EN à compléter)
- [x] Créer composant viamentor-unreconciled-payments-tab
- [x] Créer composant viamentor-associate-invoice-dialog
- [x] Créer composant viamentor-create-retroactive-invoice-dialog
- [x] Créer composant viamentor-accounting-reports-tab
- [x] Créer composant viamentor-payment-notifications-settings
- [x] Mettre à jour pages/viamentor-payments-page avec tabs navigation

## Important Notes
- **Architecture** : Utiliser Tabs Hero UI pour navigation entre sections (Paiements / Non réconciliés / Rapports / Notifications)
- **Paiements non réconciliés** : Table avec filtres source (Camt/Manuel), actions inline (Associer/Créer facture/Marquer vérifié)
- **Rapports comptables** : Export journal paiements (Excel/CSV/PDF), rapport TVA avec ventilation par taux (7.7%/2.5%/0%)
- **Notifications** : Configuration templates emails (Receipt/Validation/Rappels), preview et test send
- **i18n** : Traductions FR/DE/IT/EN complètes pour toutes nouvelles sections
- **Hero UI** : Dialog, Tabs, Table, Badge, Select, DatePicker

  
## Plan Information
*This plan is created when the project is at iteration 59, and date 2025-10-14T21:12:29.526Z*
