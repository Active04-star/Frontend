import { SubscriptionStatus } from "@/enum/SubscriptionStatus";
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

    profile_image: z.string(),

    /**Para manejar vistas y permisos
     */
    role: z.nativeEnum(UserRole),

    subscription_status: z.nativeEnum(SubscriptionStatus),

    /**Debe ser solo visible por admins si está baneado.
     */
    was_banned: z.boolean(),
})

export const UserSchemaWToken = z.object({
    token: z.string(),
    user: UserSchema
});