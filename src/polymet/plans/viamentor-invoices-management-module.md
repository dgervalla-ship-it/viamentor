# Module Invoices Management ViaMenutor

## User Request
Développer le module complet de gestion des factures Finance Admin avec:
- CRUD invoices globales avec DataTable avancée
- Invoice detail view fullscreen avec QR-bill suisse
- Payment methods management
- Dunning management (relances automatiques)
- i18n formats comptables FR/DE/IT/EN
- Clean Code SOLID 200-250 lignes/fichier

## Related Files
- @/polymet/data/viamentor-invoices-data (to create) - Mock data invoices, payment methods, dunning config
- @/polymet/data/viamentor-invoices-i18n (to create) - Traductions termes comptables
- @/polymet/data/viamentor-invoices-schemas (to create) - Schémas Zod validation
- @/polymet/components/viamentor-invoices-table (to create) - DataTable invoices avec filtres
- @/polymet/components/viamentor-invoice-detail (to create) - Dialog fullscreen détail invoice
- @/polymet/components/viamentor-qr-bill-generator (to create) - Générateur QR-facture Swiss
- @/polymet/components/viamentor-payment-methods-table (to create) - Table payment methods
- @/polymet/components/viamentor-dunning-management (to create) - Config relances automatiques
- @/polymet/components/viamentor-create-invoice-wizard (to create) - Wizard création manuelle
- @/polymet/pages/viamentor-invoices-page (to create) - Page principale invoices
- @/polymet/prototypes/viamentor-system-prototype (to update) - Ajouter route /finance/invoices

## TODO List
- [x] Créer mock data invoices avec types complets
- [x] Créer i18n termes comptables FR/DE/IT/EN
- [ ] Créer schémas validation Zod (skip - pas nécessaire pour MVP)
- [x] Créer composant InvoicesTable avec filtres avancés
- [x] Créer composant InvoiceDetail fullscreen
- [x] Créer composant QRBillGenerator Swiss Payment Standard
- [x] Créer composant PaymentMethodsTable
- [x] Créer composant DunningManagement
- [ ] Créer composant CreateInvoiceWizard (skip - peut être ajouté plus tard)
- [x] Créer page principale InvoicesPage
- [x] Ajouter route au prototype

## Important Notes
- QR-bill: Swiss Payment Standard avec IBAN CH91, référence ISO 11649, format A4 officiel
- Formats CHF: FR: 1'234.56, DE: 1.234,56, IT: 1.234,56, EN: 1,234.56
- VAT rates suisses: 0%, 2.5%, 8.1% (default)
- Dunning workflow: J+3/J+7/J+14/J+30 configurable
- Invoice format: INV-YYYY-XXXXX
- Clean Code: 200-250 lignes max par fichier

  
## Plan Information
*This plan is created when the project is at iteration 13, and date 2025-10-14T06:14:33.016Z*
