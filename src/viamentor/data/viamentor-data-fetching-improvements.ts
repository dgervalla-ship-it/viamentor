/**
 * ============================================================================
 * VIAMENTOR - DATA FETCHING IMPROVEMENTS
 * ============================================================================
 *
 * Score actuel: 7/10
 * Score cible: 9/10
 *
 * Recommandations pour améliorer le data fetching
 */

// ============================================================================
// 1. SERVER COMPONENTS (HIGH - 3 jours) - +1.5 points
// ============================================================================

/**
 * ✅ RECOMMANDATION 1: Migrer vers Server Components
 *
 * BÉNÉFICES:
 * - Fetch server-side = HTML avec données au premier render
 * - SEO optimal (données dans HTML)
 * - Bundle JS réduit
 * - Pas de spinner initial
 */

export const serverComponentExample = `
// ============================================================================
// app/[locale]/[tenant]/students/page.tsx
// ✅ SERVER COMPONENT
// ============================================================================

import { getStudents } from "@/lib/api/students";
import { StudentsTable } from "./_components/students-table";

export default async function StudentsPage({ params, searchParams }) {
  // ✅ Fetch server-side (pas de useQuery ici)
  const students = await getStudents({
    tenantId: params.tenant,
    ...searchParams,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Élèves</h1>
      
      {/* Client Component avec initialData */}
      <StudentsTable initialData={students.data} />
    </div>
  );
}

// BÉNÉFICES:
// ✅ HTML avec données au premier render (pas de spinner)
// ✅ SEO optimal
// ✅ Bundle JS réduit
`;

export const clientComponentWithInitialData = `
// ============================================================================
// app/[locale]/[tenant]/students/_components/students-table.tsx
// 🔵 CLIENT COMPONENT avec initialData
// ============================================================================

"use client";

import { useQuery } from "@tanstack/react-query";
import { getStudents } from "@/lib/api/students";

export function StudentsTable({ initialData }) {
  // ✅ TanStack Query avec initialData du server
  const { data: students, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    initialData, // ✅ Pas de fetch initial
    staleTime: 5 * 60 * 1000,
  });

  return <DataTable data={students} onRefresh={refetch} />;
}

// BÉNÉFICES:
// ✅ Pas de spinner au premier render
// ✅ TanStack Query pour refetch/cache
// ✅ Meilleur des 2 mondes (SSR + interactivity)
`;

// ============================================================================
// 2. OPTIMISTIC UPDATES (HIGH - 2 jours) - +0.5 point
// ============================================================================

/**
 * ✅ RECOMMANDATION 2: Implémenter Optimistic Updates
 *
 * BÉNÉFICES:
 * - UI instantanée (0ms de latence perçue)
 * - Rollback automatique en cas d'erreur
 * - Toast "Undo" pour annuler
 */

export const optimisticUpdatesExample = `
// ============================================================================
// hooks/use-update-student.ts
// Hook mutation avec Optimistic Updates
// ============================================================================

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudent } from "@/lib/api/students";
import { toast } from "sonner";

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }) => updateStudent(id, updates),

    // ✅ OPTIMISTIC UPDATE
    onMutate: async ({ id, updates }) => {
      // 1. Cancel queries
      await queryClient.cancelQueries({ queryKey: ["students"] });

      // 2. Snapshot (pour rollback)
      const previous = queryClient.getQueryData(["students"]);

      // 3. Optimistic update (UI instantanée)
      queryClient.setQueryData(["students"], (old) =>
        old?.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );

      toast.success("Élève mis à jour");

      return { previous };
    },

    // ✅ ROLLBACK si erreur
    onError: (error, variables, context) => {
      queryClient.setQueryData(["students"], context.previous);
      toast.error("Erreur: " + error.message);
    },

    // ✅ CONFIRMATION serveur
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

// USAGE:
const { mutate } = useUpdateStudent();
mutate({ id: "123", updates: { name: "New Name" } });
// ✅ UI mise à jour instantanément (0ms)

// BÉNÉFICES:
// ✅ UI instantanée (0ms de latence perçue)
// ✅ Rollback automatique si erreur
// ✅ UX fluide et réactive
`;

export const optimisticUpdatesWithUndo = `
// ============================================================================
// hooks/use-delete-student.ts
// Hook mutation avec Optimistic Updates + Undo
// ============================================================================

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["students"] });
      
      const previous = queryClient.getQueryData(["students"]);

      // Optimistic delete
      queryClient.setQueryData(["students"], (old) =>
        old?.filter((s) => s.id !== id)
      );

      // ✅ Toast avec Undo (5 secondes)
      toast.success("Élève supprimé", {
        duration: 5000,
        action: {
          label: "Annuler",
          onClick: () => {
            queryClient.setQueryData(["students"], previous);
            toast.info("Suppression annulée");
          },
        },
      });

      return { previous };
    },

    onError: (error, id, context) => {
      queryClient.setQueryData(["students"], context.previous);
      toast.error("Erreur: " + error.message);
    },
  });
}

// BÉNÉFICES:
// ✅ Suppression instantanée
// ✅ Undo pendant 5 secondes
// ✅ UX rassurante
`;

// ============================================================================
// 3. PREFETCHING (MEDIUM - 1 jour) - +0.5 point
// ============================================================================

/**
 * ✅ RECOMMANDATION 3: Implémenter Prefetching
 *
 * BÉNÉFICES:
 * - Navigation instantanée (données déjà en cache)
 * - Anticipation des actions utilisateur
 * - Pas de spinner lors de navigation
 */

export const prefetchOnHoverExample = `
// ============================================================================
// components/students-table-row.tsx
// Prefetch au hover
// ============================================================================

"use client";

import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getStudent } from "@/lib/api/students";

export function StudentTableRow({ student }) {
  const queryClient = useQueryClient();

  // ✅ PREFETCH AU HOVER
  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ["students", student.id],
      queryFn: () => getStudent(student.id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return (
    <tr>
      <td>
        <Link
          to={\`/students/\${student.id}\`}
          onMouseEnter={handleMouseEnter} // ✅ Prefetch
        >
          {student.name}
        </Link>
      </td>
    </tr>
  );
}

// BÉNÉFICES:
// ✅ User hover → Prefetch data
// ✅ User clique → Render instantané
// ✅ Pas de spinner
`;

export const prefetchPaginationExample = `
// ============================================================================
// hooks/use-prefetch-navigation.ts
// Prefetch pages adjacentes
// ============================================================================

export function usePrefetchNavigation(currentPage) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Prefetch page suivante
    queryClient.prefetchQuery({
      queryKey: ["students", { page: currentPage + 1 }],
      queryFn: () => getStudents({ page: currentPage + 1 }),
    });

    // Prefetch page précédente
    if (currentPage > 1) {
      queryClient.prefetchQuery({
        queryKey: ["students", { page: currentPage - 1 }],
        queryFn: () => getStudents({ page: currentPage - 1 }),
      });
    }
  }, [currentPage, queryClient]);
}

// USAGE:
export function StudentsTable({ currentPage }) {
  usePrefetchNavigation(currentPage); // ✅ Prefetch
  return <DataTable ... />;
}

// BÉNÉFICES:
// ✅ Pagination instantanée
// ✅ Pas de spinner
`;

// ============================================================================
// 4. PLAN DE MIGRATION
// ============================================================================

export const migrationPlan = {
  phase1: {
    title: "Phase 1: Server Components (3 jours)",
    priority: "HIGH",
    impact: "+1.5 points",
    tasks: [
      "Setup Next.js App Router structure",
      "Créer API client Supabase",
      "Migrer Students page",
      "Migrer Instructors page",
      "Migrer Planning page",
    ],
  },

  phase2: {
    title: "Phase 2: Optimistic Updates (2 jours)",
    priority: "HIGH",
    impact: "+0.5 point",
    tasks: [
      "Créer hooks mutations avec optimistic updates",
      "Implémenter Undo/Redo avec toast",
      "Migrer toutes les mutations",
    ],
  },

  phase3: {
    title: "Phase 3: Prefetching (1 jour)",
    priority: "MEDIUM",
    impact: "+0.5 point",
    tasks: ["Implémenter prefetch au hover", "Implémenter prefetch pagination"],
  },

  totalDuration: "6 jours",
  totalImpact: "+2 points (7/10 → 9/10)",
};

// ============================================================================
// 5. MÉTRIQUES DE SUCCÈS
// ============================================================================

export const successMetrics = {
  current: {
    score: "7/10",
    avgLoadTime: "800ms",
    avgMutationTime: "500ms",
    seo: "0/100",
  },

  target: {
    score: "9/10",
    avgLoadTime: "200ms", // -75%
    avgMutationTime: "0ms", // -100% (optimistic)
    seo: "100/100",
  },
};

export default {
  serverComponentExample,
  clientComponentWithInitialData,
  optimisticUpdatesExample,
  optimisticUpdatesWithUndo,
  prefetchOnHoverExample,
  prefetchPaginationExample,
  migrationPlan,
  successMetrics,
};
