import { ISportCenter } from "@/interfaces/SportCenter_Interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Verifica que esta variable de entorno esté correctamente configurada

// Función para obtener todos los Sport Centers
export async function getSportCentersDB(): Promise<ISportCenter[]> {
  try {
    // Hacemos la petición a la ruta de la API que nos diste
    const res = await fetch(`${API_URL}/sportcenter/all`);

    // Verificamos que la respuesta sea exitosa
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    // Si la respuesta es exitosa, la convertimos a JSON
    const sportCenters: ISportCenter[] = await res.json();

    // Devolvemos los datos
    return sportCenters;
  } catch (error: unknown) {
    // Verificamos que el error sea una instancia de Error
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Sport Centers: ${error.message}`);
    }
    // Si el error no es del tipo esperado, lanzamos un error genérico
    throw new Error("Failed to fetch Sport Centers: Unknown error");
  }
}

// Función para obtener un Sport Center por su ID
export async function getSportCentersById(id: string): Promise<ISportCenter> {
  try {
    // Llamamos a la función que obtiene todos los Sport Centers
    const sportCenters = await getSportCentersDB();

    // Buscamos el Sport Center que coincida con el ID
    const sportCenter = sportCenters.find((item) => item.id === id);

    // Si no encontramos el Sport Center, lanzamos un error
    if (!sportCenter) {
      throw new Error(`Sport Center with ID ${id} not found`);
    }

    // Devolvemos el Sport Center encontrado
    return sportCenter;
  } catch (error: unknown) {
    // Verificamos que el error sea una instancia de Error
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Sport Center by ID: ${error.message}`);
    }
    // Si el error no es del tipo esperado, lanzamos un error genérico
    throw new Error("Failed to fetch Sport Center by ID: Unknown error");
  }
}
