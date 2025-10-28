/**
 * VIAMENTOR - Certificates History Table
 * Table historique attestations générées avec tracking et actions
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DownloadIcon,
  MailIcon,
  MoreVerticalIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
} from "lucide-react";
import { toast } from "sonner";

// ============================================================================
// TYPES
// ============================================================================

interface Certificate {
  id: string;
  participantName: string;
  generatedAt: string;
  emailStatus: "sent" | "failed" | "pending";
  emailDelivered?: boolean;
  emailOpened?: boolean;
  emailClicked?: boolean;
  pdfUrl: string;
  filename: string;
}

interface CertificatesHistoryTableProps {
  sessionId: string;
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    title: "Attestations générées",
    columns: {
      participant: "Participant",
      generatedAt: "Date génération",
      emailStatus: "Statut email",
      tracking: "Suivi",
      actions: "Actions",
    },
    emailStatus: {
      sent: "Envoyée",
      failed: "Échec",
      pending: "En attente",
    },
    tracking: {
      delivered: "Délivrée",
      opened: "Ouverte",
      clicked: "Cliquée",
    },
    actions: {
      download: "Télécharger",
      resend: "Renvoyer",
      view: "Voir",
    },
    toast: {
      downloaded: "Attestation téléchargée",
      resent: "Email renvoyé avec succès",
      resendError: "Erreur lors du renvoi",
    },
    empty: "Aucune attestation générée pour cette séance",
  },
  de: {
    title: "Generierte Bescheinigungen",
    columns: {
      participant: "Teilnehmer",
      generatedAt: "Erstellungsdatum",
      emailStatus: "E-Mail-Status",
      tracking: "Verfolgung",
      actions: "Aktionen",
    },
    emailStatus: {
      sent: "Gesendet",
      failed: "Fehlgeschlagen",
      pending: "Ausstehend",
    },
    tracking: {
      delivered: "Zugestellt",
      opened: "Geöffnet",
      clicked: "Geklickt",
    },
    actions: {
      download: "Herunterladen",
      resend: "Erneut senden",
      view: "Ansehen",
    },
    toast: {
      downloaded: "Bescheinigung heruntergeladen",
      resent: "E-Mail erfolgreich erneut gesendet",
      resendError: "Fehler beim erneuten Senden",
    },
    empty: "Keine Bescheinigungen für diese Sitzung erstellt",
  },
  it: {
    title: "Attestati generati",
    columns: {
      participant: "Partecipante",
      generatedAt: "Data generazione",
      emailStatus: "Stato email",
      tracking: "Tracciamento",
      actions: "Azioni",
    },
    emailStatus: {
      sent: "Inviata",
      failed: "Fallito",
      pending: "In attesa",
    },
    tracking: {
      delivered: "Consegnata",
      opened: "Aperta",
      clicked: "Cliccata",
    },
    actions: {
      download: "Scarica",
      resend: "Reinvia",
      view: "Visualizza",
    },
    toast: {
      downloaded: "Attestato scaricato",
      resent: "Email reinviata con successo",
      resendError: "Errore durante il reinvio",
    },
    empty: "Nessun attestato generato per questa sessione",
  },
  en: {
    title: "Generated certificates",
    columns: {
      participant: "Participant",
      generatedAt: "Generation date",
      emailStatus: "Email status",
      tracking: "Tracking",
      actions: "Actions",
    },
    emailStatus: {
      sent: "Sent",
      failed: "Failed",
      pending: "Pending",
    },
    tracking: {
      delivered: "Delivered",
      opened: "Opened",
      clicked: "Clicked",
    },
    actions: {
      download: "Download",
      resend: "Resend",
      view: "View",
    },
    toast: {
      downloaded: "Certificate downloaded",
      resent: "Email resent successfully",
      resendError: "Error resending email",
    },
    empty: "No certificates generated for this session",
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockCertificates: Certificate[] = [
  {
    id: "cert-1",
    participantName: "Sophie Martin",
    generatedAt: "05.10.2025 20:35",
    emailStatus: "sent",
    emailDelivered: true,
    emailOpened: true,
    emailClicked: true,
    pdfUrl: "https://storage.example.com/cert-1.pdf",
    filename: "Attestation_Martin_Sophie_05-10-2025.pdf",
  },
  {
    id: "cert-2",
    participantName: "Lucas Dubois",
    generatedAt: "05.10.2025 20:35",
    emailStatus: "sent",
    emailDelivered: true,
    emailOpened: false,
    pdfUrl: "https://storage.example.com/cert-2.pdf",
    filename: "Attestation_Dubois_Lucas_05-10-2025.pdf",
  },
  {
    id: "cert-3",
    participantName: "Thomas Bernard",
    generatedAt: "05.10.2025 20:35",
    emailStatus: "failed",
    pdfUrl: "https://storage.example.com/cert-3.pdf",
    filename: "Attestation_Bernard_Thomas_05-10-2025.pdf",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function CertificatesHistoryTable({
  sessionId,
  locale = "fr",
}: CertificatesHistoryTableProps) {
  const t = translations[locale];
  const [certificates] = useState(mockCertificates);

  const getEmailStatusBadge = (status: Certificate["emailStatus"]) => {
    const variants = {
      sent: {
        variant: "default" as const,
        label: t.emailStatus.sent,
        className: "bg-green-500",
        icon: CheckCircle2Icon,
      },
      failed: {
        variant: "destructive" as const,
        label: t.emailStatus.failed,
        icon: XCircleIcon,
      },
      pending: {
        variant: "secondary" as const,
        label: t.emailStatus.pending,
        icon: ClockIcon,
      },
    };
    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="h-3 w-3 mr-1" />

        {config.label}
      </Badge>
    );
  };

  const handleDownload = (cert: Certificate) => {
    // Simulation téléchargement
    window.open(cert.pdfUrl, "_blank");
    toast.success(t.toast.downloaded);
  };

  const handleResend = async (cert: Certificate) => {
    try {
      // Simulation renvoi
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(t.toast.resent);
    } catch (error) {
      toast.error(t.toast.resendError);
    }
  };

  if (certificates.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">{t.empty}</div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">{t.title}</h4>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.columns.participant}</TableHead>
              <TableHead>{t.columns.generatedAt}</TableHead>
              <TableHead>{t.columns.emailStatus}</TableHead>
              <TableHead>{t.columns.tracking}</TableHead>
              <TableHead className="w-[50px]">{t.columns.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">
                  {cert.participantName}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {cert.generatedAt}
                </TableCell>
                <TableCell>{getEmailStatusBadge(cert.emailStatus)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {cert.emailDelivered && (
                      <Badge variant="outline" className="text-xs">
                        {t.tracking.delivered}
                      </Badge>
                    )}
                    {cert.emailOpened && (
                      <Badge variant="outline" className="text-xs">
                        {t.tracking.opened}
                      </Badge>
                    )}
                    {cert.emailClicked && (
                      <Badge variant="outline" className="text-xs">
                        {t.tracking.clicked}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownload(cert)}>
                        <DownloadIcon className="h-4 w-4 mr-2" />

                        {t.actions.download}
                      </DropdownMenuItem>
                      {cert.emailStatus === "failed" && (
                        <DropdownMenuItem onClick={() => handleResend(cert)}>
                          <MailIcon className="h-4 w-4 mr-2" />

                          {t.actions.resend}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleDownload(cert)}>
                        <EyeIcon className="h-4 w-4 mr-2" />

                        {t.actions.view}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
