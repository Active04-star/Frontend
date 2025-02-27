import { MAPBOX_TOKEN } from "@/config/config";

export async function reverseGeocode(lng: number, lat: number) {
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&types=address,place,region,country&limit=1`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Error en la consulta: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      console.log(feature.place_name);
      console.log(data);

      return feature.place_name;
    } else {
      console.log('No se encontraron resultados para esas coordenadas.');
      return null;
    }

  } catch (error) {
    console.error('Error al obtener la dirección:', error);
    throw error;
  }
}