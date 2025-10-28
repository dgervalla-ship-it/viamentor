# Standardisation Terminologie Planning/Lessons

## User Request
Corriger l'incohérence de terminologie pour les cours/leçons à travers tous les rôles du système. Actuellement dispersé entre "planning", "lessons", créant confusion utilisateur.

## Related Files
- @/polymet/prototypes/viamentor-system-prototype (to update) - Routes à standardiser
- @/polymet/data/viamentor-navigation-config (to update) - Navigation à harmoniser
- @/polymet/data/viamentor-navigation-i18n (to update) - Traductions à aligner
- @/polymet/pages/viamentor-planning-page (to view) - Page planning admin
- @/polymet/pages/viamentor-instructor-planning-page (to view) - Page planning moniteur
- @/polymet/pages/viamentor-staff-planning-page (to view) - Page planning secrétariat
- @/polymet/pages/viamentor-student-lessons-page (to view) - Page leçons élève

## TODO List
- [x] Analyser les routes actuelles et définir la nouvelle structure cohérente
- [x] Définir la terminologie standard (Planning vs Lessons)

**Décision finale** :
- `planning` = Vue calendrier (tous rôles)
- `lessons` = Vue liste détaillée (tous rôles)
- Même structure `/role/planning` et `/role/lessons` pour cohérence
- [x] Mettre à jour les routes dans le prototype
- [x] Mettre à jour la configuration de navigation
- [x] Mettre à jour les traductions i18n pour cohérence
- [x] Ajouter des redirections pour compatibilité
- [x] Vérifier tous les liens internes dans les composants

**Note** : Les liens internes utilisent déjà les routes correctes. Les redirections ajoutées assurent la compatibilité.

## Important Notes

### Terminologie Proposée
**Planning** = Vue calendrier (tous rôles)
- `/planning` → Admin/School
- `/instructor/planning` → Moniteur  
- `/secretary/planning` → Secrétariat (déjà `/staff/planning`)
- `/student/planning` → Élève (nouveau, remplace `/student/lessons`)

**Lessons** = Vue liste détaillée
- `/lessons` → Admin (liste toutes leçons)
- `/instructor/lessons` → Moniteur (ses leçons)
- `/student/lessons` → Élève (ses leçons) - garder aussi pour liste

### Structure Cible
```
/planning → Planning école (admin)
/lessons → Liste leçons (admin)

/instructor/planning → Planning moniteur
/instructor/lessons → Liste leçons moniteur

/secretary/planning → Planning secrétariat
/secretary/lessons → Liste leçons secrétariat

/student/planning → Planning élève (nouveau)
/student/lessons → Liste leçons élève (existant)
```

### Principe de Cohérence
- **Planning** = Vue calendrier visuelle
- **Lessons** = Vue liste avec filtres/détails
- Même structure de route pour tous les rôles
- Traductions alignées (FR: Planning/Leçons, DE: Planung/Lektionen, etc.)

  
## Plan Information
*This plan is created when the project is at iteration 197, and date 2025-10-18T09:19:17.379Z*
