import { API_URL } from "@/config/config";
import { ISportCenterList } from "@/interfaces/sport_center_list.interface";
import { fetchAndCatch } from "./errors/fetch-error-interceptor";

export async function fetchSearchCenters(): Promise<ISportCenterList> {

  // Hacemos la petición a UNA RUTA QUE EXISTA
  const response = await fetchAndCatch(`${API_URL}/sportcenter/search`, {
    method: "GET"
  });
  
  return response;
}