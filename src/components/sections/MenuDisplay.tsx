'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DishCard from "./DishCard";
import { MENU_CATEGORIES } from "@/lib/constants";
import { mockDishes, getDishesByCategory, getNewDishes, getPopularDishes } from "@/data/menu"; // Using mock data
import type { Dish } from '@/lib/types';

export default function MenuDisplay() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0].slug);

  return (
    <section id="menu" className="py-6 md:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative">
            <TabsList className="flex items-center overflow-x-auto space-x-2 p-1 h-auto bg-transparent mb-6">
              {MENU_CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.slug}
                  className="whitespace-nowrap flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg bg-card text-foreground hover:bg-card/80"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            {MENU_CATEGORIES.find(c => c.slug === activeTab)?.name}
          </h2>

          {MENU_CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.slug}>
              {category.subCategories && category.subCategories.length > 0 ? (
                <div className="space-y-8">
                  {category.subCategories.map(subCategory => (
                    <div key={subCategory.id}>
                      <h3 className="text-xl font-semibold text-foreground mb-4">{subCategory.name}</h3>
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
};
