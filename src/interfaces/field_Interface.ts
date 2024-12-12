import { FieldStatus } from "@/enum/FieldStatus";
import { IReservation } from "./reservation_Interface";
import { ISportCategory } from "./sportCategory_interface";
import { ISportCenter } from "./SportCenter_Interface";

export interface IField {
  id: string;
  number: number;
  status: FieldStatus;
  reservation?: IReservation[];
  sportCategory: ISportCategory;
  sportcenter: ISportCenter;
}
