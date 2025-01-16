import { SportCenterStatus } from "@/enum/sportCenterStatus";
import { z } from "zod";

/**Centro deportivo proveniente del back
 */
export const SportCenterSchema = z.object({
  id: z.string().uuid(),

  name: z.string(),

  address: z.string(),

  status: z.nativeEnum(SportCenterStatus),

  latitude: z.number().nullable(),

  longitude: z.number().nullable(),
});
