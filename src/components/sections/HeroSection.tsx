
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
        <div className="grid grid-cols-1 gap-8 items-center">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-primary leading-tight">
              {APP_NAME}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-xl mx-auto">
              Насладитесь изысканными блюдами итальянской и японской кухни с доставкой на дом в Каспийске. Свежие ингредиенты, быстрая доставка!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/#menu">Перейти к Меню</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/contact">Связаться с нами</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
