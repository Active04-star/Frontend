import React, { useState } from "react";

const ProfileView: React.FC = () => {
  // Información del usuario (esto podría venir de una API o estado global)
  const [user, setUser] = useState({
    nombre: "Juan Pérez",
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
        <button
          onClick={toggleEditMode}
          className="mt-4 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
        >
          {isEditing ? "Guardar cambios" : "Editar perfil"}
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
