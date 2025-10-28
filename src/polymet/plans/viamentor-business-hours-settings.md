# Business Hours & Availability Settings Module

## User Request
Créer le module complet de paramètres horaires et disponibilités Viamentor avec:
- Horaires d'ouverture standard (7 jours semaine, matin/après-midi)
- Configuration créneaux leçons (durée, slots, délais)
- Jours fériés suisses (API import, fédéraux/cantonaux)
- Congés & fermetures exceptionnelles (périodes, notifications)
- Exceptions ponctuelles (horaires modifiés dates spécifiques)
- Configuration cours théoriques (durée, participants)
- Hero UI, i18n FR/DE/IT/EN, Clean Code 200-250 lignes/fichier

## Related Files
- @/polymet/data/viamentor-business-hours-data (to create) - Mock data et types
- @/polymet/data/viamentor-business-hours-i18n (to create) - Traductions i18n
- @/polymet/data/viamentor-holidays-api-service (to create) - Service API jours fériés suisses
- @/polymet/components/viamentor-opening-hours-section (to create) - Section horaires ouverture
- @/polymet/components/viamentor-lesson-slots-section (to create) - Section créneaux leçons
- @/polymet/components/viamentor-holidays-section (to create) - Section jours fériés
- @/polymet/components/viamentor-closures-section (to create) - Section congés/fermetures
- @/polymet/components/viamentor-exceptions-section (to create) - Section exceptions ponctuelles
- @/polymet/components/viamentor-theory-courses-config-section (to create) - Section config cours théoriques
- @/polymet/pages/viamentor-business-hours-settings-page (to create) - Page principale settings
- @/polymet/prototypes/viamentor-system-prototype (to update) - Ajouter route

## TODO List
- [x] Créer data/viamentor-business-hours-data avec types complets
- [x] Créer data/viamentor-business-hours-i18n avec traductions FR/DE/IT/EN
- [x] Créer data/viamentor-holidays-api-service avec API simulation
- [x] Créer components/viamentor-opening-hours-section (table éditable 7 jours)
- [x] Créer components/viamentor-lesson-slots-section (config créneaux)
- [x] Créer components/viamentor-holidays-section (import API + table)
- [x] Créer components/viamentor-closures-section (périodes fermeture)
- [x] Créer components/viamentor-exceptions-section (exceptions ponctuelles)
- [x] Créer components/viamentor-theory-courses-config-section (config cours)
- [x] Créer pages/viamentor-business-hours-settings-page (page principale)
- [x] Ajouter route /settings/business-hours au prototype
- [x] Mettre à jour le plan avec statut COMPLETED

## Important Notes
- **Horaires ouverture**: Table éditable 7 jours, toggle ouvert/fermé, TimePickers matin/après-midi, duplicate/copy all
- **Créneaux leçons**: Durée standard (45/60/90min), granularité slots (15/30/60min), délais réservation/annulation
- **Jours fériés**: API import automatique fédéraux/cantonaux, table éditable, répétition annuelle
- **Congés**: DataTable périodes, impact leçons, notifications élèves, calendar widget preview
- **Exceptions**: Dates spécifiques override horaires standard, fermé ou modifié
- **Cours théoriques**: Durée session 8h, pause déjeuner, jours préférés, min/max participants
- **i18n**: Jours semaine localisés, formats horaires (FR: 14h30, DE: 14:30 Uhr), noms fériés multilingues
- **Validation**: Check conflicts overlaps, preview impact calendar 30j, cascade updates
- **Clean Code**: 200-250 lignes/fichier, separation of concerns, Hero UI cohérent
  
## Plan Information
*This plan is created when the project is at iteration 67, and date 2025-10-14T22:22:22.549Z*
