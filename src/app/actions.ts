'use server';

import { generateFCFMResponse } from '@/ai/flows/generate-fcfm-response';
import { fcfmData as defaultData } from '@/lib/fcfm-data';
import { z } from 'zod';

const schema = z.object({
  query: z.string().min(1),
});

// This is a mutable variable to hold the data.
// In a real application, this would be a database.
let accumulatedData = [{ type: 'default', content: defaultData, name: 'Información Base' }];

export async function getAiResponse(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return { success: false, message: 'La consulta no puede estar vacía.' };
  }
  
  const { query } = validatedFields.data;

  try {
    const dataForPrompt = accumulatedData.map(d => {
        if (d.type === 'file') {
            return `--- Contenido del archivo subido: ${d.name} ---\n${d.content}`;
        }
        return d.content;
    }).join('\n\n');

    // The AI response now uses the potentially updated 'currentData'.
    const response = await generateFCFMResponse({ query, data: dataForPrompt });
    return { success: true, message: response.response };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.' };
  }
}

/**
 * Server Action to update the data used by the chatbot.
 * This is a temporary solution for local development.
 * @param newData The new data string to use.
 */
export async function updateData(newData: { content: string, name: string, instructions: string }) {
  if (typeof newData.content === 'string') {
    const fileData = `Instrucciones para este archivo: ${newData.instructions || 'Sin instrucciones'}\n${newData.content}`;
    accumulatedData.push({ type: 'file', content: fileData, name: newData.name });
    return { success: true, message: 'Datos actualizados correctamente.' };
  }
  return { success: false, message: 'Formato de datos inválido.' };
}
