/**
 * VIAMENTOR - Placeholder Page
 * Page placeholder réutilisable pour routes en développement
 */

import { Construction, ArrowLeftIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  backLink?: string;
  locale?: string;
}

export function PlaceholderPage({
  title,
  description = "Cette page est en cours de développement et sera bientôt disponible.",
  icon: Icon = Construction,
  backLink = "/dashboard",
}: PlaceholderPageProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-6">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <Icon className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {description}
          </p>

          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link to={backLink}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Retour au tableau de bord
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Cette fonctionnalité sera disponible dans une prochaine version.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PlaceholderPage;
