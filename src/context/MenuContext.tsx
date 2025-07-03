// src/context/MenuContext.tsx
"use client";

import type { Dish } from '@/lib/types';
import { mockDishes } from '@/data/menu';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface MenuContextType {
  dishes: Dish[];
  addDish: (dish: Dish) => void;
  updateDish: (dish: Dish) => void;
  deleteDish: (dishId: string) => void;
  getDishById: (id: string) => Dish | undefined;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isMenuLoaded, setIsMenuLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const localData = localStorage.getItem('menuDishes');
        if (localData) {
          setDishes(JSON.parse(localData));
        } else {
          // Initialize with mock data if localStorage is empty
          setDishes(mockDishes);
          localStorage.setItem('menuDishes', JSON.stringify(mockDishes));
        }
      } catch (e) {
        console.error("Failed to process menu from localStorage, resetting to mock data.", e);
        setDishes(mockDishes);
      }
      setIsMenuLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever dishes change, but only after initial load
    if (isMenuLoaded) {
      localStorage.setItem('menuDishes', JSON.stringify(dishes));
    }
  }, [dishes, isMenuLoaded]);

  const addDish = (dish: Dish) => {
    setDishes(prev => [dish, ...prev]);
  };

  const updateDish = (updatedDish: Dish) => {
    setDishes(prev => prev.map(d => (d.id === updatedDish.id ? updatedDish : d)));
  };

  const deleteDish = (dishId: string) => {
    setDishes(prev => prev.filter(d => d.id !== dishId));
  };
  
  const getDishById = (id: string): Dish | undefined => {
    return dishes.find(dish => dish.id === id);
  };

  const value = { dishes, addDish, updateDish, deleteDish, getDishById };

  return (
    <MenuContext.Provider value={value}>
      {isMenuLoaded ? children : null /* Render children only after menu is loaded to prevent flicker */}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
