import React from 'react'
import { Tabs, Tab, Box } from '@mui/material'

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs 
        value={activeTab} 
        onChange={(e, newValue) => onTabChange(newValue)}
        variant="fullWidth"
      >
        {tabs.map(tab => (
          <Tab 
            key={tab.id}
            value={tab.id}
            label={tab.label}
            icon={<span className={`icon-${tab.icon}`} />}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default TabNavigation