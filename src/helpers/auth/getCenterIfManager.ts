import { API_URL } from "@/config/config";
import { fetchAndCatch } from "../errors/fetch-error-interceptor";
import { UserRole } from "@/enum/userRole";

export async function getCenterIfManager(user: any): Promise<void> {
    if (user.role === UserRole.MANAGER || user.role === UserRole.MAIN_MANAGER) {

        try {
            const data = await fetchAndCatch(`${API_URL}/user/center/${user.id}`, {
                method: "GET"
            });

            localStorage.setItem("sportCenter", JSON.stringify(data.id));
        } catch (error) {
            throw error;
        }
    } else {
        return;
    }
}