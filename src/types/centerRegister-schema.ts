import { z } from "zod";

const name_lenght_error = "El nombre debe ser de 3 - 50 caracteres";
const address_lenght_error = "La direccion debe ser de 5 - 120 caracteres";

/**Centro deportivo de formulario
 */
export const CenterRegisterSchema = z.object({
  name: z.string().min(3, name_lenght_error).max(50, name_lenght_error),

  address: z
    .string()
    .min(5, address_lenght_error)
    .max(120, address_lenght_error),

  latitude: z.number().optional(),
  longitude: z.number().optional(),
});
