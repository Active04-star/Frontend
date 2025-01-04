"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { IPasswordUpdate, IUser, IUserUpdate } from "@/types/zTypes";
import { RegisterErrors } from "@/types/Errortypes";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { zodValidate } from "@/helpers/validate-zod";
import { UserUpdateSchema } from "@/types/userUpdate-schema";
import { updateUser } from "@/helpers/user_update_helper";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifyUnknownError } from "@/helpers/swal/swal-notify-unknown-error";
import { ErrorHelper } from "@/helpers/errors/error-helper";

export default function SettingsView() {
  const [user,]: Array<IUser> = useLocalStorage("userSession", null);
  const [name, setName] = useState<IUserUpdate>({ name: "" });
  const [password, setPassword] = useState<IPasswordUpdate>({ password: "", confirm_password: "" });
  const [errors, setErrors] = useState<Pick<RegisterErrors, "name" | "password" | "confirm_password"> | null>(null);

  // const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (user) {
      setName({
        name: user.user.name,
      });
    }
  }, [user]);


  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    // if (isSubmitting) return;
    // setIsSubmitting(true);

    if (Object.values(name).every((data) => data === "") && Object.values(password).every((data) => data === "")) {
      swalCustomError("Error", "No hubo ningun cambio");

      // setIsSubmitting(false);
      return;
    }

    const nameUpdate = zodValidate(name, UserUpdateSchema);

    if (!nameUpdate.success) {
      swalCustomError("Error", "Por favor corrige los errores antes de continuar.");

      // setIsSubmitting(false);
      return;
    }

    try {

      const response = await updateUser(user.user.id, { name: "Pedro Gonzales", password: password.password, confirm_password: password.confirm_password });

      localStorage.setItem("userSession", JSON.stringify({ token: user.token, user: { ...user.user, name: response?.user.name } }));

      window.location.reload();

    } catch (error: any) {

      if (error instanceof ErrorHelper) {
        swalNotifyError(error);

      } else {
        swalNotifyUnknownError(error);

      }

      // setIsSubmitting(false);
    }

  };


  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-black p-6 rounded-lg shadow-md w-full max-w-md mt-48">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          Configuración
        </h1>
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={user?.user !== null ? user?.user?.profile_image : "/images/default-profile.jpg"}
              alt="Foto de perfil del usuario"
              className="rounded-full object-cover bg-white border-2 border-gray-300"
              layout="fill" // Ajusta la imagen al contenedor
              objectFit="cover" // Corta la imagen para que ocupe el espacio disponible
            />
          </div>

          <h2 className="text-xl font-semibold text-white">{user?.user?.email}</h2>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2">Cambiar nombre de usuario</label>
          <input
            type="text"
            value={name.name}
            // onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Cambio de contraseña</label>
          <input
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}