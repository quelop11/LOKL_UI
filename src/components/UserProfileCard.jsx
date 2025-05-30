import React from 'react'
import { Card, CardContent, Typography, Avatar, Button, Box, LinearProgress } from '@mui/material'
import { Edit } from '@mui/icons-material'

const UserProfileCard = ({ user, onEdit }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            src={user.photoUrl}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            {user.personalInfo.firstName} {user.personalInfo.lastName}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {user.investorType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Miembro desde: {new Date(user.joinDate).toLocaleDateString()}
          </Typography>
          
          <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Perfil completado: {user.profileCompletion}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={user.profileCompletion} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
          
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={onEdit}
            sx={{ mt: 2 }}
          >
            Editar perfil
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserProfileCard