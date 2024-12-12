import { SportCenterStatus } from "@/enum/sportCenterStatus.enum";
import { IField } from "./field_Interface";
import { IPhotos } from "./photos_Interface";
import { IReview } from "./reviews_interface";
import { ISportCategory } from "./sportCategory_interface";
import { IUser } from "./user_Interface";

export interface ISportCenter {
  id: string;
  name: string;
  address: string;
  status: SportCenterStatus;
  reviews?: IReview[];
  field?: IField[];
  sport_category?: ISportCategory[];
  photos?: IPhotos[];
  manager: IUser;
}
