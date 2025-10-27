
import React from 'react';
import type { Gift } from '../types';

interface GiftCardProps {
  gift: Gift;
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
    const colors: { [key: string]: string } = {
        Tech: 'bg-blue-500/20 text-blue-300',
        Fashion: 'bg-pink-500/20 text-pink-300',
        Gaming: 'bg-purple-500/20 text-purple-300',
        Books: 'bg-yellow-500/20 text-yellow-300',
        Art: 'bg-red-500/20 text-red-300',
        Sports: 'bg-green-500/20 text-green-300',
        Experiences: 'bg-indigo-500/20 text-indigo-300',
        DIY: 'bg-orange-500/20 text-orange-300',
    };
    const colorClass = colors[category] || 'bg-gray-500/20 text-gray-300';
    return (
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
            {category}
        </span>
    );
};


export const GiftCard: React.FC<GiftCardProps> = ({ gift }) => {
  // Use a simple hash from the gift name to get a consistent "random" image
  const seed = gift.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-purple-500/20">
      <img
        src={`https://picsum.photos/seed/${seed}/400/300`}
        alt={gift.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white pr-2">{gift.name}</h3>
            <CategoryBadge category={gift.category} />
        </div>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{gift.description}</p>
        <div className="mt-auto pt-4 border-t border-gray-700">
          <p className="text-sm font-semibold text-purple-400">{gift.priceRange}</p>
        </div>
      </div>
    </div>
  );
};
