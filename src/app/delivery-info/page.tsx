import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, MapPin, PackageCheck, CircleDollarSign } from 'lucide-react';
import { DELIVERY_INFO, PAYMENT_METHODS } from '@/lib/constants';

export default function DeliveryInfoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-4xl font-headline font-bold text-primary mb-10 text-center">Информация о доставке</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-headline text-primary">
                <Truck className="mr-3 h-7 w-7" /> Условия доставки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              <p className="flex items-center"><MapPin className="mr-2 h-5 w-5 text-primary/80" />Город доставки: <strong>{DELIVERY_INFO.city}</strong></p>
              <p>Мы осуществляем доставку по следующим районам и улицам (но не ограничиваясь ими):</p>
              <ul className="list-disc list-inside pl-4 text-sm text-muted-foreground space-y-1">
                {DELIVERY_INFO.streets.map(street => <li key={street}>{street}</li>)}
                <li>и другие районы города.</li>
              </ul>
              <p className="flex items-center"><Clock className="mr-2 h-5 w-5 text-primary/80" />Среднее время доставки: <strong>{DELIVERY_INFO.averageTime}</strong>. Время может меняться в зависимости от загруженности кухни и дорожной ситуации.</p>
              <p className="flex items-center"><PackageCheck className="mr-2 h-5 w-5 text-primary/80" />Бесплатная доставка при заказе от: <strong>{DELIVERY_INFO.freeDeliveryFrom} рублей</strong>.</p>
              <p className="text-sm text-muted-foreground">{DELIVERY_INFO.costNote} по телефону.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-headline text-primary">
               <CircleDollarSign className="mr-3 h-7 w-7" /> Оплата
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-foreground/90">
              <p>Мы принимаем следующие способы оплаты:</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                {PAYMENT_METHODS.map(method => (
                  <li key={method} className="capitalize">{method} курьеру</li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">Пожалуйста, сообщите оператору предпочтительный способ оплаты при подтверждении заказа, если у вас есть особые пожелания (например, нужна сдача с крупной купюры).</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary text-center">Зона обслуживания на карте</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    {/* Placeholder for an embedded map or an image of the delivery zone map */}
                    <MapPin className="h-16 w-16 text-primary/30" />
                    <p className="ml-4 text-muted-foreground">Карта зоны доставки скоро появится здесь.</p>
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                    Для уточнения возможности доставки по вашему адресу, пожалуйста, свяжитесь с нашим оператором.
                </p>
            </CardContent>
        </Card>

      </main>
      <Footer />
    </div>
  );
}
