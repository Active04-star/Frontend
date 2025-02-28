import { MAPBOX_TOKEN } from '@/config/config';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Map, { MapEvent, MapInstance, MapMouseEvent, MapRef, MapWheelEvent, ViewStateChangeEvent } from 'react-map-gl/mapbox';
import GeocoderControl from '../../components/maps/geocoderControl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import DefaultMarker from '../../components/maps/defaultMarker';
import { LandPlot, MailOpen } from 'lucide-react';
import { CSSProperties } from "react";

const FormMap: React.FC<{ location: { latitude: number; longitude: number; zoom: number; default?: boolean }, formName: string, useGeoLocation: Dispatch<SetStateAction<[number, number] | undefined>> }> = ({ location, formName, useGeoLocation }) => {
    const token = MAPBOX_TOKEN;
    const map = useRef<MapRef | null>(null);
    const [_map, setMap] = useState<MapInstance | undefined>(undefined);
    const [mouse, setMouse] = useState<CSSProperties["cursor"]>("pointer");
    const [_location, _setLocation] = useState<{ latitude: number; longitude: number; } | undefined>(undefined);
    const [searching, setSearching] = useState<boolean>(false);

    useEffect(() => {
        if (!location.default || location.default === undefined) {
            setSearching(true);
            setMouse("not-allowed");

            map.current?.flyTo({ center: [location.longitude, location.latitude], zoom: 15, curve: 1 });
            _setLocation({ latitude: location.latitude, longitude: location.longitude });

        }

        return () => {
            _setLocation(undefined);
        };
    }, [location]);

    useEffect(() => {
        if (_location !== undefined) {
            setSearching(true);
            setMouse("not-allowed");

            UsedGeoLocation(_location.latitude, _location.longitude);
        }
    }, [_location]);

    useEffect(() => {
        if (token === undefined) {
            console.error("Map token not found, contact an administrator for more information");
        }

        setMap(map.current?.getMap() || undefined);
    }, []);

    const UsedGeoLocation = (latitude: number, longitude: number) => {
        useGeoLocation([latitude, longitude]);
    };

    const putMarker = (e: MapMouseEvent) => {
        e.preventDefault();
        _setLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
    };

    const enableInteractivity = (e: MapEvent) => {
        if (e.type === "idle") {
            setSearching(false);
            setMouse("pointer");
        }
    };

    return (
        <Map
            ref={map}
            style={{ cursor: mouse || "pointer" }}
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={location}
            projection={{ name: "mercator" }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            onDblClick={(e) => putMarker(e)}
            dragPan={!searching}
            scrollZoom={!searching}
            interactive={!searching}
            onDragStart={() => setMouse("grab")}
            onDragEnd={() => setMouse("pointer")}
            onIdle={(e) => enableInteractivity(e)}
        >
            <GeocoderControl setLocation={_setLocation} map={_map} mapboxAccessToken={MAPBOX_TOKEN || "null"} position={"top-left"} />
            {_location !== undefined ?
                <DefaultMarker props={{ ..._location }}>
                    <div className='absolute -bottom-full -m-1 -right-6'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="55"
                            height="55"
                            fill="#ef4444"
                            stroke="#dc2626"
                            strokeWidth="0.7"
                        >
                            <path
                                d="M12 2C8.134 2 5 5.134 5 9c0 4.906 5.915 10.906 6.168 11.168a1 1 0 0 0 1.664 0C13.085 19.906 19 13.906 19 9c0-3.866-3.134-7-7-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                            />

                            <circle cx="12" cy="9" r="3" stroke='#ef4444' fill="#ef4444" />

                            <foreignObject x="0" y="3" width="12" height="12" className='w-full'>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                                    <LandPlot className='w-3/4 h-3/4' />
                                </div>
                            </foreignObject>
                        </svg>
                        <div className='-top-2/3 left-1/3 absolute w-fit bg-red-500 rounded-lg py-1 px-2 flex'>
                            <div className='ml-1 whitespace-nowrap content-center truncate max-w-52 font-semibold'>
                                {formName}
                            </div>
                        </div>

                    </div>
                </DefaultMarker>
                :
                null
            }
        </Map >
    );
};

export default FormMap;