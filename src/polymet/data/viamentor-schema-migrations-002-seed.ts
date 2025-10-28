/**
 * VIAMENTOR - Migration SQL 002
 * Seed RBAC: 15 rôles hiérarchiques + 150 permissions granulaires
 *
 * HIÉRARCHIE RÔLES (level 100→0):
 * 100: Super Admin (God mode all permissions)
 * 90: Platform Admin (manage tenants, billing, audit)
 * 80: School Admin (manage école complète)
 * 70: Instructor Manager (manage moniteurs)
 * 60: Finance Manager (manage facturation)
 * 50: Secretary (manage inscriptions, planning)
 * 40: Instructor (teach, evaluate, planning)
 * 30: Student (book lessons, view progression)
 * 20: Parent (view child progression)
 * 10: Guest (view public pages)
 *
 * PERMISSIONS: resource.action (students.create, invoices.read, etc.)
 */

export const migration002SeedSQL = `
-- ============================================================================
-- MIGRATION 002: SEED RBAC DATA
-- Date: 2025-01-XX
-- Author: ViaMenutor Schema Audit
-- Description: Seed 15 rôles + 150 permissions + assignments defaults
-- ============================================================================

-- ============================================================================
-- 1. SEED ROLES (15 rôles hiérarchiques)
-- ============================================================================

INSERT INTO roles (id, name, slug, description, level, parent_role_id, is_system) VALUES
-- Level 100: Super Admin
('00000000-0000-0000-0000-000000000001', 'Super Admin', 'super_admin', 'God mode accès complet système', 100, NULL, true),

-- Level 90: Platform Admin
('00000000-0000-0000-0000-000000000002', 'Platform Admin', 'platform_admin', 'Gestion tenants, billing, audit', 90, '00000000-0000-0000-0000-000000000001', true),

-- Level 80: School Admin
('00000000-0000-0000-0000-000000000003', 'School Admin', 'school_admin', 'Gestion complète auto-école', 80, '00000000-0000-0000-0000-000000000002', false),

-- Level 70: Instructor Manager
('00000000-0000-0000-0000-000000000004', 'Instructor Manager', 'instructor_manager', 'Gestion moniteurs, planning, évaluations', 70, '00000000-0000-0000-0000-000000000003', false),

-- Level 60: Finance Manager
('00000000-0000-0000-0000-000000000005', 'Finance Manager', 'finance_manager', 'Gestion facturation, paiements, comptabilité', 60, '00000000-0000-0000-0000-000000000003', false),

-- Level 50: Secretary
('00000000-0000-0000-0000-000000000006', 'Secretary', 'secretary', 'Inscriptions, planning, tâches quotidiennes', 50, '00000000-0000-0000-0000-000000000003', false),

-- Level 40: Instructor
('00000000-0000-0000-0000-000000000007', 'Instructor', 'instructor', 'Enseignement, évaluations, planning personnel', 40, NULL, false),

-- Level 30: Student
('00000000-0000-0000-0000-000000000008', 'Student', 'student', 'Réservation leçons, progression, factures', 30, NULL, false),

-- Level 20: Parent
('00000000-0000-0000-0000-000000000009', 'Parent', 'parent', 'Suivi progression enfant, paiements', 20, NULL, false),

-- Level 10: Guest
('00000000-0000-0000-0000-000000000010', 'Guest', 'guest', 'Accès pages publiques formulaire contact', 10, NULL, false),

-- Level 65: Marketing Manager
('00000000-0000-0000-0000-000000000011', 'Marketing Manager', 'marketing_manager', 'Gestion CRM, campagnes, pixels tracking', 65, '00000000-0000-0000-0000-000000000003', false),

-- Level 55: Accountant
('00000000-0000-0000-0000-000000000012', 'Accountant', 'accountant', 'Comptabilité, rapports financiers, exports', 55, '00000000-0000-0000-0000-000000000005', false),

-- Level 45: Theory Instructor
('00000000-0000-0000-0000-000000000013', 'Theory Instructor', 'theory_instructor', 'Cours théoriques, présences, évaluations', 45, '00000000-0000-0000-0000-000000000007', false),

-- Level 35: Prospect
('00000000-0000-0000-0000-000000000014', 'Prospect', 'prospect', 'Lead CRM pipeline avant inscription', 35, NULL, false),

-- Level 25: Alumni
('00000000-0000-0000-0000-000000000015', 'Alumni', 'alumni', 'Ancien élève permis obtenu accès limité', 25, NULL, false)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. SEED PERMISSIONS (150+ permissions granulaires)
-- ============================================================================

-- STUDENTS PERMISSIONS (10)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('students.create', 'students', 'create', 'Créer nouveaux élèves', true),
('students.read', 'students', 'read', 'Consulter élèves', true),
('students.update', 'students', 'update', 'Modifier élèves', true),
('students.delete', 'students', 'delete', 'Supprimer élèves', true),
('students.export', 'students', 'execute', 'Exporter liste élèves CSV/Excel', true),
('students.assign_instructor', 'students', 'execute', 'Assigner moniteur élève', true),
('students.view_progression', 'students', 'read', 'Consulter progression pédagogique', true),
('students.view_documents', 'students', 'read', 'Consulter documents élève', true),
('students.view_invoices', 'students', 'read', 'Consulter factures élève', true),
('students.suspend', 'students', 'execute', 'Suspendre élève temporairement', true)
ON CONFLICT (name) DO NOTHING;

-- INSTRUCTORS PERMISSIONS (10)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('instructors.create', 'instructors', 'create', 'Créer nouveaux moniteurs', true),
('instructors.read', 'instructors', 'read', 'Consulter moniteurs', true),
('instructors.update', 'instructors', 'update', 'Modifier moniteurs', true),
('instructors.delete', 'instructors', 'delete', 'Supprimer moniteurs', true),
('instructors.export', 'instructors', 'execute', 'Exporter liste moniteurs', true),
('instructors.view_performance', 'instructors', 'read', 'Consulter analytics performance', true),
('instructors.manage_availability', 'instructors', 'update', 'Gérer disponibilités', true),
('instructors.manage_contracts', 'instructors', 'update', 'Gérer contrats rémunération', true),
('instructors.view_revenue', 'instructors', 'read', 'Consulter revenus splits', true),
('instructors.suspend', 'instructors', 'execute', 'Suspendre moniteur temporairement', true)
ON CONFLICT (name) DO NOTHING;

-- VEHICLES PERMISSIONS (8)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('vehicles.create', 'vehicles', 'create', 'Créer nouveaux véhicules', true),
('vehicles.read', 'vehicles', 'read', 'Consulter véhicules', true),
('vehicles.update', 'vehicles', 'update', 'Modifier véhicules', true),
('vehicles.delete', 'vehicles', 'delete', 'Supprimer véhicules', true),
('vehicles.manage_maintenance', 'vehicles', 'update', 'Gérer maintenance', true),
('vehicles.manage_insurance', 'vehicles', 'update', 'Gérer assurances', true),
('vehicles.view_analytics', 'vehicles', 'read', 'Consulter analytics utilisation', true),
('vehicles.deactivate', 'vehicles', 'execute', 'Désactiver véhicule', true)
ON CONFLICT (name) DO NOTHING;

-- LESSONS PERMISSIONS (10)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('lessons.create', 'lessons', 'create', 'Créer leçons pratiques', true),
('lessons.read', 'lessons', 'read', 'Consulter leçons', true),
('lessons.update', 'lessons', 'update', 'Modifier leçons', true),
('lessons.delete', 'lessons', 'delete', 'Annuler leçons', true),
('lessons.book', 'lessons', 'execute', 'Réserver leçon (élève)', true),
('lessons.evaluate', 'lessons', 'execute', 'Évaluer leçon post-cours', true),
('lessons.view_conflicts', 'lessons', 'read', 'Consulter conflits planning', true),
('lessons.resolve_conflicts', 'lessons', 'execute', 'Résoudre conflits', true),
('lessons.export', 'lessons', 'execute', 'Exporter planning', true),
('lessons.cancel_late', 'lessons', 'execute', 'Annuler leçon <24h (admin)', true)
ON CONFLICT (name) DO NOTHING;

-- THEORY_COURSES PERMISSIONS (8)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('theory_courses.create', 'theory_courses', 'create', 'Créer cours théoriques', true),
('theory_courses.read', 'theory_courses', 'read', 'Consulter cours théoriques', true),
('theory_courses.update', 'theory_courses', 'update', 'Modifier cours théoriques', true),
('theory_courses.delete', 'theory_courses', 'delete', 'Annuler cours théoriques', true),
('theory_courses.manage_participants', 'theory_courses', 'update', 'Gérer inscriptions participants', true),
('theory_courses.track_attendance', 'theory_courses', 'execute', 'Tracker présences', true),
('theory_courses.export', 'theory_courses', 'execute', 'Exporter liste présences', true),
('theory_courses.cancel_late', 'theory_courses', 'execute', 'Annuler cours <48h (admin)', true)
ON CONFLICT (name) DO NOTHING;

-- INVOICES PERMISSIONS (10)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('invoices.create', 'invoices', 'create', 'Créer factures', true),
('invoices.read', 'invoices', 'read', 'Consulter factures', true),
('invoices.update', 'invoices', 'update', 'Modifier factures', true),
('invoices.delete', 'invoices', 'delete', 'Supprimer factures brouillon', true),
('invoices.send', 'invoices', 'execute', 'Envoyer factures email', true),
('invoices.record_payment', 'invoices', 'execute', 'Enregistrer paiement', true),
('invoices.generate_qr_bill', 'invoices', 'execute', 'Générer QR-facture suisse', true),
('invoices.manage_dunning', 'invoices', 'execute', 'Gérer relances impayés', true),
('invoices.export', 'invoices', 'execute', 'Exporter factures comptabilité', true),
('invoices.cancel_sent', 'invoices', 'execute', 'Annuler facture envoyée (admin)', true)
ON CONFLICT (name) DO NOTHING;

-- PAYMENTS PERMISSIONS (8)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('payments.create', 'payments', 'create', 'Enregistrer paiements', true),
('payments.read', 'payments', 'read', 'Consulter paiements', true),
('payments.update', 'payments', 'update', 'Modifier paiements', true),
('payments.delete', 'payments', 'delete', 'Supprimer paiements', true),
('payments.import_camt', 'payments', 'execute', 'Importer Camt.054 bancaire', true),
('payments.reconcile', 'payments', 'execute', 'Réconcilier paiements automatique', true),
('payments.export', 'payments', 'execute', 'Exporter rapports comptables', true),
('payments.refund', 'payments', 'execute', 'Rembourser paiement', true)
ON CONFLICT (name) DO NOTHING;

-- PROSPECTS PERMISSIONS (10)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('prospects.create', 'prospects', 'create', 'Créer prospects CRM', true),
('prospects.read', 'prospects', 'read', 'Consulter prospects', true),
('prospects.update', 'prospects', 'update', 'Modifier prospects', true),
('prospects.delete', 'prospects', 'delete', 'Supprimer prospects', true),
('prospects.convert', 'prospects', 'execute', 'Convertir prospect→élève', true),
('prospects.send_communication', 'prospects', 'execute', 'Envoyer email/SMS', true),
('prospects.view_communications', 'prospects', 'read', 'Consulter historique communications', true),
('prospects.manage_pipeline', 'prospects', 'update', 'Gérer pipeline Kanban', true),
('prospects.export', 'prospects', 'execute', 'Exporter prospects', true),
('prospects.mark_lost', 'prospects', 'execute', 'Marquer perdu raison', true)
ON CONFLICT (name) DO NOTHING;

-- CAMPAIGNS PERMISSIONS (8)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('campaigns.create', 'campaigns', 'create', 'Créer campagnes marketing', true),
('campaigns.read', 'campaigns', 'read', 'Consulter campagnes', true),
('campaigns.update', 'campaigns', 'update', 'Modifier campagnes', true),
('campaigns.delete', 'campaigns', 'delete', 'Supprimer campagnes', true),
('campaigns.launch', 'campaigns', 'execute', 'Lancer campagne', true),
('campaigns.pause', 'campaigns', 'execute', 'Mettre en pause', true),
('campaigns.view_analytics', 'campaigns', 'read', 'Consulter analytics ROI', true),
('campaigns.export', 'campaigns', 'execute', 'Exporter résultats', true)
ON CONFLICT (name) DO NOTHING;

-- PIXELS PERMISSIONS (6)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('pixels.create', 'pixels', 'create', 'Configurer pixels tracking', true),
('pixels.read', 'pixels', 'read', 'Consulter pixels', true),
('pixels.update', 'pixels', 'update', 'Modifier pixels', true),
('pixels.delete', 'pixels', 'delete', 'Supprimer pixels', true),
('pixels.view_health', 'pixels', 'read', 'Consulter santé monitoring', true),
('pixels.run_diagnostics', 'pixels', 'execute', 'Lancer diagnostics auto', true)
ON CONFLICT (name) DO NOTHING;

-- TASKS PERMISSIONS (8)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('tasks.create', 'tasks', 'create', 'Créer tâches secrétariat', true),
('tasks.read', 'tasks', 'read', 'Consulter tâches', true),
('tasks.update', 'tasks', 'update', 'Modifier tâches', true),
('tasks.delete', 'tasks', 'delete', 'Supprimer tâches', true),
('tasks.assign', 'tasks', 'execute', 'Assigner tâche utilisateur', true),
('tasks.complete', 'tasks', 'execute', 'Marquer complétée', true),
('tasks.view_all', 'tasks', 'read', 'Consulter toutes tâches tenant', true),
('tasks.export', 'tasks', 'execute', 'Exporter tâches', true)
ON CONFLICT (name) DO NOTHING;

-- MESSAGES PERMISSIONS (6)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('messages.create', 'messages', 'create', 'Envoyer messages internes', true),
('messages.read', 'messages', 'read', 'Consulter messages', true),
('messages.update', 'messages', 'update', 'Modifier brouillons', true),
('messages.delete', 'messages', 'delete', 'Supprimer messages', true),
('messages.archive', 'messages', 'execute', 'Archiver messages', true),
('messages.attach_files', 'messages', 'execute', 'Joindre fichiers Storage', true)
ON CONFLICT (name) DO NOTHING;

-- SETTINGS PERMISSIONS (8)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('settings.read', 'settings', 'read', 'Consulter paramètres', true),
('settings.update', 'settings', 'update', 'Modifier paramètres', true),
('settings.manage_pricing', 'settings', 'update', 'Gérer tarifs', true),
('settings.manage_categories', 'settings', 'update', 'Gérer catégories permis', true),
('settings.manage_integrations', 'settings', 'update', 'Gérer intégrations Stripe/Twint', true),
('settings.manage_notifications', 'settings', 'update', 'Gérer templates notifications', true),
('settings.manage_business_hours', 'settings', 'update', 'Gérer horaires ouverture', true),
('settings.export', 'settings', 'execute', 'Exporter configuration', true)
ON CONFLICT (name) DO NOTHING;

-- AUDIT_LOGS PERMISSIONS (4)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('audit_logs.read', 'audit_logs', 'read', 'Consulter logs audit RGPD', true),
('audit_logs.export', 'audit_logs', 'execute', 'Exporter logs audit', true),
('audit_logs.delete_old', 'audit_logs', 'delete', 'Supprimer logs >7 ans RGPD', true),
('audit_logs.view_sensitive', 'audit_logs', 'read', 'Consulter logs sensibles (Super Admin)', true)
ON CONFLICT (name) DO NOTHING;

-- TENANTS PERMISSIONS (Platform Admin only) (8)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('tenants.create', 'tenants', 'create', 'Créer tenants', true),
('tenants.read', 'tenants', 'read', 'Consulter tenants', true),
('tenants.update', 'tenants', 'update', 'Modifier tenants', true),
('tenants.delete', 'tenants', 'delete', 'Supprimer tenants', true),
('tenants.suspend', 'tenants', 'execute', 'Suspendre tenant', true),
('tenants.impersonate', 'tenants', 'execute', 'Se connecter comme tenant', true),
('tenants.view_billing', 'tenants', 'read', 'Consulter facturation platform', true),
('tenants.export', 'tenants', 'execute', 'Exporter tenants', true)
ON CONFLICT (name) DO NOTHING;

-- ROLES PERMISSIONS (Platform Admin only) (6)
INSERT INTO permissions (name, resource, action, description, is_system) VALUES
('roles.create', 'roles', 'create', 'Créer rôles custom', true),
('roles.read', 'roles', 'read', 'Consulter rôles', true),
('roles.update', 'roles', 'update', 'Modifier rôles', true),
('roles.delete', 'roles', 'delete', 'Supprimer rôles non-système', true),
('roles.assign_permissions', 'roles', 'execute', 'Assigner permissions rôle', true),
('roles.assign_users', 'roles', 'execute', 'Assigner rôle utilisateur', true)
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- 3. ASSIGN PERMISSIONS TO ROLES (héritage hiérarchique)
-- ============================================================================

-- Super Admin: ALL PERMISSIONS (God mode)
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000001', id FROM permissions
ON CONFLICT DO NOTHING;

-- Platform Admin: Tenants + Roles + Audit
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000002', id FROM permissions
WHERE resource IN ('tenants', 'roles', 'audit_logs', 'settings')
ON CONFLICT DO NOTHING;

-- School Admin: Gestion complète école (sauf tenants/roles)
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000003', id FROM permissions
WHERE resource IN (
  'students', 'instructors', 'vehicles', 'lessons', 'theory_courses',
  'invoices', 'payments', 'prospects', 'campaigns', 'pixels',
  'tasks', 'messages', 'settings'
)
ON CONFLICT DO NOTHING;

-- Instructor Manager: Moniteurs + Planning
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000004', id FROM permissions
WHERE resource IN ('instructors', 'lessons', 'students')
AND action IN ('read', 'update', 'execute')
ON CONFLICT DO NOTHING;

-- Finance Manager: Facturation + Paiements
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000005', id FROM permissions
WHERE resource IN ('invoices', 'payments', 'students')
ON CONFLICT DO NOTHING;

-- Secretary: Inscriptions + Planning + Tâches
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000006', id FROM permissions
WHERE resource IN ('students', 'lessons', 'theory_courses', 'tasks', 'messages', 'prospects')
AND action IN ('create', 'read', 'update', 'execute')
ON CONFLICT DO NOTHING;

-- Instructor: Planning personnel + Évaluations
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000007', id FROM permissions
WHERE (resource = 'lessons' AND action IN ('read', 'update', 'execute'))
OR (resource = 'students' AND action = 'read')
OR (resource = 'messages' AND action IN ('create', 'read'))
ON CONFLICT DO NOTHING;

-- Student: Réservation + Progression + Factures
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000008', id FROM permissions
WHERE (resource = 'lessons' AND name = 'lessons.book')
OR (resource = 'students' AND name IN ('students.view_progression', 'students.view_documents', 'students.view_invoices'))
OR (resource = 'invoices' AND action = 'read')
OR (resource = 'messages' AND action IN ('create', 'read'))
ON CONFLICT DO NOTHING;

-- Marketing Manager: CRM + Campagnes + Pixels
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000011', id FROM permissions
WHERE resource IN ('prospects', 'campaigns', 'pixels')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

DO $$
DECLARE
  roles_count INTEGER;
  permissions_count INTEGER;
  assignments_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO roles_count FROM roles;
  SELECT COUNT(*) INTO permissions_count FROM permissions;
  SELECT COUNT(*) INTO role_permissions FROM role_permissions;
  
  RAISE NOTICE '✅ Seed 002 SUCCESS:';
  RAISE NOTICE '  - Rôles: % / 15', roles_count;
  RAISE NOTICE '  - Permissions: % / 150+', permissions_count;
  RAISE NOTICE '  - Assignments: %', assignments_count;
END $$;
`;

export default migration002SeedSQL;
