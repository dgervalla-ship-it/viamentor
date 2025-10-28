/**
 * VIAMENTOR - Step 3: Autorisations Légales
 *
 * Conformité OMCo 2007 Art. 3
 * - Autorisation cantonale obligatoire
 * - TPP (Transport Personnes Professionnel) obligatoire
 * - Casier judiciaire récent (<3 mois)
 * - RC Professionnelle recommandée
 */

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangleIcon,
  InfoIcon,
  UploadIcon,
  CheckCircleIcon,
  XCircleIcon,
  FileTextIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { SWISS_CANTONS } from "@/polymet/data/viamentor-swiss-cantons";
import {
  validateLegalAuthorizations,
  calculateDaysUntilExpiration,
  isRenewalSoon,
  isExpired,
  type LegalAuthorizationsData,
} from "@/polymet/data/viamentor-instructors-wizard-legal-schemas";
import {
  useInstructorWizardTranslations,
  type InstructorWizardLocale,
} from "@/polymet/data/viamentor-instructors-wizard-i18n";

interface LegalAuthorizationsStepProps {
  initialData?: Partial<LegalAuthorizationsData>;
  locale?: InstructorWizardLocale;
  onDataChange: (data: Partial<LegalAuthorizationsData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function ViaMenutorInstructorWizardStep3LegalAuthorizations({
  initialData,
  locale = "fr",
  onDataChange,
  onValidationChange,
}: LegalAuthorizationsStepProps) {
  const { t, interpolate } = useInstructorWizardTranslations(locale);

  // State
  const [formData, setFormData] = useState<Partial<LegalAuthorizationsData>>(
    initialData || {
      cantonalAuthorization: {
        authorizationNumber: "",
        issuingCanton: "",
        issueDate: "",
        expirationDate: "",
        scanUrl: "",
      },
      tpp: {
        hasValidTPP: false,
        tppNumber: "",
        expirationDate: "",
        certificateUrl: "",
      },
      criminalRecord: {
        extractDate: "",
        documentUrl: "",
        verifiedCompliant: false,
      },
      professionalLiability: {
        insuranceCompany: "",
        policyNumber: "",
        expirationDate: "",
        attestationUrl: "",
      },
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation effect
  useEffect(() => {
    const validation = validateLegalAuthorizations(formData);
    setErrors(validation.errors);
    onValidationChange(validation.success);
    onDataChange(formData);
  }, [formData, onDataChange, onValidationChange]);

  // Handlers
  const handleCantonalAuthChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      cantonalAuthorization: {
        ...prev.cantonalAuthorization!,
        [field]: value,
      },
    }));
  };

  const handleTPPChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      tpp: {
        ...prev.tpp!,
        [field]: value,
      },
    }));
  };

  const handleCriminalRecordChange = (
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      criminalRecord: {
        ...prev.criminalRecord!,
        [field]: value,
      },
    }));
  };

  const handleRCProChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      professionalLiability: {
        ...prev.professionalLiability!,
        [field]: value,
      },
    }));
  };

  // Mock file upload
  const handleFileUpload = (field: string, section: string) => {
    const mockUrl = `https://example.com/${section}-${Date.now()}.pdf`;

    if (section === "cantonal") {
      handleCantonalAuthChange(field, mockUrl);
    } else if (section === "tpp") {
      handleTPPChange(field, mockUrl);
    } else if (section === "criminal") {
      handleCriminalRecordChange(field, mockUrl);
    } else if (section === "rcpro") {
      handleRCProChange(field, mockUrl);
    }
  };

  // Calculate expiration warnings
  const cantonalExpDays = formData.cantonalAuthorization?.expirationDate
    ? calculateDaysUntilExpiration(
        formData.cantonalAuthorization.expirationDate
      )
    : null;
  const cantonalRenewalSoon = formData.cantonalAuthorization?.expirationDate
    ? isRenewalSoon(formData.cantonalAuthorization.expirationDate)
    : false;
  const cantonalExpired = formData.cantonalAuthorization?.expirationDate
    ? isExpired(formData.cantonalAuthorization.expirationDate)
    : false;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">
          {t.legal_authorizations.title}
        </h3>
        <p className="text-muted-foreground">
          {t.legal_authorizations.subtitle}
        </p>
      </div>

      {/* OMCo Info Alert */}
      <Alert>
        <InfoIcon className="h-4 w-4" />

        <AlertDescription>{t.legal_authorizations.omco_info}</AlertDescription>
      </Alert>

      {/* Autorisation Cantonale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5" />

            {t.legal_authorizations.cantonal_authorization.title}
          </CardTitle>
          <CardDescription>
            {t.legal_authorizations.cantonal_authorization.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="authNumber">
                {t.legal_authorizations.cantonal_authorization.number} *
              </Label>
              <Input
                id="authNumber"
                placeholder={
                  t.legal_authorizations.cantonal_authorization
                    .number_placeholder
                }
                value={
                  formData.cantonalAuthorization?.authorizationNumber || ""
                }
                onChange={(e) =>
                  handleCantonalAuthChange(
                    "authorizationNumber",
                    e.target.value
                  )
                }
              />

              {errors["cantonalAuthorization.authorizationNumber"] && (
                <p className="text-xs text-destructive">
                  {errors["cantonalAuthorization.authorizationNumber"]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuingCanton">
                {t.legal_authorizations.cantonal_authorization.issuing_canton} *
              </Label>
              <Select
                value={formData.cantonalAuthorization?.issuingCanton || ""}
                onValueChange={(value) =>
                  handleCantonalAuthChange("issuingCanton", value)
                }
              >
                <SelectTrigger id="issuingCanton">
                  <SelectValue
                    placeholder={
                      t.legal_authorizations.cantonal_authorization
                        .issuing_canton_placeholder
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {SWISS_CANTONS.map((canton) => (
                    <SelectItem key={canton.code} value={canton.code}>
                      {canton.flag} {canton.name[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors["cantonalAuthorization.issuingCanton"] && (
                <p className="text-xs text-destructive">
                  {errors["cantonalAuthorization.issuingCanton"]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueDate">
                {t.legal_authorizations.cantonal_authorization.issue_date} *
              </Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.cantonalAuthorization?.issueDate || ""}
                onChange={(e) =>
                  handleCantonalAuthChange("issueDate", e.target.value)
                }
              />

              {errors["cantonalAuthorization.issueDate"] && (
                <p className="text-xs text-destructive">
                  {errors["cantonalAuthorization.issueDate"]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expirationDate">
                {t.legal_authorizations.cantonal_authorization.expiration_date}{" "}
                *
              </Label>
              <Input
                id="expirationDate"
                type="date"
                value={formData.cantonalAuthorization?.expirationDate || ""}
                onChange={(e) =>
                  handleCantonalAuthChange("expirationDate", e.target.value)
                }
              />

              {cantonalExpDays !== null && cantonalExpDays > 0 && (
                <p className="text-xs text-muted-foreground">
                  {interpolate(
                    t.legal_authorizations.cantonal_authorization.expires_in,
                    {
                      days: cantonalExpDays.toString(),
                    }
                  )}
                </p>
              )}
              {errors["cantonalAuthorization.expirationDate"] && (
                <p className="text-xs text-destructive">
                  {errors["cantonalAuthorization.expirationDate"]}
                </p>
              )}
            </div>
          </div>

          {/* Expiration warnings */}
          {cantonalExpired && (
            <Alert variant="destructive">
              <XCircleIcon className="h-4 w-4" />

              <AlertDescription>
                {t.legal_authorizations.cantonal_authorization.expired_warning}
              </AlertDescription>
            </Alert>
          )}

          {cantonalRenewalSoon && !cantonalExpired && (
            <Alert>
              <AlertTriangleIcon className="h-4 w-4" />

              <AlertDescription>
                {t.legal_authorizations.cantonal_authorization.renewal_warning}
              </AlertDescription>
            </Alert>
          )}

          {/* Upload scan */}
          <div className="space-y-2">
            <Label>
              {t.legal_authorizations.cantonal_authorization.scan} *
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleFileUpload("scanUrl", "cantonal")}
                className="w-full"
              >
                <UploadIcon className="h-4 w-4 mr-2" />

                {t.legal_authorizations.cantonal_authorization.scan_upload}
              </Button>
              {formData.cantonalAuthorization?.scanUrl && (
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              )}
            </div>
            {formData.cantonalAuthorization?.scanUrl && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <FileTextIcon className="h-3 w-3" />

                {formData.cantonalAuthorization.scanUrl}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* TPP */}
      <Card>
        <CardHeader>
          <CardTitle>{t.legal_authorizations.tpp.title}</CardTitle>
          <CardDescription>
            {t.legal_authorizations.tpp.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <InfoIcon className="h-4 w-4" />

            <AlertDescription>
              {t.legal_authorizations.tpp.info}
            </AlertDescription>
          </Alert>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasValidTPP"
              checked={formData.tpp?.hasValidTPP || false}
              onCheckedChange={(checked) =>
                handleTPPChange("hasValidTPP", checked as boolean)
              }
            />

            <Label htmlFor="hasValidTPP" className="font-medium">
              {t.legal_authorizations.tpp.has_valid} *
            </Label>
          </div>
          {errors["tpp.hasValidTPP"] && (
            <p className="text-xs text-destructive">
              {errors["tpp.hasValidTPP"]}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tppNumber">
                {t.legal_authorizations.tpp.number}
              </Label>
              <Input
                id="tppNumber"
                placeholder={t.legal_authorizations.tpp.number_placeholder}
                value={formData.tpp?.tppNumber || ""}
                onChange={(e) => handleTPPChange("tppNumber", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tppExpiration">
                {t.legal_authorizations.tpp.expiration_date}
              </Label>
              <Input
                id="tppExpiration"
                type="date"
                value={formData.tpp?.expirationDate || ""}
                onChange={(e) =>
                  handleTPPChange("expirationDate", e.target.value)
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t.legal_authorizations.tpp.certificate}</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleFileUpload("certificateUrl", "tpp")}
                className="w-full"
              >
                <UploadIcon className="h-4 w-4 mr-2" />

                {t.legal_authorizations.tpp.certificate_upload}
              </Button>
              {formData.tpp?.certificateUrl && (
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Casier Judiciaire */}
      <Card>
        <CardHeader>
          <CardTitle>{t.legal_authorizations.criminal_record.title}</CardTitle>
          <CardDescription>
            {t.legal_authorizations.criminal_record.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangleIcon className="h-4 w-4" />

            <AlertDescription>
              {t.legal_authorizations.criminal_record.warning}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="extractDate">
              {t.legal_authorizations.criminal_record.extract_date} *
            </Label>
            <Input
              id="extractDate"
              type="date"
              value={formData.criminalRecord?.extractDate || ""}
              onChange={(e) =>
                handleCriminalRecordChange("extractDate", e.target.value)
              }
            />

            <p className="text-xs text-muted-foreground">
              {t.legal_authorizations.criminal_record.extract_date_info}
            </p>
            {errors["criminalRecord.extractDate"] && (
              <p className="text-xs text-destructive">
                {errors["criminalRecord.extractDate"]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t.legal_authorizations.criminal_record.document} *</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleFileUpload("documentUrl", "criminal")}
                className="w-full"
              >
                <UploadIcon className="h-4 w-4 mr-2" />

                {t.legal_authorizations.criminal_record.document_upload}
              </Button>
              {formData.criminalRecord?.documentUrl && (
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              )}
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="verifiedCompliant"
              checked={formData.criminalRecord?.verifiedCompliant || false}
              onCheckedChange={(checked) =>
                handleCriminalRecordChange(
                  "verifiedCompliant",
                  checked as boolean
                )
              }
            />

            <div className="space-y-1">
              <Label htmlFor="verifiedCompliant" className="font-medium">
                {t.legal_authorizations.criminal_record.verified}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t.legal_authorizations.criminal_record.verified_subtitle}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RC Professionnelle */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t.legal_authorizations.professional_liability.title}
          </CardTitle>
          <CardDescription>
            {t.legal_authorizations.professional_liability.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <InfoIcon className="h-4 w-4" />

            <AlertDescription>
              {t.legal_authorizations.professional_liability.info}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insuranceCompany">
                {t.legal_authorizations.professional_liability.company}
              </Label>
              <Input
                id="insuranceCompany"
                placeholder={
                  t.legal_authorizations.professional_liability
                    .company_placeholder
                }
                value={formData.professionalLiability?.insuranceCompany || ""}
                onChange={(e) =>
                  handleRCProChange("insuranceCompany", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="policyNumber">
                {t.legal_authorizations.professional_liability.policy_number}
              </Label>
              <Input
                id="policyNumber"
                placeholder={
                  t.legal_authorizations.professional_liability
                    .policy_number_placeholder
                }
                value={formData.professionalLiability?.policyNumber || ""}
                onChange={(e) =>
                  handleRCProChange("policyNumber", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcExpiration">
                {t.legal_authorizations.professional_liability.expiration_date}
              </Label>
              <Input
                id="rcExpiration"
                type="date"
                value={formData.professionalLiability?.expirationDate || ""}
                onChange={(e) =>
                  handleRCProChange("expirationDate", e.target.value)
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              {t.legal_authorizations.professional_liability.attestation}
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleFileUpload("attestationUrl", "rcpro")}
                className="w-full"
              >
                <UploadIcon className="h-4 w-4 mr-2" />

                {
                  t.legal_authorizations.professional_liability
                    .attestation_upload
                }
              </Button>
              {formData.professionalLiability?.attestationUrl && (
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Summary */}
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <XCircleIcon className="h-4 w-4" />

          <AlertDescription>
            <p className="font-medium mb-2">{t.messages.validation_errors}</p>
            <ul className="list-disc list-inside text-xs space-y-1">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
