/**
 * ============================================================================
 * VIAMENTOR - Responsive Utilities
 * ============================================================================
 *
 * Utilities et hooks pour gestion responsive et détection device
 */

import { useState, useEffect } from "react";

// ============================================================================
// TYPES
// ============================================================================

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type DeviceType = "mobile" | "tablet" | "desktop";
export type Orientation = "portrait" | "landscape";

export interface ResponsiveState {
  // Breakpoints
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  // Device
  deviceType: DeviceType;
  isTouchDevice: boolean;
  isIOS: boolean;
  isAndroid: boolean;

  // Screen
  width: number;
  height: number;
  orientation: Orientation;

  // Features
  supportsHover: boolean;
  prefersReducedMotion: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Breakpoints Tailwind CSS
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * Media queries
 */
export const MEDIA_QUERIES = {
  xs: "(max-width: 639px)",
  sm: "(min-width: 640px) and (max-width: 767px)",
  md: "(min-width: 768px) and (max-width: 1023px)",
  lg: "(min-width: 1024px) and (max-width: 1279px)",
  xl: "(min-width: 1280px) and (max-width: 1535px)",
  "2xl": "(min-width: 1536px)",
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
  touch: "(hover: none) and (pointer: coarse)",
  hover: "(hover: hover) and (pointer: fine)",
  portrait: "(orientation: portrait)",
  landscape: "(orientation: landscape)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Détecte le breakpoint actuel
 */
export function getCurrentBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS["2xl"]) return "2xl";
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "xs";
}

/**
 * Détecte le type de device
 */
export function getDeviceType(width: number): DeviceType {
  if (width < BREAKPOINTS.md) return "mobile";
  if (width < BREAKPOINTS.lg) return "tablet";
  return "desktop";
}

/**
 * Détecte si c'est un device tactile
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Détecte iOS
 */
export function isIOSDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * Détecte Android
 */
export function isAndroidDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android/.test(navigator.userAgent);
}

/**
 * Détecte l'orientation
 */
export function getOrientation(): Orientation {
  if (typeof window === "undefined") return "portrait";
  return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
}

/**
 * Vérifie si le device supporte hover
 */
export function supportsHover(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia(MEDIA_QUERIES.hover).matches;
}

/**
 * Vérifie si l'utilisateur préfère reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MEDIA_QUERIES.reducedMotion).matches;
}

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook pour obtenir l'état responsive complet
 *
 * @example
 * ```tsx
 * const responsive = useResponsive()
 *
 * if (responsive.isMobile) {
 *   return <MobileView />
 * }
 *
 * if (responsive.breakpoint === "lg") {
 *   return <LargeView />
 * }
 * ```
 */
export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    if (typeof window === "undefined") {
      return {
        breakpoint: "lg",
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        deviceType: "desktop",
        isTouchDevice: false,
        isIOS: false,
        isAndroid: false,
        width: 1024,
        height: 768,
        orientation: "landscape",
        supportsHover: true,
        prefersReducedMotion: false,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const breakpoint = getCurrentBreakpoint(width);
    const deviceType = getDeviceType(width);

    return {
      breakpoint,
      isMobile: deviceType === "mobile",
      isTablet: deviceType === "tablet",
      isDesktop: deviceType === "desktop",
      deviceType,
      isTouchDevice: isTouchDevice(),
      isIOS: isIOSDevice(),
      isAndroid: isAndroidDevice(),
      width,
      height,
      orientation: getOrientation(),
      supportsHover: supportsHover(),
      prefersReducedMotion: prefersReducedMotion(),
    };
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const breakpoint = getCurrentBreakpoint(width);
      const deviceType = getDeviceType(width);

      setState({
        breakpoint,
        isMobile: deviceType === "mobile",
        isTablet: deviceType === "tablet",
        isDesktop: deviceType === "desktop",
        deviceType,
        isTouchDevice: isTouchDevice(),
        isIOS: isIOSDevice(),
        isAndroid: isAndroidDevice(),
        width,
        height,
        orientation: getOrientation(),
        supportsHover: supportsHover(),
        prefersReducedMotion: prefersReducedMotion(),
      });
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return state;
}

/**
 * Hook pour vérifier un breakpoint spécifique
 *
 * @example
 * ```tsx
 * const isMobile = useBreakpoint("mobile")
 * const isLargeOrAbove = useBreakpoint("lg", "min")
 * ```
 */
export function useBreakpoint(
  breakpoint: Breakpoint | "mobile" | "tablet" | "desktop",
  type: "exact" | "min" | "max" = "exact"
): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let query: string;

    if (breakpoint === "mobile") {
      query = MEDIA_QUERIES.mobile;
    } else if (breakpoint === "tablet") {
      query = MEDIA_QUERIES.tablet;
    } else if (breakpoint === "desktop") {
      query = MEDIA_QUERIES.desktop;
    } else {
      const bp = BREAKPOINTS[breakpoint];
      if (type === "min") {
        query = `(min-width: ${bp}px)`;
      } else if (type === "max") {
        query = `(max-width: ${bp - 1}px)`;
      } else {
        query = MEDIA_QUERIES[breakpoint];
      }
    }

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint, type]);

  return matches;
}

/**
 * Hook pour obtenir la largeur de la fenêtre
 *
 * @example
 * ```tsx
 * const width = useWindowWidth()
 * const columns = width < 768 ? 1 : width < 1024 ? 2 : 3
 * ```
 */
export function useWindowWidth(): number {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

/**
 * Hook pour obtenir la hauteur de la fenêtre
 */
export function useWindowHeight(): number {
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 768
  );

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
}

/**
 * Hook pour obtenir l'orientation
 */
export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation());

  useEffect(() => {
    function handleChange() {
      setOrientation(getOrientation());
    }

    window.addEventListener("resize", handleChange);
    window.addEventListener("orientationchange", handleChange);

    return () => {
      window.removeEventListener("resize", handleChange);
      window.removeEventListener("orientationchange", handleChange);
    };
  }, []);

  return orientation;
}

/**
 * Hook pour vérifier une media query
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery("(max-width: 768px)")
 * const prefersD Dark = useMediaQuery("(prefers-color-scheme: dark)")
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Génère des classes responsive conditionnelles
 *
 * @example
 * ```tsx
 * const classes = responsiveClasses({
 *   base: "p-4",
 *   sm: "p-6",
 *   lg: "p-8"
 * })
 * // → "p-4 sm:p-6 lg:p-8"
 * ```
 */
export function responsiveClasses(
  classes: Partial<Record<Breakpoint | "base", string>>
): string {
  const result: string[] = [];

  if (classes.base) result.push(classes.base);
  if (classes.xs) result.push(`xs:${classes.xs}`);
  if (classes.sm) result.push(`sm:${classes.sm}`);
  if (classes.md) result.push(`md:${classes.md}`);
  if (classes.lg) result.push(`lg:${classes.lg}`);
  if (classes.xl) result.push(`xl:${classes.xl}`);
  if (classes["2xl"]) result.push(`2xl:${classes["2xl"]}`);

  return result.join(" ");
}

/**
 * Calcule le nombre de colonnes responsive
 *
 * @example
 * ```tsx
 * const columns = getResponsiveColumns(width, {
 *   mobile: 1,
 *   tablet: 2,
 *   desktop: 3
 * })
 * ```
 */
export function getResponsiveColumns(
  width: number,
  config: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  }
): number {
  const deviceType = getDeviceType(width);

  if (deviceType === "mobile") return config.mobile ?? 1;
  if (deviceType === "tablet") return config.tablet ?? 2;
  return config.desktop ?? 3;
}

/**
 * Adapte la taille d'un élément selon le breakpoint
 *
 * @example
 * ```tsx
 * const size = getResponsiveSize(breakpoint, {
 *   xs: "sm",
 *   md: "md",
 *   lg: "lg"
 * })
 * ```
 */
export function getResponsiveSize<T>(
  breakpoint: Breakpoint,
  sizes: Partial<Record<Breakpoint, T>>,
  defaultSize: T
): T {
  return sizes[breakpoint] ?? defaultSize;
}
