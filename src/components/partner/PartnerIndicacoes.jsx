import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
} from '@mui/material'
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Visibility,
} from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { partnerService } from '../../services/authService'

const schema = yup.object({
  clienteName: yup.string().required('Nome do cliente é obrigatório'),
  clienteEmail: yup.string().email('Email inválido').required('Email é obrigatório'),
  clientePhone: yup.string().required('Telefone é obrigatório'),
  servicoInteresse: yup.string().required('Serviço de interesse é obrigatório'),
  observacoes: yup.string(),
})

const PartnerIndicacoes = () => {
  const [indicacoes, setIndicacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingIndicacao, setEditingIndicacao] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedIndicacao, setSelectedIndicacao] = useState(null)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    loadIndicacoes()
  }, [])

  const loadIndicacoes = async () => {
    try {
      // Simulação de dados - substituir pela API real
      const mockData = [
        {
          id: 1,
          clienteName: 'João Silva',
          clienteEmail: 'joao@email.com',
          clientePhone: '(11) 99999-9999',
          servicoInteresse: 'Projeto Estrutural',
          status: 'aprovada',
          dataIndicacao: '2025-01-20',
          dataAprovacao: '2025-01-22',
          valorComissao: 850.00,
          observacoes: 'Cliente interessado em projeto residencial',
        },
        {
          id: 2,
          clienteName: 'Maria Santos',
          clienteEmail: 'maria@email.com',
          clientePhone: '(11) 88888-8888',
          servicoInteresse: 'Consultoria',
          status: 'pendente',
          dataIndicacao: '2025-01-18',
          dataAprovacao: null,
          valorComissao: 0,
          observacoes: 'Aguardando contato da equipe comercial',
        },
        {
          id: 3,
          clienteName: 'Pedro Oliveira',
          clienteEmail: 'pedro@email.com',
          clientePhone: '(11) 77777-7777',
          servicoInteresse: 'Projeto Arquitetônico',
          status: 'rejeitada',
          dataIndicacao: '2025-01-15',
          dataAprovacao: null,
          valorComissao: 0,
          observacoes: 'Cliente não se enquadra nos critérios',
        },
      ]
      setIndicacoes(mockData)
    } catch (error) {
      console.error('Erro ao carregar indicações:', error)
      setError('Erro ao carregar indicações')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (indicacao = null) => {
    setEditingIndicacao(indicacao)
    if (indicacao) {
      reset(indicacao)
    } else {
      reset({})
    }
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingIndicacao(null)
    reset({})
  }

  const onSubmit = async (data) => {
    try {
      setError('')
      setSuccess('')

      if (editingIndicacao) {
        // Atualizar indicação existente
        console.log('Atualizando indicação:', data)
        setSuccess('Indicação atualizada com sucesso!')
      } else {
        // Criar nova indicação
        console.log('Criando nova indicação:', data)
        setSuccess('Indicação criada com sucesso!')
      }

      handleCloseDialog()
      loadIndicacoes()
    } catch (error) {
      setError('Erro ao salvar indicação')
    }
  }

  const handleMenuClick = (event, indicacao) => {
    setAnchorEl(event.currentTarget)
    setSelectedIndicacao(indicacao)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedIndicacao(null)
  }

  const handleDelete = async () => {
    try {
      // Implementar delete
      console.log('Deletando indicação:', selectedIndicacao.id)
      setSuccess('Indicação removida com sucesso!')
      loadIndicacoes()
    } catch (error) {
      setError('Erro ao remover indicação')
    }
    handleMenuClose()
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'clienteName', headerName: 'Cliente', width: 150 },
    { field: 'clienteEmail', headerName: 'Email', width: 200 },
    { field: 'servicoInteresse', headerName: 'Serviço', width: 150 },
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
      field: 'dataIndicacao',
      headerName: 'Data Indicação',
      width: 130,
      valueFormatter: (params) => 
        new Date(params.value).toLocaleDateString('pt-BR'),
    },
    {
      field: 'valorComissao',
      headerName: 'Comissão',
      width: 120,
      valueFormatter: (params) =>
        params.value > 0 
          ? `R$ ${params.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
          : '-',
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={(e) => handleMenuClick(e, params.row)}
          size="small"
        >
          <MoreVert />
        </IconButton>
      ),
    },
  ]

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Minhas Indicações
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Nova Indicação
        </Button>
      </Box>

      {/* Alerts */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* DataGrid */}
      <Card>
        <CardContent>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={indicacoes}
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

      {/* Dialog para Criar/Editar Indicação */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingIndicacao ? 'Editar Indicação' : 'Nova Indicação'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  {...register('clienteName')}
                  label="Nome do Cliente"
                  fullWidth
                  error={!!errors.clienteName}
                  helperText={errors.clienteName?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  {...register('clienteEmail')}
                  label="Email do Cliente"
                  type="email"
                  fullWidth
                  error={!!errors.clienteEmail}
                  helperText={errors.clienteEmail?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  {...register('clientePhone')}
                  label="Telefone do Cliente"
                  fullWidth
                  error={!!errors.clientePhone}
                  helperText={errors.clientePhone?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  {...register('servicoInteresse')}
                  label="Serviço de Interesse"
                  fullWidth
                  error={!!errors.servicoInteresse}
                  helperText={errors.servicoInteresse?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('observacoes')}
                  label="Observações"
                  multiline
                  rows={3}
                  fullWidth
                  error={!!errors.observacoes}
                  helperText={errors.observacoes?.message}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {editingIndicacao ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Menu de Ações */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleOpenDialog(selectedIndicacao)
          handleMenuClose()
        }}>
          <Edit sx={{ mr: 2 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={() => {
          // Implementar visualização
          handleMenuClose()
        }}>
          <Visibility sx={{ mr: 2 }} />
          Visualizar
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 2 }} />
          Remover
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default PartnerIndicacoes
