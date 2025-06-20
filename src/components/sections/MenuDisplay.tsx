
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DishCard from "./DishCard";
import { MENU_CATEGORIES } from "@/lib/constants";
import { mockDishes, getDishesByCategory, getNewDishes, getPopularDishes } from "@/data/menu"; // Using mock data
import type { Dish } from '@/lib/types';

export default function MenuDisplay() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0].slug);

  // For categories with subcategories, we might need a more complex tab structure or separate sections.
  // For simplicity, this example will list all dishes under the main category if subcategories exist.
  // A more advanced implementation would handle subcategory selection within the tab content.

  return (
    <section id="menu" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-10">
          Наше Меню
        </h2>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex items-center overflow-x-auto space-x-2 p-1 mb-8 sm:grid sm:w-full sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:justify-center sm:gap-2 sm:space-x-0 bg-transparent sm:p-0">
            {MENU_CATEGORIES.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.slug}
                className="whitespace-nowrap flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-primary/10 transition-colors px-4 py-2 rounded-md text-sm"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {MENU_CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.slug}>
              {category.subCategories && category.subCategories.length > 0 ? (
                <div className="space-y-8">
                  {category.subCategories.map(subCategory => (
                    <div key={subCategory.id}>
                      <h3 className="text-2xl font-headline font-semibold text-foreground mb-4">{subCategory.name}</h3>
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

// Helper to get dishes for subcategories as well
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
};

