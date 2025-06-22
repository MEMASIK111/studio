// src/components/sections/RecommendationSection.tsx
'use client';

import { useEffect, useState } from 'react';
import DishCard from "./DishCard";
import { Button } from "@/components/ui/button";
import { fetchRecommendationsAction, getDishesByNamesAction } from '@/app/actions';
import type { Dish } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// Fallback dishes in case AI fails or returns empty
const FALLBACK_DISH_NAMES = ["Пицца Пепперони", "Ролл Филадельфия", "Том Ям", "Салат Боул с Креветками", "Пицца Цезарь"];

export default function RecommendationSection() {
    const [recommendations, setRecommendations] = useState<Dish[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadRecommendations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // In a real app, you would gather real user data. Here we use placeholders.
            const input = {
                pastOrderHistory: 'Пицца, Роллы',
                currentDiscounts: 'Скидка 15% на все супы',
                popularityData: 'Пицца Пепперони - самая популярная на этой неделе',
            };
            const result = await fetchRecommendationsAction(input);
            
            if (result.recommendations && result.recommendations.length > 0) {
                const recommendedDishes = await getDishesByNamesAction(result.recommendations);
                // Ensure we only show up to 5, and filter out any not found
                setRecommendations(recommendedDishes.filter(Boolean).slice(0, 5) as Dish[]);
            } else {
                throw new Error("Не удалось получить рекомендации.");
            }

        } catch (err) {
            console.error("Failed to fetch recommendations:", err);
            setError("Не удалось загрузить персональные рекомендации. Показываем популярные блюда.");
            // Load fallback dishes
            const fallbackDishes = await getDishesByNamesAction(FALLBACK_DISH_NAMES);
            setRecommendations(fallbackDishes.filter(Boolean) as Dish[]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadRecommendations();
    }, []);

    return (
        <section id="recommendations" className="py-12 md:py-20 bg-muted/40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4 sm:mb-0">
                        Рекомендуем Попробовать
                    </h2>
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Ошибка</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex flex-col space-y-3">
                                <div className="rounded-xl bg-muted/80 aspect-square w-full animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-muted/80 rounded animate-pulse w-3/4"></div>
                                    <div className="h-3 bg-muted/80 rounded animate-pulse w-full"></div>
                                    <div className="h-3 bg-muted/80 rounded animate-pulse w-1/2"></div>
                                </div>
                                 <div className="h-10 bg-muted/80 rounded-lg animate-pulse w-full"></div>
                            </div>
                        ))
                    ) : (
                        recommendations.map((dish) => (
                            <DishCard key={dish.id} dish={dish} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
