// src/components/AppProviders.tsx
"use client";

import React from 'react';
import { CartProvider } from '@/context/CartContext'; // Example
// import { AuthProvider } from '@/context/AuthContext'; // Example
// import { FavoritesProvider } from '@/context/FavoritesContext'; // Example

// This component will wrap around {children} in layout.tsx

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {/* 
      <AuthProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
      </AuthProvider>
      */}
      {children}
    </CartProvider>
  );
}
