// src/components/AppProviders.tsx
"use client";

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { MenuProvider } from '@/context/MenuContext';

// This component will wrap around {children} in layout.tsx
// AuthProvider must be outside CartProvider so CartProvider can useAuth.
export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MenuProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </MenuProvider>
    </AuthProvider>
  );
}
