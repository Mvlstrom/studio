'use server';

/**
 * @fileOverview A flow to process user queries about FCFM (Facultad de Ciencias Físicas y Matemáticas de la Universidad de Chile).
 *
 * - processUserQuery - A function that handles the processing of user queries.
 * - ProcessUserQueryInput - The input type for the processUserQuery function.
 * - ProcessUserQueryOutput - The return type for the processUserQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessUserQueryInputSchema = z.object({
  query: z.string().describe('The user query about FCFM.'),
});
export type ProcessUserQueryInput = z.infer<typeof ProcessUserQueryInputSchema>;

const ProcessUserQueryOutputSchema = z.object({
  processedQuery: z.string().describe('The processed and understood user query.'),
});
export type ProcessUserQueryOutput = z.infer<typeof ProcessUserQueryOutputSchema>;

export async function processUserQuery(input: ProcessUserQueryInput): Promise<ProcessUserQueryOutput> {
  return processUserQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processUserQueryPrompt',
  input: {schema: ProcessUserQueryInputSchema},
  output: {schema: ProcessUserQueryOutputSchema},
  prompt: `You are an AI assistant designed to understand user queries related to FCFM (Facultad de Ciencias Físicas y Matemáticas de la Universidad de Chile).

  A user has submitted the following query:
  {{query}}

  Your task is to process the query and rephrase it to ensure it is clear, concise, and accurately reflects the user's intent.
  Return the processed query in the 'processedQuery' field.
  `,
});

const processUserQueryFlow = ai.defineFlow(
  {
    name: 'processUserQueryFlow',
    inputSchema: ProcessUserQueryInputSchema,
    outputSchema: ProcessUserQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
