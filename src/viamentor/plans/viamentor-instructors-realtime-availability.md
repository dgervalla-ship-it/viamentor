# Module Instructors Real-Time Availability & Bulk Actions

## User Request
Développer disponibilité temps réel et actions groupées moniteurs Viamentor: WebSocket status, availability calendar, bulk operations, Hero UI, i18n, Clean Code 200-250 lignes/fichier.

## Related Files
- @/viamentor/data/viamentor-instructors-data (to view) - Mock data instructors
- @/viamentor/data/viamentor-instructors-i18n (to view) - Traductions existantes
- @/viamentor/components/viamentor-instructors-table (to update) - Intégrer real-time status
- @/viamentor/pages/viamentor-instructors-page (to update) - Intégrer nouveaux composants
- @/viamentor/data/viamentor-instructors-realtime-hook (to create) - Hook WebSocket custom
- @/viamentor/components/viamentor-instructors-availability-calendar (to create) - Widget calendar
- @/viamentor/components/viamentor-instructors-bulk-actions (to create) - Bulk actions bar
- @/viamentor/components/viamentor-instructors-performance-dashboard (to create) - Stats performance
- @/viamentor/data/viamentor-instructors-availability-data (to create) - Mock data availability

## TODO List
- [x] Créer mock data availability (slots, bookings, performance stats)
- [x] Créer hook useRealTimeAvailability avec WebSocket simulation
- [x] Créer composant AvailabilityCalendar (week view, time slots, filters)
- [x] Créer composant BulkActionsBar (send message, export, change status, suspend)
- [x] Créer composant PerformanceDashboard (top instructors, charts, stats)
- [ ] Mettre à jour InstructorsTable avec real-time status badges
- [ ] Mettre à jour InstructorsPage avec nouveaux composants
- [ ] Étendre i18n avec nouvelles traductions

## Important Notes
- WebSocket simulation avec setInterval pour demo
- Calendar widget 7 jours x time slots 30min (8h-20h)
- Bulk actions: email dialog, export Excel/CSV, status change, suspend
- Performance: top instructor, best rating, BarChart compare
- Empty state avec illustration
- Fichiers 200-250 lignes max strict
- Hero UI design moderne
- i18n FR/DE/IT/EN complet
  
## Plan Information
*This plan is created when the project is at iteration 24, and date 2025-10-14T10:58:50.051Z*
