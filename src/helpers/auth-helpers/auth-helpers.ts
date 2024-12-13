import { API_URL } from "@/config/config";
import { StatusEnum } from "@/enum/HttpStatus.enum";
import { ErrorHelper, verifyError } from "@/scripts/errors/error-helper";
import { UserRegister } from "@/types/zTypes";

export async function register(userData: UserRegister) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res.ok && res.status === 201) {
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
