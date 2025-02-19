/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatErrors, FormErrors } from "./errors/zod-error-normalizator";

/** Metodo para verificacion de errores de formulario, errores sujetos a constraints en los schemas
 * En caso de contener un error, devuelve un objeto con un array de errores para cada campo
 * 
 * @param data Objeto para verificar
 * @param schema zSchema (usualmente de registro, encontrados en la carpeta "types")
 * @returns 
 */
export function zodValidate<T>(data: unknown, schema: any) {
    const result = schema.safeParse(data);
    // type asd = T;
    if (!result.success) {
        const errors: FormErrors<T> = result.error.format();
        return { success: false, errors: formatErrors(errors) };
    }

    return { success: true, data: result.data as T, errors: null };
}