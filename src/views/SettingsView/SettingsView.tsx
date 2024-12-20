"use client";
import { useState } from "react";
import Image from "next/image";

export default function SettingsView() {
  const [profileImage, setProfileImage] = useState("/default-profile.jpg");
  const [name, setName] = useState("Usuario");
  const [password, setPassword] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSave = () => {
    if (password === "") {
      alert("La contraseña no puede estar vacía.");
    } else {
      alert("Cambios guardados:\n" + `Nombre: ${name}\nContraseña: ${password}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-black p-6 rounded-lg shadow-md w-full max-w-md mt-48">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          Configuración
        </h1>
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={profileImage}
              alt="Foto de perfil del usuario"
              className="rounded-full object-cover bg-white border-2 border-gray-300"
              layout="fill" // Ajusta la imagen al contenedor
              objectFit="cover" // Corta la imagen para que ocupe el espacio disponible
            />
          </div>
          <label className="cursor-pointer bg-yellow-600 text-white py-2 px-4 rounded text-sm">
            Cambiar Foto
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Cambiar nombre de usuario</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Cambio de contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}