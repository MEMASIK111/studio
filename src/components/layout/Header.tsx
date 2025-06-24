// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NAV_LINKS, APP_NAME, USER_NAV_LINKS_GUEST, PHONE_NUMBER } from '@/lib/constants';
import CartIcon from '@/components/cart/CartIcon';
import { User, Phone } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import Image from 'next/image';
import { useState } from 'react';
import AnimatedHamburgerIcon from './AnimatedHamburgerIcon';

const Logo = () => (
    <Link href="/" className="flex items-center shrink-0" aria-label={`${APP_NAME} - на главную`}>
        <Image
            src="/logo.png"
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


const MobileNavSheet = () => (
    <SheetContent side="left" className="w-[300px] p-0">
       <SheetHeader className="p-4 border-b">
        <SheetTitle className="sr-only">Главное меню</SheetTitle>
        <SheetClose asChild>
          <Link href="/" className="flex items-center" aria-label={`${APP_NAME} - на главную`}>
               <Image
                  src="/logo.png"
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
              {USER_NAV_LINKS_GUEST.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 text-lg text-foreground hover:text-primary transition-colors px-2 rounded-md"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
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
);


const UserActionsDesktop = () => (
    <div className="hidden lg:flex items-center space-x-2">
       <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="flex items-center font-semibold text-foreground hover:text-primary text-sm">
        <Phone className="mr-2 h-5 w-5 text-primary" />
        {PHONE_NUMBER}
      </a>
      {USER_NAV_LINKS_GUEST.map((link) => (
        <Button key={link.href} variant="outline" size="sm" asChild>
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </div>
);


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Desktop Header */}
        <div className="hidden w-full items-center justify-between lg:flex">
            <div className="flex items-center gap-6">
                <Logo />
                <DesktopNav />
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <UserActionsDesktop />
              <CartIcon />
            </div>
        </div>

        {/* Mobile Header */}
        <div className="relative flex w-full items-center justify-between lg:hidden">
          {/* Left actions */}
          <div className="flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Открыть меню">
                  <AnimatedHamburgerIcon open={isMobileMenuOpen} />
                </Button>
              </SheetTrigger>
              <MobileNavSheet />
            </Sheet>
          </div>

          {/* Centered Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo />
          </div>

          {/* Right actions */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/auth/login" aria-label="Войти в аккаунт">
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
