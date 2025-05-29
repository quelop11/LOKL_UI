import React from 'react';
import PropTypes from 'prop-types';

const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
  textColor = 'text-gray-300',
  activeTextColor = 'text-white',
  activeTabClass = 'bg-gray-800',
  hoverClass = 'hover:text-white hover:bg-gray-700',
  tabPadding = 'px-5 py-3',
  fullWidth = false
}) => {
  return (
    <div className="w-full overflow-x-auto">
      {/* Contenedor de fondo negro con bordes redondeados */}
      <div className="bg-black rounded-b-xl px-4 py-2">
        <div className={`flex ${fullWidth ? 'justify-between' : 'space-x-1'} whitespace-nowrap`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center text-sm font-medium transition-colors duration-200 ${tabPadding} ${
                activeTab === tab.id 
                  ? `${activeTextColor} ${activeTabClass}`
                  : `${textColor} ${hoverClass}`
              } rounded-md`}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

TabNavigation.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  textColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  activeTabClass: PropTypes.string,
  hoverClass: PropTypes.string,
  tabPadding: PropTypes.string,
  fullWidth: PropTypes.bool
};

export default TabNavigation;