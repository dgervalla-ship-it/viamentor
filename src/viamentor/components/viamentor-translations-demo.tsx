/**
 * VIAMENTOR Translations Demo Component
 *
 * Composant de démonstration des traductions i18n
 * Respecte le standard Clean Code : < 200 lignes
 *
 * @module components/viamentor-translations-demo
 * @version 1.0.0
 */

import { Trans } from "@/viamentor/components/viamentor-locale-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Sections de traductions à afficher
 */
const TRANSLATION_SECTIONS = [
  {
    key: "common",
    items: ["welcome", "login", "logout", "save", "cancel", "delete"],
  },
  {
    key: "navigation",
    items: ["dashboard", "students", "instructors", "lessons"],
  },
] as const;

/**
 * Composant de démonstration des traductions
 *
 * @example
 * ```tsx
 * <TranslationsDemo />
 * ```
 */
export function TranslationsDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traductions</CardTitle>
        <CardDescription>Exemples de traductions contextuelles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {TRANSLATION_SECTIONS.map(({ key, items }) => (
            <div key={key} className="space-y-2">
              <p className="text-sm font-medium capitalize">{key}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {items.map((item) => (
                  <div key={item} className="p-2 bg-muted rounded-md">
                    <p className="text-xs text-muted-foreground">{item}</p>
                    <p className="text-sm font-medium">
                      <Trans k={`${key}.${item}`} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
