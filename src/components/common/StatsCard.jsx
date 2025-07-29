/**
 * StatsCard - Componente de cartão de estatísticas
 * 
 * Funcionalidade:
 * - Exibe métricas importantes com design moderno
 * - Suporte a ícones, cores e animações
 * - Indicadores de tendência (crescimento/queda)
 * - Responsivo e acessível
 */

import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
  alpha,
} from '@mui/material'
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material'

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  color = 'primary',
  trend,
  trendValue,
  loading = false,
  onClick,
}) => {
  const theme = useTheme()

  const getTrendIcon = () => {
    if (!trend) return null
    
    switch (trend) {
      case 'up':
        return <TrendingUp fontSize="small" />
      case 'down':
        return <TrendingDown fontSize="small" />
      default:
        return <TrendingFlat fontSize="small" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return theme.palette.success.main
      case 'down':
        return theme.palette.error.main
      default:
        return theme.palette.grey[600]
    }
  }

  const cardColor = theme.palette[color]?.main || theme.palette.primary.main

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease-in-out',
        cursor: onClick ? 'pointer' : 'default',
        border: '1px solid',
        borderColor: alpha(cardColor, 0.1),
        overflow: 'hidden',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          borderColor: alpha(cardColor, 0.2),
        } : {},
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${cardColor}, ${alpha(cardColor, 0.8)})`,
        }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontWeight: 600, 
                mb: 1,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {title}
            </Typography>
            
            {loading ? (
              <Box
                sx={{
                  width: 80,
                  height: 32,
                  backgroundColor: theme.palette.grey[200],
                  borderRadius: 1,
                  animation: 'pulse 1.5s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
            ) : (
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 0.5,
                }}
              >
                {value}
              </Typography>
            )}
            
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>

          {icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: 2,
                backgroundColor: alpha(cardColor, 0.1),
                color: cardColor,
                ml: 2,
              }}
            >
              {React.cloneElement(icon, { fontSize: 'large' })}
            </Box>
          )}
        </Box>

        {(trend || trendValue) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={getTrendIcon()}
              label={trendValue}
              size="small"
              sx={{
                backgroundColor: alpha(getTrendColor(), 0.1),
                color: getTrendColor(),
                fontWeight: 600,
                fontSize: '0.75rem',
                '& .MuiChip-icon': {
                  color: getTrendColor(),
                },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              vs período anterior
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default StatsCard
