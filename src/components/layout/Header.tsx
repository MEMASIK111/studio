'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NAV_LINKS, APP_NAME, PHONE_NUMBER } from '@/lib/constants';
import CartIcon from '@/components/cart/CartIcon';
import { User, Phone, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import Image from 'next/image';
import { useState } from 'react';
import AnimatedHamburgerIcon from './AnimatedHamburgerIcon';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const Logo = () => (
    <Link href="/" className="flex items-center shrink-0" aria-label={`${APP_NAME} - на главную`}>
        <Image
            src="/Logo.png"
            alt={`${APP_NAME} logo`}
            width={40}
            height={40}
            priority
        />
    </Link>
);

const DesktopNav = () => (
  <nav className="hidden lg:flex items-center space-x-4 text-sm">
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

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const router = useRouter();

  const handleLogout = async () => {
    // Close mobile menu if it's open
    if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
    }
    logout(clearCart); // Pass clearCart to the logout function
    router.push('/');
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        
        {/* DESKTOP HEADER */}
        <div className="hidden w-full items-center justify-between lg:flex">
            <div className="flex items-center gap-6">
                <Logo />
                <DesktopNav />
            </div>
            <div className="flex items-center gap-2">
              <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="flex items-center font-semibold text-foreground hover:text-primary text-sm">
                <Phone className="mr-2 h-5 w-5 text-primary" />
                {PHONE_NUMBER}
              </a>
              {user ? (
                 <>
                  <span className="text-sm text-muted-foreground mr-2">Привет, {user.displayName || 'пользователь'}!</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/profile">Профиль</Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/auth/login">Вход</Link>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <Link href="/auth/register">Регистрация</Link>
                  </Button>
                </>
              )}
              <CartIcon />
            </div>
        </div>

        {/* MOBILE HEADER */}
        <div className="flex w-full items-center justify-between lg:hidden">
          <div className="flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Открыть меню">
                  <AnimatedHamburgerIcon open={isMobileMenuOpen} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="sr-only">Главное меню</SheetTitle>
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center" aria-label={`${APP_NAME} - на главную`}>
                        <Image
                            src="/Logo.png"
                            alt={`${APP_NAME} logo`}
                            width={40}
                            height={40}
                            priority
                        />
                    </Link>
                  </SheetClose>
                  <SheetDescription className="sr-only">
                    Основная навигация по сайту и ссылки на аккаунт.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-[calc(100%-5.5rem)]">
                  <nav className="flex flex-col space-y-1 p-4">
                    {NAV_LINKS.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 rounded-md px-2"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto border-t">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Аккаунт</h3>
                      <div className="flex flex-col space-y-1">
                        {user ? (
                          <>
                           <SheetClose asChild>
                              <Link href="/profile" className="block py-2 text-lg text-foreground hover:text-primary transition-colors px-2 rounded-md">
                                Профиль
                              </Link>
                           </SheetClose>
                           <SheetClose asChild>
                             <button
                               onClick={handleLogout}
                               className="block py-2 text-lg text-left text-foreground hover:text-primary transition-colors px-2 rounded-md"
                             >
                              Выйти
                             </button>
                           </SheetClose>
                          </>
                        ) : (
                          <>
                            <SheetClose asChild>
                              <Link href="/auth/login" className="block py-2 text-lg text-foreground hover:text-primary transition-colors px-2 rounded-md">
                                Вход
                              </Link>
                            </SheetClose>
                             <SheetClose asChild>
                              <Link href="/auth/register" className="block py-2 text-lg text-foreground hover:text-primary transition-colors px-2 rounded-md">
                                Регистрация
                              </Link>
                            </SheetClose>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="border-t p-4">
                      <SheetClose asChild>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="flex items-center text-lg text-foreground hover:text-primary transition-colors py-2">
                            <Phone className="mr-2 h-5 w-5" />
                            {PHONE_NUMBER}
                        </a>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo />
          </div>

          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href={user ? "/profile" : "/auth/login"} aria-label={user ? "Профиль" : "Войти в аккаунт"}>
                <User className="h-6 w-6" />
              </Link>
            </Button>
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
