import { API_URL } from "@/config/config";
import { fetchAndCatch } from "../errors/fetch-error-interceptor";
import { IUser } from "@/types/zTypes";

export async function getCenterIfManager(userData: IUser): Promise<void> {
    const {user,token}=userData
        try {
            const data = await fetchAndCatch(`${API_URL}/manager/center/${user.id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
                }
            });

            localStorage.setItem("sportCenter", JSON.stringify(data));
        } catch (error) {
            throw error;
        }
}