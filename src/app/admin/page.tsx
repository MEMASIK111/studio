// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, PlusCircle, Edit, Trash2 } from 'lucide-react';
import type { Dish } from '@/lib/types';
import { mockDishes } from '@/data/menu';

// Extend Dish type for Firestore operations, making id optional for new dishes
type EditableDish = Partial<Dish> & { id?: string };

export default function AdminPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isDishesLoading, setIsDishesLoading] = useState(true);
  
  // State for the Add/Edit dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDish, setCurrentDish] = useState<EditableDish>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Authentication ---
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  // --- Data Fetching (from mock data) ---
  useEffect(() => {
    if (user) {
      // Load dishes from local mock data instead of Firestore
      setDishes(mockDishes);
      setIsDishesLoading(false);
    }
  }, [user]);
  
  // Handle user logout
  const handleLogout = async () => {
    logout(); // Use logout from our mock AuthContext
    router.push('/admin/login');
  };

  // --- CRUD Operations (on local state) ---

  const handleAddNew = () => {
    setCurrentDish({});
    setIsDialogOpen(true);
  };

  const handleEdit = (dish: Dish) => {
    setCurrentDish(dish);
    setIsDialogOpen(true);
  };

  const handleDelete = async (dishId: string) => {
    // Update local state instead of deleting from Firestore
    setDishes(prevDishes => prevDishes.filter(dish => dish.id !== dishId));
    toast({ title: "Блюдо удалено", description: "Блюдо успешно удалено из меню (локально)." });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!currentDish.name || !currentDish.price || !currentDish.description) {
      toast({ title: "Ошибка валидации", description: "Пожалуйста, заполните все обязательные поля.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    
    const dishData: Omit<EditableDish, 'id'> & { price: number } = {
        name: currentDish.name,
        description: currentDish.description || '',
        price: Number(currentDish.price),
        ingredients: currentDish.ingredients || [],
        category: currentDish.category || 'uncategorized',
        imageUrl: currentDish.imageUrl || 'https://placehold.co/400x300.png'
    };
    
    // Simulate saving
    setTimeout(() => {
        if (currentDish.id) {
            // Update existing dish in local state
            setDishes(prev => prev.map(d => d.id === currentDish.id ? { ...d, ...currentDish, price: Number(currentDish.price) } : d));
            toast({ title: "Блюдо обновлено", description: "Данные блюда успешно обновлены (локально)." });
        } else {
            // Add new dish to local state with a temporary ID
            const newDish: Dish = { ...dishData, id: `new-${Date.now()}`};
            setDishes(prev => [newDish, ...prev]);
            toast({ title: "Блюдо добавлено", description: "Новое блюдо успешно добавлено в меню (локально)." });
        }
        setIsDialogOpen(false);
        setIsSubmitting(false);
    }, 500);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentDish(prev => ({ ...prev, [name]: value }));
  };

  if (loading || !user) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-primary">Админ-панель</h1>
          <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">Выйти</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Управление Меню</h2>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Добавить блюдо
          </Button>
        </div>

        <div className="bg-background rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead className="w-[150px]">Цена</TableHead>
                <TableHead className="w-[150px] text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isDishesLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-24">
                     <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                  </TableCell>
                </TableRow>
              ) : dishes.length > 0 ? (
                dishes.map((dish) => (
                  <TableRow key={dish.id}>
                    <TableCell className="font-medium">{dish.name}</TableCell>
                    <TableCell>{dish.price || (dish.prices ? Object.values(dish.prices)[0] : 'N/A')} руб.</TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="mr-2" onClick={() => handleEdit(dish)}>
                           <Edit className="h-4 w-4" />
                        </Button>
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Это действие невозможно отменить. Блюдо "{dish.name}" будет навсегда удалено из меню.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(dish.id!)}>Удалить</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-24">
                    Меню пока пустое. Добавьте первое блюдо.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleFormSubmit}>
                  <DialogHeader>
                      <DialogTitle>{currentDish.id ? 'Редактировать блюдо' : 'Добавить новое блюдо'}</DialogTitle>
                      <DialogDescription>
                          {currentDish.id ? 'Внесите изменения и нажмите "Сохранить".' : 'Заполните информацию о новом блюде.'}
                      </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Название</Label>
                          <Input id="name" name="name" value={currentDish.name || ''} onChange={handleInputChange} className="col-span-3" required/>
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">Описание</Label>
                          <Textarea id="description" name="description" value={currentDish.description || ''} onChange={handleInputChange} className="col-span-3" required/>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price" className="text-right">Цена (руб.)</Label>
                          <Input id="price" name="price" type="number" value={currentDish.price || ''} onChange={handleInputChange} className="col-span-3" required/>
                      </div>
                  </div>
                  <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>Отмена</Button>
                      <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Сохранить
                      </Button>
                  </DialogFooter>
              </form>
          </DialogContent>
      </Dialog>
    </div>
  );
}
