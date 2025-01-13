import { API_URL } from "@/config/config";
import { ISportCenterList } from "@/interfaces/sport_center_list.interface";
import { fetchAndCatch } from "./errors/fetch-error-interceptor";

interface SearchParams {
  page?: number;
  limit?: number;
  search?: string;
}

export async function fetchAllCenters(params: SearchParams = {}): Promise<ISportCenterList> {
  const queryParams = new URLSearchParams();
  
  queryParams.append('page', (params.page || 1).toString());
  queryParams.append('limit', (params.limit || 10).toString());
  
  if (params.search) {
    queryParams.append('search', params.search);
  }

  const response = await fetchAndCatch(
    `${API_URL}/sportcenter/search?${queryParams.toString()}`, 
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response;
}
