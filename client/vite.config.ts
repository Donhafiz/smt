import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({

  plugins: [

    react(),

    VitePWA({

      registerType: 'autoUpdate',
      
      devOptions: {
        enabled: true
      },

      includeAssets: [
        'favicon.svg'
      ],

      manifest: {

        name: 'SMT ERP',

        short_name: 'SMT',

        description:
          'Star Media Tech ERP Platform',

        theme_color: '#020617',

        background_color: '#020617',

        display: 'standalone',

        orientation: 'portrait',

        start_url: '/',

        icons: [

          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png'
          },

          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png'
          }

        ]

      }

    })

  ],

  server: {

    port: 3000,

    proxy: {

      '/api': {

        target: 'http://localhost:5000',

        changeOrigin: true

      }

    }

  }

})