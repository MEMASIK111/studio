import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] md:h-[70vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/CTP1.png"
          data-ai-hint="food dish"
          alt="Фоновое изображение еды"
          fill
          style={{ objectFit: 'cover' }}
          priority
          className="opacity-90"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-xl text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-white tracking-tight drop-shadow-xl animate-in fade-in slide-in-from-left-8 duration-700">
            Доставка вкусной еды в <span className="text-primary-foreground/90">Каспийске</span>
          </h1>
          <p className="mt-4 max-w-lg text-base md:text-lg text-primary-foreground/90 drop-shadow-lg animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
            Насладитесь изысканными блюдами: от ароматной пиццы до свежайших роллов, приготовленных с любовью.
          </p>
          <div className="mt-8 flex flex-wrap justify-start gap-3 sm:gap-4 animate-in fade-in slide-in-from-left-8 duration-700 delay-400">
            <Button size="lg" asChild className="text-base font-semibold px-8 h-12 shadow-lg hover:scale-105 transition-transform">
              <Link href="/#menu">Перейти в меню</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base font-semibold px-8 h-12 bg-white/10 text-white backdrop-blur-sm border-white/50 hover:bg-white/20 hover:text-white hover:scale-105 transition-transform">
              <Link href="/delivery-info">Условия доставки</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
