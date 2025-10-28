/**
 * Viamentor - Swiss QR Bill Generator Service
 * Génération de QR factures suisses conformes aux standards
 * https://github.com/schoero/swissqrbill
 */

import { SwissQRBill } from 'swissqrbill/pdf';
import type { Data as QRBillData } from 'swissqrbill/pdf';
import PDFDocument from 'pdfkit';

// Types
export interface SchoolInfo {
  name: string;
  address: string;
  buildingNumber?: string | number;
  zip: number;
  city: string;
  country?: string;
  iban: string;
  email?: string;
  phone?: string;
}

export interface StudentInfo {
  name: string;
  firstName: string;
  address: string;
  buildingNumber?: string | number;
  zip: number;
  city: string;
  country?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  school: SchoolInfo;
  student: StudentInfo;
  items: InvoiceItem[];
  totalAmount: number;
  currency?: 'CHF' | 'EUR';
  reference?: string;
  message?: string;
  additionalInfo?: string;
}

/**
 * Service de génération de QR bills suisses
 */
export const qrBillService = {
  /**
   * Générer un numéro de référence QR conforme
   * Format: 27 chiffres avec checksum Modulo 10
   * Structure: XX XXXXX XXXXX XXXXX XXXXX XXXXX (2 + 5×5 = 27)
   */
  generateQRReference(invoiceNumber: string): string {
    // Convertir le numéro de facture en nombre et padding à 26 chiffres
    const numericInvoice = invoiceNumber.replace(/[^0-9]/g, '');
    const padded = numericInvoice.padStart(26, '0');
    
    // Calculer le checksum Modulo 10
    const checksum = this.calculateModulo10(padded);
    
    // Total: 27 chiffres (26 + 1 checksum)
    const fullReference = padded + checksum;
    
    // Format: XX XXXXX XXXXX XXXXX XXXXX XXXXX
    const formatted = 
      fullReference.substring(0, 2) + ' ' +
      fullReference.substring(2, 7) + ' ' +
      fullReference.substring(7, 12) + ' ' +
      fullReference.substring(12, 17) + ' ' +
      fullReference.substring(17, 22) + ' ' +
      fullReference.substring(22, 27);
    
    return formatted;
  },

  /**
   * Calculer le checksum Modulo 10 (récursif)
   * Optimisé pour performance
   */
  calculateModulo10(input: string): number {
    const table = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];
    let carry = 0;
    
    // Optimisation: charAt() est plus rapide que [] sur les strings
    const len = input.length;
    for (let i = 0; i < len; i++) {
      const digit = parseInt(input.charAt(i), 10);
      carry = table[(carry + digit) % 10];
    }
    
    return (10 - carry) % 10;
  },

  /**
   * Valider un IBAN suisse
   * Optimisé pour performance et cache
   */
  validateSwissIBAN(iban: string): boolean {
    // Nettoyer l'IBAN (whitespace uniquement)
    const cleanIBAN = iban.replace(/\s/g, '').toUpperCase();
    
    // Vérification rapide du format suisse (21 caractères: CH + 19 chiffres)
    if (cleanIBAN.length !== 21 || !cleanIBAN.startsWith('CH')) {
      return false;
    }
    
    // Vérification regex optimisée
    if (!/^CH\d{19}$/.test(cleanIBAN)) {
      return false;
    }
    
    // Vérifier le checksum IBAN (Modulo 97)
    const rearranged = cleanIBAN.slice(4) + cleanIBAN.slice(0, 4);
    const numeric = rearranged.replace(/[A-Z]/g, (char) =>
      (char.charCodeAt(0) - 55).toString()
    );
    
    // Modulo 97 optimisé
    let remainder = 0;
    const len = numeric.length;
    for (let i = 0; i < len; i++) {
      remainder = (remainder * 10 + parseInt(numeric[i], 10)) % 97;
    }
    
    return remainder === 1;
  },

  /**
   * Créer les données du QR bill
   */
  createQRBillData(invoice: InvoiceData): QRBillData {
    // Valider l'IBAN
    if (!this.validateSwissIBAN(invoice.school.iban)) {
      throw new Error('IBAN suisse invalide');
    }

    // Générer ou utiliser la référence
    const reference = invoice.reference || this.generateQRReference(invoice.invoiceNumber);

    const qrBillData: QRBillData = {
      currency: invoice.currency || 'CHF',
      amount: invoice.totalAmount,
      reference: reference,
      creditor: {
        name: invoice.school.name,
        address: invoice.school.address,
        buildingNumber: invoice.school.buildingNumber,
        zip: invoice.school.zip,
        city: invoice.school.city,
        country: invoice.school.country || 'CH',
        account: invoice.school.iban,
      },
      debtor: {
        name: `${invoice.student.firstName} ${invoice.student.name}`,
        address: invoice.student.address,
        buildingNumber: invoice.student.buildingNumber,
        zip: invoice.student.zip,
        city: invoice.student.city,
        country: invoice.student.country || 'CH',
      },
    };

    // Ajouter le message si fourni
    if (invoice.message) {
      qrBillData.message = invoice.message;
    }

    // Ajouter les infos additionnelles
    if (invoice.additionalInfo) {
      qrBillData.additionalInformation = invoice.additionalInfo;
    }

    return qrBillData;
  },

  /**
   * Générer un PDF complet avec facture et QR bill
   */
  async generateInvoicePDF(invoice: InvoiceData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const pdf = new PDFDocument({ 
          size: 'A4',
          margin: 50,
          info: {
            Title: `Facture ${invoice.invoiceNumber}`,
            Author: invoice.school.name,
          }
        });

        const buffers: Buffer[] = [];
        pdf.on('data', (chunk) => buffers.push(chunk));
        pdf.on('end', () => resolve(Buffer.concat(buffers)));
        pdf.on('error', reject);

        // En-tête de l'école
        pdf.fontSize(20)
           .font('Helvetica-Bold')
           .text(invoice.school.name, { align: 'left' });
        
        pdf.fontSize(10)
           .font('Helvetica')
           .text(invoice.school.address)
           .text(`${invoice.school.zip} ${invoice.school.city}`);
        
        if (invoice.school.email) {
          pdf.text(`Email: ${invoice.school.email}`);
        }
        if (invoice.school.phone) {
          pdf.text(`Tél: ${invoice.school.phone}`);
        }

        pdf.moveDown(2);

        // Informations de l'élève
        pdf.fontSize(12)
           .font('Helvetica-Bold')
           .text('Facturé à:', { continued: false });
        
        pdf.fontSize(10)
           .font('Helvetica')
           .text(`${invoice.student.firstName} ${invoice.student.name}`)
           .text(invoice.student.address)
           .text(`${invoice.student.zip} ${invoice.student.city}`);

        pdf.moveDown(2);

        // Titre de la facture
        pdf.fontSize(16)
           .font('Helvetica-Bold')
           .text(`FACTURE N° ${invoice.invoiceNumber}`, { align: 'center' });

        pdf.moveDown(1);

        // Dates
        pdf.fontSize(10)
           .font('Helvetica')
           .text(`Date d'émission: ${invoice.issueDate}`, { align: 'right' })
           .text(`Date d'échéance: ${invoice.dueDate}`, { align: 'right' });

        pdf.moveDown(2);

        // Tableau des items
        const tableTop = pdf.y;
        const col1X = 50;
        const col2X = 300;
        const col3X = 380;
        const col4X = 450;

        // En-têtes du tableau
        pdf.fontSize(10)
           .font('Helvetica-Bold');
        
        pdf.text('Description', col1X, tableTop);
        pdf.text('Qté', col2X, tableTop);
        pdf.text('Prix unit.', col3X, tableTop);
        pdf.text('Total', col4X, tableTop);

        // Ligne sous les en-têtes
        pdf.moveTo(col1X, tableTop + 15)
           .lineTo(550, tableTop + 15)
           .stroke();

        // Items
        let currentY = tableTop + 25;
        pdf.font('Helvetica');

        invoice.items.forEach((item) => {
          pdf.text(item.description, col1X, currentY, { width: 240 });
          pdf.text(item.quantity.toString(), col2X, currentY);
          pdf.text(`${item.unitPrice.toFixed(2)} CHF`, col3X, currentY);
          pdf.text(`${item.total.toFixed(2)} CHF`, col4X, currentY);
          currentY += 20;
        });

        // Ligne avant le total
        pdf.moveTo(col3X, currentY)
           .lineTo(550, currentY)
           .stroke();

        currentY += 10;

        // Total
        pdf.fontSize(12)
           .font('Helvetica-Bold')
           .text('TOTAL:', col3X, currentY)
           .text(
             `${invoice.totalAmount.toFixed(2)} ${invoice.currency || 'CHF'}`,
             col4X,
             currentY
           );

        pdf.moveDown(2);

        // Message optionnel
        if (invoice.message) {
          pdf.fontSize(10)
             .font('Helvetica-Oblique')
             .text(invoice.message, { align: 'center' });
          pdf.moveDown(1);
        }

        // Ajouter le QR bill
        const qrBillData = this.createQRBillData(invoice);
        const qrBill = new SwissQRBill(qrBillData);
        
        // Le QR bill sera ajouté en bas de la page
        qrBill.attachTo(pdf);

        pdf.end();
      } catch (error) {
        reject(error);
      }
    });
  },

  /**
   * Générer seulement le QR bill (sans facture complète)
   */
  async generateQRBillOnly(invoice: InvoiceData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const pdf = new PDFDocument({ size: 'A4' });
        
        const buffers: Buffer[] = [];
        pdf.on('data', (chunk) => buffers.push(chunk));
        pdf.on('end', () => resolve(Buffer.concat(buffers)));
        pdf.on('error', reject);

        const qrBillData = this.createQRBillData(invoice);
        const qrBill = new SwissQRBill(qrBillData);
        
        qrBill.attachTo(pdf);
        pdf.end();
      } catch (error) {
        reject(error);
      }
    });
  },

  /**
   * Formater un IBAN suisse avec espaces
   */
  formatIBAN(iban: string): string {
    const cleaned = iban.replace(/\s/g, '');
    return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
  },

  /**
   * Extraire les informations d'un QR code scanné
   */
  parseQRCode(qrCodeData: string): Partial<QRBillData> | null {
    try {
      // Le QR code contient les données séparées par des retours à la ligne
      const lines = qrCodeData.split('\n');
      
      if (lines[0] !== 'SPC' || lines[1] !== '0200') {
        return null; // Pas un QR bill valide
      }

      return {
        currency: lines[3] as 'CHF' | 'EUR',
        amount: parseFloat(lines[4]),
        creditor: {
          name: lines[6],
          address: lines[7],
          buildingNumber: lines[8],
          zip: parseInt(lines[9]),
          city: lines[10],
          country: lines[11],
          account: lines[5],
        },
        // ... autres champs selon le format
      };
    } catch (error) {
      console.error('Error parsing QR code:', error);
      return null;
    }
  },
};

// Export du type pour utilisation externe
export type { QRBillData };

