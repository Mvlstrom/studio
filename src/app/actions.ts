'use server';

import { generateFCFMResponse } from '@/ai/flows/generate-fcfm-response';
import { processUserQuery } from '@/ai/flows/process-user-query';
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
    // Step 1: Process the user's query to understand the intent.
    const processedQueryResponse = await processUserQuery({ query });
    const processedQuery = processedQueryResponse.processedQuery;

    const dataForPrompt = accumulatedData.map(d => {
        if (d.type === 'file') {
            return `--- Contenido del archivo subido: ${d.name} ---\n${d.content}`;
        }
        return d.content;
    }).join('\n\n');

    // Step 2: Generate the response using the processed query.
    const response = await generateFCFMResponse({ query: processedQuery, data: dataForPrompt });
    return { success: true, message: response.response };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.' };
  }
}
