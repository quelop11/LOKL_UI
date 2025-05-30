import React from 'react';
import { Box, TextField, Button, Grid, Typography, Avatar } from '@mui/material';
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  Home as HomeIcon,
  Fingerprint as FingerprintIcon,
  Person as PersonIcon,
  LocationCity as LocationCityIcon
} from '@mui/icons-material';

const PersonalInfoForm = ({ user, onSave }) => {
  const [formData, setFormData] = React.useState({
    firstName: user.personalInfo.firstName,
    lastName: user.personalInfo.lastName,
    cc: user.personalInfo.cc,
    phone: user.personalInfo.phone,
    email: user.personalInfo.email,
    birthDate: user.personalInfo.birthDate,
    city: user.personalInfo.city,
    address: user.personalInfo.address
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...user,
      personalInfo: {
        ...user.personalInfo,
        ...formData
      }
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Avatar
            src={user.photoUrl}
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto',
              border: '3px solid #1976d2'
            }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {user.personalInfo.firstName} {user.personalInfo.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.investorType}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            InputProps={{
              startAdornment: <PersonIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Apellido"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            InputProps={{
              startAdornment: <PersonIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Documento"
            name="cc"
            value={formData.cc}
            onChange={handleChange}
            InputProps={{
              startAdornment: <FingerprintIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            InputProps={{
              startAdornment: <PhoneIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: <EmailIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Fecha de nacimiento"
            name="birthDate"
            placeholder="DD/MM/YYYY"
            value={formData.birthDate}
            onChange={handleChange}
            InputProps={{
              startAdornment: <CakeIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Ciudad"
            name="city"
            value={formData.city}
            onChange={handleChange}
            InputProps={{
              startAdornment: <LocationCityIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dirección"
            name="address"
            value={formData.address}
            onChange={handleChange}
            InputProps={{
              startAdornment: <HomeIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onSave(user)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<EditIcon />}
          >
            Guardar cambios
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoForm;