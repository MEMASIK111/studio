export interface Dish {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  price?: number; // Price for non-pizza items
  prices?: Record<string, number>; // Prices for different sizes, e.g., { "30cm": 500, "40cm": 650 }
  category: string;
  subCategory?: string;
  imageUrl: string;
  popular?: boolean;
  new?: boolean;
  rating?: number;
  reviews?: number;
  dataAiHint?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories?: { id: string; name: string; slug: string }[];
}

export interface CartItem extends Dish {
  quantity: number;
  // Overriding id to be the unique identifier for the cart item (e.g., "pizza-1-30cm")
  id: string; 
  // The original dish ID
  dishId: string;
  // The selected size for items that have sizes
  size?: string;
  // The price for the selected size
  price: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addItem: (dish: Dish, quantity?: number, size?: string) => void;
  removeItem: (cartItemId: string) => void;
  updateItemQuantity: (cartItemId: string, quantity: number) => void;
  updateItemSize: (cartItemId: string, newSize: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number; // Total number of individual items (sum of quantities)
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
