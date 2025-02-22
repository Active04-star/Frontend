import DropdownList from "@/components/general/dropdownList";
import LoadingCircle from "@/components/general/loading-circle";
import RegistrationMap from "@/components/maps/registrationMap";
import { useEffect, useState } from "react";

export default function LocationForm() {
    const initial_location = { longitude: -74.006, latitude: 40.7128, zoom: 12 };
    const [location, setLocation] = useState<{ latitude: number; longitude: number; zoom: number }>(initial_location);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCountries();
        handleGetLocation();

        return (() => setLocation(initial_location));
    }, []);

    const handleGetLocation = () => {
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

    };

    const getCountries = async () => {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/positions', {
            method: "GET",
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <>
            {
                loading ?
                    <div className="w-full h-full">
                        <LoadingCircle />
                    </div >
                    :
                    <div className="ml-12">
                        {/* <div className="ml-3">
                            <span className="text-lg text-start block">¿Donde te ubicas?</span>
                            <span className="text-sm text-start block">Dinos donde tus clientes pueden encontrar tu negocio</span>
                        </div> */}

                        {/* <div className="flex gap-1 mb-5"> */}
                        <div className="flex flex-col">
                            <span className="text-start font-medium text-lg">Pais:</span>
                            <div className="w-5/12">
                                <DropdownList
                                    label="Selecciona"
                                    replaceLabel={true}
                                    options={["1", "2"]}
                                    onSelect={(value) => console.log("Seleccionado:", value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-1 mb-5">
                            <div className="flex flex-col">
                                <span className="text-start font-medium text-lg">Estado:</span>
                                <DropdownList
                                    label="Selecciona"
                                    replaceLabel={true}
                                    options={["a", "b"]}
                                    onSelect={(value) => console.log("Seleccionado:", value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-start font-medium text-lg">Ciudad:</span>
                                <DropdownList
                                    label="Selecciona"
                                    replaceLabel={true}
                                    options={["p", "q"]}
                                    onSelect={(value) => console.log("Seleccionado:", value)}
                                />
                            </div>
                        </div>
                        {/* </div> */}

                        <div className=" w-[400px] h-[300px] overflow-hidden">
                            <RegistrationMap location={location} />
                        </div>

                    </div>
            }
        </>
    );
}