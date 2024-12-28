import { ApiStatusEnum } from "@/enum/HttpStatus.enum";
import { ErrorHelper, verifyError } from "./error-helper";

export async function fetchAndCatch(url: string | URL | globalThis.Request, options: RequestInit) {

    const headers = {
        ...options.headers,
    };

    try {
        const response = await fetch(url, { ...options, headers });
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