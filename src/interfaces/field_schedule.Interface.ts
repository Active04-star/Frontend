import { FieldStatus } from "../enum/FieldStatus"; // Enum previamente definido
import { IField } from "./field_Interface"; // Relación con Field
import { ISportCenterSchedule } from "./sportCenter_schedule_interface"; // Relación con SportCenterSchedule

export interface IFieldSchedule {
  id: string;
  startTime: string; // Representa 'start_time'
  endTime: string; // Representa 'end_time'
  durationMinutes: number; // Representa 'duration_minutes'
  status: FieldStatus; // Enum con los posibles estados del campo
  field: IField; // Relación con la interfaz IField
  sportCenterSchedule: ISportCenterSchedule; // Relación con la interfaz ISportCenterSchedule
}
