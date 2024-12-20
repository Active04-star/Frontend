"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterSportcenter() {
  const router = useRouter(); // Hook para redirigir
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    images: "", //NOTA IMAGEN NO VA EN EL REGISTRO, EL RESTO ESTA OK
  });
  const [errors, setErrors] = useState<{
    name: string;
    address: string;
    images: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Formulario enviado:", userData);
      setIsSubmitting(false);

      router.push("/manager");
    }, 2000);
  };

  return (
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
                value={userData.name}
                onChange={handleChange}
                placeholder="Ej: Cafetería Central"
                className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
              />
              {userData.name && errors?.name && (
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
                value={userData.address}
                onChange={handleChange}
                placeholder="Ej: Calle Principal 123"
                className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
              />
              {userData.address && errors?.address && (
                <span
                  className="text-sm text-red-600"
                  style={{ fontSize: "12px" }}
                >
                  {errors.address}
                </span>
              )}
            </div>

            <div className="mb-6">
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
                value={userData.images}
                onChange={handleChange}
                placeholder="URL de la imagen principal"
                className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
              />
            </div>

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
  );
}
