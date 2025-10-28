# ⚡ VIAMENTOR - Optimisations de Performance

**Date** : 28 octobre 2025  
**Objectif** : Lighthouse > 90 sur mobile  
**Cible** : Bundle < 500KB, LCP < 2.5s

---

## 📊 ÉTAT ACTUEL

### Build Actuel

```bash
npm run build
```

```
dist/index.html                    0.46 kB │ gzip:  0.30 kB
dist/assets/index-xxxxx.css       xx.xx kB │ gzip: xx.xx kB
dist/assets/index-xxxxx.js       xxx.xx kB │ gzip: xxx.xx kB
```

### Audit Lighthouse

```bash
# Installer Lighthouse
npm install -g lighthouse

# Audit
lighthouse https://viamentor.vercel.app --view
```

---

## 🎯 OPTIMISATIONS CRITIQUES

### 1. Code Splitting & Lazy Loading

#### ✅ Implémenter React.lazy()

**Avant** :
```typescript
import StudentsList from './pages/students-list';
import InstructorsList from './pages/instructors-list';
```

**Après** :
```typescript
import { lazy, Suspense } from 'react';

const StudentsList = lazy(() => import('./pages/students-list'));
const InstructorsList = lazy(() => import('./pages/instructors-list'));

// Dans le component
<Suspense fallback={<LoadingSpinner />}>
  <StudentsList />
</Suspense>
```

#### 📁 Routes à Lazy Load (Priorité)

```typescript
// src/App.tsx
const StudentsPage = lazy(() => import('./viamentor/pages/viamentor-students-page'));
const InstructorsPage = lazy(() => import('./viamentor/pages/viamentor-instructors-page'));
const LessonsPage = lazy(() => import('./viamentor/pages/viamentor-lessons-list-page'));
const InvoicesPage = lazy(() => import('./viamentor/pages/viamentor-invoices-page'));
const DashboardPage = lazy(() => import('./viamentor/pages/viamentor-dashboard-school-page'));
```

**Gain estimé** : -200KB initial bundle

---

### 2. Tree Shaking & Bundle Optimization

#### ✅ Vite Config

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          
          // App chunks
          'students': ['./src/viamentor/pages/viamentor-students-page'],
          'instructors': ['./src/viamentor/pages/viamentor-instructors-page'],
          'lessons': ['./src/viamentor/pages/viamentor-lessons-list-page'],
        },
      },
    },
    
    // Optimisations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer console.log en prod
        drop_debugger: true,
      },
    },
    
    // Source maps (seulement pour Sentry)
    sourcemap: 'hidden',
    
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
  },
});
```

**Gain estimé** : -100KB gzip

---

### 3. Images Optimization

#### ✅ WebP + Lazy Loading

```typescript
// Composant optimisé
export function OptimizedImage({ src, alt, width, height }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      // Formats modernes
      srcSet={`${src}.webp 1x, ${src}@2x.webp 2x`}
      // Fallback
      onError={(e) => {
        e.currentTarget.src = src; // PNG/JPG fallback
      }}
    />
  );
}
```

#### 📦 Image Compression

```bash
# Installer sharp
npm install --save-dev sharp

# Script de compression
node scripts/optimize-images.js
```

```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';
const outputDir = './public/images/optimized';

fs.readdirSync(inputDir).forEach(async (file) => {
  if (file.match(/\.(jpg|jpeg|png)$/)) {
    await sharp(path.join(inputDir, file))
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/, '.webp')));
    
    console.log(`✅ ${file} → WebP`);
  }
});
```

**Gain estimé** : -60% taille images

---

### 4. Fonts Optimization

#### ✅ Font Display Swap

```css
/* index.css */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-display: swap; /* Évite le FOIT */
  font-weight: 100 900;
}
```

#### ✅ Preload Critical Fonts

```html
<!-- index.html -->
<link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

#### 📦 Subset Fonts (Seulement caractères utilisés)

```bash
# Installer glyphhanger
npm install -g glyphhanger

# Générer subset
glyphhanger https://viamentor.vercel.app --subset=*.woff2 --formats=woff2
```

**Gain estimé** : -150KB fonts

---

### 5. CSS Optimization

#### ✅ PurgeCSS (Tailwind fait déjà ça)

Tailwind supprime automatiquement le CSS inutilisé en production.

#### ✅ Critical CSS Inline

```html
<!-- index.html -->
<style>
  /* Critical CSS inline (< 14KB) */
  body { font-family: Inter, sans-serif; }
  .loader { /* spinner initial */ }
</style>
```

#### ✅ Remove Unused Tailwind

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Désactiver les variantes inutilisées
  corePlugins: {
    float: false,
    objectFit: false,
    objectPosition: false,
  },
};
```

**Gain estimé** : -50KB CSS

---

### 6. JavaScript Optimization

#### ✅ Remove Lodash (Utiliser imports ciblés)

**Avant** :
```typescript
import _ from 'lodash';
_.debounce(fn, 300);
```

**Après** :
```typescript
import debounce from 'lodash/debounce';
debounce(fn, 300);
```

**Ou mieux, utiliser des fonctions natives** :

```typescript
// Debounce natif
function debounce(fn: Function, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
```

**Gain estimé** : -50KB si lodash supprimé

#### ✅ Remove Moment.js (Utiliser date-fns)

**Avant** :
```typescript
import moment from 'moment';
moment().format('DD/MM/YYYY');
```

**Après** :
```typescript
import { format } from 'date-fns';
format(new Date(), 'dd/MM/yyyy');
```

**Gain estimé** : -70KB

---

### 7. React Query Optimization

#### ✅ Prefetching

```typescript
import { useQueryClient } from '@tanstack/react-query';

function StudentsList() {
  const queryClient = useQueryClient();

  const prefetchStudent = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['student', id],
      queryFn: () => studentsService.getById(id),
      staleTime: 5000,
    });
  };

  return (
    <div>
      {students.map(s => (
        <StudentCard 
          key={s.id}
          student={s}
          onMouseEnter={() => prefetchStudent(s.id)}
        />
      ))}
    </div>
  );
}
```

#### ✅ Stale Time

```typescript
// Données qui changent rarement
useQuery({
  queryKey: ['instructors'],
  queryFn: instructorsService.getAll,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Données qui changent souvent
useQuery({
  queryKey: ['lessons', 'today'],
  queryFn: lessonsService.getToday,
  staleTime: 30 * 1000, // 30 secondes
});
```

---

### 8. Memoization

#### ✅ React.memo

```typescript
export const StudentCard = React.memo(function StudentCard({ student }) {
  return <div>{student.name}</div>;
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.student.id === nextProps.student.id;
});
```

#### ✅ useMemo

```typescript
function StudentsList({ students, filter }) {
  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [students, filter]);

  return <div>{/* render */}</div>;
}
```

#### ✅ useCallback

```typescript
function StudentForm() {
  const handleSubmit = useCallback((data: FormData) => {
    studentsService.create(data);
  }, []); // Pas de dépendances = fonction stable

  return <Form onSubmit={handleSubmit} />;
}
```

---

### 9. Network Optimization

#### ✅ HTTP/2 Server Push (Vercel)

Vercel active automatiquement HTTP/2.

#### ✅ Compression Gzip/Brotli

Vercel active automatiquement Brotli.

#### ✅ CDN & Edge Caching

```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, s-maxage=10, stale-while-revalidate=59"
        }
      ]
    }
  ]
}
```

---

### 10. Database Query Optimization

#### ✅ Select Only Needed Fields

**Avant** :
```typescript
const { data } = await supabase.from('students').select('*');
```

**Après** :
```typescript
const { data } = await supabase.from('students')
  .select('id, first_name, last_name, email'); // Seulement les champs nécessaires
```

#### ✅ Indexes

```sql
-- supabase/migrations/003_indexes.sql
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_lessons_date ON lessons(date);
CREATE INDEX idx_lessons_student_id ON lessons(student_id);
CREATE INDEX idx_invoices_student_id ON invoices(student_id);
CREATE INDEX idx_invoices_status ON invoices(status);
```

**Gain estimé** : 10x requêtes plus rapides

---

## 🎯 CHECKLIST OPTIMISATIONS

### Quick Wins (2 heures)

- [ ] ✅ Lazy load toutes les routes
- [ ] ✅ Enable gzip/brotli (Vercel auto)
- [ ] ✅ Optimize images → WebP
- [ ] ✅ Font display: swap
- [ ] ✅ Remove console.log en prod
- [ ] ✅ Tree shaking actif

### Performance Avancée (1 journée)

- [ ] ✅ Code splitting par route
- [ ] ✅ Prefetch hover
- [ ] ✅ React.memo composants lourds
- [ ] ✅ useMemo calculs coûteux
- [ ] ✅ DB indexes
- [ ] ✅ Query optimization

### Monitoring Continu

- [ ] ✅ Vercel Analytics actif
- [ ] ✅ Sentry Performance
- [ ] ✅ Lighthouse CI
- [ ] ✅ Budget alerts (< 500KB)

---

## 📈 RÉSULTATS ATTENDUS

| Métrique | Avant | Après | Target |
|----------|-------|-------|--------|
| **Bundle Size** | ~800KB | ~400KB | < 500KB |
| **LCP** | ~4s | ~2s | < 2.5s |
| **FID** | ~150ms | ~80ms | < 100ms |
| **CLS** | ~0.15 | ~0.05 | < 0.1 |
| **Lighthouse** | ~75 | ~92 | > 90 |

---

## 🚀 QUICK START

### Étape 1 : Lazy Loading (15 min)

Modifier `src/App.tsx` :

```typescript
import { lazy, Suspense } from 'react';

// Lazy load pages
const StudentsPage = lazy(() => import('./viamentor/pages/viamentor-students-page'));
// ... autres pages

function App() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Routes>
        <Route path="/students" element={<StudentsPage />} />
      </Routes>
    </Suspense>
  );
}
```

### Étape 2 : Build Config (5 min)

Mettre à jour `vite.config.ts` avec la config ci-dessus.

### Étape 3 : Test (2 min)

```bash
npm run build
npm run preview
lighthouse http://localhost:4173 --view
```

---

## 📊 MONITORING PERFORMANCE

### Vercel Analytics

👉 https://vercel.com/dotis-projects-c470c3bf/viamentor/analytics

### Web Vitals React Hook

```typescript
import { onCLS, onFID, onLCP } from 'web-vitals';

function reportWebVitals() {
  onCLS(console.log);
  onFID(console.log);
  onLCP(console.log);
}

reportWebVitals();
```

---

## 🎯 OBJECTIFS SEMAINE 4

- [x] ✅ Guide d'optimisation créé
- [ ] ⏳ Lazy loading implémenté
- [ ] ⏳ Images WebP
- [ ] ⏳ Build optimisé
- [ ] ⏳ Lighthouse > 90

---

**⚡ Avec ces optimisations, Viamentor sera ultra-rapide !**

_Mis à jour le 28 octobre 2025_

