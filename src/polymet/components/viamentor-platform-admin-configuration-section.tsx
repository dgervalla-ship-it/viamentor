/**
 * VIAMENTOR - Platform Admin Configuration Section
 * Section configuration plateforme avec paramètres système
 */

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  mockPlatformConfiguration,
  type PlatformAdminLocale,
  type PlatformConfiguration,
} from "@/polymet/data/viamentor-platform-admin-data";
import { getPlatformAdminTranslations } from "@/polymet/data/viamentor-platform-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PlatformAdminConfigurationSectionProps {
  locale?: PlatformAdminLocale;
  onSave?: (config: PlatformConfiguration) => void;
  onCancel?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorPlatformAdminConfigurationSection({
  locale = "fr",
  onSave,
  onCancel,
}: PlatformAdminConfigurationSectionProps) {
  const t = getPlatformAdminTranslations(locale);
  const [config, setConfig] = useState(mockPlatformConfiguration);

  const handleSave = () => {
    onSave?.(config);
  };

  return (
    <div className="space-y-6">
      {/* General */}
      <Card>
        <CardHeader>
          <CardTitle>{t.configuration.general.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.configuration.general.maintenanceMode}</Label>
              <p className="text-sm text-muted-foreground">
                {t.configuration.general.maintenanceModeDesc}
              </p>
            </div>
            <Switch
              checked={config.general.maintenanceMode}
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  general: { ...config.general, maintenanceMode: checked },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.configuration.general.allowNewSignups}</Label>
              <p className="text-sm text-muted-foreground">
                {t.configuration.general.allowNewSignupsDesc}
              </p>
            </div>
            <Switch
              checked={config.general.allowNewSignups}
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  general: { ...config.general, allowNewSignups: checked },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>{t.configuration.security.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.configuration.security.enforceSSO}</Label>
              <p className="text-sm text-muted-foreground">
                {t.configuration.security.enforceSSODesc}
              </p>
            </div>
            <Switch
              checked={config.security.enforceSSO}
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  security: { ...config.security, enforceSSO: checked },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.configuration.security.enforce2FA}</Label>
              <p className="text-sm text-muted-foreground">
                {t.configuration.security.enforce2FADesc}
              </p>
            </div>
            <Switch
              checked={config.security.enforce2FA}
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  security: { ...config.security, enforce2FA: checked },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          {t.configuration.cancel}
        </Button>
        <Button onClick={handleSave}>{t.configuration.save}</Button>
      </div>
    </div>
  );
}

export default ViamentorPlatformAdminConfigurationSection;
