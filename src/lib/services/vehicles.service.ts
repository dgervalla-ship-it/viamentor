/**
 * Viamentor - Service Véhicules
 * Gestion CRUD des véhicules avec Supabase
 */

import { supabase } from '../supabase';

export interface Vehicle {
  id: string;
  tenant_id: string;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  category: string;
  transmission: 'manual' | 'automatic';
  fuel_type: string;
  color?: string;
  mileage?: number;
  next_service_date?: string;
  next_service_km?: number;
  insurance_expiry?: string;
  technical_inspection_expiry?: string;
  assigned_instructor_ids?: string[];
  status: 'available' | 'in_service' | 'maintenance' | 'retired';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateVehicleInput {
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  category: string;
  transmission: 'manual' | 'automatic';
  fuel_type: string;
  color?: string;
}

export interface UpdateVehicleInput extends Partial<CreateVehicleInput> {
  mileage?: number;
  status?: Vehicle['status'];
  next_service_date?: string;
  next_service_km?: number;
}

/**
 * Récupérer tous les véhicules
 */
export async function getAllVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('brand', { ascending: true });

  if (error) {
    console.error('Error fetching vehicles:', error);
    throw new Error(`Failed to fetch vehicles: ${error.message}`);
  }

  return data || [];
}

/**
 * Récupérer un véhicule par ID
 */
export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching vehicle:', error);
    throw new Error(`Failed to fetch vehicle: ${error.message}`);
  }

  return data;
}

/**
 * Créer un véhicule
 */
export async function createVehicle(input: CreateVehicleInput): Promise<Vehicle> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: userData } = await supabase
    .from('users')
    .select('tenant_id')
    .eq('id', user.id)
    .single();

  if (!userData?.tenant_id) {
    throw new Error('User tenant not found');
  }

  const { data, error } = await supabase
    .from('vehicles')
    .insert({
      ...input,
      tenant_id: userData.tenant_id,
      status: 'available',
      mileage: 0,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating vehicle:', error);
    throw new Error(`Failed to create vehicle: ${error.message}`);
  }

  return data;
}

/**
 * Mettre à jour un véhicule
 */
export async function updateVehicle(
  id: string,
  input: UpdateVehicleInput
): Promise<Vehicle> {
  const { data, error } = await supabase
    .from('vehicles')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating vehicle:', error);
    throw new Error(`Failed to update vehicle: ${error.message}`);
  }

  return data;
}

/**
 * Supprimer un véhicule
 */
export async function deleteVehicle(id: string): Promise<void> {
  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting vehicle:', error);
    throw new Error(`Failed to delete vehicle: ${error.message}`);
  }
}

/**
 * Récupérer les véhicules disponibles
 */
export async function getAvailableVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('status', 'available')
    .order('brand', { ascending: true });

  if (error) {
    console.error('Error fetching available vehicles:', error);
    throw new Error(`Failed to fetch available vehicles: ${error.message}`);
  }

  return data || [];
}

/**
 * Récupérer les véhicules par catégorie
 */
export async function getVehiclesByCategory(category: string): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('category', category)
    .eq('status', 'available')
    .order('brand', { ascending: true });

  if (error) {
    console.error('Error fetching vehicles by category:', error);
    throw new Error(`Failed to fetch vehicles by category: ${error.message}`);
  }

  return data || [];
}

/**
 * Assigner un véhicule à un moniteur
 */
export async function assignVehicleToInstructor(
  vehicleId: string,
  instructorId: string
): Promise<Vehicle> {
  const vehicle = await getVehicleById(vehicleId);
  
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  const assignedInstructors = vehicle.assigned_instructor_ids || [];
  
  if (!assignedInstructors.includes(instructorId)) {
    assignedInstructors.push(instructorId);
  }

  return updateVehicle(vehicleId, {
    assigned_instructor_ids: assignedInstructors,
  });
}

/**
 * Service object
 */
export const vehiclesService = {
  getAll: getAllVehicles,
  getById: getVehicleById,
  create: createVehicle,
  update: updateVehicle,
  delete: deleteVehicle,
  getAvailable: getAvailableVehicles,
  getByCategory: getVehiclesByCategory,
  assignToInstructor: assignVehicleToInstructor,
};

