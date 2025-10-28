/**
 * ============================================================================
 * VIAMENTOR - Page Démonstration Responsive & Mobile
 * Architecture modulaire avec composants réutilisables
 * ============================================================================
 *
 * Démonstration complète des améliorations responsive
 *
 * @version 2.0.0 - Refactored with modular components
 */

import React, { useState } from "react";
import { useResponsive } from "@/viamentor/data/viamentor-responsive-utils";
import { DemoHeader } from "@/viamentor/components/viamentor-demo-header";
import { DemoSection } from "@/viamentor/components/viamentor-demo-section";
import { DemoStatsGrid } from "@/viamentor/components/viamentor-demo-stats-grid";
import { ResponsiveDashboard } from "@/viamentor/components/viamentor-responsive-dashboard";
import { MobileWizard } from "@/viamentor/components/viamentor-mobile-wizard";
import { SwipeableCardList } from "@/viamentor/components/viamentor-swipeable-card";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SmartphoneIcon,
  TabletIcon,
  MonitorIcon,
  TrendingUpIcon,
  UsersIcon,
  CarIcon,
  CalendarIcon,
  EuroIcon,
  EditIcon,
  TrashIcon,
  PhoneIcon,
  MailIcon,
  CheckCircle2Icon,
  LayoutDashboardIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface ResponsiveDemoPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockKPIs = [
  {
    id: "students",
    label: "Élèves actifs",
    value: "248",
    change: 12,
    trend: "up" as const,
    icon: <UsersIcon className="h-5 w-5" />,

    color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    id: "lessons",
    label: "Leçons cette semaine",
    value: "156",
    change: 8,
    trend: "up" as const,
    icon: <CalendarIcon className="h-5 w-5" />,

    color: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
  },
  {
    id: "vehicles",
    label: "Véhicules disponibles",
    value: "12",
    change: 0,
    trend: "neutral" as const,
    icon: <CarIcon className="h-5 w-5" />,

    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  },
  {
    id: "revenue",
    label: "Revenus du mois",
    value: "€45,280",
    change: 15,
    trend: "up" as const,
    icon: <EuroIcon className="h-5 w-5" />,

    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  },
];

const mockChartsData = {
  revenue: [
    { name: "Jan", value: 35000 },
    { name: "Fév", value: 38000 },
    { name: "Mar", value: 42000 },
    { name: "Avr", value: 45280 },
    { name: "Mai", value: 48000 },
    { name: "Juin", value: 52000 },
  ],

  students: [
    { name: "Jan", value: 45 },
    { name: "Fév", value: 52 },
    { name: "Mar", value: 48 },
    { name: "Avr", value: 61 },
    { name: "Mai", value: 55 },
    { name: "Juin", value: 67 },
  ],

  lessons: [
    { name: "Sem 1", value: 142 },
    { name: "Sem 2", value: 156 },
    { name: "Sem 3", value: 148 },
    { name: "Sem 4", value: 165 },
  ],

  distribution: [
    { name: "Cat. B", value: 156 },
    { name: "Cat. A", value: 48 },
    { name: "Cat. C", value: 32 },
    { name: "Cat. D", value: 12 },
  ],
};

const mockStudents = [
  {
    id: 1,
    name: "Sophie Martin",
    category: "Cat. B",
    status: "active",
    nextLesson: "Lun 15:00",
    avatar: "https://github.com/yahyabedirhan.png",
  },
  {
    id: 2,
    name: "Lucas Dubois",
    category: "Cat. A",
    status: "pending",
    nextLesson: "Mar 10:30",
    avatar: "https://github.com/kdrnp.png",
  },
  {
    id: 3,
    name: "Emma Bernard",
    category: "Cat. B",
    status: "active",
    nextLesson: "Mer 14:00",
    avatar: "https://github.com/shoaibux1.png",
  },
];

// ============================================================================
// WIZARD STEPS CONFIGURATION
// ============================================================================

const getWizardSteps = () => [
  {
    id: "personal",
    title: "Informations personnelles",
    description: "Vos coordonnées",
    icon: <UsersIcon className="h-5 w-5" />,

    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet *</Label>
          <Input id="name" placeholder="Jean Dupont" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="jean@example.com" />
        </div>
      </div>
    ),
  },
  {
    id: "category",
    title: "Catégorie",
    description: "Choisissez votre formation",
    icon: <CarIcon className="h-5 w-5" />,

    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Sélectionnez la catégorie de permis souhaitée
        </p>
      </div>
    ),
  },
  {
    id: "confirm",
    title: "Confirmation",
    description: "Vérifiez vos informations",
    icon: <CheckCircle2Icon className="h-5 w-5" />,

    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Vérifiez que toutes les informations sont correctes
        </p>
      </div>
    ),
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ResponsiveDemoPage({ locale = "fr" }: ResponsiveDemoPageProps) {
  const responsive = useResponsive();
  const [showWizard, setShowWizard] = useState(false);
  const [students, setStudents] = useState(mockStudents);

  const wizardSteps = getWizardSteps();

  // Device badges for header
  const deviceBadges = [];
  if (responsive.isMobile) {
    deviceBadges.push({
      label: "Mobile",
      icon: SmartphoneIcon,
      variant: "default" as const,
    });
  }
  if (responsive.isTablet) {
    deviceBadges.push({
      label: "Tablet",
      icon: TabletIcon,
      variant: "secondary" as const,
    });
  }
  if (responsive.isDesktop) {
    deviceBadges.push({
      label: "Desktop",
      icon: MonitorIcon,
      variant: "outline" as const,
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <DemoHeader
        title="Démonstration Responsive"
        description="Améliorations mobile & touch gestures"
        icon={LayoutDashboardIcon}
        badges={deviceBadges}
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="wizard">Wizard</TabsTrigger>
            <TabsTrigger value="swipe">Swipe Cards</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <DemoSection
              title="Dashboard Responsive"
              description="Layout adaptatif selon le device: Tabs sur mobile, grille 2 colonnes sur tablette, grille 2x2 sur desktop"
              icon={TrendingUpIcon}
            >
              <ResponsiveDashboard
                kpis={mockKPIs}
                chartsData={mockChartsData}
                onKPIClick={(kpi) => console.log("KPI clicked:", kpi.id)}
              />
            </DemoSection>
          </TabsContent>

          {/* Wizard Tab */}
          <TabsContent value="wizard" className="space-y-6">
            <DemoSection
              title="Mobile Wizard"
              description="Wizard optimisé mobile avec swipe navigation, progress bar et sticky footer"
            >
              {!showWizard ? (
                <Button onClick={() => setShowWizard(true)}>
                  Démarrer le wizard
                </Button>
              ) : (
                <div className="h-[600px]">
                  <MobileWizard
                    steps={wizardSteps}
                    onComplete={() => {
                      alert("Wizard terminé !");
                      setShowWizard(false);
                    }}
                    onCancel={() => setShowWizard(false)}
                    showProgress
                    showStepIndicator
                    allowSwipe
                  />
                </div>
              )}
            </DemoSection>
          </TabsContent>

          {/* Swipe Cards Tab */}
          <TabsContent value="swipe" className="space-y-6">
            <DemoSection
              title="Swipeable Cards"
              description="Cards avec actions swipe pour interactions rapides sur mobile"
            >
              <SwipeableCardList
                items={students}
                leftActions={(student) => [
                  {
                    id: "call",
                    label: "Appeler",
                    icon: <PhoneIcon className="h-5 w-5" />,

                    color: "text-green-600",
                    bgColor: "bg-green-100 dark:bg-green-950",
                    onAction: () => alert(`Appeler ${student.name}`),
                  },
                  {
                    id: "email",
                    label: "Email",
                    icon: <MailIcon className="h-5 w-5" />,

                    color: "text-blue-600",
                    bgColor: "bg-blue-100 dark:bg-blue-950",
                    onAction: () => alert(`Email ${student.name}`),
                  },
                ]}
                rightActions={(student) => [
                  {
                    id: "edit",
                    label: "Modifier",
                    icon: <EditIcon className="h-5 w-5" />,

                    color: "text-orange-600",
                    bgColor: "bg-orange-100 dark:bg-orange-950",
                    onAction: () => alert(`Modifier ${student.name}`),
                  },
                  {
                    id: "delete",
                    label: "Supprimer",
                    icon: <TrashIcon className="h-5 w-5" />,

                    color: "text-red-600",
                    bgColor: "bg-red-100 dark:bg-red-950",
                    onAction: () => {
                      if (confirm(`Supprimer ${student.name} ?`)) {
                        setStudents(
                          students.filter((s) => s.id !== student.id)
                        );
                      }
                    },
                  },
                ]}
                renderItem={(student) => (
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} />

                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {student.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {student.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />

                            {student.nextLesson}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          student.status === "active" ? "default" : "secondary"
                        }
                      >
                        {student.status === "active" ? "Actif" : "En attente"}
                      </Badge>
                    </div>
                  </CardContent>
                )}
              />
            </DemoSection>
          </TabsContent>
        </Tabs>

        {/* Device Info */}
        <DemoSection title="Informations Device" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Breakpoint</p>
              <Badge variant="default">{responsive.breakpoint}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Device</p>
              <Badge variant="secondary">{responsive.deviceType}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Largeur</p>
              <Badge variant="outline">{responsive.width}px</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Orientation</p>
              <Badge variant="outline">{responsive.orientation}</Badge>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
