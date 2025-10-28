/**
 * ============================================================================
 * VIAMENTOR - MODULE GESTION LEÇONS
 * Guide complet d'architecture et d'utilisation
 * ============================================================================
 */

/**
 * TABLE DES MATIÈRES
 * ==================
 *
 * 1. ARCHITECTURE GLOBALE
 * 2. PAGES PRINCIPALES
 * 3. COMPOSANTS RÉUTILISABLES
 * 4. DATA & TYPES
 * 5. WORKFLOWS AUTOMATISÉS
 * 6. NAVIGATION & ROUTING
 * 7. INTÉGRATIONS
 * 8. BONNES PRATIQUES
 */

/**
 * ============================================================================
 * 1. ARCHITECTURE GLOBALE
 * ============================================================================
 */

/**
 * Structure du module Lessons
 *
 * /lessons
 * ├── /lessons                    → Liste toutes leçons (filtres, stats, table/grid)
 * ├── /lessons/:id                → Détail leçon (édition inline, historique)
 * ├── /lessons/calendar           → Calendrier interactif (drag & drop)
 * ├── /lessons/book               → Wizard réservation (4 steps)
 * └── /lessons/conflicts          → Gestion conflits planning
 *
 * Composants partagés:
 * ├── viamentor-lesson-popover    → Popover détails leçon
 * ├── viamentor-lesson-event-card → Card événement calendrier
 * ├── viamentor-lesson-actions    → Actions contextuelles
 * └── viamentor-planning-calendar → Calendrier réutilisable
 *
 * Data & Types:
 * ├── viamentor-lessons-data      → Mock data, types, helpers
 * ├── viamentor-lessons-i18n      → Traductions FR/DE/IT/EN
 * └── viamentor-student-lifecycle-workflows → Workflows automatisés
 */

/**
 * ============================================================================
 * 2. PAGES PRINCIPALES
 * ============================================================================
 */

/**
 * 2.1 LISTE LEÇONS (/lessons)
 * ============================
 *
 * Fonctionnalités:
 * - Stats cards (planifiées, en cours, terminées, annulées)
 * - Filtres avancés (statut, élève, moniteur, catégorie, date)
 * - Vue table/grid toggle
 * - Recherche full-text
 * - Bulk actions (export, annulation groupée)
 * - Pagination
 *
 * Composants utilisés:
 * - StatsCards: KPIs visuels
 * - LessonCard: Vue grid
 * - LessonRow: Vue table
 * - Filtres: Tabs + Select + Input
 *
 * Navigation:
 * - Clic sur leçon → /lessons/:id
 * - Bouton "Calendrier" → /lessons/calendar
 * - Bouton "Nouvelle leçon" → /lessons/book
 *
 * @example
 * ```tsx
 * <LessonsListPage locale="fr" />
 * ```
 */

/**
 * 2.2 DÉTAIL LEÇON (/lessons/:id)
 * ================================
 *
 * Fonctionnalités:
 * - Header avec statut, actions rapides
 * - Tabs: Informations / Historique
 * - Édition inline (moniteur, véhicule, horaire)
 * - Actions: Modifier, Annuler, Terminer, Imprimer
 * - Historique complet (création, modifications, annulations)
 * - Liens rapides vers élève, moniteur, véhicule
 *
 * Sections:
 * - Informations élève (avatar, nom, contact)
 * - Informations moniteur (avatar, nom, contact)
 * - Véhicule (modèle, plaque)
 * - Horaire (date, heure, durée, point RDV)
 * - Facturation (prix, statut paiement)
 * - Notes & commentaires
 *
 * @example
 * ```tsx
 * <LessonDetailPage locale="fr" />
 * // URL: /lessons/lesson-1
 * ```
 */

/**
 * 2.3 CALENDRIER INTERACTIF (/lessons/calendar)
 * ==============================================
 *
 * Fonctionnalités:
 * - Vues: Jour / Semaine / Mois
 * - Navigation temporelle (précédent, suivant, aujourd'hui)
 * - Filtres: Moniteur, Catégorie, Statut
 * - Drag & drop pour déplacer leçons
 * - Double-clic pour créer nouvelle leçon
 * - Clic sur leçon → détails
 * - Export PDF du planning
 * - Légende des statuts
 * - Stats période (résumé)
 *
 * Intégrations:
 * - Réutilise PlanningCalendar component
 * - Intègre leçons pratiques + cours théoriques
 * - Détection conflits temps réel
 *
 * @example
 * ```tsx
 * <LessonsCalendarPage locale="fr" />
 * ```
 */

/**
 * 2.4 WIZARD RÉSERVATION (/lessons/book)
 * =======================================
 *
 * Fonctionnalités:
 * - 4 étapes guidées:
 *   1. Sélection élève + catégorie
 *   2. Sélection moniteur + véhicule
 *   3. Date, heure, durée, point RDV, notes
 *   4. Récapitulatif + confirmation
 *
 * - Progress indicator visuel
 * - Validation à chaque étape
 * - Navigation précédent/suivant
 * - Vérification disponibilités temps réel
 * - Calcul prix automatique
 * - Notifications automatiques (élève + moniteur)
 *
 * Workflows déclenchés:
 * - Email confirmation élève
 * - Notification moniteur
 * - Ajout au calendrier
 * - Création facture si nécessaire
 * - Mise à jour compteurs
 *
 * @example
 * ```tsx
 * <LessonsBookPage locale="fr" />
 * ```
 */

/**
 * 2.5 GESTION CONFLITS (/lessons/conflicts)
 * ==========================================
 *
 * Fonctionnalités:
 * - Détection automatique conflits:
 *   • Moniteur assigné à 2+ leçons simultanées
 *   • Véhicule réservé 2+ fois même horaire
 *   • Élève avec plusieurs leçons même jour
 *   • Salle occupée (cours théoriques)
 *
 * - Classification par sévérité:
 *   • Critique (rouge): Blocage immédiat
 *   • Attention (orange): À résoudre rapidement
 *   • Info (bleu): Recommandation
 *
 * - Suggestions résolution automatiques:
 *   • Réassigner moniteur disponible
 *   • Proposer véhicule alternatif
 *   • Déplacer horaire
 *   • Annuler leçon
 *
 * - Filtres par type: Tous / Moniteurs / Véhicules / Élèves
 * - Stats: Conflits critiques, avertissements, total
 * - Actions: Résoudre, Ignorer
 *
 * @example
 * ```tsx
 * <LessonsConflictsPage locale="fr" />
 * ```
 */

/**
 * ============================================================================
 * 3. COMPOSANTS RÉUTILISABLES
 * ============================================================================
 */

/**
 * 3.1 LESSON POPOVER
 * ==================
 *
 * Popover détails leçon au survol/clic sur événement calendrier
 *
 * @example
 * ```tsx
 * <LessonPopover
 *   lesson={lesson}
 *   locale="fr"
 *   onEdit={(lesson) => console.log('Edit', lesson)}
 *   onCancel={(lesson) => console.log('Cancel', lesson)}
 *   onComplete={(lesson) => console.log('Complete', lesson)}
 * />
 * ```
 */

/**
 * 3.2 LESSON EVENT CARD
 * =====================
 *
 * Card événement pour affichage dans calendrier
 *
 * @example
 * ```tsx
 * <LessonEventCard
 *   lesson={lesson}
 *   locale="fr"
 *   onClick={(lesson) => navigate(`/lessons/${lesson.id}`)}
 * />
 * ```
 */

/**
 * 3.3 LESSON ACTIONS
 * ==================
 *
 * Menu actions contextuelles pour une leçon
 *
 * @example
 * ```tsx
 * <LessonActions
 *   lesson={lesson}
 *   locale="fr"
 *   onEdit={handleEdit}
 *   onCancel={handleCancel}
 *   onComplete={handleComplete}
 *   onPrint={handlePrint}
 * />
 * ```
 */

/**
 * 3.4 PLANNING CALENDAR
 * =====================
 *
 * Calendrier réutilisable avec drag & drop
 *
 * @example
 * ```tsx
 * <PlanningCalendar
 *   locale="fr"
 *   view="week"
 *   filters={{ instructorId: "instructor-1" }}
 *   onNewPracticalLesson={() => navigate('/lessons/book')}
 *   onEventClick={(event) => navigate(`/lessons/${event.id}`)}
 *   onEventDrop={(eventId, newDate, newTime) => handleMove(eventId, newDate, newTime)}
 * />
 * ```
 */

/**
 * ============================================================================
 * 4. DATA & TYPES
 * ============================================================================
 */

/**
 * 4.1 TYPES PRINCIPAUX
 * ====================
 */

/**
 * Status de leçon
 */
export type LessonStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "canceled";

/**
 * Type de leçon
 */
export type LessonType = "practical" | "theory" | "exam" | "evaluation";

/**
 * Leçon pratique
 */
export interface Lesson {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  category: string;
  type: LessonType;
  status: LessonStatus;
  startDate: string;
  endDate: string;
  duration: number; // minutes
  meetingPoint: {
    id: string;
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  notes?: string;
  price: number;
  isPaid: boolean;
  cancelReason?: string;
  completionNotes?: string;
  instructorRating?: number;
  history: LessonHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

/**
 * 4.2 HELPERS DISPONIBLES
 * ========================
 */

/**
 * Récupérer une leçon par ID
 */
export function getLessonById(id: string): Lesson | undefined;

/**
 * Récupérer leçons d'un élève
 */
export function getLessonsByStudent(studentId: string): Lesson[];

/**
 * Récupérer leçons d'un moniteur
 */
export function getLessonsByInstructor(instructorId: string): Lesson[];

/**
 * Récupérer leçons par période
 */
export function getLessonsByDateRange(
  startDate: string,
  endDate: string
): Lesson[];

/**
 * Récupérer leçons par statut
 */
export function getLessonsByStatus(status: LessonStatus): Lesson[];

/**
 * ============================================================================
 * 5. WORKFLOWS AUTOMATISÉS
 * ============================================================================
 */

/**
 * 5.1 APRÈS CRÉATION LEÇON
 * =========================
 *
 * Workflow automatique déclenché après création d'une leçon:
 *
 * 1. Email confirmation élève
 * 2. Notification moniteur
 * 3. Ajout calendrier Google/Outlook
 * 4. SMS rappel J-1 (optionnel)
 * 5. Création facture si nécessaire
 * 6. Mise à jour compteurs élève
 * 7. Vérification disponibilités
 * 8. Détection conflits potentiels
 *
 * @see viamentor-student-lifecycle-workflows
 */

/**
 * 5.2 APRÈS COMPLÉTION LEÇON
 * ===========================
 *
 * Workflow automatique après marquage leçon terminée:
 *
 * 1. Notification élève (rappel évaluation)
 * 2. Déblocage formulaire évaluation moniteur (24h)
 * 3. Mise à jour compteurs (heures conduites, leçons)
 * 4. Déduction crédits forfait si applicable
 * 5. Calcul progression élève
 * 6. Vérification préparation examen
 * 7. Notification si prêt pour examen
 *
 * @see viamentor-student-lifecycle-workflows
 */

/**
 * 5.3 APRÈS ANNULATION LEÇON
 * ===========================
 *
 * Workflow automatique après annulation:
 *
 * 1. Email notification élève + moniteur
 * 2. Libération créneau calendrier
 * 3. Remboursement si payé
 * 4. Proposition nouvelle date (optionnel)
 * 5. Mise à jour statistiques
 * 6. Log historique avec raison
 *
 * @see viamentor-student-lifecycle-workflows
 */

/**
 * ============================================================================
 * 6. NAVIGATION & ROUTING
 * ============================================================================
 */

/**
 * Routes disponibles:
 *
 * /lessons                    → Liste toutes leçons
 * /lessons/:id                → Détail leçon
 * /lessons/calendar           → Calendrier interactif
 * /lessons/book               → Wizard réservation
 * /lessons/conflicts          → Gestion conflits
 *
 * Navigation contextuelle:
 *
 * Depuis liste → Détail:
 * <Link to={`/lessons/${lesson.id}`}>Voir détail</Link>
 *
 * Depuis détail → Élève:
 * <Link to={`/students/${lesson.studentId}`}>Voir élève</Link>
 *
 * Depuis détail → Moniteur:
 * <Link to={`/instructors/${lesson.instructorId}`}>Voir moniteur</Link>
 *
 * Depuis détail → Véhicule:
 * <Link to={`/vehicles/${lesson.vehicleId}`}>Voir véhicule</Link>
 */

/**
 * ============================================================================
 * 7. INTÉGRATIONS
 * ============================================================================
 */

/**
 * 7.1 AVEC MODULE STUDENTS
 * =========================
 *
 * - Affichage leçons dans profil élève
 * - Compteurs heures conduites
 * - Progression pédagogique
 * - Historique complet
 *
 * @see viamentor-student-detail-page
 */

/**
 * 7.2 AVEC MODULE INSTRUCTORS
 * ============================
 *
 * - Planning moniteur
 * - Leçons assignées
 * - Statistiques performance
 * - Disponibilités
 *
 * @see viamentor-instructor-detail-page
 */

/**
 * 7.3 AVEC MODULE VEHICLES
 * =========================
 *
 * - Utilisation véhicule
 * - Planning réservations
 * - Kilométrage
 * - Maintenance
 *
 * @see viamentor-vehicle-detail-page
 */

/**
 * 7.4 AVEC MODULE BILLING
 * ========================
 *
 * - Facturation automatique
 * - Paiements leçons
 * - Forfaits et crédits
 * - Remboursements annulations
 *
 * @see viamentor-billing-dashboard-page
 */

/**
 * 7.5 AVEC MODULE PLANNING
 * =========================
 *
 * - Vue calendrier globale
 * - Cours théoriques + pratiques
 * - Drag & drop
 * - Conflits temps réel
 *
 * @see viamentor-planning-page
 */

/**
 * ============================================================================
 * 8. BONNES PRATIQUES
 * ============================================================================
 */

/**
 * 8.1 CRÉATION LEÇON
 * ===================
 *
 * ✅ FAIRE:
 * - Vérifier disponibilités avant création
 * - Valider tous les champs obligatoires
 * - Calculer prix automatiquement
 * - Envoyer notifications immédiatement
 * - Logger toutes les actions
 *
 * ❌ ÉVITER:
 * - Créer leçon sans vérifier conflits
 * - Oublier notifications
 * - Prix manuel sans validation
 * - Créer sans point de rendez-vous
 */

/**
 * 8.2 MODIFICATION LEÇON
 * =======================
 *
 * ✅ FAIRE:
 * - Notifier toutes les parties concernées
 * - Logger raison modification
 * - Vérifier nouvelles disponibilités
 * - Recalculer prix si durée change
 * - Mettre à jour calendrier
 *
 * ❌ ÉVITER:
 * - Modifier sans notification
 * - Changer horaire sans vérifier conflits
 * - Oublier mise à jour facture
 */

/**
 * 8.3 ANNULATION LEÇON
 * =====================
 *
 * ✅ FAIRE:
 * - Demander raison obligatoire (min 20 caractères)
 * - Proposer nouvelle date
 * - Rembourser si payé
 * - Notifier élève + moniteur
 * - Logger historique complet
 *
 * ❌ ÉVITER:
 * - Annuler sans raison
 * - Oublier remboursement
 * - Ne pas proposer alternative
 */

/**
 * 8.4 GESTION CONFLITS
 * =====================
 *
 * ✅ FAIRE:
 * - Résoudre conflits critiques en priorité
 * - Utiliser suggestions automatiques
 * - Vérifier impact sur autres leçons
 * - Notifier toutes les parties
 * - Documenter résolution
 *
 * ❌ ÉVITER:
 * - Ignorer conflits critiques
 * - Résoudre sans vérifier disponibilités
 * - Oublier notifications
 */

/**
 * 8.5 PERFORMANCE
 * ===============
 *
 * ✅ FAIRE:
 * - Utiliser pagination pour listes longues
 * - Implémenter recherche côté serveur
 * - Cacher données fréquemment utilisées
 * - Lazy load calendrier par période
 * - Optimiser requêtes base de données
 *
 * ❌ ÉVITER:
 * - Charger toutes les leçons d'un coup
 * - Recherche client-side sur gros volumes
 * - Recalculer stats à chaque render
 */

/**
 * ============================================================================
 * EXEMPLES D'UTILISATION
 * ============================================================================
 */

/**
 * EXEMPLE 1: Créer une nouvelle leçon
 * ====================================
 */
export const example1_CreateLesson = `
// Navigation vers wizard
<Link to="/lessons/book">
  <Button>
    <PlusIcon className="h-4 w-4 mr-2" />
    Nouvelle leçon
  </Button>
</Link>

// Ou programmatiquement
const navigate = useNavigate();
navigate('/lessons/book');
`;

/**
 * EXEMPLE 2: Afficher détail leçon
 * =================================
 */
export const example2_ShowLessonDetail = `
// Depuis liste
<Link to={\`/lessons/\${lesson.id}\`}>
  Voir détail
</Link>

// Ou programmatiquement
const navigate = useNavigate();
navigate(\`/lessons/\${lesson.id}\`);
`;

/**
 * EXEMPLE 3: Filtrer leçons par statut
 * =====================================
 */
export const example3_FilterLessons = `
import { getLessonsByStatus } from '@/polymet/data/viamentor-lessons-data';

const scheduledLessons = getLessonsByStatus('scheduled');
const completedLessons = getLessonsByStatus('completed');
`;

/**
 * EXEMPLE 4: Intégrer calendrier dans page custom
 * ================================================
 */
export const example4_IntegrateCalendar = `
import { PlanningCalendar } from '@/polymet/components/viamentor-planning-calendar';

function MyCustomPage() {
  return (
    <PlanningCalendar
      locale="fr"
      view="week"
      filters={{ instructorId: "instructor-1" }}
      onNewPracticalLesson={() => navigate('/lessons/book')}
      onEventClick={(event) => navigate(\`/lessons/\${event.id}\`)}
    />
  );
}
`;

/**
 * EXEMPLE 5: Utiliser workflows automatisés
 * ==========================================
 */
export const example5_UseWorkflows = `
import {
  useLessonCompletionWorkflow,
  useExamBookingWorkflow
} from '@/polymet/data/viamentor-student-lifecycle-workflows';

function LessonActions({ lesson }) {
  const { mutate: completeLesson } = useLessonCompletionWorkflow();
  
  const handleComplete = () => {
    completeLesson(lesson, {
      onSuccess: () => {
        toast.success('Leçon terminée avec succès');
        // Workflows automatiques déclenchés:
        // - Email élève
        // - Déblocage évaluation
        // - Mise à jour compteurs
        // - Calcul progression
      }
    });
  };
  
  return (
    <Button onClick={handleComplete}>
      Terminer la leçon
    </Button>
  );
}
`;

/**
 * ============================================================================
 * CONCLUSION
 * ============================================================================
 *
 * Le module Lessons est maintenant complet avec:
 *
 * ✅ 5 pages principales (liste, détail, calendrier, réservation, conflits)
 * ✅ Composants réutilisables (popover, cards, actions)
 * ✅ Data & types TypeScript complets
 * ✅ Workflows automatisés (TanStack Query)
 * ✅ Navigation intégrée (React Router)
 * ✅ i18n FR/DE/IT/EN
 * ✅ Responsive mobile/tablette/desktop
 * ✅ Intégrations avec autres modules
 *
 * Pour toute question ou amélioration, consulter:
 * - @/polymet/data/viamentor-lessons-data
 * - @/polymet/data/viamentor-lessons-i18n
 * - @/polymet/data/viamentor-student-lifecycle-workflows
 * - @/polymet/components/viamentor-planning-calendar
 */

export default {
  version: "1.0.0",
  lastUpdated: "2025-01-14",
  status: "COMPLETE",
  pages: 5,
  components: 4,
  workflows: 3,
  languages: 4,
};
