import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Chip, 
  Stack, 
  useTheme,
  Badge,
  useMediaQuery
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendIcon,
  Star as StarIcon
} from '@mui/icons-material';

// Mapeo de tipos de inversionista a configuraciones
const investorTypeConfig = {
  exploratory: {
    label: 'Explorador',
    color: 'success',
    description: 'Inversor Conservador'
  },
  adventurous: {
    label: 'Aventurero',
    color: 'warning',
    description: 'Inversor Moderado'
  },
  hero: {
    label: 'Héroe',
    color: 'error',
    description: 'Inversor Arriesgado'
  }
};

// Componente para medallas de posición
const PositionMedal = ({ rank }) => {
  const theme = useTheme();
  
  // Definir estilos directamente
  if (rank === 1) {
    return (
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.dark
        }}
      >
        <TrophyIcon fontSize="small" />
      </Box>
    );
  }
  
  if (rank === 2) {
    return (
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          backgroundColor: theme.palette.grey[300],
          color: theme.palette.grey[700]
        }}
      >
        <TrophyIcon fontSize="small" />
      </Box>
    );
  }
  
  if (rank === 3) {
    return (
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          backgroundColor: '#cd7f32',
          color: 'white'
        }}
      >
        <TrophyIcon fontSize="small" />
      </Box>
    );
  }
  
  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.text.secondary
      }}
    >
      {rank}
    </Box>
  );
};

// Formateador de montos
const formatCurrency = (amount) => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount}`;
};

const RankingItem = ({ user, rank, highlight }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const config = investorTypeConfig[user.investorType] || investorTypeConfig.exploratory;
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: isMobile ? 1 : 2,
        borderRadius: 2,
        mb: 1,
        backgroundColor: highlight ? theme.palette.primary.lighter : 'background.paper',
        border: highlight ? `2px solid ${theme.palette.primary.main}` : '1px solid',
        borderColor: 'divider',
        boxShadow: highlight ? `0 0 10px ${theme.palette.primary.light}` : 'none',
        transition: 'all 0.3s ease',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 1 : 0
      }}
    >
      <Box sx={{ mr: isMobile ? 0 : 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <PositionMedal rank={rank} />
        {isMobile && (
          <Avatar 
            src={user.avatar} 
            alt={user.name}
            sx={{ 
              width: 40, 
              height: 40,
              border: `2px solid ${theme.palette[config.color].main}`
            }}
          />
        )}
      </Box>
      
      {!isMobile && (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <StarIcon sx={{ 
              color: theme.palette.warning.main,
              fontSize: '0.75rem',
              backgroundColor: theme.palette.background.paper,
              borderRadius: '50%'
            }} />
          }
        >
          <Avatar 
            src={user.avatar} 
            alt={user.name}
            sx={{ 
              width: 56, 
              height: 56,
              border: `2px solid ${theme.palette[config.color].main}`
            }}
          />
        </Badge>
      )}
      
      <Box sx={{ 
        ml: isMobile ? 0 : 2, 
        flexGrow: 1, 
        minWidth: 0,
        width: isMobile ? '100%' : 'auto'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: isMobile ? 0.5 : 0.5,
          flexWrap: 'wrap',
          gap: isMobile ? 0.5 : 1.5
        }}>
          <Typography 
            variant={isMobile ? "body1" : "subtitle1"} 
            fontWeight="bold" 
            noWrap={!isMobile}
            sx={{ 
              color: highlight ? 'primary.main' : 'text.primary'
            }}
          >
            {user.name}
          </Typography>
          
          <Chip 
            label={config.label}
            size="small"
            sx={{ 
              backgroundColor: `${theme.palette[config.color].light}30`,
              color: theme.palette[config.color].dark,
              fontWeight: 500,
              fontSize: '0.7rem',
              height: 20
            }}
          />
        </Box>
        
        <Stack 
          direction={isMobile ? "column" : "row"} 
          spacing={isMobile ? 0.5 : 2} 
          alignItems={isMobile ? "flex-start" : "center"}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendIcon fontSize="small" sx={{ color: 'success.main', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {formatCurrency(user.totalInvested)}
            </Typography>
          </Box>
          
          {!isMobile && user.projectCategory && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              noWrap
              sx={{ maxWidth: 150 }}
            >
              {user.projectCategory}
            </Typography>
          )}
        </Stack>
      </Box>
      
      <Box sx={{ 
        textAlign: isMobile ? 'left' : 'right', 
        ml: isMobile ? 0 : 2, 
        mt: isMobile ? 1 : 0,
        width: isMobile ? '100%' : 'auto',
        minWidth: isMobile ? 'auto' : 120
      }}>
        <Typography 
          variant={isMobile ? "body2" : "subtitle2"} 
          fontWeight="bold"
          sx={{ color: 'primary.main' }}
        >
          {user.featuredProject}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Proyecto destacado
        </Typography>
      </Box>
    </Box>
  );
};

export default RankingItem;