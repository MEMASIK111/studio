'use client';

import Image from 'next/image';
import type { Dish } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart } from 'lucide-react';
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

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent triggering card click or other parent events
    e.stopPropagation();
    setIsFavorite(prev => !prev);
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl border-none">
      <CardHeader className="p-0 relative">
        <div className="aspect-square w-full relative">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: 'cover' }}
            className="rounded-t-xl"
            data-ai-hint={dish.dataAiHint || "food meal"}
          />
           <Button variant="ghost" size="icon" onClick={handleToggleFavorite} aria-label="Добавить в избранное" className="absolute top-2 right-2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full h-8 w-8 z-10">
            <Heart className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-primary'}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 flex-grow flex flex-col bg-card">
        <CardTitle className="text-base font-semibold leading-tight mb-2 flex-grow">{dish.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mb-3">
          {dish.description}
        </CardDescription>
        <p className="text-lg font-bold text-foreground mt-auto">{dish.price} руб.</p>
      </CardContent>
      <CardFooter className="p-3 pt-0 bg-card rounded-b-xl">
        <Button onClick={handleAddToCart} variant="destructive" className="w-full font-bold h-10 text-base">
          ДОБАВИТЬ
        </Button>
      </CardFooter>
    </Card>
  );
}
