'use client';

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DishCard from "./DishCard";
import { MENU_CATEGORIES } from "@/lib/constants";
import { mockDishes, getDishesByCategory, getNewDishes } from "@/data/menu";
import type { Dish } from '@/lib/types';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// This function renders the grid of dishes. It's used for both search results and category views.
const DishGrid = ({ dishes, emptyText }: { dishes: Dish[], emptyText: string }) => {
  if (!dishes || dishes.length === 0) {
    return <p className="text-center text-muted-foreground py-8">{emptyText}</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
};

export default function MenuDisplay() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0].slug);
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize search results for performance.
  // This filters all dishes if a search query is entered.
  const searchResults = useMemo(() => {
    if (!searchQuery) return null;

    const lowercasedQuery = searchQuery.toLowerCase().trim();
    if (!lowercasedQuery) return null;

    return mockDishes.filter(dish =>
      dish.name.toLowerCase().includes(lowercasedQuery) ||
      dish.description.toLowerCase().includes(lowercasedQuery) ||
      dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowercasedQuery))
    );
  }, [searchQuery]);

  // This function gets dishes for the currently selected tab.
  const renderDishesForTab = (categorySlug: string, subCategorySlug?: string) => {
    let dishes: Dish[];
    if (categorySlug === 'new') {
      dishes = getNewDishes();
    } else {
      dishes = getDishesByCategory(categorySlug, subCategorySlug);
    }
    
    return <DishGrid dishes={dishes} emptyText="В этой категории пока нет блюд." />;
  };

  return (
    <section id="menu" className="py-8 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-primary">Наше Меню</h2>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8 sm:mb-10 animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Найти блюдо или ингредиент (например, лосось...)"
              className="w-full pl-10 h-12 text-base rounded-lg shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {searchResults !== null ? (
          // If there are search results, display them instead of the tabs.
          <div className="animate-in fade-in duration-500">
             <h3 className="text-xl sm:text-2xl font-headline text-foreground/90 mb-4 sm:mb-6 text-center">
               Результаты поиска по запросу "{searchQuery}"
             </h3>
            <DishGrid dishes={searchResults} emptyText="Ничего не найдено." />
          </div>
        ) : (
          // Otherwise, show the default tabbed menu.
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
                        {renderDishesForTab(category.slug, subCategory.slug)}
                      </div>
                    ))}
                  </div>
                ) : (
                  renderDishesForTab(category.slug)
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </section>
  );
}
