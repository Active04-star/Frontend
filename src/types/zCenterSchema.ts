import { SportCenterStatus } from "@/enum/sportCenterStatus.enum";
import { z } from "zod";

/**Centro deportivo proveniente del back
 */
export const SportCenterSchema = z.object({
    id: z.string().uuid(),

    name: z.string(),

    address: z.string(),

    status: z.nativeEnum(SportCenterStatus),

});