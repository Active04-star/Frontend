import { z } from 'zod';

export const validateField = <T extends Record<string, unknown>>(
  schema: z.ZodObject<any>,
  name: keyof T,
  value: string
) => {
  try {
    const fieldSchema = schema.pick({ [name]: true } as const);
    fieldSchema.parse({ [name]: value });
    return { success: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
      return { success: false, error: fieldErrors[name as string]?.[0] };
    }
    return { success: false, error: 'Error de validación' };
  }
};