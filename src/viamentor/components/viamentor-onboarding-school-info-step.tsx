/**
 * VIAMENTOR - Onboarding Step 1: Informations École
 * Upload logo, form grid, color picker avec preview temps réel
 */

import { useState, useCallback } from "react";
import { Upload, X, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SWISS_CANTONS } from "@/viamentor/data/viamentor-swiss-cantons";
import {
  type SchoolInfoData,
  type OnboardingLocale,
  ONBOARDING_I18N,
} from "@/viamentor/data/viamentor-onboarding-i18n";

interface SchoolInfoStepProps {
  data: Partial<SchoolInfoData>;
  locale?: OnboardingLocale;
  onChange: (data: Partial<SchoolInfoData>) => void;
}

export function SchoolInfoStep({
  data,
  locale = "fr",
  onChange,
}: SchoolInfoStepProps) {
  const t = ONBOARDING_I18N[locale].step1;
  const [logoPreview, setLogoPreview] = useState<string | null>(
    data.logoPreview || null
  );

  /**
   * Handle logo upload
   */
  const handleLogoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validation
      if (file.size > 5 * 1024 * 1024) {
        alert(t.logo.maxSize);
        return;
      }

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        alert(t.logo.formats);
        return;
      }

      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        setLogoPreview(preview);
        onChange({ logo: file, logoPreview: preview });
      };
      reader.readAsDataURL(file);
    },
    [onChange, t]
  );

  /**
   * Remove logo
   */
  const handleRemoveLogo = useCallback(() => {
    setLogoPreview(null);
    onChange({ logo: undefined, logoPreview: undefined });
  }, [onChange]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Logo Upload */}
      <div className="space-y-4">
        <Label>{t.logo.label}</Label>
        {!logoPreview ? (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="w-10 h-10 text-muted-foreground" />

              <p className="text-sm font-medium">{t.logo.dropzone}</p>
              <p className="text-xs text-muted-foreground">{t.logo.formats}</p>
              <p className="text-xs text-muted-foreground">{t.logo.maxSize}</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleLogoUpload}
            />
          </label>
        ) : (
          <div className="relative w-48 h-48 border border-border rounded-lg overflow-hidden">
            <img
              src={logoPreview}
              alt={t.logo.preview}
              className="w-full h-full object-contain"
            />

            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleRemoveLogo}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Form Grid 2 cols */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nom */}
        <div className="space-y-2">
          <Label htmlFor="name">
            {t.name.label} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={data.name || ""}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder={t.name.placeholder}
            maxLength={100}
          />

          <p className="text-xs text-muted-foreground">{t.name.help}</p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            {t.email.label} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email || ""}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder={t.email.placeholder}
          />
        </div>

        {/* Téléphone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            {t.phone.label} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone || ""}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder={t.phone.placeholder}
          />

          <p className="text-xs text-muted-foreground">{t.phone.help}</p>
        </div>

        {/* Canton */}
        <div className="space-y-2">
          <Label htmlFor="canton">
            {t.address.canton} <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.address?.canton || ""}
            onValueChange={(value) =>
              onChange({
                address: { ...data.address, canton: value } as any,
              })
            }
          >
            <SelectTrigger id="canton">
              <SelectValue placeholder={t.address.canton} />
            </SelectTrigger>
            <SelectContent>
              {SWISS_CANTONS.map((canton) => (
                <SelectItem key={canton.code} value={canton.code}>
                  {canton.flag} {canton.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">{t.description.label}</Label>
        <Textarea
          id="description"
          value={data.description || ""}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder={t.description.placeholder}
          maxLength={500}
          rows={4}
        />

        <p className="text-xs text-muted-foreground">
          {data.description?.length || 0} / 500 - {t.description.help}
        </p>
      </div>

      {/* Adresse */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t.address.title}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="street">
              {t.address.street} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="street"
              value={data.address?.street || ""}
              onChange={(e) =>
                onChange({
                  address: { ...data.address, street: e.target.value } as any,
                })
              }
              placeholder="Rue du Rhône 15"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">
              {t.address.zip} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="zip"
              value={data.address?.zip || ""}
              onChange={(e) =>
                onChange({
                  address: { ...data.address, zip: e.target.value } as any,
                })
              }
              placeholder="1204"
              maxLength={4}
            />
          </div>
          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="city">
              {t.address.city} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              value={data.address?.city || ""}
              onChange={(e) =>
                onChange({
                  address: { ...data.address, city: e.target.value } as any,
                })
              }
              placeholder="Genève"
            />
          </div>
        </div>
      </div>

      {/* Brand Color */}
      <div className="space-y-4">
        <Label htmlFor="brandColor">{t.brandColor.label}</Label>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              id="brandColor"
              type="color"
              value={data.brandColor || "#3b82f6"}
              onChange={(e) => onChange({ brandColor: e.target.value })}
              className="w-20 h-12 cursor-pointer"
            />

            <Palette className="absolute top-3 left-7 w-4 h-4 pointer-events-none text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{t.brandColor.help}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-mono">{data.brandColor}</span>
              <div
                className="w-24 h-8 rounded border border-border"
                style={{ backgroundColor: data.brandColor }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Multi-sites */}
      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
        <div className="space-y-0.5">
          <Label htmlFor="multiSites">{t.multiSites.label}</Label>
          <p className="text-sm text-muted-foreground">
            {t.multiSites.description}
          </p>
        </div>
        <Switch
          id="multiSites"
          checked={data.multiSites || false}
          onCheckedChange={(checked) => onChange({ multiSites: checked })}
        />
      </div>
    </div>
  );
}
