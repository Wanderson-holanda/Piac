/**
 * ClientOverview - Visão geral do dashboard do cliente
 * 
 * Funcionalidades:
 * - Resumo dos contratos ativos do cliente
 * - Status dos projetos em andamento
 * - Documentos recentes e downloads
 * - Histórico de interações
 * - Informações de contato e suporte
 * - Notificações importantes
 * 
 * Dados exibidos:
 * - Contratos ativos e seu progresso
 * - Próximos vencimentos e milestones
 * - Documentos disponíveis para download
 * - Últimas atualizações dos projetos
 * - Informações de contato do responsável
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Button,
  Avatar,
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
  CloudDownload,
  Visibility,
  Phone,
  Email,
} from '@mui/icons-material'
import { useAuth } from '../../contexts/AuthContext'

const ClientOverview = () => {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState({
    contratos: [],
    documentos: [],
    stats: {
      contratosAtivos: 0,
      contratosConcluidos: 0,
      documentosDisponiveis: 0,
    },
    loading: true,
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Simulação de dados - substituir pela API real
      const mockData = {
        contratos: [
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
          },
        ],
        documentos: [
          {
            id: 1,
            nome: 'Memorial Descritivo - Projeto Estrutural',
            tipo: 'PDF',
            tamanho: '2.5 MB',
            dataUpload: '2025-01-22',
            contratoId: 1,
          },
          {
            id: 2,
            nome: 'Plantas Baixas - Revisão 02',
            tipo: 'DWG',
            tamanho: '8.3 MB',
            dataUpload: '2025-01-20',
            contratoId: 1,
          },
          {
            id: 3,
            nome: 'Relatório de Análise Técnica',
            tipo: 'PDF',
            tamanho: '1.8 MB',
            dataUpload: '2025-01-18',
            contratoId: 2,
          },
        ],
        stats: {
          contratosAtivos: 2,
          contratosConcluidos: 3,
          documentosDisponiveis: 12,
        },
        loading: false,
      }
      setDashboardData(mockData)
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
      setDashboardData(prev => ({ ...prev, loading: false }))
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

  if (dashboardData.loading) {
    return <LinearProgress />
  }

  const { contratos, documentos, stats } = dashboardData

  return (
    <Box>
      {/* Boas-vindas */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)', color: 'white' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 64, height: 64, bgcolor: 'rgba(255,255,255,0.2)' }}>
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                Bem-vindo, {user?.name}!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Acompanhe o andamento dos seus projetos e acesse seus documentos
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                <Assignment />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {stats.contratosAtivos}
              </Typography>
              <Typography color="text.secondary">
                Contratos Ativos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                <CheckCircle />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {stats.contratosConcluidos}
              </Typography>
              <Typography color="text.secondary">
                Contratos Concluídos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                <CloudDownload />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {stats.documentosDisponiveis}
              </Typography>
              <Typography color="text.secondary">
                Documentos Disponíveis
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Contratos Ativos */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Contratos Ativos
              </Typography>
              {contratos.map((contrato) => {
                const statusInfo = getStatusInfo(contrato.status)
                return (
                  <Card key={contrato.id} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {contrato.titulo}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {contrato.numero} • {contrato.responsavel}
                          </Typography>
                          <Chip
                            icon={statusInfo.icon}
                            label={statusInfo.label}
                            color={statusInfo.color}
                            size="small"
                          />
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            R$ {contrato.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Previsão: {new Date(contrato.dataPrevisao).toLocaleDateString('pt-BR')}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Progresso</Typography>
                          <Typography variant="body2">{contrato.progresso}%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={contrato.progresso} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>

                      <Button variant="outlined" size="small" startIcon={<Visibility />}>
                        Ver Detalhes
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
              
              {contratos.length === 0 && (
                <Alert severity="info">
                  Você não tem contratos ativos no momento.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Documentos Recentes */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Documentos Recentes
              </Typography>
              <List>
                {documentos.slice(0, 3).map((doc, index) => (
                  <React.Fragment key={doc.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CloudDownload />
                      </ListItemIcon>
                      <ListItemText
                        primary={doc.nome}
                        secondary={`${doc.tipo} • ${doc.tamanho} • ${new Date(doc.dataUpload).toLocaleDateString('pt-BR')}`}
                      />
                      <Button size="small" variant="outlined">
                        Download
                      </Button>
                    </ListItem>
                    {index < Math.min(documentos.length, 3) - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              
              {documentos.length > 3 && (
                <Button variant="text" fullWidth sx={{ mt: 1 }}>
                  Ver Todos os Documentos
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Contato de Suporte */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Precisa de Ajuda?
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Entre em contato com nossa equipe de suporte
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Phone />}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  (11) 3456-7890
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Email />}
                  fullWidth
                >
                  suporte@piac.com.br
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ClientOverview
