import { describe, it, expect, beforeEach, vi } from 'vitest';
import { invoicesService } from './invoices.service';
import { supabase } from '../supabase';

// Mock Supabase
vi.mock('../supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  },
}));

describe('Invoices Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('generateInvoiceNumber', () => {
    it('devrait générer un numéro de facture pour l\'année courante', async () => {
      const year = new Date().getFullYear();
      const mockCount = 5;

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        gte: vi.fn().mockReturnThis(),
        lte: vi.fn().mockResolvedValue({ count: mockCount, error: null }),
      } as any);

      const invoiceNumber = await invoicesService.generateInvoiceNumber();
      
      expect(invoiceNumber).toBe(`INV-${year}-0006`);
    });

    it('devrait démarrer à 0001 si aucune facture existe', async () => {
      const year = new Date().getFullYear();

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        gte: vi.fn().mockReturnThis(),
        lte: vi.fn().mockResolvedValue({ count: 0, error: null }),
      } as any);

      const invoiceNumber = await invoicesService.generateInvoiceNumber();
      
      expect(invoiceNumber).toBe(`INV-${year}-0001`);
    });

    it('devrait utiliser un timestamp en cas d\'erreur', async () => {
      const year = new Date().getFullYear();

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        gte: vi.fn().mockReturnThis(),
        lte: vi.fn().mockResolvedValue({ count: null, error: { message: 'DB error' } }),
      } as any);

      const invoiceNumber = await invoicesService.generateInvoiceNumber();
      
      expect(invoiceNumber).toMatch(new RegExp(`^INV-${year}-\\d+$`));
    });
  });

  describe('getAll', () => {
    it('devrait récupérer toutes les factures', async () => {
      const mockInvoices = [
        { id: '1', invoice_number: 'INV-2025-0001', total_amount: 850 },
        { id: '2', invoice_number: 'INV-2025-0002', total_amount: 1200 },
      ];

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockInvoices, error: null }),
      } as any);

      const invoices = await invoicesService.getAll();
      
      expect(invoices).toHaveLength(2);
      expect(invoices[0].invoice_number).toBe('INV-2025-0001');
    });

    it('devrait lancer une erreur en cas d\'échec', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { message: 'Database error' } 
        }),
      } as any);

      await expect(invoicesService.getAll()).rejects.toThrow('Failed to fetch invoices');
    });
  });

  describe('getById', () => {
    it('devrait récupérer une facture par ID', async () => {
      const mockInvoice = { 
        id: '1', 
        invoice_number: 'INV-2025-0001', 
        total_amount: 850 
      };

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockInvoice, error: null }),
      } as any);

      const invoice = await invoicesService.getById('1');
      
      expect(invoice).not.toBeNull();
      expect(invoice?.invoice_number).toBe('INV-2025-0001');
    });

    it('devrait retourner null si la facture n\'existe pas', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { code: 'PGRST116' } 
        }),
      } as any);

      const invoice = await invoicesService.getById('999');
      
      expect(invoice).toBeNull();
    });
  });

  describe('getByStudentId', () => {
    it('devrait récupérer les factures d\'un élève', async () => {
      const mockInvoices = [
        { id: '1', student_id: 'student123', total_amount: 850 },
        { id: '2', student_id: 'student123', total_amount: 1200 },
      ];

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockInvoices, error: null }),
      } as any);

      const invoices = await invoicesService.getByStudentId('student123');
      
      expect(invoices).toHaveLength(2);
      expect(invoices[0].student_id).toBe('student123');
    });
  });

  describe('getStats', () => {
    it('devrait calculer les statistiques correctement', async () => {
      const mockInvoices = [
        { status: 'paid', total_amount: 850 },
        { status: 'paid', total_amount: 1200 },
        { status: 'overdue', total_amount: 500 },
        { status: 'draft', total_amount: 300 },
      ];

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: mockInvoices, error: null }),
      } as any);

      const stats = await invoicesService.getStats();
      
      expect(stats.total).toBe(4);
      expect(stats.paid).toBe(2);
      expect(stats.overdue).toBe(1);
      expect(stats.totalAmount).toBe(2850);
      expect(stats.paidAmount).toBe(2050);
    });

    it('devrait retourner des stats vides si aucune facture', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: [], error: null }),
      } as any);

      const stats = await invoicesService.getStats();
      
      expect(stats.total).toBe(0);
      expect(stats.paid).toBe(0);
      expect(stats.totalAmount).toBe(0);
    });
  });

  describe('validateIBAN', () => {
    it('devrait valider un IBAN suisse correct', () => {
      const valid = invoicesService.validateIBAN('CH93 0076 2011 6238 5295 7');
      expect(valid).toBe(true);
    });

    it('devrait rejeter un IBAN invalide', () => {
      const invalid = invoicesService.validateIBAN('CH94 0076 2011 6238 5295 7');
      expect(invalid).toBe(false);
    });
  });

  describe('generateQRReference', () => {
    it('devrait générer une référence QR formatée', () => {
      const reference = invoicesService.generateQRReference('INV-2025-0001');
      
      expect(reference).toMatch(/^\d{2} \d{5} \d{5} \d{5} \d{5} \d{5}$/);
      expect(reference).toHaveLength(32); // 27 chiffres + 5 espaces
    });
  });
});

