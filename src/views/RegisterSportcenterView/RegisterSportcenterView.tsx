"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ICenterRegister, ISportCenter } from "@/types/zTypes";
import { IUser } from "@/interfaces/user_Interface";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { UserRole } from "@/enum/userRole";
import { API_URL } from "@/config/config";
import { ApiStatusEnum } from "@/enum/HttpStatus.enum";
import { CenterRegisterSchema } from "@/types/centerRegister-schema";
import { validateField } from "@/utils/validate_sportCenter_register.util";
import { z } from "zod";
import { Hand } from "lucide-react";


type FormErrors<T> = {
  [K in keyof T]?: string[];
};

export default function RegisterSportcenter() {
  const router = useRouter(); // Hook para redirigir
  const [iuser, setUser] = useLocalStorage("userSession", "");
  const user: Partial<IUser> = iuser ? iuser.user : null;

  const [sportCenter, setSportCenter] = useState<ICenterRegister>({
    name: "",
    address: "",
  });
  const [errors, setErrors] = useState<FormErrors<ICenterRegister>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSportCenter(prev => ({ ...prev, [name]: value }));
    
    const validation = validateField<ICenterRegister>(CenterRegisterSchema, name as keyof ICenterRegister, value);
    if (validation.success) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    } else {
      setErrors(prev => ({ ...prev, [name]: validation.error ? [validation.error] : undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    console.log('holaa');
    
    e.preventDefault();
    setIsSubmitting(true);


    const userSession = localStorage.getItem("userSession");
    const token = userSession ? JSON.parse(userSession).token : null;
    
    try {
      const validatedData = CenterRegisterSchema.parse(sportCenter);
      console.log('Form data is valid:', validatedData);
      const new_sportcenter = { ...sportCenter, manager: user.id };
      const responde=await fetch(`${API_URL}/sportcenter/create`,{method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
        },
        body: JSON.stringify(new_sportcenter)})
//pasos siguientes:
        //guardo el centro , se transforma al user en manager , cierro sesion y envio a user a login . ese user va a ir a manager cuando se loguie
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as FormErrors<ICenterRegister>);
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
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
          <h1 className="text-5xl font-bold text-white mb-8">
            Registra tu Complejo deportivo
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
                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
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
                <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>
              )}
            </div>

            {/* <div className="mb-6">
              <label
                className="block text-white mb-2 text-center font-medium text-lg"
                htmlFor="images"
              >
                Imágen (Opcional)
              </label>
              <input
                type="text"
                id="images"
                name="images"
                value={sportCenter.images}
                onChange={handleChange}
                placeholder="URL de la imagen principal"
                className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
              />
            </div> */}

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
  );
}