import { z } from "zod";
import { passwordSchema } from "./userRegister-schema";

const name_lenght_error = "El nombre debe estar entre 3 - 50 caracteres";

export const UserUpdateSchema = z.object({
    name: z
    .string()
    .min(3, name_lenght_error)
    .max(50, name_lenght_error)
    .regex(
      /^[a-zA-Z\s]+$/,
      "El nombre solo puede contener letras y espacios"
    ), 

});

export const PasswordUpdateSchema = z.object({
    password: passwordSchema,

    confirm_password: z.string()
    
}).refine((data) => data.password === data.confirm_password,
    {
        path: ["confirm_password"],
        message: "Las contraseñas deben coincidir",
    });