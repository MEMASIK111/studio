// src/context/CartContext.tsx
"use client";

import type { Dish, CartItem } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartContextType {
  cartItems: CartItem[];
  addItem: (dish: Dish, quantity?: number) => void;
  removeItem: (dishId: string) => void;
  updateItemQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number; // Total number of individual items (sum of quantities)
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addItem = (dish: Dish, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...dish, quantity }];
    });
  };

  const removeItem = (dishId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== dishId));
  };

  const updateItemQuantity = (dishId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === dishId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0) // Remove if quantity is 0 or less
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
