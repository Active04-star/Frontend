import { IReservation } from "./reservation_Interface"; // Relación con la interfaz IReservation
import { IUser } from "./user_Interface"; // Relación con la interfaz IUser
import { ISportCenter } from "./SportCenter_Interface"; // Relación con la interfaz ISportCenter
import { IField } from "./field_Interface"; // Relación con la interfaz IField

export interface IReview {
  id: string; // ID único de la reseña
  rating: number | null; // Calificación de la reseña (puede ser nula)
  comment: string; // Comentario asociado a la reseña
  createdAt: string; // Fecha de creación (ISO string)
  isEdited: boolean; // Indica si la reseña ha sido editada
  updatedAt?: string; // Fecha de edición, opcional porque puede ser nula
  reservation?: IReservation; // Reserva asociada a la reseña (opcional)
  user: IUser; // Usuario que realizó la reseña
  sportcenter?: ISportCenter; // Centro deportivo asociado a la reseña (opcional)
  field?: IField; // Cancha asociada a la reseña (opcional)
}
