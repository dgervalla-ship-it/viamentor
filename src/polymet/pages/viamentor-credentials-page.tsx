/**
 * VIAMENTOR - Page Identifiants
 * Page dédiée à l'affichage des identifiants de connexion
 *
 * @module pages/viamentor-credentials-page
 * @version 1.0.0
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import VIAMENTOR_CREDENTIALS from "@/polymet/data/viamentor-credentials-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  KeyIcon,
  UserIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  CopyIcon,
  ArrowLeftIcon,
  LogInIcon,
} from "lucide-react";

export function ViaMenutorCredentialsPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Retour au Login
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />

              <div className="flex items-center gap-3">
                <KeyIcon className="h-6 w-6 text-primary" />

                <div>
                  <h1 className="text-xl font-bold">
                    Identifiants de Connexion
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    ViaMenutor - Mode Développement
                  </p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="gap-2">
              <ShieldCheckIcon className="h-3 w-3" />
              Simulation Mock
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-6 py-8 space-y-8">
        {/* Password Card - Highlighted */}
        <Card className="border-2 border-primary shadow-lg">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
              Mot de Passe Universel
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg text-center border border-primary/20">
              <p className="text-sm text-muted-foreground mb-3">
                Mot de passe pour <strong>tous les utilisateurs</strong>:
              </p>
              <div className="flex items-center justify-center gap-4">
                <p className="text-5xl font-bold text-primary font-mono tracking-wider">
                  {VIAMENTOR_CREDENTIALS.PASSWORD}
                </p>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleCopy(VIAMENTOR_CREDENTIALS.PASSWORD, "password")
                  }
                  className="h-12 w-12"
                >
                  {copiedField === "password" ? (
                    <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                  ) : (
                    <CopyIcon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
              <CheckCircle2Icon className="h-4 w-4 text-green-500" />

              <span>{VIAMENTOR_CREDENTIALS.PASSWORD_RULES.description}</span>
            </div>
          </CardContent>
        </Card>

        {/* Users Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Utilisateurs de Test</h2>
            <Badge variant="outline">
              {VIAMENTOR_CREDENTIALS.USERS.length} utilisateurs disponibles
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {VIAMENTOR_CREDENTIALS.USERS.map((user, index) => (
              <Card
                key={index}
                className="hover:border-primary transition-all hover:shadow-md"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg">{user.role}</p>
                        <p className="text-xs text-muted-foreground font-normal">
                          {user.description}
                        </p>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">
                        {user.email}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopy(user.email, `email-${index}`)}
                      >
                        {copiedField === `email-${index}` ? (
                          <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                        ) : (
                          <CopyIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Password</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-primary/10 border border-primary/20 rounded text-sm font-mono font-bold text-primary">
                        {user.password}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleCopy(user.password, `password-${index}`)
                        }
                      >
                        {copiedField === `password-${index}` ? (
                          <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                        ) : (
                          <CopyIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Dashboard */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Dashboard par défaut
                    </p>
                    <Badge variant="outline" className="font-mono">
                      {user.dashboard}
                    </Badge>
                  </div>

                  {/* Permissions */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Permissions</p>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.map((perm, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Quick Login Button */}
                  <Link to="/login" className="block">
                    <Button className="w-full mt-2">
                      <LogInIcon className="h-4 w-4 mr-2" />
                      Se connecter
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Comment se connecter ?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold">Connexion Manuelle</h3>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  {VIAMENTOR_CREDENTIALS.INSTRUCTIONS.manual.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold">Connexion Rapide</h3>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  {VIAMENTOR_CREDENTIALS.INSTRUCTIONS.quick.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold">Auto-Login</h3>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  {VIAMENTOR_CREDENTIALS.INSTRUCTIONS.autoLogin.map(
                    (step, i) => (
                      <li key={i}>{step}</li>
                    )
                  )}
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Warning */}
        <Card className="border-yellow-500 bg-yellow-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
              <AlertTriangleIcon className="h-5 w-5" />
              Avertissement de Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="font-semibold">
              {VIAMENTOR_CREDENTIALS.SECURITY.warning}
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {VIAMENTOR_CREDENTIALS.SECURITY.notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
            <div className="flex gap-2 mt-4">
              <Badge variant="outline">
                Environment: {VIAMENTOR_CREDENTIALS.SECURITY.environment}
              </Badge>
              <Badge variant="outline">Simulation Supabase Mock</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-center pb-8">
          <Link to="/login">
            <Button size="lg">
              <LogInIcon className="h-5 w-5 mr-2" />
              Aller à la page de connexion
            </Button>
          </Link>
          <Link to="/supabase-demo">
            <Button variant="outline" size="lg">
              Configuration Supabase Mock
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
