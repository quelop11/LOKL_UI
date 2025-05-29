import React from 'react';
import {
  Search as SearchIcon,
  Terrain as TerrainIcon,
  VerifiedUser as HeroIcon
} from '@mui/icons-material';

const investorTypes = {
  exploratory: {
    name: 'Exploratorio',
    colorClasses: 'bg-green-100 text-green-800',
    icon: <SearchIcon className="!text-sm" />,
  },
  adventurous: {
    name: 'Aventurero',
    colorClasses: 'bg-blue-100 text-blue-800',
    icon: <TerrainIcon className="!text-sm" />,
  },
  hero: {
    name: 'Héroe',
    colorClasses: 'bg-yellow-100 text-yellow-800',
    icon: <HeroIcon className="!text-sm" />,
  },
};

const InvestorType = ({ type }) => {
  const investor = investorTypes[type] || investorTypes.exploratory;

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${investor.colorClasses}`}>
      <span className="mr-1 flex items-center">{investor.icon}</span>
      {investor.name}
    </div>
  );
};

export default InvestorType;