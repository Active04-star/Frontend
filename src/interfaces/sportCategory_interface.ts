import { IField } from "./field_Interface"; // Asumiendo que tienes una interfaz 'Field' para el frontend
import { ISportCenter } from "./sport_center.interface";

export interface ISportCategory {
  id: string;
  name: string;
  logo: string | null; // Puede ser null si no se proporciona logo
  field: IField[]; // Relación con el campo de deporte
  sportcenters: ISportCenter[]; // Relación con los centros deportivos
}
