/**
 * VIAMENTOR - DOCUMENTATION 03: FEATURES & MODULES
 */

export const featuresDoc = `
# 🎯 ViaMenutor - Features & Modules

## 📋 Table des matières

1. [RBAC - Rôles & Permissions](#rbac-roles-permissions)
2. [Multi-Tenant](#multi-tenant)
3. [i18n - Localisation](#i18n-localisation)
4. [Gestion Élèves](#gestion-eleves)
5. [Gestion Moniteurs](#gestion-moniteurs)
6. [Gestion Véhicules](#gestion-vehicules)
7. [Planning & Réservations](#planning-reservations)
8. [Facturation & Paiements](#facturation-paiements)
9. [Analytics & Reporting](#analytics-reporting)
10. [RGPD Compliance](#rgpd-compliance)

---

## 1. RBAC - Rôles & Permissions

### 🎭 15 Rôles hiérarchiques

\`\`\`typescript
export const USER_ROLES = {
  // Platform Level (ViaMenutor)
  platform_admin: {
    level: 1,
    label: "Platform Admin",
    description: "Administrateur plateforme ViaMenutor",
    permissions: ["*"], // All permissions
  },
  
  platform_support: {
    level: 2,
    label: "Platform Support",
    description: "Support technique ViaMenutor",
    permissions: ["tenants:read", "users:read", "support:write"],
  },
  
  finance_admin: {
    level: 2,
    label: "Finance Admin",
    description: "Administrateur financier ViaMenutor",
    permissions: ["finance:*", "invoices:*", "subscriptions:*"],
  },
  
  security_officer: {
    level: 2,
    label: "Security Officer",
    description: "Responsable sécurité et RGPD",
    permissions: ["gdpr:*", "security:*", "audit:*"],
  },
  
  // Tenant Level (Auto-école)
  school_admin: {
    level: 3,
    label: "School Admin",
    description: "Propriétaire/Directeur auto-école",
    permissions: [
      "students:*",
      "instructors:*",
      "vehicles:*",
      "lessons:*",
      "invoices:*",
      "analytics:*",
      "settings:*",
    ],
  },
  
  school_manager: {
    level: 4,
    label: "School Manager",
    description: "Manager auto-école",
    permissions: [
      "students:read",
      "students:write",
      "instructors:read",
      "vehicles:read",
      "lessons:*",
      "analytics:read",
    ],
  },
  
  secretary: {
    level: 5,
    label: "Secretary",
    description: "Secrétaire auto-école",
    permissions: [
      "students:read",
      "students:write",
      "lessons:read",
      "lessons:write",
      "invoices:read",
      "communications:*",
    ],
  },
  
  accountant: {
    level: 5,
    label: "Accountant",
    description: "Comptable auto-école",
    permissions: [
      "invoices:*",
      "payments:*",
      "analytics:read",
      "reports:*",
    ],
  },
  
  instructor: {
    level: 6,
    label: "Instructor",
    description: "Moniteur de conduite",
    permissions: [
      "students:read",
      "lessons:read",
      "lessons:write",
      "evaluations:*",
      "profile:write",
    ],
  },
  
  instructor_trainee: {
    level: 7,
    label: "Instructor Trainee",
    description: "Moniteur stagiaire",
    permissions: [
      "students:read",
      "lessons:read",
      "profile:read",
    ],
  },
  
  student: {
    level: 8,
    label: "Student",
    description: "Élève conducteur",
    permissions: [
      "lessons:read",
      "lessons:book",
      "invoices:read",
      "documents:read",
      "profile:write",
    ],
  },
  
  student_parent: {
    level: 9,
    label: "Student Parent",
    description: "Parent d'élève",
    permissions: [
      "student:read",
      "lessons:read",
      "invoices:read",
      "invoices:pay",
    ],
  },
  
  // Special Roles
  auditor: {
    level: 10,
    label: "Auditor",
    description: "Auditeur externe",
    permissions: [
      "audit:read",
      "logs:read",
      "reports:read",
    ],
  },
  
  api_client: {
    level: 11,
    label: "API Client",
    description: "Client API externe",
    permissions: [
      "api:read",
      "api:write",
    ],
  },
  
  guest: {
    level: 12,
    label: "Guest",
    description: "Invité (accès limité)",
    permissions: [
      "public:read",
    ],
  },
} as const;
\`\`\`

### 🔐 Permission Matrix

| Resource | Platform Admin | School Admin | Secretary | Instructor | Student |
|----------|---------------|--------------|-----------|------------|---------|
| Students | ✅ Full | ✅ Full | ✅ Read/Write | ✅ Read | ❌ |
| Instructors | ✅ Full | ✅ Full | ✅ Read | ✅ Read | ❌ |
| Vehicles | ✅ Full | ✅ Full | ✅ Read | ✅ Read | ❌ |
| Lessons | ✅ Full | ✅ Full | ✅ Read/Write | ✅ Read/Write | ✅ Read/Book |
| Invoices | ✅ Full | ✅ Full | ✅ Read | ❌ | ✅ Read |
| Analytics | ✅ Full | ✅ Full | ❌ | ❌ | ❌ |
| Settings | ✅ Full | ✅ Full | ❌ | ❌ | ❌ |

---

## 2. Multi-Tenant

### 🏢 Architecture Multi-Tenant

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                  VIAMENTOR PLATFORM                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Tenant 1    │  │  Tenant 2    │  │  Tenant N    │ │
│  │  Auto-École  │  │  Auto-École  │  │  Auto-École  │ │
│  │  Lausanne    │  │  Genève      │  │  Zürich      │ │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤ │
│  │ • Students   │  │ • Students   │  │ • Students   │ │
│  │ • Instructors│  │ • Instructors│  │ • Instructors│ │
│  │ • Vehicles   │  │ • Vehicles   │  │ • Vehicles   │ │
│  │ • Lessons    │  │ • Lessons    │  │ • Lessons    │ │
│  │ • Invoices   │  │ • Invoices   │  │ • Invoices   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 🔒 Tenant Isolation

\`\`\`typescript
// Middleware: Inject tenant context
export async function middleware(request: NextRequest) {
  const user = await getUser(request);
  const tenantId = user.tenantId;
  
  // Set tenant context for all queries
  await prisma.$executeRaw\`
    SET app.current_tenant = \${tenantId}
  \`;
  
  return NextResponse.next();
}

// All queries automatically filtered by tenant
const students = await prisma.student.findMany({
  // tenantId automatically added by RLS
});
\`\`\`

### 📊 Tenant Plans

| Feature | Starter | Professional | Enterprise |
|---------|---------|--------------|------------|
| Students | 50 | 200 | Unlimited |
| Instructors | 5 | 20 | Unlimited |
| Vehicles | 5 | 20 | Unlimited |
| Storage | 5 GB | 50 GB | Unlimited |
| Support | Email | Priority | Dedicated |
| Price/month | CHF 99 | CHF 299 | Custom |

---

## 3. i18n - Localisation

### 🌍 4 Langues supportées

\`\`\`typescript
export const SUPPORTED_LOCALES = {
  fr: {
    code: "fr",
    name: "Français",
    nativeName: "Français",
    flag: "🇫🇷",
    dateFormat: "DD.MM.YYYY",
    timeFormat: "HH:mm",
    currency: "CHF",
    numberFormat: "1'234.56",
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    dateFormat: "DD.MM.YYYY",
    timeFormat: "HH:mm",
    currency: "CHF",
    numberFormat: "1'234.56",
  },
  it: {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    currency: "CHF",
    numberFormat: "1.234,56",
  },
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "hh:mm A",
    currency: "CHF",
    numberFormat: "1,234.56",
  },
} as const;
\`\`\`

### 📝 Translation Structure

\`\`\`typescript
// data/viamentor-students-i18n.ts
export const studentsTranslations = {
  fr: {
    title: "Élèves",
    subtitle: "Gestion des élèves conducteurs",
    actions: {
      create: "Nouvel élève",
      edit: "Modifier",
      delete: "Supprimer",
      export: "Exporter",
    },
    filters: {
      status: "Statut",
      category: "Catégorie",
      instructor: "Moniteur",
    },
    table: {
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      category: "Catégorie",
      status: "Statut",
      instructor: "Moniteur",
      enrollmentDate: "Date d'inscription",
    },
  },
  de: {
    title: "Fahrschüler",
    subtitle: "Verwaltung der Fahrschüler",
    // ... German translations
  },
  it: {
    title: "Allievi",
    subtitle: "Gestione degli allievi conducenti",
    // ... Italian translations
  },
  en: {
    title: "Students",
    subtitle: "Driving students management",
    // ... English translations
  },
} as const;
\`\`\`

### 🗓️ Formats localisés

\`\`\`typescript
// Date formatting
const formatDate = (date: Date, locale: Locale) => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

// Number formatting
const formatNumber = (value: number, locale: Locale) => {
  return new Intl.NumberFormat(locale).format(value);
};

// Currency formatting
const formatCurrency = (value: number, locale: Locale) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'CHF',
  }).format(value);
};
\`\`\`

---

## 4. Gestion Élèves

### 📝 Wizard Inscription (4 steps)

#### **Step 1: Identité**
- Nom, prénom
- Date de naissance
- Email, téléphone
- Adresse complète
- Canton

#### **Step 2: Formation**
- Catégorie (B, A1, A, C, D)
- Moniteur assigné
- Véhicule assigné
- Date d'inscription

#### **Step 3: Documents légaux**
- Permis d'élève conducteur
- Certificat médical
- Cours premiers secours
- Cours sensibilisation

#### **Step 4: Résumé**
- Validation finale
- Création compte

### 📊 Fiche Détail Élève

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
│  • Avatar 120x120                                       │
│  • Nom, prénom, âge                                     │
│  • Badges: Statut, Catégorie                            │
│  • Actions: Modifier, Réserver leçon, Créer facture    │
└─────────────────────────────────────────────────────────┘
│  TABS                                                   │
│  ┌─────────┬─────────┬─────────┬─────────┬─────────┐   │
│  │ Infos   │Planning │Progress │Documents│Factures │   │
│  └─────────┴─────────┴─────────┴─────────┴─────────┘   │
│                                                         │
│  TAB CONTENT                                            │
│  • Informations personnelles                            │
│  • Historique modifications                             │
│  • Notes moniteur                                       │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 📈 Progression Pédagogique

- **Thèmes L-drive** (28 thèmes officiels)
- **Heures de conduite** (minimum 25h)
- **Cours théoriques** (8h obligatoires)
- **Cours sensibilisation** (2 jours)
- **Examens** (théorique + pratique)

---

## 5. Gestion Moniteurs

### 👨‍🏫 Wizard Création (3 steps)

#### **Step 1: Informations personnelles**
- Nom, prénom
- Date de naissance
- Email, téléphone
- Adresse

#### **Step 2: Qualifications**
- Numéro permis
- Catégories enseignées
- Numéro OMCo
- Date expiration OMCo

#### **Step 3: Autorisations légales**
- Habilitations cantonales
- Assurances
- Casier judiciaire

### 📊 Fiche Détail Moniteur

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
│  • Avatar 120x120                                       │
│  • Nom, prénom                                          │
│  • Badges: Statut, Catégories                           │
│  • Actions: Modifier, Planning, Performance             │
└─────────────────────────────────────────────────────────┘
│  TABS                                                   │
│  ┌─────────┬─────────┬─────────┬─────────┐             │
│  │ Infos   │Planning │ Élèves  │Perform. │             │
│  └─────────┴─────────┴─────────┴─────────┘             │
│                                                         │
│  TAB CONTENT                                            │
│  • Qualifications OMCo                                  │
│  • Disponibilités                                       │
│  • Statistiques performance                             │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 📅 Disponibilités

\`\`\`typescript
interface Availability {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // Sunday-Saturday
  startTime: string; // "08:00"
  endTime: string; // "18:00"
  isRecurring: boolean;
  exceptions: Date[]; // Jours fériés, congés
}
\`\`\`

---

## 6. Gestion Véhicules

### 🚗 Wizard Création (4 steps)

#### **Step 1: Informations**
- Plaque d'immatriculation
- Marque, modèle, année
- Catégorie (B, A1, A, C, D)
- VIN

#### **Step 2: Équipements**
- Double commande
- Rétroviseur intérieur
- Signalisation "Auto-école"
- Équipements obligatoires OAC Art. 65

#### **Step 3: Assurances**
- Compagnie d'assurance
- Numéro de police
- Date d'expiration
- Couverture

#### **Step 4: Résumé**
- Validation finale
- Création véhicule

### 📊 Fiche Détail Véhicule

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
│  • Photo véhicule                                       │
│  • Plaque, Marque, Modèle                               │
│  • Badges: Statut, Catégorie                            │
│  • Actions: Modifier, Maintenance, Planning             │
└─────────────────────────────────────────────────────────┘
│  TABS                                                   │
│  ┌─────────┬─────────┬─────────┬─────────┐             │
│  │Historic │   GPS   │  Coûts  │Analytics│             │
│  └─────────┴─────────┴─────────┴─────────┘             │
│                                                         │
│  TAB CONTENT                                            │
│  • Historique maintenance                               │
│  • Tracking GPS temps réel                              │
│  • Coûts carburant, entretien                           │
│  • Analytics utilisation, ROI                           │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 🔧 Conformité OAC

**Art. 65-68 OAC** : Équipements obligatoires
- Double commande (pédale frein + embrayage)
- Rétroviseur intérieur supplémentaire
- Signalisation "Auto-école" (triangle bleu)
- Contrôle technique à jour
- Assurance RC professionnelle

---

## 7. Planning & Réservations

### 📅 Calendar Views

- **Month View** : Vue mensuelle globale
- **Week View** : Vue hebdomadaire détaillée
- **Day View** : Vue journalière par heure
- **Agenda View** : Liste chronologique

### 🎯 Types de leçons

#### **Leçons pratiques**
- Durée: 45, 90, 135 minutes
- 1 élève + 1 moniteur + 1 véhicule
- Réservation à l'avance
- Annulation possible (24h avant)

#### **Cours théoriques**
- Durée: 120 minutes
- Groupe: 5-15 élèves
- 1 moniteur + 1 salle
- Thèmes obligatoires (8h total)

#### **Cours sensibilisation**
- Durée: 2 jours (16h)
- Groupe: 8-12 élèves
- 2 moniteurs agréés
- Obligatoire avant examen pratique

### 🔄 Drag & Drop

\`\`\`typescript
// Déplacer une leçon
const handleDrop = (lesson: Lesson, newDate: Date, newTime: string) => {
  // 1. Vérifier disponibilités
  const isInstructorAvailable = checkInstructorAvailability(
    lesson.instructorId,
    newDate,
    newTime
  );
  
  const isVehicleAvailable = checkVehicleAvailability(
    lesson.vehicleId,
    newDate,
    newTime
  );
  
  // 2. Détecter conflits
  const conflicts = detectConflicts(lesson, newDate, newTime);
  
  if (conflicts.length > 0) {
    showConflictDialog(conflicts);
    return;
  }
  
  // 3. Mettre à jour
  updateLesson(lesson.id, { date: newDate, startTime: newTime });
};
\`\`\`

---

## 8. Facturation & Paiements

### 💰 QR-Bill Suisse

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  FACTURE N° 2025-001                                    │
│  Date: 15.01.2025                                       │
│  Échéance: 30.01.2025                                   │
├─────────────────────────────────────────────────────────┤
│  ÉLÈVE                                                  │
│  Jean Dupont                                            │
│  Rue de la Gare 12                                      │
│  1003 Lausanne                                          │
├─────────────────────────────────────────────────────────┤
│  PRESTATIONS                                            │
│  • Leçon pratique 90 min x 10    CHF 1'200.00          │
│  • Cours théorique 120 min x 4   CHF   400.00          │
│  • Cours sensibilisation 2 jours CHF   300.00          │
│                                                         │
│  Sous-total:                     CHF 1'900.00          │
│  TVA 7.7%:                       CHF   146.30          │
│  TOTAL:                          CHF 2'046.30          │
├─────────────────────────────────────────────────────────┤
│  QR-BILL                                                │
│  ┌─────────────┐                                        │
│  │             │  Référence: RF18 5390 0754 7034 3      │
│  │   QR CODE   │  IBAN: CH44 3000 0001 2345 6789 0      │
│  │             │  Montant: CHF 2'046.30                 │
│  └─────────────┘                                        │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 💳 Méthodes de paiement

- **Espèces** : Paiement comptant
- **Carte bancaire** : Terminal POS
- **Virement bancaire** : IBAN suisse
- **QR-Bill** : Scan & pay mobile
- **Twint** : Paiement mobile suisse

### 📊 Import Camt.054

\`\`\`xml
<!-- Format Camt.054 (Bank-to-Customer Debit Credit Notification) -->
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.054.001.04">
  <BkToCstmrDbtCdtNtfctn>
    <Ntfctn>
      <Ntry>
        <Amt Ccy="CHF">2046.30</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Sts>BOOK</Sts>
        <BookgDt>
          <Dt>2025-01-20</Dt>
        </BookgDt>
        <NtryDtls>
          <TxDtls>
            <Refs>
              <EndToEndId>RF18539007547034</EndToEndId>
            </Refs>
          </TxDtls>
        </NtryDtls>
      </Ntry>
    </Ntfctn>
  </BkToCstmrDbtCdtNtfctn>
</Document>
\`\`\`

---

## 9. Analytics & Reporting

### 📊 Dashboards

#### **Performance Moniteurs**
- Taux de réussite examens
- Satisfaction élèves (1-5 ⭐)
- Heures enseignées
- Revenus générés
- Catégories expertise

#### **Utilisation Véhicules**
- Taux d'utilisation (%)
- Kilométrage
- Coûts maintenance
- Consommation carburant
- ROI par véhicule

#### **Analytics Financières**
- Revenus mensuels (MRR)
- Marge brute
- Cash-flow
- Prévisions ML
- Ratios financiers

#### **Examens**
- Taux de réussite global
- Taux par moniteur
- Taux par catégorie
- Analyse échecs
- Recommandations

### 📈 Charts

- **Line Charts** : Évolution temporelle
- **Bar Charts** : Comparaisons
- **Pie Charts** : Répartitions
- **Radar Charts** : Profils multi-dimensionnels
- **Heatmaps** : Disponibilités

---

## 10. RGPD Compliance

### 🔒 Consent Management

\`\`\`typescript
interface Consent {
  id: string;
  userId: string;
  type: ConsentType; // marketing, analytics, profiling
  status: 'granted' | 'denied' | 'pending';
  grantedAt?: Date;
  revokedAt?: Date;
  expiresAt?: Date;
}
\`\`\`

### 📋 Data Subject Requests

- **Access** : Droit d'accès aux données
- **Rectification** : Droit de rectification
- **Erasure** : Droit à l'oubli
- **Portability** : Droit à la portabilité
- **Objection** : Droit d'opposition

### 🔍 Audit Logs

\`\`\`typescript
interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  action: string; // create, read, update, delete
  resource: string; // students, invoices, etc.
  resourceId: string;
  changes?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
}
\`\`\`

---

## 📚 Ressources

- [OAC - Ordonnance sur l'admission à la circulation](https://www.admin.ch/opc/fr/classified-compilation/19950165/index.html)
- [OMCo - Ordonnance sur les moniteurs de conduite](https://www.admin.ch/opc/fr/classified-compilation/20051369/index.html)
- [RGPD - Règlement général sur la protection des données](https://eur-lex.europa.eu/eli/reg/2016/679/oj)

---

**Prochaine section**: [04 - API Reference](./04-api-reference.md)
`;

export default featuresDoc;
