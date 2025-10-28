/**
 * VIAMENTOR - Reviews Verification i18n
 * Traductions FR/DE/IT/EN pour vérification authenticité avis
 */

// ============================================================================
// TYPES
// ============================================================================

export type ReviewsVerificationLocale = "fr" | "de" | "it" | "en";

export interface ReviewsVerificationTranslations {
  page: {
    breadcrumb: string;
    title: string;
  };
  stats: {
    verified: string;
    unverified: string;
    contested: string;
    fraudulent: string;
    percentage: string;
  };
  status: {
    verified: string;
    unverified: string;
    contested: string;
    fraudulent: string;
    pending: string;
  };
  matching: {
    title: string;
    autoToggle: string;
    autoEnabled: string;
    autoDisabled: string;
    noMatch: string;
    multipleMatches: string;
    selectCandidate: string;
    confirmMatch: string;
    similarity: string;
    lastLesson: string;
  };
  payment: {
    title: string;
    totalPaid: string;
    lastTransaction: string;
    verified: string;
    noPayment: string;
    actions: {
      hide: string;
      contact: string;
      markFraud: string;
    };
  };
  fraud: {
    title: string;
    score: string;
    factors: {
      multiple_ip: string;
      similar_wording: string;
      fake_name: string;
      extreme_rating: string;
      suspicious_timing: string;
      new_account: string;
      review_velocity: string;
    };
    severity: {
      low: string;
      medium: string;
      high: string;
    };
    recommendation: {
      approve: string;
      investigate: string;
      flag: string;
    };
  };
  contest: {
    title: string;
    button: string;
    reasons: {
      fake_competitor: string;
      spam_bot: string;
      inappropriate: string;
      not_customer: string;
      defamation: string;
      violation_terms: string;
    };
    steps: {
      reason: string;
      evidence: string;
      explanation: string;
      review: string;
    };
    status: {
      pending: string;
      accepted: string;
      rejected: string;
      partial: string;
    };
    submit: string;
  };
  audit: {
    title: string;
    actions: {
      received: string;
      matched: string;
      verified: string;
      responded: string;
      flagged: string;
      contested: string;
      resolved: string;
    };
    export: string;
  };
  common: {
    loading: string;
    error: string;
    save: string;
    cancel: string;
    confirm: string;
    delete: string;
    edit: string;
    view: string;
    upload: string;
    download: string;
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const reviewsVerificationTranslations: Record<
  ReviewsVerificationLocale,
  ReviewsVerificationTranslations
> = {
  fr: {
    page: {
      breadcrumb: "Avis / Vérification",
      title: "Valider authenticité avis",
    },
    stats: {
      verified: "Avis vérifiés",
      unverified: "Non-vérifiés",
      contested: "Contestés",
      fraudulent: "Frauduleux détectés",
      percentage: "Taux vérification",
    },
    status: {
      verified: "Vérifié",
      unverified: "Non-vérifié",
      contested: "Contesté",
      fraudulent: "Frauduleux",
      pending: "En attente",
    },
    matching: {
      title: "Identification auteurs avis",
      autoToggle: "Matching automatique élèves",
      autoEnabled: "Matching auto activé",
      autoDisabled: "Matching auto désactivé",
      noMatch: "Non-identifié",
      multipleMatches: "Plusieurs élèves correspondent à cet avis",
      selectCandidate: "Sélectionnez le bon élève",
      confirmMatch: "Confirmer match",
      similarity: "Similarité",
      lastLesson: "Dernière leçon",
    },
    payment: {
      title: "Vérification achat",
      totalPaid: "Total payé",
      lastTransaction: "Dernière transaction",
      verified: "Achat vérifié",
      noPayment: "Aucun paiement",
      actions: {
        hide: "Masquer avis",
        contact: "Contacter élève",
        markFraud: "Marquer frauduleux",
      },
    },
    fraud: {
      title: "Analyse patterns frauduleux",
      score: "Score fraude",
      factors: {
        multiple_ip: "Multiples avis même IP",
        similar_wording: "Formulations similaires",
        fake_name: "Nom suspect",
        extreme_rating: "Note extrême",
        suspicious_timing: "Horaire suspect",
        new_account: "Compte récent",
        review_velocity: "Pic anormal d'avis",
      },
      severity: {
        low: "Faible",
        medium: "Moyen",
        high: "Élevé",
      },
      recommendation: {
        approve: "Approuver",
        investigate: "Investiguer",
        flag: "Signaler",
      },
    },
    contest: {
      title: "Contester avis frauduleux",
      button: "Contester Google",
      reasons: {
        fake_competitor: "Faux avis concurrent",
        spam_bot: "Spam bot",
        inappropriate: "Contenu inapproprié",
        not_customer: "Pas client",
        defamation: "Diffamation",
        violation_terms: "Violation CGU Google",
      },
      steps: {
        reason: "Raison contestation",
        evidence: "Preuves",
        explanation: "Explication détaillée",
        review: "Vérification",
      },
      status: {
        pending: "En attente Google",
        accepted: "Accepté - Supprimé",
        rejected: "Rejeté - Maintenu",
        partial: "Partiel - Avertissement",
      },
      submit: "Soumettre contestation",
    },
    audit: {
      title: "Journal audit",
      actions: {
        received: "Avis reçu",
        matched: "Élève identifié",
        verified: "Paiement vérifié",
        responded: "Réponse publiée",
        flagged: "Marqué frauduleux",
        contested: "Contesté",
        resolved: "Résolu",
      },
      export: "Exporter CSV",
    },
    common: {
      loading: "Chargement...",
      error: "Erreur",
      save: "Enregistrer",
      cancel: "Annuler",
      confirm: "Confirmer",
      delete: "Supprimer",
      edit: "Modifier",
      view: "Voir",
      upload: "Télécharger",
      download: "Télécharger",
    },
  },

  de: {
    page: {
      breadcrumb: "Bewertungen / Verifizierung",
      title: "Authentizität validieren",
    },
    stats: {
      verified: "Verifizierte Bewertungen",
      unverified: "Nicht verifiziert",
      contested: "Angefochten",
      fraudulent: "Betrügerisch erkannt",
      percentage: "Verifizierungsrate",
    },
    status: {
      verified: "Verifiziert",
      unverified: "Nicht verifiziert",
      contested: "Angefochten",
      fraudulent: "Betrügerisch",
      pending: "Ausstehend",
    },
    matching: {
      title: "Identifikation Bewertungsautoren",
      autoToggle: "Automatisches Schüler-Matching",
      autoEnabled: "Auto-Matching aktiviert",
      autoDisabled: "Auto-Matching deaktiviert",
      noMatch: "Nicht identifiziert",
      multipleMatches: "Mehrere Schüler entsprechen dieser Bewertung",
      selectCandidate: "Wählen Sie den richtigen Schüler",
      confirmMatch: "Match bestätigen",
      similarity: "Ähnlichkeit",
      lastLesson: "Letzte Lektion",
    },
    payment: {
      title: "Kaufverifizierung",
      totalPaid: "Gesamt bezahlt",
      lastTransaction: "Letzte Transaktion",
      verified: "Kauf verifiziert",
      noPayment: "Keine Zahlung",
      actions: {
        hide: "Bewertung ausblenden",
        contact: "Schüler kontaktieren",
        markFraud: "Als Betrug markieren",
      },
    },
    fraud: {
      title: "Betrugsmuster-Analyse",
      score: "Betrugs-Score",
      factors: {
        multiple_ip: "Mehrere Bewertungen gleiche IP",
        similar_wording: "Ähnliche Formulierungen",
        fake_name: "Verdächtiger Name",
        extreme_rating: "Extreme Bewertung",
        suspicious_timing: "Verdächtige Uhrzeit",
        new_account: "Neues Konto",
        review_velocity: "Abnormaler Bewertungs-Peak",
      },
      severity: {
        low: "Niedrig",
        medium: "Mittel",
        high: "Hoch",
      },
      recommendation: {
        approve: "Genehmigen",
        investigate: "Untersuchen",
        flag: "Melden",
      },
    },
    contest: {
      title: "Betrügerische Bewertung anfechten",
      button: "Bei Google anfechten",
      reasons: {
        fake_competitor: "Gefälschte Konkurrenz-Bewertung",
        spam_bot: "Spam-Bot",
        inappropriate: "Unangemessener Inhalt",
        not_customer: "Kein Kunde",
        defamation: "Verleumdung",
        violation_terms: "Verstoß Google-AGB",
      },
      steps: {
        reason: "Anfechtungsgrund",
        evidence: "Beweise",
        explanation: "Detaillierte Erklärung",
        review: "Überprüfung",
      },
      status: {
        pending: "Google ausstehend",
        accepted: "Akzeptiert - Entfernt",
        rejected: "Abgelehnt - Beibehalten",
        partial: "Teilweise - Warnung",
      },
      submit: "Anfechtung einreichen",
    },
    audit: {
      title: "Audit-Protokoll",
      actions: {
        received: "Bewertung erhalten",
        matched: "Schüler identifiziert",
        verified: "Zahlung verifiziert",
        responded: "Antwort veröffentlicht",
        flagged: "Als Betrug markiert",
        contested: "Angefochten",
        resolved: "Gelöst",
      },
      export: "CSV exportieren",
    },
    common: {
      loading: "Laden...",
      error: "Fehler",
      save: "Speichern",
      cancel: "Abbrechen",
      confirm: "Bestätigen",
      delete: "Löschen",
      edit: "Bearbeiten",
      view: "Ansehen",
      upload: "Hochladen",
      download: "Herunterladen",
    },
  },

  it: {
    page: {
      breadcrumb: "Recensioni / Verifica",
      title: "Validare autenticità recensioni",
    },
    stats: {
      verified: "Recensioni verificate",
      unverified: "Non verificate",
      contested: "Contestate",
      fraudulent: "Fraudolente rilevate",
      percentage: "Tasso verifica",
    },
    status: {
      verified: "Verificato",
      unverified: "Non verificato",
      contested: "Contestato",
      fraudulent: "Fraudolento",
      pending: "In attesa",
    },
    matching: {
      title: "Identificazione autori recensioni",
      autoToggle: "Matching automatico studenti",
      autoEnabled: "Matching auto attivato",
      autoDisabled: "Matching auto disattivato",
      noMatch: "Non identificato",
      multipleMatches: "Più studenti corrispondono a questa recensione",
      selectCandidate: "Seleziona lo studente corretto",
      confirmMatch: "Conferma match",
      similarity: "Somiglianza",
      lastLesson: "Ultima lezione",
    },
    payment: {
      title: "Verifica acquisto",
      totalPaid: "Totale pagato",
      lastTransaction: "Ultima transazione",
      verified: "Acquisto verificato",
      noPayment: "Nessun pagamento",
      actions: {
        hide: "Nascondere recensione",
        contact: "Contattare studente",
        markFraud: "Segnare fraudolento",
      },
    },
    fraud: {
      title: "Analisi pattern fraudolenti",
      score: "Punteggio frode",
      factors: {
        multiple_ip: "Più recensioni stesso IP",
        similar_wording: "Formulazioni simili",
        fake_name: "Nome sospetto",
        extreme_rating: "Valutazione estrema",
        suspicious_timing: "Orario sospetto",
        new_account: "Account recente",
        review_velocity: "Picco anomalo recensioni",
      },
      severity: {
        low: "Basso",
        medium: "Medio",
        high: "Alto",
      },
      recommendation: {
        approve: "Approvare",
        investigate: "Investigare",
        flag: "Segnalare",
      },
    },
    contest: {
      title: "Contestare recensione fraudolenta",
      button: "Contestare Google",
      reasons: {
        fake_competitor: "Falsa recensione concorrente",
        spam_bot: "Spam bot",
        inappropriate: "Contenuto inappropriato",
        not_customer: "Non cliente",
        defamation: "Diffamazione",
        violation_terms: "Violazione termini Google",
      },
      steps: {
        reason: "Motivo contestazione",
        evidence: "Prove",
        explanation: "Spiegazione dettagliata",
        review: "Verifica",
      },
      status: {
        pending: "In attesa Google",
        accepted: "Accettato - Rimosso",
        rejected: "Rifiutato - Mantenuto",
        partial: "Parziale - Avviso",
      },
      submit: "Inviare contestazione",
    },
    audit: {
      title: "Registro audit",
      actions: {
        received: "Recensione ricevuta",
        matched: "Studente identificato",
        verified: "Pagamento verificato",
        responded: "Risposta pubblicata",
        flagged: "Segnato fraudolento",
        contested: "Contestato",
        resolved: "Risolto",
      },
      export: "Esportare CSV",
    },
    common: {
      loading: "Caricamento...",
      error: "Errore",
      save: "Salvare",
      cancel: "Annullare",
      confirm: "Confermare",
      delete: "Eliminare",
      edit: "Modificare",
      view: "Visualizzare",
      upload: "Caricare",
      download: "Scaricare",
    },
  },

  en: {
    page: {
      breadcrumb: "Reviews / Verification",
      title: "Validate review authenticity",
    },
    stats: {
      verified: "Verified reviews",
      unverified: "Unverified",
      contested: "Contested",
      fraudulent: "Fraudulent detected",
      percentage: "Verification rate",
    },
    status: {
      verified: "Verified",
      unverified: "Unverified",
      contested: "Contested",
      fraudulent: "Fraudulent",
      pending: "Pending",
    },
    matching: {
      title: "Review author identification",
      autoToggle: "Automatic student matching",
      autoEnabled: "Auto-matching enabled",
      autoDisabled: "Auto-matching disabled",
      noMatch: "Not identified",
      multipleMatches: "Multiple students match this review",
      selectCandidate: "Select correct student",
      confirmMatch: "Confirm match",
      similarity: "Similarity",
      lastLesson: "Last lesson",
    },
    payment: {
      title: "Purchase verification",
      totalPaid: "Total paid",
      lastTransaction: "Last transaction",
      verified: "Purchase verified",
      noPayment: "No payment",
      actions: {
        hide: "Hide review",
        contact: "Contact student",
        markFraud: "Mark fraudulent",
      },
    },
    fraud: {
      title: "Fraudulent pattern analysis",
      score: "Fraud score",
      factors: {
        multiple_ip: "Multiple reviews same IP",
        similar_wording: "Similar wording",
        fake_name: "Suspicious name",
        extreme_rating: "Extreme rating",
        suspicious_timing: "Suspicious timing",
        new_account: "New account",
        review_velocity: "Abnormal review spike",
      },
      severity: {
        low: "Low",
        medium: "Medium",
        high: "High",
      },
      recommendation: {
        approve: "Approve",
        investigate: "Investigate",
        flag: "Flag",
      },
    },
    contest: {
      title: "Contest fraudulent review",
      button: "Contest Google",
      reasons: {
        fake_competitor: "Fake competitor review",
        spam_bot: "Spam bot",
        inappropriate: "Inappropriate content",
        not_customer: "Not customer",
        defamation: "Defamation",
        violation_terms: "Google terms violation",
      },
      steps: {
        reason: "Contest reason",
        evidence: "Evidence",
        explanation: "Detailed explanation",
        review: "Review",
      },
      status: {
        pending: "Google pending",
        accepted: "Accepted - Removed",
        rejected: "Rejected - Kept",
        partial: "Partial - Warning",
      },
      submit: "Submit contest",
    },
    audit: {
      title: "Audit log",
      actions: {
        received: "Review received",
        matched: "Student identified",
        verified: "Payment verified",
        responded: "Response published",
        flagged: "Flagged fraudulent",
        contested: "Contested",
        resolved: "Resolved",
      },
      export: "Export CSV",
    },
    common: {
      loading: "Loading...",
      error: "Error",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      upload: "Upload",
      download: "Download",
    },
  },
};
