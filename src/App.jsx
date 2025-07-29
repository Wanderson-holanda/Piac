/**
 * App.jsx - Componente principal da aplicação
 * 
 * Responsabilidades:
 * - Configuração do tema Material-UI
 * - Definição das rotas da aplicação
 * - Wrapper de autenticação para toda a aplicação
 * - Proteção de rotas baseada em roles de usuário
 * 
 * Estrutura de Rotas:
 * - / : Landing page (pública)
 * - /login : Página de login (pública)
 * - /register : Página de registro (pública)
 * - /partner/* : Dashboard do parceiro (protegida)
 * - /client/* : Dashboard do cliente (protegida)
 * - /admin/* : Dashboard administrativo (protegida)
 */

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

// Importação das páginas
import Login from './pages/Login'
import Register from './pages/Register'
import PartnerDashboard from './pages/PartnerDashboard'
import ClientDashboard from './pages/ClientDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Landing from './pages/Landing'

/**
 * Configuração do tema personalizado Material-UI
 * 
 * Cores principais:
 * - Primary: Azul (#1976d2) - Cor principal da PIAC
 * - Secondary: Rosa (#dc004e) - Cor de destaque
 * - Background: Cinza claro (#f5f5f5) - Fundo padrão
 * 
 * Tipografia: Inter como fonte principal
 * Componentes customizados: Botões arredondados e cards com sombra
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',    // Azul principal da PIAC
      light: '#42a5f5',   // Variação clara
      dark: '#1565c0',    // Variação escura
    },
    secondary: {
      main: '#dc004e',    // Rosa de destaque
    },
    background: {
      default: '#f5f5f5', // Fundo cinza claro
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,    // Títulos principais em negrito
    },
    h2: {
      fontWeight: 600,    // Subtítulos em negrito
    },
    h3: {
      fontWeight: 500,    // Títulos menores semi-negrito
    },
  },
  components: {
    // Customização dos botões
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,        // Bordas arredondadas
          textTransform: 'none',  // Sem transformação de texto
          fontWeight: 500,        // Peso da fonte
        },
      },
    },
    // Customização dos cards
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,                    // Bordas bem arredondadas
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Sombra sutil
        },
      },
    },
  },
})

/**
 * Componente principal da aplicação
 * @returns {JSX.Element} Estrutura completa da aplicação
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Reset CSS global do Material-UI */}
      <CssBaseline />
      
      {/* Provedor de contexto de autenticação */}
      <AuthProvider>
        <Routes>
          {/* Rotas públicas - acessíveis sem login */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rotas protegidas - requerem autenticação e role específico */}
          
          {/* Dashboard do Parceiro - role: "partner" */}
          <Route 
            path="/partner/*" 
            element={
              <ProtectedRoute requiredRole="partner">
                <PartnerDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Dashboard do Cliente - role: "client" */}
          <Route 
            path="/client/*" 
            element={
              <ProtectedRoute requiredRole="client">
                <ClientDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Dashboard Administrativo - role: "admin" */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Rota fallback - redireciona para login se rota não encontrada */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
