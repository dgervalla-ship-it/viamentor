/**
 * VIAMENTOR - Support Tickets Data
 * Mock data et types TypeScript pour système support helpdesk
 */

// ============================================================================
// TYPES
// ============================================================================

export type TicketPriority = "urgent" | "high" | "normal" | "low";
export type TicketStatus =
  | "new"
  | "assigned"
  | "inProgress"
  | "waitingClient"
  | "resolved"
  | "closed";
export type MessageType = "client" | "agent" | "internal" | "system";

export interface SupportAgent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "available" | "busy" | "away";
  expertise: string[];
}

export interface TicketClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  tenant: string;
  tenantName: string;
}

export interface TicketMessage {
  id: string;
  type: MessageType;
  author: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: Date;
  attachments?: TicketAttachment[];
  isPrivate?: boolean;
}

export interface TicketAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface SupportTicket {
  id: string;
  number: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  client: TicketClient;
  assignedTo?: SupportAgent;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  slaDeadline: Date;
  slaBreached: boolean;
  messages: TicketMessage[];
  tags: string[];
  category: string;
}

export interface TicketStats {
  openTickets: number;
  pendingResponse: number;
  resolvedToday: number;
  npsScore: number;
  avgResponseTime: number; // minutes
  slaBreachedCount: number;
  dailyTarget: number;
  dailyProgress: number;
}

export interface KBCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  articleCount: number;
  color: string;
}

export interface KBArticle {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  categoryName: string;
  views: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
  relatedArticles: string[];
}

export interface ChatMessage {
  id: string;
  type: "client" | "agent" | "system";
  author: string;
  authorName: string;
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  client: TicketClient;
  agent?: SupportAgent;
  status: "waiting" | "active" | "ended";
  messages: ChatMessage[];
  startedAt: Date;
  endedAt?: Date;
}

// ============================================================================
// MOCK DATA - AGENTS
// ============================================================================

export const mockSupportAgents: SupportAgent[] = [
  {
    id: "agent-1",
    name: "Sophie Martin",
    email: "sophie.martin@viamentor.ch",
    avatar: "https://github.com/kdrnp.png",
    status: "available",
    expertise: ["billing", "technical"],
  },
  {
    id: "agent-2",
    name: "Marc Dubois",
    email: "marc.dubois@viamentor.ch",
    avatar: "https://github.com/yusufhilmi.png",
    status: "busy",
    expertise: ["planning", "general"],
  },
  {
    id: "agent-3",
    name: "Laura Schneider",
    email: "laura.schneider@viamentor.ch",
    avatar: "https://github.com/yahyabedirhan.png",
    status: "available",
    expertise: ["technical", "integrations"],
  },
];

// ============================================================================
// MOCK DATA - TICKETS
// ============================================================================

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "ticket-1",
    number: "#T-2025-0142",
    subject: "Erreur paiement Stripe lors de la facturation",
    description:
      "Impossible de traiter le paiement par carte pour la facture #INV-2025-0234. Message d'erreur: 'Card declined'.",
    priority: "urgent",
    status: "inProgress",
    client: {
      id: "client-1",
      name: "Auto-École Lausanne",
      email: "contact@ae-lausanne.ch",
      phone: "+41 21 123 45 67",
      avatar: "https://github.com/polymet-ai.png",
      tenant: "tenant-1",
      tenantName: "Auto-École Lausanne",
    },
    assignedTo: mockSupportAgents[0],
    createdAt: new Date(2025, 0, 15, 9, 30),
    updatedAt: new Date(2025, 0, 15, 10, 15),
    slaDeadline: new Date(2025, 0, 15, 11, 30),
    slaBreached: false,
    messages: [
      {
        id: "msg-1",
        type: "client",
        author: "client-1",
        authorName: "Jean Dupont",
        authorAvatar: "https://github.com/denizbuyuktas.png",
        content:
          "Bonjour, j'ai un problème avec le paiement de la facture #INV-2025-0234. La carte est refusée alors qu'elle fonctionne sur d'autres sites.",
        timestamp: new Date(2025, 0, 15, 9, 30),
        attachments: [
          {
            id: "att-1",
            name: "screenshot-error.png",
            size: 245678,
            type: "image/png",
            url: "#",
            uploadedAt: new Date(2025, 0, 15, 9, 30),
            uploadedBy: "client-1",
          },
        ],
      },
      {
        id: "msg-2",
        type: "agent",
        author: "agent-1",
        authorName: "Sophie Martin",
        authorAvatar: "https://github.com/kdrnp.png",
        content:
          "Bonjour Jean, je vais vérifier immédiatement avec notre processeur de paiement. Pouvez-vous me confirmer les 4 derniers chiffres de la carte utilisée ?",
        timestamp: new Date(2025, 0, 15, 9, 45),
      },
      {
        id: "msg-3",
        type: "internal",
        author: "agent-1",
        authorName: "Sophie Martin",
        authorAvatar: "https://github.com/kdrnp.png",
        content:
          "Vérifié avec Stripe - problème de 3D Secure. Besoin d'activer SCA pour ce client.",
        timestamp: new Date(2025, 0, 15, 10, 0),
        isPrivate: true,
      },
    ],

    tags: ["paiement", "stripe", "urgent"],
    category: "billing",
  },
  {
    id: "ticket-2",
    number: "#T-2025-0141",
    subject: "Demande d'export planning au format iCal",
    description:
      "Comment exporter le planning des leçons au format iCal pour synchronisation avec Google Calendar ?",
    priority: "normal",
    status: "resolved",
    client: {
      id: "client-2",
      name: "École de Conduite Genève",
      email: "info@ec-geneve.ch",
      phone: "+41 22 987 65 43",
      avatar: "https://github.com/polymet-ai.png",
      tenant: "tenant-2",
      tenantName: "École de Conduite Genève",
    },
    assignedTo: mockSupportAgents[1],
    createdAt: new Date(2025, 0, 14, 14, 20),
    updatedAt: new Date(2025, 0, 14, 15, 45),
    resolvedAt: new Date(2025, 0, 14, 15, 45),
    slaDeadline: new Date(2025, 0, 14, 16, 20),
    slaBreached: false,
    messages: [
      {
        id: "msg-4",
        type: "client",
        author: "client-2",
        authorName: "Marie Laurent",
        authorAvatar: "https://github.com/shoaibux1.png",
        content:
          "Bonjour, je souhaiterais synchroniser le planning Viamentor avec mon Google Calendar. Est-ce possible ?",
        timestamp: new Date(2025, 0, 14, 14, 20),
      },
      {
        id: "msg-5",
        type: "agent",
        author: "agent-2",
        authorName: "Marc Dubois",
        authorAvatar: "https://github.com/yusufhilmi.png",
        content:
          "Bonjour Marie, oui c'est possible ! Allez dans Planning > Export > Format iCal. Vous obtiendrez un lien à ajouter dans Google Calendar.",
        timestamp: new Date(2025, 0, 14, 14, 35),
      },
    ],

    tags: ["planning", "export", "ical"],
    category: "planning",
  },
  {
    id: "ticket-3",
    number: "#T-2025-0140",
    subject: "SLA BREACH - Système lent depuis ce matin",
    description:
      "Le système est très lent depuis 8h ce matin. Temps de chargement > 10 secondes pour chaque page.",
    priority: "high",
    status: "assigned",
    client: {
      id: "client-3",
      name: "Auto-École Fribourg",
      email: "contact@ae-fribourg.ch",
      phone: "+41 26 456 78 90",
      avatar: "https://github.com/polymet-ai.png",
      tenant: "tenant-3",
      tenantName: "Auto-École Fribourg",
    },
    assignedTo: mockSupportAgents[2],
    createdAt: new Date(2025, 0, 15, 8, 15),
    updatedAt: new Date(2025, 0, 15, 8, 30),
    slaDeadline: new Date(2025, 0, 15, 9, 15),
    slaBreached: true,
    messages: [
      {
        id: "msg-6",
        type: "client",
        author: "client-3",
        authorName: "Pierre Müller",
        authorAvatar: "https://github.com/denizbuyuktas.png",
        content:
          "URGENT - Le système est inutilisable. Tous mes moniteurs sont bloqués. Nous avons 15 leçons ce matin !",
        timestamp: new Date(2025, 0, 15, 8, 15),
      },
    ],

    tags: ["performance", "urgent", "sla-breach"],
    category: "technical",
  },
  {
    id: "ticket-4",
    number: "#T-2025-0139",
    subject: "Question sur les forfaits de leçons",
    description:
      "Comment créer un forfait de 20 leçons avec réduction de 10% ?",
    priority: "low",
    status: "new",
    client: {
      id: "client-4",
      name: "École de Conduite Neuchâtel",
      email: "info@ec-neuchatel.ch",
      phone: "+41 32 123 45 67",
      avatar: "https://github.com/polymet-ai.png",
      tenant: "tenant-4",
      tenantName: "École de Conduite Neuchâtel",
    },
    createdAt: new Date(2025, 0, 15, 11, 0),
    updatedAt: new Date(2025, 0, 15, 11, 0),
    slaDeadline: new Date(2025, 0, 16, 11, 0),
    slaBreached: false,
    messages: [
      {
        id: "msg-7",
        type: "client",
        author: "client-4",
        authorName: "Sophie Blanc",
        authorAvatar: "https://github.com/shoaibux1.png",
        content:
          "Bonjour, je voudrais créer un forfait promotionnel. Comment faire ?",
        timestamp: new Date(2025, 0, 15, 11, 0),
      },
    ],

    tags: ["forfaits", "tarification"],
    category: "billing",
  },
];

// ============================================================================
// MOCK DATA - STATS
// ============================================================================

export const mockTicketStats: TicketStats = {
  openTickets: 24,
  pendingResponse: 8,
  resolvedToday: 12,
  npsScore: 78,
  avgResponseTime: 12, // minutes
  slaBreachedCount: 2,
  dailyTarget: 15,
  dailyProgress: 80, // percentage
};

// ============================================================================
// MOCK DATA - KB CATEGORIES
// ============================================================================

export const mockKBCategories: KBCategory[] = [
  {
    id: "cat-1",
    name: "Premiers pas",
    slug: "getting-started",
    description: "Guides de démarrage et tutoriels pour bien commencer",
    icon: "Rocket",
    articleCount: 12,
    color: "blue",
  },
  {
    id: "cat-2",
    name: "Facturation & Paiements",
    slug: "billing",
    description: "Gestion des factures, QR-factures et paiements",
    icon: "CreditCard",
    articleCount: 18,
    color: "green",
  },
  {
    id: "cat-3",
    name: "Planning & Leçons",
    slug: "planning",
    description: "Réservation, calendrier et gestion des leçons",
    icon: "Calendar",
    articleCount: 24,
    color: "purple",
  },
  {
    id: "cat-4",
    name: "Problèmes techniques",
    slug: "technical",
    description: "Dépannage et résolution de problèmes",
    icon: "Wrench",
    articleCount: 15,
    color: "orange",
  },
];

// ============================================================================
// MOCK DATA - KB ARTICLES
// ============================================================================

export const mockKBArticles: KBArticle[] = [
  {
    id: "article-1",
    title: "Comment créer une QR-facture suisse conforme ?",
    slug: "creer-qr-facture-suisse",
    description:
      "Guide complet pour générer des QR-factures conformes aux normes suisses avec Viamentor",
    content: `# Comment créer une QR-facture suisse conforme

## Introduction
Les QR-factures sont obligatoires en Suisse depuis le 30 septembre 2022...

## Étapes de création
1. Allez dans **Facturation > Créer facture**
2. Remplissez les informations client
3. Ajoutez les prestations
4. Cliquez sur **Générer QR-facture**

## Informations requises
- IBAN du compte bancaire
- Référence de paiement
- Montant exact
- Informations client complètes

## Vérification de conformité
Viamentor vérifie automatiquement...`,
    category: "cat-2",
    categoryName: "Facturation & Paiements",
    views: 1245,
    rating: 4.8,
    ratingCount: 42,
    tags: ["qr-facture", "facturation", "suisse", "paiement"],
    author: "Sophie Martin",
    createdAt: new Date(2024, 11, 1),
    updatedAt: new Date(2025, 0, 10),
    relatedArticles: ["article-2", "article-3"],
  },
  {
    id: "article-2",
    title: "Exporter le planning au format iCal",
    slug: "export-planning-ical",
    description:
      "Synchronisez votre planning Viamentor avec Google Calendar, Outlook ou Apple Calendar",
    content: `# Exporter le planning au format iCal

## Pourquoi exporter en iCal ?
Le format iCal permet de synchroniser automatiquement...

## Étapes d'export
1. Allez dans **Planning > Export**
2. Sélectionnez **Format iCal**
3. Choisissez la période
4. Copiez le lien généré

## Synchronisation avec Google Calendar
1. Ouvrez Google Calendar
2. Cliquez sur **+** à côté de "Autres agendas"
3. Sélectionnez **À partir de l'URL**
4. Collez le lien iCal

## Mise à jour automatique
Le calendrier se synchronise automatiquement toutes les heures...`,
    category: "cat-3",
    categoryName: "Planning & Leçons",
    views: 892,
    rating: 4.6,
    ratingCount: 28,
    tags: ["planning", "export", "ical", "synchronisation"],
    author: "Marc Dubois",
    createdAt: new Date(2024, 10, 15),
    updatedAt: new Date(2025, 0, 5),
    relatedArticles: ["article-3", "article-4"],
  },
  {
    id: "article-3",
    title: "Résoudre les problèmes de connexion",
    slug: "problemes-connexion",
    description: "Solutions aux problèmes de connexion et d'authentification",
    content: `# Résoudre les problèmes de connexion

## Symptômes courants
- Message "Identifiants incorrects"
- Page blanche après connexion
- Déconnexion automatique

## Solutions
### 1. Vérifier vos identifiants
- Email correct ?
- Mot de passe respecte la casse

### 2. Réinitialiser le mot de passe
1. Cliquez sur "Mot de passe oublié"
2. Vérifiez vos emails
3. Suivez le lien de réinitialisation

### 3. Vider le cache
- Chrome: Ctrl+Shift+Delete
- Firefox: Ctrl+Shift+Delete
- Safari: Cmd+Option+E`,
    category: "cat-4",
    categoryName: "Problèmes techniques",
    views: 2341,
    rating: 4.4,
    ratingCount: 67,
    tags: ["connexion", "authentification", "dépannage"],
    author: "Laura Schneider",
    createdAt: new Date(2024, 9, 20),
    updatedAt: new Date(2025, 0, 12),
    relatedArticles: ["article-4"],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getTicketPriorityColor(priority: TicketPriority): string {
  const colors = {
    urgent: "destructive",
    high: "orange",
    normal: "default",
    low: "secondary",
  };
  return colors[priority];
}

export function getTicketStatusColor(status: TicketStatus): string {
  const colors = {
    new: "default",
    assigned: "secondary",
    inProgress: "default",
    waitingClient: "orange",
    resolved: "default",
    closed: "secondary",
  };
  return colors[status];
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  return `Il y a ${days}j`;
}
