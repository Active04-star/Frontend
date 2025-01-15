"use client";

import { useEffect, useState } from "react";
import { API_URL } from "../../config/config";
import { IUser } from "@/interfaces/user_Interface";
import Swal from "sweetalert2";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";

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
        await fetchWithAuth(`${API_URL}/admin/ban-unban/user/${id}`, {
          method: "PUT",
        });

        // Refrescar la lista de usuarios después de banear/desbanear
        const updated = await fetchWithAuth(`${API_URL}/admin/list/user?limit=100`, {
          method: "GET",
        });

        setUsers(updated.users || []);

        swalNotifySuccess(`Usuario ${confirmAction}`, `El usuario ha sido ${confirmAction} correctamente.`, ["top-right", 4000]);

      } catch (error) {
        // Verificar si el error es un objeto Error
        if (error instanceof ErrorHelper) {
          swalCustomError(error.message, "Error al banear el usuario");

        }
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
                className={`px-3 py-1 rounded ${user.was_banned
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
