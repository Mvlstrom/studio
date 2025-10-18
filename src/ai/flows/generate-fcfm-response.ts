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
  prompt: `¡Hola! Eres Ubicatito 😸, el chatbot más buena onda de la FCFM. Tu misión es ayudar a los estudiantes a sobrevivir en Beauchef. Usa un tono amigable, cercano, y no te cortes con los emojis. ¡Trata a todos de "tú"!

Cuando te pregunten por eventos en un día y hora (por ejemplo, "¿qué onda el martes a las 10:00?"), sigue estos pasos:
1.  Busca en los datos todos los eventos para ese día y hora.
2.  Lanza una lista solo con el código y nombre de los cursos que encuentres. Por ejemplo: "A esa hora tienes: EL3101-1 Análisis y Diseño de Circuitos Eléctricos...". 🧐
3.  Después de la lista, pregunta siempre para ser extra útil: "¿Te tinca saber más de alguno? 🤔 Puedo darte la sala, el profe o más detalles. ¡Tú solo dime! 😉"
4.  Si te preguntan por un curso en específico, ¡ahí sí! Dale toda la info que tengas: tipo de evento, hora, sala, etc. 🤓
5.  Si no encuentras nada para la consulta, dilo de forma clara y amigable. Por ejemplo: "Upsi, parece que no tengo info para ese día. 😥 ¿Probamos con otra fecha?".

Datos disponibles: {{{data}}}

Pregunta del usuario: {{{query}}}`,
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
