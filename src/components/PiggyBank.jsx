import React, { useState, useEffect } from 'react';
import SavingsIcon from '@mui/icons-material/Savings';
import PaidIcon from '@mui/icons-material/Paid';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CelebrationIcon from '@mui/icons-material/Celebration';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const getPiggyColors = (investorType) => {
  switch(investorType) {
    case 'Explorador':
      return {
        primary: '#4CAF50',
        light: '#E8F5E9',
        dark: '#388E3C',
        confetti: '#81C784'
      };
    case 'Aventurero':
      return {
        primary: '#FFC107',
        light: '#FFF8E1',
        dark: '#FFA000',
        confetti: '#FFD54F'
      };
    case 'Héroe':
      return {
        primary: '#F44336',
        light: '#FFEBEE',
        dark: '#D32F2F',
        confetti: '#E57373'
      };
    default:
      return {
        primary: '#2563EB',
        light: '#EFF6FF',
        dark: '#1D4ED8',
        confetti: '#93C5FD'
      };
  }
};

const PiggyBank = ({ initialDays = 30, initialDaily = 100000, initialGoal = 1062500, investorType = 'Aventurero' }) => {
  const colors = getPiggyColors(investorType);
  const [days, setDays] = useState(initialDays);
  const [dailyAmount, setDailyAmount] = useState(initialDaily);
  const [goal, setGoal] = useState(initialGoal);
  const [saved, setSaved] = useState(0);
  const [lastDepositDate, setLastDepositDate] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isEditing, setIsEditing] = useState({ days: false, daily: false, goal: false });
  const [tempValues, setTempValues] = useState({ days, daily: dailyAmount, goal });

  const motivationalPhrase = "Paso a paso, se construyen grandes logros.";
  const today = new Date().toISOString().split('T')[0];
  const daysLeft = Math.ceil((goal - saved) / dailyAmount);

  const handleInputChange = (field, value) => {
    setTempValues((prev) => ({ ...prev, [field]: Number(value) }));
  };

  const saveEdit = (field) => {
    if (field === 'days') setDays(tempValues.days);
    if (field === 'daily') setDailyAmount(tempValues.daily);
    if (field === 'goal') setGoal(tempValues.goal);
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const addDeposit = () => {
    if (saved + dailyAmount >= goal) {
      setSaved(goal);
    } else {
      setSaved(prev => prev + dailyAmount);
    }
    setLastDepositDate(today);
    setIsAnimating(true);
  };

  const resetSavings = () => {
    setSaved(0);
    setProgress(0);
    setShowConfetti(false);
    setLastDepositDate(null);
  };

  useEffect(() => {
    setProgress((saved / goal) * 100);
  }, [saved, goal]);

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (progress >= 100) {
      setShowConfetti(true);
      const timeout = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg relative overflow-hidden border border-gray-100">
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: colors.confetti,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
                opacity: Math.random() * 0.5 + 0.5
              }}
            />
          ))}
          <CelebrationIcon 
            style={{
              fontSize: '3.5rem',
              color: colors.primary,
              animation: 'bounce 1s infinite'
            }} 
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke={colors.light} strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={colors.primary}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83}, 283`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center ${isAnimating ? 'animate-piggy-jump' : ''}`}>
              {isAnimating ? (
                <SavingsIcon style={{ fontSize: '4.5rem', color: colors.dark }} />
              ) : (
                <PaidIcon style={{ fontSize: '4.5rem', color: colors.primary }} />
              )}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold mt-20" style={{ color: colors.primary }}>
                {progress.toFixed(1)}%
              </span>
            </div>
          </div>

          <button 
            onClick={addDeposit}
            disabled={progress >= 100 || lastDepositDate === today}
            className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              progress >= 100 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 
              lastDepositDate === today ? `bg-${colors.light} text-${colors.dark}` : 
              `bg-${colors.primary} text-white hover:bg-${colors.dark} shadow-md`
            }`}
            style={{
              backgroundColor: progress >= 100 ? '#E5E7EB' : 
                lastDepositDate === today ? colors.light : colors.primary,
              color: progress >= 100 ? '#6B7280' : 
                lastDepositDate === today ? colors.dark : 'white'
            }}
          >
            {progress >= 100 ? (
              <>
                <CheckIcon style={{ fontSize: '1.5rem' }} /> Meta completada
              </>
            ) : lastDepositDate === today ? (
              <>
                <CheckIcon style={{ fontSize: '1.5rem' }} /> Depósito realizado
              </>
            ) : (
              <>
                <PaidIcon style={{ fontSize: '1.5rem' }} /> Depositar ${dailyAmount.toLocaleString()}
              </>
            )}
          </button>
        </div>

        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUpIcon style={{ color: colors.primary, fontSize: '1.8rem' }} />
              Mi Plan de Ahorro
            </h2>
            {progress >= 100 && (
              <button 
                onClick={resetSavings} 
                className="text-sm px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                style={{ backgroundColor: colors.light, color: colors.dark }}
              >
                <RefreshIcon style={{ fontSize: '1.2rem' }} /> Reiniciar
              </button>
            )}
          </div>

          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            LOKL te da tu cerdito diario: no tienes el millón para invertir, te lo damos diario.
             <span className="font-medium" style={{ color: colors.primary }}>¡Ahorra con tu cerdito y crece tu inversión!</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Days setting */}
            <SettingCard
              label="Días configurados"
              value={`${days} días`}
              icon={<EditIcon style={{ fontSize: '1rem' }} />}
              isEditing={isEditing.days}
              tempValue={tempValues.days}
              onEdit={() => setIsEditing(prev => ({ ...prev, days: true }))}
              onChange={(e) => handleInputChange('days', e.target.value)}
              onSave={() => saveEdit('days')}
              min={1}
              max={365}
              colors={colors}
            />

            {/* Daily amount */}
            <SettingCard
              label="Ahorro diario"
              value={`$${dailyAmount.toLocaleString()}`}
              icon={<EditIcon style={{ fontSize: '1rem' }} />}
              isEditing={isEditing.daily}
              tempValue={tempValues.daily}
              onEdit={() => setIsEditing(prev => ({ ...prev, daily: true }))}
              onChange={(e) => handleInputChange('daily', e.target.value)}
              onSave={() => saveEdit('daily')}
              prefix="$"
              colors={colors}
            />

            {/* Total saved */}
            <SimpleCard 
              label="Total ahorrado" 
              value={`$${saved.toLocaleString()}`} 
              colors={colors} 
            />
            
            {/* Goal */}
            <SettingCard
              label="Meta de ahorro"
              value={`$${goal.toLocaleString()}`}
              icon={<EditIcon style={{ fontSize: '1rem' }} />}
              isEditing={isEditing.goal}
              tempValue={tempValues.goal}
              onEdit={() => setIsEditing(prev => ({ ...prev, goal: true }))}
              onChange={(e) => handleInputChange('goal', e.target.value)}
              onSave={() => saveEdit('goal')}
              prefix="$"
              colors={colors}
            />
          </div>

          {daysLeft > 0 && progress < 100 && (
            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: colors.light, border: `1px solid ${colors.primary}20` }}>
              <p style={{ color: colors.dark }}>
                <span className="font-semibold">Proyección:</span> Al ritmo actual, alcanzarás tu meta en <span className="font-bold">{daysLeft} días</span>.
              </p>
            </div>
          )}

          <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.light, border: `1px solid ${colors.primary}20` }}>
            <p className="italic text-center text-lg" style={{ color: colors.primary }}>"{motivationalPhrase}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingCard = ({ label, value, icon, isEditing, tempValue, onEdit, onChange, onSave, min, max, prefix, colors }) => (
  <div className="p-4 rounded-xl border" style={{ backgroundColor: colors.light, borderColor: colors.primary + '20' }}>
    <div className="flex justify-between items-center mb-2">
      <p className="text-sm font-medium text-gray-600">{label}</p>
      {isEditing ? (
        <div className="flex items-center">
          {prefix && <span className="mr-1 font-medium">{prefix}</span>}
          <input
            type="number"
            value={tempValue}
            onChange={onChange}
            min={min}
            max={max}
            className="w-20 mr-2 p-1.5 border rounded-md text-center"
          />
          <button 
            onClick={onSave} 
            className="text-xs text-white px-2 py-1.5 rounded-md hover:opacity-90"
            style={{ backgroundColor: colors.primary }}
          >
            <CheckIcon style={{ fontSize: '1rem' }} />
          </button>
        </div>
      ) : (
        <button 
          onClick={onEdit} 
          className="hover:opacity-80 flex items-center gap-1"
          style={{ color: colors.primary }}
        >
          <span className="font-semibold text-lg">{value}</span>
          {icon}
        </button>
      )}
    </div>
  </div>
);

const SimpleCard = ({ label, value, colors }) => (
  <div className="p-4 rounded-xl border" style={{ backgroundColor: colors.light, borderColor: colors.primary + '20' }}>
    <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
    <p className="font-bold text-2xl" style={{ color: colors.primary }}>{value}</p>
  </div>
);

export default PiggyBank;