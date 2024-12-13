import { z } from "zod";
import { mail_lenght_error, passwordSchema as PasswordSchema } from "./userRegister-schema";

export const UserLoginSchema = z.object({

    email: z.string().min(3, mail_lenght_error).max(50, mail_lenght_error).email("Debe ser un mail valido"),

    password: PasswordSchema,

})
