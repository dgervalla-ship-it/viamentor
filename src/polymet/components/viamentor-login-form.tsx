/**
 * VIAMENTOR Login Form Component
 *
 * Formulaire de connexion avec React Hook Form + Zod
 * Respecte Clean Code : < 200 lignes
 *
 * @module components/viamentor-login-form
 * @version 1.0.0
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginFormData,
} from "@/polymet/data/viamentor-validation-schemas";
import { useUserStore } from "@/polymet/data/viamentor-user-store";
import {
  useSupabaseMock,
  MOCK_USERS,
} from "@/polymet/data/viamentor-supabase-mock";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { LogInIcon, UserIcon } from "lucide-react";
import { useState } from "react";

/**
 * Props du composant LoginForm
 */
interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Composant de formulaire de connexion
 *
 * @example
 * ```tsx
 * <LoginForm onSuccess={() => console.log('Logged in')} />
 * ```
 */
export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const setUser = useUserStore((state) => state.setUser);
  const supabase = useSupabaseMock();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);

    try {
      // Utilise Supabase Mock pour l'authentification
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error || !authData.user) {
        setErrorMessage("Email ou mot de passe incorrect");
        onError?.("Email ou mot de passe incorrect");
        return;
      }

      // Sync avec user store
      const [firstName, ...lastNameParts] =
        authData.user.user_metadata.name.split(" ");
      setUser({
        id: authData.user.id,
        email: authData.user.email,
        firstName: firstName,
        lastName: lastNameParts.join(" "),
        role: authData.user.user_metadata.role,
      });

      onSuccess?.();
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur de connexion");
      onError?.(error.message || "Erreur de connexion");
    }
  };

  const handleQuickLogin = async (email: string) => {
    setErrorMessage(null);

    try {
      // Utilise Supabase Mock pour l'authentification directe
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: "viamentor2025",
      });

      if (error || !authData.user) {
        setErrorMessage("Email ou mot de passe incorrect");
        onError?.("Email ou mot de passe incorrect");
        return;
      }

      // Sync avec user store
      const [firstName, ...lastNameParts] =
        authData.user.user_metadata.name.split(" ");
      setUser({
        id: authData.user.id,
        email: authData.user.email,
        firstName: firstName,
        lastName: lastNameParts.join(" "),
        role: authData.user.user_metadata.role,
      });

      // Mettre à jour les champs du formulaire pour l'affichage
      setValue("email", email);
      setValue("password", "viamentor2025");

      onSuccess?.();
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur de connexion");
      onError?.(error.message || "Erreur de connexion");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <LogInIcon className="h-6 w-6 text-primary" />

          <CardTitle>Connexion</CardTitle>
        </div>
        <CardDescription>
          Connectez-vous à votre compte VIAMENTOR
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@viamentor.ch"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={errors.password ? "border-destructive" : ""}
            />

            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={watch("rememberMe")}
              onCheckedChange={(checked) => {
                register("rememberMe").onChange({
                  target: { value: checked, name: "rememberMe" },
                });
              }}
            />

            <Label
              htmlFor="rememberMe"
              className="text-sm font-normal cursor-pointer"
            >
              Se souvenir de moi
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full px-6 py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </Button>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
              {errorMessage}
            </div>
          )}

          {/* Quick Login Buttons */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-center">
              Connexion rapide (mot de passe:{" "}
              <span className="text-primary font-bold">viamentor2025</span>)
            </p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(MOCK_USERS).map(([email, user]) => (
                <Button
                  key={email}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin(email)}
                  className="flex items-center gap-2 justify-start min-h-[44px]"
                >
                  <UserIcon className="h-3 w-3" />

                  <div className="flex flex-col items-start text-xs">
                    <span className="font-medium">
                      {user.user_metadata.name}
                    </span>
                    <Badge variant="secondary" className="text-[10px] h-4 px-1">
                      {user.user_metadata.role}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Demo Info */}
          <div className="p-3 bg-muted rounded-md text-xs text-center">
            <p className="text-muted-foreground">
              💡 Mode simulation - Aucune connexion Supabase réelle
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
