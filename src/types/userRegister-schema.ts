import { fileSchema } from "@/types/file-schema";
import { z } from "zod";

export const mail_lenght_error = "El mail debe estar entre 3 - 50 caracteres";
const name_lenght_error = "El nombre debe estar entre 3 - 50 caracteres";

export const passwordSchema = z.string()
    .min(8, "Debe ser mayor a 8 caracteres")
    .superRefine(
        (password, ctx) => {
            const errors = [];
            if (!/[a-z]/.test(password)) {
                errors.push("una minuscula");
            }

            if (!/[A-Z]/.test(password)) {
                errors.push("una mayuscula");
            }

            if (!/\d/.test(password)) {
                errors.push("un numero");
            }

            if (!/[!@#$%^&*]/.test(password)) {
                errors.push("almenos un caracter Especial !@#$%^&*");
            }

            if(errors.length === 0) {
                return;
            }

            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: errors.length > 0 ? "Debe contener " + errors.join(", ") : ""
            })
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
