/**
 * VIAMENTOR Vehicles Management - Prisma Schema
 * 
 * Schéma base de données pour gestion véhicules auto-école
 * Conformité: OAC Art. 65-68 (Ordonnance sur l'admission à la circulation)
 * 
 * Relations:
 * - Vehicle -> Tenant (multi-tenant)
 * - Vehicle -> VehicleCategory
 * - Vehicle -> VehicleInsurance (1:N)
 * - Vehicle -> VehicleMaintenance (1:N)
 * - Vehicle -> VehicleFuelLog (1:N)
 * - Vehicle -> VehicleCost (1:N)
 * - Vehicle -> VehicleDocument (1:N)
 * - Vehicle -> Lesson (1:N)
 * - Vehicle -> VehicleGPSTracking (1:N)
 */

// ============================================================================
// ENUMS
// ============================================================================

enum VehicleStatus {
  AVAILABLE        // Disponible pour leçons
  IN_USE          // En cours d'utilisation
  MAINTENANCE     // En maintenance
  OUT_OF_SERVICE  // Hors service
  RESERVED        // Réservé
  DECOMMISSIONED  // Désaffecté
}

enum VehicleCategory {
  CAT_A1    // Motocycle 125cc
  CAT_A     // Motocycle >125cc
  CAT_B     // Voiture
  CAT_BE    // Voiture + remorque
  CAT_C     // Camion
  CAT_CE    // Camion + remorque
  CAT_D     // Bus
  CAT_DE    // Bus + remorque
}

enum FuelType {
  GASOLINE   // Essence
  DIESEL     // Diesel
  ELECTRIC   // Électrique
  HYBRID     // Hybride
  PLUGIN_HYBRID // Hybride rechargeable
  CNG        // Gaz naturel
  LPG        // GPL
}

enum TransmissionType {
  MANUAL     // Manuelle
  AUTOMATIC  // Automatique
  SEMI_AUTO  // Semi-automatique
}

enum InsuranceType {
  LIABILITY      // RC obligatoire
  PARTIAL_CASCO  // Casco partielle
  FULL_CASCO     // Casco complète
  OCCUPANTS      // Passagers
  LEGAL          // Protection juridique
}

enum MaintenanceType {
  SCHEDULED      // Entretien planifié
  REPAIR         // Réparation
  INSPECTION     // Contrôle technique
  TIRE_CHANGE    // Changement pneus
  BRAKE_SERVICE  // Service freins
  OIL_CHANGE     // Vidange
  EMERGENCY      // Urgence
}

enum MaintenanceStatus {
  SCHEDULED   // Planifié
  IN_PROGRESS // En cours
  COMPLETED   // Terminé
  CANCELLED   // Annulé
}

enum CostCategory {
  FUEL           // Carburant
  MAINTENANCE    // Entretien
  INSURANCE      // Assurance
  TAX            // Taxes
  PARKING        // Stationnement
  TOLL           // Péages
  FINE           // Amendes
  DEPRECIATION   // Amortissement
  OTHER          // Autre
}

enum DocumentType {
  REGISTRATION      // Permis de circulation
  INSURANCE_POLICY  // Police d'assurance
  INSPECTION_REPORT // Rapport contrôle technique
  INVOICE           // Facture
  MAINTENANCE_LOG   // Carnet d'entretien
  ACCIDENT_REPORT   // Constat accident
  OTHER             // Autre
}

// ============================================================================
// MAIN VEHICLE MODEL
// ============================================================================

model Vehicle {
  // Primary Key
  id                String   @id @default(cuid())
  
  // Multi-tenant
  tenantId          String
  tenant            Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  // Identification
  licensePlate      String   @unique // Plaque d'immatriculation (ex: VD 123456)
  vin               String   @unique // Numéro de châssis (17 caractères)
  canton            String   // Canton d'immatriculation (2 lettres)
  
  // Basic Info
  category          VehicleCategory
  brand             String   // Marque (ex: Volkswagen)
  model             String   // Modèle (ex: Golf)
  year              Int      // Année de fabrication
  color             String   // Couleur
  
  // Technical Specs
  fuelType          FuelType
  transmission      TransmissionType
  enginePower       Int      // Puissance en kW
  engineCapacity    Int?     // Cylindrée en cm³ (null pour électrique)
  co2Emissions      Int?     // Émissions CO2 en g/km
  
  // Dimensions & Weight
  seats             Int      // Nombre de places
  doors             Int?     // Nombre de portes
  weight            Int?     // Poids à vide en kg
  maxWeight         Int?     // Poids total autorisé en kg
  
  // Status & Availability
  status            VehicleStatus @default(AVAILABLE)
  isActive          Boolean  @default(true)
  purchaseDate      DateTime // Date d'achat
  purchasePrice     Decimal  @db.Decimal(10, 2) // Prix d'achat CHF
  currentValue      Decimal? @db.Decimal(10, 2) // Valeur actuelle CHF
  
  // Mileage
  initialMileage    Int      // Kilométrage initial
  currentMileage    Int      // Kilométrage actuel
  lastMileageUpdate DateTime @default(now())
  
  // OAC Compliance (Art. 65-68)
  hasDoublePedals   Boolean  @default(false) // Doubles pédales obligatoires
  hasInteriorMirror Boolean  @default(true)  // Rétroviseur intérieur
  hasExteriorMirror Boolean  @default(true)  // Rétroviseur extérieur supplémentaire
  hasLPlate         Boolean  @default(true)  // Plaque "L" amovible
  
  // Equipment
  hasABS            Boolean  @default(true)
  hasESP            Boolean  @default(true)
  hasAirbags        Boolean  @default(true)
  hasAirConditioning Boolean @default(false)
  hasGPS            Boolean  @default(false)
  hasDashcam        Boolean  @default(false)
  
  // Maintenance
  nextServiceDate   DateTime?
  nextServiceKm     Int?
  lastInspectionDate DateTime? // Dernier contrôle technique
  nextInspectionDate DateTime? // Prochain contrôle technique
  
  // Insurance
  insuranceExpiry   DateTime // Date d'expiration assurance
  insuranceCompany  String   // Compagnie d'assurance
  insurancePolicyNumber String // Numéro de police
  
  // Notes & Images
  notes             String?  @db.Text
  imageUrl          String?  // Photo principale
  images            String[] // Photos supplémentaires (URLs)
  
  // Timestamps
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  decommissionedAt  DateTime? // Date de désaffectation
  
  // Relations
  insurances        VehicleInsurance[]
  maintenances      VehicleMaintenance[]
  fuelLogs          VehicleFuelLog[]
  costs             VehicleCost[]
  documents         VehicleDocument[]
  lessons           Lesson[]
  gpsTracking       VehicleGPSTracking[]
  
  // Indexes
  @@index([tenantId])
  @@index([status])
  @@index([category])
  @@index([isActive])
  @@index([licensePlate])
  @@map("vehicles")
}

// ============================================================================
// INSURANCE
// ============================================================================

model VehicleInsurance {
  id                String        @id @default(cuid())
  
  vehicleId         String
  vehicle           Vehicle       @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  
  type              InsuranceType
  company           String        // Compagnie d'assurance
  policyNumber      String        // Numéro de police
  
  startDate         DateTime
  endDate           DateTime
  
  premium           Decimal       @db.Decimal(10, 2) // Prime annuelle CHF
  deductible        Decimal?      @db.Decimal(10, 2) // Franchise CHF
  coverage          Decimal?      @db.Decimal(10, 2) // Couverture maximale CHF
  
  isActive          Boolean       @default(true)
  autoRenewal       Boolean       @default(true)
  
  notes             String?       @db.Text
  documentUrl       String?       // URL du document de police
  
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
  
  @@index([vehicleId])
  @@index([endDate])
  @@map("vehicle_insurances")
}

// ============================================================================
// MAINTENANCE
// ============================================================================

model VehicleMaintenance {
  id                String            @id @default(cuid())
  
  vehicleId         String
  vehicle           Vehicle           @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  
  type              MaintenanceType
  status            MaintenanceStatus @default(SCHEDULED)
  
  scheduledDate     DateTime
  completedDate     DateTime?
  
  mileageAtService  Int               // Kilométrage au moment du service
  
  description       String            @db.Text
  workPerformed     String?           @db.Text // Travaux effectués
  partsReplaced     String?           @db.Text // Pièces remplacées
  
  provider          String            // Garage/Fournisseur
  mechanicName      String?           // Nom du mécanicien
  
  cost              Decimal           @db.Decimal(10, 2) // Coût CHF
  laborCost         Decimal?          @db.Decimal(10, 2) // Main d'œuvre CHF
  partsCost         Decimal?          @db.Decimal(10, 2) // Pièces CHF
  
  invoiceNumber     String?
  invoiceUrl        String?           // URL de la facture
  
  nextServiceDue    DateTime?         // Prochain service recommandé
  nextServiceKm     Int?              // Prochain service en km
  
  notes             String?           @db.Text
  
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
  
  @@index([vehicleId])
  @@index([scheduledDate])
  @@index([status])
  @@map("vehicle_maintenances")
}

// ============================================================================
// FUEL LOG
// ============================================================================

model VehicleFuelLog {
  id                String   @id @default(cuid())
  
  vehicleId         String
  vehicle           Vehicle  @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  
  date              DateTime @default(now())
  mileage           Int      // Kilométrage au moment du plein
  
  liters            Decimal  @db.Decimal(8, 2) // Litres
  pricePerLiter     Decimal  @db.Decimal(6, 3) // Prix au litre CHF
  totalCost         Decimal  @db.Decimal(10, 2) // Coût total CHF
  
  fuelType          FuelType
  isFull            Boolean  @default(true) // Plein complet ou partiel
  
  station           String?  // Station-service
  location          String?  // Lieu
  
  receiptUrl        String?  // URL du reçu
  notes             String?  @db.Text
  
  // Calculated fields (computed on insert/update)
  kmSinceLastFill   Int?     // Distance depuis dernier plein
  consumption       Decimal? @db.Decimal(5, 2) // Consommation L/100km
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([vehicleId])
  @@index([date])
  @@map("vehicle_fuel_logs")
}

// ============================================================================
// COSTS
// ============================================================================

model VehicleCost {
  id                String       @id @default(cuid())
  
  vehicleId         String
  vehicle           Vehicle      @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  
  category          CostCategory
  date              DateTime     @default(now())
  
  amount            Decimal      @db.Decimal(10, 2) // Montant CHF
  description       String       @db.Text
  
  provider          String?      // Fournisseur
  invoiceNumber     String?
  invoiceUrl        String?      // URL de la facture
  
  isRecurring       Boolean      @default(false)
  recurringInterval String?      // monthly, yearly, etc.
  
  notes             String?      @db.Text
  
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
  
  @@index([vehicleId])
  @@index([category])
  @@index([date])
  @@map("vehicle_costs")
}

// ============================================================================
// DOCUMENTS
// ============================================================================

model VehicleDocument {
  id                String       @id @default(cuid())
  
  vehicleId         String
  vehicle           Vehicle      @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  
  type              DocumentType
  name              String       // Nom du document
  description       String?      @db.Text
  
  fileUrl           String       // URL du fichier
  fileName          String       // Nom du fichier original
  fileSize          Int          // Taille en bytes
  mimeType          String       // Type MIME
  
  issueDate         DateTime?    // Date d'émission
  expiryDate        DateTime?    // Date d'expiration
  
  issuedBy          String?      // Émis par (autorité, garage, etc.)
  referenceNumber   String?      // Numéro de référence
  
  uploadedBy        String       // User ID
  uploadedAt        DateTime     @default(now())
  
  isArchived        Boolean      @default(false)
  archivedAt        DateTime?
  
  notes             String?      @db.Text
  
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
  
  @@index([vehicleId])
  @@index([type])
  @@index([expiryDate])
  @@map("vehicle_documents")
}

// ============================================================================
// GPS TRACKING
// ============================================================================

model VehicleGPSTracking {
  id                String   @id @default(cuid())
  
  vehicleId         String
  vehicle           Vehicle  @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  
  timestamp         DateTime @default(now())
  
  latitude          Decimal  @db.Decimal(10, 8)
  longitude         Decimal  @db.Decimal(11, 8)
  altitude          Decimal? @db.Decimal(8, 2) // Altitude en mètres
  
  speed             Decimal? @db.Decimal(5, 2) // Vitesse en km/h
  heading           Decimal? @db.Decimal(5, 2) // Direction en degrés (0-360)
  
  accuracy          Decimal? @db.Decimal(6, 2) // Précision en mètres
  
  // Context
  lessonId          String?  // Si tracking pendant une leçon
  instructorId      String?  // Moniteur au volant
  studentId         String?  // Élève au volant
  
  // Events
  eventType         String?  // start, stop, harsh_brake, speeding, etc.
  eventData         Json?    // Données additionnelles
  
  createdAt         DateTime @default(now())
  
  @@index([vehicleId])
  @@index([timestamp])
  @@index([lessonId])
  @@map("vehicle_gps_tracking")
}

// ============================================================================
// VIEWS & COMPUTED FIELDS (Virtual)
// ============================================================================

/**
 * Virtual computed fields (à implémenter côté application):
 * 
 * Vehicle:
 * - totalCosts: Sum of all costs
 * - costPerKm: Total costs / (currentMileage - initialMileage)
 * - averageConsumption: Average from fuel logs
 * - utilizationRate: Percentage of time in use
 * - maintenanceDue: Boolean if maintenance is due
 * - insuranceExpiringSoon: Boolean if insurance expires in <30 days
 * - inspectionDue: Boolean if inspection is due
 * - ageInYears: Current year - year
 * - totalMileage: currentMileage - initialMileage
 * 
 * Maintenance:
 * - isOverdue: scheduledDate < now() && status != COMPLETED
 * - daysUntilDue: Days between now and scheduledDate
 * 
 * Insurance:
 * - daysUntilExpiry: Days between now and endDate
 * - isExpiringSoon: endDate < now() + 30 days
 * 
 * FuelLog:
 * - efficiency: Calculate L/100km based on previous log
 */

// ============================================================================
// INDEXES & PERFORMANCE
// ============================================================================

/**
 * Recommended additional indexes for performance:
 * 
 * 1. Composite indexes:
 *    - (tenantId, status, isActive) on Vehicle
 *    - (vehicleId, date) on VehicleCost
 *    - (vehicleId, timestamp) on VehicleGPSTracking
 * 
 * 2. Full-text search indexes:
 *    - (brand, model) on Vehicle
 *    - (description) on VehicleMaintenance
 * 
 * 3. Partial indexes:
 *    - WHERE isActive = true on Vehicle
 *    - WHERE status = 'SCHEDULED' on VehicleMaintenance
 */

// ============================================================================
// MIGRATIONS & SEED DATA
// ============================================================================

/**
 * Seed data recommendations:
 * 
 * 1. Vehicle categories with OAC requirements
 * 2. Common maintenance types and intervals
 * 3. Swiss insurance companies
 * 4. Canton codes and regulations
 * 5. Default equipment lists per category
 */

export type {
  Vehicle,
  VehicleInsurance,
  VehicleMaintenance,
  VehicleFuelLog,
  VehicleCost,
  VehicleDocument,
  VehicleGPSTracking,
}

export {
  VehicleStatus,
  VehicleCategory,
  FuelType,
  TransmissionType,
  InsuranceType,
  MaintenanceType,
  MaintenanceStatus,
  CostCategory,
  DocumentType,
}