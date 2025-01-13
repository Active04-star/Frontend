"use client";
import LoadingCircle from "@/components/general/loading-circle";
import SportCenterCard from "@/components/SportCenterCard/SportCenterCard";
import { ISportCenterList } from "@/interfaces/sport_center_list.interface";
import React, { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/navbar/navbar";
import { merge } from '@/utils/mergeObject';
import { API_URL } from "@/config/config";
import { fetchAndCatch } from "@/helpers/errors/fetch-error-interceptor";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { zodValidate } from "@/helpers/validate-zod";
import { IQueryParams } from "@/types/zTypes";
import { QueryParamsSchema } from "@/types/queryParams-schema";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifyUnknownError } from "@/helpers/swal/swal-notify-unknown-error";
import verifyUser from "@/helpers/auth/illegalUserVerify";

const UserView: React.FC = () => {
  const default_params: IQueryParams = {
    page: 1,
    limit: 9,
    search: "",
    rating: 0
  }
  const [params, setParams] = useState<IQueryParams>(default_params);
  const [error, setError] = useState<string | null>(null);

  // const default_params: IQueryParams = { page: 1, limit: 8 };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [centerList, setCenterList] = useState<ISportCenterList | null>(null);
  const [navbarHeight, setNavbarHeight] = useState<number>(0);

  // const [rating, setRating] = useState<number | undefined>();
  const [disableRating, setDisableRating] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [vrating, setVrating] = useState<number>(0);
  // const voidStar = "w-8 h-8 fill-transparent stroke-amber-500 cursor-pointer mx-1 p-1";
  // const fullStar = "w-8 h-8 fill-amber-500 stroke-amber-500 cursor-pointer mx-1 p-1";
  const voidStar = "w-8 h-8 fill-transparent stroke-white rounded-lg cursor-pointer mx-1 p-1 bg-black hover:bg-yellow-700";
  const fullStar = "w-8 h-8 fill-white stroke-white rounded-lg cursor-pointer mx-1 p-1 bg-yellow-600";


  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.getBoundingClientRect().height);
    }
  }, []);

  const { page, limit, search, rating: defaultRating } = default_params;


  const fetchData = useCallback(async (search?: string, rating?: number) => {
    setIsLoading(true);
    await verifyUser();

    try {
      const queryString = new URLSearchParams(window.location.search);
      const queryParams: unknown = Object.fromEntries(queryString.entries());
      let actual_params: IQueryParams;
      const validate = zodValidate(queryParams, QueryParamsSchema);

      if (validate.success || queryString.size === 0) {
        if (queryString.size > 0 && validate.success) {
          setVrating(Number((queryParams as IQueryParams).rating) || 0);
          setParams(queryParams as IQueryParams);
        }

        actual_params = queryParams as IQueryParams;

        const url = new URL(`${API_URL}/sportcenter/search`);
        url.searchParams.append("page", `${actual_params.page || default_params.page}`);
        url.searchParams.append("limit", `${actual_params.limit || default_params.limit}`);
        url.searchParams.append("search", `${actual_params.search || default_params.search}`);
        url.searchParams.append("rating", `${actual_params.rating || default_params.rating}`);

        const response = await fetchAndCatch(url.toString(), {
          method: "GET"
        });

        setCenterList(response);
      } else {
        setError("Formato de búsqueda inválido!");
      }
    } catch (error) {
      setError("No se encontraron centros deportivos!");

      if (error instanceof ErrorHelper) {
        swalNotifyError(error);
      } else {
        swalNotifyUnknownError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [ default_params.rating, default_params.search, default_params.limit, default_params.page]);

  // useEffect que llama a fetchData
  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.getBoundingClientRect().height);
    }

    fetchData(); // Se mantiene la llamada a fetchData
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
    console.log(_rating)
    console.log(vrating)
    if (_rating > vrating || _rating < vrating) {
      setVrating(_rating);
      setDisableRating(true);
      changeParams({ rating: _rating });

    } else if (_rating === vrating) {
      setVrating(0);
      changeParams({ rating: 0 });
      setDisableRating(false);

    }
    console.log(vrating)

  };


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };


  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
      search: params.search?.toString() || "",
      rating: params.rating?.toString() || "0",
    });
    console.log(params);
    window.location.href = `/user?${searchParams.toString()}`;
  };


  return (
    <>
      <Navbar />

      <div style={{ paddingTop: `${navbarHeight + 16}px` }}>
        <div className="p-4 mt-8">
          <div className="flex gap-4 mb-6">
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
            <div className="">
              <button
                className="flex bg-primary text-dark px-4 py-2 rounded hover:bg-yellow-700 bg-yellow-600 font-bold"
                onClick={() => handleSearch()}>
                {"Buscar"}
                <Search className="ml-1 text-white h-5 w-5" />
              </button>
            </div>

            <div className="w-1/12"></div>

            <div
              onMouseLeave={() => {
                 moveStar(0);
              }}
              className="flex mt-1 w-fit">

              {
                [1, 2, 3, 4, 5].map((i) => (
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
                ))
              }
            </div>

            <div className="w-1/12"></div>

          </div>
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
                <SportCenterCard key={center.id} {...center} />
              ))}
          </div>
        )}
      </div >
    </>
  );
};

export default UserView;
