import { API_URL } from "@/config/config";
import { fetchWithAuth } from "../errors/fetch-with-token-interceptor";
import { ErrorHelper } from "../errors/error-helper";
import { ApiStatusEnum } from "@/enum/HttpStatus.enum";

export default async function verifyUser(): Promise<boolean> {
    const userSession = localStorage.getItem("userSession");
    
    if (userSession !== null) {
        // const token = userSession ? JSON.parse(userSession).token : null;
        try {
            await fetchWithAuth(`${API_URL}/user/verify/`, { method: "GET", });

            return true;
        } catch (error) {
            console.log(error);
            if (error instanceof ErrorHelper && error.message === ApiStatusEnum.INVALID_TOKEN) {

            } else {
                // swalNotifyUnknownError(error);
            }
            return false;
        }
    }

    return true;
}
