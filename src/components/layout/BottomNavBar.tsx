'use client';

import Link from 'next/link';
import { Home, LayoutGrid, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const navItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/#menu', label: 'Каталог', icon: LayoutGrid },
  { href: '/cart', label: 'Корзина', icon: ShoppingCart },
  { href: '/favorites', label: 'Избранное', icon: Heart }, // Placeholder link
  { href: '/auth/login', label: 'Войти', icon: User },
];

export default function BottomNavBar() {
  const { totalPrice, totalItems } = useCart();
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t border-border shadow-t-lg">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {navItems.map((item) => {
          const isActive = (pathname === '/' && item.href === '/') || (pathname === item.href && item.href !== '/') || (item.href === '/#menu' && pathname.startsWith('/#'));
          
          return (
            <Link key={item.href} href={item.href === '/favorites' ? '/' : item.href} className="inline-flex flex-col items-center justify-center px-1 text-center hover:bg-muted group rounded-lg">
              <div className="relative">
                <item.icon
                  className={cn(
                    'w-6 h-6 mb-1 text-muted-foreground group-hover:text-primary',
                    isActive && 'text-primary'
                  )}
                  aria-hidden="true"
                />
                {item.href === '/cart' && totalItems > 0 && (
                   <div className="absolute -top-2 -right-4">
                     <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary text-primary-foreground">
                        {Math.round(totalPrice)}₽
                     </span>
                  </div>
                )}
              </div>
              <span className={cn(
                  "text-[10px] font-medium text-muted-foreground group-hover:text-primary",
                  isActive && 'text-primary'
                )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
