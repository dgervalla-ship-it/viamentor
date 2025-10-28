import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// ES Module equivalent of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // P1.1 - Image Optimization (WebP)
    // P1.2 - PWA (à décommenter après installation)
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.ico', 'robots.txt'],
    //   manifest: {
    //     name: 'Viamentor',
    //     short_name: 'Viamentor',
    //     description: 'Plateforme de gestion auto-écoles suisse',
    //     theme_color: '#0ea5e9',
    //     icons: [
    //       { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
    //       { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
    //     ],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      'pages': path.resolve(__dirname, './src/pages'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '(components)': path.resolve(__dirname, './src/(components)'),
      '@viamentor': path.resolve(__dirname, './src/viamentor'),
    }
  },
  // P0 - Performance Optimizations
  build: {
    // Code splitting optimisé
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks séparés pour meilleur caching
          'react-vendor': ['react', 'react-dom'],
          'react-query': ['@tanstack/react-query'],
          'ui-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tooltip',
          ],
          'ui-icons': ['lucide-react', '@heroicons/react'],
          'charts': ['recharts'],
          'animations': ['framer-motion'],
          'supabase': ['@supabase/supabase-js'],
        },
      },
    },
    // Minification optimisée
    minify: 'esbuild',
    target: 'es2020',
    sourcemap: false, // Production
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Performance
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@tanstack/react-query',
      'lucide-react',
    ],
  },
})
