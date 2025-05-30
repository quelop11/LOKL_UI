// src/components/PiggyBankSection.jsx
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../services/format';
import { Check, X, PiggyBank, Calendar, Target, Coins, TrendingUp, Clock, PlusCircle } from 'lucide-react';

const PiggyBankSection = () => {
  // Estados para manejar la configuración
  const [balanceTotal, setBalanceTotal] = useState(13000000);
  const [monthlyGoal, setMonthlyGoal] = useState(500000);
  const [dailyAmount, setDailyAmount] = useState(50000);
  const [periodDays, setPeriodDays] = useState(30);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [transactions, setTransactions] = useState([]);
  
  // Estados para alertas
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  
  // Calcular días restantes para alcanzar la meta
  const daysRemaining = dailyAmount > 0 
    ? Math.ceil((monthlyGoal - currentSavings) / dailyAmount)
    : 0;
  
  // Calcular progreso
  const progressPercentage = Math.min((currentSavings / monthlyGoal) * 100, 100);

  // Mostrar alerta
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Agregar ahorros
  const handleAddSavings = () => {
    const amountToAdd = dailyAmount;
    const newTotal = currentSavings + amountToAdd;
    
    // Verificar si se excede la meta
    if (newTotal > monthlyGoal) {
      showAlertMessage('success', `¡Felicidades! Has alcanzado tu meta de ahorro de ${formatCurrency(monthlyGoal)}`);
      setCurrentSavings(monthlyGoal);
    } else {
      setCurrentSavings(newTotal);
      showAlertMessage('success', `Ahorro diario de ${formatCurrency(amountToAdd)} agregado correctamente`);
    }

    // Registrar transacción
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toLocaleDateString('es-CO'),
      amount: amountToAdd,
      type: 'Depósito'  
    };

    setTransactions([newTransaction, ...transactions]);
  };

  // Guardar configuración
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (dailyAmount <= 0 || periodDays <= 0) {
      showAlertMessage('error', 'Los valores deben ser mayores a cero');
      return;
    }
    
    showAlertMessage('success', 'Configuración de ahorro actualizada correctamente');
  };

  // Calcular la fecha estimada de alcance de meta
  const calculateGoalDate = () => {
    if (daysRemaining <= 0) return '¡Meta alcanzada!';
    
    const today = new Date();
    today.setDate(today.getDate() + daysRemaining);
    return today.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative">
      {/* Alertas */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`${alertType === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4 rounded-lg shadow-lg flex items-center animate-fade-in`}>
            {alertType === 'success' ? (
              <Check className="h-6 w-6 mr-2" />
            ) : (
              <X className="h-6 w-6 mr-2" />
            )}
            <span>{alertMessage}</span>
            <button 
              onClick={() => setShowAlert(false)}
              className="ml-4 hover:opacity-75"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-6">
        <PiggyBank className="h-8 w-8 text-[#3533FF]" />
        <h2 className="text-2xl font-bold text-[#212529]">Mi Cerdito de Ahorros</h2>
      </div>

      {/* Sección motivacional */}
      <div className="bg-gradient-to-r from-[#3533FF]/5 to-[#4845ff]/10 rounded-xl p-6 mb-8 border border-[#3533FF]/10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="bg-[#3533FF] p-4 rounded-full">
              <PiggyBank className="h-12 w-12 text-white" />
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-[#3533FF]">
              "LOKL te da tu cerdito diario: no tienes el millón para invertir, te lo damos diario."
            </p>
            <p className="mt-2 text-gray-600">
              ¡Ahorra con tu cerdito diariamente y crece tu inversión de forma constante!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de Progreso */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="mb-6 flex items-center gap-3">
            <Target className="h-6 w-6 text-[#3533FF]" />
            <h3 className="text-xl font-bold text-gray-800">Tu Progreso de Ahorro</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarjeta de Meta */}
            <div className="bg-gradient-to-r from-[#3533FF]/5 to-[#4845ff]/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#3533FF] p-2 rounded-full">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-700">Meta Mensual</h4>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Tu meta de ahorro</label>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">$</span>
                  <input
                    type="number"
                    value={monthlyGoal}
                    onChange={(e) => setMonthlyGoal(Number(e.target.value))}
                    className="w-full px-3 py-2 text-lg font-bold border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Ahorro diario</label>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">$</span>
                  <input
                    type="number"
                    value={dailyAmount}
                    onChange={(e) => setDailyAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-lg font-bold border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-sm font-medium">
                <span>Período:</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={periodDays}
                    onChange={(e) => setPeriodDays(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md"
                  />
                  <span>días</span>
                </div>
              </div>
            </div>
            
            {/* Tarjeta de Progreso */}
            <div className="bg-gradient-to-r from-[#3533FF]/5 to-[#4845ff]/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#3533FF] p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-700">Progreso Actual</h4>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Ahorro acumulado</span>
                  <span className="font-bold text-lg text-[#3533FF]">{formatCurrency(currentSavings)}</span>
                </div>
                
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3533FF] to-[#4845ff] transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>0</span>
                  <span>{formatCurrency(monthlyGoal)}</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-[#3533FF]/30">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#3533FF]" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tiempo estimado</p>
                      <p className="font-bold">
                        {daysRemaining > 0 ? `${daysRemaining} días` : '¡Meta alcanzada!'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-2 p-2 bg-[#3533FF]/5 rounded">
                    <p className="text-sm text-center font-medium text-[#3533FF]">
                      {daysRemaining > 0 
                        ? `Alcanzarás tu meta el ${calculateGoalDate()}`
                        : '¡Felicidades! Has alcanzado tu meta de ahorro'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Acción principal */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 py-3 bg-[#3533FF] text-white rounded-lg hover:bg-[#2a28e0] transition-colors flex items-center justify-center gap-2"
              onClick={handleAddSavings}
            >
              <PlusCircle className="h-5 w-5" />
              <span>Agregar Ahorro Diario de {formatCurrency(dailyAmount)}</span>
            </button>
            
            <button
              className="py-3 px-4 bg-white border border-[#3533FF] text-[#3533FF] rounded-lg hover:bg-[#3533FF]/10 transition-colors flex items-center justify-center"
              onClick={handleSubmit}
            >
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>

        {/* Panel de Balance */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-6 flex items-center gap-3">
            <Coins className="h-6 w-6 text-[#3533FF]" />
            <h3 className="text-xl font-bold text-gray-800">Balance Total</h3>
          </div>
          
          <div className="bg-gradient-to-r from-[#3533FF]/5 to-[#4845ff]/10 rounded-xl p-5">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center bg-[#3533FF] p-3 rounded-full mb-3">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-600">Tu balance total acumulado</p>
            </div>
            
            <div className="text-center">
              <input
                type="number"
                value={balanceTotal}
                onChange={(e) => setBalanceTotal(Number(e.target.value))}
                className="w-full px-3 py-4 text-2xl font-bold text-center border border-gray-300 rounded-lg bg-white"
              />
              <p className="mt-2 text-sm text-gray-500">Puedes ajustar este valor según tus necesidades</p>
            </div>
            
            <div className="mt-6 bg-white rounded-lg p-4 border border-[#3533FF]/30">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ahorro diario</p>
                  <p className="font-bold">{formatCurrency(dailyAmount)}</p>
                </div>
                <div className="w-px h-10 bg-gray-300 mx-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Meta mensual</p>
                  <p className="font-bold">{formatCurrency(monthlyGoal)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historial de transacciones */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <div className="mb-4 flex items-center gap-3">
          <Calendar className="h-6 w-6 text-[#3533FF]" />
          <h3 className="text-xl font-bold text-gray-800">Historial de Ahorros</h3>
        </div>
        
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center bg-gray-100 p-4 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Aún no has realizado depósitos</p>
            <p className="text-gray-400 mt-2">¡Comienza a ahorrar hoy mismo!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <PlusCircle className="h-4 w-4 text-green-500" />
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      +{formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PiggyBankSection;