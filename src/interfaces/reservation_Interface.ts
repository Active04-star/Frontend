import { ReservationStatus } from "@/enum/ReservationStatus";
import { IField } from "./field_Interface";
import { IPayment } from "./payment_Interface";
import { IUser } from "@/types/zTypes";

export interface IReservation {
  id: string;
  date: Date;
  status: ReservationStatus;
  payment?: IPayment;
  user: IUser;
  field: IField;
}
