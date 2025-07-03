
// src/app/admin/page.tsx
"use client";

import { useState } from 'react';
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
import { useMenu } from '@/context/MenuContext';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MENU_CATEGORIES } from '@/lib/constants';


// A type for the form state, where ingredients is a string for the textarea
type EditableDish = Omit<Partial<Dish>, 'ingredients'> & {
  id?: string;
  ingredients?: string;
};

export default function AdminMenuPage() {
  const { toast } = useToast();
  const { dishes, addDish, updateDish, deleteDish } = useMenu();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDish, setCurrentDish] = useState<EditableDish>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCategoryData = MENU_CATEGORIES.find(c => c.slug === currentDish.category);

  const handleAddNew = () => {
    setCurrentDish({ category: MENU_CATEGORIES[0].slug });
    setIsDialogOpen(true);
  };

  const handleEdit = (dish: Dish) => {
    // Convert ingredients array to a comma-separated string for the form
    setCurrentDish({ ...dish, ingredients: dish.ingredients?.join(', ') });
    setIsDialogOpen(true);
  };

  const handleDelete = async (dishId: string) => {
    deleteDish(dishId);
    toast({ title: "Блюдо удалено", description: "Блюдо успешно удалено из меню." });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!currentDish.name || !currentDish.price || !currentDish.category) {
      toast({ title: "Ошибка валидации", description: "Пожалуйста, заполните все обязательные поля, включая категорию.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    
    // Convert ingredients string back to array for saving
    const ingredientsArray = (currentDish.ingredients || '').split(',').map(s => s.trim()).filter(Boolean);

    setTimeout(() => {
        if (currentDish.id) {
            const originalDish = dishes.find(d => d.id === currentDish.id)!;
            const { ingredients, ...restOfCurrentDish } = currentDish;
            
            const updatedDish: Dish = {
                ...originalDish,
                ...restOfCurrentDish,
                price: Number(currentDish.price!),
                ingredients: ingredientsArray,
                description: '', // Set description to empty as requested
            };

            updateDish(updatedDish);
            toast({ title: "Блюдо обновлено", description: "Данные блюда успешно обновлены." });
        } else {
            const newDish: Dish = { 
                id: `dish-${Date.now()}`,
                name: currentDish.name!,
                description: '', // Set description to empty as requested
                price: Number(currentDish.price!),
                ingredients: ingredientsArray,
                category: currentDish.category!,
                subCategory: currentDish.subCategory,
                imageUrl: currentDish.imageUrl || 'https://placehold.co/600x400.png'
            };
            addDish(newDish);
            toast({ title: "Блюдо добавлено", description: "Новое блюдо успешно добавлено в меню." });
        }
        setIsDialogOpen(false);
        setIsSubmitting(false);
        setCurrentDish({});
    }, 500);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentDish(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (slug: string) => {
      setCurrentDish(prev => ({ ...prev, category: slug, subCategory: undefined }));
  };

  const handleSubCategoryChange = (slug: string) => {
      setCurrentDish(prev => ({ ...prev, subCategory: slug }));
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
            {dishes.length > 0 ? (
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

                  <div className="max-h-[60vh] overflow-y-auto pr-2">
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
                            <Label htmlFor="ingredients" className="text-right">Состав</Label>
                            <Textarea id="ingredients" name="ingredients" value={currentDish.ingredients || ''} onChange={handleInputChange} className="col-span-3" placeholder="Укажите ингредиенты через запятую" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Цена (руб.)</Label>
                            <Input id="price" name="price" type="number" value={currentDish.price || ''} onChange={handleInputChange} className="col-span-3" required/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Категория</Label>
                            <Select value={currentDish.category} onValueChange={handleCategoryChange}>
                              <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Выберите категорию" />
                              </SelectTrigger>
                              <SelectContent>
                                  {MENU_CATEGORIES.map(cat => (
                                      <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                        </div>
                        
                        {selectedCategoryData?.subCategories && selectedCategoryData.subCategories.length > 0 && (
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="subCategory" className="text-right">Подкатегория</Label>
                              <Select value={currentDish.subCategory} onValueChange={handleSubCategoryChange}>
                                  <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Выберите подкатегорию" />
                                  </SelectTrigger>
                                  <SelectContent>
                                  {selectedCategoryData.subCategories.map(subCat => (
                                      <SelectItem key={subCat.slug} value={subCat.slug}>{subCat.name}</SelectItem>
                                  ))}
                                  </SelectContent>
                              </Select>
                            </div>
                        )}
                        
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
                  </div>
                  <DialogFooter className="pt-4 border-t">
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
