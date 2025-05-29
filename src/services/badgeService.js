import { badges } from '../data/badges';

// Función para mapear badges con estado del usuario
export const getUserBadges = (user) => {
  return badges.map(badge => {
    const unlocked = user.badges.unlocked.includes(badge.id);
    const progress = unlocked ? badge.maxProgress : 
                    (user.badges.progress[badge.id] || 0);
    
    return {
      ...badge,
      progress,
      unlocked
    };
  });
};

// Función para verificar si se desbloquean nuevos badges
export const checkBadgeUnlocks = (user, updatedStats) => {
  const newUnlocks = [];
  const mergedStats = { ...user.stats, ...updatedStats };

  badges.forEach(badge => {
    if (!user.badges.unlocked.includes(badge.id)) {
      let isUnlocked = false;
      
      switch(badge.id) {
        case 1: // Inversor Novato ($1,000,000)
          isUnlocked = mergedStats.investmentTotal >= badge.maxProgress;
          break;
        case 2: // Recomiéndame Más (5 referidos)
          isUnlocked = mergedStats.referrals >= badge.maxProgress;
          break;
        case 3: // Top Inversor (top 3 mensual)
          isUnlocked = mergedStats.monthlyRank <= 3 && mergedStats.monthlyRank > 0;
          break;
        case 4: // Inversor Recurrente (6 meses)
          isUnlocked = mergedStats.consecutiveMonths >= badge.maxProgress;
          break;
        case 5: // Multiproyectos (4 proyectos)
          isUnlocked = mergedStats.projectsInvested >= badge.maxProgress;
          break;
        case 6: // Fundador Temprano 
          isUnlocked = mergedStats.earlyProjectInvestments >= badge.maxProgress;
          break;
        case 7: // Líder del Mes (#1 mensual)
          isUnlocked = mergedStats.monthlyRank === 1;
          break;
        case 8: // Recomendación VIP ($12M referido)
          isUnlocked = mergedStats.vipReferrals >= badge.maxProgress;
          break;
        case 9: // Bono de Bienvenida 
          isUnlocked = true;
          break;
      }

      if (isUnlocked) {
        newUnlocks.push(badge);
      }
    }
  });

  return newUnlocks;
};

// Función para actualizar el progreso de badges
export const updateBadgeProgress = (user, updatedStats) => {
  const progressUpdates = {};
  
  // Actualizar progreso para badges relevantes
  if (updatedStats.referrals !== undefined) {
    progressUpdates[2] = updatedStats.referrals;
  }
  if (updatedStats.consecutiveMonths !== undefined) {
    progressUpdates[4] = updatedStats.consecutiveMonths;
  }
  if (updatedStats.projectsInvested !== undefined) {
    progressUpdates[5] = updatedStats.projectsInvested;
  }
  if (updatedStats.monthlyRank !== undefined) {
    progressUpdates[3] = updatedStats.monthlyRank > 0 ? 1 : 0;
    progressUpdates[7] = updatedStats.monthlyRank === 1 ? 1 : 0;
  }
  if (updatedStats.vipReferrals !== undefined) {
    progressUpdates[8] = updatedStats.vipReferrals;
  }

  return {
    ...user.badges,
    progress: {
      ...user.badges.progress,
      ...progressUpdates
    }
  };
};