// Función para generar montos aleatorios entre 2M y 10M
const getRandomInvestment = () => {
  const min = 2000000;
  const max = 10000000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const baseRankings = [
  {
    id: 1,
    name: "María González",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    investorType: "hero",
    featuredProject: "Nido de Agua",
    joinedDate: "15/03/2022"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    investorType: "adventurous",
    featuredProject: "Indie Universe",
    joinedDate: "22/07/2023"
  },
  {
    id: 3,
    name: "Ana López",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    investorType: "exploratory",
    featuredProject: "Patito Feo",
    joinedDate: "05/01/2024"
  },
  {
    id: 4,
    name: "Pedro Sánchez",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    investorType: "adventurous",
    featuredProject: "Aldea",
    joinedDate: "30/09/2022"
  },
  {
    id: 5,
    name: "Luisa Fernández",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    investorType: "hero",
    featuredProject: "Nido de Agua",
    joinedDate: "12/05/2023"
  },
  {
    id: 6,
    name: "Diego Ramírez",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    investorType: "exploratory",
    featuredProject: "Indie Universe",
    joinedDate: "18/11/2023"
  },
  {
    id: 7,
    name: "Camila Vargas",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    investorType: "hero",
    featuredProject: "Patito Feo",
    joinedDate: "03/04/2022"
  },
  {
    id: 8,
    name: "Andrés Morales",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    investorType: "adventurous",
    featuredProject: "Aldea",
    joinedDate: "27/08/2023"
  },
  {
    id: 9,
    name: "Valentina Ríos",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    investorType: "hero",
    featuredProject: "Nido de Agua",
    joinedDate: "09/02/2023"
  },
  {
    id: 10,
    name: "Jorge Mendoza",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    investorType: "exploratory",
    featuredProject: "Indie Universe",
    joinedDate: "14/10/2023"
  }
];

// Generar datos aleatorios y ordenar
export const rankings = baseRankings
  .map(investor => ({
    ...investor,
    totalInvested: getRandomInvestment(),
  }))
  .sort((a, b) => b.totalInvested - a.totalInvested); // Orden descendente