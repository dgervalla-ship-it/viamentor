# Wizard Création Véhicule Viamentor

## User Request
Créer wizard multi-steps création véhicule avec validation OAC Art. 65-68, équipements obligatoires, assurances, Hero UI Dialog, i18n, Clean Code 200-250 lignes/fichier.

## Related Files
- @/viamentor/data/viamentor-vehicles-data (to view) - Mock data véhicules existant
- @/viamentor/data/viamentor-vehicles-i18n (to view) - Traductions véhicules
- @/viamentor/components/viamentor-vehicles-wizard-schemas (to create) - Schémas validation Zod
- @/viamentor/data/viamentor-vehicles-wizard-i18n (to create) - Traductions wizard
- @/viamentor/components/viamentor-vehicle-wizard-step-1-info (to create) - Step 1 Informations
- @/viamentor/components/viamentor-vehicle-wizard-step-2-equipment (to create) - Step 2 Équipements OAC
- @/viamentor/components/viamentor-vehicle-wizard-step-3-insurances (to create) - Step 3 Assurances
- @/viamentor/components/viamentor-vehicle-wizard-step-4-summary (to create) - Step 4 Récapitulatif
- @/viamentor/components/viamentor-create-vehicle-wizard (to create) - Wizard principal

## TODO List
- [x] Créer schémas validation Zod avec règles OAC Art. 65-68
- [x] Créer traductions i18n wizard FR/DE/IT/EN
- [x] Créer Step 1 - Informations véhicule avec upload photos
- [x] Créer Step 2 - Équipements & Conformité OAC
- [x] Créer Step 3 - Assurances & Expertises (ajout upload police RC complète)
- [x] Créer Step 4 - Récapitulatif
- [x] Créer wizard principal avec Dialog fullscreen et stepper
- [x] Intégrer wizard dans page Vehicles
- [x] Tester intégration complète

## Important Notes
- Dialog fullscreen avec stepper 4 steps (Car/Shield/FileText/CheckCircle)
- Progress bar 0-100% avec navigation Buttons validation
- Step 2 blocking si équipements OAC manquants
- Step 3 calcul dates expiration automatique
- Step 4 récapitulatif readonly avec edit buttons
- Validation inline errors + backend errors Dialog
- i18n complet FR/DE/IT/EN avec articles OAC
- Clean Code 200-250 lignes par fichier

  
## Plan Information
*This plan is created when the project is at iteration 48, and date 2025-10-14T19:46:54.673Z*
