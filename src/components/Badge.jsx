import React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LoopIcon from '@mui/icons-material/Loop';
import NatureIcon from '@mui/icons-material/Nature';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import StarIcon from '@mui/icons-material/Star';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import {
  Tooltip,
  IconButton,
  Box,
  Typography,
  LinearProgress,
  Paper,
  Chip,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Mapeo de iconos mejorado con nombres descriptivos
const badgeIcons = {
  // Insignias de inversión
  'Inversor Novato': MilitaryTechIcon,
  'Top Inversor': WorkspacePremiumIcon,
  'Inversor Recurrente': LoopIcon,
  'Multiproyectos': NatureIcon,
  'Fundador Temprano': NewReleasesIcon,
  
  // Insignias de referidos
  'Recomiéndame Más': PeopleIcon,
  'Recomendación VIP': EmojiEventsIcon,
  
  // Insignias especiales
  'Líder del Mes': EmojiEventsIcon,
  'Bono de Bienvenida': CardGiftcardIcon,
  
  // Iconos genéricos
  'default': AttachMoneyIcon
};

// Componente estilizado con prevención de props no-DOM
const StyledBadge = styled(Paper, {
  shouldForwardProp: (prop) => !['unlocked'].includes(prop),
})(({ theme, unlocked }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  borderLeft: unlocked 
    ? `4px solid ${theme.palette.success.main}`
    : `4px solid ${theme.palette.grey[300]}`,
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)'
  }
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  margin: theme.spacing(1, 0),
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main
  }
}));

const HintBox = styled(Box)(({ theme, type }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[50],
  borderLeft: `3px solid ${
    type === 'hint' ? theme.palette.info.main :
    type === 'challenge' ? theme.palette.warning.main :
    type === 'streak' ? theme.palette.error.main :
    theme.palette.success.main
  }`
}));

const Badge = ({
  title,
  description,
  progress = 0,
  maxProgress = 1,
  unlocked = false,
  bonus,
  actionHint,
  challenge,
  currentStreak,
  recommendation
}) => {
  // Selecciona el icono basado en el título de la insignia
  const IconComponent = badgeIcons[title] || badgeIcons['default'];
  const progressPercentage = maxProgress > 0 
    ? Math.min(100, (progress / maxProgress) * 100)
    : 0;

  return (
    <StyledBadge elevation={2} unlocked={unlocked}>
      <Box display="flex" alignItems="flex-start" gap={3}>
        <Tooltip title={unlocked ? 'Desbloqueado' : 'En progreso'}>
          <Avatar
            sx={{
              bgcolor: unlocked ? 'success.light' : 'grey.200',
              color: unlocked ? 'success.dark' : 'grey.500',
              width: 56,
              height: 56
            }}
          >
            <IconComponent fontSize="medium" />
          </Avatar>
        </Tooltip>

        <Box flex={1}>
          <Typography variant="h6" fontWeight={600} color={unlocked ? 'text.primary' : 'text.secondary'}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {description}
          </Typography>

          {unlocked ? (
            <>
              <Chip
                label="Desbloqueado"
                size="small"
                color="success"
                sx={{ fontWeight: 500, mb: 1.5 }}
              />
              {bonus && (
                <HintBox type="bonus">
                  <CardGiftcardIcon color="success" fontSize="small" />
                  <Typography variant="body2">{bonus}</Typography>
                </HintBox>
              )}
            </>
          ) : (
            <>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Progreso: {progress}/{maxProgress}
                </Typography>
                <Typography variant="caption" fontWeight={500} color="primary">
                  {Math.round(progressPercentage)}%
                </Typography>
              </Box>
              <ProgressBar variant="determinate" value={progressPercentage} />

              {actionHint && (
                <HintBox type="hint">
                  <LightbulbIcon color="info" fontSize="small" />
                  <Typography variant="body2">{actionHint}</Typography>
                </HintBox>
              )}
              {challenge && (
                <HintBox type="challenge">
                  <TrackChangesIcon color="warning" fontSize="small" />
                  <Typography variant="body2">{challenge}</Typography>
                </HintBox>
              )}
              {currentStreak && (
                <HintBox type="streak">
                  <WhatshotIcon color="error" fontSize="small" />
                  <Typography variant="body2">{currentStreak}</Typography>
                </HintBox>
              )}
              {recommendation && (
                <HintBox type="recommendation">
                  <StarIcon color="primary" fontSize="small" />
                  <Typography variant="body2">{recommendation}</Typography>
                </HintBox>
              )}
            </>
          )}
        </Box>
      </Box>
    </StyledBadge>
  );
};

export default Badge;