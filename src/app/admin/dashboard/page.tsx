// src/app/admin/dashboard/page.tsx
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { mockDishes, getPopularDishes, getNewDishes } from '@/data/menu';
import { MENU_CATEGORIES } from '@/lib/constants';
import { Utensils, Star, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const totalDishes = mockDishes.length;
  const popularDishesCount = getPopularDishes().length;
  const newDishesCount = getNewDishes().length;

  const dishesPerCategory = MENU_CATEGORIES.map(category => {
    const dishes = mockDishes.filter(dish => dish.category === category.slug);
    return {
      name: category.name,
      total: dishes.length,
    };
  }).filter(c => c.total > 0);

  const chartConfig = {
    total: {
      label: 'Блюда',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего блюд</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDishes}</div>
            <p className="text-xs text-muted-foreground">
              Общее количество позиций в меню
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Популярные блюда</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{popularDishesCount}</div>
            <p className="text-xs text-muted-foreground">
              Количество блюд с отметкой "популярное"
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Новинки</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newDishesCount}</div>
            <p className="text-xs text-muted-foreground">
              Количество новых блюд в меню
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Количество блюд по категориям</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={dishesPerCategory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.length > 12 ? `${value.slice(0, 12)}...` : value}
              />
               <YAxis allowDecimals={false} />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="total" fill="var(--color-total)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
