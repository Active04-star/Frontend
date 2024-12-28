import { SportCenterStatus } from "@/enum/sportCenterStatus";

export interface ISportCenter {
    id: string;
    name: string;
    address: string;
    averageRating: string;
    isDeleted: boolean;
    status: SportCenterStatus;
    photos: string[];
}