/**
 * Configuração do Vite - Build tool moderna para React
 * 
 * Funcionalidades:
 * - Hot Module Replacement (HMR) para desenvolvimento rápido
 * - Build otimizada para produção
 * - Servidor de desenvolvimento configurado
 * - Source maps para debugging
 * - Plugins React para JSX e Fast Refresh
 * - Logger customizado para terminal
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import piacLogger from './vite-plugins/piac-logger.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    piacLogger() // Plugin personalizado para logs
  ],
  server: {
    port: 3000,          // Porta padrão para desenvolvimento
    host: true,          // Permite acesso externo (0.0.0.0)
    open: true,          // Abre automaticamente no navegador
  },
  build: {
    outDir: 'dist',      // Diretório de saída para build
    sourcemap: true,     // Gera source maps para debugging
    minify: 'terser',    // Minificação otimizada
    rollupOptions: {
      output: {
        manualChunks: {
          // Separação de chunks para otimização
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          router: ['react-router-dom'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@mui/icons-material']
  }
})
