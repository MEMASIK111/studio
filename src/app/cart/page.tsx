
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  // const { items, total } = useCart(); // Placeholder
  const items: any[] = []; // Mock
  const total = 0; // Mock

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-headline font-bold text-primary">Ваша Корзина</h1>
          {items.length > 0 && (
            <Button variant="outline" asChild>
              <Link href="/#menu">Продолжить покупки</Link>
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground/50 mb-6" />
            <h2 className="text-2xl font-semibold text-foreground mb-3">Ваша корзина пуста</h2>
            <p className="text-muted-foreground mb-6">Похоже, вы еще ничего не добавили. Давайте это исправим!</p>
            <Button size="lg" asChild>
              <Link href="/#menu">Перейти в меню</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* Placeholder for cart items list */}
              <p className="text-muted-foreground">Элементы корзины будут отображаться здесь.</p>
            </div>
            <div className="md:col-span-1">
              <div className="sticky top-24 p-6 bg-card rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-4">Сумма заказа</h3>
                <div className="flex justify-between text-muted-foreground mb-2">
                  <span>Промежуточный итог:</span>
                  <span>{total} руб.</span>
                </div>
                <div className="flex justify-between text-muted-foreground mb-4">
                  <span>Доставка:</span>
                  <span>Бесплатно (уточнить)</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold text-foreground mb-6">
                  <span>Итого:</span>
                  <span>{total} руб.</span>
                </div>
                <Button size="lg" className="w-full" disabled>Оформить заказ (в разработке)</Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
