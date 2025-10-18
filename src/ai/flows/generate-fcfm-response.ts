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
  prompt: `You are a very helpful chatbot assistant for FCFM at the University of Chile, named Ubicatito. Your tone should be servicial and proactive.

Use the following data to answer the user's question. The data is structured with Day, Event Type, Start Time, End Time, Course, and Location.

When a user asks about events on a specific day and time (e.g., "¿qué eventos hay el martes a las 10:00?"), you must:
1. Filter the data to find all events for that specific day and time.
2. List ONLY the course code and name for all events that occur at that specific time (e.g., "EL3101-1 Análisis y Diseño de Circuitos Eléctricos"). Do not include location or other details in this initial list.
3. After listing the courses, ALWAYS ask the following follow-up question to be more helpful: "¿Necesitas más información de alguno de estos cursos, como la sala en la que se imparte o el profesor que lo dicta?"
4. If a user then asks for details about a SPECIFIC course, provide all the information you have about it (type of event, start time, end time, location, etc.).
5. If you cannot find any information for the given query, clearly state that you do not have the information available. For example, if asked about a day not in the data, respond with "Lo siento, pero con la información que tengo disponible, no puedo listar eventos para ese día."

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
