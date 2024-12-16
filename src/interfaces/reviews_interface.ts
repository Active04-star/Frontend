import { IUser } from "@/types/zTypes";
import { ISportCenter } from "./SportCenter_Interface";

export interface IReview {
  id: string;
  rating: number | null;
  comment: string;
  createdAt: Date;
  isEdited: boolean;
  updatedAt?: Date;
  user: IUser;
  sportcenter: ISportCenter;
}
