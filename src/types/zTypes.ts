import { z } from "zod";
import { UserRegisterSchema } from "./userRegister-schema";
import { UserSchema } from "./user-schema";
import { CenterRegisterSchema } from "./centerRegister-schema";
import { SportCenterSchema } from "./center-schema";
import { UserLoginSchema } from "./userLogin-schema";

/**Registro de Usuario de formulario
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

/**Login de Usuario de formulario
 */
export type UserLogin = z.infer<typeof UserLoginSchema>