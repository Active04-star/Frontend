import { ApiStatusEnum } from "@/enum/HttpStatus.enum";
import { ErrorHelper } from "./error-helper";
import { fetchAndCatch } from "./fetch-error-interceptor";

/**
 * Función para hacer fetch con autenticación, atrapa errores y convierte la respuesta a un objeto
 * en caso de que la respuesta sea correcta.
 */
export async function fetchWithAuth(url: string | URL | globalThis.Request, options: RequestInit) {
    const userSession = localStorage.getItem("userSession");
    const token = userSession ? JSON.parse(userSession).token : null;

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    if (token!) {
        try {
            const data = await fetchAndCatch(url, { ...options, headers });

            return data;
        } catch (error) {

            if(error instanceof ErrorHelper && error.message === ApiStatusEnum.TOKEN_EXPIRED) {
                window.location.href = "/api/auth/logout?from=out_session";
                localStorage.clear();
            }

            throw error;
        }

    } else {
        throw new ErrorHelper(ApiStatusEnum.NOT_ALLOWED_HERE, "403");
    }

}