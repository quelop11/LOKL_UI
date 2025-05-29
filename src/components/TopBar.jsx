import React from 'react';
import PropTypes from 'prop-types';
import LogoLOKL from '../assets/lokl img.png';

import {
  IconButton,
  Badge,
  Avatar,
  Tooltip
} from '@mui/material';

import NotificationsIcon from '@mui/icons-material/Notifications';

const TopBar = ({ bgColor = "bg-black", textColor = "text-white", userInitials = "US" }) => {
  return (
    <header className={`${bgColor} ${textColor} py-3 px-6 shadow-md sticky top-0 z-50 w-full`}>
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo de la empresa */}
        <div className="flex items-center">
          <img 
            src={LogoLOKL} 
            alt="LOKL Logo" 
            className="h-10 object-contain"
          />
        </div>

        {/* Elementos a la derecha con MUI */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Botón de notificaciones */}
          <Tooltip title="Notificaciones">
            <IconButton sx={{ color: 'white' }}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Avatar con iniciales */}
          <Tooltip title="Mi perfil">
            <IconButton sx={{ color: 'white' }}>
              <Avatar sx={{ bgcolor: '#4B5563', width: 32, height: 32, fontSize: 14 }}>
                {userInitials}
              </Avatar>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
