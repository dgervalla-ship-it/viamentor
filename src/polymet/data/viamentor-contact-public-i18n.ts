/**
 * VIAMENTOR - Contact Public i18n
 * Traductions FR/DE/IT/EN pour formulaire contact public
 */

// ============================================================================
// TYPES
// ============================================================================

export type ContactPublicLocale = "fr" | "de" | "it" | "en";

export interface ContactPublicTranslations {
  // Page
  pageTitle: string;
  pageSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  // Form fields
  firstName: string;
  firstNamePlaceholder: string;
  lastName: string;
  lastNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  category: string;
  categoryPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  gdprConsent: string;
  gdprLink: string;

  // Categories
  categories: {
    carB: string;
    motoA: string;
    trailerBE: string;
    motoLightA1: string;
    professionalBPT: string;
    awarenessTraining: string;
    firstAid: string;
    other: string;
  };

  // Actions
  submit: string;
  submitting: string;
  cancel: string;

  // Validation
  required: string;
  invalidEmail: string;
  invalidPhone: string;
  tooShort: string;
  tooLong: string;
  invalidCharacters: string;
  emailExists: string;

  // Success
  successTitle: string;
  successMessage: string;
  successNextSteps: string;
  successTimeline: string;

  // Errors
  errorTitle: string;
  errorMessage: string;
  errorRetry: string;
  rateLimitError: string;
  spamDetected: string;

  // Character counter
  charactersRemaining: string;

  // Privacy
  privacyPolicyTitle: string;
  privacyPolicyContent: string;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const contactPublicTranslations: Record<
  ContactPublicLocale,
  ContactPublicTranslations
> = {
  fr: {
    pageTitle: "Contactez-nous",
    pageSubtitle: "Commencez votre formation de conduite aujourd'hui",
    metaTitle: "Contactez ViaMenutor - École de conduite en Suisse",
    metaDescription:
      "Contactez ViaMenutor pour votre formation de conduite. Permis B, A, BE et formations professionnelles. Réponse sous 24h.",
    metaKeywords:
      "contact auto-école, formation conduite suisse, permis conduire, ViaMenutor contact",

    firstName: "Prénom",
    firstNamePlaceholder: "Jean",
    lastName: "Nom",
    lastNamePlaceholder: "Dupont",
    email: "Email",
    emailPlaceholder: "jean.dupont@example.com",
    phone: "Téléphone",
    phonePlaceholder: "+41 79 123 45 67",
    category: "Catégorie d'intérêt",
    categoryPlaceholder: "Sélectionnez une catégorie",
    message: "Votre message (optionnel)",
    messagePlaceholder:
      "Ex: J'aimerais connaître vos tarifs, Quand puis-je commencer?, Avez-vous des disponibilités en soirée?",
    gdprConsent:
      "J'accepte la politique de confidentialité et le traitement de mes données personnelles conformément au RGPD et à la nLPD",
    gdprLink: "Politique de confidentialité",

    categories: {
      carB: "Permis B - Voiture",
      motoA: "Permis A - Moto",
      trailerBE: "Permis BE - Remorque",
      motoLightA1: "Permis A1 - Moto légère",
      professionalBPT: "Permis BPT - Transport professionnel",
      awarenessTraining: "Cours de sensibilisation",
      firstAid: "Premiers secours",
      other: "Autre formation",
    },

    submit: "Envoyer la demande",
    submitting: "Envoi en cours...",
    cancel: "Annuler",

    required: "Ce champ est requis",
    invalidEmail: "Email invalide",
    invalidPhone: "Numéro de téléphone invalide",
    tooShort: "Trop court",
    tooLong: "Trop long",
    invalidCharacters: "Caractères invalides",
    emailExists: "Cet email est déjà enregistré comme élève",

    successTitle: "Merci pour votre demande!",
    successMessage:
      "Votre demande a bien été reçue. Nous vous contacterons sous 24h ouvrables.",
    successNextSteps: "Prochaines étapes",
    successTimeline:
      "Nous vous contacterons sous 24h ouvrables pour discuter de votre formation",

    errorTitle: "Erreur",
    errorMessage:
      "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
    errorRetry: "Réessayer",
    rateLimitError:
      "Trop de demandes. Veuillez attendre avant de soumettre à nouveau.",
    spamDetected: "Activité suspecte détectée. Veuillez réessayer plus tard.",

    charactersRemaining: "caractères restants",

    privacyPolicyTitle: "Politique de confidentialité",
    privacyPolicyContent:
      "ViaMenutor s'engage à protéger vos données personnelles conformément au RGPD et à la nLPD suisse. Vos informations seront utilisées uniquement pour traiter votre demande de contact et vous proposer nos services de formation à la conduite. Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.",
  },

  de: {
    pageTitle: "Kontaktieren Sie uns",
    pageSubtitle: "Beginnen Sie heute Ihre Fahrausbildung",
    metaTitle: "Kontakt ViaMenutor - Fahrschule in der Schweiz",
    metaDescription:
      "Kontaktieren Sie ViaMenutor für Ihre Fahrausbildung. Führerschein B, A, BE und Berufsausbildungen. Antwort innerhalb von 24 Stunden.",
    metaKeywords:
      "Fahrschule Kontakt, Fahrausbildung Schweiz, Führerschein, ViaMenutor Kontakt",

    firstName: "Vorname",
    firstNamePlaceholder: "Hans",
    lastName: "Nachname",
    lastNamePlaceholder: "Müller",
    email: "E-Mail",
    emailPlaceholder: "hans.mueller@example.com",
    phone: "Telefon",
    phonePlaceholder: "+41 79 123 45 67",
    category: "Interessenkategorie",
    categoryPlaceholder: "Kategorie wählen",
    message: "Ihre Nachricht (optional)",
    messagePlaceholder:
      "Z.B.: Ich möchte Ihre Preise kennen, Wann kann ich anfangen?, Haben Sie abends Verfügbarkeit?",
    gdprConsent:
      "Ich akzeptiere die Datenschutzrichtlinie und die Verarbeitung meiner persönlichen Daten gemäß DSGVO und nDSG",
    gdprLink: "Datenschutzrichtlinie",

    categories: {
      carB: "Führerschein B - Auto",
      motoA: "Führerschein A - Motorrad",
      trailerBE: "Führerschein BE - Anhänger",
      motoLightA1: "Führerschein A1 - Leichtes Motorrad",
      professionalBPT: "Führerschein BPT - Berufstransport",
      awarenessTraining: "Sensibilisierungskurs",
      firstAid: "Erste Hilfe",
      other: "Andere Ausbildung",
    },

    submit: "Anfrage senden",
    submitting: "Wird gesendet...",
    cancel: "Abbrechen",

    required: "Dieses Feld ist erforderlich",
    invalidEmail: "Ungültige E-Mail",
    invalidPhone: "Ungültige Telefonnummer",
    tooShort: "Zu kurz",
    tooLong: "Zu lang",
    invalidCharacters: "Ungültige Zeichen",
    emailExists: "Diese E-Mail ist bereits als Schüler registriert",

    successTitle: "Vielen Dank für Ihre Anfrage!",
    successMessage:
      "Ihre Anfrage wurde erhalten. Wir werden Sie innerhalb von 24 Werktagen kontaktieren.",
    successNextSteps: "Nächste Schritte",
    successTimeline:
      "Wir werden Sie innerhalb von 24 Werktagen kontaktieren, um Ihre Ausbildung zu besprechen",

    errorTitle: "Fehler",
    errorMessage:
      "Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
    errorRetry: "Erneut versuchen",
    rateLimitError:
      "Zu viele Anfragen. Bitte warten Sie, bevor Sie erneut senden.",
    spamDetected:
      "Verdächtige Aktivität erkannt. Bitte versuchen Sie es später erneut.",

    charactersRemaining: "Zeichen übrig",

    privacyPolicyTitle: "Datenschutzrichtlinie",
    privacyPolicyContent:
      "ViaMenutor verpflichtet sich, Ihre persönlichen Daten gemäß DSGVO und Schweizer nDSG zu schützen. Ihre Informationen werden nur zur Bearbeitung Ihrer Kontaktanfrage und zum Angebot unserer Fahrausbildungsdienste verwendet. Sie haben das Recht auf Zugang, Berichtigung und Löschung Ihrer Daten.",
  },

  it: {
    pageTitle: "Contattaci",
    pageSubtitle: "Inizia oggi la tua formazione alla guida",
    metaTitle: "Contatta ViaMenutor - Scuola guida in Svizzera",
    metaDescription:
      "Contatta ViaMenutor per la tua formazione alla guida. Patente B, A, BE e formazioni professionali. Risposta entro 24 ore.",
    metaKeywords:
      "contatto scuola guida, formazione guida svizzera, patente, ViaMenutor contatto",

    firstName: "Nome",
    firstNamePlaceholder: "Marco",
    lastName: "Cognome",
    lastNamePlaceholder: "Rossi",
    email: "Email",
    emailPlaceholder: "marco.rossi@example.com",
    phone: "Telefono",
    phonePlaceholder: "+41 79 123 45 67",
    category: "Categoria di interesse",
    categoryPlaceholder: "Seleziona una categoria",
    message: "Il tuo messaggio (opzionale)",
    messagePlaceholder:
      "Es: Vorrei conoscere i vostri prezzi, Quando posso iniziare?, Avete disponibilità serali?",
    gdprConsent:
      "Accetto la politica sulla privacy e il trattamento dei miei dati personali in conformità al GDPR e alla nLPD",
    gdprLink: "Politica sulla privacy",

    categories: {
      carB: "Patente B - Auto",
      motoA: "Patente A - Moto",
      trailerBE: "Patente BE - Rimorchio",
      motoLightA1: "Patente A1 - Moto leggera",
      professionalBPT: "Patente BPT - Trasporto professionale",
      awarenessTraining: "Corso di sensibilizzazione",
      firstAid: "Primo soccorso",
      other: "Altra formazione",
    },

    submit: "Invia richiesta",
    submitting: "Invio in corso...",
    cancel: "Annulla",

    required: "Questo campo è obbligatorio",
    invalidEmail: "Email non valida",
    invalidPhone: "Numero di telefono non valido",
    tooShort: "Troppo corto",
    tooLong: "Troppo lungo",
    invalidCharacters: "Caratteri non validi",
    emailExists: "Questa email è già registrata come studente",

    successTitle: "Grazie per la tua richiesta!",
    successMessage:
      "La tua richiesta è stata ricevuta. Ti contatteremo entro 24 ore lavorative.",
    successNextSteps: "Prossimi passi",
    successTimeline:
      "Ti contatteremo entro 24 ore lavorative per discutere della tua formazione",

    errorTitle: "Errore",
    errorMessage:
      "Si è verificato un errore durante l'invio della tua richiesta. Riprova.",
    errorRetry: "Riprova",
    rateLimitError: "Troppe richieste. Attendi prima di inviare nuovamente.",
    spamDetected: "Attività sospetta rilevata. Riprova più tardi.",

    charactersRemaining: "caratteri rimanenti",

    privacyPolicyTitle: "Politica sulla privacy",
    privacyPolicyContent:
      "ViaMenutor si impegna a proteggere i tuoi dati personali in conformità al GDPR e alla nLPD svizzera. Le tue informazioni saranno utilizzate solo per elaborare la tua richiesta di contatto e offrirti i nostri servizi di formazione alla guida. Hai il diritto di accesso, rettifica e cancellazione dei tuoi dati.",
  },

  en: {
    pageTitle: "Contact Us",
    pageSubtitle: "Start your driving training today",
    metaTitle: "Contact ViaMenutor - Driving School in Switzerland",
    metaDescription:
      "Contact ViaMenutor for your driving training. License B, A, BE and professional training. Response within 24 hours.",
    metaKeywords:
      "driving school contact, driving training switzerland, driver's license, ViaMenutor contact",

    firstName: "First name",
    firstNamePlaceholder: "John",
    lastName: "Last name",
    lastNamePlaceholder: "Doe",
    email: "Email",
    emailPlaceholder: "john.doe@example.com",
    phone: "Phone",
    phonePlaceholder: "+41 79 123 45 67",
    category: "Category of interest",
    categoryPlaceholder: "Select a category",
    message: "Your message (optional)",
    messagePlaceholder:
      "E.g.: I would like to know your prices, When can I start?, Do you have evening availability?",
    gdprConsent:
      "I accept the privacy policy and the processing of my personal data in accordance with GDPR and nLPD",
    gdprLink: "Privacy policy",

    categories: {
      carB: "License B - Car",
      motoA: "License A - Motorcycle",
      trailerBE: "License BE - Trailer",
      motoLightA1: "License A1 - Light motorcycle",
      professionalBPT: "License BPT - Professional transport",
      awarenessTraining: "Awareness training",
      firstAid: "First aid",
      other: "Other training",
    },

    submit: "Send request",
    submitting: "Sending...",
    cancel: "Cancel",

    required: "This field is required",
    invalidEmail: "Invalid email",
    invalidPhone: "Invalid phone number",
    tooShort: "Too short",
    tooLong: "Too long",
    invalidCharacters: "Invalid characters",
    emailExists: "This email is already registered as a student",

    successTitle: "Thank you for your request!",
    successMessage:
      "Your request has been received. We will contact you within 24 business hours.",
    successNextSteps: "Next steps",
    successTimeline:
      "We will contact you within 24 business hours to discuss your training",

    errorTitle: "Error",
    errorMessage:
      "An error occurred while sending your request. Please try again.",
    errorRetry: "Try again",
    rateLimitError: "Too many requests. Please wait before submitting again.",
    spamDetected: "Suspicious activity detected. Please try again later.",

    charactersRemaining: "characters remaining",

    privacyPolicyTitle: "Privacy Policy",
    privacyPolicyContent:
      "ViaMenutor is committed to protecting your personal data in accordance with GDPR and Swiss nLPD. Your information will be used only to process your contact request and offer you our driving training services. You have the right to access, rectify and delete your data.",
  },
};
