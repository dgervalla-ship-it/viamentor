# Plan: Gestion Paiements Viamentor

## User Request
Développer système complet gestion paiements avec:
- Enregistrement manuel paiements avec modal form
- Import relevés bancaires Camt.054 XML
- Réconciliation automatique paiements↔factures
- Liste paiements avec filtres et exports
- Hero UI, i18n FR/DE/IT/EN, Clean Code 200-250 lignes/fichier

## Related Files
- [ ] data/viamentor-payments-data (to create) - Mock data paiements, méthodes, stats
- [ ] data/viamentor-payments-i18n (to create) - Traductions FR/DE/IT/EN
- [ ] data/viamentor-camt-parser-schemas (to create) - Schémas Zod validation Camt.054
- [ ] components/viamentor-record-payment-modal (to create) - Modal enregistrement paiement
- [ ] components/viamentor-payments-list-page (to create) - Page liste paiements
- [ ] components/viamentor-import-camt-modal (to create) - Modal import Camt.054
- [ ] components/viamentor-camt-matching-table (to create) - Table réconciliation
- [ ] components/viamentor-payments-stats-cards (to create) - Stats KPIs header
- [ ] components/viamentor-unreconciled-payments (to create) - Paiements non réconciliés
- [ ] pages/viamentor-payments-page (to create) - Page principale paiements
- [ ] prototypes/viamentor-system-prototype (to update) - Ajouter route /payments

## TODO List
- [x] Créer data/viamentor-payments-data avec types complets
- [x] Créer data/viamentor-payments-i18n avec traductions
- [x] Créer data/viamentor-camt-parser-schemas avec validation Zod
- [x] Créer components/viamentor-record-payment-modal
- [x] Créer components/viamentor-payments-stats-cards
- [x] Créer components/viamentor-camt-matching-table
- [x] Créer components/viamentor-import-camt-modal avec steps
- [x] Créer pages/viamentor-payments-page avec DataTable complète
- [x] Mettre à jour prototype avec route /payments

## Important Notes
- Limite 200-250 lignes par fichier stricte
- Camt.054 = XML standard bancaire suisse ISO 20022
- Réconciliation: QRR reference → fuzzy matching montant/date/élève
- i18n: Labels, statuts matching, erreurs parsing, formats CHF/dates
- Hero UI: Dialog, DataTable, Autocomplete, DropZone, Badges
- Validation Zod: Montants, dates, XML parsing
- Mock API simulation pour démo

  
## Plan Information
*This plan is created when the project is at iteration 58, and date 2025-10-14T21:02:05.295Z*
