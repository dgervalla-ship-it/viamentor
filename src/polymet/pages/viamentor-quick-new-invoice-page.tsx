/**
 * VIAMENTOR - Quick New Invoice Page
 * Page Quick Action pour création rapide de facture
 *
 * @module pages/viamentor-quick-new-invoice-page
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
  FileTextIcon,
  PlusIcon,
  TrashIcon,
  CheckCircle2Icon,
  XIcon,
  AlertCircleIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface QuickNewInvoicePageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockStudents = [
  { id: "1", name: "Sophie Martin", category: "B" },
  { id: "2", name: "Lucas Dubois", category: "B" },
  { id: "3", name: "Emma Bernard", category: "A1" },
];

const commonItems = [
  { description: "Leçon de conduite (60 min)", unitPrice: 95 },
  { description: "Leçon de conduite (90 min)", unitPrice: 140 },
  { description: "Cours théorique", unitPrice: 50 },
  { description: "Examen pratique", unitPrice: 150 },
  { description: "Forfait 10 leçons", unitPrice: 900 },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function QuickNewInvoicePage({
  locale = "fr",
}: QuickNewInvoicePageProps) {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const selectCommonItem = (
    index: number,
    commonItem: (typeof commonItems)[0]
  ) => {
    const item = items[index];
    if (item) {
      updateItem(item.id, "description", commonItem.description);
      updateItem(item.id, "unitPrice", commonItem.unitPrice);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const calculateTVA = () => {
    return calculateSubtotal() * 0.077; // TVA 7.7%
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTVA();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedStudent) newErrors.student = "Élève requis";

    const hasValidItems = items.some(
      (item) =>
        item.description.trim() && item.quantity > 0 && item.unitPrice > 0
    );

    if (!hasValidItems) {
      newErrors.items = "Au moins un article valide requis";
    }

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
          'Prevented assignment: `window.location.href = "/invoices"`'
        ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const isFormValid =
    selectedStudent &&
    items.some(
      (item) =>
        item.description.trim() && item.quantity > 0 && item.unitPrice > 0
    );

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2Icon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Facture créée !</h2>
          <p className="text-muted-foreground mb-4">
            La facture a été générée avec succès.
          </p>
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <p className="text-sm font-medium">Montant total</p>
            <p className="text-2xl font-bold">
              CHF {calculateTotal().toFixed(2)}
            </p>
          </div>
          <Link to="/invoices">
            <Button variant="link" className="mt-2">
              Voir les factures
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
          <h1 className="text-3xl font-bold">Nouvelle Facture</h1>
          <p className="text-muted-foreground mt-1">
            Créez rapidement une nouvelle facture
          </p>
        </div>
        <Link to="/invoices">
          <Button variant="ghost" size="icon">
            <XIcon className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulaire */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              {/* Élève */}
              <div className="space-y-2">
                <Label htmlFor="student" className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Élève <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={selectedStudent}
                  onValueChange={setSelectedStudent}
                >
                  <SelectTrigger
                    id="student"
                    className={errors.student ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Sélectionner un élève" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        <div className="flex items-center gap-2">
                          <span>{student.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {student.category}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.student && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircleIcon className="w-3 h-3" />

                    {errors.student}
                  </p>
                )}
              </div>

              <Separator />

              {/* Articles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <FileTextIcon className="w-4 h-4" />
                    Articles <span className="text-destructive">*</span>
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                    className="gap-2"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Ajouter
                  </Button>
                </div>

                {errors.items && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircleIcon className="w-3 h-3" />

                    {errors.items}
                  </p>
                )}

                <div className="space-y-3">
                  {items.map((item, index) => (
                    <Card key={item.id} className="p-4">
                      <div className="space-y-3">
                        {/* Articles courants */}
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Articles courants
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {commonItems.map((commonItem, i) => (
                              <Button
                                key={i}
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  selectCommonItem(index, commonItem)
                                }
                                className="text-xs"
                              >
                                {commonItem.description}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-6">
                            <Input
                              placeholder="Description"
                              value={item.description}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-span-2">
                            <Input
                              type="number"
                              placeholder="Qté"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "quantity",
                                  parseInt(e.target.value) || 1
                                )
                              }
                            />
                          </div>
                          <div className="col-span-3">
                            <Input
                              type="number"
                              placeholder="Prix CHF"
                              min="0"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "unitPrice",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                            />
                          </div>
                          <div className="col-span-1 flex items-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              disabled={items.length === 1}
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {item.description &&
                          item.quantity > 0 &&
                          item.unitPrice > 0 && (
                            <div className="text-right text-sm text-muted-foreground">
                              Total: CHF{" "}
                              {(item.quantity * item.unitPrice).toFixed(2)}
                            </div>
                          )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Input
                  id="notes"
                  placeholder="Ajouter des notes pour cette facture..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Résumé */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-6">
            <h3 className="font-semibold mb-4">Résumé</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="font-medium">
                  CHF {calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">TVA (7.7%)</span>
                <span className="font-medium">
                  CHF {calculateTVA().toFixed(2)}
                </span>
              </div>
              <Separator />

              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">
                  CHF {calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? "Création..." : "Créer la facture"}
              </Button>
              <Link to="/invoices" className="w-full">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
