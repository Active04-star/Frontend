import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { ControlPosition, MapInstance, MapRef, Marker, MarkerProps, useControl } from "react-map-gl/mapbox";
import MapboxGeocoder, { GeocoderOptions } from '@mapbox/mapbox-gl-geocoder';
import DefaultMarker from "./defaultMarker";

type GeocoderControlProps = Omit<GeocoderOptions, 'accessToken' | 'mapboxgl' | 'marker'> & {
    mapboxAccessToken: string;
    marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>;

    map?: MapInstance;
    my_bussines?: string;
    position: ControlPosition;
    setLocation: Dispatch<SetStateAction<{
        latitude: number;
        longitude: number;
    } | undefined>>;

    onLoading?: (e: object) => void;
    onResults?: (e: object) => void;
    onResult?: (e: object) => void;
    onError?: (e: object) => void;
};

function GeocoderControl(props: GeocoderControlProps) {
    const [marker, setMarker] = useState<ReactElement<any, any> | null>(null);

    const geocoder = useControl<MapboxGeocoder>(() => {

        const ctrl = new MapboxGeocoder({
            ...props,
            marker: false,
            accessToken: props.mapboxAccessToken
        });

        if (props.onLoading !== undefined) {
            ctrl.on('loading', props.onLoading);
        }
        if (props.onResults !== undefined) {
            ctrl.on('results', props.onResults);
        }
        if (props.onError !== undefined) {
            ctrl.on('error', props.onError);
        }

        ctrl.on('result', evt => {
            const { result } = evt;
            const location = result && (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));

            if (location) {
                props.setLocation({ longitude: location[0], latitude: location[1] })
            } else {
                setMarker(null);
            }

        });

        if (props.map !== undefined) {
            ctrl.onAdd(props.map);
        }

        return ctrl;
    },
        {
            position: props.position
        }
    );

    if (geocoder._inputEl) {
        if (geocoder.getProximity() !== props.proximity && props.proximity !== undefined) {
            geocoder.setProximity(props.proximity);
        }
        if (geocoder.getRenderFunction() !== props.render && props.render !== undefined) {
            geocoder.setRenderFunction(props.render);
        }
        if (geocoder.getLanguage() !== props.language && props.language !== undefined) {
            geocoder.setLanguage(props.language);
        }
        if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
            geocoder.setZoom(props.zoom);
        }
        if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
            geocoder.setFlyTo(props.flyTo);
        }
        if (geocoder.getPlaceholder() !== props.placeholder && props.placeholder !== undefined) {
            geocoder.setPlaceholder(props.placeholder);
        }
        if (geocoder.getCountries() !== props.countries && props.countries !== undefined) {
            geocoder.setCountries(props.countries);
        }
        if (geocoder.getTypes() !== props.types && props.types !== undefined) {
            geocoder.setTypes(props.types);
        }
        if (geocoder.getMinLength() !== props.minLength && props.minLength !== undefined) {
            geocoder.setMinLength(props.minLength);
        }
        if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
            geocoder.setLimit(props.limit);
        }
        if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
            geocoder.setFilter(props.filter);
        }
        if (geocoder.getOrigin() !== props.origin && props.origin !== undefined) {
            geocoder.setOrigin(props.origin);
        }
    }

    // return marker;
    return (<div></div>)

}

export default GeocoderControl;