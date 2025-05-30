import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import Badge from './Badge'

const BadgesView = ({ badges, user }) => {
  const unlockedBadges = badges.filter(badge => user.badges.unlocked.includes(badge.id))
  const inProgressBadges = badges.filter(badge => 
    !user.badges.unlocked.includes(badge.id) && user.badges.progress[badge.id] !== undefined
  )

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Explorador</Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="h6" gutterBottom>Más Logros</Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Mis Insignias ({unlockedBadges.length}/{badges.length})
      </Typography>
      
      {unlockedBadges.map(badge => (
        <Badge 
          key={badge.id} 
          badge={badge} 
          progress={badge.maxProgress} 
          unlocked 
        />
      ))}
      
      {inProgressBadges.map(badge => (
        <Badge 
          key={badge.id} 
          badge={badge} 
          progress={user.badges.progress[badge.id] || 0} 
        />
      ))}
    </Box>
  )
}

export default BadgesView