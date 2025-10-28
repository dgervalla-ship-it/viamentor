# Pricing & Products Catalog Settings

## User Request
Créer le module complet de paramètres tarification ViaMenutor avec:
- Prix leçons pratiques par catégorie (45min/90min)
- Forfaits leçons avec remises incitatives
- Catalogue services complémentaires (cours théoriques, examens, frais)
- Remises & promotions avec codes promo
- Configuration TVA suisse (0%/2.5%/8.1%)
- Conditions paiement et frais/pénalités
- Hero UI, i18n FR/DE/IT/EN, Clean Code 200-250 lignes/fichier

## Related Files
- `@/polymet/data/viamentor-pricing-data` (to create) - Mock data et types
- `@/polymet/data/viamentor-pricing-i18n` (to create) - Traductions FR/DE/IT/EN
- `@/polymet/data/viamentor-pricing-schemas` (to create) - Schémas validation Zod
- `@/polymet/pages/viamentor-pricing-settings-page` (to create) - Page principale avec Tabs
- `@/polymet/prototypes/viamentor-system-prototype` (to update) - Ajouter route

## TODO List
- [x] Créer mock data et types TypeScript complets
- [x] Créer traductions i18n FR/DE/IT/EN
- [x] Créer schémas validation Zod
- [x] Créer page principale avec Tabs navigation
- [x] Ajouter route au prototype
- [x] Mettre à jour le plan

## Important Notes
- **Structure Tabs**: 6 tabs (Leçons/Forfaits/Services/Promotions/TVA/Conditions)
- **Prix leçons**: Table éditable par catégorie avec auto-calculate 90min
- **Forfaits**: DataTable avec calcul économies automatique
- **TVA suisse**: 3 taux (0%/2.5%/8.1%) avec numéro CHE validation
- **Promotions**: Codes promo avec tracking utilisations
- **Conditions**: Délais paiement, méthodes acceptées, frais annulation
- **i18n**: Terminologie comptable précise, formats CHF, labels TVA multilingues
  
## Plan Information
*This plan is created when the project is at iteration 68, and date 2025-10-14T22:29:03.134Z*
