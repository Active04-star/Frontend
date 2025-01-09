import { z } from "zod";
import { UserRegisterSchema } from "./userRegister-schema";
import { UserSchema, UserSchemaWToken } from "./user-schema";
import { CenterRegisterSchema } from "./centerRegister-schema";
import { SportCenterSchema } from "./center-schema";
import { UserLoginSchema } from "./userLogin-schema";
import { PasswordUpdateSchema, UserUpdateSchema } from "./userUpdate-schema";
import { FieldCreationSchema } from "./field-schema";
import { FieldBlockSchema } from "./fieldBlock.type";
import { SportCenterScheduleSchema } from "./sportCenterSchedules.type";

/**Registro de Usuario de formulario, se valida con `UserRegisterSchema`
 */
export type IUserRegister = z.infer<typeof UserRegisterSchema>;

/**Usuario proveniente del back (despues de un registro o logueo), se valida con `UserSchemaWToken`
 */
export type IUser = z.infer<typeof UserSchemaWToken>;

export type IuserWithoutToken=z.infer<typeof UserSchema>

/**Centro deportivo de formulario, se valida con `CenterRegisterSchema`
 */
export type ICenterRegister = z.infer<typeof CenterRegisterSchema>;

/**Centro deportivo proveniente del back, se valida con `SportCenterSchema`
 */
export type ISportCenter = z.infer<typeof SportCenterSchema>;

/**Login de Usuario de formulario, se valida con `UserLoginSchema`
 */
export type IUserLogin = z.infer<typeof UserLoginSchema>;

/**Actualización de Usuario (nombre), se valida con `UserUpdateSchema`
 */
export type IUserUpdate = z.infer<typeof UserUpdateSchema>;

/**Actualización de contraseña, se valida con `PasswordUpdateSchema`
 */
export type IPasswordUpdate = z.infer<typeof PasswordUpdateSchema>;

/**Registro de Cancha de formulario, se valida con `FieldSchema`
 */
export type IFieldCreation = z.infer<typeof FieldCreationSchema>;

/**
 */
export type IField_Block = z.infer<typeof FieldBlockSchema>

/**
 */
export type ISportCenter_Schedule = z.infer<typeof SportCenterScheduleSchema>
