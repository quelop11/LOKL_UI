import React from 'react';
import { Box, Typography, LinearProgress, Chip, Avatar } from '@mui/material';
import { 
  EmojiEvents as BadgeIcon,
  Person as InvestorIcon,
  CheckCircle as CompletedIcon
} from '@mui/icons-material';

const UserProfileCard = ({ user, profileCompletion }) => {
  // Mapeo de tipos de inversor a colores e íconos
  const investorTypeConfig = {
    Explorador: {
      color: '#4caf50',
      icon: '🌿',
      title: 'Explorador',
      subtitle: 'Inversor Conservador'
    },
    Aventurero: {
      color: '#ff9800',
      icon: '⚔️',
      title: 'Aventurero',
      subtitle: 'Inversor Moderado'
    },
    Héroe: {
      color: '#f44336',
      icon: '🦸',
      title: 'Héroe',
      subtitle: 'Inversor Arriesgado'
    }
  };
  
  const config = investorTypeConfig[user.investorType] || investorTypeConfig.Aventurero;
  
  return (
    <Box 
      sx={{
        background: `linear-gradient(135deg, ${config.color} 0%, #212121 100%)`,
        borderRadius: 3,
        p: 3,
        color: 'white',
        width: '100%',
        maxWidth: 380,
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)'
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Encabezado con tipo de inversor */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ 
            bgcolor: 'rgba(255,255,255,0.2)', 
            mr: 2,
            fontSize: '1.8rem',
            width: 60,
            height: 60
          }}>
            {config.icon}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {config.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {config.subtitle}
            </Typography>
          </Box>
        </Box>
        
        {/* Barra de progreso del perfil */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <InvestorIcon sx={{ fontSize: 16, mr: 0.5 }} /> 
              Perfil completado
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {profileCompletion}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={profileCompletion} 
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(255,255,255,0.2)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                backgroundColor: 'white'
              }
            }}
          />
          {profileCompletion === 100 && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 1,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 1,
              p: '2px 8px',
              width: 'fit-content'
            }}>
              <CompletedIcon sx={{ fontSize: 16, mr: 0.5, color: '#4caf50' }} />
              <Typography variant="caption">Perfil completo</Typography>
            </Box>
          )}
        </Box>
        
        {/* Sección de logros */}
        <Box sx={{ 
          backgroundColor: 'rgba(0,0,0,0.3)', 
          borderRadius: 2, 
          p: 2,
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <BadgeIcon sx={{ fontSize: 16, mr: 0.5 }} /> 
              Mis Logros
            </Typography>
            <Chip 
              label={`${user.achievements?.completed || 0}/${user.achievements?.total || 9}`}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 'bold'
              }}
            />
          </Box>
          
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[...Array(user.achievements?.completed || 0)].map((_, i) => (
              <Box key={i} sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: '#ffd700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography variant="caption" sx={{ color: 'black', fontWeight: 'bold' }}>
                  {i + 1}
                </Typography>
              </Box>
            ))}
            {[...Array((user.achievements?.total || 9) - (user.achievements?.completed || 0))].map((_, i) => (
              <Box key={i} sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px dashed rgba(255,255,255,0.3)'
              }} />
            ))}
          </Box>
        </Box>
        
        {/* Nivel de inversor */}
        <Box sx={{ 
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 2,
          py: 1
        }}>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Nivel {user.investorType === 'Héroe' ? 3 : user.investorType === 'Aventurero' ? 2 : 1}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileCard;