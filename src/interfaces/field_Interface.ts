export interface IField {
  id: string;
  number: number;
  status: FieldStatus;
  reservation?: IReservation[];
  sportCategory: ISportCategory;
  sportcenter: ISportCenter;
}
