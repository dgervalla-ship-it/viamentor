/**
 * VIAMENTOR User Form
 *
 * Formulaire de création/édition d'utilisateur
 * - React Hook Form pour gestion du formulaire
 * - Zod pour validation
 * - Support création et édition
 * - Validation en temps réel
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userSchema,
  type UserFormData,
} from "@/polymet/data/viamentor-validation-schemas";
import { UserRole, ROLE_MATRIX } from "@/polymet/data/viamentor-roles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserIcon, LoaderIcon, CheckCircle2Icon } from "lucide-react";
import { useState } from "react";

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  mode?: "create" | "edit";
  onSubmit: (data: UserFormData) => Promise<void>;
  onCancel?: () => void;
}

/**
 * Formulaire d'utilisateur avec RHF + Zod
 *
 * @example
 * ```tsx
 * <UserForm
 *   mode="create"
 *   onSubmit={async (data) => console.log(data)}
 * />
 * ```
 */
export function UserForm({
  initialData,
  mode = "create",
  onSubmit,
  onCancel,
}: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: initialData || {
      email: "",
      firstName: "",
      lastName: "",
      role: UserRole.STUDENT,
      phone: "",
      tenantId: "",
    },
  });

  const selectedRole = watch("role");

  const handleFormSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    try {
      await onSubmit(data);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rôles disponibles (filtrés selon permissions)
  const availableRoles = Object.values(UserRole).filter(
    (role) => role !== UserRole.ROOT_ADMIN
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <UserIcon className="h-6 w-6 text-primary" />

          <div>
            <CardTitle>
              {mode === "create"
                ? "Créer un utilisateur"
                : "Modifier l'utilisateur"}
            </CardTitle>
            <CardDescription>
              Formulaire avec validation React Hook Form + Zod
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="utilisateur@viamentor.ch"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Prénom et Nom */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                Prénom <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="Jean"
                {...register("firstName")}
                className={errors.firstName ? "border-destructive" : ""}
              />

              {errors.firstName && (
                <p className="text-sm text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Nom <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Dupont"
                {...register("lastName")}
                className={errors.lastName ? "border-destructive" : ""}
              />

              {errors.lastName && (
                <p className="text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Téléphone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Téléphone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+41791234567"
              {...register("phone")}
              className={errors.phone ? "border-destructive" : ""}
            />

            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Format suisse : +41XXXXXXXXX
            </p>
          </div>

          {/* Rôle */}
          <div className="space-y-2">
            <Label htmlFor="role">
              Rôle <span className="text-destructive">*</span>
            </Label>
            <Select
              value={selectedRole}
              onValueChange={(value) =>
                setValue("role", value as UserRole, { shouldValidate: true })
              }
            >
              <SelectTrigger
                className={errors.role ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
            {selectedRole && ROLE_MATRIX[selectedRole] && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-medium mb-1">
                  {selectedRole.replace(/_/g, " ")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {ROLE_MATRIX[selectedRole].description}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Niveau {ROLE_MATRIX[selectedRole].level}
                  </Badge>
                  {ROLE_MATRIX[selectedRole].tenantScoped && (
                    <Badge variant="outline" className="text-xs">
                      Tenant Scoped
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Tenant ID (si rôle tenant-scoped) */}
          {selectedRole && ROLE_MATRIX[selectedRole]?.tenantScoped && (
            <div className="space-y-2">
              <Label htmlFor="tenantId">
                Tenant ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="tenantId"
                placeholder="tenant-123"
                {...register("tenantId")}
                className={errors.tenantId ? "border-destructive" : ""}
              />

              {errors.tenantId && (
                <p className="text-sm text-destructive">
                  {errors.tenantId.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Requis pour les rôles tenant-scoped
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={!isValid || !isDirty || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />

                  {mode === "create" ? "Création..." : "Enregistrement..."}
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle2Icon className="h-4 w-4 mr-2" />

                  {mode === "create" ? "Créé !" : "Enregistré !"}
                </>
              ) : (
                <>{mode === "create" ? "Créer l'utilisateur" : "Enregistrer"}</>
              )}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
            )}
          </div>

          {/* Form State Debug */}
          <div className="p-3 bg-muted/50 rounded-md space-y-1">
            <p className="text-xs font-medium text-muted-foreground">
              État du formulaire
            </p>
            <div className="flex gap-2">
              <Badge
                variant={isValid ? "default" : "secondary"}
                className="text-xs"
              >
                {isValid ? "✓ Valide" : "✗ Invalide"}
              </Badge>
              <Badge
                variant={isDirty ? "default" : "secondary"}
                className="text-xs"
              >
                {isDirty ? "Modifié" : "Non modifié"}
              </Badge>
              {Object.keys(errors).length > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {Object.keys(errors).length} erreur(s)
                </Badge>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
