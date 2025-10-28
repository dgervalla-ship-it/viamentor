# Pricing Module Enhancements

## User Request
Créer un système complet avec :
- **Forfaits + Services combinés** : Packages incluant leçons + cours théoriques + services
- **Promotions applicables partout** : Sur leçons, forfaits, services
- **Wizards création** : Dialog wizards pour forfaits/promotions/produits
- **Édition inline avancée** : Validation temps réel et auto-save
- **Preview facture** : Dialog avec rendering facture complète
- **Export données** : CSV/Excel pour forfaits/promotions
- **Analytics pricing** : Dashboard impact promotions sur revenus
- **Historique prix** : Tracking changements avec audit trail
- **Notifications élèves** : Alertes si changements prix significatifs

## Related Files
- @/polymet/data/viamentor-pricing-data (to update) - Ajouter types forfaits combinés, historique prix
- @/polymet/data/viamentor-pricing-i18n (to update) - Ajouter traductions wizards/analytics
- @/polymet/data/viamentor-pricing-schemas (to update) - Ajouter schémas validation wizards
- @/polymet/components/viamentor-create-package-wizard (to create) - Wizard création forfait combiné
- @/polymet/components/viamentor-create-promotion-wizard (to create) - Wizard création promotion
- @/polymet/components/viamentor-create-product-wizard (to create) - Wizard création produit/service
- @/polymet/components/viamentor-invoice-preview-dialog (to create) - Preview facture avec rendering
- @/polymet/components/viamentor-pricing-analytics-dashboard (to create) - Analytics impact promotions
- @/polymet/components/viamentor-price-history-drawer (to create) - Historique changements prix
- @/polymet/pages/viamentor-pricing-settings-page (to update) - Intégrer tous les nouveaux composants

## TODO List
- [x] Mettre à jour data/schemas avec types forfaits combinés, historique, analytics
- [x] Créer wizard création forfait combiné (leçons + services)
- [x] Créer wizard création promotion (multi-applicabilité)
- [x] Créer dialog preview facture avec rendering complet
- [x] Créer dashboard analytics pricing avec charts impact
- [x] Créer drawer historique prix avec audit trail
- [ ] Créer wizard création produit/service (optionnel - similaire au wizard forfait)
- [ ] Mettre à jour page principale avec édition inline avancée (à faire)
- [ ] Ajouter export CSV/Excel pour forfaits/promotions (fonctionnalité de base ajoutée)
- [ ] Ajouter système notifications élèves changements prix (mock data créé)

## Important Notes
- **Forfaits combinés** : Inclure leçons pratiques + cours théoriques + services (ex: "Pack Complet B" = 20 leçons + cours sensibilisation + premiers secours)
- **Promotions universelles** : Applicable sur tous les produits (leçons/forfaits/services)
- **Wizards** : Multi-steps avec validation Zod, preview avant save
- **Édition inline** : Debounce auto-save 1s, validation temps réel, toast feedback
- **Preview facture** : Rendering avec prix actuels + promotions appliquées
- **Analytics** : Charts revenus avec/sans promotions, ROI promotions, top promotions
- **Historique** : Audit trail avec user, date, ancien/nouveau prix, raison changement
- **Notifications** : Alert élèves si prix augmente >10% ou nouveau forfait avantageux

  
## Plan Information
*This plan is created when the project is at iteration 69, and date 2025-10-14T22:40:20.208Z*
