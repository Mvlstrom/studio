'use server';

import { generateFCFMResponse } from '@/ai/flows/generate-fcfm-response';
import { fcfmData as defaultData } from '@/lib/fcfm-data';
import { z } from 'zod';

const schema = z.object({
  query: z.string().min(1),
});

// This is a mutable variable to hold the data.
// In a real application, this would be a database.
let accumulatedData = [defaultData];

export async function getAiResponse(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return { success: false, message: 'La consulta no puede estar vacía.' };
  }
  
  const { query } = validatedFields.data;

  try {
    // The AI response now uses the potentially updated 'currentData'.
    const response = await generateFCFMResponse({ query, data: accumulatedData.join('\n\n') });
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
export async function updateData(newData: string) {
  if (typeof newData === 'string') {
    accumulatedData.push(newData);
    return { success: true, message: 'Datos actualizados correctamente.' };
  }
  return { success: false, message: 'Formato de datos inválido.' };
}
