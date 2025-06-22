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
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
            <p className="text-4xl font-bold text-primary flex-shrink-0">{dish.price} руб.</p>
            <div className="flex items-center gap-3 w-full">
                <Button onClick={handleAddToCart} size="lg" className="flex-grow text-lg font-semibold h-14">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Добавить в корзину
                </Button>
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleToggleFavorite} 
                    className="h-14 w-14 flex-shrink-0"
                    aria-label="Добавить в избранное"
                >
                    <Heart className={`h-7 w-7 transition-colors ${isFavorite ? 'text-destructive fill-destructive' : 'text-muted-foreground'}`} />
                </Button>
            </div>
        </div>
    );
}
