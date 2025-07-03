
// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, PlusCircle, Edit, Trash2 } from 'lucide-react';
import type { Dish } from '@/lib/types';
import { mockDishes } from '@/data/menu';
import Image from 'next/image';

type EditableDish = Partial<Dish> & { id?: string };

export default function AdminMenuPage() {
  const { toast } = useToast();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isDishesLoading, setIsDishesLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDish, setCurrentDish] = useState<EditableDish>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setDishes(mockDishes);
    setIsDishesLoading(false);
  }, []);

  const handleAddNew = () => {
    setCurrentDish({});
    setIsDialogOpen(true);
  };

  const handleEdit = (dish: Dish) => {
    setCurrentDish(dish);
    setIsDialogOpen(true);
  };

  const handleDelete = async (dishId: string) => {
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
        imageUrl: currentDish.imageUrl || 'https://placehold.co/600x400.png'
    };
    
    setTimeout(() => {
        if (currentDish.id) {
            setDishes(prev => prev.map(d => d.id === currentDish.id ? { ...d, ...currentDish, price: Number(currentDish.price) } as Dish : d));
            toast({ title: "Блюдо обновлено", description: "Данные блюда успешно обновлены (локально)." });
        } else {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentDish(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
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
              <TableHead className="w-[80px]">Изображение</TableHead>
              <TableHead>Название</TableHead>
              <TableHead className="w-[150px]">Цена</TableHead>
              <TableHead className="w-[150px] text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isDishesLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24">
                   <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                </TableCell>
              </TableRow>
            ) : dishes.length > 0 ? (
              dishes.map((dish) => (
                <TableRow key={dish.id}>
                  <TableCell>
                    <div className="relative h-12 w-16 rounded-md overflow-hidden bg-muted">
                        <Image
                            src={dish.imageUrl || 'https://placehold.co/600x400.png'}
                            alt={dish.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                            data-ai-hint="food meal"
                        />
                    </div>
                  </TableCell>
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
                <TableCell colSpan={4} className="text-center h-24">
                  Меню пока пустое. Добавьте первое блюдо.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleFormSubmit}>
                  <DialogHeader>
                      <DialogTitle>{currentDish.id ? 'Редактировать блюдо' : 'Добавить новое блюдо'}</DialogTitle>
                      <DialogDescription>
                          {currentDish.id ? 'Внесите изменения и нажмите "Сохранить".' : 'Заполните информацию о новом блюде.'}
                      </DialogDescription>
                  </DialogHeader>

                  {/* Image Preview */}
                  {currentDish.imageUrl && (
                      <div className="relative aspect-video w-full rounded-md overflow-hidden my-4 bg-muted">
                          <Image 
                              src={currentDish.imageUrl} 
                              alt="Предпросмотр изображения"
                              fill
                              className="object-cover"
                              data-ai-hint="food meal"
                           />
                      </div>
                  )}
                  
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imageFile" className="text-right">Фото</Label>
                        <Input
                            id="imageFile"
                            name="imageFile"
                            type="file"
                            onChange={handleFileChange}
                            className="col-span-3 file:text-primary file:font-medium"
                            accept="image/*"
                        />
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
    </>
  );
}
