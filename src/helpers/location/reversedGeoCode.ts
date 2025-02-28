import { MAPBOX_TOKEN } from "@/config/config";

type mapBoxResponseContext = {
  id: string;
  mapbox_id?: string;
  wikidata?: string;
  short_code?: string;
  text: string;
}

export type FormatedAddress = {
  place: string;
  address: string;
}

export async function reverseGeocode(lng: number, lat: number): Promise<FormatedAddress> {
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&types=address,place,region,country&limit=1`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Error en la consulta: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const context: mapBoxResponseContext[] = data.features[0].context;
      console.log(data);

      const place_context: Array<string | undefined> = context.map((item) => {

        if (!item.id.includes("postcode.") && data.features[0].place_name.includes(item.text)) {
          return item.text;
        }

      }).reverse();

      let address: string = "";
      if (data.features[0].address) {
        address = data.features[0].address;

      }
      if (data.features[0].text) {
        address = address + " " + data.features[0].text || "";

      }

      if(data.features[0].place_type[0] === "place") {
        place_context.push(data.features[0].text);
      }

      const place: string = place_context.filter((i) => i !== undefined).join(", ");
      
      return { place, address: context.length > 2 ? address.trim() : "" };

    } else {
      throw new Error('No se encontraron resultados para esas coordenadas');

    }

  } catch (error) {
    console.error('Error al obtener la dirección:', error);
    throw error;
  }
}

const a = {
  "type": "FeatureCollection",
  "query": [
    -75.43238718770446,
    6.172333953320617
  ],
  "features": [
    {
      "id": "place.6309938",
      "type": "Feature",
      "place_type": [
        "place"
      ],
      "relevance": 1,
      "properties": {
        "mapbox_id": "dXJuOm1ieHBsYzpZRWd5",
        "wikidata": "Q1774644"
      },
      "text": "Rionegro",
      "place_name": "Rionegro, Antioquia, Colombia",
      "bbox": [
        -75.485975,
        6.057524,
        -75.322161,
        6.233823
      ],
      "center": [
        -75.37441,
        6.154003
      ],
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.37441,
          6.154003
        ]
      },
      "context": [
        {
          "id": "region.17458",
          "mapbox_id": "dXJuOm1ieHBsYzpSREk",
          "wikidata": "Q123304",
          "short_code": "CO-ANT",
          "text": "Antioquia"
        },
        {
          "id": "country.8754",
          "mapbox_id": "dXJuOm1ieHBsYzpJakk",
          "wikidata": "Q739",
          "short_code": "co",
          "text": "Colombia"
        }
      ]
    }
  ],
  "attribution": "NOTICE: © 2025 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained."
}

const b = {
  "type": "FeatureCollection",
  "query": [
    -75.37148515530022,
    6.155955891287945
  ],
  "features": [
    {
      "id": "address.6184363050680534",
      "type": "Feature",
      "place_type": [
        "address"
      ],
      "relevance": 1,
      "properties": {
        "accuracy": "point",
        "override:postcode": "",
        "mapbox_id": "dXJuOm1ieGFkcjo3YTc1YzIzYS1iZTEzLTRiZTktOTk3ZC1hYTc1YWY4MDAxMTE"
      },
      "text": "Calle 53",
      "place_name": "Calle 53 47 53, 054040 Rionegro, Antioquia, Colombia",
      "center": [
        -75.371554,
        6.155927
      ],
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.371554,
          6.155927
        ]
      },
      "address": "47 53",
      "context": [
        {
          "id": "postcode.1560114",
          "mapbox_id": "dXJuOm1ieHBsYzpGODR5",
          "text": "054040"
        },
        {
          "id": "place.6309938",
          "mapbox_id": "dXJuOm1ieHBsYzpZRWd5",
          "wikidata": "Q1774644",
          "text": "Rionegro"
        },
        {
          "id": "region.17458",
          "mapbox_id": "dXJuOm1ieHBsYzpSREk",
          "wikidata": "Q123304",
          "short_code": "CO-ANT",
          "text": "Antioquia"
        },
        {
          "id": "country.8754",
          "mapbox_id": "dXJuOm1ieHBsYzpJakk",
          "wikidata": "Q739",
          "short_code": "co",
          "text": "Colombia"
        }
      ]
    }
  ],
  "attribution": "NOTICE: © 2025 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained."
}