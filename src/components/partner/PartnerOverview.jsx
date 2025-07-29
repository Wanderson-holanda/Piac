/**
 * PartnerOverview - Visão geral do dashboard do parceiro
 */

import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material'
import {
  Groups,
  CheckCircle,
  AttachMoney,
  TrendingUp,
} from '@mui/icons-material'

const PartnerOverview = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard do Parceiro
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Groups color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">24</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total de Indicações
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">18</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Aprovadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">R$ 3.200</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Comissão do Mês
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">75%</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Taxa de Conversão
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Atividades Recentes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Maria Silva - Indicação aprovada - R$ 800
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • João Santos - Pendente de análise
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Ana Costa - Indicação aprovada - R$ 950
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
export default PartnerOverview
