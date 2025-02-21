import { z } from "zod";

const name_lenght_error = "El nombre debe estar entre 3 y 50 caracteres";
const address_lenght_error = "La direccion debe estar entre 5 y 120 caracteres";

/**Centro deportivo de formulario
 */
export const CenterRegisterSchema = z.object({
  name: z.string({ message: "El nombre es obligatorio" })
    .min(3, name_lenght_error)
    .max(50, name_lenght_error)
    .regex(/^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ '&.,()-]+$/, "El nombre solo debe contener caracteres Alfanumericos, ñ &'()-, tildes, puntos o comas"),

  description: z.string().max(500, "Esta descripción es demasiado larga!").optional(),

  address: z.string({ message: "La direccion es obligatoria" })
    .min(5, address_lenght_error)
    .max(120, address_lenght_error),
});
