
'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function CartIcon() {
  const { totalItems } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <Button variant="ghost" size="icon" asChild aria-label="Корзина">
      <Link href="/cart" className="relative">
        <ShoppingCart className="h-6 w-6" />
        {isClient && totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
