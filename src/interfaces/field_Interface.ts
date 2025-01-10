import { IField_Blocks } from "./field_schedule.Interface";
import { ISportCategory } from "./sportCategory_interface";

export interface IField {
  id: string;
  number: number;
  price: string; 
  isDeleted: boolean;
  isACtive: boolean;
  duration_minutes: number;
  photos?: string[]; 
  blocks: IField_Blocks[]; 
  sportCategory?:ISportCategory
}