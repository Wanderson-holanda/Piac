import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  LinearProgress,
  Alert,
} from '@mui/material'
import {
  AttachMoney,
  TrendingUp,
  AccountBalance,
  Schedule,
} from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const PartnerComissoes = () => {
  const [comissoes, setComissoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalComissoes: 0,
    comissoesPagas: 0,
    comissoesPendentes: 0,
    proximoPagamento: 0,
  })

  useEffect(() => {
    loadComissoes()
  }, [])

  const loadComissoes = async () => {
    try {
      // Simulação de dados - substituir pela API real
      const mockComissoes = [
        {
          id: 1,
          indicacaoId: 1,
          clienteName: 'João Silva',
          contratoId: 'CT001',
          valorContrato: 15000.00,
          percentualComissao: 5.5,
          valorComissao: 825.00,
          status: 'paga',
          dataPagamento: '2025-01-15',
          dataVencimento: '2025-01-10',
        },
        {
          id: 2,
          indicacaoId: 4,
          clienteName: 'Ana Costa',
          contratoId: 'CT002',
          valorContrato: 28000.00,
          percentualComissao: 6.0,
          valorComissao: 1680.00,
          status: 'pendente',
          dataPagamento: null,
          dataVencimento: '2025-02-10',
        },
        {
          id: 3,
          indicacaoId: 7,
          clienteName: 'Carlos Santos',
          contratoId: 'CT003',
          valorContrato: 12500.00,
          percentualComissao: 5.0,
          valorComissao: 625.00,
          status: 'aprovada',
          dataPagamento: null,
          dataVencimento: '2025-02-15',
        },
      ]

      const mockStats = {
        totalComissoes: 8450.00,
        comissoesPagas: 3275.00,
        comissoesPendentes: 2305.00,
        proximoPagamento: 1680.00,
      }

      setComissoes(mockComissoes)
      setStats(mockStats)
    } catch (error) {
      console.error('Erro ao carregar comissões:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paga':
        return 'success'
      case 'pendente':
        return 'warning'
      case 'aprovada':
        return 'info'
      case 'cancelada':
        return 'error'
      default:
        return 'default'
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'clienteName', headerName: 'Cliente', width: 150 },
    { field: 'contratoId', headerName: 'Contrato', width: 100 },
    {
      field: 'valorContrato',
      headerName: 'Valor Contrato',
      width: 130,
      valueFormatter: (params) =>
        `R$ ${params.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    },
    {
      field: 'percentualComissao',
      headerName: '% Comissão',
      width: 100,
      valueFormatter: (params) => `${params.value}%`,
    },
    {
      field: 'valorComissao',
      headerName: 'Valor Comissão',
      width: 130,
      valueFormatter: (params) =>
        `R$ ${params.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'dataVencimento',
      headerName: 'Vencimento',
      width: 120,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString('pt-BR'),
    },
    {
      field: 'dataPagamento',
      headerName: 'Data Pagamento',
      width: 130,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString('pt-BR') : '-',
    },
  ]

  // Dados para gráficos
  const chartData = [
    { mes: 'Jan', valor: 1200 },
    { mes: 'Fev', valor: 1800 },
    { mes: 'Mar', valor: 2400 },
    { mes: 'Abr', valor: 1500 },
    { mes: 'Mai', valor: 2700 },
    { mes: 'Jun', valor: 2100 },
  ]

  const pieData = [
    { name: 'Pagas', value: stats.comissoesPagas, color: '#4caf50' },
    { name: 'Pendentes', value: stats.comissoesPendentes, color: '#ff9800' },
    { name: 'Aprovadas', value: stats.totalComissoes - stats.comissoesPagas - stats.comissoesPendentes, color: '#2196f3' },
  ]

  if (loading) {
    return <LinearProgress />
  }

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Minhas Comissões
      </Typography>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <AttachMoney />
                </Avatar>
                <Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    R$ {stats.totalComissoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Total Comissões
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
                  <AccountBalance />
                </Avatar>
                <Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    R$ {stats.comissoesPagas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Pagas
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
                  <Schedule />
                </Avatar>
                <Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    R$ {stats.comissoesPendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Pendentes
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
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    R$ {stats.proximoPagamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Próximo Pagamento
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Evolução das Comissões
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Comissão']}
                    />
                    <Bar dataKey="valor" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Status das Comissões
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Próximos Pagamentos */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          Próximo Pagamento Previsto
        </Typography>
        <Typography variant="body2">
          R$ {stats.proximoPagamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} - Vencimento: 10/02/2025
        </Typography>
      </Alert>

      {/* Tabela de Comissões */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Histórico de Comissões
          </Typography>
          <Box sx={{ height: 400, width: '100%', mt: 2 }}>
            <DataGrid
              rows={comissoes}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              loading={loading}
              disableSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default PartnerComissoes
