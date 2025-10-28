import { describe, it, expect } from 'vitest';
import { qrBillService } from './qr-bill.service';
import type { InvoiceData } from './qr-bill.service';

describe('QR Bill Service', () => {
  describe('validateSwissIBAN', () => {
    it('devrait valider un IBAN suisse correct', () => {
      const validIBAN = 'CH93 0076 2011 6238 5295 7';
      expect(qrBillService.validateSwissIBAN(validIBAN)).toBe(true);
    });

    it('devrait valider un IBAN suisse sans espaces', () => {
      const validIBAN = 'CH9300762011623852957';
      expect(qrBillService.validateSwissIBAN(validIBAN)).toBe(true);
    });

    it('devrait rejeter un IBAN avec un mauvais checksum', () => {
      const invalidIBAN = 'CH94 0076 2011 6238 5295 7';
      expect(qrBillService.validateSwissIBAN(invalidIBAN)).toBe(false);
    });

    it('devrait rejeter un IBAN non suisse', () => {
      const foreignIBAN = 'FR76 3000 6000 0112 3456 7890 189';
      expect(qrBillService.validateSwissIBAN(foreignIBAN)).toBe(false);
    });

    it('devrait rejeter un format invalide', () => {
      const invalidIBAN = 'CH93';
      expect(qrBillService.validateSwissIBAN(invalidIBAN)).toBe(false);
    });
  });

  describe('calculateModulo10', () => {
    it('devrait calculer le checksum Modulo 10 correct', () => {
      const input = '12345';
      const checksum = qrBillService.calculateModulo10(input);
      expect(checksum).toBeGreaterThanOrEqual(0);
      expect(checksum).toBeLessThanOrEqual(9);
    });

    it('devrait retourner 0 pour une chaîne vide', () => {
      const checksum = qrBillService.calculateModulo10('');
      expect(checksum).toBe(0);
    });
  });

  describe('generateQRReference', () => {
    it('devrait générer une référence de 27 chiffres avec espaces', () => {
      const reference = qrBillService.generateQRReference('INV-2025-0001');
      expect(reference).toMatch(/^\d{2} \d{5} \d{5} \d{5} \d{5} \d{5}$/);
    });

    it('devrait générer des références différentes pour des factures différentes', () => {
      const ref1 = qrBillService.generateQRReference('INV-2025-0001');
      const ref2 = qrBillService.generateQRReference('INV-2025-0002');
      expect(ref1).not.toBe(ref2);
    });

    it('devrait gérer les numéros de facture alphanumériques', () => {
      const reference = qrBillService.generateQRReference('ABC-123-XYZ');
      expect(reference).toMatch(/^\d{2} \d{5} \d{5} \d{5} \d{5} \d{5}$/);
    });
  });

  describe('formatIBAN', () => {
    it('devrait formater un IBAN sans espaces', () => {
      const iban = 'CH9300762011623852957';
      const formatted = qrBillService.formatIBAN(iban);
      expect(formatted).toBe('CH93 0076 2011 6238 5295 7');
    });

    it('devrait re-formater un IBAN déjà formaté', () => {
      const iban = 'CH93 0076 2011 6238 5295 7';
      const formatted = qrBillService.formatIBAN(iban);
      expect(formatted).toBe('CH93 0076 2011 6238 5295 7');
    });

    it('devrait gérer un IBAN vide', () => {
      const formatted = qrBillService.formatIBAN('');
      expect(formatted).toBe('');
    });
  });

  describe('createQRBillData', () => {
    const mockInvoice: InvoiceData = {
      invoiceNumber: 'INV-2025-0001',
      issueDate: '28.10.2025',
      dueDate: '28.11.2025',
      school: {
        name: 'Auto-École Viamentor',
        address: 'Route de la Gare',
        buildingNumber: 15,
        zip: 1003,
        city: 'Lausanne',
        country: 'CH',
        iban: 'CH93 0076 2011 6238 5295 7',
        email: 'contact@viamentor.ch',
        phone: '+41 21 123 45 67',
      },
      student: {
        name: 'Dupont',
        firstName: 'Jean',
        address: 'Avenue de la Paix',
        buildingNumber: 42,
        zip: 1004,
        city: 'Lausanne',
        country: 'CH',
      },
      items: [
        {
          description: 'Leçon de conduite (50 min)',
          quantity: 10,
          unitPrice: 85,
          total: 850,
        },
      ],
      totalAmount: 850,
      currency: 'CHF',
    };

    it('devrait créer des données QR bill valides', () => {
      const qrData = qrBillService.createQRBillData(mockInvoice);
      
      expect(qrData.currency).toBe('CHF');
      expect(qrData.amount).toBe(850);
      expect(qrData.creditor.name).toBe('Auto-École Viamentor');
      expect(qrData.creditor.account).toBe('CH93 0076 2011 6238 5295 7');
      expect(qrData.debtor.name).toBe('Jean Dupont');
    });

    it('devrait générer une référence si non fournie', () => {
      const qrData = qrBillService.createQRBillData(mockInvoice);
      expect(qrData.reference).toBeDefined();
      expect(qrData.reference).toMatch(/^\d{2} \d{5} \d{5} \d{5} \d{5} \d{5}$/);
    });

    it('devrait utiliser la référence fournie', () => {
      const customReference = '21 00000 00003 13947 14300 09017';
      const invoiceWithRef = {
        ...mockInvoice,
        reference: customReference,
      };
      
      const qrData = qrBillService.createQRBillData(invoiceWithRef);
      expect(qrData.reference).toBe(customReference);
    });

    it('devrait inclure le message optionnel', () => {
      const invoiceWithMessage = {
        ...mockInvoice,
        message: 'Merci pour votre confiance',
      };
      
      const qrData = qrBillService.createQRBillData(invoiceWithMessage);
      expect(qrData.message).toBe('Merci pour votre confiance');
    });

    it('devrait rejeter un IBAN invalide', () => {
      const invoiceInvalid = {
        ...mockInvoice,
        school: {
          ...mockInvoice.school,
          iban: 'CH94 0076 2011 6238 5295 7', // Checksum invalide
        },
      };
      
      expect(() => {
        qrBillService.createQRBillData(invoiceInvalid);
      }).toThrow('IBAN suisse invalide');
    });

    it('devrait utiliser CHF comme devise par défaut', () => {
      const invoiceNoCurrency = {
        ...mockInvoice,
        currency: undefined,
      };
      
      const qrData = qrBillService.createQRBillData(invoiceNoCurrency as InvoiceData);
      expect(qrData.currency).toBe('CHF');
    });

    it('devrait accepter EUR comme devise', () => {
      const invoiceEUR = {
        ...mockInvoice,
        currency: 'EUR' as const,
      };
      
      const qrData = qrBillService.createQRBillData(invoiceEUR);
      expect(qrData.currency).toBe('EUR');
    });
  });

  describe('parseQRCode', () => {
    it('devrait parser un QR code valide', () => {
      const qrCodeData = [
        'SPC',
        '0200',
        '1',
        'CHF',
        '850.00',
        'CH93 0076 2011 6238 5295 7',
        'Auto-École Viamentor',
        'Route de la Gare',
        '15',
        '1003',
        'Lausanne',
        'CH',
      ].join('\n');

      const parsed = qrBillService.parseQRCode(qrCodeData);
      expect(parsed).not.toBeNull();
      expect(parsed?.currency).toBe('CHF');
      expect(parsed?.amount).toBe(850);
    });

    it('devrait retourner null pour un QR code invalide', () => {
      const invalidQRCode = 'Invalid QR Code Data';
      const parsed = qrBillService.parseQRCode(invalidQRCode);
      expect(parsed).toBeNull();
    });

    it('devrait retourner null pour un QR code vide', () => {
      const parsed = qrBillService.parseQRCode('');
      expect(parsed).toBeNull();
    });
  });
});

