"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import {
  IPasswordUpdate,
  IUser,
  IUserRegister,
  IUserUpdate,
  IuserWithoutToken,
} from "@/types/zTypes";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { zodValidate } from "@/helpers/validate-zod";
import { PasswordUpdateSchema, UserUpdateSchema } from "@/types/userUpdate-schema";
import { updateUser } from "@/helpers/user_update_helper";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifyUnknownError } from "@/helpers/swal/swal-notify-unknown-error";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { Eye, EyeOff, Camera, Upload } from "lucide-react";
import { ApiError } from "next/dist/server/api-utils";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { API_URL } from "@/config/config";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import Image from "next/image";
import verifyUser from "@/helpers/auth/illegalUserVerify";
import LoadingCircle from "@/components/general/loading-circle";
import { ApiStatusEnum } from "@/enum/HttpStatus.enum";
import { useError } from "@/helpers/errors/zod-error-normalizator";

interface IPhotoUpdateResponse {
  message: string;
  url: string;
}
//TODO CAMBIAR errores por el span de errores automatico
export default function SettingsView() {
  const [user] = useLocalStorage<IUser | null>("userSession", null);
  const [userData, setUserData] = useState<IuserWithoutToken | null>(null);
  const [name, setName] = useState<IUserUpdate>({ name: "" });
  const [password, setPassword] = useState<IPasswordUpdate>({ password: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);
  const [errors, setErrors] = useError<Pick<IUserRegister, "confirm_password" | "password"> | null>(null);
  const [errorsName, setErrorsName] = useError<Pick<IUserRegister, "name"> | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    const data = zodValidate<Pick<IUserRegister, "confirm_password" | "password">>(password, PasswordUpdateSchema);

    if (!data.success) {
      setErrors(data.errors);
    } else if (password.password === "" && password.confirm_password === "") {
      setErrors(null);
    } else {
      setErrors(null);
    }
  }, [password]);


  useEffect(() => {
    const data = zodValidate<Pick<IUserRegister, "name">>(name, UserUpdateSchema);

    if (!data.success) {
      setErrorsName(data.errors);
    } else if (name.name === "") {
      setErrorsName(null);
    } else {
      setErrorsName(null);
    }
  }, [name]);


  const handleUpdatePhoto = async () => {
    if (!image) {
      swalCustomError("Error", "No se ha seleccionado ninguna imagen");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setIsSavingPhoto(true); // Inicia el estado de carga

      const response: IPhotoUpdateResponse = await fetchWithAuth(
        `${API_URL}/upload/user/${user?.user.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      // Actualizar el localStorage con la nueva imagen
      if (user) {
        const updatedUser = {
          ...user,
          user: {
            ...user.user,
            profile_image: response.url,
          },
        };
        localStorage.setItem("userSession", JSON.stringify(updatedUser));
      }

      swalNotifySuccess("Éxito", "Foto de perfil actualizada correctamente");
      await fetchUser();
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      swalNotifyUnknownError("Error al actualizar la foto de perfil");
    } finally {
      setIsSavingPhoto(false); // Finaliza el estado de carga
    }
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (isLoading) return;
    setLoadingConfig(true);

    let a_name = ""
    if (name.name !== user?.user.name) {
      a_name = name.name;
    }

    if (
      Object.values(name).every((data) => data === "") &&
      Object.values(password).every((data) => data === "")
    ) {
      swalCustomError("Error", "No hubo ningun cambio");
      setLoadingConfig(false);
      return;
    }

    if (a_name !== "" && errorsName !== null) {
      swalCustomError("Error", "Corrige los errores antes de continuar");
      setLoadingConfig(false);
      return;
    }

    if (errors !== null && Object.values(password).every((data) => data !== "")) {
      swalCustomError("Error", "Corrige los errores antes de continuar");
      setLoadingConfig(false);
      return;
    }
    // const nameUpdate = zodValidate(name, UserUpdateSchema);

    // if (!nameUpdate.success) {
    //   swalCustomError(
    //     "Error",
    //     "Por favor corrige los errores antes de continuar."
    //   );
    //   setLoadingConfig(false);
    //   return;
    // }

    try {
      if (user !== null) {
        const response = await updateUser(user.user.id, {
          name: a_name,
          password: password.password,
          confirm_password: password.confirm_password,
        });

        localStorage.setItem(
          "userSession",
          JSON.stringify({
            token: user.token,
            user: { ...user.user, name: response?.user.name },
          })
        );

        // Reset password fields after successful update
        setPassword({
          password: "",
          confirm_password: "",
        });

        swalNotifySuccess("Éxito", "Datos actualizados correctamente");
      } else {
        throw new ApiError(500, "user LocalStorage is invalid");
      }
    } catch (error: any) {

      if (error instanceof ErrorHelper) {
        if(error.message === ApiStatusEnum.THIRD_PARTY_NOT_ALLOWED) {
          swalCustomError("Error", "Los usuarios de terceros no pueden cambiar su contraseña", ["top-right", 5000]);

        } else {
          swalNotifyError(error);

        }
      } else {
        console.error(error);
      }

    } finally {
      setLoadingConfig(false);
    }
  };


  const fetchUser = useCallback(async () => {
    await verifyUser();

    if (!user?.user?.id) return;
    try {
      const response = await fetchWithAuth(
        `${API_URL}/user/solo-para-testing/${user.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUserData(response);
      setName({ name: response.name || "" });
    } catch (error) {
      console.error("Error fetching user", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.user?.id]);


  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (typeof window !== "undefined" && (user?.user === undefined)) {
    window.location.href = "/";
    return (<div className="flex min-h-screen"></div>);

  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-black p-6 rounded-lg shadow-md w-full max-w-md mt-16">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          Configuración
        </h1>

        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-gray-300">
              <Image
                src={
                  previewImage ||
                  userData?.profile_image ||
                  "/images/default-profile.jpg"
                }
                alt="Foto de perfil"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            {!isSavingPhoto &&
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-yellow-600 rounded-full p-2 cursor-pointer hover:bg-yellow-700 transition-colors"
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>}
          </div>

          {image && (
            <button
              onClick={handleUpdatePhoto}
              className={`flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors ${isSavingPhoto ? "cursor-not-allowed opacity-70" : ""
                }`}
              disabled={isSavingPhoto}
            >
              {isSavingPhoto ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Guardar Foto
                </>
              )}
            </button>
          )}

          <h2 className="text-xl font-semibold text-white">
            {userData?.email}
          </h2>
        </div>

        {loadingConfig ?
          <div className="mx-auto w-16 h-16"><LoadingCircle /></div>
          :
          <>
            <div className="mb-4">
              <label className="block text-white mb-2">
                Cambiar nombre de usuario
              </label>
              <input
                type="text"
                name="name"
                value={name.name}
                onChange={(e) => setName({ name: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {name.name &&
                errorsName !== null &&
                errorsName.name !== undefined &&
                errorsName.name !== undefined ? (
                <>
                  <span
                    className="text-sm text-red-600"
                    style={{ fontSize: "12px" }}
                  >
                    {errorsName.name[0]}
                  </span>

                  <div>
                    <span
                      className="text-sm text-red-600"
                      style={{ fontSize: "12px" }}
                    >
                      {errorsName.name[1] !== undefined &&
                        errorsName.name[1].length > 0
                        ? errorsName.name[1]
                        : null}
                    </span>
                  </div>
                </>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Cambio de contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password.password}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              </div>
              {/* {password.password &&
                errors !== null &&
                errors.password !== undefined &&
                errors?.password !== undefined ? (
                <span
                  className="text-sm text-red-600"
                  style={{ fontSize: "12px" }}
                >
                  {errors.password}
                </span>
              ) : null} */}
              {password.password &&
                errors !== null &&
                errors.password !== undefined &&
                errors?.password !== undefined ? (
                <>
                  <span
                    className="text-sm text-red-600"
                    style={{ fontSize: "12px" }}
                  >
                    {errors.password[0]}
                  </span>

                  <div>
                    <span
                      className="text-sm text-red-600"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.password[1] !== undefined &&
                        errors.password[1].length > 0
                        ? errors.password[1]
                        : null}
                    </span>
                  </div>
                </>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Confirmar contraseña</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  value={password.confirm_password}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              </div>
              {password.confirm_password &&
                errors !== null &&
                errors.confirm_password !== undefined &&
                errors?.confirm_password !== undefined ? (
                <span
                  className="text-sm text-red-600"
                  style={{ fontSize: "12px" }}
                >
                  {errors.confirm_password}
                </span>
              ) : null}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
            >
              Guardar Cambios
            </button>
          </>
        }
      </div>
    </div>
  );
}
