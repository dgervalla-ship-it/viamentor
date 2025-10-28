/**
 * VIAMENTOR - Documentation Page
 * Documentation technique et guides d'utilisation
 */

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpenIcon,
  SearchIcon,
  FileTextIcon,
  CodeIcon,
  VideoIcon,
  DownloadIcon,
} from "lucide-react";

interface DocumentationPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

const mockDocs = [
  {
    id: "1",
    title: "Guide de démarrage",
    description: "Premiers pas avec Viamentor",
    type: "Guide",
    icon: BookOpenIcon,
  },
  {
    id: "2",
    title: "API Reference",
    description: "Documentation complète de l'API",
    type: "API",
    icon: CodeIcon,
  },
  {
    id: "3",
    title: "Tutoriels vidéo",
    description: "Vidéos de formation",
    type: "Vidéo",
    icon: VideoIcon,
  },
  {
    id: "4",
    title: "Changelog",
    description: "Historique des versions",
    type: "Document",
    icon: FileTextIcon,
  },
];

export function DocumentationPage({ locale = "fr" }: DocumentationPageProps) {
  return (
    <div className="flex min-h-screen flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Documentation
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Documentation technique et guides d'utilisation
        </p>
      </div>

      <Card className="p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Rechercher dans la documentation..."
            className="h-11 border-border pl-9"
          />
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockDocs.map((doc) => {
          const Icon = doc.icon;
          return (
            <Card key={doc.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">{doc.type}</Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </div>
                <Button variant="outline" className="w-full border-border">
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Consulter
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
