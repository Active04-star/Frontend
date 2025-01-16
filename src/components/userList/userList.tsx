/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { API_URL } from "../../config/config";
import Swal from "sweetalert2";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { Search } from "lucide-react";
import { IUserQueryParams } from "@/types/zTypes";
import { merge } from "@/utils/mergeObject";
import { IUserList } from "@/interfaces/user_list.interface";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { fetchAndCatch } from "@/helpers/errors/fetch-error-interceptor";
import { zodValidate } from "@/helpers/validate-zod";
import { UserQueryParamsSchema } from "@/types/userQueryParams-schema";
import { IQueryErrors } from "@/types/Errortypes";
import LoadingCircle from "../general/loading-circle";

const UserList = () => {
  const default_params: IUserQueryParams = {
    page: 1,
    limit: 9,
    search: "",
  };

  const divRef = useRef<HTMLDivElement>(null);
  const [params, setParams] = useState<IUserQueryParams>(default_params);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUserList | null>(null);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const total_items = await fetchAndCatch(`${API_URL}/admin/users/total`, { method: "GET" });
      const queryString = new URLSearchParams(window.location.search);
      const queryParams: unknown = Object.fromEntries(queryString.entries());
      let actual_params: IUserQueryParams;
      const validate = zodValidate<Omit<IQueryErrors, "rating">>(queryParams, UserQueryParamsSchema);

      if (validate.success || queryString.size === 1 && queryString.has("view", "clientes")) {

        if (Number((queryParams as IUserQueryParams).limit) * Number((queryParams as IUserQueryParams).page) > (total_items.total + 9)) {
          (queryParams as IUserQueryParams).page = 1;
          swalCustomError("Limite de pagina alcanzado", "", ["top-right",]);
        }

        if (queryString.size > 0 && validate.success) {
          setParams(queryParams as IUserQueryParams);
        }

        actual_params = queryParams as IUserQueryParams;

        const url = new URL(`${API_URL}/admin/list/user`);
        url.searchParams.append(
          "page",
          `${actual_params.page || default_params.page}`
        );
        url.searchParams.append(
          "limit",
          `${actual_params.limit || default_params.limit}`
        );
        url.searchParams.append(
          "search",
          `${actual_params.search || default_params.search}`
        );

        const response = await fetchWithAuth(url.toString(), {
          method: "GET",
        });

        setUsers(response);
        setPage((response as IUserQueryParams).page);

      } else if (validate.errors !== null) {

        const error = Object.entries(validate.errors)
          .map(([, value]) => {
            const errors = value._errors || [];
            return ` ${errors.join(", ")}`;

          }).join(", ");

        setError(`Formato de búsqueda inválido ${error}`);

      }

    } catch (error: any) {

      if (error instanceof ErrorHelper) {
        swalNotifyError(error);

      } else {
        console.error(error);
        // swalCustomError(error.message);

        setError("No se encontraron usuarios");
        setUsers(null);

      }

    }

    setIsLoading(false);
  }, [default_params.limit, default_params.page, default_params.search]);


  useEffect(() => {
    // const fetchUsers = async () => {
    //   try {

    //     const response = await fetchWithAuth(`${API_URL}/admin/list/user?limit=100`, {
    //       method: "GET",
    //     });

    //     setUsers(response.users || []);

    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //     setUsers([]);
    //   }
    // };

    // fetchUsers();

    fetchUsers();

    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
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

        swalNotifySuccess(`Usuario ${confirmAction}`, `El usuario ha sido ${confirmAction} correctamente.`, ["top-right", 4000]);

        handleSearch();
      } catch (error) {
        // Verificar si el error es un objeto Error
        if (error instanceof ErrorHelper) {
          swalCustomError(error.message, "Error al banear el usuario");

        }
      }
    }
  };


  const changeParams = (params_: Partial<IUserQueryParams>) => {
    const merged: IUserQueryParams = merge(params, params_);
    console.log(merged);
    setParams(merged);
  };


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };


  const handleSearch = (params_?: Partial<IUserQueryParams>) => {
    const searchParams = new URLSearchParams({
      page: params_?.page?.toString() || params.page.toString(),
      limit: params_?.limit?.toString() || params.limit.toString(),
      search: params.search?.toString() || "",
      view: "clientes",
    });

    window.location.href = `/admin?${searchParams.toString()}`;
  };


  return (
    <div className="p-4">
      <h2 className="text-4xl font-semibold mb-4 text-center p-5 text-white mt-5">
        Lista de Usuarios
      </h2>

      {/* Campo de búsqueda */}
      {/* <div className="text-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filtrar por letra (A-Z)"
          className="bg-gray-700 text-white px-4 py-2 rounded"
        />
      </div> */}
      <div className="p-4 mt-8">
        <div className="flex gap-4 mb-6">

          {/* INPUT BUSQUEDA */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              maxLength={50}
              placeholder="Busca un centro..."
              value={params.search}
              onChange={(e) => changeParams({ search: e.target.value })}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent bg-black"
            />
          </div>

          {/* BOTON BUSQUEDA */}
          <div className="">
            <button
              className="flex bg-primary text-dark px-4 py-2 rounded hover:bg-yellow-700 bg-yellow-600 font-bold"
              onClick={() => handleSearch()}
            >
              {"Buscar"}
              <Search className="ml-1 text-white h-5 w-5" />
            </button>
          </div>

          <div className="w-1/12"></div>

        </div>

        {/* PAGINADO */}
        {!isLoading &&
          <div className="ml-4 grid grid-cols-2">
            <div className="max-w-96 flex">

              {users?.total_pages !== undefined ?
                <>
                  {(page - 2) > 1 ?
                    <button
                      disabled={page === 1}
                      onClick={() => handleSearch({ page: 1 })}
                      className="rounded-lg bg-neutral-900 px-3 py-1 font-bold mx-1">
                      {(page - 2) > 1 ? 1 : "  "}
                    </button>
                    :
                    null
                  }

                  {(page - 2) > 1 ?
                    <span className="font-bold pt-2 px-2">
                      ...
                    </span>
                    : null
                  }

                  {Array.from({ length: users?.total_pages }, (_, i) => i + 1).map((i) => (
                    i < (page + 3) && i > (page - 3) ?
                      <button
                        disabled={page === i}
                        onClick={() => handleSearch({ page: i })}
                        className={page === i ?
                          "rounded-lg bg-yellow-600 px-3 py-1 font-bold mx-1"
                          :
                          "rounded-lg bg-black transition-colors hover:bg-neutral-900 px-3 py-1 font-bold mx-1"} key={i}>
                        {i}
                      </button>
                      :
                      null
                  ))}

                  {(page + 2) < users?.total_pages ?
                    <span className="font-bold pt-2 px-2">
                      ...
                    </span>
                    : null
                  }

                  {(page + 2) < users.total_pages ?
                    <button
                      disabled={page === users.total_pages}
                      onClick={() => handleSearch({ page: users.total_pages })}
                      className="rounded-lg bg-neutral-900 px-3 py-1 font-bold mx-1">
                      {(page + 2) < users.total_pages ? users.total_pages : "  "}
                    </button>
                    :
                    null
                  }
                </>
                : null
              }
            </div>

            {/* ITEMS POR PAGINA */}
            <div className="col-start-2">
              <span className="font-semibold">Items: </span>
              <div ref={divRef} className="relative inline-block text-left">
                {/* Botón */}
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-between w-16 px-3 py-1 bg-black font-bold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none"
                >
                  {params.limit}
                  <span className={`ml-2 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
                    ▼
                  </span>
                </button>

                {/* Dropdown */}
                {isOpen && (
                  <div className="absolute mt-2 w-16 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <ul className="py-1">
                      {Array.from({ length: 8 }, (_, i) => i + 2).map((limit) => (
                        <li
                          key={limit}
                          className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            // changeParams({ limit: limit });
                            handleSearch({ limit: limit });
                            setIsOpen(false);
                          }}
                        >
                          {limit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>}
      </div>


      <ul className="bg-black rounded-lg shadow-lg overflow-hidden">
        {isLoading ? (
          <div className="h-96 flex justify-center items-center">
            <div className="w-32 h-32">
              <LoadingCircle />
            </div>
          </div>
        ) : error ? (
          <div className="h-96 flex justify-center items-center">
            <p className="text-gray-500 text-lg">{error}</p>
          </div>
        )
          // users?.users.length === 0 ? (
          //     <p className="text-center p-4 text-white">No hay usuarios para mostrar.</p>
          //   ) 
          : (
            users?.users.map((user) => (
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
      {/* <div className="flex justify-center mt-4">
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
      </div> */}
    </div>
  );
};

export default UserList;
