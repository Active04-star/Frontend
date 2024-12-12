import { PaymentStatus } from "@/enum/PaymentStatus";
import { IReservation } from "./reservation_Interface";

export interface IPayment {
  id: string;
  price: number;
  status: PaymentStatus;
  paymentMethod: PaymentMethodData;
  reservation: IReservation;
}
