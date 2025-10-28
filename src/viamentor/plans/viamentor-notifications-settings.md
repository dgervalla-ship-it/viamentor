# Notifications & Communications Settings

## User Request
Créer le module complet de paramètres notifications et communications pour Viamentor avec:
- Canaux communication (Email SMTP, SMS, Push, WhatsApp)
- Événements déclencheurs automatiques
- Templates emails avec éditeur WYSIWYG
- Templates SMS avec contrainte 160 caractères
- Préférences envoi (throttling, retry, tracking)
- Listes distribution pour newsletters
- Hero UI, i18n FR/DE/IT/EN, Clean Code 200-250 lignes/fichier

## Related Files
- @/viamentor/data/viamentor-notifications-data (to create) - Types et mock data
- @/viamentor/data/viamentor-notifications-i18n (to create) - Traductions
- @/viamentor/data/viamentor-notifications-schemas (to create) - Validation Zod
- @/viamentor/data/viamentor-template-variables (to create) - Variables système
- @/viamentor/components/viamentor-email-sms-channels (to create) - Config canaux
- @/viamentor/components/viamentor-event-triggers-table (to create) - Triggers auto
- @/viamentor/components/viamentor-email-template-editor (to create) - Éditeur emails
- @/viamentor/components/viamentor-sms-template-editor (to create) - Éditeur SMS
- @/viamentor/components/viamentor-sending-preferences (to create) - Préférences
- @/viamentor/components/viamentor-distribution-lists (to create) - Listes diffusion
- @/viamentor/pages/viamentor-notifications-settings-page (to create) - Page principale
- @/viamentor/prototypes/viamentor-system-prototype (to update) - Ajouter route

## TODO List
- [x] Créer fichier data avec types et mock data
- [x] Créer fichier i18n avec traductions
- [x] Créer fichier template variables système
- [x] Créer page principale Notifications Settings (intègre tous les composants)
- [x] Ajouter route au prototype

## Important Notes
- **Canaux**: Email SMTP (Resend default), SMS (Twint/Vonage/Twilio/MessageBird), Push (Firebase), WhatsApp (Business API)
- **Triggers**: Événements système automatiques avec délais, destinataires, canaux multiples
- **Templates**: Éditeur WYSIWYG TipTap pour emails, plain text 160 chars pour SMS
- **Variables**: {studentName}, {schoolName}, {date}, {amount}, etc. avec autocomplete
- **Préférences**: Mode test, throttling, retry, tracking GDPR, timezone
- **Listes**: Automatiques (filtres dynamiques) ou manuelles (import CSV)
- **i18n**: Templates créés per langue FR/DE/IT/EN
- **Limite**: 200-250 lignes par fichier, découpage composants
  
## Plan Information
*This plan is created when the project is at iteration 70, and date 2025-10-14T22:47:52.477Z*
