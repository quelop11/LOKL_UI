// src/components/BankAccountsSection.jsx
import React, { useState } from 'react';
import { formatCurrency } from '../services/format';
import { Edit, Plus, Trash2, Save } from 'lucide-react';

const BankAccountsSection = ({ showSuccess, showError }) => {
  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, bank: 'Davivienda', accountType: 'Corriente', number: '1234567890', balance: 15000000, editing: false },
    { id: 2, bank: 'BBVA', accountType: 'Ahorros', number: '0987654321', balance: 5000000, editing: false }
  ]);
  
  const [newAccount, setNewAccount] = useState({
    bank: '',
    accountType: 'Ahorros',
    number: '',
    balance: 0
  });
  
  const [showForm, setShowForm] = useState(false);
  
  const toggleEdit = (id) => {
    setBankAccounts(bankAccounts.map(account => 
      account.id === id ? { ...account, editing: !account.editing } : account
    ));
  };
  
  const handleChange = (id, field, value) => {
    setBankAccounts(bankAccounts.map(account => 
      account.id === id ? { ...account, [field]: value } : account
    ));
  };
  
  const handleSave = (id) => {
    toggleEdit(id);
    showSuccess('Cuenta bancaria actualizada correctamente');
  };
  
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta cuenta bancaria?')) {
      setBankAccounts(bankAccounts.filter(account => account.id !== id));
      showSuccess('Cuenta bancaria eliminada');
    }
  };
  
  const handleNewAccountChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };
  
  const addNewAccount = () => {
    if (!newAccount.bank || !newAccount.accountType || !newAccount.number) {
      showError('Por favor completa todos los campos');
      return;
    }
    
    const account = {
      id: bankAccounts.length + 1,
      bank: newAccount.bank,
      accountType: newAccount.accountType,
      number: newAccount.number,
      balance: parseFloat(newAccount.balance) || 0,
      editing: false
    };
    
    setBankAccounts([...bankAccounts, account]);
    setNewAccount({
      bank: '',
      accountType: 'Ahorros',
      number: '',
      balance: 0
    });
    setShowForm(false);
    showSuccess('Nueva cuenta bancaria añadida correctamente');
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#212529] mb-4">Cuentas Bancarias</h2>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bankAccounts.map(account => (
            <div key={account.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-[#3533FF] p-4 text-white">
                <div className="flex justify-between items-center">
                  {account.editing ? (
                    <input
                      type="text"
                      value={account.bank}
                      onChange={(e) => handleChange(account.id, 'bank', e.target.value)}
                      className="bg-transparent border-b text-white placeholder-white w-full"
                      placeholder="Nombre del banco"
                    />
                  ) : (
                    <h3 className="font-bold">{account.bank}</h3>
                  )}
                  <span className="bg-white/20 px-2 py-1 rounded text-xs">
                    {account.editing ? (
                      <select
                        value={account.accountType}
                        onChange={(e) => handleChange(account.id, 'accountType', e.target.value)}
                        className="bg-transparent text-white"
                      >
                        <option value="Ahorros">Ahorros</option>
                        <option value="Corriente">Corriente</option>
                      </select>
                    ) : (
                      account.accountType
                    )}
                  </span>
                </div>
                <p className="text-sm opacity-80 mt-1">
                  {account.editing ? (
                    <input
                      type="text"
                      value={account.number}
                      onChange={(e) => handleChange(account.id, 'number', e.target.value)}
                      className="bg-transparent border-b text-white placeholder-white w-full mt-1"
                      placeholder="Número de cuenta"
                    />
                  ) : (
                    `**** **** **** ${account.number.slice(-4)}`
                  )}
                </p>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Saldo disponible</span>
                  {account.editing ? (
                    <input
                      type="number"
                      value={account.balance}
                      onChange={(e) => handleChange(account.id, 'balance', e.target.value)}
                      className="border p-1 rounded w-32"
                    />
                  ) : (
                    <span className="text-lg font-bold">{formatCurrency(account.balance)}</span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 border border-[#3533FF] text-[#3533FF] rounded hover:bg-[#3533FF] hover:text-white transition-colors">
                    Transferir
                  </button>
                  <button className="py-2 border border-[#3533FF] text-[#3533FF] rounded hover:bg-[#3533FF] hover:text-white transition-colors">
                    Retirar
                  </button>
                </div>
                
                <div className="mt-4 flex justify-between">
                  {account.editing ? (
                    <button 
                      onClick={() => handleSave(account.id)}
                      className="text-green-500 hover:text-green-700 text-sm"
                    >
                      <Save className="h-4 w-4 inline mr-1" /> Guardar
                    </button>
                  ) : (
                    <button 
                      onClick={() => toggleEdit(account.id)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      <Edit className="h-4 w-4 inline mr-1" /> Editar
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(account.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    <Trash2 className="h-4 w-4 inline mr-1" /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div 
            className="bg-white rounded-xl shadow-md border border-dashed border-gray-300 flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <h3 className="font-bold mb-1">Agregar Nueva Cuenta</h3>
            <p className="text-gray-500 mb-4">Vincula una cuenta bancaria para realizar operaciones</p>
            <button className="px-4 py-2 bg-[#3533FF] text-white rounded-lg hover:bg-[#2a28e0]">
              Agregar Cuenta
            </button>
          </div>
        </div>
        
        {showForm && (
          <div className="mt-6 bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold mb-4">Agregar Nueva Cuenta Bancaria</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                <input
                  type="text"
                  name="bank"
                  value={newAccount.bank}
                  onChange={handleNewAccountChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Nombre del banco"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cuenta</label>
                <select
                  name="accountType"
                  value={newAccount.accountType}
                  onChange={handleNewAccountChange}
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
                  value={newAccount.number}
                  onChange={handleNewAccountChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Número completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Saldo Inicial</label>
                <input
                  type="number"
                  name="balance"
                  value={newAccount.balance}
                  onChange={handleNewAccountChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="0"
                />
              </div>
              
              <div className="md:col-span-2 flex gap-2">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md flex-1"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="px-4 py-2 bg-[#3533FF] text-white rounded-md flex-1"
                  onClick={addNewAccount}
                >
                  Guardar Cuenta
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold mb-4">Historial de Transacciones</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Fecha</th>
                  <th className="p-2 text-left">Descripción</th>
                  <th className="p-2 text-left">Cuenta</th>
                  <th className="p-2 text-left">Monto</th>
                  <th className="p-2 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, date: '15/06/2023', description: 'Depósito inicial', account: 'Bancolombia', amount: 5000000, status: 'Completado' },
                  { id: 2, date: '12/06/2023', description: 'Transferencia a proyecto', account: 'Davivienda', amount: -1500000, status: 'Completado' },
                  { id: 3, date: '10/06/2023', description: 'Retiro de fondos', account: 'BBVA', amount: -500000, status: 'Pendiente' },
                  { id: 4, date: '05/06/2023', description: 'Depósito adicional', account: 'Bancolombia', amount: 2000000, status: 'Completado' }
                ].map(transaction => (
                  <tr key={transaction.id} className="border-b border-gray-100">
                    <td className="p-2">{transaction.date}</td>
                    <td className="p-2">{transaction.description}</td>
                    <td className="p-2">{transaction.account}</td>
                    <td className={`p-2 font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'Completado' ? 'bg-green-100 text-green-800' : 
                        transaction.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccountsSection;