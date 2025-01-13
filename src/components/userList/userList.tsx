"use client";

import { useEffect, useState } from "react";
import { API_URL } from "../../config/config";
import { IUser } from "@/interfaces/user_Interface";
import Swal from "sweetalert2";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filtrar usuarios según la letra
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userSession = localStorage.getItem("userSession");
        const token = userSession ? JSON.parse(userSession).token : null;

        const response = await fetch(`${API_URL}/admin/list/user?limit=100`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener los usuarios");

        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleBan = async (id: string, wasBanned: boolean) => {
    const action = wasBanned ? "desbanear" : "banear";
    const confirmAction = wasBanned ? "desbaneado" : "baneado";
  
    const result = await Swal.fire({
      title: `¿Estás seguro de que quieres ${action} a este usuario?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${action}`,
      cancelButtonText: "Cancelar",
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetchWithAuth(
          `${API_URL}/admin/ban-unban/user/${id}`,
          {
            method: "PUT",
          }
        );
        if (!response.ok) {
          throw new Error(`Error al ${action} al usuario: ${response.statusText}`);
        }
  
        // Refrescar la lista de usuarios después de banear/desbanear
        const updatedResponse = await fetchWithAuth(
          `${API_URL}/admin/list/user?limit=100`,
          {
            method: "GET",
          }
        );
        const updatedData = await updatedResponse.json();
        setUsers(updatedData.users || []);
  
        Swal.fire({
          icon: "success",
          title: `Usuario ${confirmAction}`,
          text: `El usuario ha sido ${confirmAction} correctamente.`,
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        // Verificar si el error es un objeto Error
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error(`Error al ${action} al usuario:`, errorMessage);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `No se pudo ${action} al usuario. ${errorMessage}`,
          confirmButtonText: "Aceptar",
        });
      }
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="text-4xl font-semibold mb-4 text-center p-5 text-white mt-5">
        Lista de Usuarios
      </h2>

      {/* Campo de búsqueda */}
      <div className="text-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filtrar por letra (A-Z)"
          className="bg-gray-700 text-white px-4 py-2 rounded"
        />
      </div>

      <ul className="bg-black rounded-lg shadow-lg overflow-hidden">
        {paginatedUsers.length === 0 ? (
          <p className="text-center p-4 text-white">No hay usuarios para mostrar.</p>
        ) : (
          paginatedUsers.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-4 border-b text-white"
            >
              <span>
                {user.name} - {user.email}{" "}
                {user.was_banned && (
                  <span className="text-red-500 font-semibold">(Baneado)</span>
                )}
              </span>
              <button
                onClick={() => handleToggleBan(user.id, user.was_banned)}
                className={`px-3 py-1 rounded ${
                  user.was_banned
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } text-white`}
              >
                {user.was_banned ? "Desbanear" : "Banear"}
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-white">{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserList;
