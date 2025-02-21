import { MAPBOX_TOKEN } from '@/config/config';
import { useEffect, useRef, useState } from 'react';
import Map, { MapRef, Marker } from 'react-map-gl/mapbox';
import DefMarker from './defaultMarker';

const RegistrationMap = () => {
    const token = MAPBOX_TOKEN;
    const initial_location = { longitude: -74.006, latitude: 40.7128, zoom: 12 };
    const [location, setLocation] = useState<{ latitude: number; longitude: number; zoom: number } | null>(null);
    const map = useRef<MapRef | null>(null);

    useEffect(() => {
        handleGetLocation();

        return (() => setLocation(initial_location));
    }, []);

    useEffect(() => {
        if (location !== null) {
            map.current?.setCenter([location.longitude, location.latitude]).zoomTo(15);
        }

    }, [location]);


    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        zoom: 1
                    });

                    // zoom: 15
                    //   setError(null);
                },
                (error) => {
                    //   setError('No se pudo obtener la ubicación. Asegúrate de aceptar los permisos.');
                }
            );
        } else {
            //   setError('Geolocalización no está soportada en este navegador.');
        }
    };

    // useEffect(() => {
    //   console.log(location?.toArray());

    // }, [location]);

    // let feature;

    // map.addInteraction("Click-handler", {
    //   type: "click",
    //   target: {
    //     "featuresetId": "place-labels",
    //     "importId": "basemap"
    // },
    //   handler: (e) => {
    //     if (feature) {
    //         map.setFeatureState(feature, { ["highlight"]: false });
    //       feature = null;
    //     } else {
    //       map.setFeatureState(e.feature, { ["highlight"]: true });
    //       feature = e.feature;
    //     }
    //   }
    // });

    useEffect(() => {
    }, []);

    useEffect(() => {

        if (token === undefined) {
            console.error("Map token not found, contact to an administrator for more information");
        }
    }, []);

    return (
        <Map
            ref={map}
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={initial_location}
            projection={{ name: "mercator" }}
            mapStyle="mapbox://styles/elvisteck046/cm6ss4uti000401pd6a6vdczr"
        >

            <DefMarker
                props={{
                    longitude: -74.006001,
                    latitude: 40.712801
                }}
            >
                <div>📍 New York</div>
            </DefMarker>
        </Map>
    );
};

export default RegistrationMap;