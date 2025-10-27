import React, { useState, useCallback } from 'react';
import type { Gift } from './types';
import type { FormState } from './components/GiftForm';
import { Header } from './components/Header';
import { GiftForm } from './components/GiftForm';
import { GiftList } from './components/GiftList';
import { getGiftRecommendations } from './services/geminiService';

function App() {
  const [recommendations, setRecommendations] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleGetRecommendations = useCallback(async (formData: FormState) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const results = await getGiftRecommendations(formData.interests, formData.occasion, formData.budget);
      setRecommendations(results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 font-sans antialiased">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        <div className="max-w-2xl mx-auto">
          <GiftForm onSubmit={handleGetRecommendations} isLoading={isLoading} />
        </div>
        <div className="mt-12">
          <GiftList 
            recommendations={recommendations} 
            isLoading={isLoading} 
            error={error}
            hasSearched={hasSearched}
          />
        </div>
      </main>
       <footer className="text-center py-6 text-gray-400 text-sm">
        <p>Powered by AI. Gift ideas are suggestions and should be considered carefully.</p>
      </footer>
    </div>
  );
}

export default App;