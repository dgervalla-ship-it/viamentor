/**
 * VIAMENTOR - GLOBALS.CSS COMPLET
 * Fichier CSS global avec variants sémantiques success, warning, info
 * 
 * @usage Remplacer le contenu de app/globals.css par ce fichier
 * @date 2025-01-18
 */

/* ============================================================================
   IMPORTS FONTS
   ============================================================================ */

@import "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap";

/* ============================================================================
   CSS VARIABLES - LIGHT MODE
   ============================================================================ */

:root {
  /* Background & Foreground */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;

  /* Card */
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;

  /* Popover */
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;

  /* Primary */
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;

  /* Secondary */
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;

  /* Muted */
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;

  /* Accent */
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;

  /* Destructive */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;

  /* ========================================================================
     NOUVEAUX VARIANTS SÉMANTIQUES
     ======================================================================== */

  /* Success - Vert pour actions positives */
  --success: 142 76% 36%;
  --success-foreground: 0 0% 98%;

  /* Warning - Orange pour avertissements */
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 98%;

  /* Info - Bleu pour informations */
  --info: 199 89% 48%;
  --info-foreground: 0 0% 98%;

  /* ========================================================================
     UTILITY COLORS
     ======================================================================== */

  /* Border */
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;

  /* Radius */
  --radius: 0.5rem;

  /* Charts */
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  --chart-3: 197 37% 24%;
  --chart-4: 43 74% 66%;
  --chart-5: 27 87% 67%;
}

/* ============================================================================
   CSS VARIABLES - DARK MODE
   ============================================================================ */

.dark {
  /* Background & Foreground */
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;

  /* Card */
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;

  /* Popover */
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;

  /* Primary */
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;

  /* Secondary */
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;

  /* Muted */
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;

  /* Accent */
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;

  /* Destructive */
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;

  /* ========================================================================
     NOUVEAUX VARIANTS SÉMANTIQUES - DARK MODE
     ======================================================================== */

  /* Success - Vert plus clair pour dark mode */
  --success: 142 70% 45%;
  --success-foreground: 0 0% 98%;

  /* Warning - Orange plus clair pour dark mode */
  --warning: 38 90% 55%;
  --warning-foreground: 0 0% 98%;

  /* Info - Bleu plus clair pour dark mode */
  --info: 199 85% 55%;
  --info-foreground: 0 0% 98%;

  /* ========================================================================
     UTILITY COLORS - DARK MODE
     ======================================================================== */

  /* Border */
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;

  /* Charts */
  --chart-1: 220 70% 50%;
  --chart-2: 160 60% 45%;
  --chart-3: 30 80% 55%;
  --chart-4: 280 65% 60%;
  --chart-5: 340 75% 55%;
}

/* ============================================================================
   BASE STYLES
   ============================================================================ */

* {
  border-color: hsl(var(--border));
}

body {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  font-weight: 400;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* ============================================================================
   BORDER RADIUS UTILITIES
   ============================================================================ */

.rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}

.rounded {
  border-radius: calc(var(--radius) - 2px);
}

.rounded-md {
  border-radius: var(--radius);
}

.rounded-lg {
  border-radius: calc(var(--radius) + 2px);
}

.rounded-xl {
  border-radius: calc(var(--radius) + 4px);
}

/* ============================================================================
   ANIMATIONS
   ============================================================================ */

@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion-up {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}

@keyframes slide-from-left {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slide-to-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-accordion-down {
  animation: accordion-down 0.2s ease-out;
}

.animate-accordion-up {
  animation: accordion-up 0.2s ease-out;
}

.animate-slide-from-left {
  animation: slide-from-left 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895);
}

.animate-slide-to-left {
  animation: slide-to-left 0.25s cubic-bezier(0.82, 0.085, 0.395, 0.895);
}

/* ============================================================================
   USAGE EXAMPLES - NOUVEAUX VARIANTS
   ============================================================================ */

/*
  SUCCESS:
  - bg-success text-success-foreground
  - border-success
  - text-success
  
  WARNING:
  - bg-warning text-warning-foreground
  - border-warning
  - text-warning
  
  INFO:
  - bg-info text-info-foreground
  - border-info
  - text-info
*/

export {}
