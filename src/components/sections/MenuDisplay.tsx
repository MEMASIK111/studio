'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DishCard from "./DishCard";
import { MENU_CATEGORIES } from "@/lib/constants";
import { mockDishes, getDishesByCategory, getNewDishes, getPopularDishes } from "@/data/menu";
import type { Dish } from '@/lib/types';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


export default function MenuDisplay() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0].slug);

  return (
    <section id="menu" className="py-8 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-primary">Наше Меню</h2>
        </div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="flex justify-center mb-6 sm:mb-8">
            <ScrollArea className="max-w-full">
                <TabsList className="inline-flex h-auto p-1 bg-primary/10 rounded-lg">
                {MENU_CATEGORIES.map((category) => (
                    <TabsTrigger
                    key={category.id}
                    value={category.slug}
                    className="whitespace-nowrap px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base font-semibold"
                    >
                    {category.name}
                    </TabsTrigger>
                ))}
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {MENU_CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.slug}>
              {category.subCategories && category.subCategories.length > 0 ? (
                <div className="space-y-8">
                  {category.subCategories.map(subCategory => (
                    <div key={subCategory.id}>
                      <h3 className="text-xl sm:text-2xl font-headline text-foreground/90 mb-4 sm:mb-6 text-center md:text-left">{subCategory.name}</h3>
                      {renderDishes(category.slug, subCategory.slug)}
                    </div>
                  ))}
                </div>
              ) : (
                renderDishes(category.slug)
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

const renderDishes = (categorySlug: string, subCategorySlug?: string) => {
  let dishes: Dish[];
  if (categorySlug === 'popular') {
    dishes = getPopularDishes();
  } else if (categorySlug === 'new') {
    dishes = getNewDishes();
  } else {
    dishes = getDishesByCategory(categorySlug, subCategorySlug);
  }
  
  if (!dishes || dishes.length === 0) {
    return <p className="text-center text-muted-foreground py-8">В этой категории пока нет блюд.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
};
