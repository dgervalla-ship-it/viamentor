/**
 * Viamentor - GDPR Service
 * Gestion des droits RGPD/nLPD (accès, portabilité, effacement)
 */

import { supabase } from '../supabase';

export interface UserDataExport {
  user: {
    id: string;
    email: string;
    created_at: string;
    last_sign_in_at?: string;
  };
  profile?: {
    first_name: string;
    last_name: string;
    phone?: string;
    role: string;
  };
  student_data?: {
    faber_number?: string;
    permit_type?: string;
    assigned_instructor_id?: string;
    lessons: any[];
    exams: any[];
    invoices: any[];
    progression: any;
  };
  instructor_data?: {
    license_number?: string;
    categories: string[];
    languages: string[];
    assigned_students: any[];
    lessons: any[];
  };
  activity_logs: any[];
  consent_history: any[];
}

/**
 * Exporter toutes les données d'un utilisateur (RGPD Art. 15 + 20)
 */
export async function exportUserData(userId?: string): Promise<UserDataExport> {
  // Si pas d'ID fourni, utiliser l'utilisateur connecté
  const { data: { user } } = await supabase.auth.getUser();
  const targetUserId = userId || user?.id;

  if (!targetUserId) {
    throw new Error('User not authenticated');
  }

  // Récupérer les données utilisateur
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', targetUserId)
    .single();

  if (!userData) {
    throw new Error('User not found');
  }

  const exportData: UserDataExport = {
    user: {
      id: userData.id,
      email: userData.email || user?.email || '',
      created_at: userData.created_at,
      last_sign_in_at: user?.last_sign_in_at,
    },
    profile: {
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
      phone: userData.phone,
      role: userData.role,
    },
    activity_logs: [],
    consent_history: [],
  };

  // Si c'est un élève
  if (userData.role === 'student') {
    const { data: studentData } = await supabase
      .from('students')
      .select('*')
      .eq('id', targetUserId)
      .single();

    if (studentData) {
      // Récupérer toutes les données liées
      const [lessons, exams, invoices] = await Promise.all([
        supabase.from('lessons').select('*').eq('student_id', studentData.id),
        supabase.from('exams').select('*').eq('student_id', studentData.id),
        supabase.from('invoices').select('*').eq('student_id', studentData.id),
      ]);

      exportData.student_data = {
        faber_number: studentData.faber_number,
        permit_type: studentData.permit_type,
        assigned_instructor_id: studentData.assigned_instructor_id,
        lessons: lessons.data || [],
        exams: exams.data || [],
        invoices: invoices.data || [],
        progression: {
          status: studentData.status,
          started_at: studentData.created_at,
        },
      };
    }
  }

  // Si c'est un moniteur
  if (userData.role === 'instructor') {
    const { data: instructorData } = await supabase
      .from('instructors')
      .select('*')
      .eq('id', targetUserId)
      .single();

    if (instructorData) {
      const [assignedStudents, lessons] = await Promise.all([
        supabase.from('students').select('id, first_name, last_name').eq('assigned_instructor_id', instructorData.id),
        supabase.from('lessons').select('*').eq('instructor_id', instructorData.id),
      ]);

      exportData.instructor_data = {
        license_number: instructorData.license_number,
        categories: instructorData.categories,
        languages: instructorData.languages,
        assigned_students: assignedStudents.data || [],
        lessons: lessons.data || [],
      };
    }
  }

  return exportData;
}

/**
 * Exporter au format JSON
 */
export async function exportUserDataJSON(userId?: string): Promise<string> {
  const data = await exportUserData(userId);
  return JSON.stringify(data, null, 2);
}

/**
 * Exporter au format CSV (simplifié)
 */
export async function exportUserDataCSV(userId?: string): Promise<string> {
  const data = await exportUserData(userId);
  
  let csv = 'Type,Champ,Valeur\n';
  
  // User data
  csv += `User,ID,${data.user.id}\n`;
  csv += `User,Email,${data.user.email}\n`;
  csv += `User,Créé le,${data.user.created_at}\n`;
  
  // Profile
  if (data.profile) {
    csv += `Profil,Prénom,${data.profile.first_name}\n`;
    csv += `Profil,Nom,${data.profile.last_name}\n`;
    csv += `Profil,Téléphone,${data.profile.phone || ''}\n`;
    csv += `Profil,Rôle,${data.profile.role}\n`;
  }
  
  // Student data
  if (data.student_data) {
    csv += `Élève,FABER,${data.student_data.faber_number || ''}\n`;
    csv += `Élève,Permis,${data.student_data.permit_type || ''}\n`;
    csv += `Élève,Nombre de leçons,${data.student_data.lessons.length}\n`;
    csv += `Élève,Nombre d'examens,${data.student_data.exams.length}\n`;
    csv += `Élève,Nombre de factures,${data.student_data.invoices.length}\n`;
  }
  
  return csv;
}

/**
 * Supprimer toutes les données d'un utilisateur (RGPD Art. 17 - Droit à l'oubli)
 */
export async function deleteUserData(userId: string, keepLegalData: boolean = true): Promise<{
  deleted: string[];
  kept: string[];
}> {
  const deleted: string[] = [];
  const kept: string[] = [];

  // 1. Récupérer les données utilisateur
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (!userData) {
    throw new Error('User not found');
  }

  // 2. Si élève, supprimer ou anonymiser
  if (userData.role === 'student') {
    if (keepLegalData) {
      // Anonymiser au lieu de supprimer (garder factures pour fiscal)
      await supabase
        .from('students')
        .update({
          first_name: '[SUPPRIMÉ]',
          last_name: '[SUPPRIMÉ]',
          email: `deleted-${userId}@anonymized.local`,
          phone: null,
          address: null,
          faber_number: null,
          avs_number: null,
        })
        .eq('id', userId);
      
      kept.push('students (anonymisé)');
      kept.push('invoices (obligation fiscale 10 ans)');
      kept.push('exams (traçabilité légale 5 ans)');
    } else {
      // Suppression complète (seulement si autorisé)
      await supabase.from('students').delete().eq('id', userId);
      deleted.push('students');
    }
  }

  // 3. Si moniteur, anonymiser
  if (userData.role === 'instructor') {
    await supabase
      .from('instructors')
      .update({
        first_name: '[SUPPRIMÉ]',
        last_name: '[SUPPRIMÉ]',
        email: `deleted-${userId}@anonymized.local`,
        phone: null,
        license_number: null,
      })
      .eq('id', userId);
    
    kept.push('instructors (anonymisé - contrats)');
  }

  // 4. Supprimer données non légales
  await supabase.from('users').delete().eq('id', userId);
  deleted.push('users');

  // 5. Déconnecter l'utilisateur
  await supabase.auth.admin.deleteUser(userId);
  deleted.push('auth');

  return { deleted, kept };
}

/**
 * Anonymiser les données d'un utilisateur
 */
export async function anonymizeUserData(userId: string): Promise<void> {
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (!userData) {
    throw new Error('User not found');
  }

  const anonymousEmail = `anonymous-${userId.substring(0, 8)}@anonymized.local`;

  if (userData.role === 'student') {
    await supabase
      .from('students')
      .update({
        first_name: 'Anonyme',
        last_name: `${userId.substring(0, 8)}`,
        email: anonymousEmail,
        phone: null,
        address: null,
      })
      .eq('id', userId);
  }

  if (userData.role === 'instructor') {
    await supabase
      .from('instructors')
      .update({
        first_name: 'Anonyme',
        last_name: `${userId.substring(0, 8)}`,
        email: anonymousEmail,
        phone: null,
      })
      .eq('id', userId);
  }
}

/**
 * Vérifier si des données doivent être conservées légalement
 */
export async function checkLegalRetention(userId: string): Promise<{
  hasInvoices: boolean;
  hasExams: boolean;
  hasCertificates: boolean;
  canDeleteImmediately: boolean;
}> {
  const [invoices, exams] = await Promise.all([
    supabase.from('invoices').select('id').eq('student_id', userId).limit(1),
    supabase.from('exams').select('id').eq('student_id', userId).limit(1),
  ]);

  const hasInvoices = (invoices.data?.length || 0) > 0;
  const hasExams = (exams.data?.length || 0) > 0;

  return {
    hasInvoices,
    hasExams,
    hasCertificates: hasExams, // Si examens = potentiellement certificats
    canDeleteImmediately: !hasInvoices && !hasExams,
  };
}

/**
 * Service object
 */
export const gdprService = {
  exportUserData,
  exportUserDataJSON,
  exportUserDataCSV,
  deleteUserData,
  anonymizeUserData,
  checkLegalRetention,
};

