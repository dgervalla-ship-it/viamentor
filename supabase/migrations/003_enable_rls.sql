-- ================================================================
-- VIAMENTOR - Activation des Row Level Security (RLS) Policies
-- ================================================================
-- Date : 28 octobre 2025
-- Description : Réactiver les RLS pour sécuriser l'accès aux données
--
-- IMPORTANT : À exécuter après avoir testé sans RLS
-- ================================================================

-- ==================== ENABLE RLS ====================

-- Activer RLS sur toutes les tables
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;

-- ==================== POLICIES TENANTS ====================

-- Lecture : Utilisateurs peuvent voir leur propre tenant
CREATE POLICY "Users can view their own tenant"
  ON public.tenants FOR SELECT
  USING (id = public.user_tenant_id());

-- Mise à jour : Seulement les admins du tenant
CREATE POLICY "Tenant admins can update their tenant"
  ON public.tenants FOR UPDATE
  USING (id = public.user_tenant_id());

-- ==================== POLICIES USERS ====================

-- Lecture : Utilisateurs peuvent voir les users de leur tenant
CREATE POLICY "Users can view users in their tenant"
  ON public.users FOR SELECT
  USING (tenant_id = public.user_tenant_id());

-- Insertion : Seulement les admins peuvent créer des users
CREATE POLICY "Admins can create users"
  ON public.users FOR INSERT
  WITH CHECK (tenant_id = public.user_tenant_id());

-- Mise à jour : Utilisateurs peuvent se mettre à jour eux-mêmes
CREATE POLICY "Users can update themselves"
  ON public.users FOR UPDATE
  USING (id = auth.uid());

-- ==================== POLICIES STUDENTS ====================

-- Lecture : Voir les étudiants du même tenant
CREATE POLICY "View students in tenant"
  ON public.students FOR SELECT
  USING (tenant_id = public.user_tenant_id());

-- Insertion : Créer des étudiants dans son tenant
CREATE POLICY "Create students in tenant"
  ON public.students FOR INSERT
  WITH CHECK (tenant_id = public.user_tenant_id());

-- Mise à jour : Modifier les étudiants de son tenant
CREATE POLICY "Update students in tenant"
  ON public.students FOR UPDATE
  USING (tenant_id = public.user_tenant_id());

-- Suppression : Supprimer les étudiants de son tenant
CREATE POLICY "Delete students in tenant"
  ON public.students FOR DELETE
  USING (tenant_id = public.user_tenant_id());

-- ==================== POLICIES INSTRUCTORS ====================

-- Lecture : Voir les moniteurs du même tenant
CREATE POLICY "View instructors in tenant"
  ON public.instructors FOR SELECT
  USING (tenant_id = public.user_tenant_id());

-- Insertion : Créer des moniteurs dans son tenant
CREATE POLICY "Create instructors in tenant"
  ON public.instructors FOR INSERT
  WITH CHECK (tenant_id = public.user_tenant_id());

-- Mise à jour : Modifier les moniteurs de son tenant
CREATE POLICY "Update instructors in tenant"
  ON public.instructors FOR UPDATE
  USING (tenant_id = public.user_tenant_id());

-- Suppression : Supprimer les moniteurs de son tenant
CREATE POLICY "Delete instructors in tenant"
  ON public.instructors FOR DELETE
  USING (tenant_id = public.user_tenant_id());

-- ==================== POLICIES LESSONS ====================

-- Lecture : Voir les leçons du même tenant
CREATE POLICY "View lessons in tenant"
  ON public.lessons FOR SELECT
  USING (tenant_id = public.user_tenant_id());

-- Insertion : Créer des leçons dans son tenant
CREATE POLICY "Create lessons in tenant"
  ON public.lessons FOR INSERT
  WITH CHECK (tenant_id = public.user_tenant_id());

-- Mise à jour : Modifier les leçons de son tenant
CREATE POLICY "Update lessons in tenant"
  ON public.lessons FOR UPDATE
  USING (tenant_id = public.user_tenant_id());

-- Suppression : Supprimer les leçons de son tenant
CREATE POLICY "Delete lessons in tenant"
  ON public.lessons FOR DELETE
  USING (tenant_id = public.user_tenant_id());

-- ==================== POLICIES COURSES ====================

-- Lecture : Voir les cours du même tenant
CREATE POLICY "View courses in tenant"
  ON public.courses FOR SELECT
  USING (tenant_id = public.user_tenant_id());

-- Insertion : Créer des cours dans son tenant
CREATE POLICY "Create courses in tenant"
  ON public.courses FOR INSERT
  WITH CHECK (tenant_id = public.user_tenant_id());

-- Mise à jour : Modifier les cours de son tenant
CREATE POLICY "Update courses in tenant"
  ON public.courses FOR UPDATE
  USING (tenant_id = public.user_tenant_id());

-- Suppression : Supprimer les cours de son tenant
CREATE POLICY "Delete courses in tenant"
  ON public.courses FOR DELETE
  USING (tenant_id = public.user_tenant_id());

-- ==================== POLICIES INVOICES ====================

-- Lecture : Voir les factures du même tenant
CREATE POLICY "View invoices in tenant"
  ON public.invoices FOR SELECT
  USING (tenant_id = public.user_tenant_id());

-- Insertion : Créer des factures dans son tenant
CREATE POLICY "Create invoices in tenant"
  ON public.invoices FOR INSERT
  WITH CHECK (tenant_id = public.user_tenant_id());

-- Mise à jour : Modifier les factures de son tenant
CREATE POLICY "Update invoices in tenant"
  ON public.invoices FOR UPDATE
  USING (tenant_id = public.user_tenant_id());

-- Suppression : Supprimer les factures de son tenant
CREATE POLICY "Delete invoices in tenant"
  ON public.invoices FOR DELETE
  USING (tenant_id = public.user_tenant_id());

-- ==================== POLICIES INVOICE ITEMS ====================

-- Lecture : Voir les items des factures du tenant
CREATE POLICY "View invoice items in tenant"
  ON public.invoice_items FOR SELECT
  USING (
    invoice_id IN (
      SELECT id FROM public.invoices WHERE tenant_id = public.user_tenant_id()
    )
  );

-- Insertion : Créer des items pour les factures du tenant
CREATE POLICY "Create invoice items in tenant"
  ON public.invoice_items FOR INSERT
  WITH CHECK (
    invoice_id IN (
      SELECT id FROM public.invoices WHERE tenant_id = public.user_tenant_id()
    )
  );

-- Suppression : Supprimer les items des factures du tenant
CREATE POLICY "Delete invoice items in tenant"
  ON public.invoice_items FOR DELETE
  USING (
    invoice_id IN (
      SELECT id FROM public.invoices WHERE tenant_id = public.user_tenant_id()
    )
  );

-- ==================== POLICIES CATEGORIES ====================

-- Lecture : Tout le monde peut voir les catégories
CREATE POLICY "View all course categories"
  ON public.course_categories FOR SELECT
  USING (true);

-- ==================== POLICIES PARTICIPANTS ====================

-- Lecture : Voir les participants des cours de son tenant
CREATE POLICY "View course participants in tenant"
  ON public.course_participants FOR SELECT
  USING (
    course_id IN (
      SELECT id FROM public.courses WHERE tenant_id = public.user_tenant_id()
    )
  );

-- Insertion : Inscrire des participants aux cours de son tenant
CREATE POLICY "Enroll participants in tenant courses"
  ON public.course_participants FOR INSERT
  WITH CHECK (
    course_id IN (
      SELECT id FROM public.courses WHERE tenant_id = public.user_tenant_id()
    )
  );

-- ================================================================
-- VALIDATION
-- ================================================================

-- Vérifier que toutes les tables ont RLS activé
DO $$
DECLARE
  table_name TEXT;
  rls_enabled BOOLEAN;
BEGIN
  FOR table_name IN 
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename NOT LIKE 'pg_%'
  LOOP
    SELECT relrowsecurity INTO rls_enabled
    FROM pg_class
    WHERE relname = table_name;
    
    IF rls_enabled THEN
      RAISE NOTICE '✅ RLS activé sur: %', table_name;
    ELSE
      RAISE WARNING '⚠️  RLS NON activé sur: %', table_name;
    END IF;
  END LOOP;
END $$;

-- ================================================================
-- NOTES
-- ================================================================
-- 
-- Pour désactiver temporairement RLS (DEV SEULEMENT) :
-- ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
--
-- Pour tester les policies :
-- SET LOCAL role = 'authenticated';
-- SELECT * FROM students; -- Devrait retourner seulement votre tenant
--
-- ================================================================

COMMENT ON TABLE public.tenants IS 'RLS activé - Isolation multi-tenant';
COMMENT ON TABLE public.students IS 'RLS activé - Isolation multi-tenant';
COMMENT ON TABLE public.instructors IS 'RLS activé - Isolation multi-tenant';
COMMENT ON TABLE public.lessons IS 'RLS activé - Isolation multi-tenant';
COMMENT ON TABLE public.courses IS 'RLS activé - Isolation multi-tenant';
COMMENT ON TABLE public.invoices IS 'RLS activé - Isolation multi-tenant';

