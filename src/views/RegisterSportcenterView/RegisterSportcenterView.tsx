"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ISportCenter } from "@/types/zTypes";
import { IUser } from "@/interfaces/user_Interface";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { UserRole } from "@/enum/userRole";
import { API_URL } from "@/config/config";

export default function RegisterSportcenter() {
  const router = useRouter(); // Hook para redirigir
  const [iuser, setUser] = useLocalStorage("userSession", "");
  const user: Partial<IUser> = iuser.user;
  const [isAllowed, setIsAllowed] = useState(true);

  const [formData, setFormData] = useState<Partial<ISportCenter>>({
    name: "",
    address: "",
  });
  const [errors, setErrors] = useState<{
    name: string;
    address: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (user === null && user === undefined || user.role !== UserRole.USER) {
      setIsAllowed(false);

     router.push('/')

    }

  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value, files } = e.target as HTMLInputElement;

    if (type === "file" && files && files[0]) {
      setImageFile(files[0]);
      // No asignamos el File a imgUrl, solo guardamos el archivo
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

  if(user.role===UserRole.USER){
    try {
      const sportCenterData={...formData}
      const userSession = localStorage.getItem("userSession");
      const token = userSession ? JSON.parse(userSession).token : null;
      const user = userSession ? JSON.parse(userSession).user : null;
    const new_restaurant = { ...sportCenterData, manager: user.id };
      const responde=await fetch(`${API_URL}/sportcenter/create`,{method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
        },
        body: JSON.stringify(new_restaurant)})
    } catch (error) {
      
    }
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
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Cafetería Central"
                className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
              />
              {formData.name && errors?.name && (
                <span
                  className="text-sm text-red-600"
                  style={{ fontSize: "12px" }}
                >
                  {errors.name}
                </span>
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
                value={formData.address}
                onChange={handleChange}
                placeholder="Ej: Calle Principal 123"
                className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
              />
              {formData.address && errors?.address && (
                <span
                  className="text-sm text-red-600"
                  style={{ fontSize: "12px" }}
                >
                  {errors.address}
                </span>
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
                value={formData.images}
                onChange={handleChange}
                placeholder="URL de la imagen principal"
                className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
              />
            </div> */}

            <div className="w-auto flex justify-around">
              <button
                type="submit"
                className="mt-5 bg-yellow-600 text-dark px-4 py-2 rounded hover:bg-yellow-700"
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