import React from 'react';
import type { Gift } from '../types';

interface GiftCardProps {
  gift: Gift;
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
    const colors: { [key: string]: string } = {
        Tech: 'bg-blue-400/20 text-blue-300',
        Fashion: 'bg-teal-400/20 text-teal-300',
        Gaming: 'bg-yellow-400/20 text-yellow-300',
        Books: 'bg-orange-400/20 text-orange-300',
        Art: 'bg-red-400/20 text-red-300',
        Sports: 'bg-green-400/20 text-green-300',
        Experiences: 'bg-indigo-400/20 text-indigo-300',
        DIY: 'bg-amber-400/20 text-amber-300',
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
    <div className="bg-[#202124] rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#121212] hover:ring-blue-500">
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
          <p className="text-sm font-semibold text-blue-400">{gift.priceRange}</p>
        </div>
      </div>
    </div>
  );
};