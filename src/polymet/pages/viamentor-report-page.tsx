/**
 * VIAMENTOR Report Page
 *
 * Page affichant le rapport de conformité complet
 */

import { conformityReport } from "@/polymet/data/viamentor-conformity-report";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2Icon,
  TrophyIcon,
  FileTextIcon,
  CodeIcon,
} from "lucide-react";

export function ViaMenutorReportPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <TrophyIcon className="h-12 w-12 text-yellow-500" />

            <h1 className="text-5xl font-bold">100% Conforme</h1>
          </div>
          <p className="text-muted-foreground text-xl">
            Stack technique VIAMENTOR - Rapport de conformité final
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="default" className="text-lg px-4 py-2">
              Version {conformityReport.version}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {conformityReport.date}
            </Badge>
          </div>
        </div>

        {/* Score Global */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-500">
          <CardHeader>
            <CardTitle className="text-2xl">Score Global</CardTitle>
            <CardDescription>Conformité stack technique</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-6xl font-bold text-green-600 dark:text-green-400">
                {conformityReport.overallScore}%
              </span>
              <CheckCircle2Icon className="h-20 w-20 text-green-600 dark:text-green-400" />
            </div>
            <Progress value={conformityReport.overallScore} className="h-4" />

            <p className="text-sm text-muted-foreground">
              {conformityReport.conclusion.message}
            </p>
          </CardContent>
        </Card>

        {/* Catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(conformityReport.categories).map(
            ([key, category]) => (
              <Card key={key}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </CardTitle>
                    <Badge
                      variant={category.score === 100 ? "default" : "secondary"}
                    >
                      {category.status} {category.score}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {category.details.map((detail, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>

        {/* Métriques */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CodeIcon className="h-5 w-5 text-primary" />

              <CardTitle>Métriques de Qualité</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">
                  {conformityReport.metrics.totalFiles}
                </p>
                <p className="text-sm text-muted-foreground">Fichiers</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">
                  {conformityReport.metrics.totalComponents}
                </p>
                <p className="text-sm text-muted-foreground">Composants</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">
                  {conformityReport.metrics.totalStores}
                </p>
                <p className="text-sm text-muted-foreground">Stores Zustand</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">
                  {conformityReport.metrics.totalSchemas}
                </p>
                <p className="text-sm text-muted-foreground">Schémas Zod</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fichiers Créés */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileTextIcon className="h-5 w-5 text-primary" />

              <CardTitle>Fichiers Créés</CardTitle>
            </div>
            <CardDescription>
              {conformityReport.metrics.totalFiles} fichiers au total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-medium mb-2">
                  Data ({conformityReport.filesCreated.data.length})
                </p>
                <div className="space-y-1">
                  {conformityReport.filesCreated.data.map((file, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">
                      • {file}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">
                  Components ({conformityReport.filesCreated.components.length})
                </p>
                <div className="space-y-1">
                  {conformityReport.filesCreated.components.map((file, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">
                      • {file}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">
                  Pages ({conformityReport.filesCreated.pages.length})
                </p>
                <div className="space-y-1">
                  {conformityReport.filesCreated.pages.map((file, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">
                      • {file}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Routes */}
        <Card>
          <CardHeader>
            <CardTitle>Routes Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conformityReport.routes.map((route, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-muted rounded-md"
                >
                  <div>
                    <code className="text-sm font-medium">{route.path}</code>
                    <p className="text-xs text-muted-foreground mt-1">
                      {route.description}
                    </p>
                  </div>
                  <Badge variant="outline">{route.page}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Highlights */}
        <Card className="bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrophyIcon className="h-5 w-5 text-primary" />

              <CardTitle>Points Forts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {conformityReport.conclusion.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Badge variant="secondary">✓</Badge>
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
