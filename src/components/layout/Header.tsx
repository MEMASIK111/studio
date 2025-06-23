import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NAV_LINKS, APP_NAME, USER_NAV_LINKS_GUEST, PHONE_NUMBER } from '@/lib/constants';
import CartIcon from '@/components/cart/CartIcon';
import { Menu, Phone, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const Logo = () => (
  <Link href="/" className="flex items-center rtl:space-x-reverse">
    <span className="self-center text-2xl font-headline font-semibold whitespace-nowrap text-foreground">{APP_NAME}</span>
  </Link>
);

const DesktopNav = () => (
  <nav className="hidden lg:flex items-center space-x-6 text-lg">
    {NAV_LINKS.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="font-medium text-foreground/80 hover:text-primary transition-colors"
      >
        {link.label}
      </Link>
    ))}
  </nav>
);

const MobileNav = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Открыть меню</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
       <SheetHeader>
        <SheetTitle className="sr-only">Меню навигации</SheetTitle>
        <SheetDescription className="sr-only">
          Основная навигация по сайту и ссылки на аккаунт.
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col space-y-6 mt-4">
        <Logo />
        <nav className="flex flex-col space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border pt-6">
          <h3 className="text-md font-semibold text-foreground mb-2">Аккаунт</h3>
          {USER_NAV_LINKS_GUEST.map((link) => (
             <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-lg text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
         <div className="border-t border-border pt-6">
            <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="flex items-center text-lg text-foreground hover:text-primary transition-colors">
                <Phone className="mr-2 h-5 w-5" />
                {PHONE_NUMBER}
            </a>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

const UserActions = () => (
  <div className="flex items-center space-x-3">
    <div className="hidden lg:flex items-center space-x-2">
      {USER_NAV_LINKS_GUEST.map((link) => (
        <Button key={link.href} variant="outline" asChild>
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </div>
    <div className="hidden lg:flex items-center">
      <Phone className="mr-2 h-5 w-5 text-primary" />
      <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="font-semibold text-foreground hover:text-primary">{PHONE_NUMBER}</a>
    </div>
    <CartIcon />
    <div className="lg:hidden">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/auth/login"><User className="h-6 w-6" /></Link>
      </Button>
    </div>
  </div>
);


export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <MobileNav />
          <div className="hidden lg:flex mr-6">
            <Logo />
          </div>
          <DesktopNav />
        </div>
         <div className="flex items-center lg:hidden">
            <Logo />
        </div>
        <UserActions />
      </div>
    </header>
  );
}
