
import React from 'react';
import type { Gift } from '../types';
import { GiftCard } from './GiftCard';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

interface GiftListProps {
  recommendations: Gift[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export const GiftList: React.FC<GiftListProps> = ({ recommendations, isLoading, error, hasSearched }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (hasSearched && recommendations.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold text-white">No Gifts Found</h3>
        <p className="mt-2 text-gray-400">The AI couldn't find any recommendations. Try adjusting your search criteria!</p>
      </div>
    );
  }

  if (!hasSearched) {
      return (
        <div className="text-center py-10 px-4 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700">
          <h3 className="text-xl font-semibold text-white">Ready to find the perfect gift?</h3>
          <p className="mt-2 text-gray-400">Fill out the form above and let our AI do the hard work!</p>
        </div>
      )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((gift, index) => (
        <GiftCard key={`${gift.name}-${index}`} gift={gift} />
      ))}
    </div>
  );
};
