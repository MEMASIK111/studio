// This is a server-side file
'use server';

/**
 * @fileOverview A dish recommendation AI agent.
 *
 * - getDishRecommendations - A function that handles the dish recommendation process.
 * - DishRecommendationsInput - The input type for the getDishRecommendations function.
 * - DishRecommendationsOutput - The return type for the getDishRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DishRecommendationsInputSchema = z.object({
  pastOrderHistory: z.string().describe('The past order history of the user.'),
  currentDiscounts: z.string().describe('The current discounts available.'),
  popularityData: z.string().describe('Data on popular dishes.'),
});
export type DishRecommendationsInput = z.infer<typeof DishRecommendationsInputSchema>;

const DishRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommended dishes.'),
});
export type DishRecommendationsOutput = z.infer<typeof DishRecommendationsOutputSchema>;

export async function getDishRecommendations(input: DishRecommendationsInput): Promise<DishRecommendationsOutput> {
  return dishRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dishRecommendationsPrompt',
  input: {schema: DishRecommendationsInputSchema},
  output: {schema: DishRecommendationsOutputSchema},
  prompt: `You are a food recommendation expert. Based on the past order history, current discounts, and popularity data, you will provide a list of dish recommendations.

Past Order History: {{{pastOrderHistory}}}
Current Discounts: {{{currentDiscounts}}}
Popularity Data: {{{popularityData}}}

Recommendations:`, 
});

const dishRecommendationsFlow = ai.defineFlow(
  {
    name: 'dishRecommendationsFlow',
    inputSchema: DishRecommendationsInputSchema,
    outputSchema: DishRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
