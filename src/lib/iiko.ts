/**
 * @fileOverview Client-side utilities for interacting with iiko Firebase Functions.
 *
 * This file provides functions to:
 * 1. Synchronize the local menu with iiko.
 * 2. Create an order in iiko.
 *
 * --- SETUP INSTRUCTIONS ---
 *
 * 1. SET API KEY (in your terminal, in the project root):
 *    firebase functions:config:set iiko.api_key="YOUR_IIKO_API_KEY"
 *    (Replace YOUR_IIKO_API_KEY with your actual key)
 *
 * 2. DEPLOY FUNCTIONS (in your terminal):
 *    firebase deploy --only functions
 *
 * 3. HOW TO USE:
 *    - To sync the menu, you can call `syncMenuWithIiko()` from a browser console or a button click.
 *      This only needs to be done once, or when your menu changes.
 *    - `createOrderInIiko(orderData)` should be called when a user submits their order.
 *
 * IMPORTANT: The iiko API endpoints in the Firebase Functions are placeholders.
 * You must replace "https://api.iiko.cloud/v2/menu" and "https://api.iiko.cloud/v2/orders"
 * with the correct URLs from your iikoCloud API documentation.
 */

'use client';

import { mockDishes } from "@/data/menu"; // Your local menu data
import type { CartItem } from "@/lib/types";


// --- 1. Menu Synchronization ---

// Prepare the menu data for iiko
const menuForIiko = mockDishes.map(dish => ({
  id: dish.id, // Sending ID to potentially update existing items in iiko
  name: dish.name,
  description: dish.description,
  // Using the primary price, or the first price if multiple are available
  price: dish.price ?? (dish.prices ? Object.values(dish.prices)[0] : 0),
  // You might need to map your category/subCategory to iiko's group IDs here
  category: dish.category,
}));


/**
 * MOCK: Calls the `syncMenu` Firebase Function to send the local menu to iiko.
 */
export async function syncMenuWithIiko() {
  console.log("--- MOCK MODE ---");
  console.log("Starting menu sync with iiko...");
  console.log("Data that would be sent:", { dishes: menuForIiko });
  
  // Simulate a successful API call
  const mockResult = { data: { success: true, message: "MOCK: Menu synchronized successfully with iiko." } };
  
  console.log("Sync successful (mock)!", mockResult.data);
  alert("Menu sync successful (MOCK)! Check the console for details.");
  return mockResult.data;
}


// --- 2. Order Creation ---

interface OrderCustomer {
    name: string;
    phone: string;
    address: string;
}

interface OrderPayload {
    items: {
        itemId: string; // This should be the ID known by iiko
        quantity: number;
    }[];
    customer: OrderCustomer;
}


/**
 * Creates an order payload from cart items and customer info.
 * @param cartItems - The items from the shopping cart.
 * @param customer - The customer's details.
 * @returns The formatted order payload for the `createOrder` function.
 */
export function prepareOrderData(cartItems: CartItem[], customer: OrderCustomer): OrderPayload {
  const orderItems = cartItems.map(item => ({
    // IMPORTANT: 'itemId' must be the ID that iiko uses for this product.
    // If you sync'd using `dish.id`, then `item.dishId` should be correct.
    itemId: item.dishId,
    quantity: item.quantity,
    // You might need to send size or addon info here as well,
    // depending on iiko's API structure.
  }));

  return {
    items: orderItems,
    customer: customer,
  };
}


/**
 * MOCK: Calls the `createOrder` Firebase Function to send a new order to iiko.
 * @param orderData - The complete order payload.
 */
export async function createOrderInIiko(orderData: OrderPayload) {
  console.log("--- MOCK MODE ---");
  console.log("Sending order to iiko...");
  console.log("Data that would be sent:", orderData);

  // Simulate a successful API call
  const mockResult = { data: { success: true, orderId: `mock-order-${Date.now()}` } };
  
  console.log("Order creation successful (mock)!", mockResult.data);
  alert(`MOCK: Order created with ID: ${mockResult.data.orderId}. Check console for details.`);
  return mockResult.data;
}

// EXAMPLE USAGE (you can call these from your checkout page)
/*
  // In your component:
  import { useCart } from '@/context/CartContext';
  import { prepareOrderData, createOrderInIiko } from '@/lib/iiko';

  const { cartItems } = useCart();

  const handleCheckout = async () => {
    const customerInfo = {
      name: 'John Doe',
      phone: '+1234567890',
      address: '123 Main St, Anytown, USA'
    };

    const orderPayload = prepareOrderData(cartItems, customerInfo);
    await createOrderInIiko(orderPayload);
  }
*/
