'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating responses to user queries about FCFM (Facultad de Ciencias Físicas y Matemáticas de la Universidad de Chile).
 *
 * - generateFCFMResponse - A function that generates responses based on user queries.
 * - GenerateFCFMResponseInput - The input type for the generateFCFMResponse function.
 * - GenerateFCFMResponseOutput - The return type for the generateFCFMResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFCFMResponseInputSchema = z.object({
  query: z.string().describe('The user query about FCFM.'),
  data: z.string().describe('Data about FCFM events, schedules, and resources.'),
});
export type GenerateFCFMResponseInput = z.infer<typeof GenerateFCFMResponseInputSchema>;

const GenerateFCFMResponseOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type GenerateFCFMResponseOutput = z.infer<typeof GenerateFCFMResponseOutputSchema>;

export async function generateFCFMResponse(input: GenerateFCFMResponseInput): Promise<GenerateFCFMResponseOutput> {
  return generateFCFMResponseFlow(input);
}

const generateFCFMResponsePrompt = ai.definePrompt({
  name: 'generateFCFMResponsePrompt',
  input: {schema: GenerateFCFMResponseInputSchema},
  output: {schema: GenerateFCFMResponseOutputSchema},
  prompt: `You are a chatbot assistant for FCFM at the University of Chile. Use the following data to answer the user's question. If you cannot answer the question based on the data, say that you do not have the information. Be complete and useful, and don't be conversational.

Data: {{{data}}}

Question: {{{query}}}`,
});

const generateFCFMResponseFlow = ai.defineFlow(
  {
    name: 'generateFCFMResponseFlow',
    inputSchema: GenerateFCFMResponseInputSchema,
    outputSchema: GenerateFCFMResponseOutputSchema,
  },
  async input => {
    const {output} = await generateFCFMResponsePrompt(input);
    return output!;
  }
);
