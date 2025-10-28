/**
 * VIAMENTOR - Certificates PDF Service
 * Service génération PDF attestations avec templates professionnels
 */

// ============================================================================
// TYPES
// ============================================================================

export interface CertificateData {
  // Participant
  participantId: string;
  firstName: string;
  lastName: string;

  // Session
  sessionId: string;
  courseType: string;
  courseCategory: string;
  coursePart: string;
  date: string;
  location: string;
  instructorName: string;

  // School
  schoolName: string;
  schoolLogo?: string;
  schoolAddress: string;
  directorName: string;
  directorTitle: string;

  // Certificate
  certificateId: string;
  generatedAt: Date;
  verificationUrl: string;
}

export interface CertificateGenerationResult {
  success: boolean;
  certificateId: string;
  pdfBlob?: Blob;
  pdfUrl?: string;
  filename: string;
  error?: string;
}

// ============================================================================
// PDF GENERATION SERVICE
// ============================================================================

/**
 * Génère un PDF d'attestation de participation
 * Note: Cette implémentation utilise jsPDF (à installer: npm install jspdf)
 */
export async function generateCertificatePDF(
  data: CertificateData
): Promise<CertificateGenerationResult> {
  try {
    // Import dynamique de jsPDF (à installer dans le projet réel)
    // const { jsPDF } = await import("jspdf");

    // Pour la démo, on simule la génération
    const filename = `Attestation_${data.lastName}_${data.firstName}_${data.date.replace(/\./g, "-")}.pdf`;

    // Simulation de la génération PDF
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Dans une vraie implémentation:
    /*
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
     // Configuration des polices
    doc.setFont("helvetica");
     // Header - Logo école
    if (data.schoolLogo) {
      doc.addImage(data.schoolLogo, "PNG", 20, 20, 40, 20);
    }
     // Title
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("ATTESTATION DE PARTICIPATION", 105, 60, { align: "center" });
     // Separator line
    doc.setLineWidth(0.5);
    doc.line(20, 70, 190, 70);
     // Content
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    const contentY = 90;
    doc.text("Nous certifions que", 105, contentY, { align: "center" });
     doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${data.firstName} ${data.lastName}`,
      105,
      contentY + 15,
      { align: "center" }
    );
     doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("a suivi avec succès", 105, contentY + 30, { align: "center" });
     doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${data.coursePart} du cours ${data.courseType}`,
      105,
      contentY + 45,
      { align: "center" }
    );
    doc.text(data.courseCategory, 105, contentY + 55, { align: "center" });
     // Details
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const detailsY = contentY + 75;
    doc.text(`Date: ${data.date}`, 105, detailsY, { align: "center" });
    doc.text(`Lieu: ${data.location}`, 105, detailsY + 8, { align: "center" });
    doc.text(`Animé par: ${data.instructorName}`, 105, detailsY + 16, {
      align: "center",
    });
     // Signature
    const signatureY = 220;
    doc.setFontSize(10);
    doc.text(data.schoolName, 105, signatureY, { align: "center" });
    doc.text(data.schoolAddress, 105, signatureY + 6, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.text(data.directorName, 105, signatureY + 20, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.text(data.directorTitle, 105, signatureY + 26, { align: "center" });
     // QR Code (nécessite qrcode library)
    // const qrCode = await QRCode.toDataURL(data.verificationUrl);
    // doc.addImage(qrCode, "PNG", 170, 250, 25, 25);
     // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Attestation N° ${data.certificateId}`,
      105,
      280,
      { align: "center" }
    );
    doc.text(
      `Vérifiable sur: ${data.verificationUrl}`,
      105,
      285,
      { align: "center" }
    );
     // Generate blob
    const pdfBlob = doc.output("blob");
    */

    // Simulation: créer un blob vide pour la démo
    const pdfBlob = new Blob(["PDF Content Simulation"], {
      type: "application/pdf",
    });

    return {
      success: true,
      certificateId: data.certificateId,
      pdfBlob,
      filename,
    };
  } catch (error) {
    console.error("Error generating certificate PDF:", error);
    return {
      success: false,
      certificateId: data.certificateId,
      filename: "",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Génère plusieurs attestations en batch
 */
export async function generateCertificatesBatch(
  certificates: CertificateData[]
): Promise<CertificateGenerationResult[]> {
  const results: CertificateGenerationResult[] = [];

  for (const cert of certificates) {
    const result = await generateCertificatePDF(cert);
    results.push(result);
  }

  return results;
}

/**
 * Upload un PDF vers le storage (Supabase/S3)
 */
export async function uploadCertificatePDF(
  blob: Blob,
  filename: string,
  participantId: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // Simulation upload
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Dans une vraie implémentation avec Supabase:
    /*
    const { data, error } = await supabase.storage
      .from("certificates")
      .upload(`${participantId}/${filename}`, blob, {
        contentType: "application/pdf",
        upsert: false,
      });
     if (error) throw error;
     const { data: urlData } = supabase.storage
      .from("certificates")
      .getPublicUrl(`${participantId}/${filename}`);
     return {
      success: true,
      url: urlData.publicUrl,
    };
    */

    // Simulation
    return {
      success: true,
      url: `https://storage.example.com/certificates/${participantId}/${filename}`,
    };
  } catch (error) {
    console.error("Error uploading certificate:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Télécharge un PDF côté client
 */
export function downloadCertificatePDF(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Génère l'URL de vérification unique
 */
export function generateVerificationUrl(certificateId: string): string {
  // Use window.location.origin in browser environment
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://viamentor.ch";
  return `${baseUrl}/verify/certificate/${certificateId}`;
}

/**
 * Génère un ID unique pour l'attestation
 */
export function generateCertificateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `CERT-${timestamp}-${random}`.toUpperCase();
}
