import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import {
  Dashboard,
  People,
  AttachMoney,
  Share,
  Assessment,
} from '@mui/icons-material'
import DashboardLayout from '../components/DashboardLayout'
import PartnerOverview from '../components/partner/PartnerOverview'
import PartnerIndicacoes from '../components/partner/PartnerIndicacoes'
import PartnerComissoes from '../components/partner/PartnerComissoes'
import PartnerLinkUnico from '../components/partner/PartnerLinkUnico'
import PartnerRelatorios from '../components/partner/PartnerRelatorios'

const PartnerDashboard = () => {
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
      onClick: () => navigate('/partner/overview'),
    },
    {
      text: 'Indicações',
      icon: <People />,
      key: 'indicacoes',
      onClick: () => navigate('/partner/indicacoes'),
    },
    {
      text: 'Comissões',
      icon: <AttachMoney />,
      key: 'comissoes',
      onClick: () => navigate('/partner/comissoes'),
    },
    {
      text: 'Link Único',
      icon: <Share />,
      key: 'link-unico',
      onClick: () => navigate('/partner/link-unico'),
    },
    {
      text: 'Relatórios',
      icon: <Assessment />,
      key: 'relatorios',
      onClick: () => navigate('/partner/relatorios'),
    },
  ]

  const menuItemsWithSelection = menuItems.map((item) => ({
    ...item,
    selected: selectedMenuItem === item.key,
  }))

  return (
    <DashboardLayout menuItems={menuItemsWithSelection} title="Dashboard do Parceiro">
      <Routes>
        <Route path="/" element={<PartnerOverview />} />
        <Route path="/overview" element={<PartnerOverview />} />
        <Route path="/indicacoes" element={<PartnerIndicacoes />} />
        <Route path="/comissoes" element={<PartnerComissoes />} />
        <Route path="/link-unico" element={<PartnerLinkUnico />} />
        <Route path="/relatorios" element={<PartnerRelatorios />} />
      </Routes>
    </DashboardLayout>
  )
}

export default PartnerDashboard
