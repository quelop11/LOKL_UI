// src/components/InvestorBadge.jsx
import React from 'react';

const InvestorBadge = ({ type }) => {
  const config = {
    Explorador: {
      icon: '🌍',
      title: 'Explorador',
      className: 'bg-blue-100 text-blue-800'
    },
    Aventurero: {
      icon: '⚡',
      title: 'Aventurero',
      className: 'bg-purple-100 text-purple-800'
    },
    Héroe: {
      icon: '🦸',
      title: 'Héroe',
      className: 'bg-yellow-100 text-yellow-800'
    }
  };

  const { icon, title, description, className } = config[type] || {
    icon: '❓',
    title: 'Desconocido',
    description: 'Tipo no definido',
    className: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className={`inline-flex items-center ${className} rounded-full px-3 py-1`}>
      <span className="text-lg mr-2">{icon}</span>
      <div>
        <div className="font-bold text-sm">{title}</div>
        <div className="text-xs">{description}</div>
      </div>
    </div>
  );
};

export default InvestorBadge;