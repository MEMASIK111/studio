/**
 * @fileOverview Firebase Functions for iikoCloud API integration.
 * This file contains two callable functions:
 * - syncMenu: To synchronize the website's menu with iiko.
 * - createOrder: To send a new order from the website to iiko.
 *
 * Before deploying, ensure you have set the iiko API key in Firebase config:
 * firebase functions:config:set iiko.api_key="YOUR_API_KEY"
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Helper to get API key from Firebase config
const getApiKey = (): string => {
  const apiKey = functions.config().iiko?.api_key;
  if (!apiKey) {
    // Используйте ваш API-ключ вместо плейсхолдера
    return "[INSERT_API_KEY_HERE]";
  }
  return apiKey;
};


/**
 * syncMenu
 * A callable function to sync menu data with iiko.
 *
 * @param data - The menu data from the client. Expected format:
 *   { dishes: [{ name: string, price: number, description: string }, ...] }
 * @returns A success or error message.
 */
export const syncMenu = functions.https.onCall(async (data, context) => {
  // --- Data Validation ---
  if (!data.dishes || !Array.isArray(data.dishes)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with an object containing a 'dishes' array."
    );
  }

  const apiKey = getApiKey();
  // IMPORTANT: This is a placeholder URL. Replace with the actual iikoCloud API endpoint for menu sync.
  const iikoMenuEndpoint = "https://api.iiko.cloud/v2/menu";

  try {
    const response = await axios.post(
      iikoMenuEndpoint,
      { menu: data.dishes }, // Wrap it in an object as the API might expect
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Log success and return a confirmation message
    console.log("Menu sync successful:", response.data);
    return { success: true, message: "Menu synchronized successfully with iiko." };
  } catch (error: any) {
    console.error("Error syncing menu with iiko:", error.response?.data || error.message);
    throw new functions.https.HttpsError(
      "unknown",
      error.response?.data?.message || "Failed to sync menu with iiko.",
      error.response?.data
    );
  }
});


/**
 * createOrder
 * A callable function to create an order in iiko.
 *
 * @param data - The order data from the client. Expected format:
 *   { items: [{ itemId: string, quantity: number }, ...], customer: { name: string, phone: string, address: string } }
 * @returns The order ID from iiko or an error.
 */
export const createOrder = functions.https.onCall(async (data, context) => {
  // --- Data Validation ---
  if (!data.items || !Array.isArray(data.items) || !data.customer) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with an object containing 'items' array and 'customer' object."
    );
  }

  const apiKey = getApiKey();
  // IMPORTANT: This is a placeholder URL. Replace with the actual iikoCloud API endpoint for creating orders.
  const iikoOrderEndpoint = "https://api.iiko.cloud/v2/orders";

  try {
    const response = await axios.post(
      iikoOrderEndpoint,
      data,
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Log success and return the order ID
    console.log("Order created successfully:", response.data);
    return { success: true, orderId: response.data.orderId }; // Assuming iiko returns an orderId
  } catch (error: any) {
    console.error("Error creating order in iiko:", error.response?.data || error.message);
    throw new functions.https.HttpsError(
      "unknown",
      error.response?.data?.message || "Failed to create order in iiko.",
      error.response?.data
    );
  }
});
