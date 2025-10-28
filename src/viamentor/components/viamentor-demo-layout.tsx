/**
 * VIAMENTOR - Demo Layout
 * Layout réutilisable pour pages de démonstration avec providers intégrés
 *
 * @module components/viamentor-demo-layout
 * @version 1.0.0
 */

import { ReactNode } from "react";
import { ThemeProvider } from "@/viamentor/components/viamentor-theme-provider";
import { LocaleProvider } from "@/viamentor/components/viamentor-locale-provider";
import { QueryProvider } from "@/viamentor/data/viamentor-query-provider";
import { DemoHeader } from "@/viamentor/components/viamentor-demo-header";
import { PageContainer } from "@/viamentor/components/viamentor-page-container";
import { ShapesIcon as LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface DemoLayoutProps {
  // Header
  title: string;
  description?: string;
  icon?: LucideIcon;
  badges?: Array<{
    label: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
    icon?: LucideIcon;
  }>;
  actions?: ReactNode;

  // Content
  children: ReactNode;

  // Providers
  withTheme?: boolean;
  withLocale?: boolean;
  withQuery?: boolean;
  initialTheme?: "light" | "dark" | "viamentor";
  initialLocale?: "fr" | "de" | "it" | "en";

  // Layout
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";

  // Styling
  className?: string;
  contentClassName?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function DemoLayout({
  title,
  description,
  icon,
  badges,
  actions,
  children,
  withTheme = true,
  withLocale = true,
  withQuery = false,
  initialTheme = "light",
  initialLocale = "fr",
  maxWidth = "xl",
  padding = "md",
  className,
  contentClassName,
}: DemoLayoutProps) {
  // Content wrapper
  const content = (
    <div className={cn("min-h-screen bg-background", className)}>
      <DemoHeader
        title={title}
        description={description}
        icon={icon}
        badges={badges}
        actions={actions}
      />

      <PageContainer
        maxWidth={maxWidth}
        padding={padding}
        className={contentClassName}
      >
        {children}
      </PageContainer>
    </div>
  );

  // Wrap with providers based on props
  let wrappedContent = content;

  if (withQuery) {
    wrappedContent = <QueryProvider>{wrappedContent}</QueryProvider>;
  }

  if (withLocale) {
    wrappedContent = (
      <LocaleProvider initialLocale={initialLocale}>
        {wrappedContent}
      </LocaleProvider>
    );
  }

  if (withTheme) {
    wrappedContent = (
      <ThemeProvider initialTheme={initialTheme}>
        {wrappedContent}
      </ThemeProvider>
    );
  }

  return wrappedContent;
}
