import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/20 via-background to-background py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        {/* Placeholder for a subtle background pattern or image */}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-primary leading-tight">
              {APP_NAME}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-xl mx-auto md:mx-0">
              Насладитесь изысканными блюдами итальянской и японской кухни с доставкой на дом в Каспийске. Свежие ингредиенты, быстрая доставка!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/#menu">Перейти к Меню</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/contact">Связаться с нами</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative aspect-square max-w-md mx-auto md:max-w-none md:mx-0 rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="https://placehold.co/600x600.png"
              alt={`Аппетитное блюдо от ${APP_NAME}`}
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-500 ease-in-out"
              data-ai-hint="pizza pasta"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
