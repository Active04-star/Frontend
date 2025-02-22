import { API_URL } from "@/config/config";
import { ApiStatusEnum } from "@/enum/HttpStatus.enum";
import { ErrorHelper, verifyError } from "@/helpers/errors/error-helper";
import { IUserRegister } from "@/types/zTypes";

export async function register(userData: IUserRegister) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const error = await res.json();

      if (error.error === ApiStatusEnum.MAIL_IN_USE) {
        throw new ErrorHelper(ApiStatusEnum.MAIL_IN_USE, "409");
      }
      throw new ErrorHelper(verifyError(error.message), error.status);
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
