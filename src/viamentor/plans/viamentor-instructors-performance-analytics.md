# Module Instructors Performance Analytics

## User Request
Créer un système complet d'analytics de performance des moniteurs Viamentor avec:
- Performance ranking avec classement et métriques
- Analyse détaillée individuelle par moniteur
- Workload analysis avec heatmaps et alertes surcharge
- Expertise par catégories avec RadarChart
- Satisfaction élèves avec top/bottom rated
- Optimisation disponibilités
- Évolution temporelle
- Hero UI, i18n FR/DE/IT/EN, Clean Code 200-250 lignes/fichier

## Related Files
- @/viamentor/data/viamentor-instructors-performance-data (to create) - Mock data analytics
- @/viamentor/data/viamentor-instructors-performance-i18n (to create) - Traductions
- @/viamentor/data/viamentor-instructors-performance-hooks (to create) - Hooks stats
- @/viamentor/components/viamentor-instructors-analytics-header (to create) - Header stats cards
- @/viamentor/components/viamentor-performance-ranking-table (to create) - Ranking table
- @/viamentor/components/viamentor-instructor-detail-analytics (to create) - Détail moniteur
- @/viamentor/components/viamentor-workload-analysis-section (to create) - Charge travail
- @/viamentor/components/viamentor-categories-expertise-section (to create) - Expertise catégories
- @/viamentor/components/viamentor-satisfaction-by-instructor (to create) - Satisfaction élèves
- @/viamentor/components/viamentor-availability-optimization (to create) - Optimisation disponibilités
- @/viamentor/components/viamentor-performance-evolution (to create) - Évolution temporelle
- @/viamentor/pages/viamentor-instructors-analytics-page (to create) - Page principale

## TODO List
- [x] Créer mock data analytics avec types complets
- [x] Créer traductions i18n FR/DE/IT/EN
- [ ] Créer hooks useInstructorStats
- [x] Créer header stats cards KPIs
- [x] Créer performance ranking table
- [x] Créer instructor detail analytics
- [x] Créer workload analysis section
- [x] Créer categories expertise section
- [x] Créer satisfaction by instructor
- [ ] Créer availability optimization (optionnel - non demandé)
- [ ] Créer performance evolution (optionnel - non demandé)
- [x] Créer page principale analytics
- [x] Ajouter route au prototype

## Important Notes
- Respect Clean Code: 200-250 lignes max par fichier
- Hero UI avec Recharts pour tous les charts
- DataTable triable avec filtres avancés
- Heatmaps pour workload et availability
- RadarChart pour expertise catégories
- BoxPlot pour satisfaction distribution
- i18n complet FR/DE/IT/EN
- Export Excel ranking et reports
- Alertes visuelles surcharge >45h orange, >50h rouge
- Highlight current user si instructor role
- Responsive design mobile/tablet/desktop

  
## Plan Information
*This plan is created when the project is at iteration 62, and date 2025-10-14T21:34:40.385Z*
