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
                    <div className="w-52 h-52">
                        <LoadingCircle />
                    </div >
                    :
                    <div className="ml-6 px-6 pt-2 bg-neutral-500 bg-opacity-0">
                        <div className="mb-3 flex justify-between">
                            <span className="ml-3 text-lg text-start h-fit my-auto">¿Donde te encuentras?</span>
                            <button
                                onClick={() => handleGetLocation()}
                                disabled={disabled}
                                className="bg-gray-300 text-dark px-4 py-2 rounded disabled:cursor-not-allowed text-gray-900 flex gap-1"
                            >
                                <MapPin />
                                Mi ubicacion
                            </button>
                            {/* <span className="text-sm text-start block w-[70%]">Doble click en el mapa para agregar tu ubicacion y generar una direccion</span> */}
                        </div>

                        <div className="w-[400px] h-[400px] overflow-hidden rounded-full">
                            <FormMap useGeoLocation={useGeoLocation} formName={formName || "Nombre de tu negocio"} location={location} />

                        </div>

                        <div className="w-auto flex content-start">

                        </div>

                    </div>
            }
        </>
    );
};

export default LocationForm;