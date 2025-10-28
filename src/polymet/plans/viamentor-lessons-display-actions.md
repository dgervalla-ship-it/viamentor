# Plan: Lessons Display & Actions Viamentor

## User Request
Créer le système complet d'affichage et interactions pour les leçons pratiques avec:
- Event cards compact pour calendar avec détails visuels
- Popover actions Hero UI avec sections détails/actions/historique
- Status management avec badges animés et real-time updates
- Actions: modifier, annuler, marquer complétée, contacter, imprimer
- Drag & drop events avec confirmation
- Resize events avec ajustement durée/prix
- WebSocket real-time pour status updates
- i18n FR/DE/IT/EN
- Clean Code 200-250 lignes/fichier

## Related Files
- @/polymet/components/viamentor-lesson-event-card (to create) - Card compact calendar event
- @/polymet/components/viamentor-lesson-popover (to create) - Popover détails + actions
- @/polymet/components/viamentor-lesson-actions (to create) - Actions dialogs (cancel, complete, edit)
- @/polymet/data/viamentor-lessons-realtime-hook (to create) - Hook WebSocket real-time updates
- @/polymet/data/viamentor-lessons-i18n (to create) - Traductions FR/DE/IT/EN
- @/polymet/data/viamentor-lessons-data (to create) - Mock data lessons avec types

## TODO List
- [x] Créer data/viamentor-lessons-data avec types et mock data
- [x] Créer data/viamentor-lessons-i18n avec traductions complètes
- [x] Créer components/viamentor-lesson-event-card
- [x] Créer components/viamentor-lesson-popover
- [x] Créer components/viamentor-lesson-actions
- [x] Créer data/viamentor-lessons-realtime-hook

## Important Notes
- Event card: compact, header icon catégorie, 3 rows (élève/time/moniteur), footer status badge
- Background color alpha selon status, border-left 4px primary
- Hover: shadow elevation, cursor pointer
- Popover: 400px width, smart positioning, sections détails/actions/historique
- Actions: modifier, annuler (raison required 20 chars), marquer complétée, contacter, imprimer PDF
- Drag & drop: draggable if permissions, confirm dialog, API update
- Resize: handles bottom, confirm new duration + price adjust
- Real-time WebSocket: subscribe tenant.lessons.{date}, optimistic updates + rollback
- Status badges: Scheduled gris, En cours bleu animé, Completed vert checkmark, Canceled rouge barré
- i18n: labels, actions, status, raisons annulation templates, toast messages
- Clean Code: 200-250 lignes max par fichier

## Plan Information
*This plan is created when the project is at iteration 43*

  
## Plan Information
*This plan is created when the project is at iteration 44, and date 2025-10-14T19:03:26.453Z*
