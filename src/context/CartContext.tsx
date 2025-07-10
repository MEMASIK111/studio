// src/context/CartContext.tsx
"use client";

import type { Dish, CartItem, CartContextType, Addon } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const getCartStorageKey = (): string => {
    return user ? `cartItems_${user.email}` : 'cartItems_guest';
  };

  // This effect runs when the user logs in or out, or when the component first mounts.
  // It loads the correct cart from localStorage.
  useEffect(() => {
    // This check is crucial to avoid running on the server
    if (typeof window !== 'undefined') {
      const cartStorageKey = getCartStorageKey();
      const localData = localStorage.getItem(cartStorageKey);
      
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          setCartItems(parsedData);
        } catch (e) {
          console.error(`Failed to parse cartItems from localStorage for key ${cartStorageKey}`, e);
          setCartItems([]); // Reset to empty on error
        }
      } else {
        // If no cart data exists for this user/guest, explicitly start with an empty cart.
        setCartItems([]);
      }
    }
  // We re-run this effect whenever the user object changes (login/logout).
  }, [user]);

  // This effect saves the current cart state to localStorage whenever it changes.
  useEffect(() => {
    if (typeof window !== 'undefined') {
       const cartStorageKey = getCartStorageKey();
       // Save the current state. If the user cleared their cart, this saves an empty array.
       localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
    }
  }, [cartItems, user]); // Re-run on user change as well, to ensure correct key is used.

  const addItem = (dish: Dish, quantity: number = 1, size?: string, selectedAddons?: Addon[]) => {
    setCartItems((prevItems) => {
      // Create a unique ID for the cart item based on the dish ID, size, and selected addons
      const addonsKey = selectedAddons && selectedAddons.length > 0
        ? selectedAddons.map(a => a.name).sort().join('-')
        : '';
      
      const cartItemId = [dish.id, size, addonsKey].filter(Boolean).join('-');
      
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
          selectedAddons,
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

  const updateItemSize = (cartItemId: string, newSize: string) => {
    setCartItems((prevItems) => {
      const currentItem = prevItems.find((item) => item.id === cartItemId);
      // Check if it's a pizza with size options
      if (!currentItem || !currentItem.prices || !currentItem.dishId) {
        return prevItems;
      }

      const addonsKey = currentItem.selectedAddons?.map(a => a.name).sort().join('-') ?? '';
      const newCartItemId = [currentItem.dishId, newSize, addonsKey].filter(Boolean).join('-');


      // If the size is the same, do nothing
      if (cartItemId === newCartItemId) {
          return prevItems;
      }

      // Temporarily remove the item being changed
      const otherItems = prevItems.filter((item) => item.id !== cartItemId);

      // Check if an item with the new size already exists in the cart
      const existingTargetItem = otherItems.find((item) => item.id === newCartItemId);
      
      let newItems: CartItem[];

      if (existingTargetItem) {
        // If it exists, merge quantities and remove the old item (which we did by filtering)
        newItems = otherItems.map((item) =>
          item.id === newCartItemId
            ? { ...item, quantity: item.quantity + currentItem.quantity }
            : item
        );
      } else {
        // If it doesn't exist, create a new item with the updated size and price
        const newItem: CartItem = {
          ...currentItem,
          id: newCartItemId,
          size: newSize,
          price: currentItem.prices[newSize],
        };
        // Add the new item back into the list
        newItems = [...otherItems, newItem];
      }

      return newItems;
    });
  };

  const updateItemAddons = (cartItemId: string, newAddons: Addon[]) => {
    setCartItems((prevItems) => {
      const currentItem = prevItems.find((item) => item.id === cartItemId);
      if (!currentItem || !currentItem.dishId) {
        return prevItems;
      }

      const sortedNewAddons = [...newAddons].sort((a, b) => a.name.localeCompare(b.name));
      const addonsKey = sortedNewAddons.map(a => a.name).join('-');
      
      const newCartItemId = [currentItem.dishId, currentItem.size, addonsKey].filter(Boolean).join('-');

      if (cartItemId === newCartItemId) {
        return prevItems;
      }

      const otherItems = prevItems.filter((item) => item.id !== cartItemId);
      const existingTargetItem = otherItems.find((item) => item.id === newCartItemId);

      if (existingTargetItem) {
        return otherItems.map((item) =>
          item.id === newCartItemId
            ? { ...item, quantity: item.quantity + currentItem.quantity }
            : item
        );
      } else {
        const updatedItem: CartItem = {
          ...currentItem,
          id: newCartItemId,
          selectedAddons: sortedNewAddons,
        };
        return [...otherItems, updatedItem];
      }
    });
  };


  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => {
        const addonsPrice = item.selectedAddons?.reduce((sum, addon) => sum + addon.price, 0) ?? 0;
        return total + (item.price + addonsPrice) * item.quantity;
    },
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
        updateItemSize,
        updateItemAddons,
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
