/**
 * VIAMENTOR - Contact Public System Guide
 * Guide complet du système de formulaire contact public
 */

// ============================================================================
// OVERVIEW
// ============================================================================

/**
 * # Public Contact Form System
 *
 * Système complet de capture de leads via formulaire contact public
 * avec validation, spam protection, UTM tracking et analytics.
 *
 * ## Routes
 * - `/contact` - Page formulaire contact public (sans authentification)
 * - `/merci` - Page de remerciement après soumission
 *
 * ## Features
 *
 * ### 1. Formulaire Lead Capture
 * - Champs: prénom, nom, email, téléphone, catégorie, message
 * - Validation temps réel avec feedback visuel
 * - Formatage automatique (téléphone suisse +41)
 * - Compteur de caractères (message 500 max)
 * - Checkbox RGPD obligatoire
 * - Auto-save localStorage (draft recovery)
 *
 * ### 2. Protection Spam
 * - Honeypot field (caché, détecte bots)
 * - Rate limiting (3 soumissions/heure/IP)
 * - Browser fingerprinting (Canvas, WebGL, AudioContext)
 * - reCAPTCHA v3 simulation (score >0.5)
 * - Spam keywords detection
 * - Duplicate email check
 *
 * ### 3. UTM Tracking
 * - Extraction automatique des paramètres URL:
 *   - utm_source (google, facebook, instagram, tiktok, referral, direct)
 *   - utm_medium (cpc, social, email, referral)
 *   - utm_campaign (ID campagne)
 *   - utm_content (variant A/B test)
 *   - utm_term (mot-clé)
 * - Metadata tracking:
 *   - referrer (page précédente)
 *   - landing_page (URL entrée)
 *   - user_agent (navigateur)
 *   - ip_address (géolocalisation)
 *   - browser, device, OS
 *   - timestamp ISO 8601
 *
 * ### 4. Analytics Integration
 * - Google Analytics 4 (page_view, generate_lead, conversion)
 * - Meta Pixel (Lead event)
 * - TikTok Pixel (SubmitForm, CompleteRegistration)
 * - Custom events avec valeur LTV
 *
 * ### 5. SEO Optimization
 * - Meta tags (title, description, keywords)
 * - Open Graph (Facebook, LinkedIn)
 * - Twitter Card
 * - Canonical URL
 * - Language alternates (fr, de, it, en)
 * - Structured data (JSON-LD)
 *
 * ### 6. Hero Section
 * - Background image conduite inspirante
 * - Typography h1 "Contactez-nous"
 * - Subtitle encourageant
 * - Responsive design
 *
 * ### 7. Thank You Page
 * - Confirmation visuelle (checkmark animation)
 * - Next steps timeline (3 étapes)
 * - Contact info rapide (téléphone, email)
 * - Social proof (avis, note 4.9/5)
 * - CTA retour accueil / nouvelle demande
 *
 * ## Architecture
 *
 * ### Files Structure
 * ```
 * data/
 *   viamentor-contact-public-i18n.tsx      # Traductions FR/DE/IT/EN
 *   viamentor-contact-public-data.tsx      # Types, validation, mock data
 *
 * components/
 *   viamentor-spam-protection.tsx          # Honeypot, rate limit, fingerprint
 *   viamentor-contact-form-fields.tsx      # Champs formulaire avec validation
 *   viamentor-public-contact-form.tsx      # Formulaire complet avec soumission
 *
 * pages/
 *   viamentor-contact-public-page.tsx      # Page contact avec hero + SEO
 *   viamentor-thank-you-page.tsx           # Page remerciement
 * ```
 *
 * ### Data Flow
 * 1. User lands on `/contact` (UTM params extracted)
 * 2. Form fields auto-save to localStorage (draft)
 * 3. Real-time validation on blur/change
 * 4. Spam protection checks on submit
 * 5. API POST /leads/public (create lead in DB)
 * 6. Email confirmation sent to user
 * 7. Internal notification (email + SMS + Slack)
 * 8. Analytics events fired (GA4, Meta, TikTok)
 * 9. Redirect to `/merci` (thank you page)
 * 10. Conversion tracking pixels fired
 *
 * ## API Endpoints (Backend)
 *
 * ### POST /api/leads/public
 * Create new lead from public contact form
 *
 * Request:
 * ```json
 * {
 *   "firstName": "Sophie",
 *   "lastName": "Martin",
 *   "email": "sophie.martin@example.com",
 *   "phone": "+41 79 123 45 67",
 *   "category": "carB",
 *   "message": "J'aimerais connaître vos tarifs",
 *   "gdprConsent": true,
 *   "utm": {
 *     "utm_source": "google",
 *     "utm_medium": "cpc",
 *     "utm_campaign": "permis-b-2025"
 *   },
 *   "metadata": {
 *     "referrer": "https://www.google.com",
 *     "landing_page": "/landing/google-ads",
 *     "browser": "Chrome",
 *     "device": "Desktop",
 *     "os": "Windows",
 *     "timestamp": "2025-01-15T10:30:00Z"
 *   }
 * }
 * ```
 *
 * Response:
 * ```json
 * {
 *   "success": true,
 *   "leadId": "lead-001",
 *   "message": "Lead created successfully"
 * }
 * ```
 *
 * ### GET /api/leads/check-email
 * Check if email already exists as student
 *
 * Query: `?email=sophie.martin@example.com`
 *
 * Response:
 * ```json
 * {
 *   "exists": false,
 *   "isStudent": false
 * }
 * ```
 *
 * ## Database Schema
 *
 * ### Table: leads
 * ```sql
 * CREATE TABLE leads (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   first_name VARCHAR(50) NOT NULL,
 *   last_name VARCHAR(50) NOT NULL,
 *   email VARCHAR(255) NOT NULL,
 *   phone VARCHAR(20) NOT NULL,
 *   category VARCHAR(50) NOT NULL,
 *   message TEXT,
 *   gdpr_consent BOOLEAN NOT NULL DEFAULT false,
 *
 *   -- UTM Tracking
 *   utm_source VARCHAR(50),
 *   utm_medium VARCHAR(50),
 *   utm_campaign VARCHAR(100),
 *   utm_content VARCHAR(100),
 *   utm_term VARCHAR(100),
 *
 *   -- Metadata
 *   referrer TEXT,
 *   landing_page TEXT,
 *   user_agent TEXT,
 *   ip_address INET,
 *   browser VARCHAR(50),
 *   device VARCHAR(50),
 *   os VARCHAR(50),
 *   fingerprint VARCHAR(100),
 *
 *   -- Status
 *   status VARCHAR(20) DEFAULT 'new',
 *   assigned_to UUID REFERENCES users(id),
 *   converted_to_student_id UUID REFERENCES students(id),
 *
 *   -- Timestamps
 *   created_at TIMESTAMP DEFAULT NOW(),
 *   updated_at TIMESTAMP DEFAULT NOW(),
 *
 *   -- Indexes
 *   INDEX idx_leads_email (email),
 *   INDEX idx_leads_status (status),
 *   INDEX idx_leads_created_at (created_at),
 *   INDEX idx_leads_utm_source (utm_source)
 * );
 * ```
 *
 * ## Email Templates
 *
 * ### Confirmation Email (to prospect)
 * Subject: `Merci {firstName}! Demande reçue - Réponse sous 24h`
 *
 * Body:
 * ```
 * Bonjour {firstName},
 *
 * Merci pour votre demande de contact concernant {category}.
 *
 * Nous avons bien reçu votre message et nous vous contacterons
 * sous 24h ouvrables pour discuter de votre formation.
 *
 * En attendant, n'hésitez pas à nous contacter:
 * - Téléphone: {schoolPhone}
 * - Email: {schoolEmail}
 *
 * À très bientôt!
 * L'équipe {schoolName}
 * ```
 *
 * ### Internal Notification (to admin)
 * Subject: `🚨 Nouveau lead: {firstName} {lastName} - {category}`
 *
 * Body:
 * ```
 * Nouveau lead reçu:
 *
 * Nom: {firstName} {lastName}
 * Email: {email}
 * Téléphone: {phone}
 * Catégorie: {category}
 * Message: {message}
 *
 * Source: {utm_source} / {utm_medium} / {utm_campaign}
 * Landing page: {landing_page}
 *
 * Voir le lead: {adminUrl}/leads/{leadId}
 * ```
 *
 * ## Landing Page Variants
 *
 * ### /landing/google-ads
 * - Hero: "Formation conduite dès 90 CHF/leçon"
 * - USP: Prix compétitif, qualité garantie
 * - CTA: "Demander un devis gratuit"
 * - UTM: ?utm_source=google&utm_medium=cpc&utm_campaign=permis-b-2025
 *
 * ### /landing/facebook
 * - Hero: "Rejoignez 2000+ élèves satisfaits"
 * - Social proof: Témoignages, avis 5 étoiles
 * - CTA: "Commencer ma formation"
 * - UTM: ?utm_source=facebook&utm_medium=social&utm_campaign=moto-printemps
 *
 * ### /landing/tiktok
 * - Hero: Video background (moniteurs jeunes, voitures modernes)
 * - Style: Cool, hip, trendy
 * - CTA: "Je veux mon permis!"
 * - UTM: ?utm_source=tiktok&utm_medium=social&utm_campaign=genz-2025
 *
 * ### /landing/referral
 * - Hero: "Votre ami vous recommande ViaMenutor"
 * - Discount: Code "PARRAIN20" (-20% premier forfait)
 * - CTA: "Profiter de l'offre"
 * - UTM: ?utm_source=referral&utm_medium=referral&utm_campaign=parrainage&utm_content=PARRAIN20
 *
 * ## Validation Rules
 *
 * ### First Name / Last Name
 * - Required
 * - 2-50 characters
 * - Letters, accents, hyphens, spaces only
 * - Regex: `/^[a-zA-ZÀ-ÿ\s'-]+$/`
 *
 * ### Email
 * - Required
 * - RFC5322 format
 * - Unique check (not already student)
 * - Regex: `/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/`
 *
 * ### Phone
 * - Required
 * - Swiss format: +41 XX XXX XX XX
 * - E164 international standard
 * - Regex: `/^\+41\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/`
 *
 * ### Category
 * - Required
 * - Enum: carB, motoA, trailerBE, motoLightA1, professionalBPT, awarenessTraining, firstAid, other
 *
 * ### Message
 * - Optional
 * - 0-500 characters
 * - No spam keywords
 * - Max 2 links
 *
 * ### GDPR Consent
 * - Required
 * - Boolean true
 *
 * ## Usage Examples
 *
 * ### Basic Contact Form
 * ```tsx
 * import { ContactPublicPage } from "@/polymet/pages/viamentor-contact-public-page";
 *
 * export default function ContactPage() {
 *   return <ContactPublicPage locale="fr" />;
 * }
 * ```
 *
 * ### Standalone Form Component
 * ```tsx
 * import { PublicContactForm } from "@/polymet/components/viamentor-public-contact-form";
 *
 * export default function MyContactForm() {
 *   return (
 *     <PublicContactForm
 *       locale="fr"
 *       onSuccess={(data) => {
 *         console.log("Lead captured:", data);
 *         // Custom success handling
 *       }}
 *       onError={(error) => {
 *         console.error("Error:", error);
 *         // Custom error handling
 *       }}
 *     />
 *   );
 * }
 * ```
 *
 * ### Custom Validation
 * ```tsx
 * import { validateEmail, validatePhone, validateName } from "@/polymet/data/viamentor-contact-public-data";
 *
 * const email = "test@example.com";
 * if (!validateEmail(email)) {
 *   console.error("Invalid email");
 * }
 *
 * const phone = "+41 79 123 45 67";
 * if (!validatePhone(phone)) {
 *   console.error("Invalid phone");
 * }
 * ```
 *
 * ### Spam Check
 * ```tsx
 * import { checkSpam } from "@/polymet/data/viamentor-contact-public-data";
 *
 * const formData = {
 *   firstName: "John",
 *   lastName: "Doe",
 *   email: "john@example.com",
 *   phone: "+41 79 123 45 67",
 *   category: "carB",
 *   message: "I want to learn driving",
 *   gdprConsent: true,
 * };
 *
 * const spamCheck = checkSpam(formData);
 * if (spamCheck.isSpam) {
 *   console.warn("Spam detected:", spamCheck.reasons);
 * }
 * ```
 *
 * ## Performance Optimization
 *
 * ### Auto-save Debouncing
 * - localStorage save delayed 1 second after last keystroke
 * - Prevents excessive writes
 * - Graceful recovery on browser crash
 *
 * ### Form Validation
 * - Real-time validation on blur (not on every keystroke)
 * - Reduces re-renders
 * - Better UX (less intrusive)
 *
 * ### Analytics Batching
 * - Events sent asynchronously
 * - Non-blocking form submission
 * - Fallback if analytics fails
 *
 * ## Security Considerations
 *
 * ### Rate Limiting
 * - 3 submissions per hour per IP
 * - Prevents abuse and spam
 * - Configurable threshold
 *
 * ### Honeypot
 * - Hidden field that bots fill
 * - Silent rejection (no error shown)
 * - Logged for security monitoring
 *
 * ### CAPTCHA
 * - reCAPTCHA v3 (invisible)
 * - Score threshold >0.5
 * - Fallback to v2 checkbox if score low
 *
 * ### Data Sanitization
 * - XSS prevention (escape HTML)
 * - SQL injection prevention (parameterized queries)
 * - Email validation (prevent header injection)
 *
 * ## Testing
 *
 * ### Unit Tests
 * - Validation functions
 * - Spam detection logic
 * - UTM extraction
 * - Phone formatting
 *
 * ### Integration Tests
 * - Form submission flow
 * - API endpoint responses
 * - Email sending
 * - Analytics tracking
 *
 * ### E2E Tests
 * - Complete user journey
 * - Landing page → Form → Thank you
 * - UTM tracking persistence
 * - Conversion tracking
 *
 * ## Monitoring & Analytics
 *
 * ### Key Metrics
 * - Conversion rate (form views → submissions)
 * - Abandonment rate (started → completed)
 * - Average time to complete
 * - Spam detection rate
 * - Source performance (UTM)
 *
 * ### Dashboards
 * - Real-time lead notifications
 * - Daily/weekly/monthly reports
 * - Source attribution analysis
 * - A/B test results
 *
 * ## Future Enhancements
 *
 * ### Phase 2
 * - Multi-step wizard (progressive disclosure)
 * - Conditional fields based on category
 * - File upload (documents)
 * - Calendar integration (book first lesson)
 *
 * ### Phase 3
 * - Live chat integration
 * - Video call scheduling
 * - AI chatbot pre-qualification
 * - Personalized pricing calculator
 */

export const CONTACT_PUBLIC_SYSTEM_VERSION = "1.0.0";
export const CONTACT_PUBLIC_SYSTEM_LAST_UPDATED = "2025-01-15";
