import React from 'react'
import { Typography, Box } from '@mui/material'

const ClientDocumentos = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Meus Documentos
      </Typography>
      <Typography variant="body1">
        Página em desenvolvimento - Aqui será possível visualizar e fazer download de todos os documentos dos contratos.
      </Typography>
    </Box>
  )
}

export default ClientDocumentos
