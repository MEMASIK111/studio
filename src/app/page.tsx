
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
                 <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border rounded-lg shadow-sm bg-card">
                        <p className="italic">"Невероятно вкусная пицца! Заказывали несколько раз, всегда горячая и свежая. Доставка быстрая, курьеры вежливые. Рекомендую всем!"</p>
                        <p className="mt-2 font-semibold">- Александр В.</p>
                    </div>
                     <div className="p-6 border rounded-lg shadow-sm bg-card">
                        <p className="italic">"Роллы просто объедение! Филадельфия и Калифорния - наши фавориты. Рыба свежайшая, рис сварен идеально. Теперь заказываем только здесь."</p>
                        <p className="mt-2 font-semibold">- Мария П.</p>
                    </div>
                     <div className="p-6 border rounded-lg shadow-sm bg-card">
                        <p className="italic">"Отличный сервис и вкусная еда. Пробовали пасту и салаты - все на высшем уровне. Очень удобно, что можно заказать на большую компанию."</p>
                        <p className="mt-2 font-semibold">- Дмитрий С.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
