import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import {
  Dashboard,
  Assignment,
  People,
  AttachMoney,
  Assessment,
  Settings,
} from '@mui/icons-material'
import DashboardLayout from '../components/DashboardLayout'
import AdminOverview from '../components/admin/AdminOverview'

const AdminDashboard = () => {
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
      onClick: () => navigate('/admin/overview'),
    },
    {
      text: 'Contratos',
      icon: <Assignment />,
      key: 'contratos',
      onClick: () => navigate('/admin/contratos'),
    },
    {
      text: 'Parceiros',
      icon: <People />,
      key: 'parceiros',
      onClick: () => navigate('/admin/parceiros'),
    },
    {
      text: 'Comissões',
      icon: <AttachMoney />,
      key: 'comissoes',
      onClick: () => navigate('/admin/comissoes'),
    },
    {
      text: 'Relatórios',
      icon: <Assessment />,
      key: 'relatorios',
      onClick: () => navigate('/admin/relatorios'),
    },
    {
      text: 'Configurações',
      icon: <Settings />,
      key: 'configuracoes',
      onClick: () => navigate('/admin/configuracoes'),
    },
  ]

  const menuItemsWithSelection = menuItems.map((item) => ({
    ...item,
    selected: selectedMenuItem === item.key,
  }))

  return (
    <DashboardLayout menuItems={menuItemsWithSelection} title="Dashboard Administrativo">
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/overview" element={<AdminOverview />} />
        <Route path="/*" element={<AdminOverview />} />
      </Routes>
    </DashboardLayout>
  )
}

export default AdminDashboard
