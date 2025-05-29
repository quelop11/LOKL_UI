import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider 
} from '@mui/material';

const getBorderColor = (investorType) => {
  switch(investorType) {
    case 'Explorador':
      return '#4CAF50'; // Verde
    case 'Aventurero':
      return '#FFC107'; // Amarillo
    case 'Héroe':
      return '#F44336'; // Rojo
    default:
      return 'divider';
  }
};

const SectionCard = ({ title, children, action, investorType = 'Aventurero' }) => {
  const borderColor = getBorderColor(investorType);
  
  return (
    <Paper 
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: '2px solid',
        borderColor: borderColor,
        backgroundColor: 'background.paper',
        boxShadow: `0 0 10px ${borderColor}20`, // Sombra sutil
        transition: 'all 0.3s ease'
      }}
    >
      <Box 
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${borderColor}`
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        {action}
      </Box>
      
      <Divider sx={{ borderColor: borderColor }} />
      
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </Paper>
  );
};

export default SectionCard;