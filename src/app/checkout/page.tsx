// src/app/checkout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PackageOpen, Wallet, User, Mail, Phone, LockKeyhole, ShoppingBag, MapPin, CalendarDays } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ADDRESS, WORKING_HOURS, APP_NAME } from '@/lib/constants';
import Link from 'next/link';

// All form fields in one state object for easier management
const initialFormData = {
  // Account info
  loginEmail: '',
  loginPassword: '',
  guestEmail: '',
  guestName: '',
  guestLastname: '',
  guestPhone: '',
  // Delivery info
  street: '',
  house: '',
  building: '',
  apartment: '',
  entrance: '',
  floor: '',
  // Order details
  comments: '',
  cutlery: '1',
};


export default function CheckoutPage() {
  const [hasAccount, setHasAccount] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup'>('courier');
  const [formData, setFormData] = useState(initialFormData);

  const { cartItems, totalPrice: originalTotalPrice, totalItems } = useCart();

  const [calculatedTotalPrice, setCalculatedTotalPrice] = useState(originalTotalPrice);

  useEffect(() => {
    if (deliveryMethod === 'pickup') {
      setCalculatedTotalPrice(originalTotalPrice * 0.9); // Apply 10% discount
    } else {
      setCalculatedTotalPrice(originalTotalPrice);
    }
  }, [originalTotalPrice, deliveryMethod]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCutleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Allow empty string for clearing input, otherwise ensure non-negative integer
      if (value === '' || parseInt(value, 10) >= 0) {
          setFormData(prev => ({ ...prev, cutlery: value }));
      }
  };

  const mapUrl = `https://2gis.ru/search/${encodeURIComponent(`${APP_NAME}, ${ADDRESS}`)}`;

  if (totalItems === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <Card className="text-center shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary">Ваша корзина пуста</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-6 text-base">
                Пожалуйста, добавьте товары в корзину, чтобы перейти к оформлению заказа.
              </CardDescription>
              <Button asChild size="lg">
                <Link href="/#menu">Перейти в меню</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl sm:text-3xl font-headline font-bold text-primary mb-8 text-center">
          Оформление заказа
        </h1>

        <Card className="shadow-xl">
          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Account Section */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox id="hasAccount" checked={hasAccount} onCheckedChange={(checked) => setHasAccount(Boolean(checked))} />
                <Label htmlFor="hasAccount" className="font-medium">У меня уже есть учётная запись</Label>
              </div>

              <Card className="bg-background/50 p-4">
                <CardTitle className="text-lg sm:text-xl font-headline mb-4 text-foreground">
                  {hasAccount ? 'Вход в аккаунт' : 'Контактная информация'}
                </CardTitle>
                {hasAccount ? (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="loginEmail">Email <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="loginEmail" type="email" placeholder="you@example.com" required className="pl-9" value={formData.loginEmail} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="loginPassword">Пароль <span className="text-destructive">*</span></Label>
                      <div className="relative">
                         <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="loginPassword" type="password" placeholder="••••••••" required className="pl-9" value={formData.loginPassword} onChange={handleInputChange} />
                      </div>
                    </div>
                    <Button type="button" className="w-full" disabled>Войти (в разработке)</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="guestEmail">Email <span className="text-destructive">*</span></Label>
                       <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="guestEmail" type="email" placeholder="you@example.com" required className="pl-9" value={formData.guestEmail} onChange={handleInputChange} />
                       </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="guestName">Имя <span className="text-destructive">*</span></Label>
                       <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="guestName" type="text" placeholder="Иван" required className="pl-9" value={formData.guestName} onChange={handleInputChange} />
                       </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="guestLastname">Фамилия <span className="text-destructive">*</span></Label>
                       <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="guestLastname" type="text" placeholder="Иванов" required className="pl-9" value={formData.guestLastname} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="guestPhone">Контактный телефон <span className="text-destructive">*</span></Label>
                       <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="guestPhone" type="tel" placeholder="+7 (XXX) XXX-XX-XX" required className="pl-9" value={formData.guestPhone} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </section>

            <Separator />

            {/* Delivery Method Section */}
            <section>
              <CardTitle className="text-lg sm:text-xl font-headline mb-4 text-foreground">Способ доставки</CardTitle>
              <RadioGroup value={deliveryMethod} onValueChange={(value) => setDeliveryMethod(value as 'courier' | 'pickup')} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Courier Option */}
                <Label htmlFor="delivery-courier" className={`flex flex-col items-start p-3 sm:p-4 border rounded-lg cursor-pointer transition-all ${deliveryMethod === 'courier' ? 'border-primary ring-2 ring-primary shadow-md' : 'border-border hover:border-muted-foreground/50'}`}>
                  <div className="flex items-center w-full">
                    <RadioGroupItem value="courier" id="delivery-courier" className="mr-3 shrink-0" />
                    <PackageOpen className={`mr-2 h-5 w-5 ${deliveryMethod === 'courier' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-semibold text-base text-foreground">Курьер</span>
                  </div>
                  <p className={`text-sm mt-1 ml-9 ${deliveryMethod === 'courier' ? 'text-primary' : 'text-muted-foreground'}`}>Стоимость доставки нефиксированная</p>
                
                  {deliveryMethod === 'courier' && (
                    <div className="mt-4 space-y-3 w-full pl-1">
                      <h4 className="font-medium text-foreground mb-2 text-base">Адрес доставки:</h4>
                      <div className="space-y-1">
                        <Label htmlFor="street">Улица <span className="text-destructive">*</span></Label>
                        <Input id="street" placeholder="ул. Примерная" required value={formData.street} onChange={handleInputChange} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="house">Дом <span className="text-destructive">*</span></Label>
                          <Input id="house" placeholder="10" required value={formData.house} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="building">Строение/Корпус</Label>
                          <Input id="building" placeholder="А" value={formData.building} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                          <Label htmlFor="apartment">Квартира</Label>
                          <Input id="apartment" placeholder="15" value={formData.apartment} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="entrance">Подъезд</Label>
                          <Input id="entrance" placeholder="1" value={formData.entrance} onChange={handleInputChange} />
                        </div>
                      </div>
                       <div className="space-y-1">
                          <Label htmlFor="floor">Этаж</Label>
                          <Input id="floor" placeholder="5" value={formData.floor} onChange={handleInputChange} />
                        </div>
                    </div>
                  )}
                </Label>

                {/* Pickup Option */}
                <Label htmlFor="delivery-pickup" className={`flex flex-col items-start p-3 sm:p-4 border rounded-lg cursor-pointer transition-all ${deliveryMethod === 'pickup' ? 'border-primary ring-2 ring-primary shadow-md' : 'border-border hover:border-muted-foreground/50'}`}>
                  <div className="flex items-center w-full">
                    <RadioGroupItem value="pickup" id="delivery-pickup" className="mr-3 shrink-0" />
                    <ShoppingBag className={`mr-2 h-5 w-5 ${deliveryMethod === 'pickup' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-semibold text-base text-foreground">Самовывоз</span>
                  </div>
                  <div className="mt-2 ml-9 space-y-1 text-foreground/90">
                    <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-primary transition-colors">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      <span>{ADDRESS}</span>
                    </a>
                    <div className="flex items-center text-sm">
                      <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{WORKING_HOURS}</span>
                    </div>
                  </div>
                  <p className={`text-sm mt-2 ml-9 ${deliveryMethod === 'pickup' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>Самовывоз — 10% скидка</p>
                </Label>
              </RadioGroup>
            </section>

            <Separator />

            {/* Payment Method Section */}
            <section>
              <CardTitle className="text-lg sm:text-xl font-headline mb-4 text-foreground">Способ оплаты</CardTitle>
              <RadioGroup defaultValue="cash_on_delivery" className="space-y-2">
                 <Label htmlFor="payment-cash" className="flex items-center p-3 sm:p-4 border rounded-lg cursor-pointer transition-all border-primary ring-2 ring-primary shadow-md">
                    <RadioGroupItem value="cash_on_delivery" id="payment-cash" className="mr-3 shrink-0" checked={true} />
                    <Wallet className="mr-3 h-6 w-6 text-primary" />
                    <div className="text-foreground">
                        <span className="font-medium text-base">Наличными или переводом при получении</span>
                        <p className="text-sm text-muted-foreground">Оплата курьеру или в пункте самовывоза.</p>
                    </div>
                 </Label>
              </RadioGroup>
            </section>

            <Separator />

            {/* Order Comments Section */}
            <section className="space-y-4">
              <CardTitle className="text-lg sm:text-xl font-headline text-foreground">Комментарии к заказу</CardTitle>
              <div>
                <Label htmlFor="comments">Ваши пожелания</Label>
                <Textarea
                  id="comments"
                  placeholder="Например, без лука или не звонить в домофон"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="cutlery">Количество приборов</Label>
                <Input
                  id="cutlery"
                  type="number"
                  min="0"
                  value={formData.cutlery}
                  onChange={handleCutleryChange}
                  className="w-24"
                />
              </div>
              <div className="text-right">
                <p className="text-base sm:text-lg font-semibold text-foreground">
                  Итоговая сумма: <span className="text-primary">{Math.round(calculatedTotalPrice)} руб.</span>
                  {deliveryMethod === 'courier' && <span className="text-sm text-muted-foreground"> (без учета доставки)</span>}
                  {deliveryMethod === 'pickup' && originalTotalPrice !== calculatedTotalPrice && <span className="text-sm text-muted-foreground"> (скидка 10% применена)</span>}
                </p>
              </div>
            </section>

            <Separator />

            <Button type="submit" size="lg" className="w-full" disabled>Подтвердить заказ (в разработке)</Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
