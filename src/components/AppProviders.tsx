// src/components/AppProviders.tsx
"use client";

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { MenuProvider } from '@/context/MenuContext';

// This component will wrap around {children} in layout.tsx

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <MenuProvider>
          {/* 
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
          */}
          {children}
        </MenuProvider>
      </CartProvider>
    </AuthProvider>
  );
}
