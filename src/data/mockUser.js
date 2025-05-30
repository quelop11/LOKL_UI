export const mockUser = {
  id: 'user-123',
  personalInfo: {
    firstName: 'Juan',
    lastName: 'Pérez',
    cc: '1234567890',
    phone: '3001234567',
    email: 'juan.perez@lokl.life',
    birthDate: '15/05/1985',
    city: 'Medellín',
    address: 'Av. Nutibara #71-25'
  },
  joinDate: '2020-03-15',
  investorType: 'Explorador', // Héroe, Explorador, Aventurero
  profileCompletion: 65,
  photoUrl: "https://randomuser.me/api/portraits/men/10.jpg",
  badges: {
    unlocked: [1, 6, 9], // IDs de badges desbloqueados
    progress: {
      2: 3,  
      4: 1,
      5: 1,
      7: 0,
      8: 0
    }
  },
  stats: {
    investmentTotal: 1250000,
    referrals: 3,
    consecutiveMonths: 1,
    projectsInvested: 1,
    earlyProjectInvestments: 1,
    monthlyRank: 0,
    vipReferrals: 0
  }
}