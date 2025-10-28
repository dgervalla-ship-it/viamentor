/**
 * VIAMENTOR - ARCHITECTURE PARTIE 5/6
 * Guide de Migration Viamentor → Next.js 15
 */

export const MIGRATION_MAPPING = {
  // Viamentor → Next.js
  pages: {
    from: "viamentor/pages/viamentor-students-page",
    to: "app/[locale]/[tenant]/(management)/students/page.tsx",
    changes: [
      "Remove React Router imports",
      "Add 'use client' if needed",
      "Use Server Components by default",
      "Replace useNavigate with Link",
    ],
  },
  components: {
    from: "viamentor/components/viamentor-students-table",
    to: "components/tables/students-table.tsx",
    changes: [
      "Keep as is (already compatible)",
      "Add 'use client' if interactive",
      "Update imports to @/",
    ],
  },
  layouts: {
    from: "viamentor/layouts/viamentor-main-layout",
    to: "app/[locale]/[tenant]/layout.tsx",
    changes: [
      "Convert to Next.js Layout",
      "Add metadata export",
      "Add loading/error handling",
      "Remove React Router",
    ],
  },
  data: {
    from: "viamentor/data/viamentor-students-data",
    to: "lib/data/students.ts",
    changes: [
      "Keep types as is",
      "Move mock data to seed.ts",
      "Create Prisma queries",
    ],
  },
};

export const STEP_BY_STEP = [
  {
    phase: "1. Setup (Semaine 1)",
    tasks: [
      "npx create-next-app@latest viamentor-nextjs",
      "Setup Supabase project",
      "Setup Prisma schema",
      "Configure Tailwind + Shadcn",
      "Setup i18n (next-intl)",
    ],
  },
  {
    phase: "2. Components (Semaine 1-2)",
    tasks: [
      "Copy components/ to src/components/",
      "Add 'use client' where needed",
      "Update imports to @/",
      "Test in Storybook",
    ],
  },
  {
    phase: "3. Layouts (Semaine 2)",
    tasks: [
      "Create root layout",
      "Create tenant layout",
      "Add metadata",
      "Add loading/error states",
    ],
  },
  {
    phase: "4. Pages (Semaine 3-8)",
    tasks: [
      "Convert pages one by one",
      "Start with simple pages",
      "Add Server Actions",
      "Test each page",
    ],
  },
  {
    phase: "5. Database (Semaine 9-10)",
    tasks: [
      "Finalize Prisma schema",
      "Create migrations",
      "Seed database",
      "Replace mock data",
    ],
  },
];

export default { MIGRATION_MAPPING, STEP_BY_STEP };
