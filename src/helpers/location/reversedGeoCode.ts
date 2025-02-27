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


{
  "type": "FeatureCollection",
  "query": [
    -75.29295,
    43.10354
  ],
  "features": [
    {
      "id": "address.3845015374897992",
      "type": "Feature",
      "place_type": [
        "address"
      ],
      "relevance": 1,
      "properties": {
        "accuracy": "rooftop",
        "mapbox_id": "dXJuOm1ieGFkcjphZGQyNjBmMS0yNjFkLTQxMzAtYmMzYS04NjdkNTgwZDQ3ZTk"
      },
      "text": "Maple Street",
      "place_name": "8 Maple Street, New York Mills, New York 13417, United States",
      "center": [
        -75.292458,
        43.102976
      ],
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.292458,
          43.102976
        ]
      },
      "address": "8",
      "context": [
        {
          "id": "postcode.3845015374897992",
          "text": "13417"
        },
        {
          "id": "place.233703660",
          "mapbox_id": "dXJuOm1ieHBsYzpEZTRJN0E",
          "wikidata": "Q3452597",
          "text": "New York Mills"
        },
        {
          "id": "district.17491692",
          "mapbox_id": "dXJuOm1ieHBsYzpBUXJtN0E",
          "wikidata": "Q115043",
          "text": "Oneida County"
        },
        {
          "id": "region.107756",
          "mapbox_id": "dXJuOm1ieHBsYzpBYVRz",
          "wikidata": "Q1384",
          "short_code": "US-NY",
          "text": "New York"
        },
        {
          "id": "country.8940",
          "mapbox_id": "dXJuOm1ieHBsYzpJdXc",
          "wikidata": "Q30",
          "short_code": "us",
          "text": "United States"
        }
      ]
    }
  ],
  "attribution": "NOTICE: © 2025 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained."
}


{
  "type": "FeatureCollection",
  "query": [
    37.60639138804149,
    55.75011074175825
  ],
  "features": [
    {
      "id": "address.5139594177173938",
      "type": "Feature",
      "place_type": [
        "address"
      ],
      "relevance": 1,
      "properties": {
        "accuracy": "rooftop",
        "mapbox_id": "dXJuOm1ieGFkcjoxNDU5ODYwYi1mYjQ5LTQzYTAtOTIwNi01OTBjOWM1Mjg1ZmY"
      },
      "text": "Улица Знаменка",
      "place_name": "Russia, Moscow, Арбат, 119019, Улица Знаменка 8с3",
      "center": [
        37.60641,
        55.750282
      ],
      "geometry": {
        "type": "Point",
        "coordinates": [
          37.60641,
          55.750282
        ]
      },
      "address": "8с3",
      "context": [
        {
          "id": "postcode.2199234",
          "mapbox_id": "dXJuOm1ieHBsYzpJWTdD",
          "text": "119019"
        },
        {
          "id": "locality.25701058",
          "mapbox_id": "dXJuOm1ieHBsYzpBWWdxd2c",
          "wikidata": "Q626920",
          "text": "Арбат"
        },
        {
          "id": "place.558274",
          "mapbox_id": "dXJuOm1ieHBsYzpDSVRD",
          "wikidata": "Q649",
          "short_code": "RU-MOW",
          "text": "Moscow"
        },
        {
          "id": "country.8898",
          "mapbox_id": "dXJuOm1ieHBsYzpJc0k",
          "wikidata": "Q159",
          "short_code": "ru",
          "text": "Russia"
        }
      ]
    }
  ],
  "attribution": "NOTICE: © 2025 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained."
}



{
  "type": "FeatureCollection",
  "query": [
    -75.56797992927245,
    6.249270185746553
  ],
  "features": [
    {
      "id": "address.5474628049011132",
      "type": "Feature",
      "place_type": [
        "address"
      ],
      "relevance": 1,
      "properties": {
        "accuracy": "point",
        "override:postcode": "",
        "mapbox_id": "dXJuOm1ieGFkcjozZGMyNjNiYS1iNjRhLTQxMzAtOTVlZi00NmVhNzQ5MDM1OGI"
      },
      "text": "Carrera 50",
      "place_name": "Carrera 50 49-66, 050012 Medellín, Antioquia, Colombia",
      "center": [
        -75.567967,
        6.249197
      ],
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.567967,
          6.249197
        ]
      },
      "address": "49-66",
      "context": [
        {
          "id": "postcode.85554",
          "mapbox_id": "dXJuOm1ieHBsYzpBVTR5",
          "text": "050012"
        },
        {
          "id": "place.4565042",
          "mapbox_id": "dXJuOm1ieHBsYzpSYWd5",
          "wikidata": "Q48278",
          "text": "Medellín"
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