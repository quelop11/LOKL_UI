// src/components/IdentityVerificationSection.jsx
import React, { useState } from 'react';
import { User, CreditCard, Camera, Upload, Plus, Check, X } from 'lucide-react';

const IdentityVerificationSection = ({ 
  showSuccess = (message) => console.log(message), 
  showError = (message) => console.error(message) 
}) => {
  const [identityStatus, setIdentityStatus] = useState({
    personalInfo: true,
    document: false,
    facialRecognition: false
  });

  const [frontDocument, setFrontDocument] = useState(null);
  const [backDocument, setBackDocument] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDocumentUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setIsProcessing(true);
      
      if (type === 'front') {
        setFrontDocument(URL.createObjectURL(file));
      } else {
        setBackDocument(URL.createObjectURL(file));
      }
      
      // Simular proceso de verificación
      setTimeout(() => {
        setIdentityStatus({...identityStatus, document: true});
        setIsProcessing(false);
        showSuccess('Documento subido correctamente. Verificación en proceso...');
      }, 2000);
    }
  };

  const startFacialRecognition = () => {
    setIsProcessing(true);
    showSuccess('Iniciando reconocimiento facial... Por favor mire a la cámara.');
    
    // Simular proceso de reconocimiento facial
    setTimeout(() => {
      setIdentityStatus({...identityStatus, facialRecognition: true});
      setIsProcessing(false);
      showSuccess('Reconocimiento facial completado con éxito!');
    }, 3000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#212529] mb-4">Verificación de Identidad</h2>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Paso 1: Información Personal */}
          <div className={`bg-white p-4 rounded-lg shadow text-center ${identityStatus.personalInfo ? 'border-2 border-green-500' : ''}`}>
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <User className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="font-bold mb-1">Paso 1</h3>
            <p className="text-sm text-gray-600">Información Personal</p>
            <div className="mt-2">
              {identityStatus.personalInfo ? (
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Completado
                </span>
              ) : (
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Pendiente
                </span>
              )}
            </div>
          </div>

          {/* Paso 2: Documento de Identidad */}
          <div className={`bg-white p-4 rounded-lg shadow text-center ${identityStatus.document ? 'border-2 border-green-500' : ''}`}>
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="font-bold mb-1">Paso 2</h3>
            <p className="text-sm text-gray-600">Documento de Identidad</p>
            <div className="mt-2">
              {identityStatus.document ? (
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Completado
                </span>
              ) : (
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Pendiente
                </span>
              )}
            </div>
          </div>

          {/* Paso 3: Autenticación Facial */}
          <div className={`bg-white p-4 rounded-lg shadow text-center ${identityStatus.facialRecognition ? 'border-2 border-green-500' : ''}`}>
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <Camera className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="font-bold mb-1">Paso 3</h3>
            <p className="text-sm text-gray-600">Autenticación Facial</p>
            <div className="mt-2">
              {identityStatus.facialRecognition ? (
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Completado
                </span>
              ) : (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {identityStatus.document ? 'Pendiente' : 'No Iniciado'}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Contenido dinámico según el estado */}
        {!identityStatus.document ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-4">Sube tu documento de identidad</h3>
            <p className="text-gray-600 mb-4">
              Por favor sube una foto clara de tu documento de identidad (cédula, pasaporte o licencia de conducción).
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Upload className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-gray-500">Arrastra tu archivo aquí o haz clic para seleccionar</p>
              <p className="text-sm text-gray-400 mt-1">Formatos soportados: JPG, PNG, PDF (max 5MB)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Frente del documento</h4>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center">
                  {frontDocument ? (
                    <img src={frontDocument} alt="Frente del documento" className="h-full w-full object-contain" />
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleDocumentUpload(e, 'front')}
                        className="hidden"
                        id="front-upload"
                        disabled={isProcessing}
                      />
                      <label htmlFor="front-upload" className={`cursor-pointer ${isProcessing ? 'opacity-50' : ''}`}>
                        {isProcessing ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        ) : (
                          <Plus className="h-8 w-8 text-gray-400" />
                        )}
                      </label>
                    </>
                  )}
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Reverso del documento</h4>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center">
                  {backDocument ? (
                    <img src={backDocument} alt="Reverso del documento" className="h-full w-full object-contain" />
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleDocumentUpload(e, 'back')}
                        className="hidden"
                        id="back-upload"
                        disabled={isProcessing}
                      />
                      <label htmlFor="back-upload" className={`cursor-pointer ${isProcessing ? 'opacity-50' : ''}`}>
                        {isProcessing ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        ) : (
                          <Plus className="h-8 w-8 text-gray-400" />
                        )}
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : !identityStatus.facialRecognition ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-4">Verificación Facial</h3>
            <p className="text-gray-600 mb-4">
              Para completar tu verificación de identidad, necesitamos confirmar que eres tú mediante reconocimiento facial.
            </p>
            
            <div className="flex justify-center mb-6">
              <div className="relative w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-4 border-blue-500 rounded-full animate-pulse"></div>
                </div>
                <Camera className="h-16 w-16 text-gray-400" />
              </div>
            </div>
            
            <button 
              onClick={startFacialRecognition}
              disabled={isProcessing}
              className={`w-full py-3 bg-[#3533FF] text-white rounded-lg hover:bg-[#2a28e0] flex items-center justify-center ${isProcessing ? 'opacity-75' : ''}`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Procesando...
                </>
              ) : (
                'Iniciar Reconocimiento Facial'
              )}
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-4 text-green-600">¡Verificación Completada!</h3>
            <p className="text-gray-600 mb-4">
              Tu identidad ha sido verificada exitosamente. Ahora puedes acceder a todas las funciones de la plataforma.
            </p>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Estado de verificación: <span className="text-green-600 font-bold">Completado</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Fecha de verificación: {new Date().toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdentityVerificationSection;