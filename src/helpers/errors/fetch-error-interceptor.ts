import { ApiStatusEnum } from "@/enum/HttpStatus.enum";
import { ErrorHelper, verifyError } from "./error-helper";

/**
 * Función para hacer fetch, atrapa errores y convierte la respuesta a un objeto
 * en caso de que la respuesta sea correcta.
 */
export async function fetchAndCatch(url: string | URL | globalThis.Request, options: RequestInit) {

    try {
        const response = await fetch(url, { ...options });
        const data = await response.json();

        if (response.status === 401) {
            throw new ErrorHelper(ApiStatusEnum.TOKEN_EXPIRED, "401");
        } else if (!response.ok) {
            throw new ErrorHelper(verifyError(data.message), data.status);
        }

        return data;
    } catch (error) {
        throw error;
    }

}