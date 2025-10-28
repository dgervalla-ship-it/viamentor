/**
 * Viamentor - Sentry Error Monitoring Configuration
 * https://docs.sentry.io/platforms/javascript/guides/react/
 */

import * as Sentry from '@sentry/react';

/**
 * Initialiser Sentry
 */
export function initSentry() {
  // Ne pas initialiser en développement local
  if (import.meta.env.DEV) {
    console.log('📊 Sentry: Désactivé en développement');
    return;
  }

  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    console.warn('⚠️  VITE_SENTRY_DSN manquante - Sentry désactivé');
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    
    // Traçabilité des performances
    integrations: [
      // Traçage des performances React
      Sentry.browserTracingIntegration(),
      
      // Replay des sessions (optionnel, peut être coûteux)
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
      
      // Breadcrumbs pour le contexte
      Sentry.breadcrumbsIntegration({
        console: true,
        dom: true,
        fetch: true,
        history: true,
        sentry: true,
        xhr: true,
      }),
    ],

    // Taux d'échantillonnage des performances (10% en prod)
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,

    // Taux d'échantillonnage des replays de session
    // Session Replay en cas d'erreur uniquement
    replaysSessionSampleRate: 0, // 0% des sessions normales
    replaysOnErrorSampleRate: 1.0, // 100% des sessions avec erreur

    // Ignorer certaines erreurs
    ignoreErrors: [
      // Erreurs réseau qui ne sont pas de notre responsabilité
      'Network request failed',
      'NetworkError',
      'Failed to fetch',
      
      // Erreurs navigateur
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      
      // Extensions navigateur
      'chrome-extension://',
      'moz-extension://',
    ],

    // Filtrer les breadcrumbs sensibles
    beforeBreadcrumb(breadcrumb, hint) {
      // Ne pas capturer les données sensibles
      if (breadcrumb.category === 'console' && breadcrumb.message) {
        // Masquer les tokens dans les logs
        breadcrumb.message = breadcrumb.message.replace(
          /Bearer\s+[\w-]+\.[\w-]+\.[\w-]+/g,
          'Bearer [REDACTED]'
        );
        breadcrumb.message = breadcrumb.message.replace(
          /eyJ[\w-]+\.[\w-]+\.[\w-]+/g,
          '[JWT_REDACTED]'
        );
      }
      
      return breadcrumb;
    },

    // Filtrer les événements avant envoi
    beforeSend(event, hint) {
      // Ne pas envoyer les erreurs en développement
      if (import.meta.env.DEV) {
        return null;
      }

      // Enrichir avec des informations de contexte
      event.tags = {
        ...event.tags,
        app_version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      };

      // Nettoyer les données sensibles
      if (event.request) {
        // Supprimer les headers sensibles
        if (event.request.headers) {
          delete event.request.headers['Authorization'];
          delete event.request.headers['Cookie'];
        }
        
        // Supprimer les query params sensibles
        if (event.request.query_string) {
          event.request.query_string = event.request.query_string.replace(
            /token=[^&]+/g,
            'token=[REDACTED]'
          );
        }
      }

      return event;
    },
  });

  console.log('✅ Sentry initialisé en production');
}

/**
 * Capturer une exception manuellement
 */
export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Capturer un message
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level);
}

/**
 * Définir le contexte utilisateur
 */
export function setUserContext(user: {
  id: string;
  email?: string;
  role?: string;
}) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    role: user.role,
  });
}

/**
 * Effacer le contexte utilisateur (logout)
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Ajouter des breadcrumbs personnalisés
 */
export function addBreadcrumb(
  message: string,
  category: string,
  level: Sentry.SeverityLevel = 'info',
  data?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data,
  });
}

/**
 * Wrapper pour profiler une fonction
 */
export async function profileFunction<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const transaction = Sentry.startTransaction({
    name,
    op: 'function',
  });

  try {
    const result = await fn();
    transaction.setStatus('ok');
    return result;
  } catch (error) {
    transaction.setStatus('internal_error');
    throw error;
  } finally {
    transaction.finish();
  }
}

// Export Sentry pour utilisation avancée
export { Sentry };

