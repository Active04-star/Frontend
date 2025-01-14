"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ICenterRegister,
  ISportCenter,
  IUser,
  IuserWithoutToken,
} from "@/types/zTypes";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { API_URL } from "@/config/config";
import { CenterRegisterSchema } from "@/types/centerRegister-schema";
import { z } from "zod";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifyUnknownError } from "@/helpers/swal/swal-notify-unknown-error";
import BotonVolver from "@/components/back-button/back-button";
import { ModalInformacion } from "@/components/modal/modal.component";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";

type FormErrors<T> = { [K in keyof T]?: string[] };

export default function RegisterSportcenter() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter(); // Hook para redirigir
  const [user, setUser] = useLocalStorage<IUser | null>("userSession", null);
  // const user: Partial<IUser> = iuser ? iuser.user : null;
  const [hide, setHide] = useState(true);

  const [sportCenter, setSportCenter] = useState<ICenterRegister>({
    name: "",
    address: "",
  });
  const [errors, setErrors] = useState<FormErrors<ICenterRegister>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSportCenter((prev) => ({ ...prev, [name]: value }));
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
      if (user !== null) {
        const validatedData = CenterRegisterSchema.parse(sportCenter);
        console.log("Form data is valid:", validatedData);
        const new_sportcenter = { ...sportCenter, manager: user.user.id };

        const response: ISportCenter = await fetchWithAuth(
          `${API_URL}/sportcenter/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(new_sportcenter),
          }
        );

        const userData: IuserWithoutToken = await fetchWithAuth(
          `${API_URL}/user/solo-para-testing/${user.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setUser(userData);
        localStorage.setItem(
          "sportCenter",
          JSON.stringify({ id: response.id })
        );

        swalNotifySuccess(
          "Creacion exitosa",
          "seras redirigido a panel de manager"
        );

        router.push("/manager");
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
      {hide ? null : (
        <>
          {isModalOpen && <ModalInformacion closeModal={closeModal} />}
          <BotonVolver />

          <div className="min-h-screen flex flex-col items-center justify-center bg-custom-dark text-center">
            {isSubmitting ? (
              <>
                <h1 className="text-4xl font-bold text-white mb-8 font-serif">
                  Cargando...
                </h1>
                <div className="w-32 h-32">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                </div>
              </>
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
        </>
      )}
    </>
  );
}
