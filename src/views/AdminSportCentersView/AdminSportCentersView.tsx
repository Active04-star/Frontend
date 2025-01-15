/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import LoadingCircle from "@/components/general/loading-circle";
import { ISportCenterList } from "@/interfaces/sport_center_list.interface";
import SportCenterCard from "@/components/adminSportCenterCardProps/adminSportCenterCardProps";
import { API_URL } from "@/config/config";

import { ErrorHelper } from "@/helpers/errors/error-helper";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import Swal from "sweetalert2";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { SportCenterStatus } from "@/enum/sportCenterStatus";
import { IQueryParams } from "@/types/zTypes";
import { merge } from "@/utils/mergeObject";
import { Search } from "lucide-react";
import verifyUser from "@/helpers/auth/illegalUserVerify";
import { fetchAndCatch } from "@/helpers/errors/fetch-error-interceptor";
import { QueryParamsSchema } from "@/types/queryParams-schema";
import { zodValidate } from "@/helpers/validate-zod";
import { IQueryErrors } from "@/types/Errortypes";

const banSportCenter = async (id: string) => {
  try {
    await fetchWithAuth(`${API_URL}/admin/ban-unban/sportcenter/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "banned" }), // Cambiar el estado a "banned" para banear
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Alerta de éxito
    Swal.fire({
      icon: "success",
      title: "Centro Deportivo Baneado",
      text: "El centro deportivo ha sido baneado correctamente.",
      confirmButtonText: "Aceptar",
    });
  } catch (error: any) {

    if (error instanceof ErrorHelper) {
      swalNotifyError(error);
      // Alerta de error personalizada
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: `Error: ${error.message}`,
      //   confirmButtonText: "Aceptar",
      // });
    } else {
      console.error(error);
      swalCustomError(error.message);
      // Alerta de error genérica
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: "Ocurrió un error al banear el centro deportivo.",
      //   confirmButtonText: "Aceptar",
      // });
    }
  }
};

const unbanSportCenter = async (id: string) => {
  try {
    await fetchWithAuth(`${API_URL}/admin/ban-unban/sportcenter/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: SportCenterStatus.PUBLISHED }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Alerta de éxito
    // Swal.fire({
    //   icon: "success",
    //   title: "Centro Deportivo Desbaneado",
    //   text: "El centro deportivo ha sido desbaneado correctamente.",
    //   confirmButtonText: "Aceptar",
    // });
    swalNotifySuccess("Centro Deportivo Desbaneado", "El centro deportivo ha sido desbaneado correctamente.");
  } catch (error: any) {

    if (error instanceof ErrorHelper) {
      // Alerta de error personalizada
      swalNotifyError(error);

      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: `Error: ${error.message}`,
      //   confirmButtonText: "Aceptar",
      // });
    } else {
      console.error(error);
      swalCustomError(error.message);

      // Alerta de error genérica
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: "Ocurrió un error al desbanear el centro deportivo.",
      //   confirmButtonText: "Aceptar",
      // });
    }
  }
};

const AdminSportCentersView: React.FC = () => {

  const default_params: IQueryParams = {
    page: 1,
    limit: 9,
    search: "",
    rating: 0,
  };
  const [params, setParams] = useState<IQueryParams>(default_params);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [centerList, setCenterList] = useState<ISportCenterList | null>(null);
  const [page, setPage] = useState<number>(0);
  const divRef = useRef<HTMLDivElement>(null);

  const [rating, setRating] = useState<number>(0);
  const [vrating, setVrating] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const voidStar = "w-8 h-8 fill-transparent stroke-white rounded-lg cursor-pointer mx-1 p-1 bg-black hover:bg-yellow-700";
  const fullStar = "w-8 h-8 fill-white stroke-white rounded-lg cursor-pointer mx-1 p-1 bg-yellow-600";


  const fetchData = useCallback(async () => {
    setIsLoading(true);
    await verifyUser();
    setError(null);

    try {
      const total_items = await fetchAndCatch(`${API_URL}/sportcenter/total/true`, { method: "GET" });
      const queryString = new URLSearchParams(window.location.search);
      const queryParams: unknown = Object.fromEntries(queryString.entries());
      let actual_params: IQueryParams;
      const validate = zodValidate<IQueryErrors>(queryParams, QueryParamsSchema);

      if (validate.success || queryString.size === 0) {

        if (Number((queryParams as IQueryParams).limit) * Number((queryParams as IQueryParams).page) > (total_items.total + 9)) {
          (queryParams as IQueryParams).page = 1;
          swalCustomError("Limite de pagina alcanzado", "", ["top-right",]);
        }

        if (queryString.size > 0 && validate.success) {
          setVrating(Number((queryParams as IQueryParams).rating) || 0);
          setParams(queryParams as IQueryParams);
        }

        actual_params = queryParams as IQueryParams;

        const url = new URL(`${API_URL}/admin/list/centersban`);
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
        url.searchParams.append(
          "rating",
          `${actual_params.rating || default_params.rating}`
        );

        const response = await fetchWithAuth(url.toString(), {
          method: "GET",
        });


        setCenterList(response);
        setPage((response as ISportCenterList).page);

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
        swalCustomError(error.message);

        setError("An error occurred while fetching sport centers");
        setCenterList(null);

      }

    }

    setIsLoading(false);
  }, [default_params.limit, default_params.page, default_params.rating, default_params.search]);


  const handleBan = async (id: string) => {
    const result = await Swal.fire({
      title: `¿Estás seguro de que quieres banear este centro?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, banear`,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await banSportCenter(id); // Usamos la función banSportCenter para banear
      fetchData(); // Actualizar la lista después de banear
    }
  };

  const handleUnban = async (id: string) => {
    const result = await Swal.fire({
      title: `¿Estás seguro de que quieres desbanear este centro?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, desbanear`,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await unbanSportCenter(id); // Usamos la función unbanSportCenter para desbanear
      fetchData(); // Actualizar la lista después de desbanear
    }
  };


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    fetchData();

    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [fetchData]);


  const changeParams = (params_: Partial<IQueryParams>) => {
    const merged: IQueryParams = merge(params, params_);
    console.log(merged);
    setParams(merged);
  };


  const moveStar = (_rating: number) => {
    setRating(_rating);
  };


  const sendStar = (_rating: number) => {

    if (_rating > vrating || _rating < vrating) {
      setVrating(_rating);
      changeParams({ rating: _rating });

    } else if (_rating === vrating) {
      setVrating(0);
      changeParams({ rating: 0 });

    }
  };


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };


  const handleSearch = (params_?: Partial<IQueryParams>) => {
    const searchParams = new URLSearchParams({
      page: params_?.page?.toString() || params.page.toString(),
      limit: params_?.limit?.toString() || params.limit.toString(),
      search: params.search?.toString() || "",
      rating: params.rating?.toString() || "0",
      view: "centers"
    });

    window.location.href = `/admin?${searchParams.toString()}`;
  };


  return (
    <div className="p-4 mt-8">

      <div className="p-4 mt-8">
        <div className="flex gap-4 mb-6">

          {/* INPUT BUSQUEDA */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
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

          {/* ESTRELLAS */}
          <div
            onMouseLeave={() => {
              moveStar(0);
            }}
            className="flex mt-1 w-fit">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                onClick={() => sendStar(i)}
                onMouseEnter={() => moveStar(i)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                className={i <= rating || i <= vrating ? fullStar : voidStar}
              >
                <path d="M12 17.27L18.18 21 16.54 14.81 22 10.24 15.81 9.63 12 3 8.19 9.63 2 10.24 7.46 14.81 5.82 21z" />
              </svg>
            ))}
          </div>

          <div className="w-1/12"></div>
        </div>

        {/* PAGINADO */}
        {!isLoading &&
          <div className="ml-4 grid grid-cols-2">
            <div className="max-w-96 flex">

              {centerList?.total_pages !== undefined ?
                <>
                  {(page - 2) > 1 ?
                    <button
                      disabled={page === 1}
                      onClick={() => handleSearch({ page: 1 })}
                      className="rounded-lg bg-yellow-600 px-3 py-1 font-bold mx-1">
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

                  {Array.from({ length: centerList?.total_pages }, (_, i) => i + 1).map((i) => (
                    i < (page + 3) && i > (page - 3) ?
                      <button
                        disabled={page === i}
                        onClick={() => handleSearch({ page: i })}
                        className={page === i ?
                          "rounded-lg bg-yellow-600 px-3 py-1 font-bold mx-1"
                          :
                          "rounded-lg bg-black px-3 py-1 font-bold mx-1"} key={i}>
                        {i}
                      </button>
                      :
                      null
                  ))}

                  {(page + 2) < centerList?.total_pages ?
                    <span className="font-bold pt-2 px-2">
                      ...
                    </span>
                    : null
                  }

                  {(page + 2) < centerList.total_pages ?
                    <button
                      disabled={page === centerList.total_pages}
                      onClick={() => handleSearch({ page: centerList.total_pages })}
                      className="rounded-lg bg-yellow-600 px-3 py-1 font-bold mx-1">
                      {(page + 2) < centerList.total_pages ? centerList.total_pages : "  "}
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
      ) : (
        <div className="mt-8 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {centerList &&
            centerList.sport_centers.map((center) => (
              <SportCenterCard
                key={center.id}
                {...center}
                onBan={handleBan} // Función para banear
                onUnban={handleUnban} // Función para desbanear
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminSportCentersView;
