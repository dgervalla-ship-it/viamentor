import * as React from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "../../lib/utils";
import { AlertCircle, Check } from "lucide-react";

export interface AvsInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  value?: string;
  onChange?: (value: string, isValid: boolean) => void;
  showValidation?: boolean;
}

// Validation N° AVS suisse (format: 756.XXXX.XXXX.XX)
function validateAVS(value: string): boolean {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Must be exactly 13 digits and start with 756
  if (digits.length !== 13 || !digits.startsWith('756')) {
    return false;
  }
  
  // TODO: Add EAN-13 checksum validation if needed
  return true;
}

// Format AVS: 756.XXXX.XXXX.XX
function formatAVS(value: string): string {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 11) return `${digits.slice(0, 3)}.${digits.slice(3, 7)}.${digits.slice(7)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 7)}.${digits.slice(7, 11)}.${digits.slice(11, 13)}`;
}

const AvsInput = React.forwardRef<HTMLDivElement, AvsInputProps>(
  ({ 
    label = "N° AVS",
    value = "",
    onChange,
    showValidation = true,
    className,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value);
    const [isTouched, setIsTouched] = React.useState(false);
    
    const isValid = validateAVS(internalValue);
    const showError = showValidation && isTouched && internalValue.length > 0 && !isValid;
    const showSuccess = showValidation && isTouched && isValid;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formatted = formatAVS(rawValue);
      
      setInternalValue(formatted);
      
      if (onChange) {
        onChange(formatted, validateAVS(formatted));
      }
    };

    const handleBlur = () => {
      setIsTouched(true);
    };

    return (
      <div ref={ref} className="space-y-2">
      {label && (
        <Label htmlFor="avs-input" className="flex items-center justify-between">
          <span>{label}</span>
          <span className="text-xs text-muted-foreground font-normal">
            Ex: 756.1234.5678.90
          </span>
        </Label>
      )}
      <div className="relative">
        <Input
          id="avs-input"
          type="text"
          value={internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="756.1234.5678.90"
          maxLength={16} // 13 digits + 3 dots
          className={cn(
            className,
            showError && "border-red-500 focus-visible:ring-red-500",
            showSuccess && "border-green-500 focus-visible:ring-green-500"
          )}
          {...props}
        />
        {showValidation && isTouched && internalValue.length > 0 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValid ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
        )}
      </div>
      {showError && (
        <p className="text-xs text-red-500">
          N° AVS invalide. Format attendu : 756.XXXX.XXXX.XX
        </p>
      )}
      {showSuccess && (
        <p className="text-xs text-green-600">
          ✓ N° AVS valide
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        💡 Vous pouvez saisir avec ou sans points, le format sera ajusté automatiquement
      </p>
      </div>
    );
  }
);
AvsInput.displayName = "AvsInput";

export { AvsInput };

