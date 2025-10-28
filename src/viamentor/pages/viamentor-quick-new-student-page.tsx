/**
 * VIAMENTOR - Quick New Student Page
 * Page Quick Action pour ajout rapide d'un nouvel élève
 *
 * @module pages/viamentor-quick-new-student-page
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircle2Icon,
  XIcon,
  AlertCircleIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface QuickNewStudentPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// MOCK DATA
// ============================================================================

const categories = [
  { value: "A1", label: "A1 - Moto 125cc" },
  { value: "A", label: "A - Moto sans restriction" },
  { value: "B", label: "B - Voiture" },
  { value: "C", label: "C - Camion" },
  { value: "D", label: "D - Bus" },
];

const cantons = [
  { value: "GE", label: "Genève" },
  { value: "VD", label: "Vaud" },
  { value: "VS", label: "Valais" },
  { value: "FR", label: "Fribourg" },
  { value: "NE", label: "Neuchâtel" },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function QuickNewStudentPage({
  locale = "fr",
}: QuickNewStudentPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [canton, setCanton] = useState("GE");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!lastName.trim()) newErrors.lastName = "Nom requis";
    if (!email.trim()) {
      newErrors.email = "Email requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email invalide";
    }
    if (!phone.trim()) {
      newErrors.phone = "Téléphone requis";
    } else if (!/^(\+41|0)[0-9]{9}$/.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = "Format: +41XXXXXXXXX ou 0XXXXXXXXX";
    }
    if (!category) newErrors.category = "Catégorie requise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulation API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  // Auto-redirect après succès
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        console.warn(
          'Prevented assignment: `window.location.href = "/students"`'
        ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const isFormValid = firstName && lastName && email && phone && category;

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2Icon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Élève créé !</h2>
          <p className="text-muted-foreground mb-4">
            {firstName} {lastName} a été ajouté avec succès.
          </p>
          <Link to="/students">
            <Button variant="link" className="mt-2">
              Voir la liste des élèves
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nouvel Élève</h1>
          <p className="text-muted-foreground mt-1">
            Ajoutez rapidement un nouvel élève
          </p>
        </div>
        <Link to="/students">
          <Button variant="ghost" size="icon">
            <XIcon className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Informations personnelles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  Prénom <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="Sophie"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={errors.firstName ? "border-destructive" : ""}
                />

                {errors.firstName && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircleIcon className="w-3 h-3" />

                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Nom <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Martin"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={errors.lastName ? "border-destructive" : ""}
                />

                {errors.lastName && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircleIcon className="w-3 h-3" />

                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MailIcon className="w-5 h-5" />
              Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sophie.martin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />

                {errors.email && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircleIcon className="w-3 h-3" />

                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Téléphone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+41 79 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                />

                {errors.phone && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircleIcon className="w-3 h-3" />

                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Formation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Formation</h3>
            <div className="space-y-2">
              <Label htmlFor="category">
                Catégorie <span className="text-destructive">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  id="category"
                  className={errors.category ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircleIcon className="w-3 h-3" />

                  {errors.category}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Adresse */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPinIcon className="w-5 h-5" />
              Adresse (optionnel)
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Rue et numéro</Label>
                <Input
                  id="address"
                  placeholder="Rue de la Gare 15"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">NPA</Label>
                  <Input
                    id="postalCode"
                    placeholder="1200"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    placeholder="Genève"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canton">Canton</Label>
                  <Select value={canton} onValueChange={setCanton}>
                    <SelectTrigger id="canton">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cantons.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Vous pourrez compléter le dossier de
              l'élève (documents, progression, etc.) depuis sa fiche détaillée.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Link to="/students" className="flex-1">
              <Button
                variant="outline"
                className="w-full"
                disabled={isSubmitting}
              >
                Annuler
              </Button>
            </Link>
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Création..." : "Créer l'élève"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
