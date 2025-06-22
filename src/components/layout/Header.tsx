import Link from 'next/link';
import { Menu, Phone, User, Search, CircleUserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { NAV_LINKS, APP_NAME, USER_NAV_LINKS_GUEST, PHONE_NUMBER } from '@/lib/constants';
import CartIcon from '@/components/cart/CartIcon';

const Logo = () => (
  <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
    <img src="https://placehold.co/120x40.png" data-ai-hint="restaurant logo" alt={APP_NAME} className="h-8 md:h-10 w-auto" />
  </Link>
);

const DesktopNav = () => (
  <nav className="hidden md:flex items-center space-x-6">
    {NAV_LINKS.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
      >
        {link.label}
      </Link>
    ))}
  </nav>
);

const MobileNav = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Открыть меню</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background p-6">
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
              className="block py-2 text-base text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="border-t border-border pt-6">
          <Link href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="flex items-center text-base text-foreground hover:text-primary transition-colors">
            <Phone className="mr-2 h-5 w-5" />
            {PHONE_NUMBER}
          </Link>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

const UserActions = () => (
  <div className="flex items-center space-x-3">
    <div className="hidden md:flex items-center space-x-2">
       <Link href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="flex items-center text-base font-medium text-foreground/80 hover:text-primary transition-colors mr-2">
        <Phone className="mr-2 h-5 w-5" />
        {PHONE_NUMBER}
      </Link>
      {USER_NAV_LINKS_GUEST.map((link) => (
        <Button key={link.href} variant="ghost" size="sm" asChild>
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </div>
    {/* CartIcon removed from desktop header actions */}
  </div>
);


export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-card backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        {/* --- Left Group --- */}
        <div className="flex flex-1 items-center justify-start gap-1">
          <div className="md:hidden">
            <MobileNav />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <div className="hidden md:flex">
            <Logo />
          </div>
        </div>

        {/* --- Center Group (Logo) --- */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
          <Logo />
        </div>
        <div className="hidden md:flex flex-none">
          <DesktopNav />
        </div>

        {/* --- Right Group --- */}
        <div className="flex flex-1 items-center justify-end gap-1">
          {/* Mobile Icons */}
          <Link href="/auth/login" className="md:hidden">
            <Button variant="ghost" size="icon"><CircleUserRound className="h-6 w-6" /></Button>
          </Link>
          <Link href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="md:hidden">
            <Button variant="ghost" size="icon"><Phone className="h-6 w-6" /></Button>
          </Link>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex">
             <UserActions />
          </div>
        </div>
      </div>
    </header>
  );
}
