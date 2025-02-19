import { z } from "zod";

const name_lenght_error = "debe ser de 3 - 50 caracteres";
const address_lenght_error = "debe ser de 5 - 120 caracteres";

/**Centro deportivo de formulario
 */
export const CenterRegisterSchema = z.object({
  name: z.string({required_error: "El nombre es obligatorio"}).min(3, name_lenght_error).max(50, name_lenght_error),

  description: z.string().max(500, "Esta descripción es demasiado larga!").optional(),

  address: z.string({required_error: "La direccion es obligatoria"}).max(120, address_lenght_error),
});
