/**
 * VIAMENTOR - Header Breadcrumb
 * Breadcrumb navigation dynamique généré depuis pathname
 */

"use client";

import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HomeIcon } from "lucide-react";
import {
  HEADER_I18N,
  type HeaderLocale,
} from "@/polymet/data/viamentor-header-i18n";

export interface HeaderBreadcrumbProps {
  locale?: HeaderLocale;
  className?: string;
}

export function HeaderBreadcrumb({
  locale = "fr",
  className,
}: HeaderBreadcrumbProps) {
  const location = useLocation();
  const t = HEADER_I18N[locale].breadcrumb;

  // Generate breadcrumb items from pathname
  const breadcrumbItems = useMemo(() => {
    const pathname = location.pathname;
    if (pathname === "/" || pathname === "/login") return [];

    const segments = pathname.split("/").filter(Boolean);
    const items: Array<{ label: string; href: string; isLast: boolean }> = [];

    segments.forEach((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;

      // Try to translate segment
      const translationKey = segment.toLowerCase() as keyof typeof t;
      let label = t[translationKey] || segment;

      // If segment is an ID (uuid or number), try to get a better label
      if (
        /^[0-9a-f-]{36}$/.test(segment) ||
        /^\d+$/.test(segment) ||
        segment.startsWith("std-") ||
        segment.startsWith("ins-")
      ) {
        // In a real app, you would fetch the entity name from API
        // For now, we'll use a placeholder
        label = segment;
      } else {
        // Capitalize first letter if not translated
        if (label === segment) {
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
        }
      }

      items.push({ label, href, isLast });
    });

    return items;
  }, [location.pathname, t]);

  if (breadcrumbItems.length === 0) return null;

  return (
    <TooltipProvider>
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {/* Home link */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/system"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <HomeIcon className="h-3.5 w-3.5" />

                <span className="sr-only">{t.home}</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbItems.map((item, index) => (
            <div key={item.href} className="flex items-center gap-2">
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                {item.isLast ? (
                  <BreadcrumbPage className="font-semibold max-w-[200px] truncate">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <BreadcrumbLink asChild>
                        <Link
                          to={item.href}
                          className="max-w-[200px] truncate hover:text-foreground transition-colors"
                        >
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </TooltipProvider>
  );
}
