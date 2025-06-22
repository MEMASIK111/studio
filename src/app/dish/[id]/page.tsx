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
  const dish = getDishById(params.id);

  if (!dish) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
            <Button variant="ghost" asChild>
                <Link href="/#menu">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Назад в меню
                </Link>
            </Button>
        </div>
        <div className="grid md:grid-cols-5 gap-8 lg:gap-16">
          <div className="md:col-span-2">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl">
                <Image
                src={dish.imageUrl}
                alt={dish.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 40vw"
                data-ai-hint={dish.dataAiHint || "food meal"}
                priority
                />
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-3">{dish.name}</h1>
            <p className="text-lg text-muted-foreground mb-8">{dish.description}</p>
            
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Состав:</h3>
                <div className="flex flex-wrap gap-2">
                    {dish.ingredients.map((ingredient) => (
                        <Badge key={ingredient} variant="outline" className="text-base font-medium py-1 px-3 bg-card">
                            {ingredient}
                        </Badge>
                    ))}
                </div>
            </div>
            
             <div className="mt-auto pt-8 border-t border-border/40">
                <DishDetailsActions dish={dish} />
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
