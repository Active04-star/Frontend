import { API_URL } from "@/config/config";
import { fetchWithAuth } from "../errors/fetch-with-token-interceptor";
import { ApiError } from "next/dist/server/api-utils";
import { swalCustomError } from "../swal/swal-custom-error";

export default async function verifyUser(): Promise<boolean> {
    const userSession = localStorage.getItem("userSession");
    const token = userSession ? JSON.parse(userSession).token : null;

    if (token) {
        try {
            await fetchWithAuth(`${API_URL}/user/verify/`, { method: "GET", });

            return true;
        } catch (error) {
            console.log(error);

            if (error instanceof ApiError) {
                await swalCustomError(error.message)
            }
            return false;
        }
    }

    return true;
}
