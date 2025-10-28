/**
 * VIAMENTOR Theme Controls Component
 *
 * Composant de contrôle du thème avec sélecteur et prévisualisation
 * Respecte le standard Clean Code : < 200 lignes
 *
 * @module components/viamentor-theme-controls
 * @version 1.0.0
 */

import { useTheme } from "@/viamentor/components/viamentor-theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaletteIcon } from "lucide-react";

/**
 * Composant de contrôle du thème
 *
 * @example
 * ```tsx
 * <ThemeControls />
 * ```
 */
export function ThemeControls() {
  const { currentTheme, changeTheme, availableThemes, themeConfig } =
    useTheme();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <PaletteIcon className="h-5 w-5 text-primary" />

          <CardTitle>Thème</CardTitle>
        </div>
        <CardDescription>
          Thème actif : <Badge variant="outline">{currentTheme}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {availableThemes.map((theme) => (
            <Button
              key={theme}
              size="sm"
              variant={currentTheme === theme ? "default" : "outline"}
              onClick={() => changeTheme(theme)}
            >
              {theme}
            </Button>
          ))}
        </div>
        <div className="p-4 bg-primary text-primary-foreground rounded-lg text-center">
          <p className="text-sm font-medium">Couleur primaire</p>
          <p className="text-xs opacity-90 mt-1">
            HSL({themeConfig.cssVariables.primaryHue}°,{" "}
            {themeConfig.cssVariables.primarySaturation}%,{" "}
            {themeConfig.cssVariables.primaryLightness}%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
