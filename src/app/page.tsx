import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import RecommendationSection from '@/components/sections/RecommendationSection';
import MenuDisplay from '@/components/sections/MenuDisplay';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <RecommendationSection />
        <Separator className="my-8 md:my-12" />
        <MenuDisplay />
        {/* Placeholder for other sections like "About Us", "Testimonials" */}
        <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">Отзывы наших клиентов</h2>
                <p className="text-muted-foreground mb-8">Скоро здесь появятся отзывы довольных клиентов!</p>
                {/* Placeholder for reviews component or static reviews */}
                 <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border rounded-lg shadow-sm bg-card">
                        <p className="italic">"Лучшая пицца в городе! Доставка всегда вовремя."</p>
                        <p className="mt-2 font-semibold">- Анна К.</p>
                    </div>
                     <div className="p-6 border rounded-lg shadow-sm bg-card">
                        <p className="italic">"Роллы просто восхитительные, особенно Филадельфия. Рекомендую!"</p>
                        <p className="mt-2 font-semibold">- Максим П.</p>
                    </div>
                     <div className="p-6 border rounded-lg shadow-sm bg-card">
                        <p className="italic">"Заказываем здесь регулярно, всегда всё свежее и вкусное."</p>
                        <p className="mt-2 font-semibold">- Елена С.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
