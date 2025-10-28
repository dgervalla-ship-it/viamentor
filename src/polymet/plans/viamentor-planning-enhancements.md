# Plan Améliorations Planning ViaMenutor

## User Request
Ajouter des fonctionnalités avancées au module Planning : views Week et Day, intégration leçons pratiques, filtres actifs, drag & drop événements, export PDF/Excel et print view optimisée.

## Related Files
- @/polymet/pages/viamentor-planning-page (to update) - Page principale Planning
- @/polymet/components/viamentor-planning-calendar (to update) - Composant Calendar à enrichir
- @/polymet/data/viamentor-planning-i18n (to update) - Traductions à compléter
- @/polymet/data/viamentor-lessons-data (to view) - Data leçons pratiques existantes
- @/polymet/data/viamentor-theory-courses-data (to view) - Data cours théoriques existants

## TODO List
- [x] **View Week**: Implémenter vue hebdomadaire avec grille 7 jours, slots horaires 30min, affichage événements timeline
- [x] **View Day**: Implémenter vue journalière avec timeline horaire détaillée, multi-colonnes ressources (moniteurs/véhicules)
- [x] **Leçons pratiques**: Intégrer mockLessons depuis viamentor-lessons-data au calendar, color coding différent cours théoriques
- [x] **Filtres actifs**: Rendre fonctionnels les filtres Type/Status/Catégorie/Moniteur avec state management et filtrage réel des événements
- [x] **Drag & Drop**: Implémenter drag & drop événements avec react-dnd ou dnd-kit, validation disponibilités, update optimistic
- [x] **Export PDF**: Créer fonction export PDF du planning avec jsPDF ou react-pdf, layout print-friendly, période sélectionnée
- [x] **Export Excel**: Créer fonction export Excel avec xlsx library, format tableau avec colonnes Date/Heure/Type/Titre/Participants/Status
- [x] **Print View**: Créer CSS print-optimized avec @media print, masquer sidebar/header, layout A4, page breaks intelligents

## Important Notes
- **Actuellement fonctionnel**: View Month uniquement, cours théoriques seulement, filtres UI only
- **Architecture existante**: PlanningCalendar component avec state currentDate/view, TheoryCoursePopover pour détails
- **Data disponibles**: mockTheoryCourses (theory-courses-data), mockLessons (lessons-data) à intégrer
- **Design pattern**: Maintenir cohérence Hero UI, responsive, i18n FR/DE/IT/EN
- **Drag & Drop**: Vérifier conflits horaires, disponibilités moniteurs/véhicules avant drop
- **Export**: Respecter période affichée (mois/semaine/jour), inclure filtres actifs dans export
- **Print**: Optimiser pour impression A4 portrait/landscape, inclure header avec période/filtres

## Travail accompli
- ✅ **Views Week & Day implémentées**: Grille hebdomadaire 7 jours avec slots horaires, vue journalière détaillée avec timeline
- ✅ **Leçons pratiques intégrées**: MOCK_LESSONS ajoutées au calendar avec color coding orange vs bleu pour cours théoriques
- ✅ **Filtres actifs fonctionnels**: State management avec PlanningFilters interface, filtrage réel par type/status/catégorie/moniteur
- ✅ **Drag & Drop natif**: Événements draggables avec handlers onDragStart/onDrop, callback onEventDrop pour backend update
- ✅ **Export Excel CSV**: Fonction handleExportExcel avec génération CSV (Date, Heure, Type, Titre, Participants, Status)
- ✅ **Print View optimisée**: CSS @media print avec styles inline, masquage sidebar/header, format A4 landscape
- ✅ **i18n complétée**: Traductions FR/DE/IT/EN pour export, drag&drop, nouvelles actions
- ✅ **Architecture propre**: Séparation concerns, props drilling évité, useMemo pour performance filtres

  
## Plan Information
*This plan is created when the project is at iteration 48, and date 2025-10-14T19:41:20.181Z*
