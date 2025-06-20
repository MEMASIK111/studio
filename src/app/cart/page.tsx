
'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function CartPage() {
  const { cartItems, totalPrice, removeItem, updateItemQuantity, totalItems } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <h1 className="text-4xl font-headline font-bold text-primary text-center sm:text-left">Ваша Корзина</h1>
          {cartItems.length > 0 && (
            <Button variant="outline" asChild>
              <Link href="/#menu">Продолжить покупки</Link>
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground/50 mb-6" />
            <h2 className="text-2xl font-semibold text-foreground mb-3">Ваша корзина пуста</h2>
            <p className="text-muted-foreground mb-6 text-base">Похоже, вы еще ничего не добавили. Давайте это исправим!</p>
            <Button size="lg" asChild>
              <Link href="/#menu">Перейти в меню</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 gap-4 shadow-md">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden flex-shrink-0">
                    <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill 
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 640px) 96px, 128px"
                        data-ai-hint="food meal"
                    />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.price} руб. / шт.</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        aria-label="Уменьшить количество"
                        disabled={item.quantity <= 1}
                        className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        aria-label="Увеличить количество"
                        className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-shrink-0 text-center sm:text-right">
                     <p className="font-semibold text-lg text-primary">{item.price * item.quantity} руб.</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeItem(item.id)} 
                    aria-label="Удалить товар"
                    className="text-destructive hover:text-destructive/80 h-8 w-8"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </Card>
              ))}
            </div>
            <div className="md:col-span-1">
              <Card className="sticky top-24 p-6 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Сумма заказа</h3>
                  <div className="flex justify-between text-base text-muted-foreground mb-2">
                    <span>Товары ({totalItems} шт.):</span>
                    <span>{totalPrice} руб.</span>
                  </div>
                  <div className="flex justify-between text-base text-muted-foreground mb-4">
                    <span>Доставка:</span>
                    <span>(уточнить при оформлении)</span>
                  </div>
                  <hr className="my-4 border-border" />
                  <div className="flex justify-between text-xl font-bold text-foreground mb-6">
                    <span>Итого:</span>
                    <span>{totalPrice} руб.</span>
                  </div>
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/checkout">Оформить заказ</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}


    