import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function HeroSection() {
  return (
    <section className="py-4 md:py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card className="overflow-hidden shadow-lg border-none">
          <div className="relative aspect-video md:aspect-[2.5/1] w-full">
            <Image
              src="https://placehold.co/1200x480.png"
              alt="Акция на роллы"
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="sushi promotion"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-6 md:p-12">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase leading-tight max-w-md">
                Собери <span className="bg-primary px-2 rounded">5 магнитов</span> и получи любой ролл в подарок!
              </h2>
              <p className="text-xs text-white/80 mt-2 max-w-xs">
                Сделай заказ на 2000Р и получи один магнит. Акция распространяется только на доставку.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
