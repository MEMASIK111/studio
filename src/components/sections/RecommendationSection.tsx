'use client';

import { useEffect, useState } from 'react';
import DishCard from "./DishCard";
import { Button } from "@/components/ui/button";
import { fetchRecommendationsAction, getDishesByNamesAction } from '@/app/actions';
import type { Dish } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const FALLBACK_DISH_NAMES = ["Пицца Цезарь", "Ролл Филадельфия", "Салат Боул с Креветками", "Пицца Пепперони", "Том Ям"];

export default function RecommendationSection() {
    const [recommendations, setRecommendations] = useState<Dish[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadRecommendations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const input = {
                pastOrderHistory: 'Пицца, Роллы',
                currentDiscounts: 'Скидка 15% на все супы',
                popularityData: 'Пицца Пепперони - самая популярная на этой неделе',
            };
            const result = await fetchRecommendationsAction(input);
            
            if (result.recommendations && result.recommendations.length > 0) {
                const recommendedDishes = await getDishesByNamesAction(result.recommendations);
                setRecommendations(recommendedDishes.filter(Boolean).slice(0, 5) as Dish[]);
            } else {
                throw new Error("Не удалось получить рекомендации.");
            }

        } catch (err) {
            console.error("Failed to fetch recommendations:", err);
            setError("Не удалось загрузить персональные рекомендации. Показываем популярные блюда.");
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
        <section id="recommendations" className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
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
                            <div key={index} className="flex flex-col space-y-3 p-2 bg-card rounded-lg">
                                <div className="rounded-lg bg-muted aspect-[4/3] w-full animate-pulse"></div>
                                <div className="space-y-2 px-2 pb-2">
                                    <div className="h-5 bg-muted rounded animate-pulse w-3/4"></div>
                                    <div className="h-3 bg-muted rounded animate-pulse w-full"></div>
                                    <div className="h-3 bg-muted rounded animate-pulse w-1/2"></div>
                                    <div className="h-6 bg-muted rounded animate-pulse w-1/3 mt-2"></div>
                                    <div className="h-10 bg-muted rounded-lg animate-pulse w-full mt-2"></div>
                                </div>
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
