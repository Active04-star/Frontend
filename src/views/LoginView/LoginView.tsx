"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodValidate } from "@/helpers/validate-zod";
import { login } from "@/helpers/auth/login";
import { getUserType } from "@/helpers/auth/getUserType";
import { getCenterIfManager } from "@/helpers/auth/getCenterIfManager";
import { AuthErrorHelper } from "@/helpers/errors/auth-error-helper";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { UserLoginSchema } from "@/types/userLogin-schema";
import { ApiStatusEnum } from "@/enum/HttpStatus.enum";
import { UserRole } from "@/enum/userRole";
import { Page } from "@/enum/Pages";
import { LoginErrors } from "@/types/Errortypes";
import { IUser, IUserLogin } from "@/types/zTypes";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { swalNotifyUnknownError } from "@/helpers/swal/swal-notify-unknown-error";

export const useLoginFunctions = () => {
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<IUserLogin>(initialState);
  const [errors, setErrors] = useState<LoginErrors | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Manejar cambios en los inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    let { value } = event.target;    if(name === "email") {
      value = value.toLowerCase();
    }
    setUserData({ ...userData, [name]: value });
  };
  
  // Validar datos de usuario al cambiar
  useEffect(() => {
    setIsSubmitting(false);
    const data = zodValidate<LoginErrors>(userData, UserLoginSchema);

    if (!data.success) {
      setErrors(data.errors);
    } else {
      setErrors(null);
    }
  }, [userData]);
  
  // Redirector a autenticación externa (Google)
  const redirectToAuth = (email: string) => {
    window.location.href = `api/auth/login?login_hint=${encodeURIComponent(email)}`;
  };
  
  // Verificar tipo de usuario
  const checkUserType = async (email: string): Promise<boolean> => {
    try {
      const response = await getUserType(email);
      
      if (response.message === ApiStatusEnum.USER_IS_THIRD_PARTY) {
        redirectToAuth(email.toLowerCase());
        return false;
      }
      return true;
    } catch (error) {
      if (error instanceof ErrorHelper) {
        if (error.message === ApiStatusEnum.USER_DELETED) {
          swalCustomError(ApiStatusEnum.USER_DELETED, "No se pudo logear", ["top-right", ]);
          setIsSubmitting(false);
          setUserData(initialState);
          return false;
        } else if (error.message === ApiStatusEnum.INVALID_CREDENTIALS || error.message === ApiStatusEnum.USER_NOT_FOUND) {
          swalCustomError(ApiStatusEnum.INVALID_CREDENTIALS, "No se pudo logear", ["top-right", ]);
          setIsSubmitting(false);
          setUserData(initialState);
          return false;
        }
      } else {
        swalNotifyUnknownError(error);
        console.error(error);
        return false;
      }
      return false;
    }
  };
  
  // Manejar el envío del formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const validation = zodValidate<LoginErrors>(userData, UserLoginSchema);

    // Validar usuario externo
    if (validation.errors === null || validation.errors.email === undefined) {
      const canContinue = await checkUserType(userData.email);
      if (!canContinue) return;
    }

    // Validar campos vacíos
    if (Object.values(userData).find((data) => data === "") === "") {
      swalCustomError("Error en Logueo", "Los campos están vacios.");
      setIsSubmitting(false);
      return;
    }

    // Validar esquema de datos
    if (!validation.success) {
      swalCustomError("Error en Logueo", "Por favor corrige los errores antes de continuar.");
      setIsSubmitting(false);
      return;
    }

    // Intentar login
    try {
      localStorage.clear();

      const response: IUser = await login(userData);
      const { token, user } = response;

      localStorage.setItem("userSession", JSON.stringify({ token, user }));

      swalNotifySuccess("¡Bienvenido de nuevo!", "");

      setUserData(initialState);
      await getCenterIfManager(response);

      // Redireccionar según rol
      const roleRoutes = {
        [UserRole.USER]: Page.SEARCH,
        [UserRole.MAIN_MANAGER]: "/manager",
        [UserRole.ADMIN]: "/admin",
        [UserRole.SUPER_ADMIN]: "/admin",
        [UserRole.MANAGER]: "/manager",
      };

      const route = roleRoutes[user.role];
      if (route) {
        router.push(route);
        return;
      }

      router.push("/");
    } catch (error) {
      if (
        error instanceof ErrorHelper &&
        error.message === ApiStatusEnum.USER_DELETED
      ) {
        swalCustomError(ApiStatusEnum.USER_DELETED, "No se pudo logear");
      } else {
        AuthErrorHelper(error);
      }

      setIsSubmitting(false);
    }
  };
  
  // Verificar parámetros de URL para mensajes
  const checkUrlParams = () => {
    const queryString = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(queryString.entries()) as { from: string };

    if (queryParams.from === "business") {
      swalCustomError("Necesitas una cuenta", "Debes estar registrado para poder acceder a esta funcion", [, 6000]);
    } else if (queryParams.from === "out_session") {
      swalCustomError("La sesion ha expirado!", "Debes iniciar sesion nuevamente", [, 6000]);
    } else if (queryParams.from === "user_blocked") {
      swalCustomError("No se pudo iniciar sesion", "Este usuario fue baneado!", [, 6000]);
    }
  };
  
  
  
  return {
    userData,
    setUserData,
    errors,
    isSubmitting,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    checkUrlParams,
    redirectToAuth,
    checkUserType,
    initialState
  };
};