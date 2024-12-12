import { IField } from "./field_Interface";
import { ISportCenter } from "./SportCenter_Interface";

export interface ISportCategory {
  id: string;
  name: string;
  logo?: string;
  field?: IField[];
  sportcenter: ISportCenter;
}
