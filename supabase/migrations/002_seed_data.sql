-- =====================================================
-- VIAMENTOR - Données de Test (Seed)
-- =====================================================
-- Description: Données initiales pour tester l'application
-- =====================================================

-- 1. TENANT DE TEST
INSERT INTO tenants (
  id,
  name,
  slug,
  address,
  city,
  postal_code,
  canton,
  phone,
  email,
  website,
  plan,
  max_students,
  max_instructors,
  status
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Auto-École Genève Centre',
  'auto-ecole-geneve-centre',
  'Rue du Rhône 50',
  'Genève',
  '1204',
  'GE',
  '+41 22 123 45 67',
  'contact@autoecolegeneve.ch',
  'https://autoecolegeneve.ch',
  'professional',
  100,
  10,
  'active'
) ON CONFLICT (id) DO NOTHING;

-- 2. CATÉGORIES DE COURS (déjà insérées dans 001)
-- Pas besoin de réinsérer

-- 3. INSTRUCTEURS DE TEST
INSERT INTO instructors (
  id,
  tenant_id,
  first_name,
  last_name,
  email,
  phone,
  license_number,
  categories,
  languages,
  weekly_hours,
  max_students,
  rating,
  total_reviews,
  status
) VALUES
(
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'Pierre',
  'MAILLARD',
  'pierre.maillard@autoecolegeneve.ch',
  '+41 79 123 45 67',
  'CHE-123456',
  ARRAY['B', 'A'],
  ARRAY['fr', 'en'],
  35,
  12,
  4.8,
  156,
  'active'
),
(
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'Sophie',
  'MARTIN',
  'sophie.martin@autoecolegeneve.ch',
  '+41 79 234 56 78',
  'CHE-234567',
  ARRAY['B', 'C'],
  ARRAY['fr', 'de'],
  40,
  15,
  4.9,
  203,
  'active'
),
(
  '10000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  'Marc',
  'DUBOIS',
  'marc.dubois@autoecolegeneve.ch',
  '+41 79 345 67 89',
  'CHE-345678',
  ARRAY['B', 'A', 'Moto'],
  ARRAY['fr', 'it'],
  30,
  10,
  4.7,
  98,
  'active'
)
ON CONFLICT (id) DO NOTHING;

-- 4. ÉTUDIANTS DE TEST
INSERT INTO students (
  id,
  tenant_id,
  first_name,
  last_name,
  email,
  phone,
  date_of_birth,
  address,
  city,
  postal_code,
  canton,
  avs_number,
  nationality,
  faber_number,
  categories,
  current_category,
  theory_hours_completed,
  practical_hours_completed,
  total_lessons_completed,
  assigned_instructor_id,
  faber_consent,
  cgu_consent,
  rgpd_consent,
  newsletter_consent,
  consent_date,
  payment_status,
  total_paid,
  status
) VALUES
(
  '20000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'Kevin',
  'WEBER',
  'kevin.weber@gmail.com',
  '+41 79 456 78 90',
  '2004-03-15',
  'Avenue de France 23',
  'Genève',
  '1202',
  'GE',
  '756.1234.5678.90',
  'CH',
  'FABER-2024-001234',
  ARRAY['B'],
  'B',
  8,
  15,
  15,
  '10000000-0000-0000-0000-000000000001',
  TRUE,
  TRUE,
  TRUE,
  TRUE,
  NOW(),
  'partial',
  1200.00,
  'active'
),
(
  '20000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'Marie',
  'PETIT',
  'marie.petit@gmail.com',
  '+41 79 567 89 01',
  '2003-07-22',
  'Rue de Carouge 45',
  'Genève',
  '1205',
  'GE',
  '756.2345.6789.01',
  'CH',
  'FABER-2024-001235',
  ARRAY['B'],
  'B',
  8,
  8,
  8,
  '10000000-0000-0000-0000-000000000002',
  TRUE,
  TRUE,
  TRUE,
  FALSE,
  NOW(),
  'paid',
  2500.00,
  'active'
),
(
  '20000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  'Lucas',
  'BERNARD',
  'lucas.bernard@gmail.com',
  '+41 79 678 90 12',
  '2005-11-08',
  'Boulevard Carl-Vogt 89',
  'Genève',
  '1205',
  'GE',
  '756.3456.7890.12',
  'FR',
  'FABER-2024-001236',
  ARRAY['B', 'A'],
  'B',
  8,
  25,
  25,
  '10000000-0000-0000-0000-000000000001',
  TRUE,
  TRUE,
  TRUE,
  TRUE,
  NOW(),
  'paid',
  3800.00,
  'active'
)
ON CONFLICT (id) DO NOTHING;

-- 5. VÉHICULES DE TEST
INSERT INTO vehicles (
  id,
  tenant_id,
  brand,
  model,
  year,
  color,
  license_plate,
  category,
  transmission,
  status,
  last_service_date,
  next_service_date,
  mileage,
  assigned_instructor_id
) VALUES
(
  '30000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'Volkswagen',
  'Golf 8',
  2023,
  'Blanc',
  'GE 123456',
  'B',
  'manual',
  'active',
  '2024-12-15',
  '2025-06-15',
  45000,
  '10000000-0000-0000-0000-000000000001'
),
(
  '30000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'Toyota',
  'Corolla',
  2024,
  'Gris',
  'GE 234567',
  'B',
  'automatic',
  'active',
  '2025-01-10',
  '2025-07-10',
  12000,
  '10000000-0000-0000-0000-000000000002'
),
(
  '30000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  'BMW',
  'F 850 GS',
  2023,
  'Noir',
  'GE 345678',
  'A',
  'manual',
  'active',
  '2024-11-20',
  '2025-05-20',
  8500,
  '10000000-0000-0000-0000-000000000003'
)
ON CONFLICT (id) DO NOTHING;

-- 6. COURS THÉORIQUES DE TEST
INSERT INTO courses (
  id,
  tenant_id,
  category_id,
  title,
  type,
  start_date,
  end_date,
  total_sessions,
  session_duration_minutes,
  location,
  room,
  instructor_id,
  max_participants,
  current_participants,
  price,
  status
) VALUES
(
  '40000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  (SELECT id FROM course_categories WHERE code = 'CTC' LIMIT 1),
  'CTC Février 2025 - Semaine',
  'weekday',
  '2025-02-03',
  '2025-02-07',
  5,
  120,
  'Auto-École Genève Centre',
  'Salle A',
  '10000000-0000-0000-0000-000000000001',
  12,
  8,
  150.00,
  'scheduled'
),
(
  '40000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  (SELECT id FROM course_categories WHERE code = 'PS' LIMIT 1),
  'Sensibilisation Mars 2025 - Weekend',
  'weekend',
  '2025-03-08',
  '2025-03-09',
  2,
  240,
  'Auto-École Genève Centre',
  'Salle B',
  '10000000-0000-0000-0000-000000000002',
  12,
  5,
  300.00,
  'scheduled'
)
ON CONFLICT (id) DO NOTHING;

-- 7. LEÇONS PRATIQUES DE TEST
INSERT INTO lessons (
  id,
  tenant_id,
  student_id,
  instructor_id,
  date,
  start_time,
  end_time,
  duration_minutes,
  lesson_type,
  category,
  pickup_location,
  dropoff_location,
  vehicle_id,
  price,
  payment_status,
  status
) VALUES
(
  '50000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  '2025-02-05',
  '09:00:00',
  '09:50:00',
  50,
  'practical',
  'B',
  'Avenue de France 23, Genève',
  'Avenue de France 23, Genève',
  '30000000-0000-0000-0000-000000000001',
  90.00,
  'paid',
  'scheduled'
),
(
  '50000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000002',
  '2025-02-05',
  '10:00:00',
  '10:50:00',
  50,
  'practical',
  'B',
  'Rue de Carouge 45, Genève',
  'Rue de Carouge 45, Genève',
  '30000000-0000-0000-0000-000000000002',
  90.00,
  'paid',
  'scheduled'
),
(
  '50000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  '2025-02-06',
  '14:00:00',
  '14:50:00',
  50,
  'motorway',
  'B',
  'Boulevard Carl-Vogt 89, Genève',
  'Boulevard Carl-Vogt 89, Genève',
  '30000000-0000-0000-0000-000000000001',
  100.00,
  'paid',
  'scheduled'
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- FIN DU SEED
-- =====================================================
-- ✅ 1 Tenant de test
-- ✅ 3 Instructeurs
-- ✅ 3 Étudiants
-- ✅ 3 Véhicules
-- ✅ 2 Cours théoriques
-- ✅ 3 Leçons pratiques
-- 
-- Vous pouvez maintenant tester l'application !
-- =====================================================

