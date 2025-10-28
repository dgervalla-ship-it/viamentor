# Réorganisation Navigation Sidebar ViaMenutor

## User Request
Résoudre le conflit entre sidebar et menu mobile/tablette en intégrant tous les liens de manière cohérente, logique et responsive.

## Related Files
- @/polymet/data/viamentor-sidebar-navigation-data (to update) - Configuration navigation actuelle à réorganiser
- @/polymet/components/viamentor-sidebar (viewed) - Composant sidebar principal
- @/polymet/components/viamentor-header (updated) - Header avec bouton hamburger intégré
- @/polymet/layouts/viamentor-main-layout (updated) - Layout avec gestion mobile menu

## TODO List
- [x] Intégrer le bouton hamburger dans le header
- [x] Mettre à jour le layout pour gérer le mobile menu
- [x] Analyser tous les liens existants dans le prototype
- [x] Créer une nouvelle structure de navigation hiérarchique
- [x] Organiser les liens par catégories logiques (Dashboard, Gestion, Finances, Analytics, Paramètres)
- [x] Créer viamentor-sidebar-navigation-optimized avec la nouvelle structure
- [x] Mettre à jour le composant Sidebar pour utiliser la navigation optimisée
- [x] Tester la navigation sur mobile/tablette/desktop
- [x] Vérifier que tous les liens du prototype sont accessibles

## Important Notes

### Structure de navigation proposée

**Pour School Admin (rôle principal):**

1. **Dashboard** (lien direct)
2. **Gestion** (section collapsible)
   - Élèves (avec sous-menu: Liste, Nouveau, Importer, Archive)
   - Moniteurs (avec sous-menu: Liste, Analytics, Planning)
   - Véhicules (avec sous-menu: Liste, Analytics, Maintenance)
   - Planning (lien direct vers planning général)
3. **Finances** (section collapsible)
   - Facturation (Dashboard)
   - Factures (Liste complète)
   - Paiements
   - Analytics financières
4. **Analytics** (section collapsible)
   - Moniteurs (Performance)
   - Véhicules (Utilisation)
   - Finances (Revenus)
   - Examens (Résultats)
5. **Conformité** (lien direct vers GDPR)
6. **Paramètres** (section collapsible)
   - École
   - Utilisateurs
   - Tarifs
   - Notifications
   - Horaires
7. **Support** (lien direct)

### Routes existantes à intégrer
- /dashboard (Dashboard école)
- /students (Liste élèves)
- /students/:id (Détail élève)
- /instructors (Liste moniteurs)
- /instructors/:id (Détail moniteur)
- /instructors/analytics (Analytics moniteurs)
- /vehicles (Liste véhicules)
- /vehicles/analytics (Analytics véhicules)
- /planning (Planning général)
- /billing (Dashboard facturation)
- /invoices (Liste factures)
- /payments (Paiements)
- /financial/analytics (Analytics financières)
- /exams/analytics (Analytics examens)
- /compliance/gdpr (Conformité GDPR)
- /settings/pricing (Paramètres tarifs)
- /settings/notifications (Paramètres notifications)

### Principes UX
- Maximum 2 niveaux de profondeur
- Grouper les fonctionnalités similaires
- Ordre logique: Gestion quotidienne → Finances → Analytics → Configuration
- Badges pour les notifications importantes
- Icons cohérents et reconnaissables

  
## Plan Information
*This plan is created when the project is at iteration 77, and date 2025-10-15T00:56:04.854Z*
