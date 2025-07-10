import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, Clock, Instagram, MessageSquare } from 'lucide-react';
import { PHONE_NUMBER, ADDRESS, WORKING_HOURS, INSTAGRAM_URL, WHATSAPP_NUMBER } from '@/lib/constants';
import Link from 'next/link';


export default function ContactPage() {
  const mapUrl = `https://2gis.ru/search/${encodeURIComponent(ADDRESS)}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-4xl font-headline font-bold text-primary mb-10 text-center">Свяжитесь с нами</h1>
        
        <div className="flex justify-center">
          <div className="w-full max-w-lg space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary">Наши контакты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Телефон</h4>
                    <Link href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors">{PHONE_NUMBER}</Link>
                  </div>
                </div>
                 <div className="flex items-start space-x-3">
                  <MessageSquare className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">WhatsApp</h4>
                    <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Написать в WhatsApp</Link>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Instagram className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Instagram</h4>
                    <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Мы в соцсетях</Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary">Адрес и часы работы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Адрес</h4>
                    <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">{ADDRESS}</a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Часы работы</h4>
                    <p className="text-muted-foreground">{WORKING_HOURS}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
