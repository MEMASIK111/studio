'use client';

import Image from 'next/image';
import type { Dish } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
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
      title: "Блюдо добавлено!",
      description: `${dish.name} теперь в вашей корзине.`,
      variant: "default",
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent triggering card click or other parent events
    e.stopPropagation();
    setIsFavorite(prev => !prev);
    toast({
        title: isFavorite ? "Удалено из избранного" : "Добавлено в избранное",
        description: dish.name,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl group">
      <CardHeader className="p-0 relative">
        <div className="aspect-[4/3] w-full relative overflow-hidden rounded-t-2xl">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
            data-ai-hint={dish.dataAiHint || "food meal"}
          />
          <div className="absolute top-3 right-3 z-10">
            <Button variant="ghost" size="icon" onClick={handleToggleFavorite} className="rounded-full h-9 w-9 bg-white/80 backdrop-blur-sm hover:bg-white text-muted-foreground hover:text-primary">
                <Heart className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-primary text-primary' : ''}`} />
            </Button>
          </div>
          {(dish.popular || dish.new) && (
            <div className="absolute top-3 left-3 z-10">
              {dish.popular && <Badge variant="destructive" className="capitalize">Хит</Badge>}
              {dish.new && <Badge variant="secondary" className="capitalize ml-1">Новинка</Badge>}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-xl font-headline leading-tight mb-2 flex-grow">{dish.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-4">
          {dish.description}
        </CardDescription>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-2xl font-bold text-foreground">{dish.price} <span className="text-base font-normal">руб.</span></p>
          {dish.rating && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-primary fill-current" />
              <span className="font-medium text-foreground">{dish.rating.toFixed(1)}</span>
              <span>({dish.reviews})</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} size="lg" className="w-full font-bold text-base">
          <ShoppingCart className="mr-2 h-5 w-5" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}
