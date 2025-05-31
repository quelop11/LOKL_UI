import React from 'react';
import { Trophy } from 'lucide-react';

const InvestorProgressCard = ({ 
  levelInfo, 
  profileCompletion, 
  achievementsUnlocked, 
  totalAchievements,
  userStats,
  unlockedBadges,
  currentLevelInfo
}) => {
  return (
    <div className="overflow-hidden rounded-xl border-none bg-gradient-to-br from-[#3533FF] to-[#4845ff] text-white shadow-lg">
      <div className="p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{levelInfo.name}</h2>
          <p className="text-xs text-white/80 mt-1">{levelInfo.description}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 p-1">
          <Trophy className="h-6 w-6 text-white" />
        </div>
      </div>
      
      <div className="px-4 pb-4">
        {/* Sección de progreso del perfil */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Perfil completado</span>
            <span className="font-medium">{profileCompletion}%</span>
          </div>
          <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
        </div>

        {/* Sección de logros desbloqueados */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Logros desbloqueados</span>
            <span className="font-medium">
              {achievementsUnlocked}/{totalAchievements}
            </span>
          </div>
          
          {/* Grid de logros */}
          <div className="grid grid-cols-6 gap-2">
            {/* Logros desbloqueados */}
            {unlockedBadges.slice(0, 6).map((badge, index) => (
              <div 
                key={index}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center p-1 border border-white/30"
                title={badge.title}
              >
                <div className="text-white text-sm">
                  {React.cloneElement(badge.icon, { style: { fontSize: 16 } })}
                </div>
              </div>
            ))}
            
            {/* Espacios vacíos para logros no desbloqueados */}
            {Array.from({ length: Math.max(0, 6 - unlockedBadges.length) }).map((_, i) => (
              <div 
                key={`empty-${i}`}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/20"
              >
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
              </div>
            ))}
          </div>
          
          {/* Mostrar más logros si hay más de 6 */}
          {unlockedBadges.length > 6 && (
            <div className="text-xs text-white/80 mt-2 text-center">
              +{unlockedBadges.length - 6} logros adicionales
            </div>
          )}
          
          {/* Mensaje motivacional */}
          {achievementsUnlocked === 0 && (
            <div className="text-xs text-white/80 mt-2 text-center">
              ¡Comienza a invertir para desbloquear logros!
            </div>
          )}
        </div>

        {/* Estadísticas adicionales */}
        <div className="flex justify-center gap-12 rounded-lg bg-white/10 p-3 backdrop-blur-sm">
  <div className="text-center">
    <p className="text-sm font-medium text-white/80">Nivel actual</p>
    <p className="text-lg font-bold">{userStats?.level || 1}</p>
  </div>
  <div className="text-center">
    <p className="text-sm font-medium text-white/80">Siguiente nivel</p>
    <p className="text-lg font-bold">{currentLevelInfo?.nextLevel || "Máximo"}</p>
  </div>
</div>
      </div>
    </div>
  );
};

export default InvestorProgressCard;