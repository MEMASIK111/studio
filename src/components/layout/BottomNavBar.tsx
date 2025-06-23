'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/#menu', label: 'Меню', icon: UtensilsCrossed },
  { href: '/cart', label: 'Корзина', icon: ShoppingCart },
  { href: '/auth/login', label: 'Войти', icon: User },
];

export default function BottomNavBar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This is to prevent hydration mismatch, as cart items are loaded from localStorage
    setIsClient(true);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            (item.href === '/' && pathname === '/') || // Home is active only at root
            (item.href !== '/' && pathname.startsWith(item.href)) || // Other pages are active if path starts with their href
            (item.href === '/cart' && pathname.startsWith('/checkout')); // Special case for cart to be active during checkout

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 p-2 text-sm font-medium transition-colors w-20',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              )}
            >
              <div className="relative">
                <item.icon className="h-6 w-6" />
                {item.href === '/cart' && isClient && totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
