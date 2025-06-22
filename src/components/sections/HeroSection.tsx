import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] md:h-[70vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-r from-amber-50 to-orange-100">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://placehold.co/1920x1080.png"
                data-ai-hint="restaurant interior"
                alt="Background of a cozy restaurant"
                fill
                style={{objectFit: "cover"}}
                className="opacity-20"
                priority
            />
        </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
         <div className="mb-6">
            <Image
                src="https://placehold.co/500x200.png"
                data-ai-hint="restaurant logo brand"
                alt="Mozzarella Logo"
                width={500}
                height={200}
                className="max-w-sm md:max-w-md h-auto"
            />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground tracking-tight">
          Доставка вкусной еды в <span className="text-primary">Каспийске</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
          Насладитесь изысканными блюдами: от ароматной пиццы до свежайших роллов, приготовленных с любовью.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild className="text-lg px-8 py-6 font-bold">
            <Link href="/#menu">Перейти в меню</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 font-bold">
            <Link href="/delivery-info">Условия доставки</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
