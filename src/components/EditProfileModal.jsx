import React, { useState, useRef, useEffect } from 'react';
import { X, Image, UserCircle, Save, User } from 'lucide-react';

import avatar1 from '../assets/avatars/avatar1.png';
import avatar2 from '../assets/avatars/avatar2.png';

const EditProfileModal = ({ 
  isOpen, 
  onClose, 
  user, 
  onSave,
  calculateProfileCompletion 
}) => {
  const [formData, setFormData] = useState({ ...user.personalInfo });
  const [tempPhoto, setTempPhoto] = useState(user.photoUrl);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [profileProgress, setProfileProgress] = useState(0);
  const fileInputRef = useRef(null);

  
  useEffect(() => {
    if (isOpen) {
      // Restablecer datos cuando se abre el modal
      setFormData({ ...user.personalInfo });
      setTempPhoto(user.photoUrl);
      setProfileProgress(calculateProfileCompletion(user.personalInfo));
    }
  }, [isOpen, user, calculateProfileCompletion]);

  // Calcular progreso en tiempo real
  useEffect(() => {
    const newProgress = calculateProfileCompletion(formData);
    setProfileProgress(newProgress);
  }, [formData, calculateProfileCompletion]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectAvatar = (avatar) => {
    setTempPhoto(avatar);
    setShowAvatarSelector(false);
  };

  const handleSave = () => {
    onSave(formData, tempPhoto);
    onClose();
  };

  const handleCancel = () => {
    setFormData({ ...user.personalInfo });
    setTempPhoto(user.photoUrl);
    onClose();
  };

  const getUserInitials = (user) => {
    const first = formData?.firstName || user.personalInfo?.firstName || '';
    const last = formData?.lastName || user.personalInfo?.lastName || '';
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={handleCancel} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Editar Perfil</h2>
              <p className="text-sm text-gray-500 mt-1">Actualiza tu información personal</p>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">Progreso del perfil</span>
              <span className="font-bold text-[#3533FF]">{profileProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#3533FF] to-[#4845ff] h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${profileProgress}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* Photo Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="h-24 w-24 rounded-full border-4 border-[#3533FF] overflow-hidden">
                  {tempPhoto ? (
                    <img src={tempPhoto} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#3533FF] flex items-center justify-center text-white text-xl">
                      {getUserInitials(user)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Image className="h-4 w-4" />
                  <span>Subir foto</span>
                </button>

                <button
                  onClick={() => setShowAvatarSelector(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <UserCircle className="h-4 w-4" />
                  <span>Elegir avatar</span>
                </button>
              </div>

              <input 
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                ref={fileInputRef}
                className="hidden"
              />
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-[#3533FF]" />
                  Datos Personales
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      value={formData.firstName || ''}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3533FF] focus:border-transparent transition-all"
                      placeholder="Juan"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                    <input
                      type="text"
                      value={formData.lastName || ''}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3533FF] focus:border-transparent transition-all"
                      placeholder="Pérez"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cédula</label>
                    <input
                      type="text"
                      value={formData.cc || ''}
                      onChange={(e) => updateField('cc', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3533FF] focus:border-transparent transition-all"
                      placeholder="Solo números"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      value={formData.birthDate || ''}
                      onChange={(e) => updateField('birthDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3533FF] focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3533FF] focus:border-transparent transition-all"
                      placeholder="10 dígitos"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3533FF] focus:border-transparent transition-all"
                      placeholder="@lokl.life"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                    <input
                      type="text"
                      value={formData.city || ''}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3533FF] focus:border-transparent transition-all"
                      placeholder="Medellín"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                    <input
                      type="text"
                      value={formData.address || ''}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3533FF] focus:border-transparent transition-all"
                      placeholder="Av. Nutibara #71-25"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-[#3533FF] text-white rounded-lg hover:bg-[#2a28e0] transition-colors"
            >
              <Save className="h-4 w-4" />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>

      {/* Avatar Selector Modal */}
      {showAvatarSelector && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-75" onClick={() => setShowAvatarSelector(false)} />
          <div className="relative bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Seleccionar Avatar</h3>
              <button onClick={() => setShowAvatarSelector(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center gap-6 py-4">
              <button
                onClick={() => handleSelectAvatar(avatar1)}
                className="flex flex-col items-center group"
              >
                <div className={`w-20 h-20 rounded-full overflow-hidden border-3 ${
                  tempPhoto === avatar1 ? 'border-[#3533FF]' : 'border-gray-300'
                } transition-colors hover:border-[#3533FF]`}>
                  <img 
                    src={avatar1} 
                    alt="Avatar 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-600 group-hover:text-[#3533FF]">Avatar 1</span>
              </button>
              
              <button
                onClick={() => handleSelectAvatar(avatar2)}
                className="flex flex-col items-center group"
              >
                <div className={`w-20 h-20 rounded-full overflow-hidden border-3 ${
                  tempPhoto === avatar2 ? 'border-[#3533FF]' : 'border-gray-300'
                } transition-colors hover:border-[#3533FF]`}>
                  <img 
                    src={avatar2} 
                    alt="Avatar 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-600 group-hover:text-[#3533FF]">Avatar 2</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModal;