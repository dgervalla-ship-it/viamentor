/**
 * ============================================================================
 * VIAMENTOR - ACCESSIBILITY UTILITIES
 * ============================================================================
 *
 * Utilitaires et hooks pour améliorer l'accessibilité
 * Implémentation des recommandations de l'audit Accessibilité
 */

"use client";

import { useEffect, useRef, useCallback } from "react";

// ============================================================================
// 1. FOCUS TRAP HOOK
// ============================================================================

/**
 * Hook pour créer un focus trap dans un élément
 * Empêche le focus de sortir de l'élément (utile pour modals/dialogs)
 *
 * @example
 * ```tsx
 * function Modal() {
 *   const ref = useFocusTrap()
 *   return <div ref={ref}>...</div>
 * }
 * ```
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Get all focusable elements
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element on mount
    firstElement?.focus();

    // Handle Tab key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener("keydown", handleKeyDown);
    return () => element.removeEventListener("keydown", handleKeyDown);
  }, []);

  return ref;
}

// ============================================================================
// 2. ESCAPE KEY HOOK
// ============================================================================

/**
 * Hook pour gérer la touche Escape
 * Utile pour fermer modals/dialogs/dropdowns
 *
 * @example
 * ```tsx
 * function Modal({ onClose }) {
 *   useEscapeKey(onClose)
 *   return <div>...</div>
 * }
 * ```
 */
export function useEscapeKey(onEscape: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onEscape, enabled]);
}

// ============================================================================
// 3. FOCUS RESTORATION HOOK
// ============================================================================

/**
 * Hook pour restaurer le focus après fermeture d'un élément
 * Utile pour modals/dialogs
 *
 * @example
 * ```tsx
 * function Modal({ open, onClose }) {
 *   useFocusRestoration(open)
 *   return open ? <div>...</div> : null
 * }
 * ```
 */
export function useFocusRestoration(isOpen: boolean) {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement;
    } else {
      // Restore focus
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);
}

// ============================================================================
// 4. KEYBOARD NAVIGATION HOOK
// ============================================================================

/**
 * Hook pour gérer la navigation clavier dans une liste
 * Supporte Arrow Up/Down, Home, End
 *
 * @example
 * ```tsx
 * function List({ items }) {
 *   const { activeIndex, handleKeyDown } = useKeyboardNavigation(items.length)
 *   return (
 *     <ul onKeyDown={handleKeyDown}>
 *       {items.map((item, i) => (
 *         <li key={i} data-active={i === activeIndex}>{item}</li>
 *       ))}
 *     </ul>
 *   )
 * }
 * ```
 */
export function useKeyboardNavigation(itemCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % itemCount);
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
          break;
        case "Home":
          e.preventDefault();
          setActiveIndex(0);
          break;
        case "End":
          e.preventDefault();
          setActiveIndex(itemCount - 1);
          break;
      }
    },
    [itemCount]
  );

  return { activeIndex, setActiveIndex, handleKeyDown };
}

// ============================================================================
// 5. ARIA ANNOUNCER HOOK
// ============================================================================

/**
 * Hook pour annoncer des messages aux screen readers
 * Utilise aria-live regions
 *
 * @example
 * ```tsx
 * function Component() {
 *   const announce = useAriaAnnouncer()
 *
 *   const handleSave = () => {
 *     // ... save logic
 *     announce("Enregistré avec succès", "polite")
 *   }
 *
 *   return <button onClick={handleSave}>Enregistrer</button>
 * }
 * ```
 */
export function useAriaAnnouncer() {
  const announce = useCallback(
    (message: string, priority: "polite" | "assertive" = "polite") => {
      const announcer = document.getElementById(`aria-announcer-${priority}`);
      if (announcer) {
        announcer.textContent = message;
        // Clear after announcement
        setTimeout(() => {
          announcer.textContent = "";
        }, 1000);
      }
    },
    []
  );

  return announce;
}

/**
 * Composant AriaAnnouncer à placer dans le layout
 * Crée les live regions pour les annonces
 */
export function AriaAnnouncer() {
  return (
    <>
      <div
        id="aria-announcer-polite"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      <div
        id="aria-announcer-assertive"
        className="sr-only"
        aria-live="assertive"
        aria-atomic="true"
      />
    </>
  );
}

// ============================================================================
// 6. SKIP LINK COMPONENT
// ============================================================================

/**
 * Composant Skip Link pour navigation clavier
 * Permet de sauter la navigation et aller directement au contenu
 *
 * @example
 * ```tsx
 * <body>
 *   <SkipLink href="#main-content">Aller au contenu principal</SkipLink>
 *   <Header />
 *   <main id="main-content">...</main>
 * </body>
 * ```
 */
export function SkipLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {children}
    </a>
  );
}

// ============================================================================
// 7. USAGE EXAMPLES
// ============================================================================

export const usageExamples = {
  modal: `
// ============================================================================
// components/modal.tsx
// Modal avec focus trap, escape key et focus restoration
// ============================================================================

import { useFocusTrap, useEscapeKey, useFocusRestoration } from "@/data/viamentor-accessibility-utils"

export function Modal({ open, onClose, children }) {
  const ref = useFocusTrap()
  useEscapeKey(onClose, open)
  useFocusRestoration(open)

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-background p-6 rounded-lg"
      >
        {children}
      </div>
    </div>
  )
}
`,

  dropdown: `
// ============================================================================
// components/dropdown.tsx
// Dropdown avec keyboard navigation
// ============================================================================

import { useKeyboardNavigation, useEscapeKey } from "@/data/viamentor-accessibility-utils"

export function Dropdown({ items, onSelect }) {
  const [open, setOpen] = useState(false)
  const { activeIndex, handleKeyDown } = useKeyboardNavigation(items.length)
  useEscapeKey(() => setOpen(false), open)

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Menu</button>
      {open && (
        <ul
          role="menu"
          onKeyDown={handleKeyDown}
          className="absolute bg-background border rounded-lg"
        >
          {items.map((item, i) => (
            <li
              key={i}
              role="menuitem"
              tabIndex={i === activeIndex ? 0 : -1}
              onClick={() => onSelect(item)}
              className={i === activeIndex ? "bg-accent" : ""}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
`,

  announcer: `
// ============================================================================
// app/layout.tsx
// Layout avec AriaAnnouncer
// ============================================================================

import { AriaAnnouncer } from "@/data/viamentor-accessibility-utils"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AriaAnnouncer />
        {children}
      </body>
    </html>
  )
}

// ============================================================================
// components/save-button.tsx
// Bouton avec annonce screen reader
// ============================================================================

import { useAriaAnnouncer } from "@/data/viamentor-accessibility-utils"

export function SaveButton() {
  const announce = useAriaAnnouncer()

  const handleSave = async () => {
    await saveData()
    announce("Données enregistrées avec succès", "polite")
  }

  return <button onClick={handleSave}>Enregistrer</button>
}
`,

  skipLink: `
// ============================================================================
// app/layout.tsx
// Layout avec Skip Link
// ============================================================================

import { SkipLink } from "@/data/viamentor-accessibility-utils"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SkipLink href="#main-content">
          Aller au contenu principal
        </SkipLink>
        <Header />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
`,
};

// ============================================================================
// 8. BEST PRACTICES
// ============================================================================

export const bestPractices = [
  "✅ Focus trap dans tous les modals/dialogs",
  "✅ Escape key pour fermer overlays",
  "✅ Focus restoration après fermeture",
  "✅ Keyboard navigation dans listes/menus",
  "✅ ARIA announcements pour feedback",
  "✅ Skip links pour navigation rapide",
  "✅ ARIA labels sur tous les éléments interactifs",
  "✅ Semantic HTML (header, nav, main, footer)",
  "✅ Focus visible (ring-2 ring-ring)",
  "✅ Touch targets 44x44px minimum",
  "✅ Contraste 4.5:1 minimum (WCAG AA)",
  "✅ Tester avec screen readers (NVDA, JAWS, VoiceOver)",
];

// ============================================================================
// 9. TESTING CHECKLIST
// ============================================================================

export const testingChecklist = [
  "☐ Navigation clavier complète (Tab, Enter, Escape, Arrows)",
  "☐ Focus trap fonctionne dans modals",
  "☐ Escape ferme les overlays",
  "☐ Focus restoration après fermeture",
  "☐ ARIA announcements audibles (screen reader)",
  "☐ Skip links fonctionnels",
  "☐ Tous les boutons ont aria-label",
  "☐ Tous les inputs ont labels associés",
  "☐ Contraste validé (Lighthouse)",
  "☐ Touch targets suffisants (mobile)",
  "☐ Testé avec NVDA (Windows)",
  "☐ Testé avec VoiceOver (macOS/iOS)",
];

// ============================================================================
// EXPORT
// ============================================================================

export default {
  useFocusTrap,
  useEscapeKey,
  useFocusRestoration,
  useKeyboardNavigation,
  useAriaAnnouncer,
  AriaAnnouncer,
  SkipLink,
  usageExamples,
  bestPractices,
  testingChecklist,
};

// Fix missing import
import { useState } from "react";
