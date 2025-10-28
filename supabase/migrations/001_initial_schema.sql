-- =====================================================
-- VIAMENTOR - Migration Initiale Base de Données
-- =====================================================
-- Auteur: Viamentor Team
-- Date: 2025-01-28
-- Description: Création tables principales + RLS policies
-- =====================================================

-- Extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. TENANTS (Multi-tenant)
-- =====================================================
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  
  -- Localisation
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(10),
  canton VARCHAR(2), -- CH, GE, VD, FR, etc.
  country VARCHAR(2) DEFAULT 'CH',
  
  -- Contact
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  
  -- Branding
  logo_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#3B82F6',
  
  -- Plan & Billing
  plan VARCHAR(50) DEFAULT 'starter', -- starter, professional, enterprise
  max_students INTEGER DEFAULT 50,
  max_instructors INTEGER DEFAULT 5,
  
  -- Status
  status VARCHAR(20) DEFAULT 'active', -- active, suspended, trial, cancelled
  trial_ends_at TIMESTAMP,
  
  -- Metadata
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour recherche rapide
CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_status ON tenants(status);

-- =====================================================
-- 2. USERS (Auth + Roles)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Profile
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  
  -- Role
  role VARCHAR(50) DEFAULT 'student', -- super_admin, school_admin, instructor, student, secretary
  
  -- Preferences
  language VARCHAR(2) DEFAULT 'fr', -- fr, de, it, en
  timezone VARCHAR(50) DEFAULT 'Europe/Zurich',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  
  -- Status
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
  last_login_at TIMESTAMP,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- =====================================================
-- 3. STUDENTS (Élèves)
-- =====================================================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Informations personnelles
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  date_of_birth DATE,
  
  -- Adresse
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(10),
  canton VARCHAR(2),
  
  -- Identité suisse
  avs_number VARCHAR(16), -- 756.1234.5678.90
  nationality VARCHAR(2) DEFAULT 'CH',
  
  -- Formation
  faber_number VARCHAR(20) UNIQUE,
  categories VARCHAR(50)[], -- ['B', 'A', 'C']
  current_category VARCHAR(2),
  
  -- Progression
  theory_hours_completed INTEGER DEFAULT 0,
  practical_hours_completed INTEGER DEFAULT 0,
  total_lessons_completed INTEGER DEFAULT 0,
  
  -- Examens
  theory_exam_date DATE,
  theory_exam_passed BOOLEAN DEFAULT FALSE,
  practical_exam_date DATE,
  practical_exam_passed BOOLEAN DEFAULT FALSE,
  
  -- Moniteur assigné
  assigned_instructor_id UUID,
  
  -- Consentements
  faber_consent BOOLEAN DEFAULT FALSE,
  cgu_consent BOOLEAN DEFAULT FALSE,
  rgpd_consent BOOLEAN DEFAULT FALSE,
  newsletter_consent BOOLEAN DEFAULT FALSE,
  consent_date TIMESTAMP,
  
  -- Paiement
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, partial, paid
  total_paid DECIMAL(10,2) DEFAULT 0,
  
  -- Status
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, graduated, dropped
  
  -- Notes internes
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_students_tenant ON students(tenant_id);
CREATE INDEX idx_students_instructor ON students(assigned_instructor_id);
CREATE INDEX idx_students_faber ON students(faber_number);
CREATE INDEX idx_students_status ON students(status);

-- =====================================================
-- 4. INSTRUCTORS (Moniteurs)
-- =====================================================
CREATE TABLE IF NOT EXISTS instructors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Informations
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  
  -- Certifications
  license_number VARCHAR(50),
  categories VARCHAR(50)[], -- ['B', 'A', 'C', 'D', 'Moto']
  
  -- Langues
  languages VARCHAR(50)[], -- ['fr', 'de', 'en']
  
  -- Disponibilité
  weekly_hours INTEGER DEFAULT 35,
  max_students INTEGER DEFAULT 12,
  
  -- Véhicules
  assigned_vehicle_ids UUID[],
  
  -- Évaluations
  rating DECIMAL(2,1) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  
  -- Status
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, vacation
  
  -- Metadata
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_instructors_tenant ON instructors(tenant_id);
CREATE INDEX idx_instructors_status ON instructors(status);

-- =====================================================
-- 5. COURSE_CATEGORIES (CTC, Premier Secours, etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS course_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Informations
  code VARCHAR(20) NOT NULL, -- CTC, PS, SENS, MOTO
  name_fr VARCHAR(255) NOT NULL,
  name_de VARCHAR(255),
  name_it VARCHAR(255),
  name_en VARCHAR(255),
  
  -- Description
  description_fr TEXT,
  description_de TEXT,
  description_it TEXT,
  description_en TEXT,
  
  -- Durée
  duration_hours INTEGER NOT NULL, -- 8h pour CTC, 10h pour PS
  
  -- Prix
  price DECIMAL(10,2) NOT NULL,
  
  -- Règles
  max_participants INTEGER DEFAULT 12,
  min_age INTEGER DEFAULT 16,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_course_categories_tenant ON course_categories(tenant_id);
CREATE INDEX idx_course_categories_code ON course_categories(code);

-- =====================================================
-- 6. COURSES (Sessions de cours théoriques)
-- =====================================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES course_categories(id) ON DELETE CASCADE,
  
  -- Informations
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- weekday, weekend, intensive
  
  -- Dates
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  
  -- Sessions multiples
  total_sessions INTEGER DEFAULT 1,
  session_duration_minutes INTEGER DEFAULT 120,
  
  -- Localisation
  location VARCHAR(255),
  room VARCHAR(100),
  
  -- Instructeur
  instructor_id UUID REFERENCES instructors(id) ON DELETE SET NULL,
  
  -- Participants
  max_participants INTEGER DEFAULT 12,
  current_participants INTEGER DEFAULT 0,
  
  -- Prix
  price DECIMAL(10,2),
  
  -- Status
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, in_progress, completed, cancelled
  
  -- Metadata
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_courses_tenant ON courses(tenant_id);
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_dates ON courses(start_date, end_date);

-- =====================================================
-- 7. COURSE_SESSIONS (Séances individuelles)
-- =====================================================
CREATE TABLE IF NOT EXISTS course_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Session
  session_number INTEGER NOT NULL, -- 1, 2, 3...
  title VARCHAR(255),
  
  -- Date & heure
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  
  -- Localisation
  location VARCHAR(255),
  room VARCHAR(100),
  
  -- Status
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, completed, cancelled
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_course_sessions_course ON course_sessions(course_id);
CREATE INDEX idx_course_sessions_date ON course_sessions(date);

-- =====================================================
-- 8. COURSE_PARTICIPANTS (Inscriptions)
-- =====================================================
CREATE TABLE IF NOT EXISTS course_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  
  -- Inscription
  enrolled_at TIMESTAMP DEFAULT NOW(),
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, refunded
  amount_paid DECIMAL(10,2) DEFAULT 0,
  
  -- Présences (array des session_ids présentes)
  attended_sessions UUID[],
  
  -- Certificat
  certificate_issued BOOLEAN DEFAULT FALSE,
  certificate_issued_at TIMESTAMP,
  certificate_url TEXT,
  
  -- Status
  status VARCHAR(20) DEFAULT 'enrolled', -- enrolled, completed, dropped
  
  -- Metadata
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(course_id, student_id)
);

CREATE INDEX idx_course_participants_course ON course_participants(course_id);
CREATE INDEX idx_course_participants_student ON course_participants(student_id);

-- =====================================================
-- 9. LESSONS (Leçons pratiques)
-- =====================================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Participants
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES instructors(id) ON DELETE CASCADE,
  
  -- Date & heure
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 50,
  
  -- Type
  lesson_type VARCHAR(50) DEFAULT 'practical', -- practical, motorway, night, parking
  category VARCHAR(2), -- B, A, C, etc.
  
  -- Localisation
  pickup_location VARCHAR(255),
  dropoff_location VARCHAR(255),
  
  -- Véhicule
  vehicle_id UUID,
  
  -- Évaluation
  student_rating INTEGER, -- 1-5
  instructor_notes TEXT,
  skills_practiced TEXT[],
  
  -- Status
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, completed, cancelled, no_show
  cancellation_reason TEXT,
  cancelled_at TIMESTAMP,
  
  -- Paiement
  price DECIMAL(10,2),
  payment_status VARCHAR(20) DEFAULT 'pending',
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_lessons_tenant ON lessons(tenant_id);
CREATE INDEX idx_lessons_student ON lessons(student_id);
CREATE INDEX idx_lessons_instructor ON lessons(instructor_id);
CREATE INDEX idx_lessons_date ON lessons(date);
CREATE INDEX idx_lessons_status ON lessons(status);

-- =====================================================
-- 10. VEHICLES (Véhicules)
-- =====================================================
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Informations
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER,
  color VARCHAR(50),
  
  -- Immatriculation
  license_plate VARCHAR(20) UNIQUE NOT NULL,
  vin VARCHAR(50),
  
  -- Type
  category VARCHAR(2) NOT NULL, -- B, A, C, etc.
  transmission VARCHAR(20) DEFAULT 'manual', -- manual, automatic
  
  -- Status
  status VARCHAR(20) DEFAULT 'active', -- active, maintenance, inactive
  
  -- Maintenance
  last_service_date DATE,
  next_service_date DATE,
  mileage INTEGER DEFAULT 0,
  
  -- Assignation
  assigned_instructor_id UUID REFERENCES instructors(id) ON DELETE SET NULL,
  
  -- Metadata
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_vehicles_tenant ON vehicles(tenant_id);
CREATE INDEX idx_vehicles_category ON vehicles(category);
CREATE INDEX idx_vehicles_status ON vehicles(status);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS sur toutes les tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES RLS
-- =====================================================

-- Fonction helper pour obtenir le tenant_id de l'utilisateur
-- Note: Créée dans le schéma public au lieu de auth pour éviter les problèmes de permissions
CREATE OR REPLACE FUNCTION public.user_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM public.users WHERE id = auth.uid();
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- TENANTS: Les users voient leur propre tenant
CREATE POLICY "Users can view their own tenant"
  ON tenants FOR SELECT
  USING (id = public.user_tenant_id());

-- USERS: Les users voient les users du même tenant
CREATE POLICY "Users can view users in their tenant"
  ON users FOR SELECT
  USING (tenant_id = public.user_tenant_id());

-- STUDENTS: Les users voient les étudiants de leur tenant
CREATE POLICY "Users can view students in their tenant"
  ON students FOR SELECT
  USING (tenant_id = public.user_tenant_id());

CREATE POLICY "Users can create students in their tenant"
  ON students FOR INSERT
  WITH CHECK (tenant_id = public.user_tenant_id());

CREATE POLICY "Users can update students in their tenant"
  ON students FOR UPDATE
  USING (tenant_id = public.user_tenant_id());

-- INSTRUCTORS: Les users voient les instructeurs de leur tenant
CREATE POLICY "Users can view instructors in their tenant"
  ON instructors FOR SELECT
  USING (tenant_id = public.user_tenant_id());

-- COURSES: Les users voient les cours de leur tenant
CREATE POLICY "Users can view courses in their tenant"
  ON courses FOR SELECT
  USING (tenant_id = public.user_tenant_id());

CREATE POLICY "Users can create courses in their tenant"
  ON courses FOR INSERT
  WITH CHECK (tenant_id = public.user_tenant_id());

-- LESSONS: Les users voient les leçons de leur tenant
CREATE POLICY "Users can view lessons in their tenant"
  ON lessons FOR SELECT
  USING (tenant_id = public.user_tenant_id());

CREATE POLICY "Users can create lessons in their tenant"
  ON lessons FOR INSERT
  WITH CHECK (tenant_id = public.user_tenant_id());

-- VEHICLES: Les users voient les véhicules de leur tenant
CREATE POLICY "Users can view vehicles in their tenant"
  ON vehicles FOR SELECT
  USING (tenant_id = public.user_tenant_id());

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON instructors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DONNÉES INITIALES (Seed)
-- =====================================================

-- Catégories de cours standard
INSERT INTO course_categories (code, name_fr, name_de, name_it, name_en, duration_hours, price, max_participants) VALUES
('CTC', 'Cours de premiers secours', 'Kurs in Nothilfe', 'Corso di primo soccorso', 'First Aid Course', 10, 150.00, 12),
('PS', 'Cours de sensibilisation', 'Kurs in Verkehrskunde', 'Corso di sensibilizzazione', 'Traffic Awareness Course', 8, 300.00, 12),
('SENS', 'Cours de sensibilisation', 'Verkehrskundeunterricht', 'Corso di teoria della circolazione', 'Traffic Theory Course', 8, 300.00, 12),
('MOTO', 'Cours moto', 'Motorradkurs', 'Corso moto', 'Motorcycle Course', 12, 500.00, 8)
ON CONFLICT DO NOTHING;

-- Commit
COMMIT;

-- =====================================================
-- FIN DE LA MIGRATION
-- =====================================================
-- ✅ Tables créées
-- ✅ Index créés
-- ✅ RLS activé
-- ✅ Policies créées
-- ✅ Triggers créés
-- ✅ Données initiales insérées
-- 
-- Prochaines étapes :
-- 1. Créer un tenant test
-- 2. Créer un utilisateur admin
-- 3. Tester les connexions depuis l'app
-- =====================================================

