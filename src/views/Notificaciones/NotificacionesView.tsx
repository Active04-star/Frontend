// src/views/Panel/NotificacionesView.tsx
"use client";
import React, { useEffect, useState } from "react";

// Define el tipo para la calificación
interface Calificacion {
  id: string;
  mensaje: string;
  detalle: string;
  user: {
    name: string;
    email: string;
    profile_image: string;
  };
  sportcenter: {
    name: string;
    address: string;
    averageRating: number;
  };
  createdAt: string;
}

const NotificacionesView: React.FC = () => {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]); // Estado para las calificaciones
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string>(""); // Estado para manejar errores
  const [sortOrder, setSortOrder] = useState<string>("name"); // Estado para el criterio de ordenación (nombre o calificación)
  const [sortDirection, setSortDirection] = useState<string>("asc"); // Estado para la dirección de la ordenación (ascendente o descendente)

  // Efecto para obtener las calificaciones desde la API
  useEffect(() => {
    const obtenerCalificaciones = async () => {
      setLoading(true); // Establecer la carga en true
      setError(""); // Limpiar errores previos

      try {
        // Realizar la solicitud al nuevo endpoint
        const response = await fetch("http://localhost:4000/review/f7161888-30e5-47fb-ad51-744ad4e874be");

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error("No se pudieron obtener las calificaciones.");
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Crear un ejemplo con varias notificaciones (solo para propósito de demostración)
        const calificacionesEjemplo = [
          {
            id: "1",
            mensaje: "Excelente clase, todo estuvo perfecto.",
            detalle: "Las instalaciones son muy buenas y la clase fue muy completa.",
            user: {
              name: "Sergio Mora",
              email: "sergio12@gmail.com",
              profile_image: "https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux",
            },
            sportcenter: {
              name: "Cancha Bey",
              address: "Colombia",
              averageRating: 5,
            },
            createdAt: "2025-01-02T16:20:44.000Z",
          },
          {
            id: "2",
            mensaje: "Buena cancha, pero le falta mantenimiento.",
            detalle: "La cancha estaba muy buena, pero los baños podrían mejorar.",
            user: {
              name: "Juan Pérez",
              email: "juanperez@example.com",
              profile_image: "https://res.cloudinary.com/dvgvcleky/image/upload/v1/RestO/ffgx6ywlaix0mb3jghux",
            },
            sportcenter: {
              name: "Cancha ABC",
              address: "Colombia",
              averageRating: 4.0,
            },
            createdAt: "2025-01-01T14:30:25.000Z",
          },
          {
            id: "3",
            mensaje: "Muy buena experiencia en general.",
            detalle: "Todo estuvo excelente, pero el lugar está un poco alejado.",
            user: {
              name: "Carlos Díaz",
              email: "carlos.diaz@example.com",
              profile_image: "https://res.cloudinary.com/dvgvcleky/image/upload/v1/RestO/ffgx6ywlaix0mb3jghux",
            },
            sportcenter: {
              name: "Cancha XYZ",
              address: "Colombia",
              averageRating: 4.8,
            },
            createdAt: "2025-01-03T10:00:10.000Z",
          },
          {
            id: "4",
            mensaje: "Mejorar la iluminación de la cancha.",
            detalle: "La cancha está bien, pero la iluminación en la noche es insuficiente.",
            user: {
              name: "Ana Gómez",
              email: "ana.gomez@example.com",
              profile_image: "https://res.cloudinary.com/dvgvcleky/image/upload/v1/RestO/ffgx6ywlaix0mb3jghux",
            },
            sportcenter: {
              name: "Cancha Delta",
              address: "Colombia",
              averageRating: 3.9,
            },
            createdAt: "2025-01-04T11:50:15.000Z",
          }
        ];

        // Asignar las calificaciones de ejemplo al estado
        setCalificaciones(calificacionesEjemplo);
      } catch (error: any) {
        setError(error.message || "Hubo un error al obtener las calificaciones");
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    obtenerCalificaciones();
  }, []); // El efecto solo se ejecuta una vez cuando el componente se monta

  // Función para ordenar las calificaciones
  const ordenarCalificaciones = (criterio: string, direccion: string) => {
    const calificacionesOrdenadas = [...calificaciones]; // Usar const en lugar de let
    if (criterio === "name") {
      calificacionesOrdenadas.sort((a, b) => {
        if (direccion === "asc") {
          return a.sportcenter.name.localeCompare(b.sportcenter.name);
        } else {
          return b.sportcenter.name.localeCompare(a.sportcenter.name);
        }
      });
    } else if (criterio === "rating") {
      calificacionesOrdenadas.sort((a, b) => {
        if (direccion === "asc") {
          return a.sportcenter.averageRating - b.sportcenter.averageRating;
        } else {
          return b.sportcenter.averageRating - a.sportcenter.averageRating;
        }
      });
    }
    setCalificaciones(calificacionesOrdenadas);
  };

  // Cambiar el criterio de ordenación
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOrder = e.target.value;
    setSortOrder(selectedSortOrder);
    ordenarCalificaciones(selectedSortOrder, sortDirection);
  };

  // Cambiar la dirección de la ordenación
  const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDirection = e.target.value;
    setSortDirection(selectedDirection);
    ordenarCalificaciones(sortOrder, selectedDirection);
  };

  // Función para renderizar las estrellas según la calificación
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill={i <= rating ? "yellow" : "gray"}
          className="bi bi-star"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.39.2-.818-.275-.662-.692l1.259-4.141-3.09-2.43c-.35-.274-.15-.762.293-.764h4.198l1.255-4.156c.126-.41.728-.41.854 0l1.255 4.156h4.198c.443 0 .642.49.293.764l-3.09 2.43 1.259 4.141c.156.417-.272.892-.662.692L8 12.527l-3.88 2.916z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20 bg-gray-100">
      {/* Filtros de ordenación */}
      <div className="flex space-x-4 mb-6">
        <div>
          <label className="text-sm font-semibold text-teal-600">Ordenar por:</label>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="name">Nombre de la Cancha</option>
            <option value="rating">Calificación</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-teal-600">Dirección:</label>
          <select
            value={sortDirection}
            onChange={handleDirectionChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>

      {/* Sección de notificaciones */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-teal-600 mb-4">Notificaciones</h2>

        {loading ? (
          <p className="text-gray-600">Cargando notificaciones...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : calificaciones.length > 0 ? (
          <ul className="space-y-4">
            {calificaciones.map((calificacion) => (
              <li key={calificacion.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={calificacion.user.profile_image}
                    alt={calificacion.user.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-semibold text-black">{calificacion.user.name}</p> {/* Nombre en negro */}
                    <p className="text-xs text-gray-500">{new Date(calificacion.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <h4 className="font-semibold text-teal-600">{calificacion.mensaje}</h4>
                <p className="text-sm text-gray-600">{calificacion.detalle}</p>
                <div className="mt-3 text-sm text-gray-500">
                  <strong>Cancha:</strong> {calificacion.sportcenter.name}
                  <br />
                  <strong>Dirección:</strong> {calificacion.sportcenter.address}
                  <br />
                  <div className="mt-2 flex">{renderStars(calificacion.sportcenter.averageRating)}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No hay notificaciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default NotificacionesView;
