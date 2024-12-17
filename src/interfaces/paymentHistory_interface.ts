import { PaymentStatus } from "../enum/PaymentStatus"; // Enum para el estado del pago
import { IPayment } from "./payment_Interface"; // Relación con la interfaz IPayment
import { IUser } from "./user_Interface"; // Relación con la interfaz IUser
import { IField } from "./field_Interface"; // Relación con la interfaz IField
import { IReservation } from "./reservation_Interface"; // Relación con la interfaz IReservation
import { ISportCenter } from "././SportCenter_Interface"; // Relación con la interfaz ISportCenter

export interface IPaymentHistory {
  id: string;
  date: Date; // Fecha del registro de historial
  amount: number; // Monto del pago (Decimal convertido a número para el frontend)
  status: PaymentStatus; // Estado del pago
  payment: IPayment; // Relación con el pago al que pertenece el historial
  user: IUser; // Usuario que realizó el pago
  sportCenter: ISportCenter; // Centro deportivo asociado al historial
  field: IField; // Cancha asociada al pago
  reservation?: IReservation; // Reserva asociada al pago (opcional)
}
