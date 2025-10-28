# Wizard Création Élève Viamentor

## User Request
Créer un wizard complet de création d'élève avec 4 steps (Identité, Formation, Prérequis légaux OAC, Récapitulatif), validation Zod, upload documents, Hero UI Dialog fullscreen, i18n FR/DE/IT/EN.

## Related Files
- @/polymet/data/viamentor-student-wizard-schemas (to create) - Schémas Zod validation
- @/polymet/data/viamentor-student-wizard-i18n (to create) - Traductions i18n
- @/polymet/data/viamentor-swiss-cantons (exists) - Cantons suisses
- @/polymet/components/viamentor-student-wizard-step-1-identity (to create) - Step 1 Identité
- @/polymet/components/viamentor-student-wizard-step-2-training (to create) - Step 2 Formation
- @/polymet/components/viamentor-student-wizard-step-3-legal (to create) - Step 3 Prérequis OAC
- @/polymet/components/viamentor-student-wizard-step-4-summary (to create) - Step 4 Récapitulatif
- @/polymet/components/viamentor-create-student-wizard (to create) - Wizard principal
- @/polymet/pages/viamentor-students-page (to update) - Intégrer wizard

## TODO List
- [x] Créer schémas validation Zod avec règles OAC
- [x] Créer traductions i18n wizard
- [x] Créer Step 1 - Identité (photo, infos personnelles, adresse)
- [x] Créer Step 2 - Formation (catégories, moniteurs, formules)
- [x] Créer Step 3 - Prérequis légaux OAC (documents, validations)
- [x] Créer Step 4 - Récapitulatif (review, confirmation)
- [x] Créer composant wizard principal avec stepper
- [ ] Intégrer wizard dans page Students

## Important Notes
- **Validation OAC stricte**: Âges minimums (A1: 16 ans, B/A/BE: 18 ans, BPT: 21 ans)
- **Documents obligatoires**: Permis élève, examen vue, cours premiers secours, cours sensibilisation
- **Catégories motos**: Cours obligatoire 12h (Art. 25a OAC)
- **Upload fichiers**: Images max 2MB, PDF max 5MB
- **i18n complet**: Labels, validation, messages OAC traduits
- **Clean Code**: Max 250 lignes/fichier, SOLID principles

  
## Plan Information
*This plan is created when the project is at iteration 17, and date 2025-10-14T09:10:48.253Z*
