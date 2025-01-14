import { z } from "zod";

export const QueryParamsSchema = z.object({
    page: z.coerce.number().min(1, "El numero de pagina no puede ser negativo"),
    limit: z.coerce.number().min(2, "El limite por pagina no debe ser menor a 2"),
    rating: z.coerce.number().min(0, "El rating debe ser 0 o mayor").max(5, "El rating debe ser menor a 5").optional(),
    search: z.string().max(50).optional(),
});