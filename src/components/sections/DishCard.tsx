'use client';

import Image from 'next/image';
import type { Dish } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Heart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

interface DishCardProps {
  dish: Dish;
}

export default function DishCard({ dish }: DishCardProps) {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();

  const isPizza = dish.category === 'pizza' && dish.prices;
  const startingPrice = isPizza ? Object.values(dish.prices!)[0] : dish.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let size;
    let toastDescription = `${dish.name} теперь в вашей корзине.`;

    if (isPizza) {
      size = Object.keys(dish.prices!)[0]; // Add default size (e.g., "30 см")
      toastDescription = `${dish.name} (${size}) теперь в вашей корзине.`;
    }
    
    addItem(dish, 1, size);
    
    toast({
      title: "Блюдо добавлено!",
      description: toastDescription,
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
    <Link href={`/dish/${dish.id}`} className="flex flex-col group outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
      <Card className="flex flex-col overflow-hidden h-full shadow-lg rounded-xl border-none bg-card transition-shadow duration-300 group-hover:shadow-2xl">
        <CardHeader className="p-0">
          <div className="aspect-[4/3] w-full relative overflow-hidden rounded-t-xl">
            <Image
              src={dish.imageUrl}
              alt={dish.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={dish.dataAiHint || "food meal"}
              unoptimized
            />
          </div>
        </CardHeader>
        <CardContent className="p-3 flex-grow flex flex-col justify-between">
          <div className="h-28">
            <CardTitle className="text-lg font-headline leading-tight text-foreground mb-1">{dish.name}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mb-2 line-clamp-3">
              {dish.description}
            </CardDescription>
          </div>
          <div className="mt-auto">
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-lg font-bold text-primary">
                {isPizza && 'от '}{startingPrice} руб.
              </p>
               <Button variant="ghost" size="icon" onClick={handleToggleFavorite} className="text-muted-foreground hover:text-destructive rounded-md border bg-transparent hover:bg-card flex-shrink-0 h-8 w-8">
                  <Heart className={`h-4 w-4 transition-colors ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
              </Button>
            </div>
            <Button onClick={handleAddToCart} size="sm" className="w-full font-semibold">
                <ShoppingCart className="mr-2 h-4 w-4" />
                В корзину
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}