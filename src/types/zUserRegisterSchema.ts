import { fileSchema } from "@/types/zFileSchema";
import { z } from "zod";

const mail_lenght_error = "El mail debe estar entre 3 - 50 caracteres";
const name_lenght_error = "El nombre debe estar entre 3 - 50 caracteres";

const passwordSchema = z.string()
    .min(8, "La contraseña debe ser mayor a 8 caracteres")
    .superRefine(
        (password, ctx) => {
            if (!/[a-z]/.test(password)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "una minuscula",
                });
            }

            if (!/[A-Z]/.test(password)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "una mayuscula",
                });
            }

            if (!/\d/.test(password)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "un numero",
                });
            }

            if (!/[!@#$%^&*]/.test(password)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "almenos un caracter !@#$%^&*",
                });
            }
        }
    );

export const UserRegisterSchema = z.object({

    name: z.string().min(3, name_lenght_error).max(50, name_lenght_error),

    email: z.string().min(3, mail_lenght_error).max(50, mail_lenght_error).email("Debe ser un mail valido"),

    password: passwordSchema,

    confirm_password: z.string(),

    profile_image: fileSchema.nullable(),

}).refine(
    (data) => data.password === data.confirm_password,
    {
        path: ["confirm_password"],
        message: "Las contraseñas deben coincidir",
    }
);
