import { z } from "zod";

/**Cancha de Formulario
 */
export const FieldCreationSchema = z.object({
  number: z
    .number()
    .min(0, "El numero de la cancha debe estar entre 0 - 1000")
    .max(1000, "El numero de la cancha debe estar entre 0 - 1000"),

  price: z
    .string()
    .regex(/^(?:\d{1,10}(\.\d{1,2})?)$/, "El precio debe ser decimal valido")
    .refine(
      (value) => (value.match(/\./g) || []).length <= 1,
      "El precio debe contener solo un punto decimal."
    ),

  duration_minutes: z
    .number()
    .int("La duración debe ser un número entero")
    .min(15, "La duración mínima es de 15 minutos")
    .max(1440, "La duración máxima es de 24 horas (1440 minutos)")
    .optional(),

});
