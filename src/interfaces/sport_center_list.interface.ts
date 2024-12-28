import { ISportCenter as ISportCenter } from "./sport_center.interface";

export interface ISportCenterList {
  items: number;
  page: number;
  limit: number;
  total_pages: number;
  sport_centers: ISportCenter[];
}
