/**
 * VIAMENTOR Locale Controls Component
 *
 * Composant de contrôle de la locale avec sélecteur et exemples
 * Respecte le standard Clean Code : < 200 lignes
 *
 * @module components/viamentor-locale-controls
 * @version 1.0.0
 */

import { useLocale } from "@/viamentor/components/viamentor-locale-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlobeIcon } from "lucide-react";

/**
 * Composant de contrôle de la locale
 *
 * @example
 * ```tsx
 * <LocaleControls />
 * ```
 */
export function LocaleControls() {
  const {
    currentLocale,
    localeRules,
    changeLocale,
    availableLocales,
    formatPunctuation,
    quote,
  } = useLocale();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <GlobeIcon className="h-5 w-5 text-primary" />

          <CardTitle>Langue</CardTitle>
        </div>
        <CardDescription>
          Langue active :{" "}
          <Badge variant="outline">{localeRules.nativeName}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {availableLocales.map((locale) => (
            <Button
              key={locale}
              size="sm"
              variant={currentLocale === locale ? "default" : "outline"}
              onClick={() => changeLocale(locale)}
            >
              {locale.toUpperCase()}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          <div className="p-3 bg-muted rounded-md text-sm">
            <p className="text-muted-foreground mb-1">Ponctuation</p>
            <p>
              {formatPunctuation("Exemple : Bonjour ! Comment allez-vous ?")}
            </p>
          </div>
          <div className="p-3 bg-muted rounded-md text-sm">
            <p className="text-muted-foreground mb-1">Guillemets</p>
            <p>{quote("VIAMENTOR")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
