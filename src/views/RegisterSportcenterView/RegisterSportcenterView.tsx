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
import BotonVolver from "@/components/back-button/back-button";
import { ModalInformacion } from "@/components/modal/modal.component";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { getCenterIfManager } from "@/helpers/auth/getCenterIfManager";
import RegistrationMap from "@/components/maps/registrationMap";
import LoadingCircle from "@/components/general/loading-circle";
import { useError } from "@/helpers/errors/zod-error-normalizator";
import { zodValidate } from "@/helpers/validate-zod";

export default function RegisterSportcenter() {
  const initial = {
    name: "",
    address: "",
    description: "",
  }
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();
  const [user] = useLocalStorage<IUser | null>("userSession", null);
  const [hide, setHide] = useState(true);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [sportCenter, setSportCenter] = useState<ICenterRegister>(initial);
  // const [errors, setErrors] = useState<FormatedErrors<ICenterRegister> | null>(null);
  const [errors, setErrors] = useError<ICenterRegister | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(true);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // setIsLoaded(true);
    // return (() => setIsLoaded(false));
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
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
      if (descriptionRef.current !== null) {
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
      swalCustomError("Error en el registro", "Los campos están vacios.");

      setIsSubmitting(false);
      return;
    }

    const data = zodValidate<ICenterRegister>(sportCenter, CenterRegisterSchema);

    if (!data.success) {
      swalCustomError("Error en el registro", "Por favor corrige los errores antes de continuar.");

      setIsSubmitting(false);
      return;
    }

    try {

      if (user !== null) {

        const new_sportcenter = {
          ...sportCenter,
          manager: user.user.id,
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
          {isModalOpen && <ModalInformacion closeModal={closeModal} />}
          <BotonVolver />

          <div className="min-h-screen flex flex-col items-center justify-center bg-custom-dark text-center">
            {isSubmitting ? (
              <LoadingCircle />
            ) : (

              <div className="grid grid-flow-col">

                {/* FORM */}
                <div>
                  <h1 className="text-4xl font-bold text-white mb-8">
                    Tu Complejo deportivo
                  </h1>
                  <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <div className="mb-6">
                      <label
                        className="block text-white mb-2 text-center font-medium text-lg"
                        htmlFor="name"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={sportCenter.name}
                        onChange={handleChange}
                        placeholder="Ej: Centro deportivo Active"
                        className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                      />

                      {errors && errors.name && (
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
                        Descripción
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        ref={descriptionRef}
                        value={sportCenter.description}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Ej: Calle Principal 123"
                        className="w-full px-4 py-2 min-h-[40px] max-h-[120px] overflow-x-auto overflow-y-auto border-gray-300 rounded-lg bg-gray-200 focus:outline-none resize-none text-black font-sans overflow-scroll disabled:cursor-not-allowed"
                      />
                      {errors && errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address[0]}
                        </p>
                      )}
                    </div>

                    <div className="w-auto flex justify-around">
                      <button
                        type="submit"
                        className="mt-5 bg-yellow-600 text-dark px-4 py-2 rounded hover:bg-yellow-700 disabled:cursor-not-allowed disabled:text-yellow-100 disabled:hover:bg-yellow-600"
                        disabled={errors !== null}
                      >
                        Registrar
                      </button>
                    </div>
                  </form>
                </div>

                {/* MAP */}
                <div className="w-full h-[400px]">
                  <RegistrationMap />
                </div>
              </div>
            )}
          </div>
        </>
      }
    </>
  );
}
