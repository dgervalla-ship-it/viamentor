# Vue Détail Facture Viamentor

## User Request
Créer une vue détail facture complète avec modal fullscreen, sections organisées (élève, montants, conditions, items, paiements, QR-bill, communications, actions, notes, historique), Hero UI, i18n, Clean Code 200-250 lignes/fichier.

## Related Files
- @/viamentor/data/viamentor-invoice-detail-data (to create) - Mock data étendu pour détail facture
- @/viamentor/data/viamentor-invoice-detail-i18n (to create) - Traductions i18n
- @/viamentor/components/viamentor-invoice-detail-modal (to create) - Modal fullscreen principal
- @/viamentor/components/viamentor-invoice-preview (to create) - Preview PDF iframe
- @/viamentor/components/viamentor-invoice-actions (to create) - Actions contextuelles
- @/viamentor/components/viamentor-invoice-payments-timeline (to create) - Timeline paiements
- @/viamentor/components/viamentor-invoice-qr-bill-section (to create) - Section QR-bill suisse
- @/viamentor/components/viamentor-invoice-history (to create) - Historique modifications
- @/viamentor/data/viamentor-invoices-data (to view) - Types existants
- @/viamentor/data/viamentor-invoices-i18n (to view) - i18n existant

## TODO List
- [x] Créer mock data étendu pour détail facture avec paiements/communications/historique
- [x] Créer traductions i18n pour détail facture
- [x] Créer composant InvoiceDetailModal avec header sticky et layout split
- [x] Créer composant InvoicePreview pour iframe PDF
- [x] Créer composant InvoiceActions avec actions contextuelles par statut
- [x] Créer composant PaymentsTimeline avec historique paiements
- [x] Créer composant QRBillSection avec QR-code et bulletin
- [x] Créer composant InvoiceHistory avec audit trail

## Important Notes
- Respecter limite 200-250 lignes par fichier
- Modal fullscreen avec backdrop blur
- Header sticky avec actions contextuelles
- Layout split view 60/40 (preview/info)
- Actions différentes selon statut (Draft/Sent/Paid/Overdue/Void)
- QR-bill Swiss Payment Standard
- Timeline paiements et communications
- Audit trail avec JSON diff
- i18n complet FR/DE/IT/EN

  
## Plan Information
*This plan is created when the project is at iteration 57, and date 2025-10-14T20:49:27.080Z*
