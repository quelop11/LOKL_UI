// src/services/format.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(amount);
};

export const getMonthName = (monthIndex) => {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  return months[monthIndex];
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${day} de ${getMonthName(parseInt(month) - 1)} de ${year}`;
  }
  
  return dateString;
};

export const formatJoinDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()} de ${getMonthName(date.getMonth())} de ${date.getFullYear()}`;
};