import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider 
} from '@mui/material';

const SectionCard = ({ title, children, action }) => {
  return (
    <Paper 
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper'
      }}
    >
      <Box 
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        {action}
      </Box>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </Paper>
  );
};

export default SectionCard;