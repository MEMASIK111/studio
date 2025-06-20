
'use client';

import Image from 'next/image';
import type { Dish } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface DishCardProps {
  dish: Dish;
}

export default function DishCard({ dish }: DishCardProps) {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(dish, 1);
    toast({
      title: `${dish.name} добавлен в корзину!`,
      description: `Цена: ${dish.price} руб.`,
      variant: "default",
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(prev => !prev);
    // No toast for favorites as per previous request
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={dish.dataAiHint || "food meal"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline mb-1 truncate" title={dish.name}>{dish.name}</CardTitle>
        <CardDescription className="text-base text-muted-foreground mb-2 h-12 overflow-hidden text-ellipsis">
          {dish.ingredients.join(', ')}
        </CardDescription>
        <div className="flex items-center justify-between mt-2">
          <p className="text-2xl font-semibold text-primary">{dish.price} руб.</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-2">
        <Button onClick={handleAddToCart} className="w-full sm:w-auto flex-grow">
          <ShoppingCart className="mr-2 h-4 w-4" /> Добавить
        </Button>
        <div className="flex items-center justify-center sm:justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={handleToggleFavorite} aria-label="Добавить в избранное">
            <Heart className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-accent text-accent' : 'text-muted-foreground hover:text-accent'}`} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

