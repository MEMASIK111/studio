'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react'; // For client-side state

// import { useCart } from '@/hooks/useCart'; // Placeholder for cart context

export default function CartIcon() {
  // const { itemCount } = useCart(); // Example usage
  const [itemCount, setItemCount] = useState(0); // Mock itemCount, will update after mount

  useEffect(() => {
    // Simulate fetching cart items or use actual context
    // For now, just set a mock count after mount to avoid hydration issues if it were dynamic from localStorage
    setItemCount(Math.floor(Math.random() * 5)); // Random items for demo
  }, []);


  return (
    <Button variant="ghost" size="icon" asChild aria-label="Корзина">
      <Link href="/cart" className="relative">
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
