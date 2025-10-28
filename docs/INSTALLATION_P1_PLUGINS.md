# 📦 Installation Plugins P1 - Viamentor

**Optimisations Images WebP + PWA**

---

## P1.1 - OPTIMISATION IMAGES WEBP

### Installation

```bash
npm install -D vite-plugin-imagemin vite-imagetools
```

### Configuration vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 85,
        lossless: false,
      },
      avif: {
        quality: 70,
      },
    }),
  ],
});
```

### Utilisation

```typescript
// Images optimisées automatiquement au build
import logo from './logo.png'; // → logo.webp (si supporté)

<img src={logo} alt="Viamentor" />
```

### Gain Estimé

- **Taille images** : -60%
- **LCP** : -1s
- **Bandwidth** : -50%

---

## P1.2 - SERVICE WORKER PWA

### Installation

```bash
npm install -D vite-plugin-pwa
```

### Configuration vite.config.ts

```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Viamentor - Gestion Auto-Écoles',
        short_name: 'Viamentor',
        description: 'Plateforme SaaS de gestion d\'auto-écoles en Suisse',
        theme_color: '#0ea5e9',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Stratégies de cache
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'viamentor-api',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'viamentor-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'viamentor-static',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 jours
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false, // Désactivé en dev
      },
    }),
  ],
});
```

### Créer les Icons PWA

Télécharger et placer dans `public/` :
- `pwa-192x192.png` (192×192 px)
- `pwa-512x512.png` (512×512 px)
- `apple-touch-icon.png` (180×180 px)

**Outil recommandé** : https://realfavicongenerator.net

### Test PWA

1. Build production : `npm run build`
2. Preview : `npm run preview`
3. Ouvrir Chrome DevTools → Application → Service Workers
4. Vérifier "Manifest" et "Cache Storage"

### Gain Estimé

- **Score PWA** : 0 → 85/100
- **Offline support** : Basic
- **Install prompt** : Activé
- **Performance** : Cache API = +30% vitesse

---

## INSTALLATION COMPLÈTE (1 COMMANDE)

```bash
# Installer tous les plugins P1 ensemble
npm install -D vite-plugin-pwa vite-plugin-image-optimizer

# Build optimisé
npm run build

# Test
npm run preview
```

---

## VÉRIFICATION POST-INSTALLATION

### Checklist

- [ ] Build réussit sans erreurs
- [ ] Bundle size < 600 KB (objectif)
- [ ] Service worker enregistré (DevTools)
- [ ] Images converties WebP
- [ ] Lighthouse Performance > 85
- [ ] PWA installable (prompt affiché)

### Commandes de Vérification

```bash
# Build production
npm run build

# Analyser bundle size
npm run build -- --report

# Preview avec PWA
npm run preview

# Lighthouse audit
npx lighthouse http://localhost:4173 --view
```

---

## TROUBLESHOOTING

### Service Worker ne s'enregistre pas

**Solution** : Vérifier HTTPS (requis pour SW)
- ✅ Production : Vercel = HTTPS automatique
- ⚠️ Local : `npm run preview` (pas `npm run dev`)

### Images pas converties WebP

**Solution** : Build production uniquement
```bash
npm run build  # Images converties
npm run dev    # Pas de conversion
```

### PWA score faible

**Causes possibles** :
- Icons manquantes (192×192, 512×512)
- Manifest.json mal configuré
- Service worker pas enregistré

**Fix** : Vérifier DevTools → Application → Manifest

---

## RESSOURCES

- [Vite PWA Plugin Docs](https://vite-pwa-org.netlify.app/)
- [Workbox Strategies](https://developer.chrome.com/docs/workbox/caching-strategies-overview/)
- [PWA Checklist](https://web.dev/pwa-checklist/)

---

_Guide mis à jour : 28 octobre 2025_

