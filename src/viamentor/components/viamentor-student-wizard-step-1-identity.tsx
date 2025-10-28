/**
 * VIAMENTOR Student Wizard - Step 1: Identity
 * Upload photo, personal info, address
 */

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  UploadIcon,
  XIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LoaderIcon,
} from "lucide-react";
import {
  identitySchema,
  IdentityData,
} from "@/viamentor/data/viamentor-student-wizard-schemas";
import {
  useWizardTranslations,
  WizardLocale,
} from "@/viamentor/data/viamentor-student-wizard-i18n";
import {
  SWISS_CANTONS,
  getCantonByCode,
} from "@/viamentor/data/viamentor-swiss-cantons";

interface IdentityStepProps {
  initialData?: Partial<IdentityData>;
  locale?: WizardLocale;
  onDataChange: (data: Partial<IdentityData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function IdentityStep({
  initialData,
  locale = "fr",
  onDataChange,
  onValidationChange,
}: IdentityStepProps) {
  const t = useWizardTranslations(locale);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialData?.photo || null
  );
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<IdentityData>({
    resolver: zodResolver(identitySchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  const formData = watch();

  // Notify parent of data changes
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  // Notify parent of validation state
  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  // Email availability check (debounced)
  useEffect(() => {
    const email = formData.email;
    if (!email || errors.email) {
      setEmailStatus("idle");
      return;
    }

    setEmailStatus("checking");
    const timer = setTimeout(() => {
      // Simulate API call
      const isTaken = email === "taken@example.com";
      setEmailStatus(isTaken ? "taken" : "available");
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.email, errors.email]);

  // Auto-fill city and canton based on ZIP code using Swiss Cantons data
  useEffect(() => {
    const zipCode = formData.zipCode;
    if (zipCode?.length === 4) {
      // Comprehensive mapping of Swiss ZIP codes to cities and cantons
      // Using capital cities from SWISS_CANTONS data
      const zipMapping: Record<string, { city: string; canton: string }> = {
        // Vaud (VD)
        "1000": { city: "Lausanne", canton: "VD" },
        "1003": { city: "Lausanne", canton: "VD" },
        "1004": { city: "Lausanne", canton: "VD" },
        "1005": { city: "Lausanne", canton: "VD" },
        "1006": { city: "Lausanne", canton: "VD" },
        "1007": { city: "Lausanne", canton: "VD" },
        "1008": { city: "Lausanne", canton: "VD" },
        "1009": { city: "Lausanne", canton: "VD" },
        "1010": { city: "Lausanne", canton: "VD" },
        "1110": { city: "Morges", canton: "VD" },
        "1400": { city: "Yverdon-les-Bains", canton: "VD" },
        "1800": { city: "Vevey", canton: "VD" },
        "1820": { city: "Montreux", canton: "VD" },
        // Genève (GE)
        "1200": { city: "Genève", canton: "GE" },
        "1201": { city: "Genève", canton: "GE" },
        "1202": { city: "Genève", canton: "GE" },
        "1203": { city: "Genève", canton: "GE" },
        "1204": { city: "Genève", canton: "GE" },
        "1205": { city: "Genève", canton: "GE" },
        "1206": { city: "Genève", canton: "GE" },
        "1207": { city: "Genève", canton: "GE" },
        "1208": { city: "Genève", canton: "GE" },
        "1209": { city: "Genève", canton: "GE" },
        "1227": { city: "Carouge", canton: "GE" },
        // Zürich (ZH)
        "8000": { city: "Zurich", canton: "ZH" },
        "8001": { city: "Zurich", canton: "ZH" },
        "8002": { city: "Zurich", canton: "ZH" },
        "8003": { city: "Zurich", canton: "ZH" },
        "8004": { city: "Zurich", canton: "ZH" },
        "8005": { city: "Zurich", canton: "ZH" },
        "8006": { city: "Zurich", canton: "ZH" },
        "8008": { city: "Zurich", canton: "ZH" },
        "8032": { city: "Zurich", canton: "ZH" },
        "8050": { city: "Zurich", canton: "ZH" },
        "8400": { city: "Winterthur", canton: "ZH" },
        // Berne (BE)
        "3000": { city: "Berne", canton: "BE" },
        "3001": { city: "Berne", canton: "BE" },
        "3003": { city: "Berne", canton: "BE" },
        "3004": { city: "Berne", canton: "BE" },
        "3005": { city: "Berne", canton: "BE" },
        "3006": { city: "Berne", canton: "BE" },
        "3007": { city: "Berne", canton: "BE" },
        "3008": { city: "Berne", canton: "BE" },
        "3010": { city: "Berne", canton: "BE" },
        "3011": { city: "Berne", canton: "BE" },
        "3012": { city: "Berne", canton: "BE" },
        "3013": { city: "Berne", canton: "BE" },
        "3014": { city: "Berne", canton: "BE" },
        "2500": { city: "Biel/Bienne", canton: "BE" },
        "3600": { city: "Thun", canton: "BE" },
        // Tessin (TI)
        "6500": { city: "Bellinzone", canton: "TI" },
        "6600": { city: "Locarno", canton: "TI" },
        "6900": { city: "Lugano", canton: "TI" },
        "6901": { city: "Lugano", canton: "TI" },
        "6902": { city: "Lugano", canton: "TI" },
        "6903": { city: "Lugano", canton: "TI" },
        "6904": { city: "Lugano", canton: "TI" },
        "6906": { city: "Lugano", canton: "TI" },
        // Lucerne (LU)
        "6000": { city: "Lucerne", canton: "LU" },
        "6003": { city: "Lucerne", canton: "LU" },
        "6004": { city: "Lucerne", canton: "LU" },
        "6005": { city: "Lucerne", canton: "LU" },
        // Fribourg (FR)
        "1700": { city: "Fribourg", canton: "FR" },
        "1701": { city: "Fribourg", canton: "FR" },
        "1702": { city: "Fribourg", canton: "FR" },
        "1705": { city: "Fribourg", canton: "FR" },
        // Neuchâtel (NE)
        "2000": { city: "Neuchâtel", canton: "NE" },
        "2001": { city: "Neuchâtel", canton: "NE" },
        "2002": { city: "Neuchâtel", canton: "NE" },
        // Valais (VS)
        "1950": { city: "Sion", canton: "VS" },
        "1951": { city: "Sion", canton: "VS" },
        "3900": { city: "Brigue", canton: "VS" },
        "1870": { city: "Monthey", canton: "VS" },
        // Bâle-Ville (BS)
        "4000": { city: "Bâle", canton: "BS" },
        "4001": { city: "Bâle", canton: "BS" },
        "4002": { city: "Bâle", canton: "BS" },
        "4051": { city: "Bâle", canton: "BS" },
        "4052": { city: "Bâle", canton: "BS" },
        "4053": { city: "Bâle", canton: "BS" },
        "4054": { city: "Bâle", canton: "BS" },
        "4055": { city: "Bâle", canton: "BS" },
        "4056": { city: "Bâle", canton: "BS" },
        "4057": { city: "Bâle", canton: "BS" },
        "4058": { city: "Bâle", canton: "BS" },
        // Bâle-Campagne (BL)
        "4410": { city: "Liestal", canton: "BL" },
        // Saint-Gall (SG)
        "9000": { city: "Saint-Gall", canton: "SG" },
        "9001": { city: "Saint-Gall", canton: "SG" },
        "9004": { city: "Saint-Gall", canton: "SG" },
        "9006": { city: "Saint-Gall", canton: "SG" },
        "9008": { city: "Saint-Gall", canton: "SG" },
        // Argovie (AG)
        "5000": { city: "Aarau", canton: "AG" },
        "5001": { city: "Aarau", canton: "AG" },
        "5004": { city: "Aarau", canton: "AG" },
        // Zoug (ZG)
        "6300": { city: "Zoug", canton: "ZG" },
        "6301": { city: "Zoug", canton: "ZG" },
        "6302": { city: "Zoug", canton: "ZG" },
        // Soleure (SO)
        "4500": { city: "Soleure", canton: "SO" },
        "4501": { city: "Soleure", canton: "SO" },
        // Schaffhouse (SH)
        "8200": { city: "Schaffhouse", canton: "SH" },
        "8201": { city: "Schaffhouse", canton: "SH" },
        // Jura (JU)
        "2800": { city: "Delémont", canton: "JU" },
        // Thurgovie (TG)
        "8500": { city: "Frauenfeld", canton: "TG" },
        // Grisons (GR)
        "7000": { city: "Coire", canton: "GR" },
        // Schwyz (SZ)
        "6430": { city: "Schwyz", canton: "SZ" },
        // Uri (UR)
        "6460": { city: "Altdorf", canton: "UR" },
        // Obwald (OW)
        "6060": { city: "Sarnen", canton: "OW" },
        // Nidwald (NW)
        "6370": { city: "Stans", canton: "NW" },
        // Glaris (GL)
        "8750": { city: "Glaris", canton: "GL" },
        // Appenzell Rhodes-Extérieures (AR)
        "9100": { city: "Herisau", canton: "AR" },
        // Appenzell Rhodes-Intérieures (AI)
        "9050": { city: "Appenzell", canton: "AI" },
      };

      const location = zipMapping[zipCode];
      if (location) {
        setValue("city", location.city);
        setValue("canton", location.canton);

        // Auto-select language based on canton if not already set
        if (!formData.preferredLanguage) {
          const cantonData = getCantonByCode(location.canton);
          if (cantonData) {
            setValue("preferredLanguage", cantonData.defaultLocale as any);
          }
        }
      }
    }
  }, [formData.zipCode, formData.preferredLanguage, setValue]);

  // Auto-select language based on canton (when manually selected)
  useEffect(() => {
    const canton = formData.canton;
    if (canton) {
      const cantonData = getCantonByCode(canton);
      if (cantonData && !formData.preferredLanguage) {
        setValue("preferredLanguage", cantonData.defaultLocale as any);
      }
    }
  }, [formData.canton, formData.preferredLanguage, setValue]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Photo trop grande (max 2 MB)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
      setValue("photo", result);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setValue("photo", undefined);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t.identityTitle}</h3>
        <p className="text-sm text-muted-foreground">{t.step1}</p>
      </div>

      {/* Photo Upload Section */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-foreground">
          Photo de profil
        </h4>
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-32 w-32">
            {photoPreview ? (
              <AvatarImage src={photoPreview} alt="Student photo" />
            ) : (
              <AvatarFallback className="text-4xl">
                {formData.firstName?.[0]}
                {formData.lastName?.[0]}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex gap-2">
            <Label htmlFor="photo-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                <UploadIcon className="h-4 w-4" />

                <span>{t.uploadPhoto}</span>
              </div>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </Label>

            {photoPreview && (
              <Button variant="outline" size="sm" onClick={removePhoto}>
                <XIcon className="h-4 w-4 mr-2" />

                {t.removePhoto}
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{t.photoMaxSize}</p>
        </div>
      </div>

      {/* Personal Info Section */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-foreground">
          Informations personnelles
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">
              {t.firstName} <span className="text-red-600">*</span>
            </Label>
            <Input id="firstName" {...register("firstName")} />

            {errors.firstName && (
              <p className="text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">
              {t.lastName} <span className="text-red-600">*</span>
            </Label>
            <Input id="lastName" {...register("lastName")} />

            {errors.lastName && (
              <p className="text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          {/* Birth Date */}
          <div className="space-y-2">
            <Label htmlFor="birthDate">
              {t.birthDate} <span className="text-red-600">*</span>
            </Label>
            <Input id="birthDate" type="date" {...register("birthDate")} />

            {errors.birthDate && (
              <p className="text-sm text-red-600">{errors.birthDate.message}</p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>{t.gender}</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => setValue("gender", value as any)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />

                <Label htmlFor="male" className="font-normal cursor-pointer">
                  {t.genderMale}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />

                <Label htmlFor="female" className="font-normal cursor-pointer">
                  {t.genderFemale}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />

                <Label htmlFor="other" className="font-normal cursor-pointer">
                  {t.genderOther}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-foreground">Adresse</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Street */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="street">
              {t.street} <span className="text-red-600">*</span>
            </Label>
            <Input id="street" {...register("street")} />

            {errors.street && (
              <p className="text-sm text-red-600">{errors.street.message}</p>
            )}
          </div>

          {/* ZIP Code */}
          <div className="space-y-2">
            <Label htmlFor="zipCode">
              {t.zipCode} <span className="text-red-600">*</span>
            </Label>
            <Input id="zipCode" {...register("zipCode")} maxLength={4} />

            {errors.zipCode && (
              <p className="text-sm text-red-600">{errors.zipCode.message}</p>
            )}
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">
              {t.city} <span className="text-red-600">*</span>
            </Label>
            <Input id="city" {...register("city")} />

            {errors.city && (
              <p className="text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          {/* Canton */}
          <div className="space-y-2">
            <Label htmlFor="canton">
              {t.canton} <span className="text-red-600">*</span>
            </Label>
            <Select
              value={formData.canton}
              onValueChange={(value) => setValue("canton", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.canton} />
              </SelectTrigger>
              <SelectContent>
                {SWISS_CANTONS.map((canton) => (
                  <SelectItem key={canton.code} value={canton.code}>
                    {canton.flag} {canton.name[locale]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.canton && (
              <p className="text-sm text-red-600">{errors.canton.message}</p>
            )}
          </div>

          {/* Preferred Language */}
          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">
              {t.preferredLanguage} <span className="text-red-600">*</span>
            </Label>
            <Select
              value={formData.preferredLanguage}
              onValueChange={(value) =>
                setValue("preferredLanguage", value as any)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t.preferredLanguage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                <SelectItem value="it">🇮🇹 Italiano</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-foreground">
          Coordonnées de contact
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              {t.email} <span className="text-red-600">*</span>
            </Label>
            <div className="relative">
              <Input id="email" type="email" {...register("email")} />

              {emailStatus === "checking" && (
                <LoaderIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
              )}
              {emailStatus === "available" && (
                <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
              )}
              {emailStatus === "taken" && (
                <AlertCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-600" />
              )}
            </div>
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
            {emailStatus === "available" && (
              <p className="text-sm text-green-600">{t.emailAvailable}</p>
            )}
            {emailStatus === "taken" && (
              <p className="text-sm text-red-600">{t.emailTaken}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              {t.phone} <span className="text-red-600">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+41 XX XXX XX XX"
              {...register("phone")}
            />

            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
