// src/pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { 
  Bell, Medal, PiggyBank, Shield, Trophy, Wallet, CreditCard, X, Check
} from 'lucide-react';
import { mockUser } from '../data/mockUser';
import { badges } from '../data/badges';
import { getUserBadges, checkBadgeUnlocks, updateBadgeProgress } from '../services/badgeService';
import { formatDate, formatJoinDate } from '../services/format';

// Importar iconos de Material UI
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LoopIcon from '@mui/icons-material/Loop';
import NatureIcon from '@mui/icons-material/Nature';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

// Importar logo y avatares
import logo from '../assets/LOKL_LogoNegro.png';
import avatar1 from '../assets/avatars/avatar1.png';

// Importar los componentes refactorizados
import UserInfoCard from '../components/UserInfoCard';
import EditProfileModal from '../components/EditProfileModal';
import InvestorProgressCard from '../components/InvestorProgressCard';

// Importar los otros componentes de secciones
import AchievementsSection from '../components/AchievementsSection';
import PiggyBankSection from '../components/PiggyBankSection';
import RankingSection from '../components/RankingSection';
import IdentityVerificationSection from '../components/IdentityVerificationSection';
import PaymentMethodsSection from '../components/PaymentMethodsSection';
import BankAccountsSection from '../components/BankAccountsSection';

const UserProfile = () => {
  // Estado inicial con datos vacíos para que el progreso comience en 0
  const [user, setUser] = useState({
    investorType: 'Aventurero',
    achievements: {
      completed: 0,
      total: badges.length
    },
    stats: {
      level: 1,
      investmentTotal: 0,
      projectsInvested: 0,
      consecutiveMonths: 0,
      referrals: 0,
      vipReferrals: 0,
      monthlyRank: 0
    },
    personalInfo: {
      firstName: '',
      lastName: '',
      cc: '',
      birthDate: '',
      phone: '',
      email: '',
      city: '',
      address: ''
    },
    joinDate: new Date().toISOString(),
    badges: {
      unlocked: [],
      progress: {}
    },
    photoUrl: avatar1
  });

  // Estados del modal y UI
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('achievements');
  const [userBadges, setUserBadges] = useState([]);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const loadedBadges = getUserBadges(user);
    setUserBadges(loadedBadges);
  }, [user]);

  // Función para mostrar alertas de éxito
  const showSuccess = (message) => {
    setAlertMessage(message);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  // Función para mostrar alertas de error
  const showError = (message) => {
    setAlertMessage(message);
    setShowErrorAlert(true);
    setTimeout(() => setShowErrorAlert(false), 3000);
  };

  const updateUserStats = (updatedStats) => {
    setUser(prev => {
      const newStats = { ...prev.stats, ...updatedStats };
      const newBadges = updateBadgeProgress(prev, newStats);
      const unlockedBadges = checkBadgeUnlocks(prev, newStats);

      if (unlockedBadges.length > 0) {
        setNewlyUnlockedBadge(unlockedBadges[0]);
        setShowUnlockModal(true);
        return {
          ...prev,
          stats: newStats,
          badges: {
            unlocked: [...prev.badges.unlocked, ...unlockedBadges.map(b => b.id)],
            progress: newBadges.progress
          },
          achievements: {
            completed: prev.badges.unlocked.length + unlockedBadges.length,
            total: badges.length
          }
        };
      }

      return {
        ...prev,
        stats: newStats,
        badges: newBadges
      };
    });
  };

  const simulateAchievementProgress = () => {
    const actions = [
      { referrals: user.stats.referrals + 1 },
      { investmentTotal: user.stats.investmentTotal + 500000 },
      { consecutiveMonths: user.stats.consecutiveMonths + 1 },
      { projectsInvested: user.stats.projectsInvested + 1 },
      { monthlyRank: Math.floor(Math.random() * 10) },
      { vipReferrals: user.stats.vipReferrals + 1 }
    ];

    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    updateUserStats(randomAction);
  };

  // Función para manejar el guardado del perfil desde el modal
  const handleSaveProfile = (formData, tempPhoto) => {
    const formDataToSave = { ...formData };
    
    // Procesar fecha si es necesario
    if (formDataToSave.birthDate && /^\d{4}-\d{2}-\d{2}$/.test(formDataToSave.birthDate)) {
      const [year, month, day] = formDataToSave.birthDate.split('-');
      formDataToSave.birthDate = `${day}/${month}/${year}`;
    }

    // Validar formulario
    const newErrors = validateForm(formDataToSave);

    if (Object.keys(newErrors).length > 0) {
      showError('Por favor corrige los errores en el formulario');
      return;
    }

    // Actualizar usuario
    setUser(prev => ({
      ...prev,
      personalInfo: formDataToSave,
      photoUrl: tempPhoto || prev.photoUrl,
      profileCompletion: calculateProfileCompletion(formDataToSave)
    }));
    
    showSuccess('Perfil actualizado correctamente!');
  };

  const handleInvestorTypeChange = (newType) => {
    setUser(prev => ({
      ...prev,
      investorType: newType
    }));
  };

  const getUserInitials = (user) => {
    const first = user.personalInfo?.firstName || '';
    const last = user.personalInfo?.lastName || '';
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  const levelProgress = {
    Explorador: {
      name: "Explorador",
      description: "Inversor Conservador",
      color: "bg-emerald-500",
      nextLevel: "Aventurero",
      requiredAchievements: 5,
    },
    Aventurero: {
      name: "Aventurero",
      description: "Immune: Multimedia",
      color: "bg-blue-600",
      nextLevel: "Héroe",
      requiredAchievements: 7,
    },
    Héroe: {
      name: "Héroe",
      description: "Inversor Experto",
      color: "bg-purple-600",
      nextLevel: null,
      requiredAchievements: 9,
    },
  };

  // Mapeo de iconos para los logros usando Material UI
  const badgeIcons = {
    'Inversor Novato': <MilitaryTechIcon style={{ fontSize: 16 }} />,
    'Top Inversor': <WorkspacePremiumIcon style={{ fontSize: 16 }} />,
    'Inversor Recurrente': <LoopIcon style={{ fontSize: 16 }} />,
    'Multiproyectos': <NatureIcon style={{ fontSize: 16 }} />,
    'Fundador Temprano': <NewReleasesIcon style={{ fontSize: 16 }} />,
    'Recomiéndame Más': <PeopleIcon style={{ fontSize: 16 }} />,
    'Recomendación VIP': <EmojiEventsIcon style={{ fontSize: 16 }} />,
    'Líder del Mes': <EmojiEventsIcon style={{ fontSize: 16 }} />,
    'Bono de Bienvenida': <CardGiftcardIcon style={{ fontSize: 16 }} />,
    'default': <AttachMoneyIcon style={{ fontSize: 16 }} />
  };

  const currentLevelInfo = levelProgress[user.investorType] || levelProgress.Explorador;
  const profileCompletion = user.profileCompletion || calculateProfileCompletion(user.personalInfo || {});
  const achievementsUnlocked = user.achievements?.completed || 0;
  const totalAchievements = user.achievements?.total || badges.length;

  // Obtener los logros desbloqueados con sus iconos
  const unlockedBadgesWithIcons = user.badges.unlocked.map(badgeId => {
    const badge = badges.find(b => b.id === badgeId);
    return {
      id: badgeId,
      title: badge?.title || 'Logro Desbloqueado',
      icon: badgeIcons[badge?.title] || badgeIcons.default
    };
  });

  const tabs = [
    {
      id: 'achievements',
      label: 'Mis Logros',
      icon: <Medal className="h-4 w-4" />,
      content: (
        <AchievementsSection 
          achievementsUnlocked={achievementsUnlocked}
          totalAchievements={totalAchievements}
          userBadges={userBadges}
          simulateAchievementProgress={simulateAchievementProgress}
        />
      )
    },
    {
      id: 'piggy',
      label: 'Mi Cerdito',
      icon: <PiggyBank className="h-4 w-4" />,
      content: <PiggyBankSection />
    },
    {
      id: 'ranking',
      label: 'Ranking Mensual',
      icon: <Trophy className="h-4 w-4" />,
      content: <RankingSection />
    },  
    {
      id: 'identity',
      label: 'Validación de Identidad',
      icon: <Shield className="h-4 w-4" />,
      content: <IdentityVerificationSection />
    },
    {
      id: 'payment',
      label: 'Método de Pago',
      icon: <Wallet className="h-4 w-4" />,
      content: <PaymentMethodsSection showSuccess={showSuccess} showError={showError} />
    },
    {
      id: 'accounts',
      label: 'Cuentas Bancarias',
      icon: <CreditCard className="h-4 w-4" />,
      content: <BankAccountsSection showSuccess={showSuccess} showError={showError} />
    }
  ];

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Alertas flotantes con estilo LOKL */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg flex items-center animate-fade-in">
            <Check className="h-6 w-6 mr-2" />
            <span>{alertMessage}</span>
            <button 
              onClick={() => setShowSuccessAlert(false)}
              className="ml-4 text-green-700 hover:text-green-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      
      {showErrorAlert && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg flex items-center animate-fade-in">
            <X className="h-6 w-6 mr-2" />
            <span>{alertMessage}</span>
            <button 
              onClick={() => setShowErrorAlert(false)}
              className="ml-4 text-red-700 hover:text-red-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
        <div className="flex items-center">
          <div className="flex items-center h-full">
            <img 
              src={logo} 
              alt="LOKL Logo" 
              className="h-10 object-contain"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100 flex items-center">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3533FF] text-xs text-white">
              3
            </span>
          </button>
          
          <div className="h-8 w-8 rounded-full border-2 border-[#3533FF] overflow-hidden flex items-center justify-center">
            {user.photoUrl ? (
              <img src={user.photoUrl} alt="User" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#3533FF] flex items-center justify-center text-white">
                {getUserInitials(user)}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#212529]">Mi Perfil</h1>
          <p className="text-sm text-gray-500">Gestiona tu información y sigue tu progreso como inversionista</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Componente InvestorProgressCard refactorizado */}
          <InvestorProgressCard 
            levelInfo={currentLevelInfo}
            profileCompletion={profileCompletion}
            achievementsUnlocked={achievementsUnlocked}
            totalAchievements={totalAchievements}
            userStats={user.stats}
            unlockedBadges={unlockedBadgesWithIcons}
          />

          {/* Componente UserInfoCard refactorizado */}
          <UserInfoCard 
            user={user}
            onEditClick={() => setIsEditModalOpen(true)}
            getUserInitials={getUserInitials}
          />
        </div>

        {/* Tabs Section */}
        <div className="mt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Tabs Navigation */}
            <div className="w-full md:w-64">
              <div className="rounded-lg border bg-white shadow-md p-2">
                <div className="space-y-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-[#3533FF]/10 text-[#3533FF]' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 rounded-lg border bg-white shadow-sm p-4">
              {activeTabContent}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de edición de perfil */}
      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
        calculateProfileCompletion={calculateProfileCompletion}
      />

      {/* Achievement Unlocked Modal */}
      {showUnlockModal && newlyUnlockedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full animate-bounce-in">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                {newlyUnlockedBadge.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Logro Desbloqueado!</h3>
              <p className="text-lg font-medium text-gray-700 mb-4">{newlyUnlockedBadge.title}</p>
              <p className="text-gray-600 mb-6">{newlyUnlockedBadge.description}</p>
              {newlyUnlockedBadge.bonus && (
                <p className="text-green-600 bg-green-50 p-2 rounded-md mb-4">
                  {newlyUnlockedBadge.bonus}
                </p>
              )}
              <button
                onClick={() => setShowUnlockModal(false)}
                className="px-6 py-2 bg-[#3533FF] text-white rounded-lg hover:bg-[#2a28e0] transition-colors"
              >
                ¡Genial!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
const validateForm = (formData) => {
  const errors = {};

  if (formData.cc && !/^\d{6,12}$/.test(formData.cc)) {
    errors.cc = 'Cédula inválida (6-12 dígitos)';
  }

  if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
    errors.phone = 'Teléfono debe tener 10 dígitos';
  }

  if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Correo electrónico inválido';
  }

  return errors;
};

const calculateProfileCompletion = (data) => {
  const fields = [
    { key: 'firstName', validator: value => !!value },
    { key: 'lastName', validator: value => !!value },
    { key: 'cc', validator: value => !value || /^\d{6,12}$/.test(value) },
    { key: 'phone', validator: value => !value || /^\d{10}$/.test(value) },
    { key: 'email', validator: value => !value || /\S+@\S+\.\S+/.test(value) },
    { key: 'city', validator: value => !!value },
    { key: 'address', validator: value => !!value },
    { key: 'birthDate', validator: value => !!value }
  ];

  const completedFields = fields.filter(field => {
    const value = data[field.key];
    return field.validator(value);
  }).length;
  
  return Math.round((completedFields / fields.length) * 100);
};

export default UserProfile;