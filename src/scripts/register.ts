import { API_URL } from "@/config/config";
import { StatusEnum } from "@/enum/HttpStatus.enum";
import { ErrorHelper, verifyError } from "@/scripts/errors/error-helper";
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

      if (error.error === StatusEnum.MAIL_IN_USE) {
        throw new ErrorHelper(StatusEnum.MAIL_IN_USE, "409");
      }
      throw new ErrorHelper(verifyError(error.message), error.status);
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
