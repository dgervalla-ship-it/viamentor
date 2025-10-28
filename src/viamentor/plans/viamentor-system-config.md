# Viamentor System Configuration

## User Request
Créer la configuration globale du système Viamentor (SaaS auto-école suisse multi-tenant) avec:
- Système de rôles RBAC complet (15 rôles hiérarchiques)
- Configuration thème UI personnalisable (Hero UI + Shadcn fallback)
- Système i18n FR/DE/IT/EN avec règles grammaticales strictes
- Architecture TypeScript strict, Clean Code, tests obligatoires

## Related Files
- @/viamentor/data/types/roles (to create) - UserRole enum + ROLE_MATRIX + permissions
- @/viamentor/data/config/theme-config (to create) - themeConfig + cssVariables + hook
- @/viamentor/data/config/i18n-config (to create) - locales + rules + translations + hook
- @/viamentor/components/theme-provider (to create) - Context provider pour thème
- @/viamentor/components/locale-provider (to create) - Context provider pour i18n

## TODO List
- [x] Créer types/roles.ts avec UserRole enum, ROLE_MATRIX, RolePermissions interface
- [x] Créer config/theme-config.ts avec themeConfig, cssVariables, useThemeCustomization hook
- [x] Créer config/i18n-config.ts avec locales, localeRules, getTranslations, useTypography hook
- [x] Créer theme-provider component pour gestion thème global
- [x] Créer locale-provider component pour gestion i18n
- [x] Créer page de démonstration système complet

## Important Notes
- **Architecture**: Monorepo structure (apps/web + apps/api + packages/)
- **Stack**: Next.js 15 + React 19 + NestJS + PostgreSQL 16 + Prisma + Redis
- **UI**: Hero UI prioritaire, fallback Shadcn/ui automatique
- **Clean Code**: 200-250 lignes max/fichier, SOLID, tests Vitest
- **i18n**: Règles grammaticales strictes par locale (FR espace avant :;!?, DE substantifs majuscules, etc.)
- **RBAC**: 15 rôles hiérarchiques avec matrice permissions complète
- **Sécurité**: RLS PostgreSQL, audit logs, middleware tenant
- **Standards**: TypeScript strict, ESLint, Prettier, Husky, JSDoc, WCAG AA
  
## Plan Information
*This plan is created when the project is at iteration 0, and date 2025-10-13T11:26:58.406Z*
