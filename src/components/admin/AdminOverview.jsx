import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
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
  Warning,
} from '@mui/icons-material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const AdminOverview = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalContratos: 0,
      contratosAtivos: 0,
      totalParceiros: 0,
      comissoesPagas: 0,
      receita: 0,
    },
    recentActivities: [],
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
          totalContratos: 127,
          contratosAtivos: 45,
          totalParceiros: 23,
          comissoesPagas: 45420.50,
          receita: 890650.00,
        },
        recentActivities: [
          {
            id: 1,
            type: 'contrato',
            description: 'Novo contrato assinado - João Silva',
            date: '2025-01-25',
            value: 25000.00,
          },
          {
            id: 2,
            type: 'indicacao',
            description: 'Nova indicação - Parceiro Maria Santos',
            date: '2025-01-24',
            value: null,
          },
          {
            id: 3,
            type: 'comissao',
            description: 'Comissão paga - Parceiro Pedro Costa',
            date: '2025-01-23',
            value: 1250.00,
          },
          {
            id: 4,
            type: 'parceiro',
            description: 'Novo parceiro aprovado - Ana Lima',
            date: '2025-01-22',
            value: null,
          },
        ],
        chartData: [
          { mes: 'Jan', contratos: 12, receita: 180000, comissoes: 7200 },
          { mes: 'Fev', contratos: 15, receita: 225000, comissoes: 9000 },
          { mes: 'Mar', contratos: 18, receita: 270000, comissoes: 10800 },
          { mes: 'Abr', contratos: 10, receita: 150000, comissoes: 6000 },
          { mes: 'Mai', contratos: 22, receita: 330000, comissoes: 13200 },
          { mes: 'Jun', contratos: 16, receita: 240000, comissoes: 9600 },
        ],
        loading: false,
      }
      setDashboardData(mockData)
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
      setDashboardData(prev => ({ ...prev, loading: false }))
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'contrato':
        return <Assignment sx={{ color: 'primary.main' }} />
      case 'indicacao':
        return <People sx={{ color: 'success.main' }} />
      case 'comissao':
        return <AttachMoney sx={{ color: 'warning.main' }} />
      case 'parceiro':
        return <CheckCircle sx={{ color: 'info.main' }} />
      default:
        return <Schedule />
    }
  }

  if (dashboardData.loading) {
    return <LinearProgress />
  }

  const { stats, recentActivities, chartData } = dashboardData

  // Dados para gráfico de pizza
  const statusData = [
    { name: 'Ativos', value: stats.contratosAtivos, color: '#4caf50' },
    { name: 'Concluídos', value: stats.totalContratos - stats.contratosAtivos, color: '#2196f3' },
  ]

  return (
    <Box>
      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <Assignment />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {stats.totalContratos}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Total Contratos
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <Schedule />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {stats.contratosAtivos}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Contratos Ativos
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <People />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {stats.totalParceiros}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Parceiros Ativos
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <AttachMoney />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    R$ {(stats.comissoesPagas / 1000).toFixed(0)}K
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Comissões Pagas
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    R$ {(stats.receita / 1000).toFixed(0)}K
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Receita Total
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
                Evolução Mensal
              </Typography>
              <Box sx={{ height: 350, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value, name) => [
                        name === 'receita' || name === 'comissoes' 
                          ? `R$ ${value.toLocaleString('pt-BR')}`
                          : value,
                        name === 'contratos' ? 'Contratos' :
                        name === 'receita' ? 'Receita' : 'Comissões'
                      ]}
                    />
                    <Bar yAxisId="left" dataKey="contratos" fill="#1976d2" />
                    <Line yAxisId="right" type="monotone" dataKey="receita" stroke="#4caf50" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Status dos Contratos */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Status dos Contratos
              </Typography>
              <Box sx={{ height: 200, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Atividades Recentes */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Atividades Recentes
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemIcon>
                        {getActivityIcon(activity.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.description}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(activity.date).toLocaleDateString('pt-BR')}
                            </Typography>
                            {activity.value && (
                              <Chip
                                label={`R$ ${activity.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                                size="small"
                                color="success"
                              />
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
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

export default AdminOverview
