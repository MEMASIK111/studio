
'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CartPage() {
  const { cartItems, totalPrice, removeItem, updateItemQuantity, updateItemSize, totalItems } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary text-center sm:text-left">Ваша Корзина</h1>
          {cartItems.length > 0 && (
            <Button variant="outline" asChild>
              <Link href="/#menu">Продолжить покупки</Link>
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500">
            <ShoppingCart className="mx-auto h-20 w-20 sm:h-24 sm:w-24 text-muted-foreground/50 mb-6" />
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">Ваша корзина пуста</h2>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">Похоже, вы еще ничего не добавили. Давайте это исправим!</p>
            <Button size="lg" asChild>
              <Link href="/#menu">Перейти в меню</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="flex items-center p-3 gap-4 shadow-sm">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill 
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 640px) 80px, 96px"
                        data-ai-hint="food meal"
                        unoptimized
                    />
                  </div>

                  <div className="flex-grow flex flex-col gap-2">
                    {item.category === 'pizza' && item.prices && Object.keys(item.prices).length > 1 && item.size ? (
                      <>
                        <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight">
                          {item.name}
                        </h3>
                        <Select
                          value={item.size}
                          onValueChange={(newSize) => {
                            if (newSize) updateItemSize(item.id, newSize);
                          }}
                        >
                          <SelectTrigger className="w-[120px] h-8 text-sm">
                            <SelectValue placeholder="Размер" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(item.prices).map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </>
                    ) : (
                      <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight">
                        {item.name}
                        {item.size && <span className="text-muted-foreground font-normal text-sm ml-2">({item.size})</span>}
                      </h3>
                    )}

                    <div className="flex items-center gap-2">
                       <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          aria-label="Уменьшить количество"
                          disabled={item.quantity <= 1}
                          className="h-7 w-7 sm:h-8 sm:w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                      <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          aria-label="Увеличить количество"
                          className="h-7 w-7 sm:h-8 sm:w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between self-stretch">
                     <p className="font-semibold text-base sm:text-lg text-primary whitespace-nowrap">{item.price * item.quantity} руб.</p>
                     <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeItem(item.id)} 
                      aria-label="Удалить товар"
                      className="text-muted-foreground hover:text-destructive h-7 w-7"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="md:col-span-1">
              <Card className="sticky top-24 p-4 sm:p-6 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Сумма заказа</h3>
                  <div className="flex justify-between text-sm sm:text-base text-muted-foreground mb-2">
                    <span>Товары ({totalItems} шт.):</span>
                    <span>{totalPrice} руб.</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-muted-foreground mb-4">
                    <span>Доставка:</span>
                    <span>(уточнить)</span>
                  </div>
                  <Separator className="my-3 sm:my-4" />
                  <div className="flex justify-between text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
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
