"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ICenterRegister, IUser } from "@/types/zTypes";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { API_URL, MAPBOX_TOKEN } from "@/config/config";
import { CenterRegisterSchema } from "@/types/centerRegister-schema";
import { z } from "zod";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifyUnknownError } from "@/helpers/swal/swal-notify-unknown-error";
import BotonVolver from "@/components/back-button/back-button";
import { ModalInformacion } from "@/components/modal/modal.component";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { getCenterIfManager } from "@/helpers/auth/getCenterIfManager";
import RegistrationMap from "@/components/maps/registrationMap";
import LoadingCircle from "@/components/general/loading-circle";

type FormErrors<T> = { [K in keyof T]?: string[] };

export default function RegisterSportcenter() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter(); // Hook para redirigir
  const [userLocalStorage] = useLocalStorage<IUser | null>("userSession", null);
  const [hide, setHide] = useState(true);
  const [sportCenter, setSportCenter] = useState<ICenterRegister>({
    name: "",
    address: "",
    latitude: undefined,
    longitude: undefined
  });
  const [errors, setErrors] = useState<FormErrors<ICenterRegister>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState<number>(0);


  useEffect(() => {
    setIsLoaded(true);
    return (() => setIsLoaded(false));
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? (value ? parseFloat(value) : undefined) : value;
    setSportCenter(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors: FormErrors<ICenterRegister> = {};

    if (!sportCenter.name) {
      validationErrors.name = ["El nombre del complejo es obligatorio."];
    }

    if (!sportCenter.address) {
      validationErrors.address = ["La dirección es obligatoria."];
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      if (userLocalStorage !== null) {
        const validatedData = CenterRegisterSchema.parse(sportCenter);
        console.log("Form data is valid:", validatedData);
        const new_sportcenter = {
          ...sportCenter,
          manager: userLocalStorage.user.id,
        };

        const response: IUser = await fetchWithAuth(
          `${API_URL}/sportcenter/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(new_sportcenter),
          }
        );

        const { token, user } = response;

        localStorage.setItem("userSession", JSON.stringify({ token, user }))

        await getCenterIfManager(response);

        swalNotifySuccess(
          "Creacion exitosa",
          "seras redirigido a panel de manager"
        );

        setTimeout(() => {
          router.push("/manager");
        }, 1000);


      } else {
        swalCustomError("error,necesitar iniciar sesion");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as FormErrors<ICenterRegister>);
      }
      if (error instanceof ErrorHelper) {
        swalNotifyError(error);
      } else {
        swalNotifyUnknownError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!userLocalStorage) {
        setHide(true);
        window.location.href = "/login?from=business";
      } else {
        setHide(false);
      }
    }

  }, [userLocalStorage]);

  return (
    <>
      {hide ? null : (

        <div style={{ paddingTop: `${navbarHeight + 16}px` }}>

          {isModalOpen && <ModalInformacion closeModal={closeModal} />}
          <BotonVolver />

          <div className="min-h-screen flex flex-col items-center justify-center bg-custom-dark text-center">
            {isSubmitting ? (
              <LoadingCircle />
            ) : (
              <>
                <h1 className="text-4xl font-bold text-white mb-8">
                  Tu Complejo deportivo
                </h1>
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                  <div className="mb-6">
                    <label
                      className="block text-white mb-2 text-center font-medium text-lg"
                      htmlFor="name"
                    >
                      Nombre del Complejo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={sportCenter.name}
                      onChange={handleChange}
                      placeholder="Ej: Cafetería Central"
                      className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name[0]}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-white mb-2 text-center font-medium text-lg"
                      htmlFor="address"
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={sportCenter.address}
                      onChange={handleChange}
                      placeholder="Ej: Calle Principal 123"
                      className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address[0]}
                      </p>
                    )}
                  </div>

                  <div className="w-full h-[400px]">
                    <RegistrationMap />
                    {/* <div>
                      <label
                        className="block text-white mb-2 text-center font-medium text-lg"
                        htmlFor="latitude"
                      >
                        Latitud
                      </label>
                      <input
                        type="number"
                        step="any"
                        id="latitude"
                        name="latitude"
                        value={sportCenter.latitude || ''}
                        onChange={handleChange}
                        placeholder="Ej: -34.603722"
                        className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                      />
                      {errors.latitude && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.latitude[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-white mb-2 text-center font-medium text-lg"
                        htmlFor="longitude"
                      >
                        Longitud
                      </label>
                      <input
                        type="number"
                        step="any"
                        id="longitude"
                        name="longitude"
                        value={sportCenter.longitude || ''}
                        onChange={handleChange}
                        placeholder="Ej: -58.381592"
                        className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                      />
                      {errors.longitude && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.longitude[0]}
                        </p>
                      )}
                    </div> */}
                  </div>


                  <div className="w-auto flex justify-around">
                    <button
                      type="submit"
                      className="mt-5 bg-yellow-600 text-dark px-4 py-2 rounded hover:bg-yellow-700"
                      disabled={isSubmitting || Object.keys(errors).length > 0}
                    >
                      Registrar
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

      )}
    </>
  );
}
