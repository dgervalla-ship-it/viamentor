/**
 * VIAMENTOR Tenant Wizard - Step 2: Admin User
 *
 * Formulaire création admin avec génération mot de passe
 *
 * @module components/viamentor-wizard-step-2-admin-user
 * @version 1.0.0
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminUserSchema,
  AdminUserData,
  generateSecurePassword,
  calculatePasswordStrength,
} from "@/viamentor/data/viamentor-tenant-wizard-schemas";
import { getCantonDefaultLocale } from "@/viamentor/data/viamentor-swiss-cantons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  EyeIcon,
  EyeOffIcon,
  CopyIcon,
  CheckIcon,
  KeyIcon,
  InfoIcon,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Step2AdminUserProps {
  initialData?: Partial<AdminUserData>;
  schoolCanton?: string;
  onDataChange: (data: Partial<AdminUserData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function Step2AdminUser({
  initialData,
  schoolCanton,
  onDataChange,
  onValidationChange,
}: Step2AdminUserProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AdminUserData>({
    resolver: zodResolver(adminUserSchema),
    mode: "onChange",
    defaultValues: {
      ...initialData,
      locale:
        initialData?.locale ||
        (schoolCanton ? getCantonDefaultLocale(schoolCanton) : "fr"),
      sendWelcomeEmail: initialData?.sendWelcomeEmail ?? true,
    },
  });

  const formData = watch();
  const password = watch("password");
  const passwordStrength = password
    ? calculatePasswordStrength(password)
    : null;

  // Notify parent of data changes
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  // Notify parent of validation state
  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  const handleGeneratePassword = () => {
    const newPassword = generateSecurePassword(16);
    setValue("password", newPassword);
  };

  const handleCopyPassword = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Compte administrateur</h2>
        <p className="text-muted-foreground">
          Créez le compte de l'administrateur principal
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">
            Prénom <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="Jean"
            className={errors.firstName ? "border-destructive" : ""}
          />

          {errors.firstName && (
            <p className="text-sm text-destructive">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Nom <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder="Dupont"
            className={errors.lastName ? "border-destructive" : ""}
          />

          {errors.lastName && (
            <p className="text-sm text-destructive">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="admin@exemple.ch"
            className={errors.email ? "border-destructive" : ""}
          />

          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
          <Alert>
            <InfoIcon className="h-4 w-4" />

            <AlertDescription>
              Cet email servira d'identifiant de connexion
            </AlertDescription>
          </Alert>
        </div>

        {/* Password Generator */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="password">
            Mot de passe <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleGeneratePassword}
              className="shrink-0"
            >
              <KeyIcon className="h-4 w-4 mr-2" />
              Générer
            </Button>
            <div className="relative flex-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Mot de passe sécurisé"
                className={
                  errors.password ? "border-destructive pr-20" : "pr-20"
                }
              />

              <div className="absolute right-2 top-2 flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-7 w-7 p-0"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyPassword}
                  disabled={!password}
                  className="h-7 w-7 p-0"
                >
                  {copied ? (
                    <CheckIcon className="h-4 w-4 text-green-600" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
          {passwordStrength && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Force :</span>
              <Badge className={passwordStrength.color}>
                {passwordStrength.label}
              </Badge>
            </div>
          )}
        </div>

        {/* Language Selection */}
        <div className="space-y-3 md:col-span-2">
          <Label>
            Langue de l'interface <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.locale}
            onValueChange={(value) => setValue("locale", value as any)}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="flex items-center space-x-2 border border-border rounded-md p-3 cursor-pointer hover:bg-muted">
              <RadioGroupItem value="fr" id="fr" />

              <Label htmlFor="fr" className="cursor-pointer flex-1">
                🇫🇷 Français
              </Label>
            </div>
            <div className="flex items-center space-x-2 border border-border rounded-md p-3 cursor-pointer hover:bg-muted">
              <RadioGroupItem value="de" id="de" />

              <Label htmlFor="de" className="cursor-pointer flex-1">
                🇩🇪 Deutsch
              </Label>
            </div>
            <div className="flex items-center space-x-2 border border-border rounded-md p-3 cursor-pointer hover:bg-muted">
              <RadioGroupItem value="it" id="it" />

              <Label htmlFor="it" className="cursor-pointer flex-1">
                🇮🇹 Italiano
              </Label>
            </div>
            <div className="flex items-center space-x-2 border border-border rounded-md p-3 cursor-pointer hover:bg-muted">
              <RadioGroupItem value="en" id="en" />

              <Label htmlFor="en" className="cursor-pointer flex-1">
                🇬🇧 English
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Send Welcome Email */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sendWelcomeEmail"
              checked={formData.sendWelcomeEmail}
              onCheckedChange={(checked) =>
                setValue("sendWelcomeEmail", checked as boolean)
              }
            />

            <Label htmlFor="sendWelcomeEmail" className="cursor-pointer">
              Envoyer un email de bienvenue
            </Label>
          </div>
          {formData.sendWelcomeEmail && (
            <Alert>
              <InfoIcon className="h-4 w-4" />

              <AlertDescription>
                Un email sera envoyé avec les identifiants de connexion et un
                lien d'activation du compte.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
