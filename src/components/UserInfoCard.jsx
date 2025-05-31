import React from 'react';
import { Edit, Home, User, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { formatDate, formatJoinDate } from '../services/format';

const UserInfoCard = ({ 
  user, 
  onEditClick,
  getUserInitials 
}) => {
  return (
    <div className="rounded-xl border-none bg-white shadow-md">
      <div className="p-4 flex flex-row items-center justify-between border-b">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full border-2 border-[#3533FF] overflow-hidden relative">
            {user.photoUrl ? (
              <img src={user.photoUrl} alt="User" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#3533FF] flex items-center justify-center text-white text-lg">
                {getUserInitials(user)}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#212529]">
              {user.personalInfo?.firstName} {user.personalInfo?.lastName}
            </h2>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Home className="h-3 w-3" />
              <span>Miembro desde: {formatJoinDate(user.joinDate)}</span>
            </div>
            <span className="mt-1 inline-block px-2 py-1 bg-[#3533FF]/10 text-[#3533FF] text-sm rounded-md border border-[#3533FF]/30">
              {user.investorType}
            </span>
          </div>
        </div>
        <button 
          onClick={onEditClick}
          className="flex items-center gap-1 px-3 py-1 text-sm text-[#3533FF] border border-[#3533FF] rounded-md hover:bg-[#3533FF]/5 transition-colors"
        >
          <Edit className="h-3 w-3" /> Editar
        </button>
      </div>
      
      <div className="p-4">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-medium text-[#212529]">Datos Personales</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border border-[#3533FF] flex items-center justify-center">
                  <User className="h-4 w-4 text-[#3533FF]" />
                </div>
                <span className="text-gray-500">Cédula</span>
                <span className="font-medium">{user.personalInfo?.cc || 'No especificado'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border border-[#3533FF] flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-[#3533FF]" />
                </div>
                <span className="text-gray-500">Fecha de Nacimiento</span>
                <span className="font-medium">{formatDate(user.personalInfo?.birthDate) || 'No especificado'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border border-[#3533FF] flex items-center justify-center">
                  <Phone className="h-4 w-4 text-[#3533FF]" />
                </div>
                <span className="text-gray-500">Teléfono</span>
                <span className="font-medium">{user.personalInfo?.phone || 'No especificado'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border border-[#3533FF] flex items-center justify-center">
                  <Mail className="h-4 w-4 text-[#3533FF]" />
                </div>
                <span className="text-gray-500">Correo Electrónico</span>
                <span className="font-medium">{user.personalInfo?.email || 'No especificado'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium text-[#212529]">Dirección</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border border-[#3533FF] flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-[#3533FF]" />
                </div>
                <span className="text-gray-500">Ciudad</span>
                <span className="font-medium">{user.personalInfo?.city || 'No especificado'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border border-[#3533FF] flex items-center justify-center">
                  <Home className="h-4 w-4 text-[#3533FF]" />
                </div>
                <span className="text-gray-500">Dirección</span>
                <span className="font-medium">{user.personalInfo?.address || 'No especificado'}</span>
              </div>
            </div>

            <h3 className="mb-2 mt-4 font-medium text-[#212529]">Preferencias</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border border-[#3533FF] flex items-center justify-center">
                  <User className="h-4 w-4 text-[#3533FF]" />
                </div>
                <span className="text-gray-500">Tipo de Inversor</span>
                <span className="font-medium">{user.investorType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;