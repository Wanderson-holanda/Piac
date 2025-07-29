import React from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Engineering,
  People,
  Dashboard,
  TrendingUp,
  Security,
  Support,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const features = [
    {
      icon: <People sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Sistema de Indicações',
      description: 'Parceiros podem cadastrar e indicar clientes, gerando comissões automáticas.',
    },
    {
      icon: <Dashboard sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Dashboard Intuitivo',
      description: 'Interface moderna e funcional para acompanhar contratos e indicações.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Controle de Comissões',
      description: 'Acompanhe seus ganhos e histórico de comissões em tempo real.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Segurança',
      description: 'Dados protegidos com autenticação JWT e criptografia avançada.',
    },
    {
      icon: <Engineering sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Para Engenharia',
      description: 'Desenvolvido especificamente para empresas de engenharia.',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Suporte 24/7',
      description: 'Suporte completo para parceiros e clientes.',
    },
  ]

  return (
    <>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: theme.palette.primary.main }}>
            PIAC Engenharia
          </Typography>
          <Button color="primary" onClick={() => navigate('/login')} sx={{ mr: 1 }}>
            Entrar
          </Button>
          <Button variant="contained" onClick={() => navigate('/register')}>
            Cadastrar-se
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 3 }}
          >
            Sistema de Indicações e Dashboard
          </Typography>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{ mb: 4, opacity: 0.9, maxWidth: '800px', mx: 'auto' }}
          >
            Plataforma completa para parceiros indicarem clientes e acompanharem comissões,
            com dashboard exclusivo para clientes visualizarem contratos e projetos.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                px: 4,
              }}
              onClick={() => navigate('/register')}
            >
              Começar Agora
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
                px: 4,
              }}
              onClick={() => navigate('/login')}
            >
              Fazer Login
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          Funcionalidades
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: theme.palette.grey[100], py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Pronto para começar?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
            Junte-se à nossa rede de parceiros e clientes
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ px: 6, py: 1.5 }}
          >
            Cadastrar-se Gratuitamente
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: theme.palette.grey[900], color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                PIAC Engenharia
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Sistema completo de indicações e dashboard para empresas de engenharia.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                © 2025 PIAC Engenharia. Todos os direitos reservados.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Landing
