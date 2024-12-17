import { ISportCenter } from "./SportCenter_Interface"; // Asumiendo que tienes una interfaz 'SportCenter' para el frontend
import { IUser } from "./user_Interface"; // Asumiendo que tienes una interfaz 'User' para el frontend

export interface SportCenterManagers {
  id: string;
  sportCenter: ISportCenter | null; // Relación con SportCenter (puede ser null si no está presente)
  managers: IUser[]; // Relación con los usuarios que son managers
}
