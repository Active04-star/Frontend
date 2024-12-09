import { z } from "zod";
import { UserRegisterSchema } from "./zUserRegisterSchema";
import { UserSchema } from "./zUserSchema";
import { CenterRegisterSchema } from "./zCenterRegisterSchema";
import { SportCenterSchema } from "./zCenterSchema";

/**Usuario de formulario
 */
export type UserRegister = z.infer<typeof UserRegisterSchema>;

/**Usuario proveniente del back (despues de un registro o logueo)
 */
export type User = z.infer<typeof UserSchema>;

/**Centro deportivo de formulario
 */
export type CenterRegister = z.infer<typeof CenterRegisterSchema>;

/**Centro deportivo proveniente del back
 */
export type SportCenter = z.infer<typeof SportCenterSchema>;