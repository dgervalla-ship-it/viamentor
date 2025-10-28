/**
 * VIAMENTOR Formats Demo Component
 *
 * Composant de démonstration des formats localisés
 * Respecte le standard Clean Code : < 200 lignes
 *
 * @module components/viamentor-formats-demo
 * @version 1.0.0
 */

import {
  useLocale,
  FormatCurrency,
} from "@/polymet/components/viamentor-locale-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Composant de démonstration des formats
 *
 * @example
 * ```tsx
 * <FormatsDemo />
 * ```
 */
export function FormatsDemo() {
  const { formatNumber, localeRules } = useLocale();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formats localisés</CardTitle>
        <CardDescription>Nombres, devises et dates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Nombres</p>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground">1234567.89</p>
              <p className="text-lg font-medium">{formatNumber(1234567.89)}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Devises</p>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground">1500.50 CHF</p>
              <p className="text-lg font-medium">
                <FormatCurrency value={1500.5} />
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Format date</p>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground">Court</p>
              <p className="text-sm font-medium">
                {localeRules.dateFormat.short}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Format heure</p>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground">Heure</p>
              <p className="text-sm font-medium">
                {localeRules.dateFormat.time}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
