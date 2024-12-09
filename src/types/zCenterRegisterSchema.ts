import { z } from "zod";

/**Centro deportivo de formulario
 */
export const CenterRegisterSchema = z.object({
    name: z.string(),

    address: z.string(),

    manager: z.string().uuid(),

});