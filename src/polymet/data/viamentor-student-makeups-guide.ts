/**
 * VIAMENTOR - Student Makeups Interface Guide
 * Guide complet interface élève rattrapages
 */

export const STUDENT_MAKEUPS_GUIDE = `
# Interface Élève Rattrapages Viamentor

## Vue d'ensemble

Interface complète de gestion des rattrapages pour les élèves avec :
- Dashboard avec alert disponibles
- DataTable avec filtres et tri
- Wizard booking 2 steps
- Countdown temps réel
- Activation conditionnelle feature

## Architecture

### Fichiers créés

1. **data/viamentor-student-makeups-i18n** (250 lignes)
   - Traductions FR/DE/IT/EN complètes
   - Labels dashboard, table, wizard
   - Messages validation, erreurs, succès

2. **pages/viamentor-student-makeups-page** (100 lignes)
   - Page principale avec breadcrumb
   - Alert disponibles avec badge pulse
   - Activation conditionnelle feature flag
   - Integration DataTable

3. **components/viamentor-student-makeups-table** (240 lignes)
   - DataTable avec filtres statut
   - Tri par expiration/création
   - Countdown dynamique coloré
   - Badges raisons/statuts
   - Actions booking conditionnelles
   - Empty state éducatif

4. **components/viamentor-makeup-booking-wizard** (235 lignes)
   - Dialog fullscreen 2 steps
   - Step 1: Date/Time picker
   - Step 2: Confirmation summary
   - Context card leçon origine
   - Alert expiration proche
   - Validation disponibilités

5. **data/viamentor-makeups-data** (mis à jour)
   - Ajout statut "booked"
   - Mock crédits élève variés
   - Types complets

## Fonctionnalités

### 1. Activation conditionnelle

\`\`\`typescript
// Feature flag tenant
featureMakeupsEnabled?: boolean;

// Si désactivé, page non affichée
if (!featureMakeupsEnabled) {
  return null; // Ou redirect
}
\`\`\`

**Configuration école/moniteur/secrétaire** dans settings définit si feature visible élèves.

### 2. Dashboard élève

**Breadcrumb**: Dashboard > Mes rattrapages

**Alert disponibles**:
- Visible SEULEMENT si count > 0
- Badge orange pulse animation
- Message singulier/pluriel i18n
- Urgence visuelle scarcity psychology

**DataTable**:
- Colonnes: Date annulation, Leçon origine, Raison, Créé le, Expire dans, Statut, Actions
- Filtres: Statut (all/available/booked/used/expired/pending)
- Tri: Expiration ASC (urgent first) par défaut, DESC, Création ASC/DESC
- Pagination: 20/page
- Empty state: Illustration + message éducatif

### 3. Countdown dynamique

**Logique**:
\`\`\`typescript
const diff = expiry.getTime() - now.getTime();
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// Couleurs conditionnelles
if (days < 1) {
  variant = "destructive";
  className = "animate-pulse"; // Rouge pulsant
} else if (days < 3) {
  variant = "destructive"; // Rouge
} else if (days < 7) {
  className = "orange"; // Orange warning
}
\`\`\`

**Affichage**: "Dans 5j 3h" avec badge coloré

### 4. Badges raisons

**Couleurs sémantiques**:
- Maladie: Bleu (medical)
- Urgence familiale: Rouge (emergency)
- Météo: Orange (weather)
- Panne: Gris (other)
- Empêchement pro: Violet (professional)
- Autre: Gris (other)

**Visual recognition** rapide, cognitive load réduit.

### 5. Actions conditionnelles

**Logique**:
\`\`\`typescript
if (status === "available") {
  <Button onClick={handleBook}>Réserver</Button>
} else if (status === "booked") {
  <Button disabled>Réservé</Button>
} else if (status === "used") {
  <Button disabled>Utilisé</Button>
} else if (status === "expired") {
  <Button disabled title="Délai dépassé">Expiré</Button>
} else if (status === "pending") {
  <Button disabled title="En attente approbation">En attente</Button>
}
\`\`\`

**Tooltips** expliquent raison disable.

### 6. Wizard booking 2 steps

#### Step 1: Date & Heure

**Context card** (readonly, bg muted):
- Leçon annulée: Date format long + moniteur avatar + raison badge
- À remplacer avant: Date expiration orange

**Alert expiration** si < 3 jours:
- "⚠️ Attention : expire dans 2 jours"
- Orange, urgence, scarcity psychology

**DatePicker**:
- Inline calendar month view
- Dates disabled si < today OU > expiresAt
- Contrainte expiry enforce policy

**TimePicker**:
- Grid 4 colonnes, slots 15min
- Vert: Disponible (clickable)
- Gris: Occupé (disabled, tooltip "Occupé")
- Primaire pulse: Sélectionné
- Mock slots pour demo

**Validation**: Date ET time requis pour continuer

#### Step 2: Confirmation

**Summary Accordion** 3 sections collapsibles:

1. **Leçon origine**:
   - Date, Moniteur, Raison

2. **Nouvelle leçon**:
   - Date+heure format long
   - Moniteur avatar + nom
   - Véhicule plaque (si assigné)
   - Point RDV (si configuré)

3. **Crédit**:
   - "1 crédit rattrapage sera utilisé"
   - Badge "Gratuit" vert
   - Transparent, no hidden costs

**Checkbox** (checked, disabled):
- "Utiliser le crédit rattrapage"
- Mandatory, consume automatic

**Actions**:
- Retour: Step 1
- Confirmer: Loading state "Réservation...", spinner, API call simulation

**Success**:
- Toast confetti animation
- Message "Rattrapage réservé avec succès!"
- Redirect /student/dashboard ou /student/lessons
- Highlight new lesson card

### 7. Format dates

**Relative** (table):
- Aujourd'hui
- Hier
- Il y a 5j

**Absolute** (wizard):
- Format long: "lundi 15 janvier 2025"
- Locale-aware: FR/DE/IT/EN

### 8. Responsive

**Mobile**:
- Table → Cards view (à implémenter)
- Wizard fullscreen adapté
- Touch-friendly buttons

**Tablette/Desktop**:
- Table view optimale
- Wizard max-w-4xl centered

## API Integration (Backend)

### Endpoints requis

1. **GET /api/student/makeups**
   - Fetch crédits élève connecté
   - Filtres: status, dateRange
   - Tri: expiresAt ASC/DESC, createdAt ASC/DESC
   - Pagination: page, limit

2. **GET /api/instructors/:id/availability**
   - Fetch disponibilités moniteur
   - Params: date, category
   - Response: TimeSlot[] avec available boolean

3. **POST /api/lessons**
   - Create nouvelle leçon
   - Body: { makeupId, studentId, instructorId, datetime, duration, vehicleId?, status: 'confirmed' }
   - Response: Lesson created

4. **PATCH /api/makeups/:id**
   - Update statut crédit
   - Body: { status: 'used', usedAt: now, usedLessonId }
   - Response: Makeup updated

### WebSocket (optionnel)

**Real-time countdown**:
- Subscribe channel: \`student:{studentId}:makeups\`
- Event: \`makeup:expiring\` si < 24h
- Update UI countdown live

## Workflow complet

1. **Élève login** → Dashboard
2. **Si feature enabled** → Section "Rattrapages" visible sidebar
3. **Navigate** /student/makeups
4. **Alert** si disponibles > 0
5. **Table** affiche crédits triés expiration ASC
6. **Click "Réserver"** → Wizard open
7. **Step 1**: Select date (contrainte expiry) + time (check availability)
8. **Step 2**: Review summary + confirm
9. **API calls**: POST lesson + PATCH makeup
10. **Success**: Toast + redirect + highlight
11. **Refresh**: Table updated, alert updated

## UX Psychology

### Scarcity
- Countdown urgent colors
- Alert pulse animation
- "Expire dans X jours" prominent

### Transparency
- Context card leçon origine
- Summary accordion détaillé
- Badge "Gratuit" explicit

### Friction reduction
- 2 steps only (minimal)
- Calendar inline (no popup)
- Time slots grid (visual)
- Auto-select checkbox (mandatory)

### Feedback
- Loading states immediate
- Toast success confetti
- Tooltips disabled buttons
- Empty state educative

### Accessibility
- Semantic colors
- Tooltips explain
- Keyboard navigation
- Screen reader labels

## Clean Code

### Separation concerns
- Page: Layout + integration
- Table: Display + filters + actions
- Wizard: Booking flow
- i18n: Translations isolated
- Data: Types + mock

### Single responsibility
- ExpiryCountdown: Display countdown
- ReasonBadge: Display reason
- StatusBadge: Display status
- MakeupBookingWizard: Booking flow

### Reusability
- Badges components
- Countdown component
- Wizard steps modular

### Maintainability
- 200-250 lignes/fichier
- Comments JSDoc
- Types TypeScript strict
- Props interfaces clear

## Testing

### Unit tests
- Countdown logic
- Date filtering
- Status conditions
- i18n translations

### Integration tests
- Wizard flow complete
- API calls mocked
- Success/error scenarios

### E2E tests
- Login → Navigate → Book → Success
- Expiry constraints
- Availability checks

## Performance

### Optimizations
- useMemo filteredMakeups
- Lazy load wizard
- Debounce filters
- Pagination 20/page

### Bundle size
- Tree-shaking i18n
- Code splitting wizard
- Lazy components

## Security

### Authorization
- Feature flag tenant-level
- Student can only see own makeups
- API validates studentId token

### Validation
- Date constraints client + server
- Availability check server-side
- Expiry enforce policy

## Roadmap

### Phase 1 (Done)
- ✅ Dashboard page
- ✅ DataTable filtres/tri
- ✅ Wizard booking 2 steps
- ✅ i18n FR/DE/IT/EN
- ✅ Countdown dynamique

### Phase 2 (Future)
- ⏳ Mobile cards view
- ⏳ WebSocket real-time
- ⏳ Push notifications
- ⏳ Calendar integration
- ⏳ Email reminders

### Phase 3 (Future)
- ⏳ Analytics élève
- ⏳ Feedback post-rattrapage
- ⏳ Recommandations AI
- ⏳ Gamification badges

## Conclusion

Interface élève rattrapages Viamentor complète, production-ready, avec :
- UX optimisée conversion
- Psychology scarcity/transparency
- Clean Code architecture
- i18n 4 langues
- Activation conditionnelle
- Workflow complet 2 steps

**Ready for backend integration!** 🚀
`;

export default STUDENT_MAKEUPS_GUIDE;
