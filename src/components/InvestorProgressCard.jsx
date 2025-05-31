import React from 'react';
import { Trophy } from 'lucide-react';

const InvestorProgressCard = ({ 
  levelInfo, 
  profileCompletion, 
  achievementsUnlocked, 
  totalAchievements,
  editMode,
  unlockedBadges,
  user,
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
        {/* Nueva sección de información de nivel */}
        <div className="flex items-center justify-between rounded-lg bg-white/10 p-3 backdrop-blur-sm mb-4">
          <div>
            <p className="text-sm font-medium text-white/80">Nivel actual</p>
            <p className="text-lg font-bold">{user?.stats?.level || 1}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">Siguiente nivel</p>
            <p className="text-lg font-bold">{currentLevelInfo?.nextLevel || "Máximo"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">Logros necesarios</p>
            <p className="text-lg font-bold">
              {achievementsUnlocked}/{currentLevelInfo?.requiredAchievements || totalAchievements}
            </p>
          </div>
        </div>

        {/* Sección de progreso del perfil */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Perfil completado</span>
            <span className="font-medium">{profileCompletion}%</span>
          </div>
          <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full" 
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
        </div>

        {/* Sección de logros desbloqueados (solo visible cuando NO está en modo edición) */}
        {!editMode && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Logros desbloqueados</span>
              <span className="font-medium">
                {achievementsUnlocked}/{totalAchievements}
              </span>
            </div>
            
            {/* Iconos de logros - versión compacta */}
            <div className="flex flex-wrap gap-2 mt-2">
              {unlockedBadges.map((badge, index) => (
                <div 
                  key={index}
                  className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center p-1"
                  title={badge.title}
                >
                  {badge.icon}
                </div>
              ))}
              
              {Array.from({ length: totalAchievements - achievementsUnlocked }).map((_, i) => (
                <div 
                  key={`empty-${i}`}
                  className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center p-1"
                >
                  <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECCIÓN DE LOGROS DURANTE EDICIÓN (solo visible en modo edición) */}
        {editMode && (
          <div className="p-3 rounded-lg mb-4">
            <h4 className="text-sm font-medium mb-3">Tus Logros</h4>
            
            <div className="grid grid-cols-3 gap-3">
              {unlockedBadges.length > 0 ? (
                unlockedBadges.map((badge, index) => (
                  <div 
                    key={index}
                    className="bg-white/20 border border-white/30 rounded-lg p-3 flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:scale-[1.02]"
                    title={badge.title}
                  >
                    <div className="text-white text-2xl">
                      {React.cloneElement(badge.icon, { style: { fontSize: 24 } })}
                    </div>
                    <span className="text-xs font-medium text-white text-center">{badge.title}</span>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-4 text-sm text-white/80">
                  Aún no has desbloqueado logros
                </div>
              )}
            </div>
            
            {achievementsUnlocked < totalAchievements && (
              <div className="text-xs text-white/80 mt-3 text-center">
                Completa más acciones para desbloquear {totalAchievements - achievementsUnlocked} logros adicionales
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorProgressCard;