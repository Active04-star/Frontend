import { z } from "zod";
import { UserRegisterSchema } from "./userRegister-schema";
import { UserSchemaWToken } from "./user-schema";
import { CenterRegisterSchema } from "./centerRegister-schema";
import { SportCenterSchema } from "./center-schema";
import { UserLoginSchema } from "./userLogin-schema";

/**Registro de Usuario de formulario, se valida con `UserRegisterSchema`
 */
export type IUserRegister = z.infer<typeof UserRegisterSchema>;

/**Usuario proveniente del back (despues de un registro o logueo), se valida con `UserSchemaWToken`
 */
export type IUser = z.infer<typeof UserSchemaWToken>;

/**Centro deportivo de formulario, se valida con `CenterRegisterSchema`
 */
export type ICenterRegister = z.infer<typeof CenterRegisterSchema>;

/**Centro deportivo proveniente del back, se valida con `SportCenterSchema`
 */
export type ISportCenter = z.infer<typeof SportCenterSchema>;

/**Login de Usuario de formulario, se valida con `UserLoginSchema`
 */
export type IUserLogin = z.infer<typeof UserLoginSchema>