/**
 * Google Analytics 4 (GA4) Integration
 * Analytics et tracking pour Viamentor
 */

// ID de mesure GA4 - À configurer dans .env
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Type pour les événements personnalisés
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Initialiser Google Analytics 4
 */
export function initGA(): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    console.warn('⚠️ GA4 non configuré. Ajoutez VITE_GA_MEASUREMENT_ID dans .env');
    return;
  }

  // Injecter le script GA4
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialiser gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
      cookie_flags: 'SameSite=None;Secure'
    });
  `;
  document.head.appendChild(script2);

  console.log('✅ GA4 initialisé:', GA_MEASUREMENT_ID);
}

/**
 * Tracker une page vue
 */
export function trackPageView(url: string, title?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  });
}

/**
 * Tracker un événement personnalisé
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  });
}

/**
 * Événements spécifiques Viamentor
 */
export const ViamentorEvents = {
  // Étudiants
  studentCreated: (category: string) =>
    trackEvent({
      action: 'student_created',
      category: 'Students',
      label: category,
    }),

  studentUpdated: (studentId: string) =>
    trackEvent({
      action: 'student_updated',
      category: 'Students',
      label: studentId,
    }),

  // Cours
  courseCreated: (courseType: string) =>
    trackEvent({
      action: 'course_created',
      category: 'Courses',
      label: courseType,
    }),

  courseEnrollment: (courseId: string) =>
    trackEvent({
      action: 'course_enrollment',
      category: 'Courses',
      label: courseId,
    }),

  // Leçons
  lessonScheduled: (category: string) =>
    trackEvent({
      action: 'lesson_scheduled',
      category: 'Lessons',
      label: category,
    }),

  lessonCompleted: (lessonId: string) =>
    trackEvent({
      action: 'lesson_completed',
      category: 'Lessons',
      label: lessonId,
    }),

  // Facturation
  invoiceGenerated: (amount: number) =>
    trackEvent({
      action: 'invoice_generated',
      category: 'Billing',
      value: amount,
    }),

  paymentReceived: (amount: number) =>
    trackEvent({
      action: 'payment_received',
      category: 'Billing',
      value: amount,
    }),

  // Navigation
  dashboardViewed: (role: string) =>
    trackEvent({
      action: 'dashboard_viewed',
      category: 'Navigation',
      label: role,
    }),

  // Erreurs
  errorOccurred: (errorMessage: string) =>
    trackEvent({
      action: 'error',
      category: 'Errors',
      label: errorMessage,
    }),
};

// Déclaration TypeScript pour gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

