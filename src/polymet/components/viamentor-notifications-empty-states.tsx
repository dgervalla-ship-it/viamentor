import {
  BellIcon,
  CheckCircleIcon,
  SearchIcon,
  ArchiveIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ============================================================================
// TYPES
// ============================================================================

interface EmptyStateProps {
  type: "no-notifications" | "no-unread" | "search-empty" | "archived-empty";
  locale?: "fr" | "de" | "it" | "en";
  searchQuery?: string;
  onAction?: () => void;
  className?: string;
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    noNotifications: {
      title: "Tout est à jour !",
      subtitle: "Aucune notification",
      description: "Vous n'avez aucune notification pour le moment",
    },
    noUnread: {
      title: "Vous êtes à jour",
      subtitle: "Aucune notification non lue",
      description: "Félicitations ! Vous avez lu toutes vos notifications",
    },
    searchEmpty: {
      title: "Aucun résultat",
      subtitle: "Aucun résultat pour",
      description: "Essayez d'ajuster vos filtres ou votre recherche",
      action: "Effacer les filtres",
    },
    archivedEmpty: {
      title: "Archive vide",
      subtitle: "Aucune notification archivée",
      description: "Les notifications archivées apparaîtront ici",
    },
  },
  de: {
    noNotifications: {
      title: "Alles aktuell!",
      subtitle: "Keine Benachrichtigungen",
      description: "Sie haben derzeit keine Benachrichtigungen",
    },
    noUnread: {
      title: "Sie sind auf dem neuesten Stand",
      subtitle: "Keine ungelesenen Benachrichtigungen",
      description: "Glückwunsch! Sie haben alle Benachrichtigungen gelesen",
    },
    searchEmpty: {
      title: "Keine Ergebnisse",
      subtitle: "Keine Ergebnisse für",
      description: "Versuchen Sie, Ihre Filter oder Suche anzupassen",
      action: "Filter löschen",
    },
    archivedEmpty: {
      title: "Archiv leer",
      subtitle: "Keine archivierten Benachrichtigungen",
      description: "Archivierte Benachrichtigungen werden hier angezeigt",
    },
  },
  it: {
    noNotifications: {
      title: "Tutto aggiornato!",
      subtitle: "Nessuna notifica",
      description: "Non hai notifiche al momento",
    },
    noUnread: {
      title: "Sei aggiornato",
      subtitle: "Nessuna notifica non letta",
      description: "Congratulazioni! Hai letto tutte le notifiche",
    },
    searchEmpty: {
      title: "Nessun risultato",
      subtitle: "Nessun risultato per",
      description: "Prova a modificare i filtri o la ricerca",
      action: "Cancella filtri",
    },
    archivedEmpty: {
      title: "Archivio vuoto",
      subtitle: "Nessuna notifica archiviata",
      description: "Le notifiche archiviate appariranno qui",
    },
  },
  en: {
    noNotifications: {
      title: "All caught up!",
      subtitle: "No notifications",
      description: "You have no notifications at the moment",
    },
    noUnread: {
      title: "You're all caught up",
      subtitle: "No unread notifications",
      description: "Congratulations! You've read all your notifications",
    },
    searchEmpty: {
      title: "No results",
      subtitle: "No results for",
      description: "Try adjusting your filters or search",
      action: "Clear filters",
    },
    archivedEmpty: {
      title: "Empty archive",
      subtitle: "No archived notifications",
      description: "Archived notifications will appear here",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function NotificationsEmptyState({
  type,
  locale = "fr",
  searchQuery,
  onAction,
  className = "",
}: EmptyStateProps) {
  const t = translations[locale];

  const getContent = () => {
    switch (type) {
      case "no-notifications":
        return {
          icon: <BellIcon className="h-16 w-16 text-muted-foreground" />,

          title: t.noNotifications.title,
          subtitle: t.noNotifications.subtitle,
          description: t.noNotifications.description,
        };
      case "no-unread":
        return {
          icon: <CheckCircleIcon className="h-16 w-16 text-green-500" />,

          title: t.noUnread.title,
          subtitle: t.noUnread.subtitle,
          description: t.noUnread.description,
        };
      case "search-empty":
        return {
          icon: <SearchIcon className="h-16 w-16 text-muted-foreground" />,

          title: t.searchEmpty.title,
          subtitle: searchQuery
            ? `${t.searchEmpty.subtitle} "${searchQuery}"`
            : t.searchEmpty.subtitle,
          description: t.searchEmpty.description,
          action: t.searchEmpty.action,
        };
      case "archived-empty":
        return {
          icon: <ArchiveIcon className="h-16 w-16 text-muted-foreground" />,

          title: t.archivedEmpty.title,
          subtitle: t.archivedEmpty.subtitle,
          description: t.archivedEmpty.description,
        };
      default:
        return {
          icon: <BellIcon className="h-16 w-16 text-muted-foreground" />,

          title: t.noNotifications.title,
          subtitle: t.noNotifications.subtitle,
          description: t.noNotifications.description,
        };
    }
  };

  const content = getContent();

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      <div className="mb-6 animate-in fade-in-50 duration-500">
        {content.icon}
      </div>
      <h3 className="text-2xl font-bold mb-2 animate-in fade-in-50 duration-500 delay-100">
        {content.title}
      </h3>
      <p className="text-lg text-muted-foreground mb-2 animate-in fade-in-50 duration-500 delay-200">
        {content.subtitle}
      </p>
      <p className="text-sm text-muted-foreground max-w-md animate-in fade-in-50 duration-500 delay-300">
        {content.description}
      </p>
      {content.action && onAction && (
        <Button
          variant="outline"
          onClick={onAction}
          className="mt-6 animate-in fade-in-50 duration-500 delay-400"
        >
          {content.action}
        </Button>
      )}
    </div>
  );
}

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

export function NoNotificationsState(props: Omit<EmptyStateProps, "type">) {
  return <NotificationsEmptyState {...props} type="no-notifications" />;
}

export function NoUnreadState(props: Omit<EmptyStateProps, "type">) {
  return <NotificationsEmptyState {...props} type="no-unread" />;
}

export function SearchEmptyState(props: Omit<EmptyStateProps, "type">) {
  return <NotificationsEmptyState {...props} type="search-empty" />;
}

export function ArchivedEmptyState(props: Omit<EmptyStateProps, "type">) {
  return <NotificationsEmptyState {...props} type="archived-empty" />;
}
