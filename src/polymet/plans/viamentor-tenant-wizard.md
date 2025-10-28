# Wizard Création Tenant Viamentor

## User Request
Créer un wizard multi-steps fullscreen pour Platform Admin permettant de créer un nouveau tenant (auto-école) avec validation Zod, Hero UI Dialog, i18n, et architecture Clean Code SOLID.

## Related Files
- @/polymet/data/viamentor-tenant-wizard-schemas (to create) - Schémas Zod validation
- @/polymet/components/platform/create-tenant-wizard (to create) - Composant principal wizard
- @/polymet/components/platform/wizard-steps/step-1-school-info (to create) - Step 1 infos école
- @/polymet/components/platform/wizard-steps/step-2-admin-user (to create) - Step 2 admin user
- @/polymet/components/platform/wizard-steps/step-3-plan-billing (to create) - Step 3 plan & billing
- @/polymet/components/platform/wizard-steps/step-4-configuration (to create) - Step 4 configuration
- @/polymet/components/platform/wizard-steps/step-5-summary (to create) - Step 5 récapitulatif
- @/polymet/data/viamentor-swiss-cantons (to create) - Data cantons suisses
- @/polymet/pages/viamentor-tenants-page (to update) - Ajouter bouton création tenant

## TODO List
- [x] Créer schémas Zod validation pour chaque step
- [x] Créer data cantons suisses avec drapeaux
- [x] Créer composant wizard principal avec Dialog Hero UI
- [x] Créer Step 1 - School Info avec upload logo et validation
- [x] Créer Step 2 - Admin User avec génération mot de passe
- [x] Créer Step 3 - Plan & Billing avec cards comparison
- [x] Créer Step 4 - Configuration modules optionnels
- [x] Créer Step 5 - Summary récapitulatif
- [x] Intégrer wizard dans page tenants avec bouton

## Important Notes
- Architecture SOLID: Séparation des steps en composants indépendants
- Clean Code: Max 250 lignes par fichier
- Validation Zod: Schémas réutilisables et composables
- Hero UI Dialog: Fullscreen avec backdrop blur
- i18n: Support FR/DE/IT/EN
- Error handling: Inline validation + summary errors
- Responsive: Mobile-first design

  
## Plan Information
*This plan is created when the project is at iteration 5, and date 2025-10-13T15:31:07.780Z*
