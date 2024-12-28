import { PaymentStatus } from "../enum/PaymentStatus"; // Enum para el estado del pago
import { PaymentMethod } from "../enum/PaymentMethod"; // Enum para el método de pago
import { IPaymentHistory } from "./paymentHistory_interface"; // Relación con la interfaz IPaymentHistory
import { IField } from "./field_Interface"; // Relación con la interfaz IField
import { IUser } from "./user_Interface"; // Relación con la interfaz IUser
import { IReservation } from "./reservation_Interface"; // Relación con la interfaz IReservation
import { ISportCenter } from "./sport_center.interface";

export interface IPayment {
  id: string;
  amount: number; // Monto del pago (Decimal convertido a número)
  status: PaymentStatus; // Estado del pago
  paymentMethod: PaymentMethod; // Método de pago
  history: IPaymentHistory[]; // Historial de pagos relacionado
  field: IField; // Cancha asociada al pago
  sportCenter: ISportCenter; // Centro deportivo asociado al pago
  user: IUser; // Usuario que realizó el pago
  reservation?: IReservation; // Reserva asociada al pago (opcional)
}
