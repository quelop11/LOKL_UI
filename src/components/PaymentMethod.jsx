import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const PaymentMethod = ({ investorType }) => {
  const theme = useTheme();
  const [cards, setCards] = useState([
    {
      id: '1',
      last4: '4242',
      brand: 'visa',
      expMonth: '12',
      expYear: '25',
      isDefault: true,
      name: 'Juan Perez'
    },
    {
      id: '2',
      last4: '5555',
      brand: 'mastercard',
      expMonth: '08',
      expYear: '24',
      isDefault: false,
      name: 'Juan Perez'
    }
  ]);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    isDefault: false
  });
  const [errors, setErrors] = useState({});

  const getBorderColor = () => {
    switch(investorType) {
      case 'Explorador': return '#4CAF50';
      case 'Aventurero': return '#FFC107';
      case 'Héroe': return '#F44336';
      default: return theme.palette.divider;
    }
  };

  const getCardIcon = (brand) => {
    switch(brand) {
      case 'visa': return '/icons/visa.png';
      case 'mastercard': return '/icons/mastercard.png';
      case 'amex': return '/icons/amex.png';
      default: return '/icons/credit-card.png';
    }
  };

  const handleOpenAddDialog = () => {
    setCurrentCard(null);
    setFormData({
      cardNumber: '',
      cardName: '',
      expMonth: '',
      expYear: '',
      cvc: '',
      isDefault: cards.length === 0
    });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (card) => {
    setCurrentCard(card);
    setFormData({
      cardNumber: `•••• •••• •••• ${card.last4}`,
      cardName: card.name,
      expMonth: card.expMonth,
      expYear: card.expYear,
      cvc: '•••',
      isDefault: card.isDefault
    });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!editMode) {
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Número de tarjeta inválido';
      }
      
      if (!formData.cvc.trim() || formData.cvc.length !== 3) {
        newErrors.cvc = 'CVC inválido';
      }
    }
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Nombre en la tarjeta es requerido';
    }
    
    if (!formData.expMonth || !formData.expYear) {
      newErrors.expDate = 'Fecha de expiración es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    if (editMode && currentCard) {
      // Actualizar tarjeta existente
      const updatedCards = cards.map(card => {
        if (card.id === currentCard.id) {
          return {
            ...card,
            name: formData.cardName,
            expMonth: formData.expMonth,
            expYear: formData.expYear,
            isDefault: formData.isDefault
          };
        }
        return {
          ...card,
          isDefault: formData.isDefault ? false : card.isDefault
        };
      });
      
      setCards(updatedCards);
    } else {
      // Agregar nueva tarjeta
      const last4 = editMode ? currentCard.last4 : formData.cardNumber.slice(-4);
      const brand = editMode ? currentCard.brand : 
        formData.cardNumber.startsWith('4') ? 'visa' : 
        formData.cardNumber.startsWith('5') ? 'mastercard' : 'other';
      
      const newCard = {
        id: Date.now().toString(),
        last4,
        brand,
        expMonth: formData.expMonth,
        expYear: formData.expYear,
        isDefault: formData.isDefault,
        name: formData.cardName
      };
      
      const updatedCards = formData.isDefault 
        ? cards.map(card => ({ ...card, isDefault: false }))
        : [...cards];
      
      setCards([...updatedCards, newCard]);
    }
    
    handleCloseDialog();
  };

  const handleDelete = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleSetDefault = (cardId) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h6" fontWeight="600">
          Métodos de Pago
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{
            backgroundColor: getBorderColor(),
            '&:hover': { backgroundColor: getBorderColor(), opacity: 0.9 }
          }}
        >
          Añadir Tarjeta
        </Button>
      </Box>
      
      {cards.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          p: 4, 
          border: '1px dashed', 
          borderColor: 'divider', 
          borderRadius: 2 
        }}>
          <CreditCardIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="body1" color="text.secondary" gutterBottom>
            No tienes métodos de pago registrados
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Añade una tarjeta para realizar inversiones de manera rápida y segura
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} key={card.id}>
              <Card
                sx={{
                  border: '2px solid',
                  borderColor: card.isDefault ? getBorderColor() : 'divider',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                {card.isDefault && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: 10,
                      backgroundColor: getBorderColor(),
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                    Predeterminada
                  </Box>
                )}
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      src={getCardIcon(card.brand)} 
                      alt={card.brand} 
                      sx={{ width: 40, height: 40, mr: 2 }} 
                    />
                    <Typography variant="h6">
                      •••• •••• •••• {card.last4}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Nombre en la tarjeta
                    </Typography>
                    <Typography variant="body1">
                      {card.name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Expiración
                      </Typography>
                      <Typography variant="body1">
                        {card.expMonth}/{card.expYear}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenEditDialog(card)}
                        sx={{ color: 'text.secondary' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(card.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  {!card.isDefault && (
                    <Button
                      size="small"
                      onClick={() => handleSetDefault(card.id)}
                      sx={{ mt: 2, fontSize: 12 }}
                    >
                      Establecer como predeterminada
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Editar Tarjeta' : 'Añadir Nueva Tarjeta'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Tipo de tarjeta
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Avatar src="/icons/visa.png" alt="Visa" sx={{ width: 40, height: 40 }} />
              <Avatar src="/icons/mastercard.png" alt="Mastercard" sx={{ width: 40, height: 40 }} />
              <Avatar src="/icons/amex.png" alt="American Express" sx={{ width: 40, height: 40 }} />
            </Box>
          </Box>
          
          {!editMode && (
            <TextField
              fullWidth
              label="Número de tarjeta"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
              placeholder="1234 5678 9012 3456"
              sx={{ mb: 3 }}
            />
          )}
          
          <TextField
            fullWidth
            label="Nombre en la tarjeta"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            error={!!errors.cardName}
            helperText={errors.cardName}
            sx={{ mb: 3 }}
          />
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Mes de expiración</InputLabel>
                <Select
                  name="expMonth"
                  value={formData.expMonth}
                  onChange={handleInputChange}
                  label="Mes de expiración"
                  error={!!errors.expDate}
                >
                  {months.map(month => (
                    <MenuItem key={month} value={month}>{month}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Año de expiración</InputLabel>
                <Select
                  name="expYear"
                  value={formData.expYear}
                  onChange={handleInputChange}
                  label="Año de expiración"
                  error={!!errors.expDate}
                >
                  {years.map(year => (
                    <MenuItem key={year} value={year.slice(-2)}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {errors.expDate && (
              <Grid item xs={12}>
                <Typography color="error" variant="body2">
                  {errors.expDate}
                </Typography>
              </Grid>
            )}
          </Grid>
          
          {!editMode && (
            <TextField
              fullWidth
              label="CVC"
              name="cvc"
              value={formData.cvc}
              onChange={handleInputChange}
              error={!!errors.cvc}
              helperText={errors.cvc}
              placeholder="123"
              sx={{ mb: 3 }}
            />
          )}
          
          <FormControl fullWidth>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="isDefault">
                Establecer como método de pago predeterminado
              </label>
            </Box>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{ backgroundColor: getBorderColor(), '&:hover': { backgroundColor: getBorderColor() } }}
          >
            {editMode ? 'Guardar Cambios' : 'Añadir Tarjeta'}
          </Button>
        </DialogActions>
      </Dialog>
      
      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Nota:</strong> Tus datos de pago se almacenan de forma segura con nuestro procesador de pagos certificado PCI DSS. Nunca almacenamos los números completos de tu tarjeta.
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentMethod;