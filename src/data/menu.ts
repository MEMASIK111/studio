import type { Dish } from '@/lib/types';

export const mockDishes: Dish[] = [
  // Popular
  {
    id: '1',
    name: 'Пицца Цезарь',
    description: 'Соус цезарь, сыр моцарелла, курица, помидоры черри, листья салата, пармезан.',
    ingredients: ['Тесто', 'Соус Цезарь', 'Сыр Моцарелла', 'Курица', 'Помидоры Черри', 'Листья салата', 'Сыр Пармезан'],
    price: 450,
    category: 'pizza',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'pizza caesar',
    popular: true,
    rating: 4.5,
    reviews: 120,
    new: false,
  },
  {
    id: '2',
    name: 'Ролл Филадельфия',
    description: 'Нежный ролл с лососем, сливочным сыром и огурцом.',
    ingredients: ['Рис', 'Нори', 'Лосось', 'Сливочный сыр', 'Огурец'],
    price: 380,
    category: 'rolls',
    subCategory: 'cold-rolls',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sushi roll',
    popular: true,
    rating: 4.8,
    reviews: 250,
    new: false,
  },
  // New
  {
    id: '3',
    name: 'Унаги Темпура Ролл',
    description: 'Хрустящий темпура ролл с угрем, авокадо и соусом терияки.',
    ingredients: ['Рис', 'Нори', 'Угорь', 'Авокадо', 'Сливочный сыр', 'Икра Тобико', 'Соус Терияки', 'Жареный лук', 'Темпура кляр'],
    price: 420,
    category: 'rolls',
    subCategory: 'hot-rolls',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sushi tempura',
    new: true,
    rating: 4.6,
    reviews: 30,
    popular: false,
  },
  {
    id: '4',
    name: 'Салат Боул с Креветками',
    description: 'Сытный и полезный боул с киноа, креветками и свежими овощами.',
    ingredients: ['Киноа', 'Креветки', 'Авокадо', 'Огурец', 'Помидоры черри', 'Соус манго-чили'],
    price: 550,
    category: 'salads',
    subCategory: 'bowls',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'salad shrimp',
    new: true,
    rating: 4.7,
    reviews: 45,
    popular: false,
  },
  // Pizza
  {
    id: '5',
    name: 'Пицца Пепперони',
    description: 'Пикантная пицца с колбасками пепперони и моцареллой.',
    ingredients: ['Тесто', 'Томатный соус', 'Сыр Моцарелла', 'Пепперони'],
    price: 500,
    category: 'pizza',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'pizza pepperoni',
    rating: 4.6,
    reviews: 90,
    popular: true,
    new: false,
  },
  // Rolls - Cold
  {
    id: '6',
    name: 'Ролл Калифорния',
    description: 'Классический ролл с крабовым мясом, авокадо и огурцом.',
    ingredients: ['Рис', 'Нори', 'Крабовое мясо (имитация)', 'Авокадо', 'Огурец', 'Икра Тобико'],
    price: 350,
    category: 'rolls',
    subCategory: 'cold-rolls',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sushi roll',
    rating: 4.4,
    reviews: 150,
    popular: false,
    new: false,
  },
  // Main Dishes - Pasta
  {
    id: '7',
    name: 'Паста Карбонара',
    description: 'Спагетти с беконом, яйцом, пармезаном и черным перцем.',
    ingredients: ['Спагетти', 'Бекон', 'Яичный желток', 'Сыр Пармезан', 'Черный перец', 'Сливки'],
    price: 480,
    category: 'main-dishes',
    subCategory: 'pasta-noodles',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'pasta carbonara',
    rating: 4.7,
    reviews: 70,
    popular: true,
    new: false,
  },
  // Soups
  {
    id: '8',
    name: 'Том Ям',
    description: 'Острый тайский суп с креветками, грибами и кокосовым молоком.',
    ingredients: ['Креветки', 'Грибы Шиитаке', 'Кокосовое молоко', 'Лемонграсс', 'Галангал', 'Чили'],
    price: 400,
    category: 'soups',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'thai soup',
    rating: 4.9,
    reviews: 110,
    popular: false,
    new: false,
  },
  // Bar - Desserts
  {
    id: '9',
    name: 'Чизкейк Нью-Йорк',
    description: 'Классический чизкейк на песочной основе.',
    ingredients: ['Сливочный сыр', 'Сахар', 'Яйца', 'Сливки', 'Песочное тесто'],
    price: 250,
    category: 'bar',
    subCategory: 'desserts',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'newyork cheesecake',
    rating: 4.8,
    reviews: 85,
    popular: false,
    new: false,
  },
  // Bar - Lemonades
   {
    id: '10',
    name: 'Лимонад "Классический"',
    description: 'Освежающий домашний лимонад.',
    ingredients: ['Лимонный сок', 'Сахарный сироп', 'Газированная вода', 'Мята'],
    price: 150,
    category: 'bar',
    subCategory: 'lemonades',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'drink lemonade',
    new: false,
    rating: 4.5,
    reviews: 50,
    popular: false,
  },
];

// Function to get dishes by category (and optionally subcategory)
export const getDishesByCategory = (categorySlug: string, subCategorySlug?: string): Dish[] => {
  return mockDishes.filter(dish => {
    const categoryMatch = dish.category === categorySlug;
    if (subCategorySlug) {
      return categoryMatch && dish.subCategory === subCategorySlug;
    }
    return categoryMatch;
  });
};

export const getPopularDishes = (): Dish[] => mockDishes.filter(dish => dish.popular);
export const getNewDishes = (): Dish[] => mockDishes.filter(dish => dish.new);
export const getDishById = (id: string): Dish | undefined => mockDishes.find(dish => dish.id === id);
