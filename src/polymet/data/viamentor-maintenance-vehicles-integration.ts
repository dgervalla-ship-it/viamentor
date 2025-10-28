/**
 * VIAMENTOR - Maintenance & Vehicles Integration
 * Documentation de l'intégration entre les modules Maintenance et Vehicles
 *
 * @module data/viamentor-maintenance-vehicles-integration
 */

// ============================================================================
// OVERVIEW
// ============================================================================

/**
 * # Intégration Maintenance ↔ Vehicles
 *
 * Cette intégration permet une gestion fluide de la maintenance des véhicules
 * en connectant les deux modules pour partager automatiquement les données.
 *
 * ## Fonctionnalités Clés
 *
 * ### 1. Sélection Véhicule Intelligente
 * - Liste déroulante avec tous les véhicules disponibles
 * - Affichage du statut en temps réel (disponible, en cours, maintenance)
 * - Exclusion automatique des véhicules hors service
 * - Filtrage par catégorie (B, A, BE, A1, BPT)
 *
 * ### 2. Récupération Automatique des Données
 * - **Kilométrage actuel** : Affiché automatiquement lors de la sélection
 * - **Informations véhicule** : Marque, modèle, plaque d'immatriculation
 * - **Catégorie** : Type de permis associé
 * - **Prochaines échéances** : Révision, assurance, expertise
 *
 * ### 3. Alertes de Conformité
 * - Détection automatique des problèmes de conformité
 * - Affichage des alertes critiques (assurance/expertise expirée)
 * - Warnings pour les échéances proches (< 15 jours)
 * - Alertes kilométrage critique (> 200'000 km)
 *
 * ### 4. Planification Intelligente
 * - Calcul automatique du kilométrage restant avant maintenance
 * - Suggestions de dates basées sur l'utilisation moyenne
 * - Déclencheurs multiples (kilométrage + temps)
 * - Estimation durée et coût basée sur l'historique
 *
 * ### 5. Intégration Bidirectionnelle
 * - Création de tâches depuis la page Maintenance
 * - Création de tâches depuis la page Détail Véhicule
 * - Pré-sélection automatique du véhicule selon le contexte
 * - Synchronisation des statuts entre les modules
 */

// ============================================================================
// ARCHITECTURE
// ============================================================================

/**
 * ## Architecture de l'Intégration
 *
 * ```
 * ┌─────────────────────────────────────────────────────────────┐
 * │                    MAINTENANCE MODULE                        │
 * │                                                              │
 * │  ┌──────────────────────────────────────────────────────┐  │
 * │  │  MaintenanceTaskDialog                               │  │
 * │  │  ┌────────────────────────────────────────────────┐  │  │
 * │  │  │  Vehicle Selection                             │  │  │
 * │  │  │  • MOCK_VEHICLES (from vehicles-data)         │  │  │
 * │  │  │  • getVehicleById()                           │  │  │
 * │  │  │  • getComplianceIssues()                      │  │  │
 * │  │  └────────────────────────────────────────────────┘  │  │
 * │  │                                                        │  │
 * │  │  ┌────────────────────────────────────────────────┐  │  │
 * │  │  │  Auto-populated Fields                         │  │  │
 * │  │  │  • vehicleName (brand + model)                │  │  │
 * │  │  │  • vehiclePlate                               │  │  │
 * │  │  │  • currentMileage                             │  │  │
 * │  │  │  • category                                   │  │  │
 * │  │  └────────────────────────────────────────────────┘  │  │
 * │  │                                                        │  │
 * │  │  ┌────────────────────────────────────────────────┐  │  │
 * │  │  │  Compliance Alerts                             │  │  │
 * │  │  │  • Insurance expiry                           │  │  │
 * │  │  │  • Expertise expiry                           │  │  │
 * │  │  │  • Revision due                               │  │  │
 * │  │  │  • Critical mileage                           │  │  │
 * │  │  └────────────────────────────────────────────────┘  │  │
 * │  └──────────────────────────────────────────────────────┘  │
 * └─────────────────────────────────────────────────────────────┘
 *                              ▲
 *                              │
 *                              │ Integration
 *                              │
 *                              ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                     VEHICLES MODULE                          │
 * │                                                              │
 * │  ┌──────────────────────────────────────────────────────┐  │
 * │  │  Vehicle Data (viamentor-vehicles-data)              │  │
 * │  │  • MOCK_VEHICLES[]                                   │  │
 * │  │  • getVehicleById(id)                                │  │
 * │  │  • getComplianceIssues(vehicle)                      │  │
 * │  │  • calculateComplianceStatus(vehicle)                │  │
 * │  └──────────────────────────────────────────────────────┘  │
 * │                                                              │
 * │  ┌──────────────────────────────────────────────────────┐  │
 * │  │  Vehicle Detail Page                                 │  │
 * │  │  • "Schedule Maintenance" button                     │  │
 * │  │  • Opens MaintenanceTaskDialog                       │  │
 * │  │  • Pre-selects current vehicle                       │  │
 * │  └──────────────────────────────────────────────────────┘  │
 * └─────────────────────────────────────────────────────────────┘
 * ```
 */

// ============================================================================
// DATA FLOW
// ============================================================================

/**
 * ## Flux de Données
 *
 * ### 1. Création de Tâche depuis Maintenance Page
 *
 * ```typescript
 * // User clicks "Créer une Tâche"
 * MaintenancePage
 *   → handleCreateTask()
 *   → setIsDialogOpen(true)
 *   → MaintenanceTaskDialog opens
 *   → User selects vehicle from dropdown
 *   → Dialog fetches: getVehicleById(vehicleId)
 *   → Auto-populate: mileage, brand, model, plate
 *   → Check compliance: getComplianceIssues(vehicle)
 *   → Display alerts if any
 *   → User fills form
 *   → handleSave()
 *   → Create MaintenanceTask with vehicle data
 * ```
 *
 * ### 2. Création de Tâche depuis Vehicle Detail Page
 *
 * ```typescript
 * // User clicks "Planifier Maintenance" in vehicle header
 * VehicleDetailPage
 *   → handleScheduleMaintenance()
 *   → setIsMaintenanceDialogOpen(true)
 *   → MaintenanceTaskDialog opens with vehicleId prop
 *   → Dialog pre-selects vehicle
 *   → Auto-populate all fields
 *   → Display compliance alerts
 *   → User fills remaining fields
 *   → handleSave()
 *   → Create MaintenanceTask linked to vehicle
 * ```
 *
 * ### 3. Synchronisation des Statuts
 *
 * ```typescript
 * // When maintenance task status changes
 * MaintenanceTask.status = "in_progress"
 *   → Update Vehicle.status = "maintenance"
 *   → Update Vehicle.availabilityRate
 *   → Create audit log entry
 *
 * // When maintenance task completes
 * MaintenanceTask.status = "completed"
 *   → Update Vehicle.status = "available"
 *   → Update Vehicle.mileage (if changed)
 *   → Update Vehicle.maintenanceCost
 *   → Update Vehicle.nextRevision (if applicable)
 *   → Create audit log entry
 * ```
 */

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * ## Exemples d'Utilisation
 *
 * ### Exemple 1: Créer une Tâche de Vidange
 *
 * ```tsx
 * // Dans MaintenancePage
 * const handleCreateOilChange = () => {
 *   setIsDialogOpen(true);
 * };
 *
 * // User sélectionne "VW Golf (VD 123456)"
 * // Dialog affiche automatiquement:
 * // - Kilométrage: 45'000 km
 * // - Prochaine révision: 15/03/2025
 * // - Aucune alerte
 *
 * // User remplit:
 * // - Titre: "Vidange moteur"
 * // - Type: "Préventif"
 * // - Catégorie: "Vidange"
 * // - Date: 20/01/2025
 * // - Coût: 180 CHF
 * // - Kilométrage déclencheur: 60'000 km (dans 15'000 km)
 *
 * // Résultat: Tâche créée avec toutes les données véhicule
 * ```
 *
 * ### Exemple 2: Planifier depuis Détail Véhicule
 *
 * ```tsx
 * // Dans VehicleDetailPage
 * <VehicleDetailHeader
 *   onMaintenance={handleScheduleMaintenance}
 * />
 *
 * // User clique "Planifier Maintenance"
 * // Dialog s'ouvre avec véhicule pré-sélectionné
 * // Toutes les infos sont déjà remplies
 * // User n'a qu'à choisir le type et la date
 * ```
 *
 * ### Exemple 3: Gestion des Alertes
 *
 * ```tsx
 * // Véhicule avec assurance expirée
 * const vehicle = getVehicleById("veh-007");
 * const issues = getComplianceIssues(vehicle);
 *
 * // issues = [
 * //   "Assurance expirée - Usage interdit",
 * //   "Expertise expirée - Usage interdit",
 * //   "Kilométrage critique - Contrôle recommandé"
 * // ]
 *
 * // Dialog affiche Alert destructive:
 * <Alert variant="destructive">
 *   <AlertTriangleIcon />
 *   <AlertDescription>
 *     <div className="font-semibold">Alertes de conformité:</div>
 *     <ul>
 *       {issues.map(issue => <li>{issue}</li>)}
 *     </ul>
 *   </AlertDescription>
 * </Alert>
 * ```
 */

// ============================================================================
// TYPES INTEGRATION
// ============================================================================

/**
 * ## Types Partagés
 *
 * ### MaintenanceTask avec Données Véhicule
 *
 * ```typescript
 * interface MaintenanceTask {
 *   // Maintenance fields
 *   id: string;
 *   title: string;
 *   type: MaintenanceType;
 *   status: MaintenanceStatus;
 *
 *   // Vehicle integration fields (auto-populated)
 *   vehicleId: string;              // From Vehicle.id
 *   vehicleName: string;            // From Vehicle.brand + model
 *   vehiclePlate: string;           // From Vehicle.licensePlate
 *   currentMileage?: number;        // From Vehicle.mileage
 *
 *   // Trigger fields
 *   triggerMileage?: number;        // User input
 *   triggerType: "mileage" | "time" | "both";
 * }
 * ```
 *
 * ### Vehicle avec Statut Maintenance
 *
 * ```typescript
 * interface Vehicle {
 *   id: string;
 *   licensePlate: string;
 *   brand: string;
 *   model: string;
 *   mileage: number;
 *
 *   // Maintenance integration
 *   status: VehicleStatus;          // "maintenance" when task in progress
 *   maintenanceCost: number;        // Sum of all maintenance costs
 *   nextRevision: string;           // Updated after maintenance
 *   complianceStatus: ComplianceStatus;
 *   complianceIssues?: string[];
 * }
 * ```
 */

// ============================================================================
// VALIDATION RULES
// ============================================================================

/**
 * ## Règles de Validation
 *
 * ### 1. Sélection Véhicule
 * - ✅ Véhicule requis (required)
 * - ✅ Véhicule doit être actif (status !== "out_of_service")
 * - ⚠️ Warning si véhicule en maintenance
 * - ⚠️ Warning si véhicule a des alertes de conformité
 *
 * ### 2. Kilométrage Déclencheur
 * - ✅ Doit être > kilométrage actuel
 * - ℹ️ Affiche kilométrage restant si valide
 * - ⚠️ Warning si < 1000 km restants
 *
 * ### 3. Date d'Échéance
 * - ✅ Date requise
 * - ⚠️ Warning si date < aujourd'hui
 * - ℹ️ Suggestion basée sur utilisation moyenne
 *
 * ### 4. Conformité
 * - 🚫 Bloque si assurance expirée
 * - 🚫 Bloque si expertise expirée
 * - ⚠️ Warning si révision en retard
 */

// ============================================================================
// BEST PRACTICES
// ============================================================================

/**
 * ## Bonnes Pratiques
 *
 * ### 1. Toujours Vérifier la Conformité
 * ```typescript
 * const vehicle = getVehicleById(vehicleId);
 * const issues = getComplianceIssues(vehicle);
 *
 * if (issues.some(i => i.includes("interdit"))) {
 *   // Bloquer la création de tâche
 *   alert("Véhicule non conforme - Usage interdit");
 *   return;
 * }
 * ```
 *
 * ### 2. Pré-remplir au Maximum
 * ```typescript
 * // Utiliser les données véhicule pour suggestions
 * const suggestedDate = calculateNextMaintenanceDate(
 *   vehicle.mileage,
 *   vehicle.averageKmPerDay,
 *   15000 // interval
 * );
 *
 * const suggestedCost = getAverageCostForCategory(
 *   "oil_change",
 *   vehicle.category
 * );
 * ```
 *
 * ### 3. Synchroniser les Statuts
 * ```typescript
 * // Quand tâche commence
 * if (task.status === "in_progress") {
 *   updateVehicleStatus(task.vehicleId, "maintenance");
 * }
 *
 * // Quand tâche termine
 * if (task.status === "completed") {
 *   updateVehicleStatus(task.vehicleId, "available");
 *   updateVehicleMileage(task.vehicleId, task.currentMileage);
 * }
 * ```
 *
 * ### 4. Logger les Actions
 * ```typescript
 * // Créer audit log pour traçabilité
 * createAuditLog({
 *   vehicleId: task.vehicleId,
 *   action: "maintenance_scheduled",
 *   details: {
 *     taskId: task.id,
 *     type: task.type,
 *     dueDate: task.dueDate,
 *   },
 *   userId: currentUser.id,
 * });
 * ```
 */

// ============================================================================
// FUTURE ENHANCEMENTS
// ============================================================================

/**
 * ## Améliorations Futures
 *
 * ### 1. Planification Automatique
 * - Suggestions intelligentes basées sur l'historique
 * - Calcul optimal des intervalles de maintenance
 * - Prédiction des pannes avec ML
 *
 * ### 2. Notifications Proactives
 * - Emails/SMS avant échéances
 * - Alertes kilométrage en temps réel
 * - Rappels pour contrôles obligatoires
 *
 * ### 3. Intégration Garages
 * - API pour réservation automatique
 * - Comparaison prix entre garages
 * - Suivi statut intervention en temps réel
 *
 * ### 4. Analytics Avancées
 * - Coût total de possession (TCO)
 * - Prédiction durée de vie véhicule
 * - Recommandations remplacement
 * - Benchmarking flotte
 *
 * ### 5. Mobile App
 * - Scan QR code véhicule
 * - Photo avant/après maintenance
 * - Signature électronique
 * - Géolocalisation garage
 */

export const MAINTENANCE_VEHICLES_INTEGRATION_DOC = {
  version: "1.0.0",
  lastUpdated: "2025-01-13",
  status: "production-ready",
  features: [
    "Vehicle selection with real-time data",
    "Auto-population of vehicle information",
    "Compliance alerts and warnings",
    "Intelligent mileage-based triggers",
    "Bidirectional integration",
    "Status synchronization",
  ],

  components: [
    "@/polymet/components/viamentor-maintenance-task-dialog",
    "@/polymet/pages/viamentor-maintenance-page",
    "@/polymet/pages/viamentor-vehicle-detail-page",
  ],

  dataFiles: [
    "@/polymet/data/viamentor-maintenance-data",
    "@/polymet/data/viamentor-vehicles-data",
    "@/polymet/data/viamentor-maintenance-i18n",
  ],
};
