import React, { useState } from "react";

const PerfilView: React.FC = () => {
  // Estado para almacenar la información del usuario
  const [user, setUser] = useState({
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
    idioma: "Español",
  });

  // Estado para controlar si estamos en modo de edición
  const [isEditing, setIsEditing] = useState(false);

  // Función para manejar los cambios en los campos de entrada (input o select)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Función para alternar entre el modo de edición y visualización
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100">
      <h1 className="text-4xl font-semibold text-center text-red-600 mb-6">Perfil de Usuario</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Información Personal
        </h2>

        <div className="space-y-4">
          {/* Campo para el nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            {isEditing ? (
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={user.nombre}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{user.nombre}</p>
            )}
          </div>

          {/* Campo para el correo electrónico */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{user.email}</p>
            )}
          </div>

          {/* Campo para seleccionar el idioma */}
          <div>
            <label htmlFor="idioma" className="block text-sm font-medium text-gray-700">
              Idioma
            </label>
            {isEditing ? (
              <select
                id="idioma"
                name="idioma"
                value={user.idioma}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              >
                <option value="Español">Español</option>
                <option value="Inglés">Inglés</option>
                <option value="Francés">Francés</option>
              </select>
            ) : (
              <p className="text-gray-700">{user.idioma}</p>
            )}
          </div>
        </div>

        {/* Botón para alternar entre modo de edición y visualización */}
        <div className="mt-6 text-right">
          <button
            onClick={toggleEdit}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {isEditing ? "Guardar" : "Editar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerfilView;
