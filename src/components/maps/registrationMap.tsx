import { MAPBOX_TOKEN } from '@/config/config';
import { useEffect, useRef, useState } from 'react';
import Map, { MapRef } from 'react-map-gl/mapbox';
import DefMarker from './defaultMarker';
import { reverseGeocode } from '@/helpers/location/reversedGeoCode';

const RegistrationMap: React.FC<{ location: { latitude: number; longitude: number; zoom: number } }> = ({ location }) => {
    const token = MAPBOX_TOKEN;
    const map = useRef<MapRef | null>(null);

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
        map.current?.setCenter([location.longitude, location.latitude]).zoomTo(15);
        reverseGeocode(location.longitude, location.latitude);
    }, [location]);

    useEffect(() => {

        if (token === undefined) {
            console.error("Map token not found, contact to an administrator for more information");
        }
    }, []);

    const isLoaded = (loaded: boolean): void => {

    };

    return (
        <Map
            ref={map}
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={location}
            projection={{ name: "mercator" }}
            mapStyle="mapbox://styles/elvisteck046/cm6ss4uti000401pd6a6vdczr"
            onLoad={() => isLoaded(true)}
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