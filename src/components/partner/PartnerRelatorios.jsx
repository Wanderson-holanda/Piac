import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  DatePicker,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { Download, Assessment } from '@mui/icons-material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import dayjs from 'dayjs'

const PartnerRelatorios = () => {
  const [periodo, setPeriodo] = useState('mes')
  const [dataInicio, setDataInicio] = useState(dayjs().subtract(30, 'day'))
  const [dataFim, setDataFim] = useState(dayjs())

  // Dados mockados para os gráficos
  const indicacoesData = [
    { mes: 'Jan', total: 8, aprovadas: 6, rejeitadas: 2 },
    { mes: 'Fev', total: 12, aprovadas: 9, rejeitadas: 3 },
    { mes: 'Mar', total: 15, aprovadas: 11, rejeitadas: 4 },
    { mes: 'Abr', total: 10, aprovadas: 7, rejeitadas: 3 },
    { mes: 'Mai', total: 18, aprovadas: 14, rejeitadas: 4 },
    { mes: 'Jun', total: 14, aprovadas: 10, rejeitadas: 4 },
  ]

  const comissoesData = [
    { mes: 'Jan', valor: 1200 },
    { mes: 'Fev', valor: 1800 },
    { mes: 'Mar', valor: 2200 },
    { mes: 'Abr', valor: 1400 },
    { mes: 'Mai', valor: 2800 },
    { mes: 'Jun', valor: 2000 },
  ]

  const statusData = [
    { name: 'Aprovadas', value: 57, color: '#4caf50' },
    { name: 'Pendentes', value: 8, color: '#ff9800' },
    { name: 'Rejeitadas', value: 12, color: '#f44336' },
  ]

  const servicosData = [
    { servico: 'Projeto Estrutural', quantidade: 15 },
    { servico: 'Consultoria', quantidade: 12 },
    { servico: 'Projeto Arquitetônico', quantidade: 8 },
    { servico: 'Laudos Técnicos', quantidade: 6 },
    { servico: 'Outros', quantidade: 4 },
  ]

  const handleExportReport = () => {
    // Implementar exportação do relatório
    console.log('Exportando relatório...')
  }

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Relatórios e Análises
      </Typography>

      {/* Filtros */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Filtros
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Período</InputLabel>
                <Select
                  value={periodo}
                  label="Período"
                  onChange={(e) => setPeriodo(e.target.value)}
                >
                  <MenuItem value="semana">Última Semana</MenuItem>
                  <MenuItem value="mes">Último Mês</MenuItem>
                  <MenuItem value="trimestre">Último Trimestre</MenuItem>
                  <MenuItem value="ano">Último Ano</MenuItem>
                  <MenuItem value="personalizado">Período Personalizado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {periodo === 'personalizado' && (
              <>
                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MuiDatePicker
                      label="Data Início"
                      value={dataInicio}
                      onChange={(newValue) => setDataInicio(newValue)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MuiDatePicker
                      label="Data Fim"
                      value={dataFim}
                      onChange={(newValue) => setDataFim(newValue)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
            
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleExportReport}
                fullWidth
              >
                Exportar Relatório
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <Grid container spacing={3}>
        {/* Evolução das Indicações */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Evolução das Indicações
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={indicacoesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="aprovadas" stackId="a" fill="#4caf50" name="Aprovadas" />
                    <Bar dataKey="rejeitadas" stackId="a" fill="#f44336" name="Rejeitadas" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Evolução das Comissões */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Evolução das Comissões
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comissoesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Comissão']}
                    />
                    <Line type="monotone" dataKey="valor" stroke="#1976d2" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Status das Indicações */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Status das Indicações
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
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

        {/* Serviços Mais Indicados */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Serviços Mais Indicados
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={servicosData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="servico" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="quantidade" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Resumo Estatístico */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Resumo do Período
              </Typography>
              <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      77
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Total de Indicações
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                      74%
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Taxa de Aprovação
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                      R$ 11.4K
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Comissões Geradas
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                      R$ 148
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Comissão Média
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PartnerRelatorios
