/**
 * Plugin Vite para PIAC - Sistema de Logs no Terminal
 * 
 * Plugin que intercepta logs do cliente e exibe no terminal
 * com cores e formatação para facilitar o desenvolvimento
 */

export default function piacLogger() {
  return {
    name: 'piac-logger',
    
    configureServer(server) {
      // Cores ANSI para terminal
      const colors = {
        reset: '\x1b[0m',
        bright: '\x1b[1m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        gray: '\x1b[90m'
      }

      const getTimestamp = () => {
        return new Date().toLocaleTimeString('pt-BR', {
          hour12: false,
          timeZone: 'America/Sao_Paulo'
        })
      }

      const terminalLog = (level, message, data = null) => {
        const timestamp = getTimestamp()
        let color = colors.gray
        let icon = '•'

        switch (level.toLowerCase()) {
          case 'info':
            color = colors.cyan
            icon = 'ℹ'
            break
          case 'success':
            color = colors.green
            icon = '✓'
            break
          case 'warn':
            color = colors.yellow
            icon = '⚠'
            break
          case 'error':
            color = colors.red
            icon = '✗'
            break
          case 'auth':
            color = colors.magenta
            icon = '🔐'
            break
          case 'api':
            color = colors.blue
            icon = '🌐'
            break
          case 'route':
            color = colors.green
            icon = '🛤️'
            break
        }

        console.log(
          `${colors.gray}[${timestamp}]${colors.reset} ` +
          `${color}${colors.bright}[PIAC-${level.toUpperCase()}]${colors.reset} ` +
          `${icon} ${message}`
        )

        if (data) {
          console.log(`${colors.gray}   └─ Dados:${colors.reset}`, data)
        }
      }

      // Endpoint para receber logs do cliente
      server.middlewares.use('/__piac_logs', (req, res, next) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          
          req.on('end', () => {
            try {
              const logData = JSON.parse(body)
              
              if (logData.batch) {
                logData.logs.forEach(log => {
                  terminalLog(log.level, `[CLIENT] ${log.message}`, log.data ? JSON.parse(log.data) : null)
                })
              } else {
                terminalLog(logData.level, `[CLIENT] ${logData.message}`, logData.data ? JSON.parse(logData.data) : null)
              }
              
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: true }))
            } catch (error) {
              terminalLog('ERROR', 'Erro ao processar log do cliente', error.message)
              res.writeHead(400, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'Invalid JSON' }))
            }
          })
        } else {
          next()
        }
      })

      // Log inicial
      console.log(`\n${colors.green}${colors.bright}🚀 PIAC - Sistema de Logs Iniciado${colors.reset}`)
      console.log(`${colors.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`)
    },

    handleHotUpdate(ctx) {
      const colors = {
        reset: '\x1b[0m',
        bright: '\x1b[1m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        gray: '\x1b[90m'
      }

      const timestamp = new Date().toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'America/Sao_Paulo'
      })

      const fileName = ctx.file.split('/').pop() || ctx.file.split('\\').pop()
      
      console.log(
        `${colors.gray}[${timestamp}]${colors.reset} ` +
        `${colors.yellow}${colors.bright}[PIAC-HMR]${colors.reset} ` +
        `🔄 Arquivo atualizado: ${colors.green}${fileName}${colors.reset}`
      )
    }
  }
}
