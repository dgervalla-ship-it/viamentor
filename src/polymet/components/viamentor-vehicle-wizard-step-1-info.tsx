/**
 * VIAMENTOR - Vehicle Wizard Step 1: Vehicle Information
 * Upload photos, license plate validation, vehicle details
 */

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  vehicleInfoSchema,
  type VehicleInfoData,
} from "@/polymet/data/viamentor-vehicles-wizard-schemas";
import {
  getVehicleWizardI18n,
  type VehicleWizardLocale,
} from "@/polymet/data/viamentor-vehicles-wizard-i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CarIcon,
  BikeIcon,
  TruckIcon,
  CheckCircle2Icon,
  XCircleIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";

interface VehicleInfoStepProps {
  initialData?: Partial<VehicleInfoData>;
  locale?: VehicleWizardLocale;
  onDataChange: (data: Partial<VehicleInfoData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function VehicleInfoStep({
  initialData,
  locale = "fr",
  onDataChange,
  onValidationChange,
}: VehicleInfoStepProps) {
  const t = getVehicleWizardI18n(locale).step1;
  const [photos, setPhotos] = useState<File[]>([]);
  const [plateChecking, setPlateChecking] = useState(false);
  const [plateAvailable, setPlateAvailable] = useState<boolean | null>(null);

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<VehicleInfoData>({
    resolver: zodResolver(vehicleInfoSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  const formData = watch();

  // Notify parent of changes
  const handleChange = useCallback(() => {
    onDataChange(formData);
    onValidationChange(isValid && photos.length > 0);
  }, [formData, isValid, photos, onDataChange, onValidationChange]);

  // Photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(
      (f) => f.size <= 2 * 1024 * 1024 && f.type.startsWith("image/")
    );
    setPhotos((prev) => [...prev, ...validFiles].slice(0, 5));
    handleChange();
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    handleChange();
  };

  // License plate validation
  const checkPlateAvailability = async (plate: string) => {
    if (!plate || !/^[A-Z]{2}[\s-]?\d{6}$/.test(plate)) return;
    setPlateChecking(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setPlateAvailable(Math.random() > 0.3); // 70% available
    setPlateChecking(false);
  };

  const categoryIcons = {
    B: CarIcon,
    A: BikeIcon,
    BE: TruckIcon,
    A1: BikeIcon,
  };

  return (
    <div className="space-y-6">
      {/* Photos Upload */}
      <div className="space-y-2">
        <Label>{t.photos}</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
            id="photo-upload"
            disabled={photos.length >= 5}
          />

          <label htmlFor="photo-upload" className="cursor-pointer">
            <UploadIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />

            <p className="text-sm text-muted-foreground">{t.photos}</p>
          </label>
        </div>

        {/* Photo Gallery */}
        {photos.length > 0 && (
          <div className="grid grid-cols-5 gap-2">
            {photos.map((photo, i) => (
              <div key={i} className="relative group">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-20 object-cover rounded border border-border"
                />

                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removePhoto(i)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* License Plate */}
        <div className="space-y-2">
          <Label htmlFor="licensePlate">{t.plate} *</Label>
          <div className="relative">
            <Input
              id="licensePlate"
              {...register("licensePlate")}
              placeholder={t.plate}
              className="uppercase"
              onBlur={(e) => checkPlateAvailability(e.target.value)}
            />

            {plateChecking && (
              <span className="absolute right-3 top-3 text-xs text-muted-foreground">
                ...
              </span>
            )}
            {plateAvailable === true && (
              <CheckCircle2Icon className="absolute right-3 top-3 h-4 w-4 text-green-500" />
            )}
            {plateAvailable === false && (
              <XCircleIcon className="absolute right-3 top-3 h-4 w-4 text-destructive" />
            )}
          </div>
          {errors.licensePlate && (
            <p className="text-xs text-destructive">
              {errors.licensePlate.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2 md:col-span-2">
          <Label>{t.category.label} *</Label>
          <RadioGroup
            value={formData.category}
            onValueChange={(value) => {
              setValue("category", value as any);
              handleChange();
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {(["B", "A", "BE", "A1"] as const).map((cat) => {
              const Icon = categoryIcons[cat];
              return (
                <Card key={cat} className="relative">
                  <RadioGroupItem
                    value={cat}
                    id={cat}
                    className="peer sr-only"
                  />

                  <Label
                    htmlFor={cat}
                    className="flex flex-col items-center justify-center p-4 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 border-2 rounded-lg"
                  >
                    <Icon className="h-8 w-8 mb-2" />

                    <span className="font-medium">{t.category[cat]}</span>
                  </Label>
                </Card>
              );
            })}
          </RadioGroup>
          {errors.category && (
            <p className="text-xs text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <Label htmlFor="brand">{t.brand} *</Label>
          <Input id="brand" {...register("brand")} placeholder={t.brand} />

          {errors.brand && (
            <p className="text-xs text-destructive">{errors.brand.message}</p>
          )}
        </div>

        {/* Model */}
        <div className="space-y-2">
          <Label htmlFor="model">{t.model} *</Label>
          <Input id="model" {...register("model")} placeholder={t.model} />

          {errors.model && (
            <p className="text-xs text-destructive">{errors.model.message}</p>
          )}
        </div>

        {/* Year */}
        <div className="space-y-2">
          <Label htmlFor="year">{t.year} *</Label>
          <Input
            id="year"
            type="number"
            {...register("year", { valueAsNumber: true })}
            placeholder={t.year}
            min={1990}
            max={new Date().getFullYear()}
          />

          {errors.year && (
            <p className="text-xs text-destructive">{errors.year.message}</p>
          )}
        </div>

        {/* Transmission */}
        <div className="space-y-2">
          <Label>{t.transmission.label} *</Label>
          <RadioGroup
            value={formData.transmission}
            onValueChange={(value) => {
              setValue("transmission", value as any);
              handleChange();
            }}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="manual" />

              <Label htmlFor="manual">{t.transmission.manual}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="automatic" id="automatic" />

              <Label htmlFor="automatic">{t.transmission.automatic}</Label>
            </div>
          </RadioGroup>
          {errors.transmission && (
            <p className="text-xs text-destructive">
              {errors.transmission.message}
            </p>
          )}
        </div>

        {/* Color */}
        <div className="space-y-2">
          <Label htmlFor="color">{t.color}</Label>
          <Input id="color" {...register("color")} placeholder={t.color} />
        </div>

        {/* VIN */}
        <div className="space-y-2">
          <Label htmlFor="vin">{t.vin}</Label>
          <Input
            id="vin"
            {...register("vin")}
            placeholder={t.vin}
            maxLength={17}
          />

          {errors.vin && (
            <p className="text-xs text-destructive">{errors.vin.message}</p>
          )}
        </div>

        {/* Mileage */}
        <div className="space-y-2">
          <Label htmlFor="mileage">{t.mileage} *</Label>
          <div className="relative">
            <Input
              id="mileage"
              type="number"
              {...register("mileage", { valueAsNumber: true })}
              placeholder="50000"
              className="pr-12"
            />

            <span className="absolute right-3 top-3 text-sm text-muted-foreground">
              km
            </span>
          </div>
          {errors.mileage && (
            <p className="text-xs text-destructive">{errors.mileage.message}</p>
          )}
        </div>

        {/* Registration Date */}
        <div className="space-y-2">
          <Label htmlFor="registrationDate">{t.regDate} *</Label>
          <Input
            id="registrationDate"
            type="date"
            {...register("registrationDate")}
          />

          {errors.registrationDate && (
            <p className="text-xs text-destructive">
              {errors.registrationDate.message}
            </p>
          )}
        </div>

        {/* Acquisition Date */}
        <div className="space-y-2">
          <Label htmlFor="acquisitionDate">{t.acqDate}</Label>
          <Input
            id="acquisitionDate"
            type="date"
            {...register("acquisitionDate")}
          />
        </div>

        {/* Purchase Price */}
        <div className="space-y-2">
          <Label htmlFor="purchasePrice">{t.price}</Label>
          <div className="relative">
            <Input
              id="purchasePrice"
              type="number"
              {...register("purchasePrice", { valueAsNumber: true })}
              placeholder="25000"
              className="pr-16"
            />

            <span className="absolute right-3 top-3 text-sm text-muted-foreground">
              CHF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
