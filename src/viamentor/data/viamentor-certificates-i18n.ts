/**
 * VIAMENTOR - Certificates i18n
 * Traductions FR/DE/IT/EN pour système attestations
 */

export type CertificatesLocale = "fr" | "de" | "it" | "en";

export interface CertificatesTranslations {
  validation: {
    title: string;
    description: string;
    warning: {
      title: string;
      description: string;
    };
    stats: {
      present: string;
      absent: string;
      certificates: string;
      rate: string;
    };
    columns: {
      participant: string;
      attendance: string;
    };
    attendance: {
      present: string;
      absent: string;
    };
    options: {
      sendEmail: string;
      notifyInstructor: string;
    };
    actions: {
      confirm: string;
      cancel: string;
      validate: string;
    };
    toast: {
      success: string;
      error: string;
    };
  };
  history: {
    title: string;
    columns: {
      participant: string;
      generatedAt: string;
      emailStatus: string;
      tracking: string;
      actions: string;
    };
    emailStatus: {
      sent: string;
      failed: string;
      pending: string;
    };
    tracking: {
      delivered: string;
      opened: string;
      clicked: string;
    };
    actions: {
      download: string;
      resend: string;
      view: string;
    };
    toast: {
      downloaded: string;
      resent: string;
      resendError: string;
    };
    empty: string;
  };
  pdf: {
    title: string;
    certifies: string;
    hasFollowed: string;
    details: {
      date: string;
      location: string;
      instructor: string;
    };
    signature: {
      director: string;
    };
    footer: {
      certificateNumber: string;
      verifiable: string;
    };
  };
  email: {
    subject: string;
    greeting: string;
    body: {
      intro: string;
      details: string;
      footer: string;
      regards: string;
    };
    cta: string;
    contact: {
      title: string;
      text: string;
    };
  };
}

export const certificatesTranslations: Record<
  CertificatesLocale,
  CertificatesTranslations
> = {
  fr: {
    validation: {
      title: "Validation des présences",
      description: "Confirmez les présences pour générer les attestations",
      warning: {
        title: "Action définitive",
        description:
          "Cette action est définitive et génèrera automatiquement les attestations pour les participants présents.",
      },
      stats: {
        present: "Présents",
        absent: "Absents",
        certificates: "Attestations",
        rate: "Taux de présence",
      },
      columns: {
        participant: "Participant",
        attendance: "Présence",
      },
      attendance: {
        present: "Présent",
        absent: "Absent",
      },
      options: {
        sendEmail: "Envoyer les attestations par email automatiquement",
        notifyInstructor: "Notifier le moniteur",
      },
      actions: {
        confirm: "Confirmer la validation",
        cancel: "Annuler",
        validate: "Valider les présences",
      },
      toast: {
        success: "Présences validées et attestations générées avec succès",
        error: "Erreur lors de la validation des présences",
      },
    },
    history: {
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
    pdf: {
      title: "ATTESTATION DE PARTICIPATION",
      certifies: "Nous certifions que",
      hasFollowed: "a suivi avec succès",
      details: {
        date: "Date",
        location: "Lieu",
        instructor: "Animé par",
      },
      signature: {
        director: "Le Directeur",
      },
      footer: {
        certificateNumber: "Attestation N°",
        verifiable: "Vérifiable sur",
      },
    },
    email: {
      subject: "Votre attestation de participation",
      greeting: "Bonjour",
      body: {
        intro:
          "Nous avons le plaisir de vous transmettre votre attestation de participation.",
        details: "Vous avez suivi avec succès :",
        footer: "Si vous avez des questions, n'hésitez pas à nous contacter.",
        regards: "Cordialement",
      },
      cta: "Télécharger l'attestation",
      contact: {
        title: "Besoin d'aide ?",
        text: "Notre équipe est à votre disposition",
      },
    },
  },
  de: {
    validation: {
      title: "Anwesenheitsbestätigung",
      description:
        "Bestätigen Sie die Anwesenheit zur Erstellung der Bescheinigungen",
      warning: {
        title: "Endgültige Aktion",
        description:
          "Diese Aktion ist endgültig und erstellt automatisch Bescheinigungen für anwesende Teilnehmer.",
      },
      stats: {
        present: "Anwesend",
        absent: "Abwesend",
        certificates: "Bescheinigungen",
        rate: "Anwesenheitsrate",
      },
      columns: {
        participant: "Teilnehmer",
        attendance: "Anwesenheit",
      },
      attendance: {
        present: "Anwesend",
        absent: "Abwesend",
      },
      options: {
        sendEmail: "Bescheinigungen automatisch per E-Mail senden",
        notifyInstructor: "Fahrlehrer benachrichtigen",
      },
      actions: {
        confirm: "Bestätigung bestätigen",
        cancel: "Abbrechen",
        validate: "Anwesenheit bestätigen",
      },
      toast: {
        success:
          "Anwesenheit bestätigt und Bescheinigungen erfolgreich erstellt",
        error: "Fehler bei der Bestätigung der Anwesenheit",
      },
    },
    history: {
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
    pdf: {
      title: "TEILNAHMEBESCHEINIGUNG",
      certifies: "Wir bescheinigen, dass",
      hasFollowed: "erfolgreich teilgenommen hat an",
      details: {
        date: "Datum",
        location: "Ort",
        instructor: "Durchgeführt von",
      },
      signature: {
        director: "Der Direktor",
      },
      footer: {
        certificateNumber: "Bescheinigung Nr.",
        verifiable: "Überprüfbar auf",
      },
    },
    email: {
      subject: "Ihre Teilnahmebescheinigung",
      greeting: "Hallo",
      body: {
        intro:
          "Wir freuen uns, Ihnen Ihre Teilnahmebescheinigung zu übermitteln.",
        details: "Sie haben erfolgreich teilgenommen an:",
        footer: "Bei Fragen stehen wir Ihnen gerne zur Verfügung.",
        regards: "Mit freundlichen Grüßen",
      },
      cta: "Bescheinigung herunterladen",
      contact: {
        title: "Brauchen Sie Hilfe?",
        text: "Unser Team steht Ihnen zur Verfügung",
      },
    },
  },
  it: {
    validation: {
      title: "Convalida presenze",
      description: "Conferma le presenze per generare gli attestati",
      warning: {
        title: "Azione definitiva",
        description:
          "Questa azione è definitiva e genererà automaticamente gli attestati per i partecipanti presenti.",
      },
      stats: {
        present: "Presenti",
        absent: "Assenti",
        certificates: "Attestati",
        rate: "Tasso di presenza",
      },
      columns: {
        participant: "Partecipante",
        attendance: "Presenza",
      },
      attendance: {
        present: "Presente",
        absent: "Assente",
      },
      options: {
        sendEmail: "Inviare gli attestati via email automaticamente",
        notifyInstructor: "Notificare l'istruttore",
      },
      actions: {
        confirm: "Conferma convalida",
        cancel: "Annulla",
        validate: "Convalida presenze",
      },
      toast: {
        success: "Presenze convalidate e attestati generati con successo",
        error: "Errore durante la convalida delle presenze",
      },
    },
    history: {
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
    pdf: {
      title: "ATTESTATO DI PARTECIPAZIONE",
      certifies: "Certifichiamo che",
      hasFollowed: "ha seguito con successo",
      details: {
        date: "Data",
        location: "Luogo",
        instructor: "Condotto da",
      },
      signature: {
        director: "Il Direttore",
      },
      footer: {
        certificateNumber: "Attestato N°",
        verifiable: "Verificabile su",
      },
    },
    email: {
      subject: "Il vostro attestato di partecipazione",
      greeting: "Buongiorno",
      body: {
        intro:
          "Siamo lieti di trasmettervi il vostro attestato di partecipazione.",
        details: "Avete seguito con successo:",
        footer: "Per qualsiasi domanda, non esitate a contattarci.",
        regards: "Cordiali saluti",
      },
      cta: "Scarica l'attestato",
      contact: {
        title: "Bisogno di aiuto?",
        text: "Il nostro team è a vostra disposizione",
      },
    },
  },
  en: {
    validation: {
      title: "Attendance validation",
      description: "Confirm attendance to generate certificates",
      warning: {
        title: "Final action",
        description:
          "This action is final and will automatically generate certificates for present participants.",
      },
      stats: {
        present: "Present",
        absent: "Absent",
        certificates: "Certificates",
        rate: "Attendance rate",
      },
      columns: {
        participant: "Participant",
        attendance: "Attendance",
      },
      attendance: {
        present: "Present",
        absent: "Absent",
      },
      options: {
        sendEmail: "Send certificates by email automatically",
        notifyInstructor: "Notify instructor",
      },
      actions: {
        confirm: "Confirm validation",
        cancel: "Cancel",
        validate: "Validate attendance",
      },
      toast: {
        success: "Attendance validated and certificates generated successfully",
        error: "Error validating attendance",
      },
    },
    history: {
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
    pdf: {
      title: "CERTIFICATE OF ATTENDANCE",
      certifies: "We certify that",
      hasFollowed: "has successfully completed",
      details: {
        date: "Date",
        location: "Location",
        instructor: "Led by",
      },
      signature: {
        director: "The Director",
      },
      footer: {
        certificateNumber: "Certificate No.",
        verifiable: "Verifiable at",
      },
    },
    email: {
      subject: "Your certificate of attendance",
      greeting: "Hello",
      body: {
        intro: "We are pleased to send you your certificate of attendance.",
        details: "You have successfully completed:",
        footer:
          "If you have any questions, please don't hesitate to contact us.",
        regards: "Best regards",
      },
      cta: "Download certificate",
      contact: {
        title: "Need help?",
        text: "Our team is at your disposal",
      },
    },
  },
};
