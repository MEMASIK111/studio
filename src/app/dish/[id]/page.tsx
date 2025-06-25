
import { getDishById } from '@/data/menu';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import DishDetailsActions from './DishDetailsActions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default async function DishPage({ params }: { params: { id: string } }) {
  // The ID from the URL is the original dish ID, not the cart item ID
  const dish = getDishById(params.id);

  if (!dish) {
    notFound();
  }

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
                src={dish.imageUrl}
                alt={dish.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 40vw"
                data-ai-hint={dish.dataAiHint || "food meal"}
                priority
                unoptimized
                />
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">{dish.name}</h1>
            <p className="text-base text-muted-foreground mb-6">{dish.description}</p>
            
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground">Состав:</h3>
                <div className="flex flex-wrap gap-2">
                    {dish.ingredients.map((ingredient) => (
                        <Badge key={ingredient} variant="outline" className="text-sm font-normal py-1 px-2 bg-card">
                            {ingredient}
                        </Badge>
                    ))}
                </div>
            </div>
            
             <div className="mt-auto pt-6 border-t border-border/40">
                <DishDetailsActions dish={dish} />
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
