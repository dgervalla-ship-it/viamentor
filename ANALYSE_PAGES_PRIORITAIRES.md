# 🔍 VIAMENTOR - Analyse Pages Prioritaires

**39 pages avec Mock Data à connecter aux APIs**

---

## 📋 PAGES IDENTIFIÉES

### Imports MOCK Directs (3 pages)

1. **viamentor-students-new-page.tsx**
   - Import: `MOCK_INSTRUCTORS`
   - Usage: Liste moniteurs pour attribution
   - Fix: Remplacer par `useInstructors()`

2. **viamentor-student-detail-page.tsx**
   - Imports: `MOCK_STUDENT_DETAIL`, `MOCK_LESSONS`, `MOCK_PROGRESS_THEMES`, `MOCK_EXAM_RECORDS`, `MOCK_DOCUMENTS`, `MOCK_STUDENT_INVOICES`, `MOCK_CALENDAR_EVENTS`, `MOCK_AUDIT_LOG`
   - Usage: Multiples données pour affichage détail élève
   - Fix: Remplacer par hooks `useStudent()`, `useLessons()`, `useExams()`, `useInvoices()`

3. **viamentor-accountant-page.tsx**
   - Import: Mock data comptable
   - Usage: Dashboard comptabilité
   - Fix: Remplacer par `useInvoices()`, `useTenantsStats()`

