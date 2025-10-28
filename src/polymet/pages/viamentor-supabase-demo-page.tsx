/**
 * VIAMENTOR - Supabase Mock Demo Page
 * Page de démonstration et configuration de la simulation Supabase
 *
 * Features:
 * - Test connexion/déconnexion
 * - Configuration auto-login
 * - Liste des utilisateurs mock
 * - Documentation API mock
 */

"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useSupabaseMock,
  setAutoLogin,
  getAutoLogin,
  MOCK_USERS,
  MOCK_TENANTS,
} from "@/polymet/data/viamentor-supabase-mock";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2Icon,
  XCircleIcon,
  UserIcon,
  LogInIcon,
  LogOutIcon,
  DatabaseIcon,
  ShieldCheckIcon,
  SettingsIcon,
  BookOpenIcon,
  ArrowLeftIcon,
} from "lucide-react";

export function ViaMenutorSupabaseDemoPage() {
  const [client] = useState(() => useSupabaseMock());
  const [user, setUser] = useState<any>(null);
  const [autoLoginEnabled, setAutoLoginEnabled] = useState(getAutoLogin());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await client.auth.getUser();
    setUser(data.user);
  };

  const handleLogin = async (email: string) => {
    setLoading(true);
    setMessage("");
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password: "viamentor2025",
      });

      if (error) {
        setMessage(`❌ ${error.message}`);
      } else {
        setMessage("✅ Connexion réussie!");
        setUser(data.user);
      }
    } catch (e: any) {
      setMessage(`❌ ${e.message}`);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await client.auth.signOut();
    setUser(null);
    setMessage("✅ Déconnexion réussie!");
    setLoading(false);
  };

  const toggleAutoLogin = (checked: boolean) => {
    setAutoLogin(checked);
    setAutoLoginEnabled(checked);
    setMessage(checked ? "✅ Auto-login activé" : "ℹ️ Auto-login désactivé");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />

              <div className="flex items-center gap-3">
                <DatabaseIcon className="h-6 w-6 text-primary" />

                <div>
                  <h1 className="text-xl font-bold">
                    Supabase Mock - Simulation
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Configuration et test de l'authentification mock
                  </p>
                </div>
              </div>
            </div>
            {user && (
              <Badge variant="secondary" className="gap-2">
                <CheckCircle2Icon className="h-3 w-3 text-green-500" />
                Connecté: {user.user_metadata.name}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8">
        <Tabs defaultValue="status" className="space-y-6">
          <TabsList>
            <TabsTrigger value="status">
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              Statut
            </TabsTrigger>
            <TabsTrigger value="users">
              <UserIcon className="h-4 w-4 mr-2" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="config">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="docs">
              <BookOpenIcon className="h-4 w-4 mr-2" />
              Documentation
            </TabsTrigger>
          </TabsList>

          {/* Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {user ? (
                    <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-500" />
                  )}
                  Statut de connexion
                </CardTitle>
                <CardDescription>
                  État actuel de l'authentification Supabase Mock
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <UserIcon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold">
                          {user.user_metadata.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">
                            {user.user_metadata.role}
                          </Badge>
                          <Badge variant="outline">ID: {user.id}</Badge>
                        </div>
                      </div>
                      <Button
                        onClick={handleLogout}
                        disabled={loading}
                        variant="outline"
                      >
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        Déconnexion
                      </Button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <Link to="/dashboard">
                        <Button variant="default" className="w-full">
                          Dashboard
                        </Button>
                      </Link>
                      <Link to="/students">
                        <Button variant="outline" className="w-full">
                          Élèves
                        </Button>
                      </Link>
                      <Link to="/instructors">
                        <Button variant="outline" className="w-full">
                          Moniteurs
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <XCircleIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

                    <p className="text-lg font-medium mb-2">Non connecté</p>
                    <p className="text-sm text-muted-foreground">
                      Utilisez l'onglet "Utilisateurs" pour vous connecter
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Message */}
            {message && (
              <Card
                className={
                  message.includes("✅")
                    ? "border-green-500"
                    : message.includes("❌")
                      ? "border-red-500"
                      : "border-blue-500"
                }
              >
                <CardContent className="p-4">
                  <p className="text-center font-medium">{message}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs Mock Disponibles</CardTitle>
                <CardDescription>
                  Cliquez sur "Connexion" pour vous authentifier (mot de passe:{" "}
                  <span className="font-bold text-primary">viamentor2025</span>)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(MOCK_USERS).map(([email, userData]) => (
                    <Card
                      key={email}
                      className="hover:border-primary transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                            <UserIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">
                              {userData.user_metadata.name}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {email}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {userData.user_metadata.role}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleLogin(email)}
                            disabled={loading}
                          >
                            <LogInIcon className="h-4 w-4 mr-2" />
                            Connexion
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tenants */}
            <Card>
              <CardHeader>
                <CardTitle>Tenants Mock Disponibles</CardTitle>
                <CardDescription>
                  Organisations disponibles dans la simulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {Object.entries(MOCK_TENANTS).map(([slug, tenant]) => (
                    <div
                      key={slug}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                        <DatabaseIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{tenant.name}</p>
                        <p className="text-xs text-muted-foreground">{slug}</p>
                      </div>
                      <Badge variant="secondary">{tenant.plan}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Config Tab */}
          <TabsContent value="config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Auto-Login</CardTitle>
                <CardDescription>
                  Active la connexion automatique au chargement de l'application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label
                      htmlFor="auto-login"
                      className="text-base font-medium cursor-pointer"
                    >
                      Activer l'auto-login
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Connexion automatique avec school_admin par défaut
                    </p>
                  </div>
                  <Switch
                    id="auto-login"
                    checked={autoLoginEnabled}
                    onCheckedChange={toggleAutoLogin}
                  />
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm">
                    💡 <strong>Info:</strong> Avec l'auto-login activé, vous
                    serez automatiquement connecté en tant que{" "}
                    <code className="bg-background px-1 py-0.5 rounded">
                      school_admin
                    </code>{" "}
                    lors du chargement de l'application.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Docs Tab */}
          <TabsContent value="docs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fonctionnalités Mock</CardTitle>
                <CardDescription>
                  Capacités de la simulation Supabase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2Icon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />

                    <div>
                      <p className="font-medium">
                        Auth mock avec session persistence
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Sessions sauvegardées dans localStorage
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2Icon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />

                    <div>
                      <p className="font-medium">Database mock pour tenants</p>
                      <p className="text-sm text-muted-foreground">
                        Requêtes simulées avec délais réalistes
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2Icon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />

                    <div>
                      <p className="font-medium">Auto-login configurable</p>
                      <p className="text-sm text-muted-foreground">
                        Connexion automatique pour développement rapide
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2Icon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />

                    <div>
                      <p className="font-medium">4 utilisateurs de test</p>
                      <p className="text-sm text-muted-foreground">
                        platform_admin, school_admin, instructor, student
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2Icon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />

                    <div>
                      <p className="font-medium">
                        Pas de connexion Supabase réelle
                      </p>
                      <p className="text-sm text-muted-foreground">
                        100% simulation locale, aucune dépendance externe
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utilisation</CardTitle>
                <CardDescription>
                  Comment utiliser la simulation dans votre code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Import et utilisation:</p>
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                    {`import { useSupabaseMock } from "@/polymet/data/viamentor-supabase-mock";

// Dans votre composant
const supabase = useSupabaseMock();

// Connexion
const { data, error } = await supabase.auth.signInWithPassword({
  email: "school@viamentor.ch",
  password: "viamentor2025"
});

// Vérifier l'utilisateur
const { data: { user } } = await supabase.auth.getUser();

// Déconnexion
await supabase.auth.signOut();`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
