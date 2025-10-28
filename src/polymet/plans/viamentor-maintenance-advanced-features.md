# Améliorations Avancées Module Maintenance

## User Request
Implémenter 4 fonctionnalités avancées pour le module de maintenance Viamentor:
1. **Synchronisation statuts véhicules** : Mettre à jour `Vehicle.status = "maintenance"` automatiquement quand une tâche est en cours
2. **Notifications automatiques** : Emails/SMS avant les échéances de maintenance
3. **Intégration garages** : API pour réservation automatique chez les prestataires
4. **Analytics avancées** : Coût total de possession (TCO), prédictions ML

## Related Files
- @/polymet/data/viamentor-maintenance-data (to update) - Ajouter types, hooks et services
- @/polymet/data/viamentor-vehicles-data (to update) - Ajouter synchronisation statuts
- @/polymet/data/viamentor-maintenance-i18n (to update) - Ajouter traductions nouvelles features
- @/polymet/components/viamentor-maintenance-task-dialog (to update) - Intégrer synchronisation statuts
- @/polymet/pages/viamentor-maintenance-page (to update) - Intégrer nouvelles fonctionnalités
- @/polymet/data/viamentor-maintenance-notifications (to create) - Service notifications automatiques
- @/polymet/data/viamentor-garages-api-integration (to create) - Service intégration garages
- @/polymet/data/viamentor-maintenance-tco-analytics (to create) - Analytics TCO et ML
- @/polymet/components/viamentor-maintenance-notifications-config (to create) - Configuration notifications
- @/polymet/components/viamentor-garages-integration-panel (to create) - Panel intégration garages
- @/polymet/components/viamentor-tco-analytics-dashboard (to create) - Dashboard TCO et prédictions

## TODO List
- [x] Créer plan détaillé
- [x] **Phase 1: Synchronisation Statuts Véhicules**
  - [x] Mettre à jour viamentor-maintenance-data avec hooks synchronisation
  - [ ] Mettre à jour viamentor-vehicles-data avec gestion statuts maintenance
  - [ ] Intégrer synchronisation dans maintenance-task-dialog
  - [ ] Ajouter indicateurs visuels statut maintenance dans vehicle-detail-page
- [x] **Phase 2: Notifications Automatiques**
  - [x] Créer viamentor-maintenance-notifications avec service emails/SMS
  - [x] Créer maintenance-notifications-config component
  - [ ] Ajouter configuration notifications dans maintenance-page
  - [x] Implémenter templates emails/SMS multilingues
- [x] **Phase 3: Intégration Garages API**
  - [x] Créer viamentor-garages-api-integration avec mock API
  - [x] Créer garages-integration-panel component
  - [x] Ajouter sélection garage avec disponibilités temps réel
  - [x] Implémenter réservation automatique et confirmation
- [x] **Phase 4: Analytics Avancées TCO & ML**
  - [x] Créer viamentor-maintenance-tco-analytics avec calculs TCO
  - [x] Créer tco-analytics-dashboard component
  - [x] Implémenter prédictions ML (coûts futurs, pannes probables)
  - [x] Ajouter comparaisons TCO entre véhicules
- [x] **Phase 5: Intégration & Tests**
  - [x] Intégrer tous les composants dans maintenance-page
  - [x] Ajouter tabs pour Notifications, Garages, TCO Analytics
  - [x] Remplacer placeholders Calendar/History/Costs par composants réels
  - [ ] Mettre à jour i18n avec toutes les traductions
  - [ ] Tester workflows complets
  - [ ] Documenter nouvelles fonctionnalités

## Important Notes
- **Synchronisation statuts**: Automatique lors création/complétion/annulation tâche maintenance
- **Notifications**: Configurable par type maintenance (préventif/correctif), délais (7j/3j/1j avant)
- **Garages API**: Mock API avec 5 garages partenaires, disponibilités temps réel simulées
- **TCO Analytics**: Coût acquisition + maintenance + carburant + assurance + dépréciation
- **ML Prédictions**: Basé sur historique maintenance, kilométrage, âge véhicule
- **Conformité**: Respect RGPD pour données garages, notifications opt-in/opt-out

  
## Plan Information
*This plan is created when the project is at iteration 318, and date 2025-10-23T12:11:52.794Z*
