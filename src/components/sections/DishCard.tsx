'use client';

import Image from 'next/image';
import type { Dish } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Heart } from 'lucide-react';
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
      title: "Блюдо добавлено!",
      description: `${dish.name} теперь в вашей корзине.`,
      variant: "default",
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(prev => !prev);
    toast({
        title: isFavorite ? "Удалено из избранного" : "Добавлено в избранное",
        description: dish.name,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-sm rounded-lg border-none bg-card">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] w-full relative overflow-hidden rounded-t-lg">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: 'cover' }}
            data-ai-hint={dish.dataAiHint || "food meal"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <CardTitle className="text-xl font-headline leading-tight text-foreground mb-1">{dish.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-3">
            {dish.description}
          </CardDescription>
        </div>
        <div className="mt-auto">
          <p className="text-xl font-bold text-primary mb-3">{dish.price} руб.</p>
          <div className="flex items-center gap-2">
            <Button onClick={handleAddToCart} className="w-full font-semibold">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Добавить
            </Button>
            <Button variant="ghost" size="icon" onClick={handleToggleFavorite} className="text-muted-foreground hover:text-primary rounded-md border bg-transparent hover:bg-card flex-shrink-0">
                <Heart className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-primary text-primary' : ''}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
