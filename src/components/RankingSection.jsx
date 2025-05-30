// src/components/RankingSection.jsx
import React from 'react';
import { formatCurrency } from '../services/format';
import { Trophy, Star, BarChart, User, ArrowUp, ArrowDown } from 'lucide-react';
import { mockUser } from '../data/mockUser';
import { rankings } from '../data/rankings';

const RankingSection = () => {
  // Mapear tipos de inversor
  const investorTypeMap = {
    'hero': 'Héroe',
    'adventurous': 'Aventurero',
    'exploratory': 'Explorador'
  };

  // Añadir mockUser al ranking
  const fullRankings = [
    ...rankings,
    { 
      ...mockUser, 
      id: mockUser.id,
      name: mockUser.personalInfo.firstName + ' ' + mockUser.personalInfo.lastName,
      investorType: mockUser.investorType.toLowerCase(),
      featuredProject: 'Indie Universe',
      totalInvested: 5500000,
      avatar: mockUser.photoUrl || null
    }
  ]
  .sort((a, b) => b.totalInvested - a.totalInvested)
  .slice(0, 10); // Mostrar solo top 10

  // Encontrar la posición del usuario actual
  const userPosition = fullRankings.findIndex(u => u.id === mockUser.id) + 1;

  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-8 w-8 text-[#3533FF]" />
        <h2 className="text-2xl font-bold text-[#212529]">Ranking Mensual de Inversionistas</h2>
      </div>

      {/* Top 3 inversionistas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {fullRankings.slice(0, 3).map((user, index) => (
          <div 
            key={user.id} 
            className={`bg-gradient-to-br ${
              index === 0 ? 'from-yellow-100 to-yellow-50 border-yellow-200' : 
              index === 1 ? 'from-gray-100 to-gray-50 border-gray-200' : 
              'from-amber-100 to-amber-50 border-amber-200'
            } rounded-xl shadow-lg p-6 text-center border`}
          >
            <div className="relative mx-auto w-24 h-24 mb-4">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#3533FF] flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-md">
                  {user.name.charAt(0)}
                </div>
              )}
              
              <div className={`absolute -top-2 -right-2 flex items-center justify-center w-10 h-10 rounded-full ${
                index === 0 ? 'bg-yellow-400' : 
                index === 1 ? 'bg-gray-400' : 
                'bg-amber-700'
              }`}>
                <span className="text-white font-bold text-lg">
                  {index + 1}
                </span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {user.name}
            </h3>
            
            <div className="mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.investorType === 'exploratory' ? 'bg-emerald-100 text-emerald-800' :
                user.investorType === 'adventurous' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {investorTypeMap[user.investorType]}
              </span>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Proyecto destacado</p>
              <p className="font-bold text-[#3533FF]">{user.featuredProject}</p>
            </div>
            
            <div className="flex justify-center items-center gap-2">
              <ArrowUp className="h-5 w-5 text-green-500" />
              <span className="text-lg font-bold text-gray-800">
                {formatCurrency(user.totalInvested)}
              </span>
            </div>
            <p className="text-sm text-gray-500">Total invertido</p>
          </div>
        ))}
      </div>

      {/* Tabla de ranking completo */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="grid grid-cols-12 bg-gradient-to-r from-[#3533FF] to-[#4845ff] text-white p-4 font-bold text-sm">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Inversionista</div>
          <div className="col-span-2">Tipo</div>
          <div className="col-span-3">Total Invertido</div>
          <div className="col-span-2">Proyecto</div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {fullRankings.map((user, index) => (
            <div 
              key={user.id} 
              className={`grid grid-cols-12 p-4 items-center ${
                user.id === mockUser.id ? 'bg-blue-50 border-l-4 border-[#3533FF]' : ''
              }`}
            >
              <div className="col-span-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                  index === 1 ? 'bg-gray-100 text-gray-800' : 
                  index === 2 ? 'bg-amber-100 text-amber-800' : 
                  'bg-gray-50 text-gray-600'
                }`}>
                  <span className="font-bold">{index + 1}</span>
                </div>
              </div>
              
              <div className="col-span-4 flex items-center gap-3">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#3533FF] flex items-center justify-center text-white">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="font-medium">{user.name}</span>
              </div>
              
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.investorType === 'exploratory' ? 'bg-emerald-100 text-emerald-800' :
                  user.investorType === 'adventurous' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {investorTypeMap[user.investorType]}
                </span>
              </div>
              
              <div className="col-span-3 font-bold text-gray-800">
                {formatCurrency(user.totalInvested)}
              </div>
              
              <div className="col-span-2 text-sm text-gray-600">
                {user.featuredProject}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Posición del usuario */}
      <div className="bg-gradient-to-r from-[#3533FF]/5 to-[#4845ff]/10 rounded-xl p-6 border border-[#3533FF]/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#3533FF] flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Tu posición en el ranking</h3>
              <p className="text-gray-600">Sigue invirtiendo para subir de posición</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 min-w-[120px] text-center">
            <div className="text-3xl font-bold text-[#3533FF]">
              #{userPosition}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              de {fullRankings.length} inversionistas
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-lg p-4 border border-[#3533FF]/30">
            <div className="flex items-center gap-2 justify-center">
              {userPosition > 1 ? (
                <>
                  <ArrowUp className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">
                    ¡Estás a {userPosition - 1} puesto(s) del top 3!
                  </span>
                </>
              ) : (
                <span className="text-sm font-medium text-[#3533FF]">
                  ¡Felicidades! Estás en el top del ranking
                </span>
              )}
            </div>
            
            {userPosition > 3 && (
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-500">
                  Para alcanzar el puesto {userPosition - 1} necesitas invertir al menos
                </p>
                <p className="font-bold">
                  {formatCurrency(fullRankings[userPosition - 2].totalInvested + 100000)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingSection;