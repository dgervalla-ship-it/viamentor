/**
 * VIAMENTOR Tenant Wizard - Step 1: School Info
 *
 * Formulaire informations école avec upload logo et validation
 *
 * @module components/viamentor-wizard-step-1-school-info
 * @version 1.0.0
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schoolInfoSchema,
  SchoolInfoData,
} from "@/viamentor/data/viamentor-tenant-wizard-schemas";
import { SWISS_CANTONS } from "@/viamentor/data/viamentor-swiss-cantons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2Icon, LoaderIcon, AlertCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface Step1SchoolInfoProps {
  initialData?: Partial<SchoolInfoData>;
  onDataChange: (data: Partial<SchoolInfoData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function Step1SchoolInfo({
  initialData,
  onDataChange,
  onValidationChange,
}: Step1SchoolInfoProps) {
  const [nameAvailable, setNameAvailable] = useState<boolean | null>(null);
  const [checkingName, setCheckingName] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialData?.logo || null
  );

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SchoolInfoData>({
    resolver: zodResolver(schoolInfoSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  const formData = watch();
  const schoolName = watch("name");
  const description = watch("description");
  const postalCode = watch("postalCode");

  // Notify parent of data changes
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  // Notify parent of validation state
  useEffect(() => {
    onValidationChange(isValid && nameAvailable === true);
  }, [isValid, nameAvailable, onValidationChange]);

  // Check school name availability (debounced)
  useEffect(() => {
    if (!schoolName || schoolName.length < 3) {
      setNameAvailable(null);
      return;
    }

    setCheckingName(true);
    const timer = setTimeout(() => {
      // Mock API check - in real app, call backend
      const isAvailable = !["Auto-École Léman", "Fahrschule Zürich"].includes(
        schoolName
      );
      setNameAvailable(isAvailable);
      setCheckingName(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [schoolName]);

  // Auto-fill city from postal code
  useEffect(() => {
    if (postalCode && postalCode.length === 4) {
      // Mock API - in real app, fetch from Swiss postal API
      const cityMap: Record<string, string> = {
        "1200": "Genève",
        "8000": "Zürich",
        "3000": "Bern",
        "1003": "Lausanne",
        "4000": "Basel",
      };
      const city = cityMap[postalCode];
      if (city) {
        setValue("city", city);
      }
    }
  }, [postalCode, setValue]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Le fichier ne doit pas dépasser 2 MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setLogoPreview(result);
      setValue("logo", result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Informations de l'école</h2>
        <p className="text-muted-foreground">
          Renseignez les informations de base de l'auto-école
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* School Name */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="name">
            Nom de l'école <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="name"
              {...register("name")}
              placeholder="Auto-École Exemple"
              className={errors.name ? "border-destructive" : ""}
            />

            {checkingName && (
              <LoaderIcon className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
            )}
            {!checkingName && nameAvailable === true && (
              <CheckCircle2Icon className="absolute right-3 top-3 h-4 w-4 text-green-600" />
            )}
            {!checkingName && nameAvailable === false && (
              <AlertCircleIcon className="absolute right-3 top-3 h-4 w-4 text-destructive" />
            )}
          </div>
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
          {nameAvailable === false && (
            <Alert variant="destructive">
              <AlertDescription>
                Ce nom est déjà utilisé. Veuillez en choisir un autre.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <Label>Logo (optionnel)</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              {logoPreview && <AvatarImage src={logoPreview} />}
              <AvatarFallback className="bg-muted text-muted-foreground">
                Logo
              </AvatarFallback>
            </Avatar>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="cursor-pointer"
              />

              <p className="text-xs text-muted-foreground mt-1">
                Max 2 MB, format image
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description (optionnel)</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Décrivez votre auto-école..."
            rows={4}
            maxLength={500}
          />

          <p className="text-xs text-muted-foreground text-right">
            {description?.length || 0} / 500
          </p>
        </div>

        {/* Canton */}
        <div className="space-y-2">
          <Label htmlFor="canton">
            Canton <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.canton}
            onValueChange={(value) => setValue("canton", value)}
          >
            <SelectTrigger
              className={errors.canton ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Sélectionnez un canton" />
            </SelectTrigger>
            <SelectContent>
              {SWISS_CANTONS.map((canton) => (
                <SelectItem key={canton.code} value={canton.code}>
                  {canton.flag} {canton.code} - {canton.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.canton && (
            <p className="text-sm text-destructive">{errors.canton.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address">
            Adresse <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            {...register("address")}
            placeholder="Rue de l'Exemple 42"
            className={errors.address ? "border-destructive" : ""}
          />

          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <Label htmlFor="postalCode">
            NPA <span className="text-destructive">*</span>
          </Label>
          <Input
            id="postalCode"
            {...register("postalCode")}
            placeholder="1200"
            maxLength={4}
            className={errors.postalCode ? "border-destructive" : ""}
          />

          {errors.postalCode && (
            <p className="text-sm text-destructive">
              {errors.postalCode.message}
            </p>
          )}
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">
            Ville <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            {...register("city")}
            placeholder="Genève"
            className={errors.city ? "border-destructive" : ""}
          />

          {errors.city && (
            <p className="text-sm text-destructive">{errors.city.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Téléphone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="+41 22 123 45 67"
            className={errors.phone ? "border-destructive" : ""}
          />

          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="contact@exemple.ch"
            className={errors.email ? "border-destructive" : ""}
          />

          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label htmlFor="website">Site web (optionnel)</Label>
          <Input
            id="website"
            {...register("website")}
            placeholder="https://www.exemple.ch"
            className={errors.website ? "border-destructive" : ""}
          />

          {errors.website && (
            <p className="text-sm text-destructive">{errors.website.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
