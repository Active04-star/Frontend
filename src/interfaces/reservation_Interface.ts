import { ReservationStatus } from "../enum/ReservationStatus"; // Enum para el estado de la reserva
import { IPayment } from "./payment_Interface"; // Relación con la interfaz IPayment
import { IReview } from "./reviews_interface"; // Relación con la interfaz IReview
import { IPaymentHistory } from "./paymentHistory_interface"; // Relación con la interfaz IPaymentHistory
import { IUser } from "./user_Interface"; // Relación con la interfaz IUser
import { IField } from "./field_Interface"; // Relación con la interfaz IField

export interface IReservation {
  id: string;
  date: string; // Fecha de la reserva (ISO string para el frontend)
  status: ReservationStatus; // Estado de la reserva
  payment?: IPayment; // Pago asociado a la reserva (opcional)
  review?: IReview; // Reseña asociada a la reserva (opcional)
  paymentsHistory: IPaymentHistory[]; // Historial de pagos relacionados
  user: IUser; // Usuario que realizó la reserva
  field: IField; // Cancha asociada a la reserva
}
