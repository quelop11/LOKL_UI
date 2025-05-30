// src/components/PaymentMethodsSection.jsx
import React, { useState } from 'react';
import { CreditCard, Banknote, Plus, Trash2, Check, X } from 'lucide-react';

const PaymentMethodsSection = ({ showSuccess, showError }) => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'creditCard', brand: 'Visa', last4: '1234', expiration: '12/25', editing: false },
    { id: 2, type: 'bankAccount', bank: 'Bancolombia', accountType: 'Ahorros', number: '5678', editing: false }
  ]);
  
  const [newMethod, setNewMethod] = useState({
    type: 'creditCard',
    brand: '',
    last4: '',
    expiration: '',
    bank: '',
    accountType: 'Ahorros'
  });
  
  const [showForm, setShowForm] = useState(false);
  
  const toggleEdit = (id) => {
    setPaymentMethods(paymentMethods.map(method => 
      method.id === id ? { ...method, editing: !method.editing } : method
    ));
  };
  
  const handleChange = (id, field, value) => {
    setPaymentMethods(paymentMethods.map(method => 
      method.id === id ? { ...method, [field]: value } : method
    ));
  };
  
  const handleSave = (id) => {
    toggleEdit(id);
    showSuccess('Método de pago actualizado correctamente');
  };
  
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este método de pago?')) {
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
      showSuccess('Método de pago eliminado');
    }
  };
  
  const handleNewMethodChange = (e) => {
    const { name, value } = e.target;
    setNewMethod({ ...newMethod, [name]: value });
  };
  
  const addNewMethod = () => {
    if (newMethod.type === 'creditCard' && (!newMethod.brand || !newMethod.last4 || !newMethod.expiration)) {
      showError('Por favor completa todos los campos para la tarjeta de crédito');
      return;
    }
    
    if (newMethod.type === 'bankAccount' && (!newMethod.bank || !newMethod.accountType || !newMethod.number)) {
      showError('Por favor completa todos los campos para la cuenta bancaria');
      return;
    }
    
    const method = {
      id: paymentMethods.length + 1,
      type: newMethod.type,
      ...(newMethod.type === 'creditCard' ? {
        brand: newMethod.brand,
        last4: newMethod.last4,
        expiration: newMethod.expiration
      } : {
        bank: newMethod.bank,
        accountType: newMethod.accountType,
        number: newMethod.number
      }),
      editing: false
    };
    
    setPaymentMethods([...paymentMethods, method]);
    setNewMethod({
      type: 'creditCard',
      brand: '',
      last4: '',
      expiration: '',
      bank: '',
      accountType: 'Ahorros'
    });
    setShowForm(false);
    showSuccess('Nuevo método de pago añadido correctamente');
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#212529] mb-4">Métodos de Pago</h2>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Tarjetas de Crédito</h3>
              <button 
                className="text-[#3533FF] hover:text-[#2a28e0]"
                onClick={() => setShowForm(!showForm)}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {paymentMethods.filter(m => m.type === 'creditCard').map(method => (
                <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6 text-gray-500" />
                      <div>
                        <h4 className="font-medium">
                          {method.editing ? (
                            <input
                              type="text"
                              value={method.brand}
                              onChange={(e) => handleChange(method.id, 'brand', e.target.value)}
                              className="border p-1 rounded w-32"
                            />
                          ) : (
                            `${method.brand} **** ${method.last4}`
                          )}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {method.editing ? (
                            <input
                              type="text"
                              value={method.expiration}
                              onChange={(e) => handleChange(method.id, 'expiration', e.target.value)}
                              className="border p-1 rounded w-20 mt-1"
                              placeholder="MM/AA"
                            />
                          ) : (
                            `Expira ${method.expiration}`
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {method.editing ? (
                        <button 
                          onClick={() => handleSave(method.id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          Guardar
                        </button>
                      ) : (
                        <button 
                          onClick={() => toggleEdit(method.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Editar
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(method.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <button className="w-full py-2 border border-[#3533FF] text-[#3533FF] rounded-md mt-2">
                    Usar este método
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Cuentas Bancarias</h3>
              <button 
                className="text-[#3533FF] hover:text-[#2a28e0]"
                onClick={() => setShowForm(!showForm)}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {paymentMethods.filter(m => m.type === 'bankAccount').map(method => (
                <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Banknote className="h-6 w-6 text-gray-500" />
                      <div>
                        <h4 className="font-medium">
                          {method.editing ? (
                            <input
                              type="text"
                              value={method.bank}
                              onChange={(e) => handleChange(method.id, 'bank', e.target.value)}
                              className="border p-1 rounded w-32"
                            />
                          ) : (
                            method.bank
                          )}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {method.editing ? (
                            <div className="mt-1">
                              <select
                                value={method.accountType}
                                onChange={(e) => handleChange(method.id, 'accountType', e.target.value)}
                                className="border p-1 rounded"
                              >
                                <option value="Ahorros">Ahorros</option>
                                <option value="Corriente">Corriente</option>
                              </select>
                              <input
                                type="text"
                                value={method.number}
                                onChange={(e) => handleChange(method.id, 'number', e.target.value)}
                                className="border p-1 rounded w-24 mt-1"
                                placeholder="Número"
                              />
                            </div>
                          ) : (
                            `${method.accountType} •••• ${method.number}`
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {method.editing ? (
                        <button 
                          onClick={() => handleSave(method.id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          Guardar
                        </button>
                      ) : (
                        <button 
                          onClick={() => toggleEdit(method.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Editar
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(method.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <button className="w-full py-2 border border-[#3533FF] text-[#3533FF] rounded-md mt-2">
                    Usar este método
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {showForm && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h3 className="font-bold mb-4">Agregar Nuevo Método de Pago</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Método</label>
                <select
                  name="type"
                  value={newMethod.type}
                  onChange={handleNewMethodChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="creditCard">Tarjeta de Crédito</option>
                  <option value="bankAccount">Cuenta Bancaria</option>
                </select>
              </div>
              
              {newMethod.type === 'creditCard' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                    <input
                      type="text"
                      name="brand"
                      value={newMethod.brand}
                      onChange={handleNewMethodChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Visa, Mastercard, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Últimos 4 dígitos</label>
                    <input
                      type="text"
                      name="last4"
                      value={newMethod.last4}
                      onChange={handleNewMethodChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="1234"
                      maxLength={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Expiración (MM/AA)</label>
                    <input
                      type="text"
                      name="expiration"
                      value={newMethod.expiration}
                      onChange={handleNewMethodChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="12/25"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                    <input
                      type="text"
                      name="bank"
                      value={newMethod.bank}
                      onChange={handleNewMethodChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Nombre del banco"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cuenta</label>
                    <select
                      name="accountType"
                      value={newMethod.accountType}
                      onChange={handleNewMethodChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Ahorros">Ahorros</option>
                      <option value="Corriente">Corriente</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
                    <input
                      type="text"
                      name="number"
                      value={newMethod.number}
                      onChange={handleNewMethodChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Número completo"
                    />
                  </div>
                </>
              )}
              
              <div className="md:col-span-2 flex gap-2">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md flex-1"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="px-4 py-2 bg-[#3533FF] text-white rounded-md flex-1"
                  onClick={addNewMethod}
                >
                  Agregar Método
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsSection;