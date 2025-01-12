"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/user_Interface";
import { API_URL } from "@/config/config";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import Image from "next/image";

const ManagerPremium = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await fetchWithAuth(`${API_URL}/admin/premiumUsers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
      });

      setUsers(data);
    } catch (error) {
      console.error("Error al obtener los usuarios premium:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-semibold mb-4 text-center p-5 text-white mt-5">
        Managers Premium
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length === 0 ? (
          <p className="text-center text-white">
            No hay usuarios premium para mostrar.
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              {/* Mostrar la imagen de perfil, si existe */}
              <div className="relative w-24 h-24 mb-4">
                {user.profile_image ? (
                  <Image
                    src={user.profile_image}
                    alt={user.name}
                    width={96} // Ancho de la imagen
                    height={96} // Alto de la imagen
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    fill="none"
                    className="w-full h-full rounded-full bg-gray-300"
                  >
                    {/* Cabeza */}
                    <circle cx="32" cy="20" r="12" fill="#F1C40F" />
                    {/* Cuerpo */}
                    <path
                      d="M24 32 C24 32, 20 40, 24 48 C28 48, 32 48, 36 48 C40 40, 36 32, 32 32"
                      fill="#F1C40F"
                    />
                    {/* Ojos */}
                    <circle cx="28" cy="18" r="2" fill="white" />
                    <circle cx="36" cy="18" r="2" fill="white" />
                    {/* Boca */}
                    <path
                      d="M28 22 Q32 26 36 22"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
              {/* Mostrar el email del usuario */}
              <p className="text-xl font-bold">{user.email}</p>
              <p className="text-sm mt-2">Usuario Premium</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManagerPremium;
