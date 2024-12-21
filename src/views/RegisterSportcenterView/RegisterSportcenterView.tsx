'use client'
import { useState } from "react";
import Link from "next/link";

export default function RegisterSportcenter() {
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    images: "",
  });
  const [errors, setErrors] = useState<{ name?: string; address?: string }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { name?: string; address?: string } = {};
    if (!userData.name.trim()) {
      newErrors.name = "El nombre del complejo es obligatorio.";
    }
    if (!userData.address.trim()) {
      newErrors.address = "La dirección es obligatoria.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Validación en tiempo real (opcional)
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // No envía el formulario si hay errores
    }
    setIsSubmitting(true);

    // Simular envío de datos
    setTimeout(() => {
      console.log("Formulario enviado:", userData);
      setIsSubmitting(false);
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
            Registra tu Complejo Deportivo
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
              {errors.name && (
                <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
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
              {errors.address && (
                <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
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
              <Link href="/login">
                <button
                  type="button"
                  className="mt-5 bg-zinc-900 text-white px-4 py-2 rounded hover:bg-zinc-800"
                >
                  Iniciar Sesión
                </button>
              </Link>

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
