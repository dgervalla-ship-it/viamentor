import * as React from "react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { cn } from "../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Info } from "lucide-react";

export interface ConsentCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  type: "faber" | "cgu" | "rgpd" | "newsletter";
  required?: boolean;
}

const CONSENT_CONFIG = {
  faber: {
    label: "J'autorise la création de mon dossier officiel FABER",
    description: "Viamentor doit créer votre dossier dans le système officiel suisse pour votre formation de conducteur.",
    learnMore: "Le FABER est le système centralisé d'enregistrement des personnes en formation. C'est obligatoire pour suivre vos cours et passer l'examen.",
    required: true,
  },
  cgu: {
    label: "J'accepte les Conditions Générales d'Utilisation",
    description: "Les règles d'utilisation de la plateforme Viamentor.",
    learnMore: "Les CGU définissent vos droits et obligations lors de l'utilisation de Viamentor. Vous pouvez consulter le document complet à tout moment.",
    required: true,
  },
  rgpd: {
    label: "J'accepte le traitement de mes données personnelles",
    description: "Vos données sont utilisées uniquement pour votre formation et protégées selon le RGPD.",
    learnMore: "Nous collectons : nom, prénom, date de naissance, adresse, N° AVS pour gérer votre formation. Vos données ne sont jamais vendues à des tiers.",
    required: true,
  },
  newsletter: {
    label: "Je souhaite recevoir les actualités Viamentor par email",
    description: "Recevez nos conseils conduite, nouveautés et promotions (optionnel).",
    learnMore: "Environ 1 email par mois. Vous pouvez vous désabonner à tout moment en 1 clic.",
    required: false,
  },
};

const ConsentCheckbox = React.forwardRef<HTMLDivElement, ConsentCheckboxProps>(
  ({ id, checked, onCheckedChange, type, required, className, ...props }, ref) => {
    const config = CONSENT_CONFIG[type];
    const isRequired = required ?? config.required;

    return (
      <div ref={ref} className={cn("flex items-start space-x-3", className)} {...props}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        required={isRequired}
        className="mt-0.5"
      />
      <div className="flex-1 space-y-1">
        <Label 
          htmlFor={id} 
          className="text-sm font-normal cursor-pointer flex items-center gap-2"
        >
          {config.label}
          {isRequired && (
            <span className="text-red-500 text-xs">*</span>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  type="button"
                  className="inline-flex"
                  onClick={(e) => e.preventDefault()}
                >
                  <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="max-w-sm p-3"
              >
                <p className="text-sm font-medium mb-2">{config.description}</p>
                <p className="text-xs text-muted-foreground">{config.learnMore}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {config.description}
        </p>
      </div>
      </div>
    );
  }
);
ConsentCheckbox.displayName = "ConsentCheckbox";

// Composant groupé pour tous les consentements obligatoires
export interface ConsentGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  values: {
    faber: boolean;
    cgu: boolean;
    rgpd: boolean;
    newsletter?: boolean;
  };
  onChange: (type: keyof ConsentGroupProps['values'], checked: boolean) => void;
  showNewsletter?: boolean;
}

const ConsentGroup = React.forwardRef<HTMLDivElement, ConsentGroupProps>(
  ({ values, onChange, showNewsletter = true, className, ...props }, ref) => {
    const allRequiredAccepted = values.faber && values.cgu && values.rgpd;

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
      <div className="space-y-3">
        <ConsentCheckbox
          id="consent-faber"
          type="faber"
          checked={values.faber}
          onCheckedChange={(checked) => onChange('faber', checked)}
        />
        <ConsentCheckbox
          id="consent-cgu"
          type="cgu"
          checked={values.cgu}
          onCheckedChange={(checked) => onChange('cgu', checked)}
        />
        <ConsentCheckbox
          id="consent-rgpd"
          type="rgpd"
          checked={values.rgpd}
          onCheckedChange={(checked) => onChange('rgpd', checked)}
        />
        {showNewsletter && (
          <ConsentCheckbox
            id="consent-newsletter"
            type="newsletter"
            checked={values.newsletter ?? false}
            onCheckedChange={(checked) => onChange('newsletter', checked)}
          />
        )}
      </div>
      
      {!allRequiredAccepted && (
        <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-md">
          <Info className="h-4 w-4 shrink-0" />
          <p>
            Les consentements marqués d'une étoile (*) sont obligatoires pour créer votre compte.
          </p>
        </div>
      )}
      </div>
    );
  }
);
ConsentGroup.displayName = "ConsentGroup";

export { ConsentCheckbox, ConsentGroup };

