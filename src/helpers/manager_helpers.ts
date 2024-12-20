import { IReview } from "@/interfaces/reviews_interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Verifica que esta variable de entorno esté correctamente configurada

// Función para obtener las review de un centro deportivo específico
export async function getReview(id: string): Promise<IReview> {
  if (!API_URL) {
    throw new Error("API_URL no está configurada en las variables de entorno.");
  }

  try {
    // Hacemos la petición a la ruta de la API, pasando el id en la URL
    const res = await fetch(`${API_URL}/review/${id}`);

    // Verificamos que la respuesta sea exitosa
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    // Si la respuesta es exitosa, la convertimos a JSON
    const review: IReview = await res.json();

    // Devolvemos la revisión
    return review;
  } catch (error: unknown) {
    // Comprobamos si el error tiene la propiedad message
    if (error instanceof Error) {
      console.error("Error al obtener la revisión:", error.message);
      throw new Error(`Failed to fetch review: ${error.message}`);
    } else {
      // En caso de que el error no sea una instancia de Error, se lanza un error genérico
      console.error("Error desconocido al obtener la revisión:", error);
      throw new Error("Failed to fetch review: unknown error");
    }
  }
}
