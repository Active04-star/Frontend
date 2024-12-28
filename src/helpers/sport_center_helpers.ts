import { API_URL } from "@/config/config";
import { ISportCenterList } from "@/interfaces/sport_center_list.interface";
import { fetchAndCatch } from "./errors/fetch-error-interceptor";

export async function fetchSearchCenters(): Promise<ISportCenterList> {

  // Hacemos la petición a UNA RUTA QUE EXISTA
  const response = await fetchAndCatch(`${API_URL}/sportcenter/search`, {
    method: "GET"
  });

  console.log(response);

  return response;

}

export async function fetchCenterById(id: string): Promise<void> {
  try {
    // const sportCenter = sportCenters.find((item) => item.id === id);

    // Si no encontramos el Sport Center, lanzamos un error
    // if (!sportCenter) {
    // throw new Error(`Sport Center with ID ${id} not found`);
    // }

    // Devolvemos el Sport Center encontrado
    // return sportCenter;
  } catch (error: unknown) {
    // Verificamos que el error sea una instancia de Error
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Sport Center by ID: ${error.message}`);
    }
    // Si el error no es del tipo esperado, lanzamos un error genérico
    throw new Error("Failed to fetch Sport Center by ID: Unknown error");
  }
}
