import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import {
  Dashboard,
  Assignment,
  CloudDownload,
  History,
  AccountCircle,
} from '@mui/icons-material'
import DashboardLayout from '../components/DashboardLayout'
import ClientOverview from '../components/client/ClientOverview'
import ClientContratos from '../components/client/ClientContratos'
import ClientDocumentos from '../components/client/ClientDocumentos'
import ClientHistorico from '../components/client/ClientHistorico'
import ClientPerfil from '../components/client/ClientPerfil'

const ClientDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedMenuItem, setSelectedMenuItem] = useState('overview')

  useEffect(() => {
    const path = location.pathname.split('/').pop()
    setSelectedMenuItem(path || 'overview')
  }, [location])

  const menuItems = [
    {
      text: 'Visão Geral',
      icon: <Dashboard />,
      key: 'overview',
      onClick: () => navigate('/client/overview'),
    },
    {
      text: 'Contratos Ativos',
      icon: <Assignment />,
      key: 'contratos',
      onClick: () => navigate('/client/contratos'),
    },
    {
      text: 'Documentos',
      icon: <CloudDownload />,
      key: 'documentos',
      onClick: () => navigate('/client/documentos'),
    },
    {
      text: 'Histórico',
      icon: <History />,
      key: 'historico',
      onClick: () => navigate('/client/historico'),
    },
    {
      text: 'Meu Perfil',
      icon: <AccountCircle />,
      key: 'perfil',
      onClick: () => navigate('/client/perfil'),
    },
  ]

  const menuItemsWithSelection = menuItems.map((item) => ({
    ...item,
    selected: selectedMenuItem === item.key,
  }))

  return (
    <DashboardLayout menuItems={menuItemsWithSelection} title="Dashboard do Cliente">
      <Routes>
        <Route path="/" element={<ClientOverview />} />
        <Route path="/overview" element={<ClientOverview />} />
        <Route path="/contratos" element={<ClientContratos />} />
        <Route path="/documentos" element={<ClientDocumentos />} />
        <Route path="/historico" element={<ClientHistorico />} />
        <Route path="/perfil" element={<ClientPerfil />} />
      </Routes>
    </DashboardLayout>
  )
}

export default ClientDashboard
