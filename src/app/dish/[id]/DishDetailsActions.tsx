'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import type { Dish } from '@/lib/types';

export default function DishDetailsActions({ dish }: { dish: Dish }) {
    const { addItem } = useCart();
    const { toast } = useToast();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToCart = () => {
        addItem(dish, 1);
        toast({
            title: "Блюдо добавлено!",
            description: `${dish.name} теперь в вашей корзине.`,
        });
    };

    const handleToggleFavorite = () => {
        setIsFavorite(prev => !prev);
        toast({
            title: isFavorite ? "Удалено из избранного" : "Добавлено в избранное",
            description: dish.name,
        });
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
            <p className="text-3xl font-bold text-primary w-full sm:w-auto">{dish.price} руб.</p>
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button onClick={handleAddToCart} size="lg" className="flex-grow font-semibold">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    В корзину
                </Button>
                <Button variant="outline" size="lg" onClick={handleToggleFavorite} className="text-muted-foreground hover:text-destructive flex-shrink-0 border-2 hover:border-destructive hover:bg-destructive/10">
                    <Heart className={`h-6 w-6 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
            </div>
        </div>
    );
}
