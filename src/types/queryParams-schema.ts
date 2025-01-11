import { z } from "zod";

export const QueryParamsSchema = z.object({
    page: z.coerce.number().min(1, "El numero de pagina no puede ser nevativo"),
    limit: z.coerce.number().min(3, "El limite no debe ser menor a 3"),
    rating: z.coerce.number().min(0).max(5, "Rating fuera de rango").optional(),
    search: z.string().max(50).optional(),
});