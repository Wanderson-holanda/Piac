import React from 'react'
import { Typography, Box } from '@mui/material'

const ClientPerfil = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Meu Perfil
      </Typography>
      <Typography variant="body1">
        Página em desenvolvimento - Aqui será possível editar as informações do perfil do cliente.
      </Typography>
    </Box>
  )
}

export default ClientPerfil
