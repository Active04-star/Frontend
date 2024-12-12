import { z } from "zod";

const maxSize = 5 * 1024 * 1024;

export const fileSchema = z.object({
    name: z.string(),
    
    file: z.custom<File>((file) => {
        const validTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
        return validTypes.includes(file.type) && file.size <= maxSize;
    }, {
        message: "Debe ser un archivo de imagen válido (jpeg, png, gif, jpg)",
    }),
});