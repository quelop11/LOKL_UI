// src/components/EditableField.jsx
import React, { useState } from 'react';
import { Edit, Save, X } from 'lucide-react';

const EditableField = ({ 
  label, 
  value, 
  onSave, 
  type = 'text',
  required = false,
  placeholder = '',
  validation = null
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [error, setError] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setEditedValue(value);
  };

  const handleSave = () => {
    if (required && !editedValue.trim()) {
      setError('Este campo es requerido');
      return;
    }
    
    if (validation && !validation(editedValue)) {
      setError('Valor inválido');
      return;
    }
    
    onSave(editedValue);
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedValue(value);
    setError('');
  };

  const handleChange = (e) => {
    setEditedValue(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {isEditing ? (
        <div>
          <input
            type={type}
            value={editedValue}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
            placeholder={placeholder}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          
          <div className="flex justify-end gap-2 mt-2">
            <button 
              onClick={handleCancel}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <button 
              onClick={handleSave}
              className="p-2 text-green-500 hover:text-green-700"
            >
              <Save className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className={`p-2 ${!value ? 'text-gray-400 italic' : ''}`}>
            {value || placeholder || 'No especificado'}
          </p>
          <button 
            onClick={handleEdit}
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <Edit className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableField;