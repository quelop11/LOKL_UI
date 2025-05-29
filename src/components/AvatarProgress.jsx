import React from 'react';

const AvatarProgress = ({ progress, avatarUrl, onAvatarChange }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="text-blue-500"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover"
        />
      ) : (
        <button
          onClick={onAvatarChange}
          className="rounded-full w-24 h-24 bg-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-400 transition"
        >
          Select Avatar
        </button>
      )}
      <span className="absolute bottom-0 text-sm font-medium">
        {progress}%
      </span>
    </div>
  );
};

export default AvatarProgress;