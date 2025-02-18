import { MAPBOX_TOKEN } from '@/config/config';
import { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import DefMarker from './defaultMarker';

const RegistrationMap = () => {
    const token = MAPBOX_TOKEN;

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
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={{
                longitude: -74.006,
                latitude: 40.7128,
                zoom: 12
            }}
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