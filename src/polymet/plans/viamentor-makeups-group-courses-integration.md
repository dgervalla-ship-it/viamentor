# Intégration Cours Collectifs Rattrapages

## User Request
Connecter la page Rattrapages Moniteur avec les cours théoriques pour permettre aux moniteurs de proposer des rattrapages en cours collectifs (1 vs plusieurs élèves) au lieu de leçons individuelles uniquement.

## Related Files
- @/polymet/pages/viamentor-instructor-makeups-page (to update) - Page principale à modifier
- @/polymet/components/viamentor-instructor-makeups-table (to update) - Ajouter colonne/action cours collectifs
- @/polymet/data/viamentor-instructor-makeups-data (to update) - Ajouter types cours collectifs
- @/polymet/data/viamentor-instructor-makeups-i18n (to update) - Ajouter traductions
- @/polymet/data/viamentor-theory-courses-data (to view) - Comprendre structure cours
- @/polymet/components/viamentor-propose-group-makeup-dialog (to create) - Nouveau dialog proposition cours collectif

## TODO List
- [x] Analyser structure actuelle rattrapages et cours théoriques
- [x] Créer nouveau dialog "Proposer Cours Collectif" avec:
  - Sélection multiple élèves avec rattrapages disponibles
  - Sélection date/heure
  - Sélection salle
  - Thème du cours
  - Durée
  - Prix (optionnel)
- [x] Ajouter bouton "Cours Collectif" dans page principale
- [x] Mettre à jour types de données pour supporter cours collectifs
- [x] Ajouter traductions FR/DE/IT/EN (intégrées dans le dialog)
- [x] Ajouter section "Cours Collectifs Planifiés" dans la page
- [x] Créer composant liste cours collectifs avec participants
- [x] Connecter avec les données de cours théoriques existantes
- [x] Ajouter gestion des acceptations/refus élèves

## Important Notes
- **Concept**: Permettre au moniteur de regrouper plusieurs élèves ayant des rattrapages disponibles dans un cours théorique collectif
- **Avantages**: Optimisation temps moniteur, économies pour élèves, meilleure utilisation des salles
- **Workflow**: 
  1. Moniteur voit liste élèves avec rattrapages disponibles
  2. Sélectionne plusieurs élèves (checkbox)
  3. Clique "Proposer Cours Collectif"
  4. Remplit formulaire (date, heure, salle, thème)
  5. Système envoie notifications aux élèves
  6. Élèves acceptent/refusent
  7. Si accepté, rattrapage marqué comme "booked" pour cours collectif
- **Contraintes**: 
  - Minimum 2 élèves, maximum capacité salle
  - Tous élèves doivent avoir rattrapage disponible
  - Même catégorie de permis recommandée
  - Date avant expiration rattrapages

  
## Plan Information
*This plan is created when the project is at iteration 360, and date 2025-10-27T23:24:35.770Z*
