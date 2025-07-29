import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Configuração do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token nas requisições
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

// Interceptor para lidar com respostas de erro
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
