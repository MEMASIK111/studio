'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import type { Dish, Addon } from '@/lib/types';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface DishDetailsActionsProps {
  dish: Dish;
  addons?: Addon[];
}

export default function DishDetailsActions({ dish, addons }: DishDetailsActionsProps) {
    const { addItem } = useCart();
    const { toast } = useToast();
    const [isFavorite, setIsFavorite] = useState(false);
    const router = useRouter();
    
    const isPizza = dish.category === 'pizza' && dish.prices && Object.keys(dish.prices).length > 0;
    
    const [selectedSize, setSelectedSize] = useState<string | undefined>(
        isPizza ? Object.keys(dish.prices!)[0] : undefined
    );
    const [basePrice, setBasePrice] = useState<number | undefined>(
        isPizza ? dish.prices![Object.keys(dish.prices!)[0]] : dish.price
    );
    
    const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
    const [totalPrice, setTotalPrice] = useState(basePrice);

    useEffect(() => {
        if (isPizza && selectedSize) {
            setBasePrice(dish.prices![selectedSize]);
        }
    }, [selectedSize, isPizza, dish]);
    
    useEffect(() => {
        const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
        setTotalPrice((basePrice || 0) + addonsPrice);
    }, [basePrice, selectedAddons]);

    const handleAddonToggle = (addon: Addon, checked: boolean) => {
        setSelectedAddons(prev => {
            if (checked) {
                return [...prev, addon];
            } else {
                return prev.filter(a => a.name !== addon.name);
            }
        });
    };

    const handleAddToCart = () => {
        if (isPizza && !selectedSize) {
            toast({
                title: "Выберите размер",
                description: "Пожалуйста, выберите размер пиццы перед добавлением в корзину.",
                variant: "destructive",
            });
            return;
        }
        
        const addonsDescription = selectedAddons.length > 0
            ? ` с добавками: ${selectedAddons.map(a => a.name).join(', ')}`
            : '';

        addItem(dish, 1, selectedSize, selectedAddons);
        toast({
            title: "Блюдо добавлено!",
            description: `${dish.name}${selectedSize ? ` (${selectedSize})` : ''}${addonsDescription} теперь в вашей корзине.`,
            onClick: () => router.push('/cart'),
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
            {addons && addons.length > 0 && (
                <div className="space-y-4 border-b pb-4 mb-4">
                    <h4 className="font-semibold text-foreground">Добавки к завтраку</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                        {addons.map(addon => (
                            <div key={addon.name} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`addon-${addon.name}`}
                                    onCheckedChange={(checked) => handleAddonToggle(addon, Boolean(checked))}
                                />
                                <Label htmlFor={`addon-${addon.name}`} className="flex justify-between w-full cursor-pointer text-sm">
                                    <span>{addon.name}</span>
                                    <span className="text-muted-foreground">+{addon.price}₽</span>
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
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
                <p className="text-3xl sm:text-4xl font-bold text-primary flex-shrink-0">{totalPrice} руб.</p>
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
