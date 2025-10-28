/**
 * ============================================================================
 * VIAMENTOR - Students Header (Migré vers nouveau système i18n)
 * ============================================================================
 *
 * Exemple de migration d'un composant vers le nouveau système i18n
 * avec namespaces centralisés
 */

import React from "react";
import { useLocale } from "@/viamentor/components/viamentor-locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon, FilterIcon, DownloadIcon } from "lucide-react";

/**
 * Props du composant
 */
interface StudentsHeaderMigratedProps {
  onCreateStudent?: () => void;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onExport?: () => void;
}

/**
 * Header de la page Students avec nouveau système i18n
 *
 * AVANT (ancien système):
 * ```tsx
 * const { t } = useLocale()
 * t("students.title") // ❌ Risque de collision
 * ```
 *
 * APRÈS (nouveau système):
 * ```tsx
 * const { tn } = useLocale()
 * tn("students", "title") // ✅ Namespace clair
 * ```
 */
export function StudentsHeaderMigrated({
  onCreateStudent,
  onSearch,
  onFilter,
  onExport,
}: StudentsHeaderMigratedProps) {
  // ✅ NOUVEAU: Utilisation de tn() avec namespace
  const { tn } = useLocale();

  return (
    <div className="space-y-4">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground">
          {/* ✅ NOUVEAU: tn("students", "title") */}
          {tn("students", "title")}
        </h1>
        <p className="text-muted-foreground">
          {/* ✅ NOUVEAU: tn("students", "subtitle") */}
          {tn("students", "subtitle")}
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            type="search"
            placeholder={tn("students", "filters.searchPlaceholder")}
            className="pl-9"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="default" onClick={onFilter}>
            <FilterIcon className="h-4 w-4 mr-2" />

            {/* ✅ NOUVEAU: tn("common", "actions.filter") */}
            {tn("common", "actions.filter")}
          </Button>

          <Button variant="outline" size="default" onClick={onExport}>
            <DownloadIcon className="h-4 w-4 mr-2" />

            {/* ✅ NOUVEAU: tn("common", "actions.export") */}
            {tn("common", "actions.export")}
          </Button>

          <Button size="default" onClick={onCreateStudent}>
            <PlusIcon className="h-4 w-4 mr-2" />

            {/* ✅ NOUVEAU: tn("students", "actions.createStudent") */}
            {tn("students", "actions.createStudent")}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * COMPARAISON AVANT/APRÈS
 * ============================================================================
 *
 * AVANT (ancien système):
 * ```tsx
 * import { STUDENTS_I18N } from "@/viamentor/data/viamentor-students-i18n"
 *
 * function StudentsHeader() {
 *   return (
 *     <div>
 *       <h1>{STUDENTS_I18N.fr.title}</h1>
 *       <Button>{STUDENTS_I18N.fr.createStudent}</Button>
 *     </div>
 *   )
 * }
 * ```
 *
 * Problèmes:
 * - ❌ Import manuel de chaque fichier i18n
 * - ❌ Pas de type-safety
 * - ❌ Risque de collision de clés
 * - ❌ Traductions dispersées
 *
 * APRÈS (nouveau système):
 * ```tsx
 * import { useLocale } from "@/viamentor/components/viamentor-locale-provider"
 *
 * function StudentsHeader() {
 *   const { tn } = useLocale()
 *
 *   return (
 *     <div>
 *       <h1>{tn("students", "title")}</h1>
 *       <Button>{tn("students", "actions.createStudent")}</Button>
 *     </div>
 *   )
 * }
 * ```
 *
 * Avantages:
 * - ✅ Un seul import (useLocale)
 * - ✅ Type-safety complet
 * - ✅ Zéro collision (namespaces)
 * - ✅ Traductions centralisées
 * - ✅ Autocomplétion IDE
 */
