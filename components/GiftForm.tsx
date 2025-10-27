import React, { useState } from 'react';

export interface FormState {
  interests: string;
  occasion: string;
  budget: string;
}

interface GiftFormProps {
  onSubmit: (formData: FormState) => void;
  isLoading: boolean;
}

export const GiftForm: React.FC<GiftFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormState>({
    interests: 'Loves video games like Fortnite, listens to pop music, and enjoys drawing anime characters.',
    occasion: '16th Birthday',
    budget: 'Under $100',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#202124] p-6 rounded-lg shadow-lg">
      <div>
        <label htmlFor="interests" className="block text-sm font-medium text-gray-300 mb-1">
          Teen's Interests & Hobbies
        </label>
        <textarea
          id="interests"
          name="interests"
          rows={3}
          value={formData.interests}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
          placeholder="e.g., coding, skating, TikTok dances, fantasy novels..."
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="occasion" className="block text-sm font-medium text-gray-300 mb-1">
            Occasion
          </label>
          <input
            type="text"
            id="occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
            placeholder="e.g., Birthday, Graduation, Christmas"
            required
          />
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
            Budget
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
            placeholder="e.g., under $50, around $100"
            required
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isLoading ? 'Thinking...' : 'Get Recommendations'}
        </button>
      </div>
    </form>
  );
};