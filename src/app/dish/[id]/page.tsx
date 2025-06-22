import { getDishById } from '@/data/menu';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import DishDetailsActions from './DishDetailsActions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default async function DishPage({ params }: { params: { id: string } }) {
  const dish = getDishById(params.id);

  if (!dish) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-6">
            <Button variant="ghost" asChild>
                <Link href="/#menu">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Назад в меню
                </Link>
            </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image
              src={dish.imageUrl}
              alt={dish.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={dish.dataAiHint || "food meal"}
              priority
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">{dish.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{dish.description}</p>
            <Separator className="my-4" />
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Состав:</h3>
              <p className="text-base text-muted-foreground">
                {dish.ingredients.join(', ')}
              </p>
            </div>
             <Separator className="my-4" />
             <div className="mt-auto">
                <DishDetailsActions dish={dish} />
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
