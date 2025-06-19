import Link from 'next/link';
import Image from 'next/image';
import { Menu, ShoppingCart, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NAV_LINKS, APP_NAME, USER_NAV_LINKS_GUEST } from '@/lib/constants';
import { cn } from '@/lib/utils';
import CartIcon from '@/components/cart/CartIcon';

const Logo = () => (
  <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
    <span className="text-2xl font-headline font-bold text-primary">
      {APP_NAME}
    </span>
  </Link>
);

const DesktopNav = () => (
  <nav className="hidden md:flex items-center space-x-6">
    {NAV_LINKS.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
      >
        {link.label}
      </Link>
    ))}
  </nav>
);

const MobileNav = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Открыть меню</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background p-6">
      <div className="flex flex-col space-y-6">
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
              className="block py-2 text-md text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

const UserActions = () => (
  <div className="flex items-center space-x-3">
    <div className="hidden md:flex items-center space-x-2">
      {USER_NAV_LINKS_GUEST.map((link) => (
        <Button key={link.href} variant="ghost" size="sm" asChild>
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </div>
    <CartIcon />
  </div>
);


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <MobileNav />
          <Logo />
        </div>
        <DesktopNav />
        <UserActions />
      </div>
    </header>
  );
}
