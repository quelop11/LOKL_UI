// src/components/AchievementsSection.jsx
import React from 'react';
import Badge from './Badge';

const AchievementsSection = ({ achievementsUnlocked, totalAchievements, userBadges, simulateAchievementProgress }) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#212529]">
          Mis Insignias ({achievementsUnlocked}/{totalAchievements})
        </h2>
        <button 
          onClick={simulateAchievementProgress}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
        >
          Simular Progreso
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userBadges.map((badge) => (
          <Badge key={badge.id} {...badge} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;