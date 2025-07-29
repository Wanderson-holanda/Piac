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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  IconButton,
  InputAdornment,
  Grid,
} from '@mui/material'
import { Visibility, VisibilityOff, Engineering } from '@mui/icons-material'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: yup.string().required('Telefone é obrigatório'),
  password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
  role: yup.string().required('Tipo de usuário é obrigatório'),
  company: yup.string().when('role', {
    is: 'partner',
    then: (schema) => schema.required('Nome da empresa é obrigatório para parceiros'),
    otherwise: (schema) => schema.notRequired(),
  }),
})

const Register = () => {
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: '',
    },
  })

  const watchRole = watch('role')

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setError('')
      setSuccess('')
      
      const { confirmPassword, ...submitData } = data
      await registerUser(submitData)
      
      setSuccess('Cadastro realizado com sucesso! Você pode fazer login agora.')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer cadastro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Logo e Título */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Engineering sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Criar Conta
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Cadastre-se para acessar o sistema
            </Typography>
          </Box>

          {/* Formulário */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  {...register('name')}
                  label="Nome Completo"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  {...register('email')}
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  {...register('phone')}
                  label="Telefone"
                  fullWidth
                  margin="normal"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" error={!!errors.role}>
                  <InputLabel>Tipo de Usuário</InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Tipo de Usuário">
                        <MenuItem value="client">Cliente</MenuItem>
                        <MenuItem value="partner">Parceiro</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                      {errors.role.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {watchRole === 'partner' && (
                <Grid item xs={12}>
                  <TextField
                    {...register('company')}
                    label="Nome da Empresa"
                    fullWidth
                    margin="normal"
                    error={!!errors.company}
                    helperText={errors.company?.message}
                  />
                </Grid>
              )}

              <Grid item xs={12} md={6}>
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
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  {...register('confirmPassword')}
                  label="Confirmar Senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.5, mt: 3, mb: 2 }}
            >
              {loading ? 'Cadastrando...' : 'Criar Conta'}
            </Button>

            <Divider sx={{ my: 2 }}>OU</Divider>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Já tem uma conta?{' '}
                <Link component={RouterLink} to="/login" sx={{ fontWeight: 'bold' }}>
                  Faça login aqui
                </Link>
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link component={RouterLink} to="/" variant="body2">
                ← Voltar para o início
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Register
