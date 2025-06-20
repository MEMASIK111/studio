
'use client';

import { useEffect, useState } from 'react';
import { fetchRecommendationsAction, getDishesByNamesAction } from '@/app/actions';
import type { Dish, User } from '@/lib/types'; // Assuming User type exists
import DishCard from './DishCard';
import { Button } from '@/components/ui/button';
import { Loader2, Shuffle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Mock current user data (in a real app, this would come from auth context)
const mockUser: User | null = {
  id: 'user123',
  pastOrderHistory: ['Пицца Маргарита', 'Паста Карбонара'], // Example dish names
  preferences: 'любит итальянскую кухню, не острое',
};

const RecommendationSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(5)].map((_, i) => ( // Changed from 4 to 5
      <CardSkeleton key={i} />
    ))}
  </div>
);

const CardSkeleton = () => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col">
    <Skeleton className="h-48 w-full" />
    <div className="p-4 flex-grow">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6 mb-3" />
      <Skeleton className="h-8 w-1/2" />
    </div>
    <div className="p-4 pt-0 flex justify-between items-center">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
);


export default function RecommendationSection() {
  const [recommendedDishes, setRecommendedDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Prepare input for AI
      // In a real app, this data would be dynamic
      const recommendationInput = {
        pastOrderHistory: mockUser?.pastOrderHistory?.join(', ') || "нет данных",
        currentDiscounts: "скидка 15% на пиццу по вторникам", // Example
        popularityData: "Ролл Филадельфия и Пицца Пепперони очень популярны на этой неделе", // Example
      };

      const result = await fetchRecommendationsAction(recommendationInput);
      
      if (result.recommendations && result.recommendations.length > 0) {
        // Fetch full dish details for recommended dish names
        const detailedDishes = await getDishesByNamesAction(result.recommendations);
        setRecommendedDishes(detailedDishes.slice(0, 5)); // Show up to 5 recommendations
      } else {
        // Fallback if AI gives no specific recommendations but action provides some
        const fallbackDishes = await getDishesByNamesAction(["Пицца Цезарь", "Ролл Филадельфия", "Паста Карбонара", "Том Ям", "Салат Боул с Креветками"]);
        setRecommendedDishes(fallbackDishes.filter(d => d).slice(0,5));
      }

    } catch (err) {
      console.error("Failed to load recommendations:", err);
      setError("Не удалось загрузить рекомендации. Попробуйте позже.");
       const fallbackDishes = await getDishesByNamesAction(["Пицца Цезарь", "Ролл Филадельфия", "Паста Карбонара", "Том Ям", "Салат Боул с Креветками"]);
       setRecommendedDishes(fallbackDishes.filter(d => d).slice(0,5));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  return (
    <section className="py-12 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center sm:text-left mb-4 sm:mb-0">
            Рекомендуем Попробовать
          </h2>
          <Button variant="outline" onClick={getRecommendations} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Shuffle className="mr-2 h-4 w-4" />}
            Обновить
          </Button>
        </div>

        {isLoading && <RecommendationSkeleton />}
        {!isLoading && error && <p className="text-center text-destructive">{error}</p>}
        {!isLoading && !error && recommendedDishes.length === 0 && (
          <p className="text-center text-muted-foreground">Сейчас нет персональных рекомендаций. Посмотрите наше популярное меню!</p>
        )}
        {!isLoading && !error && recommendedDishes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
