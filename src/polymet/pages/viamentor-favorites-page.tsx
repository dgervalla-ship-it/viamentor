/**
 * VIAMENTOR - Favorites Page
 * Page favoris et raccourcis personnalisés
 *
 * Features:
 * - Favoris organisés par catégories
 * - Drag & drop pour réorganiser
 * - Add/remove favorites
 * - Custom labels
 * - Quick access grid
 */

import { useState } from "react";
import {
  StarIcon,
  PlusIcon,
  TrashIcon,
  Edit2Icon,
  GripVerticalIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// ============================================================================
// TYPES
// ============================================================================

interface Favorite {
  id: string;
  title: string;
  href: string;
  category: string;
  icon: string;
  color?: string;
}

interface FavoritesPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_FAVORITES: Favorite[] = [
  {
    id: "1",
    title: "Planning Aujourd'hui",
    href: "/planning",
    category: "Planning",
    icon: "📅",
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Mes Élèves Actifs",
    href: "/students?status=active",
    category: "Élèves",
    icon: "👨‍🎓",
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Factures Impayées",
    href: "/invoices?status=unpaid",
    category: "Facturation",
    icon: "📄",
    color: "bg-red-500",
  },
  {
    id: "4",
    title: "Dashboard École",
    href: "/school/dashboard",
    category: "Dashboard",
    icon: "🏫",
    color: "bg-purple-500",
  },
  {
    id: "5",
    title: "Analytics Revenus",
    href: "/analytics?tab=revenue",
    category: "Analytics",
    icon: "📊",
    color: "bg-orange-500",
  },
  {
    id: "6",
    title: "Prospects Chauds",
    href: "/staff/prospects?status=hot",
    category: "CRM",
    icon: "🎯",
    color: "bg-pink-500",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function FavoritesPage({ locale = "fr" }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState<Favorite[]>(MOCK_FAVORITES);

  const removeFavorite = (id: string) => {
    if (confirm("Retirer ce favori ?")) {
      setFavorites((favs) => favs.filter((f) => f.id !== id));
    }
  };

  const groupByCategory = (favs: Favorite[]) => {
    const groups: Record<string, Favorite[]> = {};
    favs.forEach((fav) => {
      if (!groups[fav.category]) {
        groups[fav.category] = [];
      }
      groups[fav.category].push(fav);
    });
    return groups;
  };

  const groupedFavorites = groupByCategory(favorites);

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Favoris & Raccourcis</h1>
          <p className="text-muted-foreground">
            Accès rapide à vos pages les plus utilisées
          </p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter un Favori
        </Button>
      </div>

      {/* Quick Access Grid */}
      {favorites.length > 0 ? (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Accès Rapide</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.slice(0, 8).map((favorite) => (
              <Link key={favorite.id} to={favorite.href}>
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full ${favorite.color} flex items-center justify-center text-3xl`}
                    >
                      {favorite.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{favorite.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {favorite.category}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {/* Favorites by Category */}
      {favorites.length > 0 ? (
        <div className="space-y-8">
          <h2 className="text-xl font-semibold">Tous les Favoris</h2>
          {Object.entries(groupedFavorites).map(([category, favs]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
                <CardDescription>
                  {favs.length} favori{favs.length > 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {favs.map((favorite) => (
                    <div
                      key={favorite.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                    >
                      <GripVerticalIcon className="h-5 w-5 text-muted-foreground cursor-move" />

                      <div
                        className={`w-10 h-10 rounded-full ${favorite.color} flex items-center justify-center text-xl shrink-0`}
                      >
                        {favorite.icon}
                      </div>
                      <Link to={favorite.href} className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">
                          {favorite.title}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {favorite.href}
                        </p>
                      </Link>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit2Icon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFavorite(favorite.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <StarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />

            <h3 className="text-lg font-semibold mb-2">Aucun favori</h3>
            <p className="text-muted-foreground mb-4">
              Ajoutez vos pages préférées pour un accès rapide
            </p>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Ajouter votre premier favori
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-sm">💡 Astuces</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              • Cliquez sur l'étoile ⭐ dans n'importe quelle page pour
              l'ajouter aux favoris
            </li>
            <li>• Glissez-déposez pour réorganiser vos favoris</li>
            <li>• Utilisez des labels personnalisés pour mieux organiser</li>
            <li>• Les 8 premiers favoris apparaissent en accès rapide</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
