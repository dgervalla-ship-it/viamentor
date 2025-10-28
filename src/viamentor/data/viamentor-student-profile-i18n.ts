/**
 * VIAMENTOR - Student Profile i18n
 * Traductions FR/DE/IT/EN pour profil élève
 */

export type ProfileLocale = "fr" | "de" | "it" | "en";

export const profileTranslations = {
  fr: {
    title: "Mon profil",
    personalInfo: {
      title: "Informations personnelles",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone",
      save: "Enregistrer",
    },
    legalDocuments: {
      title: "Documents légaux",
      addDocument: "Ajouter un document",
      valid: "Valide",
      expired: "Expiré",
    },
    trainingHistory: {
      title: "Mon parcours de formation",
      enrollmentDate: "Date d'inscription",
    },
    preferences: {
      title: "Préférences",
      notifications: "Notifications",
      save: "Enregistrer",
    },
    security: {
      title: "Sécurité du compte",
      changePassword: "Changer le mot de passe",
    },
    schoolInfo: { title: "Mon auto-école", myInstructor: "Mon moniteur" },
    support: {
      title: "Aide & Support",
      contactSupport: "Contacter le support",
    },
    logout: { button: "Se déconnecter" },
  },
  de: {
    title: "Mein Profil",
    personalInfo: {
      title: "Persönliche Informationen",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      phone: "Telefon",
      save: "Speichern",
    },
    legalDocuments: {
      title: "Rechtliche Dokumente",
      addDocument: "Dokument hinzufügen",
      valid: "Gültig",
      expired: "Abgelaufen",
    },
    trainingHistory: {
      title: "Mein Ausbildungsweg",
      enrollmentDate: "Anmeldedatum",
    },
    preferences: {
      title: "Einstellungen",
      notifications: "Benachrichtigungen",
      save: "Speichern",
    },
    security: { title: "Kontosicherheit", changePassword: "Passwort ändern" },
    schoolInfo: { title: "Meine Fahrschule", myInstructor: "Mein Fahrlehrer" },
    support: {
      title: "Hilfe & Support",
      contactSupport: "Support kontaktieren",
    },
    logout: { button: "Abmelden" },
  },
  it: {
    title: "Il mio profilo",
    personalInfo: {
      title: "Informazioni personali",
      firstName: "Nome",
      lastName: "Cognome",
      email: "Email",
      phone: "Telefono",
      save: "Salva",
    },
    legalDocuments: {
      title: "Documenti legali",
      addDocument: "Aggiungi documento",
      valid: "Valido",
      expired: "Scaduto",
    },
    trainingHistory: {
      title: "Il mio percorso formativo",
      enrollmentDate: "Data iscrizione",
    },
    preferences: {
      title: "Preferenze",
      notifications: "Notifiche",
      save: "Salva",
    },
    security: { title: "Sicurezza account", changePassword: "Cambia password" },
    schoolInfo: {
      title: "La mia scuola guida",
      myInstructor: "Il mio istruttore",
    },
    support: { title: "Aiuto & Supporto", contactSupport: "Contatta supporto" },
    logout: { button: "Disconnetti" },
  },
  en: {
    title: "My Profile",
    personalInfo: {
      title: "Personal Information",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      save: "Save",
    },
    legalDocuments: {
      title: "Legal Documents",
      addDocument: "Add document",
      valid: "Valid",
      expired: "Expired",
    },
    trainingHistory: {
      title: "My Training Journey",
      enrollmentDate: "Enrollment date",
    },
    preferences: {
      title: "Preferences",
      notifications: "Notifications",
      save: "Save",
    },
    security: { title: "Account Security", changePassword: "Change password" },
    schoolInfo: { title: "My Driving School", myInstructor: "My Instructor" },
    support: { title: "Help & Support", contactSupport: "Contact support" },
    logout: { button: "Logout" },
  },
};

export function getProfileTranslations(locale: ProfileLocale = "fr") {
  return profileTranslations[locale];
}
