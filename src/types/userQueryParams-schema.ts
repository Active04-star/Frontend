import { z } from "zod";

export const UserQueryParamsSchema = z.object({
    page: z.coerce.number().min(1, "El numero de pagina no puede ser negativo"),
    limit: z.coerce.number().min(5, "El limite por pagina no debe ser menor a 5"),
    search: z.string().max(50).optional(),
});