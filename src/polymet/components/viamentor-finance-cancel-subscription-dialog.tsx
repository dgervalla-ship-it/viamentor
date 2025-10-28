/**
 * VIAMENTOR Finance Cancel Subscription Dialog
 *
 * Dialog annulation avec retention flow
 *
 * @module components/viamentor-finance-cancel-subscription-dialog
 */

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangleIcon, InfoIcon } from "lucide-react";
import {
  TenantSubscription,
  formatCurrency,
} from "@/polymet/data/viamentor-finance-data";

interface CancelSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: TenantSubscription | null;
  locale?: "fr" | "de" | "it" | "en";
  onConfirm?: (data: {
    reason: string;
    offerDiscount: boolean;
    discountAmount?: string;
    sendEmail: boolean;
  }) => void;
}

export function CancelSubscriptionDialog({
  open,
  onOpenChange,
  subscription,
  locale = "fr",
  onConfirm,
}: CancelSubscriptionDialogProps) {
  const [reason, setReason] = useState("");
  const [offerDiscount, setOfferDiscount] = useState(false);
  const [discountAmount, setDiscountAmount] = useState<string>("20");
  const [sendEmail, setSendEmail] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!subscription) return null;

  const handleConfirm = async () => {
    if (reason.length < 20) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onConfirm?.({
      reason,
      offerDiscount,
      discountAmount: offerDiscount ? discountAmount : undefined,
      sendEmail,
    });

    setIsSubmitting(false);
    onOpenChange(false);
    setReason("");
    setOfferDiscount(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5 text-destructive" />
            Annuler l'abonnement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4" />

            <AlertDescription>
              Êtes-vous sûr de vouloir annuler l'abonnement de{" "}
              <strong>{subscription.tenantName}</strong> ?
            </AlertDescription>
          </Alert>

          <Alert>
            <InfoIcon className="h-4 w-4" />

            <AlertDescription>
              L'abonnement restera actif jusqu'au{" "}
              <strong>
                {new Date(subscription.nextBillingDate).toLocaleDateString(
                  `${locale}-CH`
                )}
              </strong>
              . Le tenant pourra exporter ses données avant l'expiration.
            </AlertDescription>
          </Alert>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Plan actuel</span>
              <Badge variant="outline">{subscription.plan}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Prix</span>
              <span className="font-medium">
                {formatCurrency(subscription.price, locale)}/mois
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Contribution MRR
              </span>
              <span className="font-medium text-destructive">
                -{formatCurrency(subscription.mrrContribution, locale)}
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="reason">
              Raison de l'annulation <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Veuillez expliquer la raison de l'annulation (minimum 20 caractères)..."
              className="mt-2 min-h-24"
            />

            <p className="text-xs text-muted-foreground mt-1">
              {reason.length}/20 caractères minimum
            </p>
          </div>

          <div className="space-y-3 p-4 border border-border rounded-lg">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="offerDiscount"
                checked={offerDiscount}
                onCheckedChange={(checked) =>
                  setOfferDiscount(checked as boolean)
                }
              />

              <div className="flex-1">
                <Label htmlFor="offerDiscount" className="cursor-pointer">
                  Offrir une réduction de rétention
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Proposer une réduction pour conserver le client
                </p>
              </div>
            </div>

            {offerDiscount && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="discount">Montant de la réduction</Label>
                <Select
                  value={discountAmount}
                  onValueChange={setDiscountAmount}
                >
                  <SelectTrigger id="discount">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20% pendant 3 mois</SelectItem>
                    <SelectItem value="50">50% pendant 3 mois</SelectItem>
                    <SelectItem value="custom">Personnalisé</SelectItem>
                  </SelectContent>
                </Select>
                <Alert>
                  <InfoIcon className="h-4 w-4" />

                  <AlertDescription className="text-xs">
                    Nouveau prix :{" "}
                    {formatCurrency(
                      subscription.price * (1 - parseInt(discountAmount) / 100),
                      locale
                    )}
                    /mois pendant 3 mois
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="sendEmail"
              checked={sendEmail}
              onCheckedChange={(checked) => setSendEmail(checked as boolean)}
            />

            <Label htmlFor="sendEmail">
              Envoyer email d'annulation au tenant
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={reason.length < 20 || isSubmitting}
          >
            {isSubmitting ? "Annulation..." : "Confirmer l'annulation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
