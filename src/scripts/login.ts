import { StatusEnum } from "@/enum/HttpStatus.enum";
import { UserLogin } from "@/types/zTypes";
import { ErrorHelper, verifyError } from "./errors/error-helper";
import { API_URL } from "@/config/config";

export async function login(userData: UserLogin) {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const error = await res.json();

            if (error.error === StatusEnum.USER_DELETED) {
                throw new ErrorHelper(StatusEnum.USER_DELETED, "403");
            }
            throw new ErrorHelper(verifyError(error.message), error.status);

        }

        return res.json();
    } catch (error) {
        throw error;
    }
}