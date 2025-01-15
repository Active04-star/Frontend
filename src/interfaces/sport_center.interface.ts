import { SportCenterStatus } from "@/enum/sportCenterStatus";

import { IUser } from "./user_Interface";
import { IField } from "./field_Interface";
import { ISportCategory } from "./sportCategory_interface";
import { ISportCenterSchedule } from "./sportCenter_schedule_interface";
import { Interface_Image } from "./image.interface";

export interface ISportCenter {
    id: string;
    name: string;
    address: string;
    averageRating?: number | null;  // Valoración promedio puede ser nulo o no proporcionado
    isDeleted: boolean;
    status: SportCenterStatus;
    photos: Interface_Image[];
    schedules: ISportCenterSchedule[];  // Relación con los horarios, opcional
    fields: IField[];  // Relación con los campos de deportes, opcional
    mainManager: IUser;  
    sportCategories?: ISportCategory[];  // Relación con las categorías deportivas, opcional
}
