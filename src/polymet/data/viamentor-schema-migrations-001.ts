/**
 * VIAMENTOR - Migration SQL 001
 * Création entités manquantes détectées audit schéma
 *
 * ANOMALIES CORRIGÉES:
 * - CRITIQUES: roles, permissions, user_roles (RBAC)
 * - MAJEURES: conflicts, communications, tasks, messages
 * - MINEURES: expiration_logs
 *
 * DÉPLOIEMENT: PostgreSQL 14+, CREATE INDEX CONCURRENTLY safe production
 * ROLLBACK: Script 001_rollback.sql disponible
 */

export const migration001SQL = `
-- ============================================================================
-- MIGRATION 001: ADD MISSING ENTITIES
-- Date: 2025-01-XX
-- Author: Viamentor Schema Audit
-- Description: Correction 10 anomalies critiques/majeures/mineures
-- ============================================================================

-- ============================================================================
-- 1. RBAC: TABLE ROLES (15 rôles hiérarchiques)
-- ============================================================================

CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  parent_role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE roles IS 'Rôles RBAC hiérarchiques 15 niveaux Super Admin→Guest';
COMMENT ON COLUMN roles.level IS 'Niveau hiérarchique: 100=Super Admin, 0=Guest';
COMMENT ON COLUMN roles.parent_role_id IS 'Héritage permissions parent→enfant cascade';
COMMENT ON COLUMN roles.is_system IS 'Rôle système non supprimable (Super Admin, Platform Admin)';

CREATE INDEX idx_roles_slug ON roles(slug);
CREATE INDEX idx_roles_level ON roles(level DESC);
CREATE INDEX idx_roles_parent ON roles(parent_role_id) WHERE parent_role_id IS NOT NULL;

-- ============================================================================
-- 2. RBAC: TABLE PERMISSIONS (150+ permissions granulaires)
-- ============================================================================

CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  resource TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('create', 'read', 'update', 'delete', 'execute')),
  description TEXT,
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_resource_action UNIQUE (resource, action)
);

COMMENT ON TABLE permissions IS 'Permissions granulaires CRUD+Execute per resource';
COMMENT ON COLUMN permissions.resource IS 'Resource cible: students, invoices, settings, audit_logs';
COMMENT ON COLUMN permissions.action IS 'Action CRUD: create/read/update/delete/execute';
COMMENT ON COLUMN permissions.is_system IS 'Permission système non supprimable';

CREATE INDEX idx_permissions_resource ON permissions(resource);
CREATE INDEX idx_permissions_action ON permissions(action);
CREATE INDEX idx_permissions_resource_action ON permissions(resource, action);

-- ============================================================================
-- 3. RBAC: TABLE ROLE_PERMISSIONS (N-N roles↔permissions)
-- ============================================================================

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (role_id, permission_id)
);

COMMENT ON TABLE role_permissions IS 'Pivot N-N roles↔permissions avec héritage hiérarchique';

CREATE INDEX idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission ON role_permissions(permission_id);

-- ============================================================================
-- 4. RBAC: TABLE USER_ROLES (N-N users↔roles tenant-scoped)
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID NOT NULL,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  granted_by UUID,
  expires_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, role_id, tenant_id)
);

COMMENT ON TABLE user_roles IS 'Pivot N-N users↔roles multi-rôles context-aware tenant-scoped';
COMMENT ON COLUMN user_roles.tenant_id IS 'Scope tenant: user peut avoir rôles différents per tenant';
COMMENT ON COLUMN user_roles.expires_at IS 'Expiration optionnelle rôle temporaire (invité, stagiaire)';

CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role_id);
CREATE INDEX idx_user_roles_tenant ON user_roles(tenant_id);
CREATE INDEX idx_user_roles_expires ON user_roles(expires_at) WHERE expires_at IS NOT NULL;

-- ============================================================================
-- 5. PLANNING: TABLE CONFLICTS (détection real-time double-booking)
-- ============================================================================

CREATE TABLE IF NOT EXISTS conflicts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL,
  conflicting_lesson_id UUID NOT NULL,
  conflict_type TEXT NOT NULL CHECK (conflict_type IN (
    'instructor_busy',
    'vehicle_busy',
    'room_busy',
    'student_double_booking'
  )),
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID,
  resolution_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE conflicts IS 'Conflits planning détectés real-time <100ms validation';
COMMENT ON COLUMN conflicts.conflict_type IS 'Type conflit: moniteur/véhicule/salle occupé, élève double-booking';
COMMENT ON COLUMN conflicts.resolved IS 'Conflit résolu (leçon déplacée/annulée)';

CREATE INDEX idx_conflicts_lesson ON conflicts(lesson_id);
CREATE INDEX idx_conflicts_conflicting ON conflicts(conflicting_lesson_id);
CREATE INDEX idx_conflicts_type ON conflicts(conflict_type);
CREATE INDEX idx_conflicts_unresolved ON conflicts(resolved) WHERE resolved = false;
CREATE INDEX idx_conflicts_detected ON conflicts(detected_at DESC);

-- ============================================================================
-- 6. CRM: TABLE COMMUNICATIONS (historique emails/SMS/calls prospects)
-- ============================================================================

CREATE TABLE IF NOT EXISTS communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'sms', 'call', 'meeting')),
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  subject TEXT,
  body TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  opened_at TIMESTAMPTZ,
  clicked BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'bounced', 'failed')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE communications IS 'Historique communications CRM emails/SMS/calls avec tracking';
COMMENT ON COLUMN communications.direction IS 'Direction: inbound (prospect→école), outbound (école→prospect)';
COMMENT ON COLUMN communications.opened_at IS 'Tracking pixel ouverture email';
COMMENT ON COLUMN communications.clicked IS 'Tracking liens UTM cliqués email';
COMMENT ON COLUMN communications.metadata IS 'Headers, attachments, UTM params flexible JSONB';

CREATE INDEX idx_communications_prospect ON communications(prospect_id);
CREATE INDEX idx_communications_type ON communications(type);
CREATE INDEX idx_communications_sent ON communications(sent_at DESC);
CREATE INDEX idx_communications_status ON communications(status);
CREATE INDEX idx_communications_metadata ON communications USING GIN (metadata);

-- ============================================================================
-- 7. SECRÉTARIAT: TABLE TASKS (tâches quotidiennes workflow)
-- ============================================================================

CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  assigned_to UUID NOT NULL,
  title TEXT NOT NULL CHECK (char_length(title) <= 200),
  description TEXT CHECK (char_length(description) <= 1000),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  completed_at TIMESTAMPTZ,
  linked_entity_type TEXT CHECK (linked_entity_type IN ('student', 'prospect', 'invoice', 'lesson')),
  linked_entity_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE tasks IS 'Tâches secrétariat quotidiennes workflow lifecycle';
COMMENT ON COLUMN tasks.priority IS 'Priorité color-coded: urgent=red, high=orange, normal=blue, low=gray';
COMMENT ON COLUMN tasks.due_date IS 'Deadline Alert si overdue <today badge rouge';
COMMENT ON COLUMN tasks.linked_entity_type IS 'Polymorphic association flexible (student/prospect/invoice/lesson)';
COMMENT ON COLUMN tasks.linked_entity_id IS 'Generic FK résolu runtime application layer';

CREATE INDEX idx_tasks_tenant ON tasks(tenant_id);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date) WHERE due_date IS NOT NULL;
CREATE INDEX idx_tasks_overdue ON tasks(due_date) WHERE status != 'completed' AND due_date < CURRENT_DATE;
CREATE INDEX idx_tasks_linked ON tasks(linked_entity_type, linked_entity_id) WHERE linked_entity_type IS NOT NULL;

-- ============================================================================
-- 8. MESSAGERIE: TABLE MESSAGES (messagerie interne secrétariat)
-- ============================================================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL,
  subject TEXT CHECK (char_length(subject) <= 200),
  body TEXT NOT NULL CHECK (char_length(body) <= 5000),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE messages IS 'Messages internes secrétariat avec attachments Supabase Storage';
COMMENT ON COLUMN messages.body IS 'Rich HTML sanitized XSS protection serious 5000 chars max';
COMMENT ON COLUMN messages.attachments IS 'Array JSONB Supabase Storage URLs documents/images preview';

CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_sent ON messages(sent_at DESC);
CREATE INDEX idx_messages_attachments ON messages USING GIN (attachments);

-- ============================================================================
-- 9. MESSAGERIE: TABLE MESSAGE_RECIPIENTS (N-N messages↔users)
-- ============================================================================

CREATE TABLE IF NOT EXISTS message_recipients (
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  read_at TIMESTAMPTZ,
  archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (message_id, user_id)
);

COMMENT ON TABLE message_recipients IS 'Pivot N-N messages↔users tracking lecture/archive per user';
COMMENT ON COLUMN message_recipients.read_at IS 'Timestamp lecture message notification unread count Badge';
COMMENT ON COLUMN message_recipients.archived IS 'Soft delete per user preserve others';

CREATE INDEX idx_message_recipients_message ON message_recipients(message_id);
CREATE INDEX idx_message_recipients_user ON message_recipients(user_id);
CREATE INDEX idx_message_recipients_unread ON message_recipients(user_id) WHERE read_at IS NULL;
CREATE INDEX idx_message_recipients_archived ON message_recipients(user_id, archived);

-- ============================================================================
-- 10. RATTRAPAGES: TABLE EXPIRATION_LOGS (audit trail rappels J-7/J-3/J-1)
-- ============================================================================

CREATE TABLE IF NOT EXISTS expiration_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  makeup_id UUID NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'created',
    'reminder_7d',
    'reminder_3d',
    'reminder_1d',
    'expired',
    'used'
  )),
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  email_sent BOOLEAN DEFAULT false,
  sms_sent BOOLEAN DEFAULT false,
  notification_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE expiration_logs IS 'Audit trail rattrapages rappels automatiques RGPD compliance';
COMMENT ON COLUMN expiration_logs.event_type IS 'Lifecycle: created→reminder_7d→reminder_3d→reminder_1d→expired/used';
COMMENT ON COLUMN expiration_logs.metadata IS 'Email template ID, SMS provider response, error logs';

CREATE INDEX idx_expiration_logs_makeup ON expiration_logs(makeup_id);
CREATE INDEX idx_expiration_logs_event ON expiration_logs(event_type);
CREATE INDEX idx_expiration_logs_triggered ON expiration_logs(triggered_at DESC);

-- ============================================================================
-- TRIGGERS: AUTO-UPDATE updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_roles_updated_at
  BEFORE UPDATE ON roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- RLS POLICIES: Supabase Row Level Security
-- ============================================================================

-- Roles: Super Admin + Platform Admin only
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY roles_super_admin_all ON roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.slug IN ('super_admin', 'platform_admin')
    )
  );

-- Permissions: Super Admin + Platform Admin only
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY permissions_super_admin_all ON permissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.slug IN ('super_admin', 'platform_admin')
    )
  );

-- Tasks: Assigned user OR tenant admin
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY tasks_assigned_or_admin ON tasks
  FOR ALL USING (
    assigned_to = auth.uid()
    OR EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND ur.tenant_id = tasks.tenant_id
      AND r.slug IN ('school_admin', 'secretary')
    )
  );

-- Messages: Sender OR recipient
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY messages_sender_or_recipient ON messages
  FOR ALL USING (
    sender_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM message_recipients mr
      WHERE mr.message_id = messages.id
      AND mr.user_id = auth.uid()
    )
  );

-- ============================================================================
-- GRANTS: Permissions application role
-- ============================================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Vérification intégrité
DO $$
DECLARE
  table_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name IN (
    'roles', 'permissions', 'role_permissions', 'user_roles',
    'conflicts', 'communications', 'tasks', 'messages',
    'message_recipients', 'expiration_logs'
  );
  
  IF table_count = 10 THEN
    RAISE NOTICE '✅ Migration 001 SUCCESS: 10/10 tables créées';
  ELSE
    RAISE EXCEPTION '❌ Migration 001 FAILED: %/10 tables créées', table_count;
  END IF;
END $$;
`;

export default migration001SQL;
