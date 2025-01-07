import { API_URL } from "@/config/config";
import { fetchAndCatch } from "../errors/fetch-error-interceptor";
import { IUser } from "@/types/zTypes";
import { fetchWithAuth } from "../errors/fetch-with-token-interceptor";

export async function getCenterIfManager(userData: IUser): Promise<void> {

    try {
        const data = await fetchWithAuth(`${API_URL}/manager/center/${userData.user.id}`, {
            method: "GET"
        });

        localStorage.setItem("sportCenter", JSON.stringify(data));
    } catch (error) {
        throw error;
    }
}