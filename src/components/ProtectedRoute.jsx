/**
 * ProtectedRoute - Componente de proteção de rotas
 * 
 * Funcionalidades:
 * - Verifica se o usuário está autenticado
 * - Valida se o usuário tem o role necessário para acessar a rota
 * - Redireciona usuários não autenticados para login
 * - Redireciona usuários com role incorreto para seu dashboard
 * - Exibe loading durante verificação de autenticação
 * 
 * @param {Object} props - Props do componente
 * @param {ReactNode} props.children - Componente a ser renderizado se autorizado
 * @param {string} props.requiredRole - Role necessário para acessar a rota
 */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { CircularProgress, Box } from '@mui/material'

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, isAuthenticated } = useAuth()

  // Exibe loading enquanto verifica autenticação
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  // Redireciona para login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Verifica role do usuário se especificado
  if (requiredRole && user.role !== requiredRole) {
    // Mapa de redirecionamento baseado no role do usuário
    const redirectMap = {
      admin: '/admin',
      partner: '/partner',
      client: '/client',
    }
    
    // Redireciona para o dashboard apropriado ou login se role inválido
    return <Navigate to={redirectMap[user.role] || '/login'} replace />
  }

  // Renderiza o componente filho se todas as validações passaram
  return children
}
