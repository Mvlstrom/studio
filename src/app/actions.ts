'use server';

import { generateFCFMResponse } from '@/ai/flows/generate-fcfm-response';
import { fcfmData } from '@/lib/fcfm-data';
import { z } from 'zod';

const schema = z.object({
  query: z.string().min(1),
});

export async function getAiResponse(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return { success: false, message: 'La consulta no puede estar vacía.' };
  }
  
  const { query } = validatedFields.data;

  try {
    const response = await generateFCFMResponse({ query, data: fcfmData });
    return { success: true, message: response.response };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.' };
  }
}
