import LoadingCircle from "@/components/general/loading-circle";
import FormMap from "@/views/RegisterCenter/FormMap";
import { MapPin } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const LocationForm: React.FC<{ formName: string; useGeoLocation: Dispatch<SetStateAction<[number, number] | undefined>> }> = ({ formName, useGeoLocation }) => {
    const initial_location = { longitude: -74.006, latitude: 40.7128, zoom: 12, default: true };
    const [location, setLocation] = useState<{ latitude: number; longitude: number; zoom: number; default?: boolean }>(initial_location);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {

        return (() => setLocation(initial_location));
    }, []);

    const handleGetLocation = () => {
        setDisabled(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        zoom: 15
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

        setLoading(false);
        setDisabled(false);

    };

    return (
        <>
            {
                loading ?
                    <div className="w-full h-full">
                        <LoadingCircle />
                    </div >
                    :
                    <div className="ml-6 px-6 pt-6 bg-neutral-500 bg-opacity-15">
                        <div className="mb-3">

                            <span className="ml-3 text-lg text-start block font-medium">¿Donde se ubica tu negocio?</span>
                            <span className="text-sm text-start block max-w-full">Doble click en el mapa para agregar tu ubicacion y</span>
                            <span className="text-sm text-start block max-w-full -mt-[2px]">generar una direccion</span>
                        </div>

                        <div className="w-[400px] h-[400px] overflow-hidden">
                            <FormMap useGeoLocation={useGeoLocation} formName={formName || "Nombre de tu negocio"} location={location} />
                            {disabled &&
                                <div className="w-[400px] h-[400px] top-1 left-1 absolute z-1 bg-gray-500 cursor-wait">
                                    <LoadingCircle />
                                </div>
                            }
                        </div>

                        <div className="w-auto flex content-start">
                            <button
                                onClick={() => handleGetLocation()}
                                disabled={disabled}
                                className="ml-3 my-5 bg-gray-300 text-dark px-4 py-2 rounded disabled:cursor-not-allowed text-gray-900 flex gap-1"
                            >
                                <MapPin />
                                Mi ubicacion
                            </button>
                        </div>

                    </div>
            }
        </>
    );
};

export default LocationForm;