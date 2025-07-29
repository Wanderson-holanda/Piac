/**
 * Login - Página de autenticação
 * 
 * Funcionalidades:
 * - Formulário de login com validação
 * - Integração com contexto de autenticação
 * - Redirecionamento baseado no role do usuário
 * - Validação com Yup e React Hook Form
 * - Toggle para mostrar/ocultar senha
 * - Links para registro e recuperação de senha
 * 
 * Usuários de teste:
 * - cliente@teste.com / 123456 (Cliente)
 * - parceiro@teste.com / 123456 (Parceiro)
 * - admin@teste.com / 123456 (Admin)
 */

import React, { useState } from 'react'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
  useTheme,
} from '@mui/material'
import { Visibility, VisibilityOff, Engineering } from '@mui/icons-material'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { terminalLogger } from '../services/terminalLogger'

// Schema de validação do formulário usando Yup
const schema = yup.object({
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
})

const Login = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated, user } = useAuth()
  const theme = useTheme()
  
  // Estado para controlar visibilidade da senha
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Log de inicialização do componente
  React.useEffect(() => {
    terminalLogger.info('Página de Login carregada')
    
    // Redireciona se já estiver logado
    if (isAuthenticated && user) {
      const roleRedirects = {
        admin: '/admin',
        partner: '/partner',
        client: '/client',
      }
      const redirectTo = roleRedirects[user.role] || '/client'
      terminalLogger.route(`Usuário já autenticado, redirecionando para: ${redirectTo}`)
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    const startTime = performance.now()
    terminalLogger.info(`Tentativa de login via formulário: ${data.email}`)
    
    try {
      setLoading(true)
      setError('')
      
      terminalLogger.debug('Chamando função login do contexto...')
      const response = await login(data.email, data.password)
      terminalLogger.debug('Resposta do login recebida', response)
      
      // Redirecionar baseado no role do usuário
      const roleRedirects = {
        admin: '/admin',
        partner: '/partner',
        client: '/client',
      }
      
      const redirectTo = roleRedirects[response.user.role] || '/client'
      terminalLogger.route(`Redirecionando usuário para: ${redirectTo}`)
      terminalLogger.performance('Login completo', startTime)
      
      terminalLogger.debug('Executando navigate...')
      navigate(redirectTo)
      terminalLogger.debug('Navigate executado com sucesso')
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao fazer login'
      setError(errorMessage)
      terminalLogger.error('Erro no formulário de login', {
        error: err.message,
        stack: err.stack,
        email: data.email
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }
          }}
        >
          {/* Logo e Título */}
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box
              sx={{
                display: 'inline-block',
                p: 2,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                mb: 3,
                boxShadow: `0 8px 32px ${theme.palette.primary.main}40`,
              }}
            >
              <Engineering sx={{ fontSize: 48, color: 'white' }} />
            </Box>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              PIAC
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 300,
                color: theme.palette.text.secondary,
                mb: 1,
                letterSpacing: 2
              }}
            >
              ENGENHARIA
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 300, mx: 'auto' }}>
              Faça login para acessar sua conta e gerenciar suas indicações
            </Typography>
          </Box>

          {/* Formulário */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    fontSize: '1.5rem'
                  }
                }}
              >
                {error}
              </Alert>
            )}

            <TextField
              {...register('email')}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                  '&.Mui-focused': {
                    boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                  }
                }
              }}
            />

            <TextField
              {...register('password')}
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                  '&.Mui-focused': {
                    boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                  }
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ 
                py: 2, 
                mb: 3,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: `0 8px 32px ${theme.palette.primary.main}40`,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 40px ${theme.palette.primary.main}50`,
                },
                '&:disabled': {
                  background: theme.palette.grey[300],
                  boxShadow: 'none',
                  transform: 'none',
                }
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Entrando...
                </Box>
              ) : (
                'Entrar na Conta'
              )}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OU
              </Typography>
            </Divider>

            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Não tem uma conta?{' '}
                <Link 
                  component={RouterLink} 
                  to="/register" 
                  sx={{ 
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Cadastre-se aqui
                </Link>
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Link 
                component={RouterLink} 
                to="/" 
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'color 0.2s ease-in-out',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    textDecoration: 'underline',
                  }
                }}
              >
                ← Voltar para o início
              </Link>
            </Box>

            {/* Indicação de usuários de teste */}
            <Box 
              sx={{ 
                mt: 4, 
                p: 2, 
                backgroundColor: theme.palette.grey[100],
                borderRadius: 2,
                border: `1px solid ${theme.palette.grey[200]}`,
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
                USUÁRIOS PARA TESTE:
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.4 }}>
                • <strong>Parceiro:</strong> parceiro@teste.com / 123456<br/>
                • <strong>Cliente:</strong> cliente@teste.com / 123456<br/>
                • <strong>Admin:</strong> admin@teste.com / 123456
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login
