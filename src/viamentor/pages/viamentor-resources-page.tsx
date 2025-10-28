/**
 * VIAMENTOR - Resources Page
 * Page ressources avec lead magnets et modal capture email
 */

import { useState } from "react";
import {
  DownloadIcon,
  FileTextIcon,
  CheckSquareIcon,
  FileSpreadsheetIcon,
  VideoIcon,
  XIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";
import { MarketingNav } from "@/viamentor/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/viamentor/components/viamentor-marketing-footer";

// ============================================================================
// TYPES
// ============================================================================

interface ResourcesPageProps {
  initialLocale?: MarketingLocale;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "ebook" | "checklist" | "template" | "webinar";
  format: string;
  thumbnail: string;
  downloadUrl: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Guide complet QR-factures Swiss",
    description:
      "Ebook PDF de 25 pages pour maîtriser les QR-factures suisses. Conformité, mise en place et bonnes pratiques.",
    type: "ebook",
    format: "PDF - 25 pages",
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop",
    downloadUrl: "/downloads/guide-qr-factures.pdf",
  },
  {
    id: "2",
    title: "30 points conformité OAC",
    description:
      "Checklist complète pour vérifier la conformité de votre auto-école aux exigences OAC 2025.",
    type: "checklist",
    format: "PDF - 5 pages",
    thumbnail:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
    downloadUrl: "/downloads/checklist-oac.pdf",
  },
  {
    id: "3",
    title: "Budget prévisionnel auto-école",
    description:
      "Template Excel personnalisable pour planifier votre budget annuel avec formules automatiques.",
    type: "template",
    format: "Excel - .xlsx",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    downloadUrl: "/downloads/template-budget.xlsx",
  },
  {
    id: "4",
    title: "Optimiser planning moniteurs",
    description:
      "Webinar replay de 45 minutes avec slides et transcript. Stratégies d'optimisation du planning.",
    type: "webinar",
    format: "Vidéo - 45 min",
    thumbnail:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop",
    downloadUrl: "/downloads/webinar-planning.mp4",
  },
  {
    id: "5",
    title: "Marketing digital auto-école",
    description:
      "Ebook stratégique de 30 pages sur le marketing digital: SEO, Google Ads, réseaux sociaux.",
    type: "ebook",
    format: "PDF - 30 pages",
    thumbnail:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop",
    downloadUrl: "/downloads/guide-marketing.pdf",
  },
  {
    id: "6",
    title: "Grille évaluation élève",
    description:
      "Template Excel pour évaluer la progression de vos élèves selon les thèmes L-drive OAC.",
    type: "template",
    format: "Excel - .xlsx",
    thumbnail:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    downloadUrl: "/downloads/template-evaluation.xlsx",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function ResourcesPage({ initialLocale = "fr" }: ResourcesPageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const t = getMarketingTranslations(locale);

  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTypeIcon = (type: string) => {
    const icons = {
      ebook: FileTextIcon,
      checklist: CheckSquareIcon,
      template: FileSpreadsheetIcon,
      webinar: VideoIcon,
    };
    return icons[type as keyof typeof icons] || FileTextIcon;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      ebook: t.resources.types.ebook,
      checklist: t.resources.types.checklist,
      template: t.resources.types.template,
      webinar: t.resources.types.webinar,
    };
    return labels[type] || type;
  };

  const handleDownloadClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In production: send email to ConvertKit/Mailchimp
    console.log("Lead captured:", { email, resource: selectedResource?.title });

    // Trigger download
    if (selectedResource) {
      window.open(selectedResource.downloadUrl, "_blank");
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
    setEmail("");
    setConsent(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MarketingNav locale={locale} onLocaleChange={setLocale} />

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t.resources.hero.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.resources.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);

              return (
                <Card
                  key={resource.id}
                  className="group overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <Badge className="absolute left-3 top-3 gap-1 bg-background/90 text-foreground">
                      <TypeIcon className="h-3.5 w-3.5" />

                      {getTypeLabel(resource.type)}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      {resource.title}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                    <div className="mb-4 text-xs text-muted-foreground">
                      {resource.format}
                    </div>
                    <Button
                      className="w-full gap-2"
                      onClick={() => handleDownloadClick(resource)}
                    >
                      <DownloadIcon className="h-4 w-4" />

                      {t.resources.download.button}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.resources.download.modalTitle}</DialogTitle>
            <DialogDescription>{selectedResource?.title}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.resources.download.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.ch"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
                required
              />

              <Label
                htmlFor="consent"
                className="text-sm font-normal leading-tight text-muted-foreground"
              >
                {t.resources.download.consent}
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!consent || isSubmitting}
            >
              {isSubmitting ? "Téléchargement..." : t.resources.download.submit}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <MarketingFooter locale={locale} />
    </div>
  );
}
