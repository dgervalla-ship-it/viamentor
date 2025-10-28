/**
 * VIAMENTOR - Quick Actions Grid Component
 * Composant réutilisable pour afficher des actions rapides
 *
 * FEATURES:
 * - Grille responsive d'actions
 * - Icônes personnalisables
 * - Badges de notification
 * - Navigation intégrée
 * - Support dark mode
 * - Variants de couleurs
 * - Descriptions optionnelles
 * - États disabled
 */

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  Calendar,
  FileText,
  Award,
  UserCheck,
  Car,
  BarChart3,
  Settings,
  Building2,
  Users,
  CreditCard,
  ShieldCheck,
  Server,
  Database,
  Activity,
  AlertTriangle,
  Lock,
  Globe,
  Zap,
  TrendingUp,
  DollarSign,
  UserCog,
  FileBarChart,
  Bell,
  Mail,
  Phone,
  MessageSquare,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Plus,
  Minus,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

export interface QuickAction {
  id: string;
  label: string;
  description?: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  badge?: number | string;
  color?: "primary" | "success" | "warning" | "danger";
  disabled?: boolean;
}

export interface QuickActionsGridProps {
  title?: string;
  actions: QuickAction[];
  columns?: 2 | 3 | 4 | 6;
  className?: string;
}

// ============================================================================
// ICON MAP
// ============================================================================

const iconMap: Record<string, any> = {
  UserPlus,
  Calendar,
  FileText,
  Award,
  UserCheck,
  Car,
  BarChart3,
  Settings,
  Building2,
  Users,
  CreditCard,
  ShieldCheck,
  Server,
  Database,
  Activity,
  AlertTriangle,
  Lock,
  Globe,
  Zap,
  TrendingUp,
  DollarSign,
  UserCog,
  FileBarChart,
  Bell,
  Mail,
  Phone,
  MessageSquare,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Plus,
  Minus,
};

// ============================================================================
// COLOR VARIANTS
// ============================================================================

const colorVariants = {
  primary: "hover:bg-primary/10 hover:border-primary/50",
  success: "hover:bg-green-50 hover:border-green-500 dark:hover:bg-green-950",
  warning:
    "hover:bg-orange-50 hover:border-orange-500 dark:hover:bg-orange-950",
  danger: "hover:bg-red-50 hover:border-red-500 dark:hover:bg-red-950",
  info: "hover:bg-blue-50 hover:border-blue-500 dark:hover:bg-blue-950",
};

const badgeVariants = {
  primary: "bg-primary text-primary-foreground",
  success: "bg-green-500 text-white",
  warning: "bg-orange-500 text-white",
  danger: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
};

// ============================================================================
// COMPONENT
// ============================================================================

export function QuickActionsGrid({
  title = "Actions rapides",
  actions,
  columns = 4,
  className = "",
}: QuickActionsGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className={`grid ${gridCols[columns]} gap-3`}>
          {actions.map((action) => {
            const Icon = iconMap[action.icon];
            const colorClass = action.color ? colorVariants[action.color] : "";
            const badgeClass =
              action.badge && action.color ? badgeVariants[action.color] : "";

            const content = (
              <Button
                variant="outline"
                className={`w-full h-auto flex-col gap-2 py-4 relative transition-all ${colorClass}`}
                disabled={action.disabled}
                onClick={action.onClick}
              >
                {action.badge && (
                  <Badge
                    className={`absolute top-2 right-2 h-5 w-5 p-0 flex items-center justify-center text-xs ${badgeClass || "bg-destructive text-destructive-foreground"}`}
                  >
                    {action.badge}
                  </Badge>
                )}
                {Icon && <Icon className="h-5 w-5" />}
                <span className="text-xs font-medium text-center">
                  {action.label}
                </span>
                {action.description && (
                  <span className="text-[10px] text-muted-foreground text-center line-clamp-2">
                    {action.description}
                  </span>
                )}
              </Button>
            );

            return action.href ? (
              <Link key={action.id} to={action.href}>
                {content}
              </Link>
            ) : (
              <div key={action.id}>{content}</div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default QuickActionsGrid;
