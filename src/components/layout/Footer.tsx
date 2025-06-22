import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Instagram, MessageSquare } from 'lucide-react';
import { APP_NAME, PHONE_NUMBER, ADDRESS, WORKING_HOURS, INSTAGRAM_URL, DELIVERY_INFO, WHATSAPP_NUMBER } from '@/lib/constants';

const FooterLink = ({ href, icon: Icon, text, external = false }: { href: string, icon: React.ElementType, text: string, external?: boolean }) => (
  <Link
    href={href}
    target={external ? "_blank" : "_self"}
    rel={external ? "noopener noreferrer" : ""}
    className="flex items-center space-x-2 text-base text-muted-foreground hover:text-primary transition-colors group"
  >
    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
    <span>{text}</span>
  </Link>
);


export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border/40 mt-auto hidden md:block">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-headline font-semibold text-primary mb-4">{APP_NAME}</h3>
            <p className="text-base text-muted-foreground">
              Вкуснейшая еда с доставкой на дом в Каспийске.
            </p>
            <div className="mt-4 flex space-x-3">
               <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageSquare className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-md font-headline font-semibold text-foreground mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><FooterLink href="/" icon={MapPin} text="Главная" /></li>
              <li><FooterLink href="/#menu" icon={MapPin} text="Меню" /></li>
              <li><FooterLink href="/delivery-info" icon={MapPin} text="Доставка" /></li>
              <li><FooterLink href="/contact" icon={MapPin} text="Контакты" /></li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-headline font-semibold text-foreground mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <FooterLink href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} icon={Phone} text={PHONE_NUMBER} />
              </li>
              <li>
                <FooterLink href={`https://wa.me/${WHATSAPP_NUMBER}`} icon={MessageSquare} text="Написать в WhatsApp" external />
              </li>
              <li>
                <div className="flex items-center space-x-2 text-base text-muted-foreground">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{ADDRESS}</span>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-2 text-base text-muted-foreground">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{WORKING_HOURS}</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-headline font-semibold text-foreground mb-4">Информация о доставке</h4>
            <p className="text-base text-muted-foreground">
              Доставка по г. {DELIVERY_INFO.city}.
            </p>
            <p className="text-base text-muted-foreground mt-1">
              Время доставки: {DELIVERY_INFO.averageTime}.
            </p>
            <p className="text-base text-muted-foreground mt-1">
              Бесплатно от {DELIVERY_INFO.freeDeliveryFrom} руб.
            </p>
             <p className="text-base text-muted-foreground mt-1">
              {DELIVERY_INFO.costNote}.
            </p>
            <Link href="/delivery-info" className="text-base text-primary hover:underline mt-2 block">Подробнее о доставке</Link>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-base text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
