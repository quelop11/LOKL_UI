import React, { useState, useMemo, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Grid, 
  Chip,
  IconButton,
  Avatar,
  useTheme
} from '@mui/material';
import { 
  Business as ProjectIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendIcon,
  Star as StarIcon,
  Work as WorkIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  Home as HomeIcon,
  Fingerprint as FingerprintIcon,
  Person as PersonIcon,
  LocationCity as LocationCityIcon,
  AttachMoney as AttachMoneyIcon,
  People as PeopleIcon,
  Loop as LoopIcon,
  Nature as NatureIcon,
  NewReleases as NewReleasesIcon,
  MilitaryTech as MilitaryTechIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  CardGiftcard as CardGiftcardIcon,
  AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';
import { mockUser } from '../data/mockUser';
import { badges } from '../data/badges';
import { rankings } from '../data/rankings';
import { getUserBadges, checkBadgeUnlocks, updateBadgeProgress } from '../services/badgeService';
import TopBar from '../components/TopBar';
import UserProfileCard from '../components/UserProfileCard';
import PersonalInfoForm from '../components/PersonalInfoForm';
import SectionCard from '../components/SectionCard';
import TabNavigation from '../components/TabNavigation';
import PiggyBank from '../components/PiggyBank';
import BadgeComponent from '../components/Badge';
import RankingItem from '../components/RankingItem';

const iconComponents = {
  money: AttachMoneyIcon,
  people: PeopleIcon,
  trophy: TrophyIcon,
  loop: LoopIcon,
  nature: NatureIcon,
  new: NewReleasesIcon,
  military: MilitaryTechIcon,
  premium: WorkspacePremiumIcon,
  gift: CardGiftcardIcon
};

const getUserInitials = (user) => {
  const first = user.personalInfo?.firstName || '';
  const last = user.personalInfo?.lastName || '';
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
};

const ProfessionalProfileView = ({ user, onEditToggle }) => {
  const theme = useTheme();
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const dateObj = new Date(`${year}-${month}-${day}`);
      return dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    
    return dateString;
  };
  
  const formatJoinDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <Paper 
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        width: '100%',
        position: 'relative'
      }}
    >
      <button 
        onClick={onEditToggle}
        className="absolute top-4 right-4 px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Editar
      </button>

      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4,
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Avatar 
          src={user.photoUrl}
          sx={{ 
            width: 80, 
            height: 80, 
            mr: 3,
            border: '2px solid',
            borderColor: theme.palette.primary.main
          }}
        />
        
        <Box>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{ 
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            {user.personalInfo?.firstName} {user.personalInfo?.lastName}
            <Chip 
              label={user.investorType} 
              color="primary" 
              variant="outlined"
              sx={{ 
                fontSize: '0.8rem',
                fontWeight: 600,
                px: 1.5,
                py: 0.5,
                borderRadius: 1
              }} 
            />
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <WorkIcon fontSize="small" />
            Miembro desde: {formatJoinDate(user.joinDate)}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Section title="Datos Personales">
            <InfoItem 
              icon={<FingerprintIcon />}
              label="Cédula"
              value={user.personalInfo?.cc}
            />
            <InfoItem 
              icon={<CakeIcon />}
              label="Fecha de Nacimiento"
              value={formatDate(user.personalInfo?.birthDate)}
            />
            <InfoItem 
              icon={<PhoneIcon />}
              label="Teléfono"
              value={user.personalInfo?.phone}
            />
            <InfoItem 
              icon={<EmailIcon />}
              label="Correo Electrónico"
              value={user.personalInfo?.email}
            />
          </Section>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Section title="Dirección">
            <InfoItem 
              icon={<LocationCityIcon />}
              label="Ciudad"
              value={user.personalInfo?.city}
            />
            <InfoItem 
              icon={<HomeIcon />}
              label="Dirección"
              value={user.personalInfo?.address}
              fullWidth
            />
          </Section>
          
          <Section title="Preferencias">
            <InfoItem 
              icon={<PersonIcon />}
              label="Tipo de Inversor"
              value={user.investorType}
              chip
            />
          </Section>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Section = ({ title, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography 
      variant="h6" 
      component="h2" 
      fontWeight="600" 
      gutterBottom
      sx={{ 
        color: 'text.primary',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      {title}
    </Typography>
    <Box sx={{ pl: 1 }}>
      {children}
    </Box>
  </Box>
);

const InfoItem = ({ icon, label, value, chip, fullWidth }) => (
  <Box 
    sx={{ 
      mb: 2,
      display: 'flex',
      flexDirection: fullWidth ? 'column' : 'row',
      alignItems: fullWidth ? 'flex-start' : 'center',
      gap: 1.5
    }}
  >
    <Box sx={{ color: 'primary.main', minWidth: 24 }}>{icon}</Box>
    
    <Box sx={{ flexGrow: 1 }}>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ mb: 0.5 }}
      >
        {label}
      </Typography>
      
      {value ? (
        chip ? (
          <Chip 
            label={value} 
            color="primary" 
            variant="outlined"
            size="small"
            sx={{ 
              fontWeight: 500,
              borderRadius: 1,
              backgroundColor: 'primary.light',
              color: 'primary.dark',
              borderColor: 'primary.light'
            }}
          />
        ) : (
          <Typography 
            variant="body1" 
            fontWeight="500"
            sx={{ wordBreak: 'break-word' }}
          >
            {value}
          </Typography>
        )
      ) : (
        <Typography 
          variant="body1" 
          color="text.disabled" 
          fontStyle="italic"
        >
          No especificado
        </Typography>
      )}
    </Box>
  </Box>
);

const RankingSectionCard = ({ title, children, action }) => {
  return (
    <Paper 
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper'
      }}
    >
      <Box 
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        {action}
      </Box>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
      
      <Box 
        sx={{
          backgroundColor: 'grey.50',
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold" mb={1}>
          Proyectos destacados
        </Typography>
        
        <Grid container spacing={1}>
          {['Indie Universe', 'Patito Feo', 'Nido de Agua', 'Aldea'].map((project, index) => (
            <Grid item key={index}>
              <Chip
                icon={<ProjectIcon fontSize="small" />}
                label={project}
                sx={{
                  backgroundColor: 'primary.lighter',
                  color: 'primary.dark'
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

const UserProfile = () => {
  const [user, setUser] = useState({
    ...mockUser,
    investorType: mockUser.investorType || 'Aventurero',
    achievements: {
      completed: mockUser.badges?.unlocked?.length || 0,
      total: badges.length
    }
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user.personalInfo });
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('achievements');
  const [userBadges, setUserBadges] = useState([]);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState(null);

  useEffect(() => {
    const loadedBadges = getUserBadges(user);
    setUserBadges(loadedBadges);
  }, [user]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSave = () => {
    const formDataToSave = { ...formData };
    
    if (formDataToSave.birthDate && /^\d{4}-\d{2}-\d{2}$/.test(formDataToSave.birthDate)) {
      const [year, month, day] = formDataToSave.birthDate.split('-');
      formDataToSave.birthDate = `${day}/${month}/${year}`;
    }

    const newErrors = validateForm(formDataToSave);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setUser(prev => ({
      ...prev,
      personalInfo: formDataToSave,
      profileCompletion: calculateProfileCompletion(formDataToSave)
    }));
    setEditMode(false);
  };

  const handleInvestorTypeChange = (newType) => {
    setUser(prev => ({
      ...prev,
      investorType: newType
    }));
  };

  const tabs = useMemo(() => [
    {
      id: 'achievements',
      label: 'Mis Logros',
      icon: <MilitaryTechIcon fontSize="small" />,
      content: (
        <SectionCard 
          title={`Mis Insignias (${user.achievements?.completed || 0}/${user.achievements?.total || badges.length})`}
          action={
            <button 
              onClick={simulateAchievementProgress}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
            >
              Simular Progreso
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBadges.map((badge) => (
              <BadgeComponent key={badge.id} {...badge} />
            ))}
          </div>
        </SectionCard>
      )
    },
    {
      id: 'piggy',
      label: 'Mi Cerdito',
      icon: <CardGiftcardIcon fontSize="small" />,
      content: (
        <SectionCard title="Mi Cerdito">
          <PiggyBank />
        </SectionCard>
      )
    },
    {
      id: 'ranking',
      label: 'Ranking Mensual',
      icon: <TrendIcon fontSize="small" />,
      content: (
        <RankingSectionCard title="Top Inversionistas">
          <Box>
            {rankings.map((user, index) => (
              <RankingItem 
                key={user.id} 
                user={user} 
                rank={index + 1}
                highlight={user.id === mockUser.id}
              />
            ))}
          </Box>
        </RankingSectionCard>
      )
    },
    {
      id: 'identity',
      label: 'Validación de Identidad',
      icon: <FingerprintIcon fontSize="small" />,
      content: (
        <SectionCard title="Verificación de Identidad">
          <div className="space-y-4">
            <p className="text-gray-600">
              Completa tu verificación de identidad para acceder a todas las funciones.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Iniciar Verificación
            </button>
          </div>
        </SectionCard>
      )
    },
    {
      id: 'payment',
      label: 'Método de Pago',
      icon: <AttachMoneyIcon fontSize="small" />,
      content: (
        <SectionCard title="Métodos de Pago">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-800">Tarjeta de crédito/débito</h3>
              <p className="text-sm text-gray-500">Añade tu tarjeta para realizar inversiones</p>
              <button className="mt-2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                + Añadir tarjeta
              </button>
            </div>
          </div>
        </SectionCard>
      )
    },
    {
      id: 'bank-accounts',
      label: 'Cuentas Bancarias',
      icon: <AccountBalanceIcon fontSize="small" />,
      content: (
        <SectionCard title="Cuentas Bancarias">
          <p className="text-gray-600">
            Esta sección estará disponible próximamente. Mantente atento a nuevas funcionalidades.
          </p>
        </SectionCard>
      )
    }
  ], [userBadges, user.achievements]);

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      {showUnlockModal && newlyUnlockedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full animate-bounce-in">
            <div className="text-center">
              <IconButton
                sx={{
                  color: '#f59e0b',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  fontSize: '3rem',
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1rem'
                }}
              >
                {React.createElement(iconComponents[newlyUnlockedBadge.icon], { fontSize: 'large' })}
              </IconButton>
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
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ¡Genial!
              </button>
            </div>
          </div>
        </div>
      )}

      <TopBar companyName="LOKL" userInitials={getUserInitials(user)} />

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Contenedor principal con bordes visibles */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden">
            {/* Sección superior con gradiente */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex flex-col md:flex-row gap-8">
                <UserProfileCard 
                  user={user} 
                  profileCompletion={user.profileCompletion} 
                />
                
                {editMode ? (
                  <PersonalInfoForm
                    user={user}
                    editMode={editMode}
                    formData={formData}
                    errors={errors}
                    onInputChange={handleInputChange}
                    onSave={handleSave}
                    onEditToggle={() => setEditMode(!editMode)}
                  >
                    {editMode && (
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo de Inversor
                        </label>
                        <select
                          value={user.investorType}
                          onChange={(e) => handleInvestorTypeChange(e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="Explorador">Explorador (Conservador)</option>
                          <option value="Aventurero">Aventurero (Moderado)</option>
                          <option value="Héroe">Héroe (Arriesgado)</option>
                        </select>
                      </div>
                    )}
                  </PersonalInfoForm>
                ) : (
                  <ProfessionalProfileView 
                    user={user} 
                    onEditToggle={() => setEditMode(true)} 
                  />
                )}
              </div>
            </div>

            {/* Barra de navegación */}
            <div className="bg-black px-6 py-3 border-b border-gray-700">
              <TabNavigation 
                tabs={tabs.map(tab => ({ 
                  id: tab.id, 
                  label: tab.label,
                  icon: tab.icon 
                }))}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                textColor="text-gray-300"
                activeTextColor="text-white"
                activeTabClass="bg-gray-800"
                hoverClass="hover:text-white hover:bg-gray-700"
                tabPadding="px-4 py-2"
                fullWidth
              />
            </div>

            {/* Contenido de la pestaña activa */}
            <div className="bg-white p-6 rounded-b-xl">
              {activeTabContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const validateForm = (formData) => {
  const errors = {};
  const requiredFields = ['firstName', 'lastName', 'cc', 'phone', 'birthDate', 'city', 'address'];

  requiredFields.forEach(field => {
    if (!formData[field]?.trim()) {
      errors[field] = 'Este campo es requerido';
    }
  });

  if (formData.cc && !/^\d{6,12}$/.test(formData.cc)) {
    errors.cc = 'Cédula inválida';
  }

  if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
    errors.phone = 'Teléfono debe tener 10 dígitos';
  }

  return errors;
};

const calculateProfileCompletion = (personalInfo) => {
  const requiredFields = ['firstName', 'lastName', 'cc', 'phone', 'birthDate', 'city', 'address'];
  const completedFields = requiredFields.filter(field => personalInfo[field]?.trim()).length;
  return Math.round((completedFields / requiredFields.length) * 100);
};

export default UserProfile;