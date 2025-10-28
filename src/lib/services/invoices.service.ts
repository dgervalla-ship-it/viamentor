import { supabase } from '../supabase';
import { qrBillService, type InvoiceData as QRInvoiceData } from './qr-bill.service';

// Types
export interface Invoice {
  id: string;
  tenant_id: string;
  student_id: string;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  total_amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  payment_method?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  created_at?: string;
}

export interface CreateInvoiceData {
  student_id: string;
  issue_date: string;
  due_date: string;
  total_amount: number;
  currency?: string;
  status?: Invoice['status'];
  notes?: string;
  items?: Omit<InvoiceItem, 'id' | 'invoice_id' | 'created_at'>[];
}

export interface UpdateInvoiceData {
  student_id?: string;
  issue_date?: string;
  due_date?: string;
  total_amount?: number;
  status?: Invoice['status'];
  payment_method?: string;
  notes?: string;
}

// Service
export const invoicesService = {
  /**
   * Récupérer toutes les factures
   */
  async getAll(): Promise<Invoice[]> {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching invoices:', error);
      throw new Error(`Failed to fetch invoices: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Récupérer une facture par ID
   */
  async getById(id: string): Promise<Invoice | null> {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      console.error('Error fetching invoice:', error);
      throw new Error(`Failed to fetch invoice: ${error.message}`);
    }

    return data;
  },

  /**
   * Récupérer les factures d'un élève
   */
  async getByStudentId(studentId: string): Promise<Invoice[]> {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching student invoices:', error);
      throw new Error(`Failed to fetch student invoices: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Créer une nouvelle facture
   */
  async create(invoiceData: CreateInvoiceData): Promise<Invoice> {
    // Générer un numéro de facture unique
    const invoiceNumber = await this.generateInvoiceNumber();

    const newInvoice = {
      ...invoiceData,
      invoice_number: invoiceNumber,
      currency: invoiceData.currency || 'CHF',
      status: invoiceData.status || 'draft',
    };

    const { data, error } = await supabase
      .from('invoices')
      .insert([newInvoice])
      .select()
      .single();

    if (error) {
      console.error('Error creating invoice:', error);
      throw new Error(`Failed to create invoice: ${error.message}`);
    }

    // Créer les items si fournis
    if (invoiceData.items && invoiceData.items.length > 0 && data) {
      await this.createItems(data.id, invoiceData.items);
    }

    return data;
  },

  /**
   * Mettre à jour une facture
   */
  async update(id: string, invoiceData: UpdateInvoiceData): Promise<Invoice> {
    const { data, error } = await supabase
      .from('invoices')
      .update({
        ...invoiceData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating invoice:', error);
      throw new Error(`Failed to update invoice: ${error.message}`);
    }

    return data;
  },

  /**
   * Supprimer une facture
   */
  async delete(id: string): Promise<void> {
    // Supprimer d'abord les items
    await this.deleteItems(id);

    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting invoice:', error);
      throw new Error(`Failed to delete invoice: ${error.message}`);
    }
  },

  /**
   * Marquer une facture comme payée
   */
  async markAsPaid(id: string, paymentMethod: string): Promise<Invoice> {
    return this.update(id, {
      status: 'paid',
      payment_method: paymentMethod,
    });
  },

  /**
   * Envoyer une facture (marquer comme envoyée)
   */
  async send(id: string): Promise<Invoice> {
    return this.update(id, {
      status: 'sent',
    });
  },

  /**
   * Annuler une facture
   */
  async cancel(id: string): Promise<Invoice> {
    return this.update(id, {
      status: 'cancelled',
    });
  },

  /**
   * Récupérer les items d'une facture
   */
  async getItems(invoiceId: string): Promise<InvoiceItem[]> {
    const { data, error } = await supabase
      .from('invoice_items')
      .select('*')
      .eq('invoice_id', invoiceId);

    if (error) {
      console.error('Error fetching invoice items:', error);
      throw new Error(`Failed to fetch invoice items: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Créer des items pour une facture
   */
  async createItems(
    invoiceId: string,
    items: Omit<InvoiceItem, 'id' | 'invoice_id' | 'created_at'>[]
  ): Promise<InvoiceItem[]> {
    const newItems = items.map((item) => ({
      ...item,
      invoice_id: invoiceId,
    }));

    const { data, error } = await supabase
      .from('invoice_items')
      .insert(newItems)
      .select();

    if (error) {
      console.error('Error creating invoice items:', error);
      throw new Error(`Failed to create invoice items: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Supprimer tous les items d'une facture
   */
  async deleteItems(invoiceId: string): Promise<void> {
    const { error } = await supabase
      .from('invoice_items')
      .delete()
      .eq('invoice_id', invoiceId);

    if (error) {
      console.error('Error deleting invoice items:', error);
      throw new Error(`Failed to delete invoice items: ${error.message}`);
    }
  },

  /**
   * Générer un numéro de facture unique
   */
  async generateInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    
    // Compter les factures de l'année
    const { count, error } = await supabase
      .from('invoices')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${year}-01-01`)
      .lte('created_at', `${year}-12-31`);

    if (error) {
      console.error('Error counting invoices:', error);
      // Fallback: utiliser un timestamp
      return `INV-${year}-${Date.now()}`;
    }

    const nextNumber = (count || 0) + 1;
    return `INV-${year}-${String(nextNumber).padStart(4, '0')}`;
  },

  /**
   * Récupérer les statistiques des factures
   */
  async getStats(): Promise<{
    total: number;
    paid: number;
    overdue: number;
    totalAmount: number;
    paidAmount: number;
  }> {
    const { data, error } = await supabase
      .from('invoices')
      .select('status, total_amount');

    if (error) {
      console.error('Error fetching invoice stats:', error);
      throw new Error(`Failed to fetch invoice stats: ${error.message}`);
    }

    const invoices = data || [];
    
    return {
      total: invoices.length,
      paid: invoices.filter((inv) => inv.status === 'paid').length,
      overdue: invoices.filter((inv) => inv.status === 'overdue').length,
      totalAmount: invoices.reduce((sum, inv) => sum + inv.total_amount, 0),
      paidAmount: invoices
        .filter((inv) => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.total_amount, 0),
    };
  },

  /**
   * Générer un PDF de facture avec QR bill suisse
   */
  async generatePDF(
    invoiceId: string,
    schoolInfo: QRInvoiceData['school'],
    studentInfo: QRInvoiceData['student']
  ): Promise<Buffer> {
    // Récupérer la facture
    const invoice = await this.getById(invoiceId);
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    // Récupérer les items
    const items = await this.getItems(invoiceId);

    // Préparer les données pour le QR bill
    const qrInvoiceData: QRInvoiceData = {
      invoiceNumber: invoice.invoice_number,
      issueDate: new Date(invoice.issue_date).toLocaleDateString('fr-CH'),
      dueDate: new Date(invoice.due_date).toLocaleDateString('fr-CH'),
      school: schoolInfo,
      student: studentInfo,
      items: items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        total: item.total,
      })),
      totalAmount: invoice.total_amount,
      currency: (invoice.currency as 'CHF' | 'EUR') || 'CHF',
      message: invoice.notes,
    };

    // Générer le PDF
    return qrBillService.generateInvoicePDF(qrInvoiceData);
  },

  /**
   * Générer seulement le QR bill (bulletin de versement)
   */
  async generateQRBillOnly(
    invoiceId: string,
    schoolInfo: QRInvoiceData['school'],
    studentInfo: QRInvoiceData['student']
  ): Promise<Buffer> {
    const invoice = await this.getById(invoiceId);
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    const items = await this.getItems(invoiceId);

    const qrInvoiceData: QRInvoiceData = {
      invoiceNumber: invoice.invoice_number,
      issueDate: new Date(invoice.issue_date).toLocaleDateString('fr-CH'),
      dueDate: new Date(invoice.due_date).toLocaleDateString('fr-CH'),
      school: schoolInfo,
      student: studentInfo,
      items: items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        total: item.total,
      })),
      totalAmount: invoice.total_amount,
      currency: (invoice.currency as 'CHF' | 'EUR') || 'CHF',
    };

    return qrBillService.generateQRBillOnly(qrInvoiceData);
  },

  /**
   * Générer une référence QR pour une facture
   */
  generateQRReference(invoiceNumber: string): string {
    return qrBillService.generateQRReference(invoiceNumber);
  },

  /**
   * Valider un IBAN suisse
   */
  validateIBAN(iban: string): boolean {
    return qrBillService.validateSwissIBAN(iban);
  },
};

