
import { GoogleGenAI, Type } from "@google/genai";
import type { Gift } from "../types";

export const getGiftRecommendations = async (interests: string, occasion: string, budget: string): Promise<Gift[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are a hip, savvy, and expert gift recommender specializing in thoughtful and cool gifts for teenagers.
    Based on the following criteria, generate 5 creative and unique gift ideas.

    Teen's Interests: "${interests}"
    Occasion: "${occasion}"
    Budget: "${budget}"

    For each gift idea, provide a name, a short compelling description (1-2 sentences) explaining why it's a great gift for this specific teen, an estimated price range, and a relevant category (e.g., "Tech", "Fashion", "Gaming", "Books", "Art", "Sports", "Experiences", "DIY").
  `;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        name: { 
          type: Type.STRING, 
          description: "The name of the gift." 
        },
        description: { 
          type: Type.STRING, 
          description: "A compelling reason why this is a good gift for the teen." 
        },
        priceRange: { 
          type: Type.STRING, 
          description: "An estimated price range, e.g., '$50 - $100'." 
        },
        category: { 
          type: Type.STRING, 
          description: "A category for the gift, like 'Tech' or 'Fashion'." 
        },
      },
      required: ["name", "description", "priceRange", "category"],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    // Basic validation to ensure the result is an array
    if (!Array.isArray(result)) {
        throw new Error("AI response was not in the expected format.");
    }

    return result as Gift[];

  } catch (error) {
    console.error("Error generating gift recommendations:", error);
    throw new Error("Failed to get gift ideas from the AI. Please check your prompt and try again.");
  }
};
