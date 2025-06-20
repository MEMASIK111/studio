export interface Dish {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  category: string;
  subCategory?: string;
  imageUrl: string;
  popular?: boolean;
  new?: boolean;
  rating?: number; // Рейтинг оставим, но не будем отображать на карточке
  reviews?: number; // Количество отзывов оставим, но не будем отображать
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories?: { id: string; name: string; slug: string }[];
}

export interface CartItem extends Dish {
  quantity: number;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  // For AI recommendations (simplified)
  pastOrderHistory?: string[]; // dish IDs or names
  preferences?: string; // e.g., "vegetarian", "spicy"
}
