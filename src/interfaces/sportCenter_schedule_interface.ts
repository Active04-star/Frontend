import { IFieldSchedule } from "./field_schedule.Interface"; // Asumiendo que tienes una interfaz 'FieldSchedule' para el frontend
import { DayOfWeek } from "../enum/DayOfWeek"; // Importando el tipo 'DayOfWeek'

export interface ISportCenterSchedule {
  id: string;
  day: DayOfWeek; // El día de la semana, representado por un enum
  note?: string; // Nota opcional
  opening_time: string; // Hora de apertura
  closing_time: string; // Hora de cierre
  fieldSchedules: IFieldSchedule[]; // Relación con los horarios de los campos
}
