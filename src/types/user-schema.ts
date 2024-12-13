import { UserRole } from "@/enum/userRole";
import { z } from "zod";

/**Usuario proveniente del back (despues de un registro o logueo)
 */
export const UserSchema = z.object({
    
    /**No debe ser visible a simple vista
     */
    id: z.string().uuid("El uuid entregado no es de formato valido"),

    name: z.string(),

    email: z.string().email("El mail entregado no es valido"),

    /**No debe ser visible a simple vista
     */
    password: z.string(),

    profile_image: z.string().default("image.png"),

    /**Para manejar vistas y permisos
     */
    role: z.nativeEnum(UserRole),
})