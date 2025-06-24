import type { Category } from './types';

export const APP_NAME = "Mozzarella";
// Updated PHONE_NUMBER to match the request in the image
export const PHONE_NUMBER = "+7 (989) 479-70-70"; 
export const WHATSAPP_NUMBER = "79894797070"; // For wa.me link, without + or symbols
export const INSTAGRAM_URL = "https://www.instagram.com/mozzarella_kaspiysk/"; // Example, replace with actual
export const ADDRESS = "Каспийск, улица Ленина 51 Б";
export const WORKING_HOURS = "Ежедневно с 9:00 до 23:00";

export const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/#menu", label: "Меню" },
  { href: "/delivery-info", label: "Доставка" },
  { href: "/contact", label: "Контакты" },
];

export const USER_NAV_LINKS_GUEST = [
  { href: "/auth/login", label: "Вход" },
  { href: "/auth/register", label: "Регистрация" },
];

export const USER_NAV_LINKS_AUTHENTICATED = [
  { href: "/profile", label: "Профиль" },
  { href: "/favorites", label: "Избранное" },
  // Logout functionality will be handled by a button/action
];

export const MENU_CATEGORIES: Category[] = [
  { id: "popular", name: "Популярное", slug: "popular" },
  { id: "new", name: "Новинки", slug: "new" },
  {
    id: "rolls",
    name: "Роллы",
    slug: "rolls",
    subCategories: [
      { id: "cold-rolls", name: "Холодные роллы", slug: "cold-rolls" },
      { id: "hot-rolls", name: "Горячие роллы", slug: "hot-rolls" },
    ],
  },
  { id: "pizza", name: "Пицца", slug: "pizza" },
  {
    id: "main-dishes",
    name: "Основные блюда",
    slug: "main-dishes",
    subCategories: [
      { id: "chicken", name: "Курица", slug: "chicken" },
      { id: "meat", name: "Мясо", slug: "meat" },
      { id: "steaks", name: "Стейки", slug: "steaks" },
      { id: "pasta-noodles", name: "Паста/Лапша", slug: "pasta-noodles" },
    ],
  },
  { id: "soups", name: "Супы", slug: "soups" },
  {
    id: "salads",
    name: "Салаты",
    slug: "salads",
    subCategories: [
      { id: "bowls", name: "Боулы", slug: "bowls" },
      { id: "sandwiches", name: "Сэндвичи", slug: "sandwiches" },
    ],
  },
  {
    id: "fast-food",
    name: "Фаст-фуд",
    slug: "fast-food",
    subCategories: [
      { id: "hot-snacks", name: "Горячие закуски", slug: "hot-snacks" },
      { id: "side-dishes", name: "Гарниры", slug: "side-dishes" },
      { id: "sauces", name: "Соусы", slug: "sauces" },
    ],
  },
  {
    id: "bar",
    name: "Бар",
    slug: "bar",
    subCategories: [
      { id: "lemonades", name: "Лимонады", slug: "lemonades" },
      { id: "cocktails", name: "Коктейли", slug: "cocktails" },
      { id: "desserts", name: "Десерты", slug: "desserts" },
      { id: "natural-juices", name: "Натуральные соки", slug: "natural-juices" },
      { id: "coffee", name: "Кофе", slug: "coffee" },
      { id: "carbonated-drinks", name: "Газированные напитки", slug: "carbonated-drinks" },
      { id: "fresh-juices", name: "Свежевыжатые соки", slug: "fresh-juices" },
    ],
  },
];

export const DELIVERY_INFO = {
  city: "Каспийск",
  streets: ["Мармарис", "Омарова", "Амет-Хана Султана", "Ленина", "Кольцевая"],
  averageTime: "около 55 минут",
  freeDeliveryFrom: 500, // in Rubles
  costNote: "Точную стоимость уточните у оператора",
};

export const PAYMENT_METHODS = ["наличными", "онлайн"];
