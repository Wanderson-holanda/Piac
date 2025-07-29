import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material'
import {
  ContentCopy,
  Share,
  WhatsApp,
  Email,
  Facebook,
  QrCode,
  Visibility,
  TrendingUp,
} from '@mui/icons-material'
import { useAuth } from '../../contexts/AuthContext'

const PartnerLinkUnico = () => {
  const { user } = useAuth()
  const [linkUnico, setLinkUnico] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [stats, setStats] = useState({
    clicks: 0,
    conversoes: 0,
    taxaConversao: 0,
  })
  const [success, setSuccess] = useState('')

  useEffect(() => {
    generateLinkUnico()
    loadStats()
  }, [])

  const generateLinkUnico = () => {
    // Gerar link único baseado no ID do parceiro
    const partnerId = user?.id || 'demo'
    const baseUrl = window.location.origin
    const uniqueLink = `${baseUrl}/indicacao/${partnerId}`
    setLinkUnico(uniqueLink)
    
    // Gerar QR Code (usando uma API externa como exemplo)
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uniqueLink)}`
    setQrCodeUrl(qrApiUrl)
  }

  const loadStats = () => {
    // Simulação de dados - substituir pela API real
    setStats({
      clicks: 147,
      conversoes: 12,
      taxaConversao: 8.2,
    })
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkUnico)
    setSuccess('Link copiado para a área de transferência!')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleShareWhatsApp = () => {
    const message = `Olá! Gostaria de indicar os serviços da PIAC Engenharia. Acesse: ${linkUnico}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleShareEmail = () => {
    const subject = 'Indicação - PIAC Engenharia'
    const body = `Olá!\n\nGostaria de indicar os excelentes serviços da PIAC Engenharia.\n\nAcesse o link para mais informações: ${linkUnico}\n\nAtenciosamente,\n${user?.name}`
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(emailUrl)
  }

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkUnico)}`
    window.open(facebookUrl, '_blank')
  }

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <WhatsApp sx={{ color: '#25D366' }} />,
      action: handleShareWhatsApp,
    },
    {
      name: 'Email',
      icon: <Email sx={{ color: '#1976d2' }} />,
      action: handleShareEmail,
    },
    {
      name: 'Facebook',
      icon: <Facebook sx={{ color: '#1877F2' }} />,
      action: handleShareFacebook,
    },
  ]

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Meu Link de Indicação
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Link Principal */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Seu Link Único de Indicação
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Compartilhe este link para que seus contatos possam se cadastrar automaticamente como suas indicações.
              </Typography>
              
              <TextField
                fullWidth
                value={linkUnico}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCopyLink} edge="end">
                        <ContentCopy />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<ContentCopy />}
                  onClick={handleCopyLink}
                >
                  Copiar Link
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                >
                  Compartilhar
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Opções de Compartilhamento */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Compartilhar Via
              </Typography>
              <List>
                {shareOptions.map((option, index) => (
                  <React.Fragment key={option.name}>
                    <ListItem>
                      <ListItemIcon>
                        {option.icon}
                      </ListItemIcon>
                      <ListItemText primary={option.name} />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={option.action}
                        startIcon={<Share />}
                      >
                        Compartilhar
                      </Button>
                    </ListItem>
                    {index < shareOptions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* QR Code */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                QR Code
              </Typography>
              <Box sx={{ mb: 2 }}>
                {qrCodeUrl ? (
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code do Link de Indicação"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                ) : (
                  <Box sx={{ 
                    width: 200, 
                    height: 200, 
                    bgcolor: 'grey.200', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mx: 'auto'
                  }}>
                    <QrCode sx={{ fontSize: 48, color: 'grey.500' }} />
                  </Box>
                )}
              </Box>
              <Typography variant="body2" color="text.secondary">
                Escaneie para acessar o link de indicação
              </Typography>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Estatísticas do Link
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2">Clicks</Typography>
                  <Chip icon={<Visibility />} label={stats.clicks} size="small" />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2">Conversões</Typography>
                  <Chip icon={<TrendingUp />} label={stats.conversoes} size="small" color="success" />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Taxa de Conversão</Typography>
                  <Chip 
                    label={`${stats.taxaConversao}%`} 
                    size="small" 
                    color={stats.taxaConversao > 5 ? 'success' : 'warning'} 
                  />
                </Box>
              </Box>

              <Typography variant="caption" color="text.secondary">
                Estatísticas dos últimos 30 dias
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PartnerLinkUnico
