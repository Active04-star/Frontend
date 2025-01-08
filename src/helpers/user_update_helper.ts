import { API_URL } from "@/config/config";
import { IPasswordUpdate, IUser, IUserUpdate } from "@/types/zTypes";
import { fetchWithAuth } from "./errors/fetch-with-token-interceptor";

export async function updateUser(id: string, body: Partial<IUserUpdate & IPasswordUpdate>): Promise<Omit<IUser, "token"> | null> {
  let response = null;

  if (body.name !== undefined) {
    response = await fetchWithAuth(`${API_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: body.name }),
    });

  }

  if (body.password !== undefined && body.confirm_password !== undefined) {
    response = await fetchWithAuth(`${API_URL}/auth/update-password/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: body.password, confirm_password: body.confirm_password }),
    });
  }

  return { user: response };
}
