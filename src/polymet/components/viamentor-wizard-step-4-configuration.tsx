/**
 * VIAMENTOR Tenant Wizard - Step 4: Configuration
 *
 * Configuration modules optionnels et paramètres
 *
 * @module components/viamentor-wizard-step-4-configuration
 * @version 1.0.0
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  configurationSchema,
  ConfigurationData,
  MODULE_PRICING,
  STORAGE_PRICE_PER_GB,
} from "@/polymet/data/viamentor-tenant-wizard-schemas";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  MessageSquareIcon,
  ReceiptIcon,
  QrCodeIcon,
  DatabaseIcon,
} from "lucide-react";
import { useEffect } from "react";

interface Step4ConfigurationProps {
  initialData?: Partial<ConfigurationData>;
  onDataChange: (data: Partial<ConfigurationData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

const MODULE_INFO = {
  geolocation: {
    icon: MapPinIcon,
    title: "Géolocalisation leçons",
    description: "Enregistrement trajets GPS + kilométrage automatique",
  },
  smsNotifications: {
    icon: MessageSquareIcon,
    title: "SMS notifications",
    description: "Confirmations et rappels automatiques aux élèves",
  },
  accountingIntegration: {
    icon: ReceiptIcon,
    title: "Intégration comptable",
    description: "Export automatique vers Banana/Bexio",
  },
  qrBill: {
    icon: QrCodeIcon,
    title: "QR-bill Suisse",
    description: "Génération factures avec QR-code de paiement",
  },
  bankReconciliation: {
    icon: DatabaseIcon,
    title: "Import Camt.054",
    description: "Réconciliation bancaire automatique",
  },
};

export function Step4Configuration({
  initialData,
  onDataChange,
  onValidationChange,
}: Step4ConfigurationProps) {
  const {
    watch,
    setValue,
    formState: { isValid },
  } = useForm<ConfigurationData>({
    resolver: zodResolver(configurationSchema),
    mode: "onChange",
    defaultValues: initialData || {
      modules: {
        geolocation: false,
        smsNotifications: false,
        accountingIntegration: false,
        qrBill: false,
        bankReconciliation: false,
      },
      backupFrequency: "daily",
      storageQuota: 100,
    },
  });

  const formData = watch();
  const storageQuota = watch("storageQuota");
  const modules = watch("modules");

  // Notify parent of data changes
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  // Notify parent of validation state
  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  const extraStorage = Math.max(0, storageQuota - 100);
  const storageCost = extraStorage * STORAGE_PRICE_PER_GB;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Configuration</h2>
        <p className="text-muted-foreground">
          Personnalisez les modules et paramètres
        </p>
      </div>

      {/* Modules */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Modules optionnels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(
            Object.entries(MODULE_INFO) as [
              keyof typeof MODULE_INFO,
              (typeof MODULE_INFO)[keyof typeof MODULE_INFO],
            ][]
          ).map(([key, info]) => {
            const Icon = info.icon;
            return (
              <Card
                key={key}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setValue(`modules.${key}`, !modules[key])}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary mt-1" />

                      <div>
                        <CardTitle className="text-base">
                          {info.title}
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {info.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Checkbox
                      checked={modules[key]}
                      onCheckedChange={(checked) =>
                        setValue(`modules.${key}`, checked as boolean)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">
                    +{MODULE_PRICING[key]} CHF/mois
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Backup Frequency */}
      <div className="space-y-2">
        <Label htmlFor="backupFrequency">Fréquence des sauvegardes</Label>
        <Select
          value={formData.backupFrequency}
          onValueChange={(value) =>
            setValue("backupFrequency", value as "daily" | "weekly" | "manual")
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Quotidien (3h du matin)</SelectItem>
            <SelectItem value="weekly">Hebdomadaire (dimanche)</SelectItem>
            <SelectItem value="manual">Manuel uniquement</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Storage Quota */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quota de stockage</CardTitle>
          <CardDescription>
            100 GB inclus, {STORAGE_PRICE_PER_GB} CHF/GB supplémentaire
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Quota : {storageQuota} GB</Label>
              {extraStorage > 0 && (
                <Badge variant="secondary">
                  +{storageCost.toFixed(2)} CHF/mois
                </Badge>
              )}
            </div>
            <Slider
              value={[storageQuota]}
              onValueChange={(value) => setValue("storageQuota", value[0])}
              min={10}
              max={500}
              step={10}
              className="w-full"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10 GB</span>
              <span>500 GB</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
