/**
 * VIAMENTOR - Guide Routing & Navigation
 * Guide complet du système de routing React Router avec conventions et best practices
 */

// ============================================================================
// TABLE DES MATIÈRES
// ============================================================================

/**
 * 1. Vue d'ensemble du système de routing
 * 2. Structure des routes
 * 3. Conventions de nommage des routes
 * 4. Navigation entre pages
 * 5. Paramètres de route
 * 6. Query parameters
 * 7. Navigation contextuelle
 * 8. Redirections
 * 9. Guards et protection de routes
 * 10. Best practices
 * 11. Exemples complets
 * 12. Troubleshooting
 */

// ============================================================================
// 1. VUE D'ENSEMBLE DU SYSTÈME DE ROUTING
// ============================================================================

/**
 * Viamentor utilise React Router v6 pour la gestion du routing.
 * 
 * Architecture:
 * - 1 prototype principal: viamentor-system-prototype
 * - 150+ routes définies
 * - Navigation RBAC avec permissions par rôle
 * - Layouts appliqués au niveau du prototype
 * - Pages indépendantes des layouts
 */

// ============================================================================
// 2. STRUCTURE DES ROUTES
// ============================================================================

/**
 * Structure standard d'une route dans le prototype:
 */

// Route simple
<Route 
  path="/students" 
  element={
    <ViamentorMainLayout>
      <StudentsPage />
    </ViamentorMainLayout>
  } 
/>

// Route avec paramètre
<Route 
  path="/students/:id" 
  element={
    <ViamentorMainLayout>
      <StudentDetailPage />
    </ViamentorMainLayout>
  } 
/>

// Route avec redirection
<Route 
  path="/dashboard" 
  element={<Navigate to="/school/dashboard" replace />} 
/>

/**
 * IMPORTANT: Les layouts sont TOUJOURS appliqués dans le prototype,
 * JAMAIS dans le code principal de la page.
 */

// ============================================================================
// 3. CONVENTIONS DE NOMMAGE DES ROUTES
// ============================================================================

/**
 * Règles de nommage des routes:
 * 
 * 1. Utiliser kebab-case
 * 2. Utiliser le pluriel pour les listes
 * 3. Utiliser le singulier pour les détails
 * 4. Utiliser des verbes anglais pour les actions
 * 5. Grouper par domaine fonctionnel
 */

// ✅ CORRECT
const ROUTE_CONVENTIONS = {
  // Listes (pluriel)
  students: "/students",
  instructors: "/instructors",
  vehicles: "/vehicles",
  lessons: "/lessons",
  exams: "/exams",
  theoryCourses: "/theory-courses",

  // Détails (singulier avec :id)
  studentDetail: "/students/:id",
  instructorDetail: "/instructors/:id",
  vehicleDetail: "/vehicles/:id",
  lessonDetail: "/lessons/:id",
  examDetail: "/exams/:id",
  theoryCourseDetail: "/theory-courses/:id",

  // Actions (verbes anglais)
  bookLesson: "/lessons/book",
  bookExam: "/exams/book",
  bookTheoryCourse: "/theory-courses/book",
  evaluateLesson: "/instructor/lessons/:lessonId/evaluate",

  // Groupement par domaine
  schoolDashboard: "/school/dashboard",
  instructorDashboard: "/instructor/dashboard",
  studentDashboard: "/student/dashboard",

  // Analytics groupées
  analytics: "/analytics",
  instructorsAnalytics: "/analytics/instructors", // ❌ Ancienne route
  vehiclesAnalytics: "/analytics/vehicles", // ❌ Ancienne route
  examsAnalytics: "/analytics/exams", // ❌ Ancienne route

  // Settings groupés
  settings: "/settings",
  pricingSettings: "/settings/pricing",
  notificationsSettings: "/settings/notifications",
  courseTypesSettings: "/settings/course-types",
};

// ❌ INCORRECT
const BAD_ROUTES = {
  // Pas de kebab-case
  studentList: "/studentList", // ❌ Utiliser /students
  
  // Pas de pluriel pour listes
  student: "/student", // ❌ Utiliser /students
  
  // Pas de singulier pour détails
  students: "/students/:id", // ❌ Route correcte mais nom trompeur
  
  // Verbes français
  reserverLecon: "/lessons/reserver", // ❌ Utiliser /lessons/book
  
  // Pas de groupement
  schoolAdminDashboard: "/school-admin-dashboard", // ❌ Utiliser /school/dashboard
};

// ============================================================================
// 4. NAVIGATION ENTRE PAGES
// ============================================================================

/**
 * Utiliser le composant <Link> de React Router pour la navigation.
 * NE JAMAIS utiliser <a> pour la navigation interne.
 */

import { Link } from "react-router-dom";

// ✅ CORRECT - Navigation avec Link
function StudentCard({ student }: { student: Student }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{student.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link 
          to={`/students/${student.id}`}
          className="text-primary hover:underline"
        >
          Voir le profil
        </Link>
      </CardContent>
    </Card>
  );
}

// ❌ INCORRECT - Ne pas utiliser <a>
function BadStudentCard({ student }: { student: Student }) {
  return (
    <Card>
      <a href={`/students/${student.id}`}>❌ Mauvais</a>
    </Card>
  );
}

/**
 * Utiliser useNavigate pour la navigation programmatique.
 */

import { useNavigate } from "react-router-dom";

function CreateStudentForm() {
  const navigate = useNavigate();

  const handleSubmit = async (data: StudentFormData) => {
    const newStudent = await createStudent(data);
    // Navigation après création
    navigate(`/students/${newStudent.id}`);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// ============================================================================
// 5. PARAMÈTRES DE ROUTE
// ============================================================================

/**
 * Utiliser useParams pour récupérer les paramètres de route.
 * TOUJOURS fournir une valeur par défaut.
 */

import { useParams } from "react-router-dom";

function StudentDetailPage() {
  // ✅ CORRECT - Avec valeur par défaut
  const { id = "" } = useParams<{ id: string }>();

  if (!id) {
    return <div>ID élève manquant</div>;
  }

  return <div>Détail élève {id}</div>;
}

// ❌ INCORRECT - Sans valeur par défaut
function BadStudentDetailPage() {
  const { id } = useParams(); // ❌ Peut être undefined
  return <div>Détail élève {id}</div>;
}

/**
 * Paramètres multiples
 */

function LessonEvaluationPage() {
  const { lessonId = "", studentId = "" } = useParams<{
    lessonId: string;
    studentId: string;
  }>();

  return (
    <div>
      Évaluation leçon {lessonId} pour élève {studentId}
    </div>
  );
}

// ============================================================================
// 6. QUERY PARAMETERS
// ============================================================================

/**
 * Utiliser useSearchParams pour gérer les query parameters.
 * Utile pour filtres, pagination, tri, vues multiples.
 */

import { useSearchParams } from "react-router-dom";

function StudentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lecture des query params
  const view = searchParams.get("view") || "table";
  const status = searchParams.get("status") || "all";
  const page = parseInt(searchParams.get("page") || "1");

  // Modification des query params
  const handleViewChange = (newView: "table" | "grid") => {
    setSearchParams({ ...Object.fromEntries(searchParams), view: newView });
  };

  const handleStatusFilter = (newStatus: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), status: newStatus });
  };

  return (
    <div>
      <Button onClick={() => handleViewChange("table")}>Table</Button>
      <Button onClick={() => handleViewChange("grid")}>Grille</Button>
      
      <Select onValueChange={handleStatusFilter}>
        <SelectItem value="all">Tous</SelectItem>
        <SelectItem value="active">Actifs</SelectItem>
        <SelectItem value="inactive">Inactifs</SelectItem>
      </Select>
    </div>
  );
}

/**
 * Service utilitaire pour query params (voir viamentor-url-query-params)
 */

import { useQueryParams } from "@/viamentor/data/viamentor-url-query-params";

function InvoicesListPage() {
  const { params, updateParam, updateParams } = useQueryParams({
    view: "table",
    status: "all",
    page: "1",
  });

  return (
    <div>
      <Button onClick={() => updateParam("view", "cards")}>
        Vue Cartes
      </Button>
    </div>
  );
}

// ============================================================================
// 7. NAVIGATION CONTEXTUELLE
// ============================================================================

/**
 * Utiliser le service de navigation contextuelle pour naviguer entre entités.
 * (voir viamentor-contextual-navigation)
 */

import { useContextualNavigation } from "@/viamentor/data/viamentor-contextual-navigation";

function StudentDetailPage() {
  const { id = "" } = useParams();
  const navigation = useContextualNavigation("students", id);

  return (
    <div>
      {/* Barre de navigation contextuelle */}
      <ContextualNavigationBar navigation={navigation} />
      
      {/* Contenu de la page */}
      <div>Détail élève {id}</div>
    </div>
  );
}

// ============================================================================
// 8. REDIRECTIONS
// ============================================================================

/**
 * Utiliser <Navigate> pour les redirections déclaratives.
 */

import { Navigate } from "react-router-dom";

// Redirection simple
<Route path="/dashboard" element={<Navigate to="/school/dashboard" replace />} />

// Redirection conditionnelle
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

/**
 * Utiliser navigate() pour les redirections programmatiques.
 */

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (credentials: LoginCredentials) => {
    await login(credentials);
    navigate("/school/dashboard", { replace: true });
  };

  return <form onSubmit={handleLogin}>...</form>;
}

// ============================================================================
// 9. GUARDS ET PROTECTION DE ROUTES
// ============================================================================

/**
 * Implémenter des guards pour protéger les routes selon les rôles.
 */

function RBACGuard({ 
  children, 
  allowedRoles 
}: { 
  children: ReactNode; 
  allowedRoles: UserRole[] 
}) {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

// Utilisation dans le prototype
<Route 
  path="/super-admin" 
  element={
    <RBACGuard allowedRoles={["super_admin"]}>
      <ViamentorMainLayout>
        <SuperAdminPage />
      </ViamentorMainLayout>
    </RBACGuard>
  } 
/>

// ============================================================================
// 10. BEST PRACTICES
// ============================================================================

/**
 * ✅ DO
 */

// 1. Utiliser Link pour navigation interne
<Link to="/students">Liste des élèves</Link>

// 2. Utiliser Navigate pour redirections
<Navigate to="/school/dashboard" replace />

// 3. Fournir valeurs par défaut pour useParams
const { id = "" } = useParams();

// 4. Grouper routes par domaine
"/school/dashboard"
"/instructor/dashboard"
"/student/dashboard"

// 5. Utiliser query params pour filtres
"/students?status=active&view=grid"

// 6. Appliquer layouts dans prototype uniquement
<Route path="/students" element={<Layout><Page /></Layout>} />

// 7. Utiliser kebab-case pour routes
"/theory-courses"

// 8. Utiliser pluriel pour listes
"/students"

// 9. Utiliser singulier pour détails
"/students/:id"

// 10. Utiliser verbes anglais pour actions
"/lessons/book"

/**
 * ❌ DON'T
 */

// 1. Ne pas utiliser <a> pour navigation interne
<a href="/students">❌</a>

// 2. Ne pas utiliser window.location
window.location.href = "/students"; // ❌

// 3. Ne pas oublier valeurs par défaut
const { id } = useParams(); // ❌ Peut être undefined

// 4. Ne pas importer layouts dans pages
import { Layout } from "@/viamentor/layouts/main-layout"; // ❌

// 5. Ne pas utiliser camelCase pour routes
"/studentList" // ❌

// 6. Ne pas utiliser singulier pour listes
"/student" // ❌

// 7. Ne pas utiliser pluriel pour détails
"/students/:id" // ✅ Route OK mais nom variable trompeur

// 8. Ne pas utiliser verbes français
"/lessons/reserver" // ❌

// 9. Ne pas créer routes non groupées
"/school-admin-dashboard" // ❌

// 10. Ne pas utiliser navigate() sans raison
// Préférer <Link> pour navigation utilisateur

// ============================================================================
// 11. EXEMPLES COMPLETS
// ============================================================================

/**
 * Exemple 1: Page liste avec filtres et navigation
 */

function StudentsListExample() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const view = searchParams.get("view") || "table";
  const status = searchParams.get("status") || "all";

  const handleStudentClick = (studentId: string) => {
    navigate(`/students/${studentId}`);
  };

  const handleViewChange = (newView: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), view: newView });
  };

  return (
    <div>
      <div className="flex gap-2">
        <Button onClick={() => handleViewChange("table")}>Table</Button>
        <Button onClick={() => handleViewChange("grid")}>Grille</Button>
      </div>

      {view === "table" ? (
        <StudentsTable onRowClick={handleStudentClick} />
      ) : (
        <StudentsGrid onCardClick={handleStudentClick} />
      )}
    </div>
  );
}

/**
 * Exemple 2: Page détail avec navigation contextuelle
 */

function StudentDetailExample() {
  const { id = "" } = useParams<{ id: string }>();
  const navigation = useContextualNavigation("students", id);

  if (!id) {
    return <Navigate to="/students" replace />;
  }

  return (
    <div>
      <ContextualNavigationBar 
        navigation={navigation}
        entityName="Élève"
      />

      <StudentDetailHeader studentId={id} />
      <StudentDetailTabs studentId={id} />
    </div>
  );
}

/**
 * Exemple 3: Wizard avec navigation programmatique
 */

function CreateStudentWizardExample() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const handleComplete = async (data: StudentFormData) => {
    const newStudent = await createStudent(data);
    navigate(`/students/${newStudent.id}`, { 
      state: { fromWizard: true } 
    });
  };

  const handleCancel = () => {
    navigate("/students");
  };

  return (
    <Wizard
      currentStep={currentStep}
      onStepChange={setCurrentStep}
      onComplete={handleComplete}
      onCancel={handleCancel}
    />
  );
}

// ============================================================================
// 12. TROUBLESHOOTING
// ============================================================================

/**
 * Problème: Page blanche après navigation
 * Solution: Vérifier que la route existe dans le prototype
 */

// ✅ Vérifier dans viamentor-system-prototype
<Route path="/students" element={<Layout><StudentsPage /></Layout>} />

/**
 * Problème: Duplicate layout (header/sidebar en double)
 * Solution: Retirer import layout du code principal de la page
 */

// ❌ INCORRECT - Dans le code principal de la page
import { Layout } from "@/viamentor/layouts/main-layout";
export function StudentsPage() {
  return <Layout>...</Layout>; // ❌
}

// ✅ CORRECT - Layout uniquement dans prototype
export function StudentsPage() {
  return <div>...</div>; // ✅
}

/**
 * Problème: useParams retourne undefined
 * Solution: Fournir valeur par défaut
 */

// ❌ INCORRECT
const { id } = useParams();

// ✅ CORRECT
const { id = "" } = useParams();

/**
 * Problème: Query params ne se mettent pas à jour
 * Solution: Utiliser setSearchParams correctement
 */

// ❌ INCORRECT
setSearchParams({ view: "grid" }); // Écrase tous les params

// ✅ CORRECT
setSearchParams({ 
  ...Object.fromEntries(searchParams), 
  view: "grid" 
});

/**
 * Problème: Navigation ne fonctionne pas
 * Solution: Vérifier que vous utilisez Link et non <a>
 */

// ❌ INCORRECT
<a href="/students">Liste</a>

// ✅ CORRECT
<Link to="/students">Liste</Link>

/**
 * Problème: Route avec paramètre ne match pas
 * Solution: Vérifier le pattern de la route
 */

// ❌ INCORRECT
<Route path="/students/id" /> // Pas de :

// ✅ CORRECT
<Route path="/students/:id" />

// ============================================================================
// RESSOURCES
// ============================================================================

/**
 * Fichiers de référence:
 * - @/viamentor/prototypes/viamentor-system-prototype
 * - @/viamentor/data/viamentor-url-query-params
 * - @/viamentor/data/viamentor-contextual-navigation
 * - @/viamentor/data/viamentor-navigation-config
 * - @/viamentor/data/viamentor-use-navigation
 * 
 * Documentation externe:
 * - React Router v6: https://reactrouter.com/
 */

export const ROUTING_GUIDE_VERSION = "1.0.0";
export const ROUTING_GUIDE_LAST_UPDATE = "2025-01-20";
