"use client";
import LoadingCircle from "@/components/general/loading-circle";
import SportCenterCard from "@/components/SportCenterCard/SportCenterCard";
import { fetchSearchCenters } from "@/helpers/sport_center_helpers";
import { IQueryParams } from "@/interfaces/query_params.interface";
import { ISportCenterList } from "@/interfaces/sport_center_list.interface";
import React, { useCallback, useEffect, useState } from "react";
import { Search, Star } from "lucide-react";
import debounce from "lodash/debounce";

const UserView: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const default_params: IQueryParams = { page: 1, limit: 8 };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [centerList, setCenterList] = useState<ISportCenterList | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rating, setRating] = useState<number | undefined>();

  const fetchData = useCallback(async (search?: string, rating?: number) => {
    const default_params: IQueryParams = { page: 1, limit: 8 };
    setIsLoading(true);
    setError(null); // Limpia el error antes de realizar la nueva solicitud
    try {
      const response = await fetchSearchCenters({
        ...default_params,
        search,
        rating,
      });
      setCenterList(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if ("status" in error) {
          if ((error as { status: number }).status === 404) {
            setError("No sport centers found matching your search criteria");
          } else {
            setError("An error occurred while fetching sport centers");
          }
        }
      } else {
        setError("An unknown error occurred");
      }
      setCenterList(null);
    }
    
    setIsLoading(false);
  }, []);
  

  // Debounce search to avoid too many API calls
  const debouncedSearch = debounce((term: string) => {
    fetchData(term, rating);
  }, 300);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleRatingChange = (value: number) => {
    setRating(value === rating ? undefined : value);
    fetchData(searchTerm, value === rating ? undefined : value);
  };

  return (
    <>
      <div className="p-4 mt-8">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search sport centers..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent bg-black"
            />
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleRatingChange(value)}
                className={`flex items-center justify-center p-2 rounded-lg transition-colors  ${
                  rating === value
                    ? "bg-yellow-600  text-white"
                    : "bg-black hover:bg-yellow-700"
                }`}
              >
                <Star
                  className="h-5 w-5"
                  fill={rating === value ? "white" : "none"}
                />
              </button>
            ))}
          </div>
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
    </>
  );
};

export default UserView;
