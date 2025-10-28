# Wizard Création Moniteur Viamentor

## User Request
Créer wizard création moniteur avec 5 steps, Hero UI Dialog fullscreen, validation OMCo (âge ≥21 ans), qualifications brevet fédéral, i18n FR/DE/IT/EN, Clean Code 200-250 lignes/fichier.

## Related Files
- @/viamentor/data/viamentor-instructors-wizard-schemas (to create) - Schémas Zod validation
- @/viamentor/data/viamentor-instructors-wizard-i18n (to create) - Traductions FR/DE/IT/EN
- @/viamentor/components/viamentor-create-instructor-wizard (to create) - Wizard principal Dialog
- @/viamentor/components/viamentor-instructor-wizard-step-1-personal-info (to create) - Step 1 Infos personnelles
- @/viamentor/components/viamentor-instructor-wizard-step-2-qualifications (to create) - Step 2 Qualifications brevet
- @/viamentor/data/viamentor-instructors-data (to view) - Types existants

## TODO List
- [x] Créer schémas validation Zod avec règles OMCo
- [x] Créer traductions i18n FR/DE/IT/EN
- [x] Créer Step 1 - Personal Info (photo, identité, adresse, contact)
- [x] Créer Step 2 - Qualifications (brevet fédéral, habilitations catégories)
- [x] Créer Wizard principal avec Dialog, Stepper, navigation
- [x] Tester intégration complète

## Important Notes
- **Validation OMCo**: Âge minimum 21 ans pour moniteur
- **Brevet fédéral**: Numéro + date + scan PDF obligatoires
- **Habilitations**: Minimum 1 catégorie (B/A/BE/A1/BPT)
- **Email unique**: Check API avec debounce + checkmark
- **Photo**: Upload DropZone circle 120x120 avec crop modal
- **Clean Code**: 200-250 lignes/fichier strict
- **i18n**: Labels, validation messages, OMCo references traduits
  
## Plan Information
*This plan is created when the project is at iteration 25, and date 2025-10-14T11:06:28.333Z*
