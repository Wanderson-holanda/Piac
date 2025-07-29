/**
 * Terminal Logger - Envia logs do navegador para o terminal do VS Code
 * 
 * Sistema que permite visualizar logs da aplicação React diretamente
 * no terminal do VS Code durante o desenvolvimento
 */

class TerminalLogger {
  constructor() {
    this.isDevelopment = import.meta.env.DEV
    this.endpoint = '/__piac_logs'
    this.queue = []
    this.isOnline = navigator.onLine
    
    // Configura listener para status de rede
    window.addEventListener('online', () => { this.isOnline = true })
    window.addEventListener('offline', () => { this.isOnline = false })
  }

  /**
   * Envia log para o terminal via endpoint do Vite
   * @param {string} level - Nível do log
   * @param {string} message - Mensagem
   * @param {any} data - Dados adicionais
   */
  async sendToTerminal(level, message, data = null) {
    if (!this.isDevelopment || !this.isOnline) return

    const logData = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      data: data ? JSON.stringify(data, null, 2) : null,
      url: window.location.pathname,
      userAgent: navigator.userAgent.split(')')[0] + ')'
    }

    try {
      // Tenta enviar via fetch para endpoint personalizado
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData)
      })
    } catch (error) {
      // Se falhar, adiciona na fila para tentar depois
      this.queue.push(logData)
      
      // Tenta alternativa via console.log especial
      this.fallbackLog(level, message, data)
    }
  }

  /**
   * Método alternativo quando a API não estiver disponível
   */
  fallbackLog(level, message, data) {
    // Método silencioso - logs apenas no terminal via plugin
    // Não exibe mais no console do navegador
  }

  /**
   * Processa fila de logs pendentes
   */
  async processQueue() {
    if (this.queue.length === 0) return

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batch: true,
          logs: this.queue
        })
      })
      
      this.queue = [] // Limpa fila se sucesso
    } catch (error) {
      // Mantém na fila para próxima tentativa
    }
  }

  // Métodos por nível
  info(message, data = null) {
    this.sendToTerminal('INFO', message, data)
  }

  success(message, data = null) {
    this.sendToTerminal('SUCCESS', message, data)
  }

  warn(message, data = null) {
    this.sendToTerminal('WARN', message, data)
  }

  error(message, error = null) {
    this.sendToTerminal('ERROR', message, error)
  }

  debug(message, data = null) {
    this.sendToTerminal('DEBUG', message, data)
  }

  auth(message, data = null) {
    this.sendToTerminal('AUTH', `🔐 ${message}`, data)
  }

  api(message, data = null) {
    this.sendToTerminal('API', `🌐 ${message}`, data)
  }

  route(message, data = null) {
    this.sendToTerminal('ROUTE', `🛤️ ${message}`, data)
  }
}

// Instância singleton
export const terminalLogger = new TerminalLogger()

// Processa fila a cada 5 segundos
if (typeof window !== 'undefined') {
  setInterval(() => {
    terminalLogger.processQueue()
  }, 5000)
}

export default terminalLogger
