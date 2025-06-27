import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[50vh] min-h-[350px] md:h-[60vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-r from-amber-50 to-orange-100">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://placehold.co/1920x1080.png"
                data-ai-hint="restaurant interior"
                alt=""
                fill
                style={{objectFit: "cover"}}
                className="opacity-20"
                priority
            />
        </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight animate-in fade-in slide-in-from-top-6 duration-700">
          Доставка вкусной еды в <span className="text-primary">Каспийске</span>
        </h1>
        <p className="mt-3 max-w-2xl text-base md:text-lg text-foreground/80 animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
          Насладитесь изысканными блюдами: от ароматной пиццы до свежайших роллов, приготовленных с любовью.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-top-10 duration-700 delay-400">
          <Button size="lg" asChild className="text-base font-semibold px-6 h-12">
            <Link href="/#menu">Перейти в меню</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-base font-semibold px-6 h-12">
            <Link href="/delivery-info">Условия доставки</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
