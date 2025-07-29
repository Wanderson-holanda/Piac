import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
} from '@mui/material'
import {
  Assignment,
  Schedule,
  CheckCircle,
  Warning,
  Visibility,
  CloudDownload,
  Person,
  CalendarToday,
  AttachMoney,
} from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'

const ClientContratos = () => {
  const [contratos, setContratos] = useState([])
  const [loading, setLoading] = useState(true)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedContrato, setSelectedContrato] = useState(null)

  useEffect(() => {
    loadContratos()
  }, [])

  const loadContratos = async () => {
    try {
      // Simulação de dados - substituir pela API real
      const mockData = [
        {
          id: 1,
          numero: 'CT-2025-001',
          titulo: 'Projeto Estrutural - Residência',
          status: 'em_andamento',
          progresso: 65,
          dataInicio: '2025-01-15',
          dataPrevisao: '2025-03-15',
          responsavel: 'Eng. João Silva',
          valor: 25000.00,
          descricao: 'Desenvolvimento de projeto estrutural para residência unifamiliar de 200m²',
          etapas: [
            { nome: 'Análise do Terreno', status: 'concluida', data: '2025-01-16' },
            { nome: 'Projeto Preliminar', status: 'concluida', data: '2025-01-20' },
            { nome: 'Cálculos Estruturais', status: 'em_andamento', data: null },
            { nome: 'Detalhamento', status: 'pendente', data: null },
            { nome: 'Revisão Final', status: 'pendente', data: null },
          ],
          documentos: [
            { nome: 'Memorial Descritivo', tipo: 'PDF', tamanho: '2.5 MB' },
            { nome: 'Plantas Baixas', tipo: 'DWG', tamanho: '8.3 MB' },
          ],
        },
        {
          id: 2,
          numero: 'CT-2025-002',
          titulo: 'Consultoria Técnica - Comercial',
          status: 'aguardando_aprovacao',
          progresso: 25,
          dataInicio: '2025-01-20',
          dataPrevisao: '2025-02-28',
          responsavel: 'Eng. Maria Santos',
          valor: 15000.00,
          descricao: 'Consultoria técnica para adequação de espaço comercial',
          etapas: [
            { nome: 'Levantamento Técnico', status: 'concluida', data: '2025-01-22' },
            { nome: 'Análise de Viabilidade', status: 'em_andamento', data: null },
            { nome: 'Proposta de Solução', status: 'pendente', data: null },
            { nome: 'Implementação', status: 'pendente', data: null },
          ],
          documentos: [
            { nome: 'Relatório de Análise', tipo: 'PDF', tamanho: '1.8 MB' },
          ],
        },
        {
          id: 3,
          numero: 'CT-2024-045',
          titulo: 'Projeto Arquitetônico - Ampliação',
          status: 'concluido',
          progresso: 100,
          dataInicio: '2024-11-15',
          dataPrevisao: '2024-12-30',
          responsavel: 'Arq. Pedro Lima',
          valor: 18000.00,
          descricao: 'Projeto de ampliação de residência existente',
          etapas: [
            { nome: 'Levantamento', status: 'concluida', data: '2024-11-18' },
            { nome: 'Anteprojeto', status: 'concluida', data: '2024-11-25' },
            { nome: 'Projeto Executivo', status: 'concluida', data: '2024-12-10' },
            { nome: 'Aprovação Prefeitura', status: 'concluida', data: '2024-12-28' },
          ],
          documentos: [
            { nome: 'Projeto Completo', tipo: 'PDF', tamanho: '12.5 MB' },
            { nome: 'Plantas DWG', tipo: 'ZIP', tamanho: '25.8 MB' },
          ],
        },
      ]
      setContratos(mockData)
    } catch (error) {
      console.error('Erro ao carregar contratos:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case 'em_andamento':
        return { label: 'Em Andamento', color: 'primary', icon: <Schedule /> }
      case 'aguardando_aprovacao':
        return { label: 'Aguardando Aprovação', color: 'warning', icon: <Warning /> }
      case 'concluido':
        return { label: 'Concluído', color: 'success', icon: <CheckCircle /> }
      default:
        return { label: status, color: 'default', icon: <Assignment /> }
    }
  }

  const getEtapaStatusColor = (status) => {
    switch (status) {
      case 'concluida':
        return 'success'
      case 'em_andamento':
        return 'primary'
      case 'pendente':
        return 'default'
      default:
        return 'default'
    }
  }

  const handleViewDetails = (contrato) => {
    setSelectedContrato(contrato)
    setDetailsOpen(true)
  }

  const columns = [
    { field: 'numero', headerName: 'Número', width: 130 },
    { field: 'titulo', headerName: 'Título', width: 250 },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => {
        const statusInfo = getStatusInfo(params.value)
        return (
          <Chip
            icon={statusInfo.icon}
            label={statusInfo.label}
            color={statusInfo.color}
            size="small"
          />
        )
      },
    },
    {
      field: 'progresso',
      headerName: 'Progresso',
      width: 120,
      renderCell: (params) => `${params.value}%`,
    },
    {
      field: 'responsavel',
      headerName: 'Responsável',
      width: 150,
    },
    {
      field: 'valor',
      headerName: 'Valor',
      width: 120,
      valueFormatter: (params) =>
        `R$ ${params.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    },
    {
      field: 'dataPrevisao',
      headerName: 'Previsão',
      width: 120,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString('pt-BR'),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          startIcon={<Visibility />}
          onClick={() => handleViewDetails(params.row)}
        >
          Detalhes
        </Button>
      ),
    },
  ]

  if (loading) {
    return <LinearProgress />
  }

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Meus Contratos
      </Typography>

      {/* Resumo */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {contratos.filter(c => c.status !== 'concluido').length}
              </Typography>
              <Typography color="text.secondary">
                Contratos Ativos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {contratos.filter(c => c.status === 'concluido').length}
              </Typography>
              <Typography color="text.secondary">
                Contratos Concluídos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                R$ {contratos.reduce((sum, c) => sum + c.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Typography>
              <Typography color="text.secondary">
                Valor Total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabela de Contratos */}
      <Card>
        <CardContent>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={contratos}
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

      {/* Dialog de Detalhes */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md" fullWidth>
        {selectedContrato && (
          <>
            <DialogTitle>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedContrato.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedContrato.numero}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                {/* Informações Básicas */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Informações do Contrato
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon><Person /></ListItemIcon>
                          <ListItemText
                            primary="Responsável"
                            secondary={selectedContrato.responsavel}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><CalendarToday /></ListItemIcon>
                          <ListItemText
                            primary="Data de Início"
                            secondary={new Date(selectedContrato.dataInicio).toLocaleDateString('pt-BR')}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><Schedule /></ListItemIcon>
                          <ListItemText
                            primary="Previsão de Conclusão"
                            secondary={new Date(selectedContrato.dataPrevisao).toLocaleDateString('pt-BR')}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><AttachMoney /></ListItemIcon>
                          <ListItemText
                            primary="Valor"
                            secondary={`R$ ${selectedContrato.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Progresso e Etapas */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Progresso do Projeto
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={selectedContrato.progresso} 
                          sx={{ height: 10, borderRadius: 5 }}
                        />
                        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                          {selectedContrato.progresso}% Concluído
                        </Typography>
                      </Box>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Etapas:
                      </Typography>
                      {selectedContrato.etapas.map((etapa, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          <Chip
                            label={etapa.nome}
                            color={getEtapaStatusColor(etapa.status)}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          {etapa.data && (
                            <Typography variant="caption" color="text.secondary">
                              {new Date(etapa.data).toLocaleDateString('pt-BR')}
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>

                {/* Descrição */}
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Descrição do Projeto
                      </Typography>
                      <Typography variant="body2">
                        {selectedContrato.descricao}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Documentos */}
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Documentos Disponíveis
                      </Typography>
                      <List>
                        {selectedContrato.documentos.map((doc, index) => (
                          <React.Fragment key={index}>
                            <ListItem>
                              <ListItemIcon>
                                <CloudDownload />
                              </ListItemIcon>
                              <ListItemText
                                primary={doc.nome}
                                secondary={`${doc.tipo} • ${doc.tamanho}`}
                              />
                              <Button variant="outlined" size="small">
                                Download
                              </Button>
                            </ListItem>
                            {index < selectedContrato.documentos.length - 1 && <Divider />}
                          </React.Fragment>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>
                Fechar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default ClientContratos
