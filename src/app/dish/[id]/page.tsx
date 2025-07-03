'use client';

import { useParams, notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import DishDetailsActions from './DishDetailsActions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useMenu } from '@/context/MenuContext';
import { breakfastAddons } from '@/data/menu';

export default function DishPage() {
  const params = useParams();
  const { getDishById, dishes } = useMenu();

  // Ensure params.id is a string before passing to getDishById
  const dishId = typeof params.id === 'string' ? params.id : '';
  const dish = getDishById(dishId);

  // If the context is still loading dishes, show a loader
  if (dishes.length === 0 && !dish) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  // If after loading, the dish is still not found, show 404
  if (!dish) {
    notFound();
  }

  const isBreakfast = dish.category === 'breakfasts';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="mb-4 sm:mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
            <Button variant="ghost" asChild>
                <Link href="/#menu">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Назад в меню
                </Link>
            </Button>
        </div>
        <div className="grid md:grid-cols-5 gap-6 lg:gap-12">
          <div className="md:col-span-2 animate-in fade-in zoom-in-95 duration-500">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl">
                <Image
                src={encodeURI(dish.imageUrl)}
                alt={dish.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 40vw"
                data-ai-hint={dish.dataAiHint || "food meal"}
                priority
                />
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">{dish.name}</h1>
            <p className="text-base text-muted-foreground mb-6">{dish.description}</p>
            
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground">Состав:</h3>
                <div className="flex flex-wrap gap-2">
                    {dish.ingredients && dish.ingredients.map((ingredient) => (
                        <Badge key={ingredient} variant="outline" className="text-sm font-normal py-1 px-2 bg-card">
                            {ingredient}
                        </Badge>
                    ))}
                </div>
            </div>
            
             <div className="mt-auto pt-6 border-t border-border/40">
                <DishDetailsActions dish={dish} addons={isBreakfast ? breakfastAddons : undefined} />
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
