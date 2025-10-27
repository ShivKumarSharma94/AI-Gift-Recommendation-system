import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
        Teen Gift Guru
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mt-2">
        Find the perfect AI-powered gift recommendations for any teen.
      </p>
    </header>
  );
};