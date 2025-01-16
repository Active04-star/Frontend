import { API_URL } from "@/config/config";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const Categorias = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<
    { name: string; logo?: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/categories/all`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Error fetching categories");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const responseData = await fetchWithAuth(`${API_URL}/categories/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });

      setSuccessMessage("¡Categoría creada exitosamente!");
      setCategoryName("");
      await fetchCategories();
    } catch (error: unknown) {

      if (error instanceof Error) {
        setErrorMessage(error.message || "Error de conexión. Intenta nuevamente.");
      } else {
        setErrorMessage("Error desconocido. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-[200px] p-6 bg-gray-600 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Crear Categoría de Deporte
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium mb-2"
          >
            Nombre de la categoría:
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 border text-white"
            placeholder="Ej. Fútbol, Baloncesto"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 rounded-md bg-yellow-600 text-white font-semibold ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Categoría"}
        </button>
        {successMessage && (
          <p className="text-green-500 text-sm mt-2">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </form>

      {/* Mostrar categorías */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Categorías disponibles:</h3>
        <ul className="space-y-4">
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex items-center bg-gray-700 p-3 rounded-md shadow"
            >
              {category.logo && (
                <Image
                  src={category.logo}
                  alt={category.name}
                  className="w-10 h-10 mr-4 rounded-full object-cover"
                />
              )}
              <span className="text-white text-lg">{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categorias;
