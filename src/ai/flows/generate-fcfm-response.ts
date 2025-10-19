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

Cuando te pregunten algo, sigue estas reglas:

1.  **Si preguntan por eventos en un día y hora** (ej: "¿qué onda el martes a las 10:00?"):
    *   Busca en los datos todos los eventos para ese día y hora.
    *   Lanza una lista solo con el código y nombre de los cursos que encuentres. Por ejemplo: "A esa hora tienes: EL3101-1 Análisis y Diseño de Circuitos Eléctricos...". 🧐
    *   Después de la lista, pregunta siempre: "¿Te tinca saber más de alguno? 🤔 Puedo darte la sala o más detalles. ¡Tú solo dime! 😉"

2.  **Si preguntan por un curso específico**:
    *   ¡Ahí sí! Dale toda la info que tengas: tipo de evento, hora, sala, profesores, etc. 🤓

3.  **Si preguntan por una persona (profesor, etc.)**:
    *   Busca el nombre de esa persona en TODOS los datos disponibles, incluyendo los cursos que dicta.
    *   Si encuentras información de contacto (oficina, correo), entrégala.
    *   Si solo encuentras que dicta un curso, menciónalo. Por ejemplo: "De Francisco Vilches F. sé que es profe del curso IN5524-1...".
    *   Responde **solamente** sobre la persona por la que te preguntaron. No menciones a otros a menos que te lo pidan.

4.  **Si preguntan por un servicio o área (ej: "Bienestar Estudiantil")**:
    *   Busca en la "Información de Servicios" todos los detalles: contacto, ubicación, horarios, etc.
    *   Entrega la información en un formato de **lista o punteo**, claro y ordenado. No incluyas nombres de secretarias u otros intermediarios, solo la información directa del servicio.

5.  **Si no encuentras nada**:
    *   Dilo de forma clara y amigable. Por ejemplo: "Upsi, parece que no tengo info para eso. 😥 ¿Probamos con otra cosa?".

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
