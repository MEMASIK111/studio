
// This is a server-side file
'use server';

import { getDishRecommendations, type DishRecommendationsInput, type DishRecommendationsOutput } from '@/ai/flows/dish-recommendations';
import { mockDishes } from '@/data/menu'; // For fallback popular items
import type { Dish } from '@/lib/types';

const FALLBACK_RECOMMENDATION_NAMES = ["Чуду с мясом", "Чуду с зеленью", "Пицца Цезарь", "Ролл Филадельфия", "Пицца Пепперони"];

async function getFallbackRecommendations(): Promise<DishRecommendationsOutput> {
    const fallbackDishes = await getDishesByNamesAction(FALLBACK_RECOMMENDATION_NAMES);
    return { recommendations: fallbackDishes.map(d => d.name).slice(0, 5) };
}

export async function fetchRecommendationsAction(input: DishRecommendationsInput): Promise<DishRecommendationsOutput> {
  // If no API key, immediately return fallback recommendations to prevent crash.
  if (!process.env.GOOGLE_API_KEY) {
      console.warn("GOOGLE_API_KEY is not set. Falling back to default recommendations.");
      return getFallbackRecommendations();
  }
  
  try {
    // If input indicates no history or preferences, return general popular items
    if (!input.pastOrderHistory && !input.currentDiscounts && !input.popularityData) {
        const popularDishes = mockDishes.filter(d => d.popular).slice(0, 5).map(d => d.name);
         if (popularDishes.length >= 5) { // Ensure we have enough popular dishes
            return { recommendations: popularDishes };
        } else {
            // If not enough popular, use the extended fallback list
            return getFallbackRecommendations();
        }
    }

    const recommendations = await getDishRecommendations(input);
    
    // Ensure we always return some recommendations, even if AI returns none
    if (!recommendations.recommendations || recommendations.recommendations.length === 0) {
        return getFallbackRecommendations();
    }
    
    if (recommendations.recommendations.length < 5) {
        // If AI returns less than 5, try to supplement with general popular items or fallback
        const currentAiRecs = recommendations.recommendations;
        const needed = 5 - currentAiRecs.length;
        const additionalPopular = mockDishes
            .filter(d => d.popular && !currentAiRecs.includes(d.name))
            .slice(0, needed)
            .map(d => d.name);
        
        let combinedRecs = [...currentAiRecs, ...additionalPopular];

        if (combinedRecs.length < 5) {
            const moreNeeded = 5 - combinedRecs.length;
            const generalFallback = FALLBACK_RECOMMENDATION_NAMES
                .filter(name => !combinedRecs.includes(name))
                .slice(0, moreNeeded);
            combinedRecs = [...combinedRecs, ...generalFallback];
        }
        return { recommendations: combinedRecs.slice(0,5) };
    }

    return { recommendations: recommendations.recommendations.slice(0, 5) }; // Ensure we only return up to 5
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    // Fallback to generic popular items in case of error
    return getFallbackRecommendations();
  }
}

// Example function to get dish details by name (if needed by recommendations)
export async function getDishesByNamesAction(dishNames: string[]): Promise<Dish[]> {
    return mockDishes.filter(dish => dishNames.includes(dish.name));
}
