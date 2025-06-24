// src/context/CartContext.tsx
"use client";

import type { Dish, CartItem } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartContextType {
  cartItems: CartItem[];
  addItem: (dish: Dish, quantity?: number, size?: string) => void;
  removeItem: (cartItemId: string) => void;
  updateItemQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number; // Total number of individual items (sum of quantities)
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoadedFromStorage, setIsCartLoadedFromStorage] = useState(false);

  // Load cart from localStorage on client side after initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('cartItems');
      if (localData) {
        try {
          setCartItems(JSON.parse(localData));
        } catch (e) {
          console.error("Failed to parse cartItems from localStorage", e);
        }
      }
      setIsCartLoadedFromStorage(true); // Mark cart as loaded from storage
    }
  }, []);

  // Save cart to localStorage whenever it changes, but only if it has been loaded from storage first
  useEffect(() => {
    if (typeof window !== 'undefined' && isCartLoadedFromStorage) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isCartLoadedFromStorage]);

  const addItem = (dish: Dish, quantity: number = 1, size?: string) => {
    setCartItems((prevItems) => {
      // Create a unique ID for the cart item based on the dish ID and size
      const cartItemId = size ? `${dish.id}-${size}` : dish.id;
      
      const existingItem = prevItems.find((item) => item.id === cartItemId);

      if (existingItem) {
        // If item already exists, just update the quantity
        return prevItems.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If it's a new item, add it to the cart
        let price: number;
        if (size && dish.prices) {
            price = dish.prices[size];
        } else if (dish.price) {
            price = dish.price;
        } else {
            console.error("No price found for the dish:", dish.name);
            return prevItems; // Or handle this error appropriately
        }

        const newItem: CartItem = {
          ...dish,
          id: cartItemId, // Unique cart ID
          dishId: dish.id, // Original dish ID
          quantity,
          size,
          price,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (cartItemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
  };

  const updateItemQuantity = (cartItemId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
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
