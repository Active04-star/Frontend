"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ICenterRegister, IUser } from "@/types/zTypes";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { API_URL, MAPBOX_TOKEN } from "@/config/config";
import { CenterRegisterSchema } from "@/types/centerRegister-schema";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifyUnknownError } from "@/helpers/swal/swal-notify-unknown-error";
import BackButton from "@/components/general/back-button";
import { RegisterCenterModal } from "@/views/RegisterCenter/InfoModal";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { getCenterIfManager } from "@/helpers/auth/getCenterIfManager";
import LoadingCircle from "@/components/general/loading-circle";
import { useError } from "@/helpers/errors/zod-error-normalizator";
import { zodValidate } from "@/helpers/validate-zod";
import ErrorSpan from "@/components/general/error-form-span";
import LocationForm from "./LocationForm";
import { reverseGeocode } from "@/helpers/location/reversedGeoCode";
import { Check, CircleCheckBig, CircleX, RefreshCcw } from "lucide-react";

export default function RegisterCenter() {
  const initial = {
    name: "",
    address: "",
    description: "",
    place: "",
  }
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();
  const [user] = useLocalStorage<IUser | null>("userSession", null);
  const [hide, setHide] = useState(true);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [_useGeoLocation, setUseGeoLocation] = useState<[number, number] | undefined>(undefined);
  const [wasLocated, setWasLocated] = useState<boolean>(false);

  const [sportCenter, setSportCenter] = useState<ICenterRegister>(initial);
  const [errors, setErrors] = useError<ICenterRegister | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const data = zodValidate<ICenterRegister>(sportCenter, CenterRegisterSchema);

    if (!data.success) {
      setErrors(data.errors);
    } else {
      setErrors(null);
    }
  }, [sportCenter]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const searchDirection = async () => {
    if (_useGeoLocation === undefined)
      return;

    setIsLocating(true);
    const direction = await reverseGeocode(_useGeoLocation[1], _useGeoLocation[0]);

    setSportCenter(prev => ({ ...prev, ...direction }));
    setWasLocated(true);
    setIsLocating(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isSubmitting) return;
    const { name, value } = e.target;

    if (value !== "" || value !== undefined) {

      const data = zodValidate<ICenterRegister>(sportCenter, CenterRegisterSchema);

      if (!data.success) {
        setErrors(data.errors);
      } else {
        setErrors(null);
      }
      if (descriptionRef.current !== null && name === "description") {
        const newHeight = descriptionRef.current.scrollHeight;

        e.target.style.height = "auto";
        e.target.style.height = `${Math.min(newHeight, 120)}px`;
        descriptionRef.current.style.height = "auto";
        descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;

        if (value.length > 500) {
          setDisabled(true);
          return;
        } else if (e.target.value.length === 0) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }

      }

    } else {
      setDisabled(true);
    }

    setSportCenter(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (Object.values(sportCenter).find((data) => data === "") === "") {
      swalCustomError("Error", "Los campos están vacios.");

      setIsSubmitting(false);
      return;
    }

    const data = zodValidate<ICenterRegister>(sportCenter, CenterRegisterSchema);

    if (!data.success) {
      swalCustomError("Error", "Por favor corrige los errores antes de continuar.");

      setIsSubmitting(false);
      return;
    }

    try {

      if (user !== null) {

        const new_sportcenter = {
          ...sportCenter,
          manager: user.user.id,
        };

        const response: IUser = await fetchWithAuth(`${API_URL}/sportcenter/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(new_sportcenter),
        });

        const { token, user: user_ } = response;

        localStorage.removeItem("userSession");
        localStorage.setItem("userSession", JSON.stringify({ token, user: user_ }))

        await getCenterIfManager(response);

        swalNotifySuccess("Creacion exitosa", "seras redirigido a panel de manager");

        setTimeout(() => {
          router.push("/manager");
        }, 1000);

      }

    } catch (error) {
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
      if (!user) {
        setHide(true);
        window.location.href = "/login?from=business";
      } else {
        setHide(false);
      }
    }

  }, [user]);

  return (
    <>
      {hide ? null :
        <>
          {isModalOpen && <RegisterCenterModal closeModal={closeModal} />}
          <BackButton />

          <div className="min-h-screen pt-[3%] bg-custom-dark text-center">
            {isSubmitting ? (
              <LoadingCircle />
            ) : (

              <div className="min-h-screen h-fit w-full mb-[3%]">
                <h1 className="text-4xl font-bold text-white mb-8 h-[6.5%]">
                  Tu Complejo deportivo
                </h1>

                <div className="flex flex-row min-h-[88.2%] h-fit w-full justify-center">

                  <div className="bg-neutral-500 bg-opacity-15 flex flex-col h-fit py-6 w-[35%]">

                    <div className="h-[10%] ml-3 mb-3">
                      <span className="text-base text-center block">Informacion Basica</span>
                    </div>

                    {/* FORM */}
                    <div className="h-[90%] flex flex-row">

                      <div className="px-10 w-full">

                        <form onSubmit={handleSubmit} className="w-full max-w-sm">
                          <div className="mb-6">
                            <label
                              className="block text-white mb-2 ml-3 font-medium text-lg text-start"
                              htmlFor="name"
                            >
                              Nombre
                            </label>
                            <div className="relative">

                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={sportCenter.name}
                                onChange={handleChange}
                                placeholder="Ej: Centro deportivo Active"
                                className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                              />

                              {
                                sportCenter.name && errors?.name !== undefined &&
                                <div className="absolute top-1 text-start text-xs text-red-600 z-5 w-full max-w-full -start-full flex justify-end -ml-3">
                                  <div className="max-w-60">
                                    <ErrorSpan errors={errors?.name} />
                                  </div>
                                </div>
                              }
                            </div>
                          </div>

                          <div className="mb-6">
                            <label
                              className="block text-white mb-2 ml-3 font-medium text-lg text-start"
                              htmlFor="description"
                            >
                              Descripción (Opcional)
                            </label>

                            <div className="relative">
                              <textarea
                                id="description"
                                name="description"
                                ref={descriptionRef}
                                value={sportCenter.description}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Describe aquí las instalaciones, actividades y ambiente de tu centro."
                                className="w-full px-4 py-2 min-h-[40px] max-h-[120px] overflow-x-auto overflow-y-auto border-gray-300 rounded-lg bg-gray-200 focus:outline-none resize-none text-black font-sans overflow-scroll disabled:cursor-not-allowed"
                              />

                              {
                                sportCenter.description && errors?.description !== undefined &&
                                <div className="absolute top-1 text-start text-xs text-red-600 z-5 w-full max-w-full -start-full flex justify-end -ml-3">
                                  <div className="max-w-60">
                                    <ErrorSpan errors={errors?.description} />
                                  </div>
                                </div>
                              }
                            </div>
                          </div>

                          <div className="mb-6">
                            <label
                              className="block text-white ml-3 font-medium text-lg text-start"
                              htmlFor="address"
                            >
                              Direccion
                            </label>
                            {
                              isLocating ?
                                <div className="w-6">Buscando...</div>
                                :
                                !wasLocated ?
                                  <button
                                    disabled={_useGeoLocation === undefined}
                                    onClick={() => searchDirection()}
                                    className="mt-3 disabled:cursor-not-allowed disabled:bg-red-600 bg-lime-600 cursor-pointer px-4 py-2 rounded-lg font-semibold flex gap-2"
                                  >
                                    {_useGeoLocation === undefined ? "Agrega un marcador" : "Usar esta direccion"}
                                    {_useGeoLocation === undefined ?
                                      <CircleX />
                                      :
                                      <CircleCheckBig />
                                    }
                                  </button>
                                  :
                                  <>
                                    <span className="text-sm text-start block ml-1 mb-2">Puedes editar los detalles de la direccion</span>
                                    <div className="relative flex gap-2">
                                      <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={sportCenter.address}
                                        onChange={handleChange}
                                        placeholder="Ej: Calle falsa"
                                        className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                                      />

                                      <div
                                        title="Re-generar direccion"
                                        className="h-full w-fit rounded-lg cursor-pointer p-2 bg-lime-600"
                                        onClick={() => searchDirection()}
                                      >
                                        <RefreshCcw />
                                      </div>
                                      {
                                        sportCenter.address && errors?.address !== undefined &&
                                        <div className="absolute top-1 text-start text-xs text-red-600 z-5 w-full max-w-full -start-full flex justify-end -ml-3">
                                          <div className="max-w-60">
                                            <ErrorSpan errors={errors?.address} />
                                          </div>
                                        </div>
                                      }
                                    </div>
                                    {sportCenter.place &&
                                      <div className="text-sm text-start block ml-1 mt-1">
                                        {sportCenter.place}
                                      </div>
                                    }
                                  </>
                            }
                          </div>

                          <div className="w-auto flex justify-around">
                            <button
                              type="submit"
                              className="mt-5 bg-yellow-600 text-dark px-4 py-2 rounded hover:bg-yellow-700 disabled:cursor-not-allowed disabled:text-yellow-100 disabled:hover:bg-yellow-600"
                              disabled={errors !== null && disabled}
                            >
                              Registrar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* MAP */}
                  <LocationForm useGeoLocation={setUseGeoLocation} formName={sportCenter.name} />
                </div>
              </div>

            )}
          </div>

        </>
      }
    </>
  );
}
