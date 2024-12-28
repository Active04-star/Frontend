// src/views/Panel/CanchasView.tsx
"use client";
import LoadingCircle from "@/components/general/loading-circle";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import React, { useEffect, useState } from "react";

const CanchasView: React.FC = () => {
  const [sportCenter,] = useLocalStorage("sportCenter", "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Lista de canchas con sus datos (por ejemplo, nombre, tipo, disponibilidad)
  const canchas = [
    { id: 1, nombre: "Cancha 1", tipo: "Fútbol 11", disponible: true },
    { id: 2, nombre: "Cancha 2", tipo: "Fútbol 7", disponible: false },
    { id: 3, nombre: "Cancha 3", tipo: "Tenis", disponible: true },
    { id: 4, nombre: "Cancha 4", tipo: "Fútbol 5", disponible: true },
    { id: 5, nombre: "Cancha 5", tipo: "Paddle", disponible: false },
  ];

  useEffect(() => {
    setIsLoading(true);
    //Por aqui iria un fetch para obtener las canchas, tomando el id de sportCenter.id (ya lo hago)
  }, []);

  // Función para manejar el clic en el botón de editar
  const handleEditClick = (id: number) => {
    console.log(`Editar cancha con ID: ${id}`);
    // Aquí puedes agregar la lógica para redirigir a un formulario de edición o abrir un modal
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      {/* Encabezado general de la vista */}
      <h1 className="text-4xl font-semibold text-center text-red-600 mb-6">
        Tus Canchas
      </h1>

      {/* Título para la tabla de canchas */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Tus canchas
      </h2>

      {
        isLoading ?
          (
            <div className="bg-white shadow-lg rounded-lg mb-6 flex justify-center items-center h-72">
              <div className="w-64 h-64">
                <LoadingCircle />
              </div>
            </div>
          )
          :
          (
            <>
              {/* Botones de carga y descarga alineados a la derecha */}
              <div className="flex justify-end space-x-4 mb-4">
                <button className="bg-blue-500 text-white p-2 rounded-md">
                  Download
                </button>
                <button className="bg-green-500 text-white p-2 rounded-md">
                  Upload
                </button>
              </div>

              {/* Vista de las canchas en formato tabla estilo Excel */}
              <div className="overflow-x-auto bg-white shadow-lg rounded-lg mb-6">
                <table className="min-w-full table-auto border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Nombre</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Tipo</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Disponibilidad</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Acciones</th> {/* Columna para las acciones */}
                    </tr>
                  </thead>
                  <tbody>
                    {canchas.map((cancha) => (
                      <tr key={cancha.id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 text-gray-700 border-b">{cancha.nombre}</td>
                        <td className="px-6 py-4 text-gray-700 border-b">{cancha.tipo}</td>
                        <td
                          className={`px-6 py-4 text-gray-700 font-semibold border-b ${cancha.disponible ? "text-green-600" : "text-red-600"}`}
                        >
                          {cancha.disponible ? "Disponible" : "No disponible"}
                        </td>
                        <td className="px-6 py-4 text-gray-700 border-b">
                          {/* Botón de editar al lado de cada cancha */}
                          <button
                            onClick={() => handleEditClick(cancha.id)}
                            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Botón para crear una nueva cancha, alineado a la derecha */}
              <div className="flex justify-end mt-4">
                <button className="bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-200">
                  Crear Cancha
                </button>
              </div>
            </>
          )
      }
    </div >
  );
};

export default CanchasView;
