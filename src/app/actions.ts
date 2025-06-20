// This is a server-side file
'use server';

import { getDishRecommendations, type DishRecommendationsInput, type DishRecommendationsOutput } from '@/ai/flows/dish-recommendations';
import { mockDishes } from '@/data/menu'; // For fallback popular items
import type { Dish } from '@/lib/types';

export async function fetchRecommendationsAction(input: DishRecommendationsInput): Promise<DishRecommendationsOutput> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // If input indicates no history or preferences, return general popular items
    if (!input.pastOrderHistory && !input.currentDiscounts && !input.popularityData) {
        const popularDishes = mockDishes.filter(d => d.popular).slice(0, 5).map(d => d.name);
        if (popularDishes.length > 0) {
            return { recommendations: popularDishes };
        }
    }

    const recommendations = await getDishRecommendations(input);
    // Ensure we always return some recommendations, even if AI returns none
    if (!recommendations.recommendations || recommendations.recommendations.length === 0) {
        const fallbackPopular = mockDishes.filter(d => d.popular).slice(0,3).map(d => d.name);
        return { recommendations: fallbackPopular.length > 0 ? fallbackPopular : ["Пицца Пепперони", "Ролл Филадельфия"] };
    }
    return recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    // Fallback to generic popular items in case of error
    const fallbackPopular = mockDishes.filter(d => d.popular).slice(0,3).map(d => d.name);
    return { recommendations: fallbackPopular.length > 0 ? fallbackPopular : ["Пицца Цезарь", "Салат Цезарь"] };
  }
}

// Example function to get dish details by name (if needed by recommendations)
export async function getDishesByNamesAction(dishNames: string[]): Promise<Dish[]> {
    return mockDishes.filter(dish => dishNames.includes(dish.name));
}
