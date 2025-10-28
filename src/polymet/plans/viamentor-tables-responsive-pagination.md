# Plan: Tables Responsive + Pagination Viamentor

## User Request
Modifier TOUS les composants table pour:
1. Ajouter pagination
2. Version web en table
3. Version tablette et mobile en cards
4. Wizard Step 1: langue par défaut du canton + titres entre sections

## Related Files
- @/polymet/components/viamentor-student-wizard-step-1-identity (to edit) - Langue canton auto + titres sections
- @/polymet/components/viamentor-students-table (to edit) - Ajouter pagination + responsive cards
- @/polymet/components/viamentor-gdpr-requests-table (to view) - Déjà responsive, ajouter pagination
- @/polymet/components/viamentor-invoices-table (to edit) - Ajouter pagination + responsive cards
- @/polymet/pages/viamentor-gdpr-compliance-page (to view) - Vérifier intégration
- @/polymet/pages/viamentor-invoices-page (to view) - Vérifier intégration

## TODO List
- [x] View all files to understand structure
- [x] **Step 1 Identity**: Langue canton auto (h5yds9) + titres sections (x05g6z)
- [x] **Students Table**: Pagination + responsive cards (table web, cards mobile/tablette)
- [x] **GDPR Requests Table**: Ajouter pagination (déjà responsive)
- [x] **Invoices Table**: Pagination + responsive cards (9d47u2)
- [x] Test all modifications

## Important Notes
- **Pagination**: Utiliser composant Pagination shadcn avec 10 items/page par défaut
- **Responsive**: `hidden md:block` pour table, `md:hidden` pour cards
- **Canton langue**: Utiliser `getCantonByCode()` et `defaultLocale` de Swiss Cantons data
- **Titres sections**: Ajouter h3 entre chaque section du wizard
- **data-pol-id**: Préserver tous les attributs existants

  
## Plan Information
*This plan is created when the project is at iteration 20, and date 2025-10-14T09:46:35.519Z*
