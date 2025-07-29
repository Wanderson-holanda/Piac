/**
 * authService - Serviço de autenticação e comunicação com API
 * 
 * Funcionalidades:
 * - Configuração do cliente HTTP (Axios)
 * - Interceptors para autenticação automática
 * - Funções de login, registro e validação
 * - Tratamento centralizado de erros HTTP
 * - Base para integração com backend
 * 
 * Configuração:
 * - URL da API configurável via variável de ambiente
 * - Headers padrão para JSON
 * - Token JWT automático nas requisições
 * - Redirecionamento para login em caso de erro 401
 * 
 * TODO: Implementar todas as funções quando backend estiver pronto
 */

import axios from 'axios'

// URL base da API - configurável via environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

/**
 * Configuração da instância do Axios
 * - BaseURL para todas as requisições
 * - Headers padrão para JSON
 * - Timeout configurável se necessário
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Interceptor de requisição
 * - Adiciona automaticamente o token JWT em todas as requisições
 * - Busca o token do localStorage
 * - Configura header Authorization
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Interceptor de resposta
 * - Trata erros HTTP de forma centralizada
 * - Remove token e redireciona para login em caso de 401
 * - Exibe mensagens de erro apropriadas
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  async validateToken() {
    const response = await api.get('/auth/validate')
    return response.data
  },

  logout() {
    // Implementar logout no backend se necessário
    return Promise.resolve()
  },
}

export const partnerService = {
  async getProfile() {
    const response = await api.get('/partners/profile')
    return response.data
  },

  async getIndicacoes() {
    const response = await api.get('/partners/indicacoes')
    return response.data
  },

  async createIndicacao(dados) {
    const response = await api.post('/partners/indicacoes', dados)
    return response.data
  },

  async getComissoes() {
    const response = await api.get('/partners/comissoes')
    return response.data
  },

  async getLinkUnico() {
    const response = await api.get('/partners/link-unico')
    return response.data
  },
}

export const clientService = {
  async getProfile() {
    const response = await api.get('/clients/profile')
    return response.data
  },

  async getContratos() {
    const response = await api.get('/clients/contratos')
    return response.data
  },

  async getContrato(id) {
    const response = await api.get(`/clients/contratos/${id}`)
    return response.data
  },

  async downloadArquivo(contratoId, arquivoId) {
    const response = await api.get(`/clients/contratos/${contratoId}/arquivos/${arquivoId}`, {
      responseType: 'blob'
    })
    return response.data
  },
}

export const adminService = {
  async getDashboardData() {
    const response = await api.get('/admin/dashboard')
    return response.data
  },

  async getContratos(filters = {}) {
    const response = await api.get('/admin/contratos', { params: filters })
    return response.data
  },

  async getComissoes(filters = {}) {
    const response = await api.get('/admin/comissoes', { params: filters })
    return response.data
  },

  async getIndicacoes(filters = {}) {
    const response = await api.get('/admin/indicacoes', { params: filters })
    return response.data
  },

  async approvePartner(partnerId) {
    const response = await api.patch(`/admin/partners/${partnerId}/approve`)
    return response.data
  },
}

export default api
