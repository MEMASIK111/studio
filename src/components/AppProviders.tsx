// src/components/AppProviders.tsx
"use client";

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
// import { FavoritesProvider } from '@/context/FavoritesContext'; // Example

// This component will wrap around {children} in layout.tsx

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        <CartProvider>
          {/* 
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
          */}
          {children}
        </CartProvider>
    </AuthProvider>
  );
}
