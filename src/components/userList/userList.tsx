"use client";

import { useEffect, useState } from "react";
import { API_URL } from "../../config/config";
import { IUser } from "@/interfaces/user_Interface";

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userSession = localStorage.getItem("userSession");
        const token = userSession ? JSON.parse(userSession).token : null;

        const response = await fetch(`${API_URL}/admin/list/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener los usuarios");

        const data = await response.json();
        console.log(data); // Verifica aquí el formato

        // Ajusta según el formato de la respuesta
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Asegura que el estado sea un arreglo vacío en caso de error
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/admin/ban-unban/user/${id}`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Error al borrar el usuario");
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error al borrar el usuario:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl font-semibold mb-4 text-center p-5 text-black">
        Lista de Usuarios
      </h2>
      <ul className="bg-black rounded-lg shadow-lg overflow-hidden">
        {Array.isArray(users) && users.length === 0 ? (
          <p className="text-center p-4 text-white">
            No hay usuarios para mostrar.
          </p>
        ) : (
          Array.isArray(users) &&
          users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-4 border-b text-white "
            >
              <span>
                {user.name} - {user.email}
              </span>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Borrar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserList;
