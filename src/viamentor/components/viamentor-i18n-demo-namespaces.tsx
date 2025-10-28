/**
 * ============================================================================
 * VIAMENTOR - Démonstration i18n avec Namespaces
 * ============================================================================
 *
 * Exemples d'utilisation du nouveau système i18n centralisé
 */

import React from "react";
import {
  useLocale,
  Trans,
} from "@/viamentor/components/viamentor-locale-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2Icon, XCircleIcon, CodeIcon } from "lucide-react";

/**
 * Composant de démonstration
 */
export function I18nDemoNamespaces() {
  const { tn, i18n, currentLocale } = useLocale();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">
            Nouveau Système i18n avec Namespaces
          </h2>
          <Badge variant="default">v2.0</Badge>
        </div>
        <p className="text-muted-foreground">
          Démonstration du système centralisé avec namespaces
        </p>
      </div>

      {/* Avantages */}
      <Card>
        <CardHeader>
          <CardTitle>✅ Avantages</CardTitle>
          <CardDescription>Pourquoi utiliser les namespaces ?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2Icon className="h-5 w-5 text-green-600 mt-0.5" />

            <div>
              <p className="font-medium text-foreground">
                Zéro collision de clés
              </p>
              <p className="text-sm text-muted-foreground">
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  common.save
                </code>{" "}
                vs{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  students.save
                </code>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2Icon className="h-5 w-5 text-green-600 mt-0.5" />

            <div>
              <p className="font-medium text-foreground">Type-safe à 100%</p>
              <p className="text-sm text-muted-foreground">
                Autocomplétion et détection d'erreurs au build
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2Icon className="h-5 w-5 text-green-600 mt-0.5" />

            <div>
              <p className="font-medium text-foreground">Maintenabilité</p>
              <p className="text-sm text-muted-foreground">
                Toutes les traductions centralisées dans un seul fichier
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2Icon className="h-5 w-5 text-green-600 mt-0.5" />

            <div>
              <p className="font-medium text-foreground">Scalabilité</p>
              <p className="text-sm text-muted-foreground">
                Ajout facile de nouvelles langues et modules
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exemples d'utilisation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CodeIcon className="h-5 w-5" />
            Exemples d'utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Exemple 1: Hook tn() */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">
              1. Hook useLocale() avec tn()
            </h3>
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <code className="text-xs text-muted-foreground">
                const &#123; tn &#125; = useLocale()
              </code>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="space-y-1">
                  <code className="text-xs text-muted-foreground">
                    tn("common", "actions.save")
                  </code>
                  <p className="text-sm text-foreground font-medium">
                    → {tn("common", "actions.save")}
                  </p>
                </div>
                <div className="space-y-1">
                  <code className="text-xs text-muted-foreground">
                    tn("students", "actions.createStudent")
                  </code>
                  <p className="text-sm text-foreground font-medium">
                    → {tn("students", "actions.createStudent")}
                  </p>
                </div>
                <div className="space-y-1">
                  <code className="text-xs text-muted-foreground">
                    tn("students", "count.other", &#123; count: 5 &#125;)
                  </code>
                  <p className="text-sm text-foreground font-medium">
                    → {tn("students", "count.other", { count: 5 })}
                  </p>
                </div>
                <div className="space-y-1">
                  <code className="text-xs text-muted-foreground">
                    tn("instructors", "count.other", &#123; count: 12 &#125;)
                  </code>
                  <p className="text-sm text-foreground font-medium">
                    → {tn("instructors", "count.other", { count: 12 })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Exemple 2: Composant Trans */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">
              2. Composant &lt;Trans /&gt;
            </h3>
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <code className="text-xs text-muted-foreground">
                &lt;Trans namespace="common" k="actions.save" /&gt;
              </code>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="space-y-1">
                  <p className="text-sm text-foreground font-medium">
                    <Trans namespace="common" k="actions.save" />
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-foreground font-medium">
                    <Trans namespace="students" k="actions.createStudent" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Exemple 3: Accès direct i18n */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">
              3. Accès direct i18n
            </h3>
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <code className="text-xs text-muted-foreground">
                const &#123; i18n &#125; = useLocale()
              </code>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="space-y-1">
                  <code className="text-xs text-muted-foreground">
                    i18n.common.actions.save
                  </code>
                  <p className="text-sm text-foreground font-medium">
                    → {i18n.common.actions.save}
                  </p>
                </div>
                <div className="space-y-1">
                  <code className="text-xs text-muted-foreground">
                    i18n.students.title
                  </code>
                  <p className="text-sm text-foreground font-medium">
                    → {i18n.students.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Namespaces disponibles */}
      <Card>
        <CardHeader>
          <CardTitle>📦 Namespaces disponibles</CardTitle>
          <CardDescription>Modules actuellement implémentés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.keys(i18n).map((namespace) => (
              <div
                key={namespace}
                className="rounded-lg border border-border bg-card p-3 text-center"
              >
                <p className="font-medium text-card-foreground capitalize">
                  {namespace}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Object.keys(i18n[namespace as keyof typeof i18n]).length}{" "}
                  clés
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparaison Avant/Après */}
      <Card>
        <CardHeader>
          <CardTitle>🔄 Comparaison Avant/Après</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Avant */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <XCircleIcon className="h-4 w-4 text-red-600" />

                <h3 className="font-semibold text-foreground">
                  Avant (dispersé)
                </h3>
              </div>
              <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-3 space-y-2">
                <code className="text-xs text-muted-foreground block">
                  // Dans viamentor-students-i18n.ts
                </code>
                <code className="text-xs text-muted-foreground block">
                  export const STUDENTS_I18N = &#123;
                </code>
                <code className="text-xs text-muted-foreground block ml-4">
                  save: "Enregistrer", // ❌ Collision
                </code>
                <code className="text-xs text-muted-foreground block ml-4">
                  createStudent: "Créer un élève"
                </code>
                <code className="text-xs text-muted-foreground block">
                  &#125;
                </code>
              </div>
            </div>

            {/* Après */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2Icon className="h-4 w-4 text-green-600" />

                <h3 className="font-semibold text-foreground">
                  Après (centralisé)
                </h3>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3 space-y-2">
                <code className="text-xs text-muted-foreground block">
                  // Dans viamentor-i18n-locales-fr.ts
                </code>
                <code className="text-xs text-muted-foreground block">
                  export const students = &#123;
                </code>
                <code className="text-xs text-muted-foreground block ml-4">
                  actions: &#123;
                </code>
                <code className="text-xs text-muted-foreground block ml-8">
                  createStudent: "Créer un élève"
                </code>
                <code className="text-xs text-muted-foreground block ml-4">
                  &#125;
                </code>
                <code className="text-xs text-muted-foreground block">
                  &#125;
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button>
          <Trans namespace="common" k="actions.save" />
        </Button>
        <Button variant="outline">
          <Trans namespace="students" k="actions.createStudent" />
        </Button>
        <Button variant="secondary">
          <Trans namespace="instructors" k="actions.createInstructor" />
        </Button>
      </div>
    </div>
  );
}
