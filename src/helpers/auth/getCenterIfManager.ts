import { API_URL } from "@/config/config";
import { fetchWithAuth } from "../errors/fetch-with-token-interceptor";
import { IUser } from "@/types/zTypes";
import { UserRole } from "@/enum/userRole";

export async function getCenterIfManager(user: IUser): Promise<string | undefined> {

    try {
        if (user.user.role === UserRole.MAIN_MANAGER || user.user.role === UserRole.MANAGER) {
            const data = await fetchWithAuth(`${API_URL}/manager/center/${user.user.id}`, {
                method: "GET"
            });

            localStorage.setItem("sportCenter", JSON.stringify(data));

            return data;
        }

        return;
    } catch (error) {
        throw error;
    }
}