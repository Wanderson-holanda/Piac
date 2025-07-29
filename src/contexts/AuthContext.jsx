/**
 * AuthContext - Contexto de Autenticação
 * 
 * Gerencia o estado global de autenticação da aplicação.
 * Responsável por login, logout, registro e validação de usuários.
 * 
 * Funcionalidades:
 * - Autenticação com dados mockados para desenvolvimento
 * - Persistência de dados no localStorage
 * - Proteção de rotas baseada em roles (admin, partner, client)
 * - Loading states durante operações assíncronas
 */

import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'
import { terminalLogger } from '../services/terminalLogger'

// Criação do contexto de autenticação
const AuthContext = createContext({})

/**
 * Hook personalizado para acessar o contexto de autenticação
 * @returns {Object} Objeto com estados e funções de autenticação
 * @throws {Error} Erro se usado fora do AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

/**
 * AuthProvider - Provedor do contexto de autenticação
 * @param {Object} props - Props do componente
 * @param {ReactNode} props.children - Componentes filhos
 */
export const AuthProvider = ({ children }) => {
  // Estado do usuário logado (null = não logado)
  const [user, setUser] = useState(null)
  
  // Estado de carregamento para operações assíncronas
  const [loading, setLoading] = useState(true)

  /**
   * Efeito executado na inicialização do componente
   * Verifica se existe um usuário logado no localStorage
   */
  useEffect(() => {
    const checkAuth = async () => {
      terminalLogger.auth('Verificando autenticação existente...')
      
      try {
        // Busca token e dados do usuário no localStorage
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        
        if (token && userData) {
          terminalLogger.auth('Token encontrado, restaurando sessão')
          // Para desenvolvimento: usar dados do localStorage sem validar com API
          // TODO: Quando implementar backend, trocar por validação real
          const user = JSON.parse(userData)
          setUser(user)
          terminalLogger.success(`Usuário autenticado: ${user.name} (${user.role})`, user)
        } else {
          terminalLogger.auth('Nenhuma sessão encontrada')
        }
      } catch (error) {
        terminalLogger.error('Erro ao validar token', error)
        // Remove dados corrompidos do localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } finally {
        // Para o loading independente do resultado
        setLoading(false)
        terminalLogger.auth('Verificação de autenticação concluída')
      }
    }

    checkAuth()
  }, [])

  /**
   * Função de login - Autentica o usuário no sistema
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<Object>} Dados do usuário e token
   * @throws {Error} Erro de credenciais inválidas
   */
  const login = async (email, password) => {
    terminalLogger.auth(`Tentativa de login para: ${email}`)
    
    try {
      // Para desenvolvimento: usar autenticação mockada
      // TODO: Trocar por chamada real da API quando backend estiver pronto
      const mockUsers = {
        'cliente@teste.com': { 
          id: 1, 
          email: 'cliente@teste.com', 
          role: 'client', 
          name: 'Cliente Teste' 
        },
        'parceiro@teste.com': { 
          id: 2, 
          email: 'parceiro@teste.com', 
          role: 'partner', 
          name: 'Parceiro Teste' 
        },
        'admin@teste.com': { 
          id: 3, 
          email: 'admin@teste.com', 
          role: 'admin', 
          name: 'Admin Teste' 
        }
      }

      const user = mockUsers[email]
      
      // Validação simples de credenciais (desenvolvimento apenas)
      if (user && password === '123456') {
        const token = 'mock_token_' + Date.now()
        
        terminalLogger.debug('Atualizando estado do usuário...')
        // Atualiza estado global
        setUser(user)
        
        terminalLogger.debug('Persistindo dados no localStorage...')
        // Persiste dados no localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        terminalLogger.success(`Login realizado com sucesso: ${user.name} (${user.role})`, {
          userId: user.id,
          role: user.role,
          token: token.substring(0, 20) + '...'
        })
        
        const result = { user, token }
        terminalLogger.debug('Retornando resultado do login', result)
        return result
      } else {
        terminalLogger.warn(`Login falhou para: ${email} - Credenciais inválidas`)
        throw new Error('Credenciais inválidas')
      }
    } catch (error) {
      terminalLogger.error('Erro durante o login', {
        error: error.message,
        stack: error.stack,
        email: email
      })
      throw error
    }
  }

  /**
   * Função de registro de novos usuários
   * @param {Object} userData - Dados do usuário para registro
   * @returns {Promise<Object>} Resposta do registro
   * @throws {Error} Erro durante o registro
   * 
   * TODO: Implementar lógica de registro quando backend estiver pronto
   */
  const register = async (userData) => {
    try {
      // Placeholder para registro - implementar com API real
      const response = await authService.register(userData)
      return response
    } catch (error) {
      throw error
    }
  }

  /**
   * Função de logout - Remove autenticação do usuário
   * Limpa estados locais e dados persistidos
   */
  const logout = () => {
    const currentUser = user?.name || 'Usuário desconhecido'
    terminalLogger.auth(`Logout iniciado para: ${currentUser}`)
    
    // Limpa estado global
    setUser(null)
    
    // Remove dados do localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    terminalLogger.success('Logout realizado com sucesso')
    
    // TODO: Quando implementar backend, descomentar linha abaixo
    // authService.logout()
  }

  // Objeto com valores expostos pelo contexto
  const value = {
    user,              // Dados do usuário logado
    login,             // Função de login
    register,          // Função de registro
    logout,            // Função de logout
    loading,           // Estado de carregamento
    isAuthenticated: !!user,  // Boolean indicando se está autenticado
  }

  // Provê o contexto para componentes filhos
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
