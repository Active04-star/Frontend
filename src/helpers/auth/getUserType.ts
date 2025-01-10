import { API_URL } from "@/config/config";
import { fetchAndCatch } from "../errors/fetch-error-interceptor";

export async function getUserType(email: string) {
    try {
        const response = await fetchAndCatch(`${API_URL}/auth/type/${email}`, { method: "GET" });

        return response
    } catch (error) {

        throw error;
    }
}