"use client";
import React, { useState, useEffect } from "react";

const ProfileView: React.FC = () => {
  // Estado del usuario con datos iniciales
  const [user, setUser] = useState({
    nombre: "Juan z",
    email: "juan.perez@example.com",
    telefono: "+1 234 567 890",
    reservas: [
      { id: 1, cancha: "Cancha 1", hora: "10:00 AM", fecha: "2024-12-01" },
      { id: 2, cancha: "Cancha 2", hora: "3:00 PM", fecha: "2024-12-02" },
    ],
  });

  // Estado para manejar la edición del perfil
  const [isEditing, setIsEditing] = useState(false);

  // Función para manejar la actualización de los datos del usuario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Función para cambiar entre modo de edición y vista
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  // Función para manejar la simulación de guardado de cambios
  const handleSaveChanges = () => {
    // Aquí podrías hacer un `fetch` o `POST` para guardar los cambios en un backend
    console.log("Guardando cambios:", user);
    setIsEditing(false); // Después de guardar, regresamos a vista
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <h1 className="text-4xl font-semibold text-center text-red-600 mb-6">Perfil de Usuario</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        {/* Información del usuario */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Información Personal</h2>
        <div className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700">Nombre:</label>
            {isEditing ? (
              <input
                type="text"
                name="nombre"
                value={user.nombre}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{user.nombre}</p>
            )}
          </div>
          <div>
            <label className="font-semibold text-gray-700">Correo Electrónico:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{user.email}</p>
            )}
          </div>
          <div>
            <label className="font-semibold text-gray-700">Teléfono:</label>
            {isEditing ? (
              <input
                type="text"
                name="telefono"
                value={user.telefono}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{user.telefono}</p>
            )}
          </div>
        </div>
        {/* Botón para cambiar entre editar y ver */}
        <div className="mt-4">
          {isEditing ? (
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg"
            >
              Guardar cambios
            </button>
          ) : (
            <button
              onClick={toggleEditMode}
              className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Editar perfil
            </button>
          )}
        </div>
      </div>

      {/* Información de reservas (solo se muestra en vista) */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mis Reservas</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Cancha</th>
              <th className="px-4 py-2 text-left border-b">Hora</th>
              <th className="px-4 py-2 text-left border-b">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {user.reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td className="px-4 py-2 border-b">{reserva.cancha}</td>
                <td className="px-4 py-2 border-b">{reserva.hora}</td>
                <td className="px-4 py-2 border-b">{reserva.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileView;
