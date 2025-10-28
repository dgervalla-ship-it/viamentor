/**
 * VIAMENTOR - Marketing Manager i18n
 * Traductions FR/DE/IT/EN pour dashboard Marketing Manager
 *
 * SECTIONS:
 * - Dashboard KPIs (campagnes, leads, ROI, conversions)
 * - Campagnes marketing (email, SMS, mixed)
 * - Prospects CRM (pipeline, sources, statuts)
 * - Analytics ROI (attribution, performance, coûts)
 * - Pixels tracking (santé, événements, alertes)
 * - Reviews management (collecte, modération, réponses)
 */

export type MarketingManagerLocale = "fr" | "de" | "it" | "en";

export interface MarketingManagerTranslations {
  page: {
    title: string;
    subtitle: string;
    breadcrumb: string;
  };
  kpis: {
    activeCampaigns: string;
    totalLeads: string;
    avgROI: string;
    conversionRate: string;
    costPerLead: string;
    totalRevenue: string;
  };
  sections: {
    campaigns: string;
    prospects: string;
    analytics: string;
    pixels: string;
    reviews: string;
    quickActions: string;
  };
  campaigns: {
    title: string;
    viewAll: string;
    create: string;
    running: string;
    scheduled: string;
    completed: string;
    draft: string;
    paused: string;
  };
  prospects: {
    title: string;
    viewAll: string;
    newLeads: string;
    contacted: string;
    qualified: string;
    converted: string;
  };
  analytics: {
    title: string;
    viewDetails: string;
    bySource: string;
    byChannel: string;
    attribution: string;
    performance: string;
  };
  pixels: {
    title: string;
    viewHealth: string;
    healthy: string;
    degraded: string;
    down: string;
    events: string;
  };
  reviews: {
    title: string;
    viewAll: string;
    pending: string;
    verified: string;
    avgRating: string;
    totalReviews: string;
  };
  quickActions: {
    createCampaign: string;
    viewProspects: string;
    checkPixels: string;
    exportReport: string;
    manageReviews: string;
    viewAnalytics: string;
  };
  tabs: {
    overview: string;
    campaigns: string;
    prospects: string;
    analytics: string;
    reports: string;
  };
}

export const MARKETING_MANAGER_I18N: Record<
  MarketingManagerLocale,
  MarketingManagerTranslations
> = {
  fr: {
    page: {
      title: "Marketing Manager",
      subtitle: "Dashboard marketing et gestion des campagnes",
      breadcrumb: "Marketing / Dashboard",
    },
    kpis: {
      activeCampaigns: "Campagnes actives",
      totalLeads: "Leads générés",
      avgROI: "ROI moyen",
      conversionRate: "Taux de conversion",
      costPerLead: "Coût par lead",
      totalRevenue: "Revenus générés",
    },
    sections: {
      campaigns: "Campagnes Marketing",
      prospects: "Prospects CRM",
      analytics: "Analytics ROI",
      pixels: "Pixels Tracking",
      reviews: "Avis Google",
      quickActions: "Actions Rapides",
    },
    campaigns: {
      title: "Campagnes récentes",
      viewAll: "Voir toutes les campagnes",
      create: "Créer une campagne",
      running: "En cours",
      scheduled: "Programmées",
      completed: "Terminées",
      draft: "Brouillons",
      paused: "En pause",
    },
    prospects: {
      title: "Pipeline prospects",
      viewAll: "Voir tous les prospects",
      newLeads: "Nouveaux leads",
      contacted: "Contactés",
      qualified: "Qualifiés",
      converted: "Convertis",
    },
    analytics: {
      title: "Performance marketing",
      viewDetails: "Voir les détails",
      bySource: "Par source",
      byChannel: "Par canal",
      attribution: "Attribution",
      performance: "Performance",
    },
    pixels: {
      title: "Santé pixels",
      viewHealth: "Voir le monitoring",
      healthy: "Opérationnels",
      degraded: "Dégradés",
      down: "Hors ligne",
      events: "Événements",
    },
    reviews: {
      title: "Avis Google",
      viewAll: "Voir tous les avis",
      pending: "En attente",
      verified: "Vérifiés",
      avgRating: "Note moyenne",
      totalReviews: "Total avis",
    },
    quickActions: {
      createCampaign: "Créer campagne",
      viewProspects: "Voir prospects",
      checkPixels: "Vérifier pixels",
      exportReport: "Exporter rapport",
      manageReviews: "Gérer avis",
      viewAnalytics: "Voir analytics",
    },
    tabs: {
      overview: "Vue d'ensemble",
      campaigns: "Campagnes",
      prospects: "Prospects",
      analytics: "Analytics",
      reports: "Rapports",
    },
  },
  de: {
    page: {
      title: "Marketing Manager",
      subtitle: "Marketing-Dashboard und Kampagnenverwaltung",
      breadcrumb: "Marketing / Dashboard",
    },
    kpis: {
      activeCampaigns: "Aktive Kampagnen",
      totalLeads: "Generierte Leads",
      avgROI: "Durchschnittlicher ROI",
      conversionRate: "Konversionsrate",
      costPerLead: "Kosten pro Lead",
      totalRevenue: "Generierte Einnahmen",
    },
    sections: {
      campaigns: "Marketing-Kampagnen",
      prospects: "Interessenten-CRM",
      analytics: "ROI-Analytics",
      pixels: "Pixel-Tracking",
      reviews: "Google-Bewertungen",
      quickActions: "Schnellaktionen",
    },
    campaigns: {
      title: "Letzte Kampagnen",
      viewAll: "Alle Kampagnen anzeigen",
      create: "Kampagne erstellen",
      running: "Laufend",
      scheduled: "Geplant",
      completed: "Abgeschlossen",
      draft: "Entwürfe",
      paused: "Pausiert",
    },
    prospects: {
      title: "Interessenten-Pipeline",
      viewAll: "Alle Interessenten anzeigen",
      newLeads: "Neue Leads",
      contacted: "Kontaktiert",
      qualified: "Qualifiziert",
      converted: "Konvertiert",
    },
    analytics: {
      title: "Marketing-Performance",
      viewDetails: "Details anzeigen",
      bySource: "Nach Quelle",
      byChannel: "Nach Kanal",
      attribution: "Attribution",
      performance: "Leistung",
    },
    pixels: {
      title: "Pixel-Gesundheit",
      viewHealth: "Monitoring anzeigen",
      healthy: "Betriebsbereit",
      degraded: "Beeinträchtigt",
      down: "Offline",
      events: "Ereignisse",
    },
    reviews: {
      title: "Google-Bewertungen",
      viewAll: "Alle Bewertungen anzeigen",
      pending: "Ausstehend",
      verified: "Verifiziert",
      avgRating: "Durchschnittliche Bewertung",
      totalReviews: "Gesamtbewertungen",
    },
    quickActions: {
      createCampaign: "Kampagne erstellen",
      viewProspects: "Interessenten anzeigen",
      checkPixels: "Pixel prüfen",
      exportReport: "Bericht exportieren",
      manageReviews: "Bewertungen verwalten",
      viewAnalytics: "Analytics anzeigen",
    },
    tabs: {
      overview: "Übersicht",
      campaigns: "Kampagnen",
      prospects: "Interessenten",
      analytics: "Analytics",
      reports: "Berichte",
    },
  },
  it: {
    page: {
      title: "Marketing Manager",
      subtitle: "Dashboard marketing e gestione campagne",
      breadcrumb: "Marketing / Dashboard",
    },
    kpis: {
      activeCampaigns: "Campagne attive",
      totalLeads: "Lead generati",
      avgROI: "ROI medio",
      conversionRate: "Tasso di conversione",
      costPerLead: "Costo per lead",
      totalRevenue: "Ricavi generati",
    },
    sections: {
      campaigns: "Campagne Marketing",
      prospects: "Prospect CRM",
      analytics: "Analytics ROI",
      pixels: "Tracking Pixel",
      reviews: "Recensioni Google",
      quickActions: "Azioni Rapide",
    },
    campaigns: {
      title: "Campagne recenti",
      viewAll: "Vedi tutte le campagne",
      create: "Crea campagna",
      running: "In corso",
      scheduled: "Programmate",
      completed: "Completate",
      draft: "Bozze",
      paused: "In pausa",
    },
    prospects: {
      title: "Pipeline prospect",
      viewAll: "Vedi tutti i prospect",
      newLeads: "Nuovi lead",
      contacted: "Contattati",
      qualified: "Qualificati",
      converted: "Convertiti",
    },
    analytics: {
      title: "Performance marketing",
      viewDetails: "Vedi dettagli",
      bySource: "Per fonte",
      byChannel: "Per canale",
      attribution: "Attribuzione",
      performance: "Performance",
    },
    pixels: {
      title: "Salute pixel",
      viewHealth: "Vedi monitoring",
      healthy: "Operativi",
      degraded: "Degradati",
      down: "Offline",
      events: "Eventi",
    },
    reviews: {
      title: "Recensioni Google",
      viewAll: "Vedi tutte le recensioni",
      pending: "In attesa",
      verified: "Verificate",
      avgRating: "Valutazione media",
      totalReviews: "Totale recensioni",
    },
    quickActions: {
      createCampaign: "Crea campagna",
      viewProspects: "Vedi prospect",
      checkPixels: "Verifica pixel",
      exportReport: "Esporta rapporto",
      manageReviews: "Gestisci recensioni",
      viewAnalytics: "Vedi analytics",
    },
    tabs: {
      overview: "Panoramica",
      campaigns: "Campagne",
      prospects: "Prospect",
      analytics: "Analytics",
      reports: "Rapporti",
    },
  },
  en: {
    page: {
      title: "Marketing Manager",
      subtitle: "Marketing dashboard and campaign management",
      breadcrumb: "Marketing / Dashboard",
    },
    kpis: {
      activeCampaigns: "Active campaigns",
      totalLeads: "Leads generated",
      avgROI: "Average ROI",
      conversionRate: "Conversion rate",
      costPerLead: "Cost per lead",
      totalRevenue: "Revenue generated",
    },
    sections: {
      campaigns: "Marketing Campaigns",
      prospects: "Prospects CRM",
      analytics: "ROI Analytics",
      pixels: "Pixels Tracking",
      reviews: "Google Reviews",
      quickActions: "Quick Actions",
    },
    campaigns: {
      title: "Recent campaigns",
      viewAll: "View all campaigns",
      create: "Create campaign",
      running: "Running",
      scheduled: "Scheduled",
      completed: "Completed",
      draft: "Drafts",
      paused: "Paused",
    },
    prospects: {
      title: "Prospects pipeline",
      viewAll: "View all prospects",
      newLeads: "New leads",
      contacted: "Contacted",
      qualified: "Qualified",
      converted: "Converted",
    },
    analytics: {
      title: "Marketing performance",
      viewDetails: "View details",
      bySource: "By source",
      byChannel: "By channel",
      attribution: "Attribution",
      performance: "Performance",
    },
    pixels: {
      title: "Pixels health",
      viewHealth: "View monitoring",
      healthy: "Healthy",
      degraded: "Degraded",
      down: "Down",
      events: "Events",
    },
    reviews: {
      title: "Google Reviews",
      viewAll: "View all reviews",
      pending: "Pending",
      verified: "Verified",
      avgRating: "Average rating",
      totalReviews: "Total reviews",
    },
    quickActions: {
      createCampaign: "Create campaign",
      viewProspects: "View prospects",
      checkPixels: "Check pixels",
      exportReport: "Export report",
      manageReviews: "Manage reviews",
      viewAnalytics: "View analytics",
    },
    tabs: {
      overview: "Overview",
      campaigns: "Campaigns",
      prospects: "Prospects",
      analytics: "Analytics",
      reports: "Reports",
    },
  },
};

export function getMarketingManagerTranslations(
  locale: MarketingManagerLocale = "fr"
): MarketingManagerTranslations {
  return MARKETING_MANAGER_I18N[locale];
}
