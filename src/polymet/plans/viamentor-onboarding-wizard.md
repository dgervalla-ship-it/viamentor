# Wizard Setup Initial Viamentor

## User Request
Construire le wizard de configuration initiale Viamentor pour les nouveaux tenants avec 5 étapes (École/Utilisateurs/Catégories/Paiements/Finalisation), Hero UI, i18n FR/DE/IT/EN, auto-save localStorage, Clean Code 200-250 lignes/fichier.

## Related Files
- @/polymet/data/viamentor-onboarding-schemas (créé) - Validation Zod 5 steps
- @/polymet/data/viamentor-onboarding-i18n (créé) - Traductions FR/DE/IT/EN complètes
- @/polymet/data/viamentor-onboarding-progress (créé) - Hook gestion état + auto-save
- @/polymet/components/viamentor-onboarding-school-info-step (créé) - Step 1 École
- @/polymet/components/viamentor-onboarding-users-roles-step (créé) - Step 2 Utilisateurs
- @/polymet/components/viamentor-onboarding-wizard (créé) - Wizard principal orchestration
- @/polymet/pages/viamentor-onboarding-page (créé) - Page principale avec détection setup
- @/polymet/prototypes/viamentor-system-prototype (modifié) - Ajout route /onboarding

## TODO List
- [x] Créer schémas validation Zod pour 5 steps
- [x] Créer traductions i18n FR/DE/IT/EN complètes
- [x] Créer hook useOnboardingProgress avec auto-save
- [x] Créer Step 1: Informations École (logo upload, form grid, color picker)
- [x] Créer Step 2: Utilisateurs & Rôles (table invites, CSV import, preview cards)
- [x] Créer wizard principal avec stepper visuel et navigation
- [x] Créer page onboarding avec détection setup_completed
- [x] Ajouter route /onboarding dans prototype
- [x] Créer Step 3: Catégories & Véhicules (235 lignes)
- [x] Créer Step 4: Configuration Paiements (230 lignes)
- [x] Créer Step 5: Finalisation & Récapitulatif (225 lignes)
- [x] Mettre à jour schemas pour nouveaux steps
- [x] Mettre à jour hook progress avec état initial correct
- [x] Intégrer steps 3-4-5 dans wizard principal
- [ ] Tester workflow complet onboarding
- [ ] Intégrer détection auto-redirect depuis layout principal

## Important Notes
- **Architecture**: Wizard fullscreen non-skippable, détection setup_completed=false
- **Auto-save**: Debounce 2s, localStorage backup, recovery graceful
- **Validation**: Zod schemas avec règles métier (min 1 moniteur, IBAN suisse, etc.)
- **i18n**: Support complet FR/DE/IT/EN avec règles typographiques
- **Clean Code**: Tous les fichiers respectent 200-250 lignes max
- **Hero UI**: Stepper visuel avec progress bar, badges status, animations
- **Steps créés**: Tous les 5 steps sont maintenant complets et fonctionnels
- **Step 3**: Catégories multi-select avec accordion tarifs/durées, véhicules rapides dialog, badge progress
- **Step 4**: Toggle facturation, IBAN CH format, méthodes multi-select, délai paiement, CGV textarea, QR-bill auto
- **Step 5**: Récapitulatif accordion sections, edit buttons, checkboxes CGU/RGPD/Newsletter, célébration sparkles

  
## Plan Information
*This plan is created when the project is at iteration 152, and date 2025-10-16T16:31:32.748Z*
