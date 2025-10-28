/**
 * Viamentor - Service Tenants (Auto-écoles)
 * Gestion CRUD des auto-écoles (multi-tenant) avec Supabase
 */

import { supabase } from '../supabase';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  website?: string;
  logo_url?: string;
  iban?: string;
  license_number?: string;
  max_students?: number;
  max_instructors?: number;
  subscription_plan: 'starter' | 'professional' | 'enterprise';
  subscription_status: 'trial' | 'active' | 'suspended' | 'cancelled';
  trial_ends_at?: string;
  subscription_ends_at?: string;
  settings?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CreateTenantInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
  iban?: string;
}

export interface UpdateTenantInput extends Partial<CreateTenantInput> {
  subscription_plan?: Tenant['subscription_plan'];
  subscription_status?: Tenant['subscription_status'];
  settings?: Record<string, any>;
}

/**
 * Récupérer tous les tenants (Super Admin seulement)
 */
export async function getAllTenants(): Promise<Tenant[]> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tenants:', error);
    throw new Error(`Failed to fetch tenants: ${error.message}`);
  }

  return data || [];
}

/**
 * Récupérer un tenant par ID
 */
export async function getTenantById(id: string): Promise<Tenant | null> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching tenant:', error);
    throw new Error(`Failed to fetch tenant: ${error.message}`);
  }

  return data;
}

/**
 * Récupérer le tenant de l'utilisateur connecté
 */
export async function getCurrentTenant(): Promise<Tenant | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  const { data: userData } = await supabase
    .from('users')
    .select('tenant_id')
    .eq('id', user.id)
    .single();

  if (!userData?.tenant_id) {
    return null;
  }

  return getTenantById(userData.tenant_id);
}

/**
 * Créer un tenant
 */
export async function createTenant(input: CreateTenantInput): Promise<Tenant> {
  // Générer un slug unique
  const slug = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const { data, error } = await supabase
    .from('tenants')
    .insert({
      ...input,
      slug,
      subscription_plan: 'starter',
      subscription_status: 'trial',
      trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 jours
      max_students: 50,
      max_instructors: 3,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating tenant:', error);
    throw new Error(`Failed to create tenant: ${error.message}`);
  }

  return data;
}

/**
 * Mettre à jour un tenant
 */
export async function updateTenant(
  id: string,
  input: UpdateTenantInput
): Promise<Tenant> {
  const { data, error } = await supabase
    .from('tenants')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating tenant:', error);
    throw new Error(`Failed to update tenant: ${error.message}`);
  }

  return data;
}

/**
 * Suspendre un tenant
 */
export async function suspendTenant(id: string, reason?: string): Promise<Tenant> {
  return updateTenant(id, {
    subscription_status: 'suspended',
    settings: { suspension_reason: reason },
  });
}

/**
 * Activer un tenant
 */
export async function activateTenant(id: string): Promise<Tenant> {
  return updateTenant(id, {
    subscription_status: 'active',
  });
}

/**
 * Passer à un plan supérieur
 */
export async function upgradePlan(
  id: string,
  newPlan: 'professional' | 'enterprise'
): Promise<Tenant> {
  const limits = {
    professional: { max_students: 150, max_instructors: 10 },
    enterprise: { max_students: 9999, max_instructors: 999 },
  };

  return updateTenant(id, {
    subscription_plan: newPlan,
    ...limits[newPlan],
  });
}

/**
 * Récupérer les statistiques d'un tenant
 */
export async function getTenantStats(tenantId: string): Promise<{
  students_count: number;
  instructors_count: number;
  lessons_count: number;
  courses_count: number;
  revenue_total: number;
}> {
  const [
    { count: studentsCount },
    { count: instructorsCount },
    { count: lessonsCount },
    { count: coursesCount },
    invoicesData,
  ] = await Promise.all([
    supabase.from('students').select('*', { count: 'exact', head: true }).eq('tenant_id', tenantId),
    supabase.from('instructors').select('*', { count: 'exact', head: true }).eq('tenant_id', tenantId),
    supabase.from('lessons').select('*', { count: 'exact', head: true }).eq('tenant_id', tenantId),
    supabase.from('courses').select('*', { count: 'exact', head: true }).eq('tenant_id', tenantId),
    supabase.from('invoices').select('total_amount, status').eq('tenant_id', tenantId).eq('status', 'paid'),
  ]);

  const revenueTotal = (invoicesData.data || []).reduce(
    (sum, inv) => sum + inv.total_amount,
    0
  );

  return {
    students_count: studentsCount || 0,
    instructors_count: instructorsCount || 0,
    lessons_count: lessonsCount || 0,
    courses_count: coursesCount || 0,
    revenue_total: revenueTotal,
  };
}

/**
 * Service object
 */
export const tenantsService = {
  getAll: getAllTenants,
  getById: getTenantById,
  getCurrent: getCurrentTenant,
  create: createTenant,
  update: updateTenant,
  suspend: suspendTenant,
  activate: activateTenant,
  upgradePlan,
  getStats: getTenantStats,
};

