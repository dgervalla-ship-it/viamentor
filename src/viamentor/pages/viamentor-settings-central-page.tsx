/**
 * VIAMENTOR - Settings Central Page
 * Page centrale paramètres avec navigation par sections
 *
 * Architecture:
 * - /settings → Hub central avec navigation par sections
 * - Sections: École / Utilisateurs / Facturation / Marketing / Système
 * - Chaque section contient les settings pertinents
 *
 * @module pages/viamentor-settings-central-page
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2Icon,
  UsersIcon,
  CreditCardIcon,
  TrendingUpIcon,
  SettingsIcon,
  BellIcon,
  FolderIcon,
  GraduationCapIcon,
  RotateCcwIcon,
  MessageSquareIcon,
  SlidersIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ============================================================================
// TYPES
// ============================================================================

interface SettingsCentralPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface SettingItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: {
    text: string;
    variant: "default" | "secondary" | "success" | "warning" | "destructive";
  };
}

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SettingItem[];
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const TRANSLATIONS = {
  fr: {
    title: "Paramètres & Configuration",
    subtitle:
      "Gérez tous les paramètres de votre auto-école depuis un seul endroit",
    tabs: {
      school: "École",
      users: "Utilisateurs",
      billing: "Facturation",
      marketing: "Marketing",
      system: "Système",
    },
    sections: {
      school: {
        title: "Paramètres École",
        description: "Configuration générale de votre auto-école",
        items: {
          general: {
            title: "Informations Générales",
            description: "Nom, adresse, horaires, contact de l'école",
          },
          categories: {
            title: "Catégories de Permis",
            description:
              "Gérez les catégories de permis proposées (A, B, C, etc.)",
          },
          courseTypes: {
            title: "Types de Cours",
            description: "Configuration des cours théoriques et pratiques",
          },
          rooms: {
            title: "Salles de Formation",
            description: "Gestion des salles pour cours théoriques",
          },
        },
      },
      users: {
        title: "Gestion Utilisateurs",
        description: "Comptes, rôles et permissions",
        items: {
          users: {
            title: "Comptes Utilisateurs",
            description:
              "Gérez les comptes moniteurs, secrétaires et administrateurs",
          },
          roles: {
            title: "Rôles & Permissions",
            description: "Configuration des rôles et droits d'accès RBAC",
          },
        },
      },
      billing: {
        title: "Facturation & Tarifs",
        description: "Configuration financière et comptable",
        items: {
          pricing: {
            title: "Tarification",
            description: "Prix des leçons, forfaits, promotions et TVA",
          },
          notifications: {
            title: "Notifications",
            description: "Templates emails/SMS pour rappels et communications",
          },
          makeups: {
            title: "Rattrapages",
            description: "Configuration du système de crédits de rattrapage",
          },
        },
      },
      marketing: {
        title: "Marketing & Communication",
        description: "Outils marketing et gestion de la réputation",
        items: {
          reviews: {
            title: "Avis Google",
            description: "Configuration Google Business et gestion des avis",
          },
          campaigns: {
            title: "Campagnes Marketing",
            description: "Configuration des campagnes et tracking pixels",
            badge: { text: "Bientôt", variant: "secondary" },
          },
        },
      },
      system: {
        title: "Système & Intégrations",
        description: "Configuration technique et intégrations",
        items: {
          integrations: {
            title: "Intégrations",
            description: "Stripe, Twilio, Google Business, webhooks",
          },
          advanced: {
            title: "Paramètres Avancés",
            description: "Configuration technique et API",
            badge: { text: "Admin", variant: "warning" },
          },
        },
      },
    },
    actions: {
      configure: "Configurer",
      viewAll: "Voir tout",
    },
  },
  de: {
    title: "Einstellungen & Konfiguration",
    subtitle: "Verwalten Sie alle Einstellungen Ihrer Fahrschule an einem Ort",
    tabs: {
      school: "Schule",
      users: "Benutzer",
      billing: "Abrechnung",
      marketing: "Marketing",
      system: "System",
    },
    sections: {
      school: {
        title: "Schuleinstellungen",
        description: "Allgemeine Konfiguration Ihrer Fahrschule",
        items: {
          general: {
            title: "Allgemeine Informationen",
            description: "Name, Adresse, Öffnungszeiten, Kontakt der Schule",
          },
          categories: {
            title: "Führerscheinkategorien",
            description: "Verwalten Sie angebotene Kategorien (A, B, C, etc.)",
          },
          courseTypes: {
            title: "Kurstypen",
            description: "Konfiguration von Theorie- und Praxiskursen",
          },
          rooms: {
            title: "Schulungsräume",
            description: "Verwaltung der Räume für Theoriekurse",
          },
        },
      },
      users: {
        title: "Benutzerverwaltung",
        description: "Konten, Rollen und Berechtigungen",
        items: {
          users: {
            title: "Benutzerkonten",
            description:
              "Verwalten Sie Fahrlehrer-, Sekretariats- und Admin-Konten",
          },
          roles: {
            title: "Rollen & Berechtigungen",
            description: "Konfiguration von Rollen und RBAC-Zugriffsrechten",
          },
        },
      },
      billing: {
        title: "Abrechnung & Preise",
        description: "Finanz- und Buchhaltungskonfiguration",
        items: {
          pricing: {
            title: "Preisgestaltung",
            description: "Preise für Lektionen, Pakete, Aktionen und MwSt.",
          },
          notifications: {
            title: "Benachrichtigungen",
            description:
              "E-Mail-/SMS-Vorlagen für Erinnerungen und Kommunikation",
          },
          makeups: {
            title: "Nachholstunden",
            description: "Konfiguration des Nachholstunden-Kreditsystems",
          },
        },
      },
      marketing: {
        title: "Marketing & Kommunikation",
        description: "Marketing-Tools und Reputationsmanagement",
        items: {
          reviews: {
            title: "Google-Bewertungen",
            description:
              "Google Business-Konfiguration und Bewertungsverwaltung",
          },
          campaigns: {
            title: "Marketingkampagnen",
            description: "Kampagnenkonfiguration und Tracking-Pixel",
            badge: { text: "Bald", variant: "secondary" },
          },
        },
      },
      system: {
        title: "System & Integrationen",
        description: "Technische Konfiguration und Integrationen",
        items: {
          integrations: {
            title: "Integrationen",
            description: "Stripe, Twilio, Google Business, Webhooks",
          },
          advanced: {
            title: "Erweiterte Einstellungen",
            description: "Technische Konfiguration und API",
            badge: { text: "Admin", variant: "warning" },
          },
        },
      },
    },
    actions: {
      configure: "Konfigurieren",
      viewAll: "Alle anzeigen",
    },
  },
  it: {
    title: "Impostazioni & Configurazione",
    subtitle:
      "Gestisci tutte le impostazioni della tua scuola guida da un unico posto",
    tabs: {
      school: "Scuola",
      users: "Utenti",
      billing: "Fatturazione",
      marketing: "Marketing",
      system: "Sistema",
    },
    sections: {
      school: {
        title: "Impostazioni Scuola",
        description: "Configurazione generale della tua scuola guida",
        items: {
          general: {
            title: "Informazioni Generali",
            description: "Nome, indirizzo, orari, contatto della scuola",
          },
          categories: {
            title: "Categorie Patente",
            description:
              "Gestisci le categorie di patente offerte (A, B, C, ecc.)",
          },
          courseTypes: {
            title: "Tipi di Corso",
            description: "Configurazione dei corsi teorici e pratici",
          },
          rooms: {
            title: "Aule di Formazione",
            description: "Gestione delle aule per corsi teorici",
          },
        },
      },
      users: {
        title: "Gestione Utenti",
        description: "Account, ruoli e permessi",
        items: {
          users: {
            title: "Account Utenti",
            description:
              "Gestisci gli account istruttori, segretari e amministratori",
          },
          roles: {
            title: "Ruoli & Permessi",
            description: "Configurazione dei ruoli e diritti di accesso RBAC",
          },
        },
      },
      billing: {
        title: "Fatturazione & Tariffe",
        description: "Configurazione finanziaria e contabile",
        items: {
          pricing: {
            title: "Tariffazione",
            description: "Prezzi delle lezioni, pacchetti, promozioni e IVA",
          },
          notifications: {
            title: "Notifiche",
            description: "Template email/SMS per promemoria e comunicazioni",
          },
          makeups: {
            title: "Recuperi",
            description: "Configurazione del sistema di crediti di recupero",
          },
        },
      },
      marketing: {
        title: "Marketing & Comunicazione",
        description: "Strumenti marketing e gestione della reputazione",
        items: {
          reviews: {
            title: "Recensioni Google",
            description: "Configurazione Google Business e gestione recensioni",
          },
          campaigns: {
            title: "Campagne Marketing",
            description: "Configurazione campagne e tracking pixel",
            badge: { text: "Presto", variant: "secondary" },
          },
        },
      },
      system: {
        title: "Sistema & Integrazioni",
        description: "Configurazione tecnica e integrazioni",
        items: {
          integrations: {
            title: "Integrazioni",
            description: "Stripe, Twilio, Google Business, webhook",
          },
          advanced: {
            title: "Impostazioni Avanzate",
            description: "Configurazione tecnica e API",
            badge: { text: "Admin", variant: "warning" },
          },
        },
      },
    },
    actions: {
      configure: "Configura",
      viewAll: "Vedi tutto",
    },
  },
  en: {
    title: "Settings & Configuration",
    subtitle: "Manage all your driving school settings from one place",
    tabs: {
      school: "School",
      users: "Users",
      billing: "Billing",
      marketing: "Marketing",
      system: "System",
    },
    sections: {
      school: {
        title: "School Settings",
        description: "General configuration of your driving school",
        items: {
          general: {
            title: "General Information",
            description: "School name, address, hours, contact",
          },
          categories: {
            title: "License Categories",
            description: "Manage offered license categories (A, B, C, etc.)",
          },
          courseTypes: {
            title: "Course Types",
            description: "Configuration of theory and practical courses",
          },
          rooms: {
            title: "Training Rooms",
            description: "Management of rooms for theory courses",
          },
        },
      },
      users: {
        title: "User Management",
        description: "Accounts, roles and permissions",
        items: {
          users: {
            title: "User Accounts",
            description: "Manage instructor, secretary and admin accounts",
          },
          roles: {
            title: "Roles & Permissions",
            description: "Configuration of roles and RBAC access rights",
          },
        },
      },
      billing: {
        title: "Billing & Pricing",
        description: "Financial and accounting configuration",
        items: {
          pricing: {
            title: "Pricing",
            description: "Lesson prices, packages, promotions and VAT",
          },
          notifications: {
            title: "Notifications",
            description: "Email/SMS templates for reminders and communications",
          },
          makeups: {
            title: "Makeups",
            description: "Configuration of makeup credit system",
          },
        },
      },
      marketing: {
        title: "Marketing & Communication",
        description: "Marketing tools and reputation management",
        items: {
          reviews: {
            title: "Google Reviews",
            description: "Google Business configuration and review management",
          },
          campaigns: {
            title: "Marketing Campaigns",
            description: "Campaign configuration and tracking pixels",
            badge: { text: "Soon", variant: "secondary" },
          },
        },
      },
      system: {
        title: "System & Integrations",
        description: "Technical configuration and integrations",
        items: {
          integrations: {
            title: "Integrations",
            description: "Stripe, Twilio, Google Business, webhooks",
          },
          advanced: {
            title: "Advanced Settings",
            description: "Technical configuration and API",
            badge: { text: "Admin", variant: "warning" },
          },
        },
      },
    },
    actions: {
      configure: "Configure",
      viewAll: "View all",
    },
  },
};

// ============================================================================
// SETTINGS SECTIONS DATA
// ============================================================================

const getSettingsSections = (t: typeof TRANSLATIONS.fr): SettingSection[] => [
  {
    id: "school",
    title: t.sections.school.title,
    description: t.sections.school.description,
    icon: Building2Icon,
    items: [
      {
        id: "school-general",
        title: t.sections.school.items.general.title,
        description: t.sections.school.items.general.description,
        href: "/settings/school",
        icon: Building2Icon,
      },
      {
        id: "categories",
        title: t.sections.school.items.categories.title,
        description: t.sections.school.items.categories.description,
        href: "/settings/categories",
        icon: FolderIcon,
      },
      {
        id: "course-types",
        title: t.sections.school.items.courseTypes.title,
        description: t.sections.school.items.courseTypes.description,
        href: "/settings/course-types",
        icon: GraduationCapIcon,
      },
      {
        id: "rooms",
        title: t.sections.school.items.rooms.title,
        description: t.sections.school.items.rooms.description,
        href: "/rooms",
        icon: Building2Icon,
      },
    ],
  },
  {
    id: "users",
    title: t.sections.users.title,
    description: t.sections.users.description,
    icon: UsersIcon,
    items: [
      {
        id: "users-management",
        title: t.sections.users.items.users.title,
        description: t.sections.users.items.users.description,
        href: "/settings/users",
        icon: UsersIcon,
      },
      {
        id: "roles",
        title: t.sections.users.items.roles.title,
        description: t.sections.users.items.roles.description,
        href: "/admin/rbac",
        icon: SettingsIcon,
      },
    ],
  },
  {
    id: "billing",
    title: t.sections.billing.title,
    description: t.sections.billing.description,
    icon: CreditCardIcon,
    items: [
      {
        id: "pricing",
        title: t.sections.billing.items.pricing.title,
        description: t.sections.billing.items.pricing.description,
        href: "/settings/pricing",
        icon: CreditCardIcon,
      },
      {
        id: "notifications",
        title: t.sections.billing.items.notifications.title,
        description: t.sections.billing.items.notifications.description,
        href: "/settings/notifications",
        icon: BellIcon,
      },
      {
        id: "makeups",
        title: t.sections.billing.items.makeups.title,
        description: t.sections.billing.items.makeups.description,
        href: "/settings/makeups",
        icon: RotateCcwIcon,
      },
    ],
  },
  {
    id: "marketing",
    title: t.sections.marketing.title,
    description: t.sections.marketing.description,
    icon: TrendingUpIcon,
    items: [
      {
        id: "reviews",
        title: t.sections.marketing.items.reviews.title,
        description: t.sections.marketing.items.reviews.description,
        href: "/settings/reviews",
        icon: MessageSquareIcon,
      },
      {
        id: "campaigns",
        title: t.sections.marketing.items.campaigns.title,
        description: t.sections.marketing.items.campaigns.description,
        href: "/staff/marketing/campaigns",
        icon: TrendingUpIcon,
        badge: t.sections.marketing.items.campaigns.badge,
      },
    ],
  },
  {
    id: "system",
    title: t.sections.system.title,
    description: t.sections.system.description,
    icon: SettingsIcon,
    items: [
      {
        id: "integrations",
        title: t.sections.system.items.integrations.title,
        description: t.sections.system.items.integrations.description,
        href: "/settings/integrations",
        icon: SlidersIcon,
      },
      {
        id: "advanced",
        title: t.sections.system.items.advanced.title,
        description: t.sections.system.items.advanced.description,
        href: "/config",
        icon: SettingsIcon,
        badge: t.sections.system.items.advanced.badge,
      },
    ],
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function SettingsCentralPage({
  locale = "fr",
}: SettingsCentralPageProps) {
  const t = TRANSLATIONS[locale];
  const sections = getSettingsSections(t);
  const [activeTab, setActiveTab] = useState("school");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t.title}
        </h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="school" className="gap-2">
            <Building2Icon className="h-4 w-4" />

            <span className="hidden sm:inline">{t.tabs.school}</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <UsersIcon className="h-4 w-4" />

            <span className="hidden sm:inline">{t.tabs.users}</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCardIcon className="h-4 w-4" />

            <span className="hidden sm:inline">{t.tabs.billing}</span>
          </TabsTrigger>
          <TabsTrigger value="marketing" className="gap-2">
            <TrendingUpIcon className="h-4 w-4" />

            <span className="hidden sm:inline">{t.tabs.marketing}</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2">
            <SettingsIcon className="h-4 w-4" />

            <span className="hidden sm:inline">{t.tabs.system}</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        {sections.map((section) => (
          <TabsContent
            key={section.id}
            value={section.id}
            className="mt-6 space-y-6"
          >
            {/* Section Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <section.icon className="h-5 w-5 text-muted-foreground" />

                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
            </div>

            {/* Settings Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <Link key={item.id} to={item.href}>
                  <Card className="group h-full transition-all hover:border-primary hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-muted p-2 transition-colors group-hover:bg-primary/10">
                            <item.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                          </div>
                          <CardTitle className="text-base">
                            {item.title}
                          </CardTitle>
                        </div>
                        {item.badge && (
                          <Badge variant={item.badge.variant}>
                            {item.badge.text}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="mt-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between group-hover:bg-primary/5"
                      >
                        {t.actions.configure}
                        <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
