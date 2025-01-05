import { SportCenterStatus } from "@/enum/sportCenterStatus";

import { IUser } from "./user_Interface";
import { IField } from "./field_Interface";
import { ISportCategory } from "./sportCategory_interface";
import { IReview } from "./reviews_interface";
import { ISportCenterSchedule } from "./sportCenter_schedule_interface";

export interface ISportCenter {
    id: string;
    name: string;
    address: string;
    averageRating?: number | null;  // Valoración promedio puede ser nulo o no proporcionado
    isDeleted: boolean;
    status: SportCenterStatus;
    photos?: string[];  // Relación con las fotos, opcional
    schedules: ISportCenterSchedule[];  // Relación con los horarios, opcional
    fields: IField[];  // Relación con los campos de deportes, opcional
    mainManager: IUser;  
    sportCategories?: ISportCategory[];  // Relación con las categorías deportivas, opcional
}
