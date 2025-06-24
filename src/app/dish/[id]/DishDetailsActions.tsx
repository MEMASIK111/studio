'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import type { Dish } from '@/lib/types';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from '@/lib/utils';

export default function DishDetailsActions({ dish }: { dish: Dish }) {
    const { addItem } = useCart();
    const { toast } = useToast();
    const [isFavorite, setIsFavorite] = useState(false);
    
    const isPizza = dish.category === 'pizza' && dish.prices && Object.keys(dish.prices).length > 0;
    
    // State for size selection
    const [selectedSize, setSelectedSize] = useState<string | undefined>(
        isPizza ? Object.keys(dish.prices!)[0] : undefined
    );
    const [currentPrice, setCurrentPrice] = useState<number | undefined>(
        isPizza ? dish.prices![Object.keys(dish.prices!)[0]] : dish.price
    );
    
    useEffect(() => {
        if (isPizza && selectedSize) {
            setCurrentPrice(dish.prices![selectedSize]);
        }
    }, [selectedSize, isPizza, dish]);


    const handleAddToCart = () => {
        if (isPizza && !selectedSize) {
            toast({
                title: "Выберите размер",
                description: "Пожалуйста, выберите размер пиццы перед добавлением в корзину.",
                variant: "destructive",
            });
            return;
        }
        
        addItem(dish, 1, selectedSize);
        toast({
            title: "Блюдо добавлено!",
            description: `${dish.name}${selectedSize ? ` (${selectedSize})` : ''} теперь в вашей корзине.`,
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
        <div className="flex flex-col gap-4">
            {isPizza && dish.prices && (
                <div className='flex flex-col sm:flex-row gap-4 items-center'>
                    <span className='font-medium text-foreground shrink-0'>Размер:</span>
                    <ToggleGroup 
                        type="single" 
                        value={selectedSize}
                        onValueChange={(value) => {
                            if (value) setSelectedSize(value);
                        }}
                        className="w-full sm:w-auto"
                    >
                        {Object.keys(dish.prices).map(size => (
                            <ToggleGroupItem key={size} value={size} className="flex-1 font-semibold" aria-label={`Размер ${size}`}>
                                {size}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>
            )}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <p className="text-3xl sm:text-4xl font-bold text-primary flex-shrink-0">{currentPrice} руб.</p>
                <div className="flex items-center gap-3 w-full">
                    <Button onClick={handleAddToCart} size="lg" className="flex-grow text-base sm:text-lg font-semibold h-12 sm:h-14">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Добавить в корзину
                    </Button>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleToggleFavorite} 
                        className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0"
                        aria-label="Добавить в избранное"
                    >
                        <Heart className={`h-6 w-6 transition-colors ${isFavorite ? 'text-destructive fill-destructive' : 'text-muted-foreground'}`} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
