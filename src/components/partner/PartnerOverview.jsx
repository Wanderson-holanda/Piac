/**
 * PartnerOverview - Visão geral do dashboard do parceiro
 * 
 * Funcionalidades:
 * - Exibe estatísticas principais (indicações, comissões, clientes)
 * - Gráficos de performance mensal
 * - Lista de atividades recentes
 * - Indicadores de status e metas
 * - Cards com KPIs importantes
 * 
 * Dados exibidos:
 * - Total de indicações realizadas
 * - Comissões recebidas no mês
 * - Clientes indicados
 * - Taxa de conversão
 * - Gráfico de evolução mensal
 * - Últimas atividades
 */

import React, { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material'
import {
  TrendingUp,
  People,
  AttachMoney,
  Assignment,
  CheckCircle,
  Schedule,
  Cancel,
} from '@mui/icons-material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { partnerService } from '../../services/authService'

const PartnerOverview = () => {
  // Estado para armazenar dados do dashboard
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalIndicacoes: 0,
      indicacoesAprovadas: 0,
      comissaoTotal: 0,
      comissaoMes: 0,
    },
    recentIndicacoes: [],
    chartData: [],
    loading: true,
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Simulação de dados - substituir pela API real
      const mockData = {
        stats: {
          totalIndicacoes: 45,
          indicacoesAprovadas: 32,
          comissaoTotal: 15420.50,
          comissaoMes: 2850.00,
        },
        recentIndicacoes: [
          {
            id: 1,
            clienteName: 'João Silva',
            status: 'aprovada',
            data: '2025-01-20',
            valor: 850.00,
          },
          {
            id: 2,
            clienteName: 'Maria Santos',
            status: 'pendente',
            data: '2025-01-18',
            valor: 0,
          },
          {
            id: 3,
            clienteName: 'Pedro Oliveira',
            status: 'rejeitada',
            data: '2025-01-15',
            valor: 0,
          },
        ],
        chartData: [
          { mes: 'Jan', indicacoes: 4, comissoes: 1200 },
          { mes: 'Fev', indicacoes: 6, comissoes: 1800 },
          { mes: 'Mar', indicacoes: 8, comissoes: 2400 },
          { mes: 'Abr', indicacoes: 5, comissoes: 1500 },
          { mes: 'Mai', indicacoes: 9, comissoes: 2700 },
          { mes: 'Jun', indicacoes: 7, comissoes: 2100 },
        ],
        loading: false,
      }
      setDashboardData(mockData)
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
      setDashboardData(prev => ({ ...prev, loading: false }))
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'aprovada':
        return <CheckCircle sx={{ color: 'success.main' }} />
      case 'pendente':
        return <Schedule sx={{ color: 'warning.main' }} />
      case 'rejeitada':
        return <Cancel sx={{ color: 'error.main' }} />
      default:
        return <Schedule />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'aprovada':
        return 'success'
      case 'pendente':
        return 'warning'
      case 'rejeitada':
        return 'error'
      default:
        return 'default'
    }
  }

  if (dashboardData.loading) {
    return <LinearProgress />
  }

  const { stats, recentIndicacoes, chartData } = dashboardData

  return (
    <Box>
      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <People />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {stats.totalIndicacoes}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Total de Indicações
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <CheckCircle />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {stats.indicacoesAprovadas}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Aprovadas
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <AttachMoney />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    R$ {stats.comissaoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Comissão Total
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    R$ {stats.comissaoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Este Mês
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Gráfico de Evolução */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Evolução de Indicações e Comissões
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="indicacoes" fill="#1976d2" />
                    <Line yAxisId="right" type="monotone" dataKey="comissoes" stroke="#dc004e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Indicações Recentes */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Indicações Recentes
              </Typography>
              <List>
                {recentIndicacoes.map((indicacao, index) => (
                  <React.Fragment key={indicacao.id}>
                    <ListItem>
                      <ListItemIcon>
                        {getStatusIcon(indicacao.status)}
                      </ListItemIcon>
                      <ListItemText
                        primary={indicacao.clienteName}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(indicacao.data).toLocaleDateString('pt-BR')}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                              <Chip
                                label={indicacao.status}
                                size="small"
                                color={getStatusColor(indicacao.status)}
                              />
                              {indicacao.valor > 0 && (
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                  R$ {indicacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentIndicacoes.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PartnerOverview
