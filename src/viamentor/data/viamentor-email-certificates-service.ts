/**
 * VIAMENTOR - Email Certificates Service
 * Service envoi emails attestations avec templates professionnels
 */

// ============================================================================
// TYPES
// ============================================================================

export interface EmailCertificateData {
  // Recipient
  to: string;
  firstName: string;
  lastName: string;

  // Certificate
  certificateUrl: string;
  certificateFilename: string;

  // Course
  courseType: string;
  courseCategory: string;
  coursePart: string;
  date: string;

  // School
  schoolName: string;
  schoolEmail: string;
  schoolPhone: string;
  schoolWebsite: string;

  // Locale
  locale?: "fr" | "de" | "it" | "en";
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// ============================================================================
// I18N TEMPLATES
// ============================================================================

const emailTemplates = {
  fr: {
    subject: (data: EmailCertificateData) =>
      `Votre attestation de participation - ${data.courseCategory}`,
    greeting: (firstName: string) => `Bonjour ${firstName},`,
    body: {
      intro:
        "Nous avons le plaisir de vous transmettre votre attestation de participation.",
      details: "Vous avez suivi avec succès :",
      footer: "Si vous avez des questions, n'hésitez pas à nous contacter.",
      regards: "Cordialement,",
    },
    cta: "Télécharger l'attestation",
    contact: {
      title: "Besoin d'aide ?",
      text: "Notre équipe est à votre disposition",
    },
  },
  de: {
    subject: (data: EmailCertificateData) =>
      `Ihre Teilnahmebescheinigung - ${data.courseCategory}`,
    greeting: (firstName: string) => `Hallo ${firstName},`,
    body: {
      intro:
        "Wir freuen uns, Ihnen Ihre Teilnahmebescheinigung zu übermitteln.",
      details: "Sie haben erfolgreich teilgenommen an:",
      footer: "Bei Fragen stehen wir Ihnen gerne zur Verfügung.",
      regards: "Mit freundlichen Grüßen,",
    },
    cta: "Bescheinigung herunterladen",
    contact: {
      title: "Brauchen Sie Hilfe?",
      text: "Unser Team steht Ihnen zur Verfügung",
    },
  },
  it: {
    subject: (data: EmailCertificateData) =>
      `Il vostro attestato di partecipazione - ${data.courseCategory}`,
    greeting: (firstName: string) => `Buongiorno ${firstName},`,
    body: {
      intro:
        "Siamo lieti di trasmettervi il vostro attestato di partecipazione.",
      details: "Avete seguito con successo:",
      footer: "Per qualsiasi domanda, non esitate a contattarci.",
      regards: "Cordiali saluti,",
    },
    cta: "Scarica l'attestato",
    contact: {
      title: "Bisogno di aiuto?",
      text: "Il nostro team è a vostra disposizione",
    },
  },
  en: {
    subject: (data: EmailCertificateData) =>
      `Your certificate of attendance - ${data.courseCategory}`,
    greeting: (firstName: string) => `Hello ${firstName},`,
    body: {
      intro: "We are pleased to send you your certificate of attendance.",
      details: "You have successfully completed:",
      footer: "If you have any questions, please don't hesitate to contact us.",
      regards: "Best regards,",
    },
    cta: "Download certificate",
    contact: {
      title: "Need help?",
      text: "Our team is at your disposal",
    },
  },
};

// ============================================================================
// HTML TEMPLATE GENERATOR
// ============================================================================

function generateEmailHTML(data: EmailCertificateData): string {
  const locale = data.locale || "fr";
  const t = emailTemplates[locale];

  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.subject(data)}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #1a1a1a;
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 32px 24px;
    }
    .greeting {
      font-size: 16px;
      color: #1a1a1a;
      margin-bottom: 16px;
    }
    .intro {
      font-size: 14px;
      color: #525252;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .details-box {
      background-color: #f5f5f5;
      border-left: 4px solid #1a1a1a;
      padding: 16px;
      margin: 24px 0;
    }
    .details-title {
      font-size: 14px;
      color: #525252;
      margin-bottom: 12px;
    }
    .details-item {
      font-size: 16px;
      color: #1a1a1a;
      font-weight: 600;
      margin: 8px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #1a1a1a;
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      margin: 24px 0;
    }
    .footer-text {
      font-size: 14px;
      color: #525252;
      line-height: 1.6;
      margin: 24px 0;
    }
    .contact-box {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin: 24px 0;
      text-align: center;
    }
    .contact-title {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }
    .contact-text {
      font-size: 14px;
      color: #525252;
      margin-bottom: 12px;
    }
    .contact-info {
      font-size: 14px;
      color: #1a1a1a;
      margin: 4px 0;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #737373;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${data.schoolName}</h1>
    </div>
    
    <div class="content">
      <div class="greeting">${t.greeting(data.firstName)}</div>
      
      <div class="intro">${t.body.intro}</div>
      
      <div class="details-box">
        <div class="details-title">${t.body.details}</div>
        <div class="details-item">${data.coursePart} - ${data.courseType}</div>
        <div class="details-item">${data.courseCategory}</div>
        <div class="details-item">${data.date}</div>
      </div>
      
      <center>
        <a href="${data.certificateUrl}" class="cta-button">${t.cta}</a>
      </center>
      
      <div class="footer-text">${t.body.footer}</div>
      
      <div class="contact-box">
        <div class="contact-title">${t.contact.title}</div>
        <div class="contact-text">${t.contact.text}</div>
        <div class="contact-info">📧 ${data.schoolEmail}</div>
        <div class="contact-info">📞 ${data.schoolPhone}</div>
        <div class="contact-info">🌐 ${data.schoolWebsite}</div>
      </div>
      
      <div class="footer-text">
        ${t.body.regards}<br>
        <strong>${data.schoolName}</strong>
      </div>
    </div>
    
    <div class="footer">
      © ${new Date().getFullYear()} ${data.schoolName}. Tous droits réservés.
    </div>
  </div>
</body>
</html>
  `.trim();
}

// ============================================================================
// EMAIL SENDING SERVICE
// ============================================================================

/**
 * Envoie un email avec l'attestation
 * Note: Nécessite configuration Resend/SendGrid dans le projet réel
 */
export async function sendCertificateEmail(
  data: EmailCertificateData
): Promise<EmailSendResult> {
  try {
    const locale = data.locale || "fr";
    const t = emailTemplates[locale];

    const htmlContent = generateEmailHTML(data);

    // Dans une vraie implémentation avec Resend:
    /*
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
     const { data: result, error } = await resend.emails.send({
      from: `${data.schoolName} <${data.schoolEmail}>`,
      to: data.to,
      subject: t.subject(data),
      html: htmlContent,
      attachments: [
        {
          filename: data.certificateFilename,
          path: data.certificateUrl,
        },
      ],
    });
     if (error) throw error;
     return {
      success: true,
      messageId: result.id,
    };
    */

    // Simulation
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("Email simulation:", {
      to: data.to,
      subject: t.subject(data),
      htmlLength: htmlContent.length,
    });

    return {
      success: true,
      messageId: `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    };
  } catch (error) {
    console.error("Error sending certificate email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Email send failed",
    };
  }
}

/**
 * Envoie plusieurs emails en batch
 */
export async function sendCertificateEmailsBatch(
  emails: EmailCertificateData[]
): Promise<EmailSendResult[]> {
  const results: EmailSendResult[] = [];

  for (const email of emails) {
    const result = await sendCertificateEmail(email);
    results.push(result);
  }

  return results;
}

/**
 * Ré-envoie un email en cas d'échec
 */
export async function retrySendCertificateEmail(
  data: EmailCertificateData,
  maxRetries: number = 3
): Promise<EmailSendResult> {
  let lastError: string | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await sendCertificateEmail(data);

    if (result.success) {
      return result;
    }

    lastError = result.error;

    // Wait before retry (exponential backoff)
    if (attempt < maxRetries) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }

  return {
    success: false,
    error: `Failed after ${maxRetries} attempts. Last error: ${lastError}`,
  };
}
