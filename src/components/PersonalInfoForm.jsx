import React from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  Avatar,
  Stack,
  Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import HomeIcon from '@mui/icons-material/Home';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const FormField = ({ label, name, type = 'text', editMode, value, error, onChange, icon }) => {
  return editMode ? (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      name={name}
      type={type}
      value={value || ''}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error || ''}
      size="small"
      InputProps={{
        startAdornment: icon ? (
          <Box sx={{ color: 'action.active', mr: 1, my: 0.5 }}>
            {React.cloneElement(icon, { fontSize: 'small' })}
          </Box>
        ) : null,
      }}
    />
  ) : (
    <Box display="flex" alignItems="center" gap={1} sx={{ minHeight: '40px' }}>
      {icon && React.cloneElement(icon, { color: 'action', fontSize: 'small' })}
      <Typography
        variant="body2"
        color={value ? 'textPrimary' : 'textSecondary'}
        sx={{ fontStyle: value ? 'normal' : 'italic' }}
      >
        <strong>{label}:</strong> {value || 'No especificado'}
      </Typography>
    </Box>
  );
};

const PersonalInfoForm = ({
  user,
  editMode,
  formData,
  errors,
  onInputChange,
  onSave,
  onEditToggle
}) => {
  const getUserInitials = (userData) => {
    const first = userData?.personalInfo?.firstName || 'U';
    const last = userData?.personalInfo?.lastName || 'S';
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    
    // Si ya está en formato ISO (YYYY-MM-DD), retornar directamente
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    
    // Convertir desde formato dd/mm/aaaa a YYYY-MM-DD
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    return dateString;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" component="h2" fontWeight="bold" color="primary">
          Información Personal
        </Typography>
        {editMode ? (
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="secondary" onClick={() => onEditToggle(false)}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={onSave}>
              Guardar Cambios
            </Button>
          </Stack>
        ) : (
          <Button
            variant="outlined"
            onClick={() => onEditToggle(true)}
            startIcon={<EditIcon fontSize="small" />}
          >
            Editar Información
          </Button>
        )}
      </Box>

      {!editMode && (
        <Box mb={3} display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
            {getUserInitials(user)}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {formData.firstName} {formData.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.investorType}
            </Typography>
          </Box>
        </Box>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormField
            label="Nombre"
            name="firstName"
            editMode={editMode}
            value={formData.firstName}
            error={errors.firstName}
            onChange={onInputChange}
            icon={<PersonIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormField
            label="Apellido"
            name="lastName"
            editMode={editMode}
            value={formData.lastName}
            error={errors.lastName}
            onChange={onInputChange}
            icon={<PersonIcon />}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            label="Cédula"
            name="cc"
            editMode={editMode}
            value={formData.cc}
            error={errors.cc}
            onChange={onInputChange}
            icon={<FingerprintIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormField
            label="Teléfono"
            name="phone"
            editMode={editMode}
            value={formData.phone}
            error={errors.phone}
            onChange={onInputChange}
            icon={<PhoneIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormField
            label="Correo electrónico"
            name="email"
            editMode={editMode}
            value={formData.email}
            error={errors.email}
            onChange={onInputChange}
            icon={<EmailIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormField
            label="Fecha de Nacimiento"
            name="birthDate"
            type="date"
            editMode={editMode}
            value={formatDateForInput(formData.birthDate)}
            error={errors.birthDate}
            onChange={onInputChange}
            icon={<CakeIcon />}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            label="Ciudad"
            name="city"
            editMode={editMode}
            value={formData.city}
            error={errors.city}
            onChange={onInputChange}
            icon={<LocationCityIcon />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormField
            label="Dirección"
            name="address"
            editMode={editMode}
            value={formData.address}
            error={errors.address}
            onChange={onInputChange}
            icon={<HomeIcon />}
          />
        </Grid>
      </Grid>

      {!editMode && (
        <Box mt={3} pt={2} borderTop="1px dashed #ddd">
          <Typography variant="body2" color="text.secondary">
            <strong>Miembro desde:</strong> {new Date(user.joinDate).toLocaleDateString()}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default PersonalInfoForm;